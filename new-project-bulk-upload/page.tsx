"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import ContextBar from "@/components/ContextBar";
import SettingsBar from "@/components/SettingsBar";

// ---- Static job list ----
type JobOption = {
  id: string;
  number: string;
  name: string;
};

const jobOptions: JobOption[] = [
  {
    id: "1",
    number: "000000",
    name: "Unknown Project",
  },
  {
    id: "2",
    number: "2006528",
    name: "Longwood – EL Dorado 345kV Line Rebuild",
  },
];

export default function NewProjectBulkUploadPage() {
  const [jobNumber, setJobNumber] = useState("");
  const [jobName, setJobName] = useState("");
  const [selectedJobId, setSelectedJobId] = useState("");
  const [hasSaved, setHasSaved] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [error, setError] = useState("");

  // Auto open settings on first load if no job selected
  useEffect(() => {
    if (!jobNumber || !jobName) {
      setIsSettingsOpen(true);
    }
  }, []);

  const handleJobChange = (jobId: string) => {
    setSelectedJobId(jobId);
    const job = jobOptions.find((j) => j.id === jobId);
    if (job) {
      setJobNumber(job.number);
      setJobName(job.name);
      setError("");
      setHasSaved(false);
    } else {
      setJobNumber("");
      setJobName("");
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

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Context Bar */}
      <ContextBar
        jobNumber={jobNumber}
        jobName={jobName}
        hasSaved={hasSaved}
        header_title="Bulk Document Upload"
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Settings Drawer */}
      <SettingsBar
        isOpen={isSettingsOpen}
        selectedJobId={selectedJobId}
        jobOptions={jobOptions}
        onJobChange={handleJobChange}
        onSave={handleSave}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* Optional inline error message */}
      {error && (
        <div style={{ padding: "10px 16px", color: "red", fontSize: 12 }}>
          {error}
        </div>
      )}

      {/* Main content area (table etc.) */}
      <div style={{ padding: "0 16px" }}>
        {/* TODO: BulkUploadTable goes here */}
      </div>
    </>
  );
}
