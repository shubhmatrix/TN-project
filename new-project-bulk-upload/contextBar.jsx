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
    <div className={styles["page-content-container"]}>
      <div className={styles["content-container"]}>
        <div
          className={styles["template-content"]}
          id="new_asset_document"
          style={{ overflowY: "auto" }}
        >
          {/* Header */}
          <div className={styles.header} id="context_filter_bar">
            <h1 className={styles["context-bar-header"]}>
              {header_title}
            </h1>
          </div>

          <div className={styles["header-divider"]}></div>

          {/* Attributes */}
          <div className={styles["header-attributes"]}>
            <div>
              <dt className={styles["attribute-name"]}>Job Number</dt>
              <dd
                className={
                  selectedJob
                    ? styles["attribute-text"]
                    : styles["attribute-text-unselected"]
                }
              >
                {selectedJob || "Not Selected"}
              </dd>
            </div>

            <div>
              <dt className={styles["attribute-name"]}>Job Name</dt>
              <dd
                className={
                  hasSaved
                    ? styles["attribute-text"]
                    : styles["attribute-text-unselected"]
                }
              >
                {hasSaved
                  ? "Longwood – El Dorado 345kV Line Rebuild"
                  : "Not Selected"}
              </dd>
            </div>

            <div>
              <dt className={styles["attribute-name"]}>Equipment</dt>
              <dd
                className={
                  selectedEquipment
                    ? styles["attribute-text"]
                    : styles["attribute-text-unselected"]
                }
              >
                {selectedEquipment || "Not Selected"}
              </dd>
            </div>
          </div>

          {/* Settings Button */}
          <div className={styles.settingsContainer}>
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
      </div>
    </div>
  );
};

export default ContextBar;
