"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import ContextBar from "@/components/ContextBar";
import SettingsBar from "@/components/SettingsBar";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

/* ---------------- Types ---------------- */
type JobOption = {
  id: string;
  number: string;
  name: string;
};

type UploadedDoc = {
  id: string;
  file: File;
  fileName: string;
  documentType: string;
};

/* ---------------- Static Data ---------------- */
const jobOptions: JobOption[] = [
  { id: "1", number: "000000", name: "Unknown Project" },
  { id: "2", number: "2006528", name: "Longwood – EL Dorado 345kV Line Rebuild" },
];

const poleOptions = [
  "204525 | 32474832 | 3432432 LOC",
  "204525 | 32474832 | 3432432 DOC",
];

/* ---------------- Component ---------------- */
export default function NewProjectBulkUploadPage() {
  const [jobNumber, setJobNumber] = useState("");
  const [jobName, setJobName] = useState("");
  const [selectedJobId, setSelectedJobId] = useState("");
  const [hasSaved, setHasSaved] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [error, setError] = useState("");

  const [selectedPole, setSelectedPole] = useState("");

  // Upload states
  const [documentType, setDocumentType] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDoc[]>([]);

  /* ---------------- Effects ---------------- */
  useEffect(() => {
    if (!jobNumber || !jobName) {
      setIsSettingsOpen(true);
    }
  }, []);

  /* ---------------- Handlers ---------------- */
  const handleJobChange = (jobId: string) => {
    setSelectedJobId(jobId);
    const job = jobOptions.find((j) => j.id === jobId);
    if (job) {
      setJobNumber(job.number);
      setJobName(job.name);
      setError("");
      setHasSaved(false);
    }
  };

  const handleSave = () => {
    if (!jobNumber || !jobName) {
      setError("Please select a Job to continue.");
      return;
    }
    setHasSaved(true);
    setIsSettingsOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile || !documentType) return;

    setUploadedDocs((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        file: selectedFile,
        fileName: selectedFile.name,
        documentType,
      },
    ]);

    // Reset inputs
    setSelectedFile(null);
    setDocumentType("");
  };

  const handleAddAnother = () => {
    setSelectedFile(null);
    setDocumentType("");
  };

  const handleDelete = (id: string) => {
    setUploadedDocs((prev) => prev.filter((doc) => doc.id !== id));
  };

  /* ---------------- AG Grid Columns ---------------- */
  const columnDefs = [
    { headerName: "File Name", field: "fileName", flex: 2 },
    { headerName: "Document Type", field: "documentType", flex: 1 },
    {
      headerName: "Actions",
      width: 120,
      cellRenderer: (params: any) => (
        <button
          onClick={() => handleDelete(params.data.id)}
          style={{
            background: "transparent",
            border: "none",
            color: "#D92D20",
            cursor: "pointer",
            fontSize: "13px",
          }}
        >
          Delete
        </button>
      ),
    },
  ];

  /* ---------------- JSX ---------------- */
  return (
    <>
      <Navbar />

      <ContextBar
        jobNumber={jobNumber}
        jobName={jobName}
        hasSaved={hasSaved}
        header_title="Bulk Document Upload"
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
        <div style={{ padding: "10px 16px", color: "red", fontSize: 12 }}>
          {error}
        </div>
      )}

      <div style={{ padding: "24px 32px" }}>
        {/* Pole Selector */}
        <section style={{ marginBottom: 28 }}>
          <label style={{ fontSize: 13.5, fontWeight: 600 }}>
            Pole Structure Search
          </label>

          <select
            value={selectedPole}
            onChange={(e) => setSelectedPole(e.target.value)}
            style={{
              width: 420,
              height: 32,
              marginTop: 6,
              borderRadius: 4,
              border: "1px solid #C7C7C7",
            }}
          >
            <option value="">Select Pole</option>
            {poleOptions.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </section>

        {/* Upload Card */}
        <section
          style={{
            width: 360,
            background: "#fff",
            borderRadius: 6,
            border: "1px solid #eaeaea",
            padding: "16px",
          }}
        >
          <label style={{ fontWeight: 600 }}>File 1</label>

          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 13, marginBottom: 6 }}>
              Document Type
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <select
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                style={{ flex: 1, height: 32 }}
              >
                <option value="">Select Document Type</option>
                <option value="Drawing">Drawing</option>
                <option value="Specification">Specification</option>
              </select>

              <input type="file" onChange={handleFileChange} />
            </div>
          </div>

          <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
            <button
              onClick={handleUpload}
              disabled={!selectedFile || !documentType}
              style={{
                background: "#1660E8",
                color: "#fff",
                border: "none",
                padding: "6px 14px",
                borderRadius: 4,
                cursor: "pointer",
                fontSize: 12.5,
              }}
            >
              Upload
            </button>

            <button
              onClick={handleAddAnother}
              style={{
                border: "1px solid #C7C7C7",
                background: "#fff",
                padding: "6px 14px",
                borderRadius: 4,
                fontSize: 12.5,
              }}
            >
              Add Another
            </button>
          </div>
        </section>

        {/* Uploaded Files Table */}
        {uploadedDocs.length > 0 && (
          <div
            className="ag-theme-quartz"
            style={{ marginTop: 24 }}
          >
            <AgGridReact
              rowData={uploadedDocs}
              columnDefs={columnDefs}
              domLayout="autoHeight"
              suppressRowClickSelection
            />
          </div>
        )}
      </div>
    </>
  );
}
