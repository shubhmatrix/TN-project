"use client";

import React, { useRef } from "react";
import Navbar from "@/components/navbar";
import ContextBar from "@/components/ContextBar";
import SettingsBar from "@/components/SettingsBar";
import { useDocumentUpload } from "@/hooks/useDocumentUpload";

/* -------------------- Component -------------------- */
export default function DocumentUpload() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    poleOptions,
    poles,
    activePoleId,
    setActivePoleId,
    addPole,
    addFilesToActivePole,
    removeFileFromActivePole,
    updateFileDocType,
  } = useDocumentUpload();

  const activePole = poles.find((p) => p.poleId === activePoleId);

  return (
    <>
      <Navbar />

      <ContextBar
        jobNumber="000000"
        jobName="Unknown Project"
        hasSaved={true}
        header_title="Document Upload"
        onOpenSettings={() => {}}
      />

      <SettingsBar
        isOpen={false}
        selectedJobId=""
        jobOptions={[]}
        onJobChange={() => {}}
        onSave={() => {}}
        onClose={() => {}}
      />

      <div style={{ padding: "20px 32px" }}>
        {/* ---------------- Pole Structures ---------------- */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontWeight: 600, fontSize: 13 }}>
            Pole Structures:
          </label>

          {/* Selected Pole Tags */}
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
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

          {/* Add Pole Dropdown */}
          <select
            style={{ marginTop: 8, height: 28 }}
            defaultValue=""
            onChange={(e) => addPole(e.target.value)}
          >
            <option value="" disabled>
              Add Tag
            </option>
            {poleOptions.map((pole) => (
              <option key={pole.poleId} value={pole.poleId}>
                {pole.poleLabel}
              </option>
            ))}
          </select>
        </div>

        {/* ---------------- Main Content ---------------- */}
        <div style={{ display: "flex", gap: 24 }}>
          {/* Upload Box */}
          <div
            onDrop={(e) => {
              e.preventDefault();
              addFilesToActivePole(e.dataTransfer.files);
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
                e.target.files && addFilesToActivePole(e.target.files)
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
                            updateFileDocType(file.id, e.target.value)
                          }
                        >
                          <option value="">Select a Document Type</option>
                          <option value="Drawing">Drawing</option>
                          <option value="Specification">Specification</option>
                        </select>
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            removeFileFromActivePole(file.id)
                          }
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
