"use client";

import React, { useState } from "react";
import styles from "@/styles/Modal.module.css";
import { createPoleStructure } from "@/services/poleStructures.api";
import { toast } from "react-toastify";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  crmJobOptions: { id: number; label: string }[];
  structureOptions: { id: number; label: string }[];
}

const CreatePoleStructureModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSuccess,
  crmJobOptions,
  structureOptions,
}) => {
  const [crmJobId, setCrmJobId] = useState<number | null>(null);
  const [structureId, setStructureId] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const handleCreate = async () => {
    try {
      if (!crmJobId || !structureId || !description) {
        toast.error("Please fill all required fields");
        return;
      }

      const payload = {
        crm_job_id: crmJobId,
        pole_structure_description: description,
        structure_id: structureId,
        notes,
        created_by: 1, // replace with logged-in user id
      };

      await createPoleStructure(payload);

      toast.success("Pole structure created successfully");

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create pole structure");
    }
  };

  return (
    <div className={styles.overlay}>
  <div className={styles.modal}>
    <div className={styles.title}>Create Pole Structure</div>

    <div className={styles.field}>
      <label className={styles.label}>CRM Job</label>
      <select
        className={styles.select}
        value={crmJobId ?? ""}
        onChange={(e) => setCrmJobId(Number(e.target.value))}
      >
        <option value="">Select CRM Job</option>
        {crmJobOptions.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>

    <div className={styles.field}>
      <label className={styles.label}>Structure</label>
      <select
        className={styles.select}
        value={structureId ?? ""}
        onChange={(e) => setStructureId(Number(e.target.value))}
      >
        <option value="">Select Structure</option>
        {structureOptions.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>

    <div className={styles.field}>
      <label className={styles.label}>Description</label>
      <input
        type="text"
        className={styles.input}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>

    <div className={styles.field}>
      <label className={styles.label}>Notes</label>
      <textarea
        className={styles.textarea}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
    </div>

    <div className={styles.actions}>
      <button
        className={styles.cancelBtn}
        onClick={onClose}
      >
        Cancel
      </button>

      <button
        className={styles.createBtn}
        onClick={handleCreate}
      >
        Create
      </button>
    </div>
  </div>
</div>

  );
};

export default CreatePoleStructureModal;
