"use client";

import React, { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";

// AG Grid modules (v34+)
import {
  ModuleRegistry,
  AllCommunityModule,
  CellClickedEvent,
  ColDef,
} from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);

// Enterprise features (menus, row drag, etc.)
import "ag-grid-enterprise";

// Themes
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "@/styles/Ag-theme-kds.module.css";

import styles from "@/styles/ProjectManagementList.module.css";

type ProjectRow = {
  id: number;
  crmOpportunity: string;
  vendor: string;
  dataApprover: string;
  verifyProject: boolean;
  lastUpdated: string;
  lastUpdatedBy: string;
};

// Mock data similar to screenshot
const initialRows: ProjectRow[] = [
  {
    id: 1,
    crmOpportunity: "20011203 – NGL – Fields Point Liquefaction Project",
    vendor: "Kiewit – Fluor JV",
    dataApprover: "Cole Warner",
    verifyProject: true,
    lastUpdated: "06/29/2025 09:20:31 AM",
    lastUpdatedBy: "Cole.Warner@kiewit.com",
  },
  {
    id: 2,
    crmOpportunity: "20011072 – Calnos Covestro Vinyl Acetate Monomer",
    vendor: "Covestro",
    dataApprover: "Cole Warner",
    verifyProject: false,
    lastUpdated: "06/28/2025 03:14:02 PM",
    lastUpdatedBy: "Cole.Warner@kiewit.com",
  },
  {
    id: 3,
    crmOpportunity: "20011589 – FEED – JAX LNG – Jacksonville",
    vendor: "JAX LNG",
    dataApprover: "Cole Warner",
    verifyProject: true,
    lastUpdated: "06/27/2025 11:05:48 AM",
    lastUpdatedBy: "Cole.Warner@kiewit.com",
  },
  {
    id: 4,
    crmOpportunity: "20012750 – Robinson LNG Storage Facility",
    vendor: "Robinson",
    dataApprover: "Cole Warner",
    verifyProject: false,
    lastUpdated: "06/26/2025 04:32:17 PM",
    lastUpdatedBy: "Cole.Warner@kiewit.com",
  },
];

// Yellow toggle renderer (same visual as other modules)
const ToggleRenderer: React.FC<{ value: any }> = ({ value }) => {
  const on = Boolean(value);
  return (
    <span
      className={
        on ? styles.yellowToggleOn : styles.yellowToggleOff
      }
    />
  );
};

const ProjectManagementList: React.FC = () => {
  const [rowData, setRowData] = useState<ProjectRow[]>(initialRows);

  const columnDefs = useMemo<ColDef[]>(
    () => [
      {
        field: "crmOpportunity",
        headerName: "CRM Opportunity",
        rowDrag: true,
        flex: 2,
        editable: true, // as you requested
      },
      {
        field: "vendor",
        headerName: "Vendor",
        flex: 1.3,
        editable: true,
      },
      {
        field: "dataApprover",
        headerName: "Data Approver",
        flex: 1.2,
        editable: true,
      },
      {
        field: "verifyProject",
        headerName: "Verify Project",
        width: 130,
        sortable: false,
        filter: false,
        editable: false, // controlled via click
        cellRenderer: (p) => <ToggleRenderer value={p.value} />,
      },
      {
        field: "lastUpdated",
        headerName: "Last Updated",
        width: 170,
        editable: false,
      },
      {
        field: "lastUpdatedBy",
        headerName: "Last Updated By",
        width: 220,
        editable: false,
      },
    ],
    []
  );

  // Toggle Verify Project when that cell is clicked
  const handleCellClicked = (event: CellClickedEvent) => {
    if (event.colDef.field !== "verifyProject") return;

    setRowData((prev) => {
      const updated = [...prev];
      const rowIndex = event.rowIndex ?? -1;
      if (rowIndex < 0 || rowIndex >= updated.length) return prev;

      const row = { ...updated[rowIndex] };
      row.verifyProject = !row.verifyProject;
      updated[rowIndex] = row;
      return updated;
    });
  };

  const handleAddJob = () => {
    setRowData((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        crmOpportunity: "",
        vendor: "",
        dataApprover: "",
        verifyProject: false,
        lastUpdated: "",
        lastUpdatedBy: "",
      },
    ]);
  };

  const handleSubmitChanges = () => {
    // Replace with API call later
    console.log("Submitting project management changes:", rowData);
    alert("Mock submit — check console for payload.");
  };

  return (
    <div className={styles.wrapper}>
      {/* Title row */}
      <div className={styles.headerRow}>
        <h2 className={styles.title}>Project Management</h2>
      </div>

      {/* Grid container with theme & scroll */}
      <div className={`ag-theme-kds ${styles.gridContainer}`}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          animateRows={true}
          rowDragManaged={true}
          suppressRowClickSelection={true}
          defaultColDef={{
            sortable: true,
            resizable: true,
            filter: true, // gives you the 3-dot column menu
          }}
          onCellClicked={handleCellClicked}
        />
      </div>

      {/* Footer buttons */}
      <div className={styles.footer}>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={handleAddJob}
        >
          Add New Job
        </button>
        <button
          type="button"
          className={styles.primaryButton}
          onClick={handleSubmitChanges}
        >
          Submit Changes
        </button>
      </div>
    </div>
  );
};

export default ProjectManagementList;
