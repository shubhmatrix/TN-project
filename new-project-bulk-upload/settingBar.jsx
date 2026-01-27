"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "../styles/SettingsBar.module.css";

/* -------------------- Types -------------------- */
type JobOption = {
  id: string;
  number: string;
  name: string;
};

type DocumentTypeOption = {
  id: string;
  name: string;
};

interface SettingsBarProps {
  isOpen: boolean;

  /* Mode selector */
  mode?: "job" | "documentType"; // NEW

  /* Job props (existing) */
  selectedJobId?: string;
  jobOptions?: JobOption[];
  onJobChange?: (jobId: string) => void;

  /* Document type props (NEW) */
  selectedDocumentTypeId?: string;
  documentTypes?: DocumentTypeOption[];
  onDocumentTypeChange?: (id: string) => void;

  onSave: () => void;
  onClose: () => void;
}

export default function SettingsBar({
  isOpen,
  mode = "job",

  selectedJobId,
  jobOptions = [],
  onJobChange,

  selectedDocumentTypeId,
  documentTypes = [],
  onDocumentTypeChange,

  onSave,
  onClose,
}: SettingsBarProps) {
  const [query, setQuery] = useState("");
  const [isListOpen, setIsListOpen] = useState(false);

  /* Sync input when drawer opens */
  useEffect(() => {
    if (!isOpen) return;

    if (mode === "job") {
      const j = jobOptions.find((job) => job.id === selectedJobId);
      setQuery(j ? `${j.number} - ${j.name}` : "");
    } else {
      const d = documentTypes.find(
        (dt) => dt.id === selectedDocumentTypeId
      );
      setQuery(d ? d.name : "");
    }

    setIsListOpen(false);
  }, [
    isOpen,
    mode,
    selectedJobId,
    selectedDocumentTypeId,
    jobOptions,
    documentTypes,
  ]);

  /* Filter list */
  const filteredOptions = useMemo(() => {
    if (!query) {
      return mode === "job" ? jobOptions : documentTypes;
    }

    const q = query.toLowerCase();
    return (mode === "job" ? jobOptions : documentTypes).filter(
      (item: any) =>
        (mode === "job"
          ? `${item.number} - ${item.name}`
          : item.name
        )
          .toLowerCase()
          .includes(q)
    );
  }, [query, mode, jobOptions, documentTypes]);

  /* ESC closes */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleSelect = (item: any) => {
    if (mode === "job") {
      onJobChange?.(item.id);
      setQuery(`${item.number} - ${item.name}`);
    } else {
      onDocumentTypeChange?.(item.id);
      setQuery(item.name);
    }
    setIsListOpen(false);
  };

  const isSaveDisabled =
    mode === "job"
      ? !selectedJobId
      : !selectedDocumentTypeId;

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
          <label className={styles.label}>
            {mode === "job" ? "Job" : "Document Type"}
          </label>

          <div className={styles.jobSelect}>
            <input
              className={styles.jobInput}
              value={query}
              placeholder={
                mode === "job"
                  ? "Select Job"
                  : "Select Document Type"
              }
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
                {filteredOptions.length === 0 && (
                  <div className={styles.noResults}>
                    No results found
                  </div>
                )}

                {filteredOptions.map((item: any) => (
                  <div
                    key={item.id}
                    className={styles.jobOption}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSelect(item);
                    }}
                  >
                    {mode === "job"
                      ? `${item.number} - ${item.name}`
                      : item.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            className={styles.saveBtn}
            onClick={onSave}
            disabled={isSaveDisabled}
          >
            Save &amp; Close
          </button>
        </div>
      </aside>
    </>
  );
}
