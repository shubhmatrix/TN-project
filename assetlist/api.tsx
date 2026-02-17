export const bulkUpdateExtractedValues = (payload: any) =>
  api.post("/assets/extracted-values/bulk-update", payload);

const [editedRows, setEditedRows] = useState<any[]>([]);

<AgGridReact
  ...
  onCellValueChanged={(params) => {
    const updatedRow = params.data;

    setEditedRows((prev) => {
      const exists = prev.find(
        (r) =>
          r.pole_structure_id === updatedRow.pole_structure_id &&
          r.document_id === updatedRow.document_id &&
          r.attribute_id === updatedRow.attribute_id
      );

      if (exists) {
        return prev.map((r) =>
          r.pole_structure_id === updatedRow.pole_structure_id &&
          r.document_id === updatedRow.document_id &&
          r.attribute_id === updatedRow.attribute_id
            ? updatedRow
            : r
        );
      }

      return [...prev, updatedRow];
    });
  }}
/>


const handleSubmitChanges = async () => {
  if (!editedRows.length) {
    toast.info("No changes to submit");
    return;
  }

  try {
    const payload = {
      updates: editedRows.map((row) => ({
        extracted_values_id: row.extracted_values_id || null,
        pole_structure_id: row.pole_structure_id,
        document_id: row.document_id,
        attribute_id: row.attribute_id,
        extract_value: row.extract_value ?? "",
        notes: row.notes ?? "",
        is_verified: row.is_verified ?? false,
        verified_by: 1, // replace with logged-in user id
      })),
    };

    const res = await bulkUpdateExtractedValues(payload);

    if (res.data.success) {
      toast.success(res.data.message);
      setEditedRows([]);
      await refetch(); // reload list
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to submit changes");
  }
};

<button
  className={styles.primaryButton}
  onClick={handleSubmitChanges}
>
  Submit Changes
</button>
