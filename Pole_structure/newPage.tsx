{
  field: "structure_id",
  headerName: "Structure",
  editable: true,
  cellEditor: "agSelectCellEditor",
  cellEditorParams: {
    values: structureOptions.map(opt => opt.value)
  },
  valueFormatter: (params: any) => {
    const match = structureOptions.find(
      opt => opt.value === params.value
    );
    return match ? match.label : "";
  },
  flex: 1
},


const handleAddRow = () => {
  const newRow = {
    pole_structure_description: "",
    structure_id: null,
    notes: "",
    crm_job_id: Number(selectedJobId),
    created_by: 1,
    isNew: true
  };

  gridRef.current?.api.applyTransaction({ add: [newRow] });
};

<button
  className={styles.secondaryButton}
  onClick={handleAddRow}
>
  Add Pole Structure
</button>

const gridRef = useRef<AgGridReact>(null);

<AgGridReact
  ref={gridRef}
  ...
/>

const handleSubmitChanges = async () => {
  if (!gridRef.current) return;

  const newRows: any[] = [];

  gridRef.current.api.forEachNode((node) => {
    if (node.data.isNew) {
      newRows.push(node.data);
    }
  });

  if (newRows.length === 0) {
    toast.info("No new rows to create");
    return;
  }

  try {
    for (const row of newRows) {
      if (!row.structure_id) {
        toast.error("Structure type is required");
        return;
      }

      await createPoleStructure({
        crm_job_id: row.crm_job_id,
        pole_structure_description:
          row.pole_structure_description || "",
        structure_id: row.structure_id,
        notes: row.notes || "",
        created_by: row.created_by
      });
    }

    toast.success("Pole structure created successfully");
    await refetch();
  } catch (err) {
    console.error(err);
    toast.error("Failed to create pole structure");
  }
};

<button
  type="button"
  className={styles.primaryButton}
  onClick={handleSubmitChanges}
>
  Submit Changes
</button>
