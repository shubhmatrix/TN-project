"use client";

import React, { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";

// Enterprise modules
import "ag-grid-enterprise";

// Themes + styles
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

// Custom Quartz overrides
import styles from "@/styles/DocumentAdministrationList.module.css";

// Mock data
const initialRows = [
  {
    document: "Shop Drawing",
    vim: true,
    rtf: true,
    xml: false,
    referenceDoc: true,
    lastUpdated: "01/23/2025 10:58 AM",
    lastUpdatedBy: "jack.goldstein@kiewit.com",
  },
  {
    document: "Structure Check Report",
    vim: false,
    rtf: true,
    xml: false,
    referenceDoc: false,
    lastUpdated: "01/22/2025 02:15 PM",
    lastUpdatedBy: "jack.goldstein@kiewit.com",
  },
  {
    document: "Structure Analysis Report",
    vim: true,
    rtf: true,
    xml: true,
    referenceDoc: false,
    lastUpdated: "01/20/2025 09:10 AM",
    lastUpdatedBy: "jack.goldstein@kiewit.com",
  },
  {
    document: "Input Echo",
    vim: false,
    rtf: false,
    xml: true,
    referenceDoc: true,
    lastUpdated: "01/19/2025 05:44 PM",
    lastUpdatedBy: "jack.goldstein@kiewit.com",
  },
];

// Custom toggle yellow icon
const ToggleRenderer = (params: any) => {
  const value = Boolean(params.value);
  return (
    <span
      className={
        value ? styles.yellowToggleOn : styles.yellowToggleOff
      }
    />
  );
};

export default function DocumentAdministrationList() {
  const [rowData, setRowData] = useState(initialRows);

  const columnDefs = useMemo(
    () => [
      { field: "document", headerName: "Document", flex: 1 },
      {
        field: "vim",
        headerName: "VIM",
        cellRenderer: ToggleRenderer,
        width: 80,
        filter: false,
      },
      {
        field: "rtf",
        headerName: "RTF",
        cellRenderer: ToggleRenderer,
        width: 80,
        filter: false,
      },
      {
        field: "xml",
        headerName: "XML",
        cellRenderer: ToggleRenderer,
        width: 80,
        filter: false,
      },
      {
        field: "referenceDoc",
        headerName: "Reference Doc",
        cellRenderer: ToggleRenderer,
        width: 120,
        filter: false,
      },
      { field: "lastUpdated", width: 160 },
      { field: "lastUpdatedBy", width: 220 },
    ],
    []
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>Document Administration</h2>
      </div>

      <div className={`ag-theme-quartz ${styles.gridContainer}`}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          animateRows
          defaultColDef={{
            sortable: true,
            filter: true,
            resizable: true,
            flex: 1,
          }}
        />
      </div>

      <div className={styles.footer}>
        <button className={styles.secondaryButton}>Add Document</button>
        <button className={styles.primaryButton}>Submit Changes</button>
      </div>
    </div>
  );
}
