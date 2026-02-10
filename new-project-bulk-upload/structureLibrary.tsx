const mapRowDataToSubmitPayload = (rows: any[]) => {
  return {
    documents: rows.map((row) => ({
      document_id: row.document_id,
      original_filename: row.original_filename,
      stored_filename: row.stored_filename,
      file_path: row.file_path,
      file_size: row.file_size,
      file_type: row.mime_type,
      blob_url: row.blob_uri,
      version_number: row.version_number ?? 1,
      upload_status: "Uploaded",
      extraction_status: "Pending",
      uploaded_by: row.uploaded_by ?? null,
      crm_job_id: row.crm_job_id,
      document_type_id: row.document_type_id,
    })),

    pole_structure_ids: [
      ...new Set(rows.map((row) => row.pole_structure_id)),
    ],
  };
};


export const submitDocumentsForPoleStructures = (payload: any) => {
  return axios.post(
    "/api/documents/submit-documents-for-pole-structures",
    payload
  );
};

const handleSubmitChanges = async () => {
  try {
    if (!rowData || rowData.length === 0) {
      toast.error("No documents to submit");
      return;
    }

    const payload = mapRowDataToSubmitPayload(rowData);

    console.log("SUBMIT PAYLOAD 👉", payload);

    await submitDocumentsForPoleStructures(payload);

    toast.success("Documents submitted successfully");
  } catch (error) {
    console.error("Submit failed", error);
    toast.error("Failed to submit documents");
  }
};


<button
  type="button"
  className={styles.primaryButton}
  onClick={handleSubmitChanges}
>
  Submit Changes
</button>
