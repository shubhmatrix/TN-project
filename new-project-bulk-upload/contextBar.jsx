"use client";

import styles from "../../styles/ContextBar.module.css";

interface ContextBarProps {
  selectedJob: string;
  selectedEquipment: string;
  hasSaved: boolean;
  header_title: string;
}

const ContextBar = ({
  selectedJob,
  selectedEquipment,
  hasSaved,
  header_title,
}: ContextBarProps) => {
  return (
  <div className={styles.container}>
    <div className={styles.header}>
      <h1 className={styles.title}>{header_title}</h1>

      <div className={styles.attributes}>
        <div className={styles.attrItem}>
          <dt className={styles.label}>Job Number</dt>
          <dd className={selectedJob ? styles.value : styles.unselected}>
            {selectedJob || "Not Selected"}
          </dd>
        </div>

        <div className={styles.attrItem}>
          <dt className={styles.label}>Job Name</dt>
          <dd className={hasSaved ? styles.value : styles.unselected}>
            {hasSaved
              ? "Longwood – El Dorado 345kV Line Rebuild"
              : "Not Selected"}
          </dd>
        </div>

        <div className={styles.attrItem}>
          <dt className={styles.label}>Equipment</dt>
          <dd className={selectedEquipment ? styles.value : styles.unselected}>
            {selectedEquipment || "Not Selected"}
          </dd>
        </div>
      </div>

      <button
  className="btn btn-outline-primary btn-sm"
  id="btn-settings"
  type="button"
  data-bs-toggle="offcanvas"
  data-bs-target="#reportSettings"
>
  Settings
</button>

    </div>
  </div>
);

};

export default ContextBar;
