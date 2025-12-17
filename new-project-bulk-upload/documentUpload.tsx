"use client";

import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/navbar";
import ContextBar from "@/components/ContextBar";
import SettingsBar from "@/components/SettingsBar";

/* -------------------- Types -------------------- */
type JobOption = {
  id: string;
  number: string;
  name: string;
};

type UploadedFile = {
  id: string;
  file: File;
  fileName: string;
  documentType: string;
};

type PoleUpload = {
  poleId: string;
  poleLabel: string;
  files: UploadedFile[];
};

/* -------------------- Static Data -------------------- */
const jobOptions: JobOption[] = [
  { id: "1", number: "000000", name: "Unknown Project" },
  { id: "2", number: "20045428", name: "Longwood – El Dorado 345kV Line Rebuild" },
];

const poleOptions = [
  "20045428 | 502-67311-3_Lca | 21515-1-PA | 110",
  "20045428 | 502-67311-3_Lca | 21515-1-PA | 115",
  "20045428 | 502-67311-3_Lca | 21515-1-PA | 120",
];

/* -------------------- Component -------------------- */
export default function NewProjectBulkUploadPage() {
  /* Job / Settings */
  const [jobNumber, setJobNumber] = useState("");
  const [jobName, setJobName] = useState("");
  const [selectedJobId, setSelectedJobId] = useState("");
  const [hasSaved, setHasSaved] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [error, setError] = useState("");

  /* Pole Upload State */
  const [poles, setPoles] = useState<PoleUpload[]>([]);
  const [activePoleId, setActivePoleId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /* -------------------- Effects -------------------- */
  useEffect(() => {
    if (!jobNumber || !jobName) setIsSettingsOpen(true);
  }, []);

  /* -------------------- Job Handlers -------------------- */
  const handleJobChange = (jobId: string) => {
    const job = jobOptions.find((j) => j.id === jobId);
    if (!job) return;

    setSelectedJobId(jobId);
    setJobNumber(job.number);
    setJobName(job.name);
    setHasSaved(false);
    setError("");
  };

  const handleSave = () => {
    if (!jobNumber || !jobName) {
      setError("Please select a Job to continue.");
      return;
    }
    setHasSaved(true);
    setIsSettingsOpen(false);
  };

  /* -------------------- Pole Handlers -------------------- */
  const handleAddPole = (poleLabel: string) => {
    if (poles.some((p) => p.poleLabel === poleLabel)) return;

    const newPole: PoleUpload = {
      poleId: crypto.randomUUID(),
      poleLabel,
      files: [],
    };

    setPoles((prev) => [...prev, newPole]);
    setActivePoleId(newPole.poleId);
  };

  const activePole = poles.find((p) => p.poleId === activePoleId);

  /* -------------------- File Upload -------------------- */
  const handleFilesUpload = (files: FileList) => {
    if (!activePoleId) return;

    const newFiles: UploadedFile[] = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      file,
      fileName: file.name,
      documentType: "",
    }));

    setPoles((prev) =>
      prev.map((pole) =>
        pole.poleId === activePoleId
          ? { ...pole, files: [...pole.files, ...newFiles] }
          : pole
      )
    );
  };

  const handleDeleteFile = (fileId: string) => {
    setPoles((prev) =>
      prev.map((pole) =>
        pole.poleId === activePoleId
          ? { ...pole, files: pole.files.filter((f) => f.id !== fileId) }
          : pole
      )
    );
  };

  const handleDocTypeChange = (fileId: string, value: string) => {
    setPoles((prev) =>
      prev.map((pole) =>
        pole.poleId === activePoleId
          ? {
              ...pole,
              files: pole.files.map((f) =>
                f.id === fileId ? { ...f, documentType: value } : f
              ),
            }
          : pole
      )
    );
  };

  /* -------------------- JSX -------------------- */
  return (
    <>
      <Navbar />

      <ContextBar
        jobNumber={jobNumber}
        jobName={jobName}
        hasSaved={hasSaved}
        header_title="Document Upload"
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      <SettingsBar
        isOpen={isSettingsOpen}
        selectedJobId={selectedJobId}
        jobOptions={jobOptions}
        onJobChange={handleJobChange}
        onSave={handleSave}
        onClose={() => setIsSettingsOpen(false)}
      />

      {error && (
        <div style={{ padding: "8px 16px", color: "red", fontSize: 12 }}>
          {error}
        </div>
      )}

      <div style={{ padding: "20px 32px" }}>
        {/* Pole Tags */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 600, fontSize: 13 }}>Pole Structures:</label>

          <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
            {poles.map((pole) => (
              <div
                key={pole.poleId}
                onClick={() => setActivePoleId(pole.poleId)}
                style={{
                  padding: "4px 8px",
                  borderRadius: 4,
                  fontSize: 12,
                  cursor: "pointer",
                  background:
                    pole.poleId === activePoleId ? "#E7F0FF" : "#F5F5F5",
                  border:
                    pole.poleId === activePoleId
                      ? "1px solid #1660E8"
                      : "1px solid #CCC",
                }}
              >
                {pole.poleLabel}
                <span style={{ marginLeft: 6, fontSize: 10 }}>Tangent</span>
              </div>
            ))}
          </div>

          <select
            style={{ marginTop: 8, height: 28 }}
            onChange={(e) => handleAddPole(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Add Tag
            </option>
            {poleOptions.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* Main Content */}
        <div style={{ display: "flex", gap: 24 }}>
          {/* Upload Box */}
          <div
            onDrop={(e) => {
              e.preventDefault();
              handleFilesUpload(e.dataTransfer.files);
            }}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileInputRef.current?.click()}
            style={{
              width: 260,
              height: 160,
              border: "1px dashed #C7C7C7",
              borderRadius: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              background: "#FAFAFA",
            }}
          >
            <div style={{ fontSize: 13, color: "#666" }}>
              Drag & Drop your files here
            </div>
            <div style={{ fontSize: 12, color: "#999" }}>or browse</div>

            {activePole && activePole.files.length > 0 && (
              <div style={{ marginTop: 8, fontSize: 12, color: "green" }}>
                Files Uploaded Successfully ✔
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              multiple
              hidden
              onChange={(e) =>
                e.target.files && handleFilesUpload(e.target.files)
              }
            />
          </div>

          {/* File Table */}
          <div style={{ flex: 1 }}>
            {activePole && activePole.files.length > 0 && (
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 13,
                }}
              >
                <thead>
                  <tr>
                    <th align="left">Document File Name</th>
                    <th align="left">Document Type</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {activePole.files.map((file) => (
                    <tr key={file.id}>
                      <td>{file.fileName}</td>
                      <td>
                        <select
                          value={file.documentType}
                          onChange={(e) =>
                            handleDocTypeChange(file.id, e.target.value)
                          }
                        >
                          <option value="">Select a Document Type</option>
                          <option value="Drawing">Drawing</option>
                          <option value="Specification">Specification</option>
                        </select>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDeleteFile(file.id)}
                          style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          🗑
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Submit */}
        <div style={{ textAlign: "right", marginTop: 24 }}>
          <button
            disabled={!activePole || activePole.files.length === 0}
            style={{
              background: "#1660E8",
              color: "#fff",
              border: "none",
              padding: "8px 16px",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Submit Changes
          </button>
        </div>
      </div>
    </>
  );
}
