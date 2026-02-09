"use client";

import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  ModuleRegistry,
  AllCommunityModule,
  themeQuartz,
  iconSetMaterial,
} from "ag-grid-community";
import { useMemo } from "react";
import { useProjectManagement } from "@/hooks/useProjectManagement";
import styles from "@/styles/Admin.module.css";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function ProjectManagement() {
  const {
    projects,
    projectExplorer,
    addNewRow,
    updateRow,
    submitChanges,
  } = useProjectManagement();
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const columnDefs = useMemo<ColDef[]>(() => [
    {
      field: "crm_job_id",
      headerName: "CRM Opportunity",
      editable: (p) => p.data?._isNew,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: projectExplorer
          .filter((p) => p.crm_job_id)
          .map((p) => p.crm_job_id),
      },
      valueFormatter: (params) => {
        const match = projectExplorer.find(
          (p) => p.crm_job_id === params.value
        );
        return match
          ? `${match.crm_job_id} - ${match.job_name}`
          : params.value;
      },
      onCellValueChanged: (params) => {
        const match = projectExplorer.find(
          (p) => p.crm_job_id === params.newValue
        );

        if (!match) return;

        updateRow(params.node.rowIndex!, {
          crm_job_id: match.crm_job_id,
          job_number: match.job_number,
          job_name: match.job_name,
        });
      },
      flex: 2,
    },
    { field: "vendor", headerName: "Vendor", flex: 1 },
    { field: "job_name", headerName: "Job Name", flex: 2 },
   {
      headerName: "Verify Project",
      field: "is_verified",
      width: 150,
      cellRenderer: VerifyCheckboxRenderer,
      cellRendererParams: {
        onClickVerify: (row: any) => {
          setSelectedRow(row);
          setOpenConfirm(true);
        },
      },
    },
  ], [projectExplorer]);

  const gridTheme = themeQuartz.withPart(iconSetMaterial);

  return (
    <div className={styles.wrapper}>
      <div className={`ag-theme-quartz ${styles.gridContainer}`}>
        <AgGridReact
          theme={gridTheme}
          rowData={projects}
          columnDefs={columnDefs}
          defaultColDef={{
            sortable: true,
            filter: true,
            resizable: true,
          }}
          singleClickEdit
          stopEditingWhenCellsLoseFocus
        />
      </div>

      <div className={styles.footer}>
        <button
          className={styles.secondaryButton}
          onClick={addNewRow}
        >
          Add New Job
        </button>

        <button
          className={styles.primaryButton}
          onClick={submitChanges}
        >
          Submit Changes
        </button>
      </div>
    </div>
  );
}
