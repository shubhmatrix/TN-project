import { api } from "./api";

/* -------- Datalake Search -------- */
export const searchCrmJobs = (params: {
  crm_job_id?: string;
  job_name?: string;
  job_number?: string;
  limit?: number;
}) => {
  return api.get("/datalake/project-explorer", { params });
};

/* -------- Create Job -------- */
export const createJob = (payload: {
  crm_job_id: string;
  job_number?: string;
  job_name?: string;
  vendor?: string;
  data_approver_id?: number;
  created_by?: number;
}) => {
  return api.post("/admin-iceberg/create-job", payload);
};
