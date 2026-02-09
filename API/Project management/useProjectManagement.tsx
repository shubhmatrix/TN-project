import { useEffect, useState } from "react";
import {
  getAllJobs,
  getProjectExplorer,
  createJob,
} from "@/services/project.api";
import { toast } from "react-toastify";

export function useProjectManagement() {
  const [projects, setProjects] = useState<any[]>([]);
  const [projectExplorer, setProjectExplorer] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [jobsRes, explorerRes] = await Promise.all([
        getAllJobs(),
        getProjectExplorer(),
      ]);

      setProjects(jobsRes.data.jobs);
      setProjectExplorer(explorerRes.data.data);
    } catch {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const addNewRow = () => {
    setProjects((prev) => [
      {
        _isNew: true,
        crm_job_id: "",
        job_number: "",
        job_name: "",
        vendor: "",
      },
      ...prev,
    ]);
  };

  const updateRow = (rowIndex: number, data: any) => {
    setProjects((prev) => {
      const copy = [...prev];
      copy[rowIndex] = { ...copy[rowIndex], ...data };
      return copy;
    });
  };

  const submitChanges = async () => {
    const newRows = projects.filter((p) => p._isNew);

    if (!newRows.length) {
      toast.info("No new jobs to submit");
      return;
    }

    try {
      for (const row of newRows) {
        await createJob({
          crm_job_id: row.crm_job_id,
          job_number: row.job_number,
          job_name: row.job_name,
          vendor: row.vendor,
          created_by: 1,
        });
      }

      toast.success("Jobs created successfully");
      loadData();
    } catch {
      toast.error("Failed to create job");
    }
  };

  return {
    projects,
    projectExplorer,
    loading,
    addNewRow,
    updateRow,
    submitChanges,
  };
}
