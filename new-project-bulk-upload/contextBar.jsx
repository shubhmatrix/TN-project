"use client";

import styles from "../styles/ContextBar.module.css";

interface ContextBarProps {
  jobNumber: string;
  jobName: string;
  hasSaved: boolean;
  header_title: string;
  onOpenSettings: () => void;
}

export default function ContextBar({
  jobNumber,
  jobName,
  hasSaved,
  header_title,
  onOpenSettings,
}: ContextBarProps) {
  const jobSelected = !!jobNumber && !!jobName;

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>{header_title}</h1>

        <div className={styles.attributes}>
          <div className={styles.attrItem}>
            <dt className={styles.label}>Job Number</dt>
            <dd className={jobSelected ? styles.value : styles.unselected}>
              {jobNumber || "Not Selected"}
            </dd>
          </div>

          <div className={styles.attrItem}>
            <dt className={styles.label}>Job Name</dt>
            <dd className={jobSelected ? styles.value : styles.unselected}>
              {jobName || "Not Selected"}
            </dd>
          </div>
        </div>

        <button className={styles.settingsButton} onClick={onOpenSettings}>
          Settings
        </button>
      </div>
    </div>
  );
}
