import axios from "axios";

export const createPoleStructure = (payload: {
  crm_job_id: number;
  pole_structure_description: string;
  structure_id: number;
  notes: string;
  created_by: number;
}) => {
  return axios.post(
    "/api/documents/pole-structures/create",
    payload
  );
};
