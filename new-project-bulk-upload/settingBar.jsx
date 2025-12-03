"use client";

import { useEffect } from "react";
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
  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

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
          <label className={styles.label}>Job</label>
          <select
            className={styles.select}
            value={selectedJobId}
            onChange={(e) => onJobChange(e.target.value)}
          >
            <option value="">Select Job</option>
            {jobOptions.map((job) => (
              <option key={job.id} value={job.id}>
                {job.number} - {job.name}
              </option>
            ))}
          </select>

          <button
            className={styles.saveBtn}
            onClick={onSave}
            disabled={!selectedJobId}
          >
            Save &amp; Close
          </button>
        </div>
      </aside>
    </>
  );
}
