"use client";
import { useState } from "react";
import styles from "./SettingsBar.module.css";

interface SettingsBarProps {
  isOpen: boolean;
  selectedJob: string;
  selectedEquipment: string;
  jobOptions: string[];
  equipmentOptions: string[];
  onJobChange: (value: string) => void;
  onEquipmentChange: (value: string) => void;
  onSave: () => void;
  onClose: () => void;
}

export default function SettingsBar({
  isOpen,
  selectedJob,
  selectedEquipment,
  jobOptions,
  equipmentOptions,
  onJobChange,
  onEquipmentChange,
  onSave,
  onClose,
}: SettingsBarProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && <div className={styles.overlay} onClick={onClose}></div>}

      {/* Right side drawer */}
      <div className={`${styles.drawer} ${isOpen ? styles.open : ""}`}>
        <div className={styles.header}>
          <h4>Settings</h4>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div className={styles.body}>
          <label>Job</label>
          <select
            value={selectedJob}
            onChange={(e) => onJobChange(e.target.value)}
          >
            <option value="">Select Job</option>
            {jobOptions.map((job) => (
              <option key={job} value={job}>
                {job}
              </option>
            ))}
          </select>

          <label>Equipment</label>
          <select
            value={selectedEquipment}
            onChange={(e) => onEquipmentChange(e.target.value)}
          >
            <option value="">Select Equipment</option>
            {equipmentOptions.map((eq) => (
              <option key={eq} value={eq}>
                {eq}
              </option>
            ))}
          </select>

          <button className={styles.saveBtn} onClick={onSave}>
            Save & Close
          </button>
        </div>
      </div>
    </>
  );
}
