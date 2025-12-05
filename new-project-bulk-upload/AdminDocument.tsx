"use client";

import React, { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
// You are already using a custom theme; import its CSS here:
import "@/styles/ag-theme-kds.css";

import styles from "@/styles/DocumentAdministrationList.module.css";

type DocumentRow = {
  id: number;
  documentName: string;
  vim: boolean;
  rtf: boolean;
  xml: boolean;
  referenceDoc: boolean;
  lastUpdated: string;
  lastUpdatedBy: string;
};

const initialRows: DocumentRow[] = [
  {
    id: 1,
    documentName: "Shop Drawing",
    vim: true,
    rtf: true,
    xml: false,
    referenceDoc: false,
    lastUpdated: "01/23/2025 10:58 AM",
    lastUpdatedBy: "jack.goldstein@kiewit.com",
  },
  {
    id: 2,
    documentName: "Structure Check Report",
    vim: false,
    rtf: true,
    xml: true,
    referenceDoc: false,
    lastUpdated: "01/22/2025 02:15 PM",
    lastUpdatedBy: "jack.goldstein@kiewit.com",
  },
  {
    id: 3,
    documentName: "Structure Analysis Report",
    vim: false,
    rtf: true,
    xml: false,
    referenceDoc: true,
    lastUpdated: "01/20/2025 09:10 AM",
    lastUpdatedBy: "jack.goldstein@kiewit.com",
  },
  {
    id: 4,
    documentName: "Input Echo",
    vim: false,
    rtf: false,
    xml: true,
    referenceDoc: false,
    lastUpdated: "01/19/2025 05:44 PM",
    lastUpdatedBy: "jack.goldstein@kiewit.com",
  },
];

// small yellow square renderer for boolean columns
const YellowToggleRenderer: React.FC<ICellRendererParams> = (params) => {
  const value = Boolean(params.value);
  return (
    <span
      className={
        value ? styles.yellowToggleOn : styles.yellowToggleOff
      }
    />
  );
};

const DocumentAdministrationList: React.FC = () => {
  const [rowData, setRowData] = useState<DocumentRow[]>(initialRows);

  const columnDefs: ColDef[] = useMemo(
    () => [
      {
        headerName: "Document",
        field: "documentName",
        flex: 2,
        sortable: true,
        resizable: true,
        filter: true,
      },
      {
        headerName: "VIM",
        field: "vim",
        width: 90,
        sortable: false,
        cellRenderer: YellowToggleRenderer,
        cellClass: styles.centerCell,
      },
      {
        headerName: "RTF",
        field: "rtf",
        width: 90,
        sortable: false,
        cellRenderer: YellowToggleRenderer,
        cellClass: styles.centerCell,
      },
      {
        headerName: "XML",
        field: "xml",
        width: 90,
        sortable: false,
        cellRenderer: YellowToggleRenderer,
        cellClass: styles.centerCell,
      },
      {
        headerName: "Reference Doc",
        field: "referenceDoc",
        width: 130,
        sortable: false,
        cellRenderer: YellowToggleRenderer,
        cellClass: styles.centerCell,
      },
      {
        headerName: "Last Updated",
        field: "lastUpdated",
        flex: 1,
        sortable: true,
        resizable: true,
      },
      {
        headerName: "Last Updated By",
        field: "lastUpdatedBy",
        flex: 1.5,
        sortable: true,
        resizable: true,
      },
    ],
    []
  );

  // Toggle yellow square when user clicks in these columns
  const handleCellClicked = (params: any) => {
    const colId = params.colDef.field;
    if (!["vim", "rtf", "xml", "referenceDoc"].includes(colId!)) return;

    const updated = rowData.map((row) =>
      row.id === params.data.id
        ? { ...row, [colId!]: !row[colId as keyof DocumentRow] }
        : row
    );
    setRowData(updated);
  };

  const handleAddDocument = () => {
    const nextId = rowData.length
      ? Math.max(...rowData.map((r) => r.id)) + 1
      : 1;

    setRowData([
      ...rowData,
      {
        id: nextId,
        documentName: "New Document",
        vim: false,
        rtf: false,
        xml: false,
        referenceDoc: false,
        lastUpdated: new Date().toLocaleString(),
        lastUpdatedBy: "current.user@kiewit.com",
      },
    ]);
  };

  const handleSubmitChanges = () => {
    // For now just log – later you can call API here
    console.log("Submitting document admin changes:", rowData);
    alert("Changes submitted (mock). Wire this to your API.");
  };

  return (
    <div className={styles.wrapper}>
      {/* Title row – matches your screenshot */}
      <div className={styles.headerRow}>
        <h2 className={styles.title}>Document Administration</h2>
      </div>

      {/* Grid container */}
      <div className={`${styles.gridContainer} ag-theme-kds`}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          rowHeight={28}
          headerHeight={28}
          animateRows={true}
          suppressRowClickSelection={true}
          onCellClicked={handleCellClicked}
          defaultColDef={{
            sortable: true,
            resizable: true,
            filter: false,
          }}
        />
      </div>

      {/* Footer buttons */}
      <div className={styles.footer}>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={handleAddDocument}
        >
          Add Document
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

export default DocumentAdministrationList;
