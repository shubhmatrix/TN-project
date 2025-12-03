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

      <div style={{ padding: "24px 40px" }}>
  {!hasSaved ? (
    <p
      style={{
        textAlign: "center",
        color: "#666",
        marginTop: "120px",
        fontSize: "15px",
      }}
    >
      Please enter Job and Equipment selection via Settings bar to proceed with
      asset upload.
    </p>
  ) : (
    <>
      {/* Pole Selector */}
      <section style={{ marginBottom: "32px" }}>
        <label
          style={{
            fontWeight: 600,
            fontSize: "14px",
            marginBottom: "8px",
            display: "block",
          }}
        >
          Pole Structure Search
        </label>

        <select
          style={{
            width: "360px",
            height: "34px",
            borderRadius: "4px",
            border: "1px solid #C7C7C7",
            padding: "4px 8px",
            background: "#fff",
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

      {/* Upload Panel */}
      <section
        style={{
          width: "400px",
          border: "1px solid #eee",
          borderRadius: "6px",
          padding: "16px 18px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          background: "#fff",
        }}
      >
        <label style={{ fontWeight: 600, fontSize: "15px" }}>File 1</label>

        {/* File Row */}
        <div style={{ marginTop: "14px" }}>
          <div style={{ marginBottom: "8px", fontSize: "13px" }}>Document Type</div>

          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <select
              style={{
                height: "34px",
                flex: 1,
                border: "1px solid #C7C7C7",
                borderRadius: "4px",
                padding: "4px 8px",
                fontSize: "13px",
              }}
            >
              <option>Select Document Type</option>
            </select>

            <input
              type="file"
              style={{
                height: "34px",
                fontSize: "13px",
                border: "none",
              }}
            />
          </div>
        </div>

        {/* Buttons */}
        <div style={{ marginTop: "18px", display: "flex", gap: "10px" }}>
          <button
            style={{
              background: "#007BFF",
              border: "none",
              color: "white",
              padding: "6px 18px",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            Upload
          </button>

          <button
            style={{
              background: "white",
              border: "1px solid #C7C7C7",
              padding: "6px 18px",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "13px",
              color: "#555",
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
