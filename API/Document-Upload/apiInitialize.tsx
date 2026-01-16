import { useEffect, useState } from "react";
import {
  getPoleStructuresByJob,
  getAllDocumentTypes,
  uploadSingleDocument,
  uploadMultipleDocuments,
  deleteUploadedDocument,
  submitDocumentsForPoleStructures,
} from "@/services/documentUpload.api";

/* =========================
   TYPES (local for now)
========================= */

export interface PoleStructure {
  id: string;
  name: string;
}

export interface DocumentType {
  id: string;
  name: string;
}

export interface UploadedDocument {
  document_id: string;
  file_name: string;
  document_type_id?: string;
}

/* =========================
   HOOK
========================= */

export function useDocumentUpload(jobId: string) {
  const [poleStructures, setPoleStructures] = useState<PoleStructure[]>([]);
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>([]);
  const [selectedPoleStructure, setSelectedPoleStructure] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* =========================
     INITIAL LOAD
  ========================= */

  useEffect(() => {
    if (!jobId) return;

    const loadInitialData = async () => {
      try {
        setLoading(true);

        const [poleRes, docTypeRes] = await Promise.all([
          getPoleStructuresByJob(jobId),
          getAllDocumentTypes(),
        ]);

        setPoleStructures(poleRes.data);
        setDocumentTypes(docTypeRes.data);
      } catch (err: any) {
        setError("Failed to load document upload data");
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, [jobId]);

  /* =========================
     FILE UPLOAD
  ========================= */

  const uploadFiles = async (files: File[], multiple = true) => {
    try {
      setLoading(true);

      let response;
      if (multiple) {
        const formData = new FormData();
        files.forEach(file => formData.append("files", file));
        response = await uploadMultipleDocuments(formData);
      } else {
        const formData = new FormData();
        formData.append("file", files[0]);
        response = await uploadSingleDocument(formData);
      }

      setUploadedDocuments(prev => [...prev, ...response.data]);
    } catch (err: any) {
      setError("File upload failed");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     UPDATE DOCUMENT TYPE
  ========================= */

  const updateDocumentTypeForFile = (
    documentId: string,
    documentTypeId: string
  ) => {
    setUploadedDocuments(prev =>
      prev.map(doc =>
        doc.document_id === documentId
          ? { ...doc, document_type_id: documentTypeId }
          : doc
      )
    );
  };

  /* =========================
     DELETE FILE
  ========================= */

  const removeUploadedDocument = async (documentId: string) => {
    try {
      setLoading(true);
      await deleteUploadedDocument(documentId);

      setUploadedDocuments(prev =>
        prev.filter(doc => doc.document_id !== documentId)
      );
    } catch {
      setError("Failed to delete document");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     SUBMIT DOCUMENTS
  ========================= */

  const submitDocuments = async () => {
    if (!selectedPoleStructure || uploadedDocuments.length === 0) {
      setError("Pole structure and documents are required");
      return;
    }

    try {
      setLoading(true);

      await submitDocumentsForPoleStructures({
        job_id: jobId,
        pole_structure_id: selectedPoleStructure,
        documents: uploadedDocuments.map(doc => ({
          document_id: doc.document_id,
          document_type_id: doc.document_type_id,
        })),
      });

      // Optional: reset state after success
      setUploadedDocuments([]);
    } catch {
      setError("Failed to submit documents");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     EXPOSE API
  ========================= */

  return {
    poleStructures,
    documentTypes,
    uploadedDocuments,
    selectedPoleStructure,

    setSelectedPoleStructure,
    uploadFiles,
    updateDocumentTypeForFile,
    removeUploadedDocument,
    submitDocuments,

    loading,
    error,
  };
}
