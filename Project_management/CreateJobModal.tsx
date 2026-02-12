"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/CreateJobModal.module.css";
import { searchCrmJobs, createJob } from "@/services/projectManagement.api";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface CrmOption {
  crm_job_id: string;
  job_name: string;
  job_number: string;
}

const CreateJobModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState<CrmOption[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedCrmId, setSelectedCrmId] = useState<string | null>(null);
  const [jobName, setJobName] = useState("");
  const [jobNumber, setJobNumber] = useState("");
  const [vendor, setVendor] = useState("");
  const [dataApprover, setDataApprover] = useState<number | undefined>();

  /* ---------- Fetch CRM Jobs (Search) ---------- */
  useEffect(() => {
    if (!search) return;

    const delay = setTimeout(async () => {
      try {
        const res = await searchCrmJobs({
          crm_job_id: search,
          limit: 20,
        });

        setOptions(res.data.data || []);
      } catch (err) {
        console.error("CRM search failed");
      }
    }, 400); // debounce

    return () => clearTimeout(delay);
  }, [search]);

  /* ---------- On Select CRM ---------- */
  const handleSelect = (crm: CrmOption) => {
    setSelectedCrmId(crm.crm_job_id);
    setJobName(crm.job_name);
    setJobNumber(crm.job_number);
    setOptions([]);
    setSearch(crm.crm_job_id);
  };

  /* ---------- Submit ---------- */
  const handleCreate = async () => {
    if (!selectedCrmId) return;

    try {
      setLoading(true);

      await createJob({
        crm_job_id: selectedCrmId,
        job_name: jobName,
        job_number: jobNumber,
        vendor,
        data_approver_id: dataApprover,
        created_by: 1, // replace with logged-in user
      });

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Create job failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Create New Job</h3>

        {/* CRM Search */}
        <div className={styles.field}>
          <label>CRM Job ID</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search CRM Job ID..."
          />

          {options.length > 0 && (
            <div className={styles.dropdown}>
              {options.map((opt) => (
                <div
                  key={opt.crm_job_id}
                  className={styles.option}
                  onClick={() => handleSelect(opt)}
                >
                  {opt.crm_job_id} - {opt.job_name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Auto-filled fields */}
        <div className={styles.field}>
          <label>Job Number</label>
          <input value={jobNumber} disabled />
        </div>

        <div className={styles.field}>
          <label>Job Name</label>
          <input value={jobName} disabled />
        </div>

        <div className={styles.field}>
          <label>Vendor</label>
          <input
            value={vendor}
            onChange={(e) => setVendor(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label>Data Approver ID</label>
          <input
            type="number"
            onChange={(e) => setDataApprover(Number(e.target.value))}
          />
        </div>

        <div className={styles.actions}>
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleCreate}
            disabled={loading}
            className={styles.primary}
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateJobModal;
