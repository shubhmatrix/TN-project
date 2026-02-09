import { api } from "./api";

export const getAllJobs = () =>
  api.get("/admin-iceberg/jobs");

export const getProjectExplorer = () =>
  api.get("/datalake/project-explorer");

export const createJob = (payload: {
  crm_job_id: string;
  job_number: string;
  job_name: string;
  vendor?: string;
  created_by: number;
}) =>
  api.post("/admin-iceberg/create-job", payload);
