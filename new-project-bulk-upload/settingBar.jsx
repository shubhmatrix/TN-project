"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "../styles/SettingsBar.module.css";

type JobOption = {
  id: string;
  number: string;
  name: string;
};

interface SettingsBarProps {
  isOpen: boolean;
  selectedJobId: string;
  jobOptions: JobOption[];
  onJobChange: (jobId: string) => void;
  onSave: () => void;
  onClose: () => void;
}

export default function SettingsBar({
  isOpen,
  selectedJobId,
  jobOptions,
  onJobChange,
  onSave,
  onClose,
}: SettingsBarProps) {
  // local search state
  const [query, setQuery] = useState("");
  const [isListOpen, setIsListOpen] = useState(false);

  // synchronize query with selected job when drawer opens
  useEffect(() => {
    if (!isOpen) return;
    const j = jobOptions.find((job) => job.id === selectedJobId);
    if (j) {
      setQuery(`${j.number} - ${j.name}`);
    } else {
      setQuery("");
    }
    setIsListOpen(false);
  }, [isOpen, selectedJobId, jobOptions]);

  // filter jobs by query
  const filteredJobs = useMemo(() => {
    if (!query) return jobOptions;
    const q = query.toLowerCase();
    return jobOptions.filter((job) =>
      `${job.number} - ${job.name}`.toLowerCase().includes(q)
    );
  }, [query, jobOptions]);

  // ESC closes sidebar
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleSelectJob = (job: JobOption) => {
    onJobChange(job.id);
    setQuery(`${job.number} - ${job.name}`);
    setIsListOpen(false);
  };

  const handleSaveClick = () => {
    if (!selectedJobId) return;
    onSave();
  };

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.header}>
          <h3>Settings</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.content}>
          {/* Job label */}
          <label className={styles.label}>Job</label>

          {/* Searchable dropdown */}
          <div className={styles.jobSelect}>
            <input
              className={styles.jobInput}
              value={query}
              placeholder="Select Job"
              onChange={(e) => {
                setQuery(e.target.value);
                setIsListOpen(true);
              }}
              onFocus={() => setIsListOpen(true)}
            />

            <div
              className={`${styles.arrow} ${
                isListOpen ? styles.arrowOpen : ""
              }`}
              onClick={() => setIsListOpen((o) => !o)}
            >
              ▾
            </div>

            {isListOpen && (
              <div className={styles.jobList}>
                {filteredJobs.length === 0 && (
                  <div className={styles.noResults}>No results found</div>
                )}

                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className={styles.jobOption}
                    onMouseDown={(e) => {
                      // prevent blurring the input before click
                      e.preventDefault();
                      handleSelectJob(job);
                    }}
                  >
                    {job.number} - {job.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            className={styles.saveBtn}
            onClick={handleSaveClick}
            disabled={!selectedJobId}
          >
            Save &amp; Close
          </button>
        </div>
      </aside>
    </>
  );
}
