"use client";
import React, { useState } from "react";
import Navbar from "@/components/navbar";
import ContextBar from "@/components/ContextBar";
import SettingsBar from "@/components/SettingsBar";

export default function DocumentUploadPage() {
  const [selectedJob, setSelectedJob] = useState("");
  const [hasSaved, setHasSaved] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(true);

  const jobOptions = [
    {
      id: 1,
      number: "2004528",
      name: "Longwood – El Dorado 345kV Line Rebuild",
    },
  ];

  const poleOptions = [
    "2004528 | 60+927ft+L Loc | 21/515-1-PA | 110",
    "2004528 | 60+934ft+R Loc | 21/517-1-PA | 120",
  ];

  const [selectedPole, setSelectedPole] = useState("");

  const handleSave = () => {
    if (!selectedJob) return;
    setHasSaved(true);
    setIsSettingsOpen(false);
  };

  return (
    <>
      <Navbar />

      <ContextBar
        selectedJob={selectedJob}
        hasSaved={hasSaved}
        header_title="Document Upload"
      />

      <SettingsBar
        isOpen={isSettingsOpen}
        selectedJob={selectedJob}
        jobOptions={jobOptions}
        onJobChange={(job) => {
          setSelectedJob(job);
          setHasSaved(false);
        }}
        onSave={handleSave}
        onClose={() => setIsSettingsOpen(false)}
      />

      <div style={{ padding: "40px" }}>
        {!hasSaved && (
          <p style={{ textAlign: "center", color: "#888", marginTop: "120px" }}>
            Please select Job first using Settings bar to proceed with upload.
          </p>
        )}

        {hasSaved && (
          <>
            {/* Pole Selection */}
            <section style={{ marginBottom: "40px" }}>
              <label
                style={{ fontWeight: "600", marginBottom: "10px", display: "block" }}
              >
                Pole Structure Search
              </label>

              <select
                style={{
                  width: "400px",
                  height: "36px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  padding: "6px",
                }}
                value={selectedPole}
                onChange={(e) => setSelectedPole(e.target.value)}
              >
                <option value="">Select Pole</option>
                {poleOptions.map((item, idx) => (
                  <option key={idx} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </section>

            {/* Upload Form */}
            <section
              style={{
                border: "1px solid #ddd",
                padding: "20px",
                width: "380px",
                borderRadius: "6px",
              }}
            >
              <label style={{ fontWeight: "600" }}>File 1</label>

              <div style={{ marginTop: "10px" }}>
                <label style={{ marginRight: "10px" }}>Document Type:</label>
                <select
                  style={{
                    height: "32px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                >
                  <option>Select Document Type</option>
                </select>
                <input type="file" style={{ marginLeft: "10px" }} />
              </div>

              <div style={{ marginTop: "16px" }}>
                <button
                  style={{
                    marginRight: "10px",
                    padding: "6px 14px",
                    background: "#007bff",
                    color: "#fff",
                    borderRadius: "4px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Upload
                </button>

                <button
                  style={{
                    padding: "6px 14px",
                    background: "#fff",
                    color: "#444",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    cursor: "pointer",
                  }}
                >
                  Add Another
                </button>
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
}
