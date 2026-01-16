import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

/* =========================
   POLE STRUCTURES
========================= */

export const searchPoleStructureDocuments = (params: {
  job_id: string;
  search_text?: string;
}) =>
  api.get("/api/documents/pole-structure-search", { params });

export const getPoleStructuresByJob = (jobId: string) =>
  api.get("/api/documents/pole-structures", {
    params: { job_id: jobId },
  });

export const createPoleStructure = (payload: any) =>
  api.post("/api/documents/pole-structures/create", payload);

export const verifyPoleStructure = (payload: any) =>
  api.post("/api/documents/pole-structures/verify", payload);

/* =========================
   DOCUMENT TYPES
========================= */

export const getAllDocumentTypes = () =>
  api.get("/api/documents/document-types");

export const getDocumentTypeById = (id: string) =>
  api.get(`/api/documents/document-types/${id}`);

export const createDocumentType = (payload: any) =>
  api.post("/api/documents/document-types/create", payload);

export const updateDocumentType = (payload: any) =>
  api.put("/api/documents/document-types/update", payload);

export const deleteDocumentType = (id: string) =>
  api.delete("/api/documents/document-types/delete", {
    data: { id },
  });

/* =========================
   STRUCTURE TYPES
========================= */

export const getAllStructureTypes = () =>
  api.get("/api/documents/structure-types");

export const getStructureTypeById = (id: string) =>
  api.get(`/api/documents/structure-types/${id}`);

export const createStructureType = (payload: any) =>
  api.post("/api/documents/structure-types/create", payload);

export const updateStructureType = (payload: any) =>
  api.put("/api/documents/structure-types/update", payload);

export const deleteStructureType = (id: string) =>
  api.delete("/api/documents/structure-types/delete", {
    data: { id },
  });

/* =========================
   DOCUMENT UPLOAD
========================= */

export const uploadSingleDocument = (formData: FormData) =>
  api.post("/api/documents/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const uploadMultipleDocuments = (formData: FormData) =>
  api.post("/api/documents/upload-multiple", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteUploadedDocument = (documentId: string) =>
  api.delete("/api/documents/delete", {
    data: { document_id: documentId },
  });

export const submitDocumentsForPoleStructures = (payload: any) =>
  api.post("/api/documents/submit-documents-for-pole-structures", payload);
