"use client";

import styles from "../styles/SettingsBar.module.css";

interface SettingsBarProps {
  selectedJob: string;
  selectedEquipment: string;
  jobOptions: string[];
  equipmentOptions: string[];
  onJobChange: (val: string) => void;
  onEquipmentChange: (val: string) => void;
  onSave: () => void;
}

export default function SettingsBar({
  selectedJob,
  selectedEquipment,
  jobOptions,
  equipmentOptions,
  onJobChange,
  onEquipmentChange,
  onSave,
}: SettingsBarProps) {
  return (
    <div
  className="offcanvas offcanvas-end"
  tabIndex={-1}
  id="reportSettings"       // must match button target
  aria-labelledby="reportSettingsLabel"
>
      {/* Header */}
      <div className="offcanvas-header">
        <h5 className="offcanvas-title fw-semibold" id="reportSettingsLabel">
          Settings
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>

      {/* Body */}
      <div className={`offcanvas-body ${styles.filtersContainer}`}>

        {/* Job Dropdown */}
        <div className="mb-3">
          <label className={styles.label}>Job</label>
          <select
            className="form-select"
            value={selectedJob}
            required
            onChange={(e) => onJobChange(e.target.value)}
          >
            <option value="">Select...</option>
            {jobOptions.map((job, i) => (
              <option key={i} value={job}>
                {job}
              </option>
            ))}
          </select>
        </div>

        {/* Equipment Dropdown */}
        <div className="mb-3">
          <label className={styles.label}>Equipment</label>
          <select
            className="form-select"
            value={selectedEquipment}
            required
            onChange={(e) => onEquipmentChange(e.target.value)}
          >
            <option value="">Select...</option>
            {equipmentOptions.map((eq, i) => (
              <option key={i} value={eq}>
                {eq}
              </option>
            ))}
          </select>
        </div>

        {/* Save & Close Button */}
        <button
          className="btn btn-outline-primary btn-sm w-100"
          type="button"
          data-bs-dismiss="offcanvas"
          onClick={onSave}
        >
          Save & Close
        </button>
      </div>
    </div>
  );
}
