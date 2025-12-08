"use client";

import React, { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";

// AG Grid v34+ requires module registration
import { ModuleRegistry, CellClickedEvent, ColDef } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);

// Enterprise features (menus, row drag, etc.)
import "ag-grid-enterprise";

// Legacy CSS themes (Quartz base + your custom kds overrides)
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "@/styles/Ag-theme-kds.module.css";

import styles from "@/styles/AttributeAdministrationList.module.css";

type AttributeRow = {
  id: number;
  columnName: string;
  displayName: string;
  dataType: string;
  uom: string;
  active: boolean;
  required: boolean;
  visible: boolean;
  llmPrompt: boolean;
  vlmPrompt: boolean;
  notes: string;
  lastUpdated: string;
  lastUpdatedBy: string;
};

// Sample UOM values
const UOM_VALUES = ["", "psi", "kPa", "bar", "ft", "m", "C", "F", "%"];

// Initial mock data (similar to your screenshot)
const initialRows: AttributeRow[] = [
  {
    id: 1,
    columnName: "asset_tag_ids",
    displayName: "Asset Tag IDs",
    dataType: "String",
    uom: "",
    active: true,
    required: true,
    visible: true,
    llmPrompt: true,
    vlmPrompt: true,
    notes: "",
    lastUpdated: "06/29/2025 03:04:10 AM",
    lastUpdatedBy: "Cole.Warner@kiewit.com",
  },
  {
    id: 2,
    columnName: "job_no",
    displayName: "CRM Job",
    dataType: "String",
    uom: "",
    active: true,
    required: false,
    visible: true,
    llmPrompt: false,
    vlmPrompt: true,
    notes: "",
    lastUpdated: "07/11/2025 04:05:32 PM",
    lastUpdatedBy: "Cole.Warner@kiewit.com",
  },
  {
    id: 3,
    columnName: "equipment_type",
    displayName: "Equipment Type",
    dataType: "String",
    uom: "",
    active: true,
    required: false,
    visible: true,
    llmPrompt: true,
    vlmPrompt: true,
    notes: "",
    lastUpdated: "06/29/2025 04:37:20 AM",
    lastUpdatedBy: "Sergio.Reyes@kiewit.com",
  },
];

// Yellow square renderer (same style as document admin)
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

// Fields that behave like toggles
const TOGGLE_FIELDS = new Set([
  "active",
  "required",
  "visible",
  "llmPrompt",
  "vlmPrompt",
]);

const AttributeAdministrationList: React.FC = () => {
  const [rowData, setRowData] = useState<AttributeRow[]>(initialRows);

  const columnDefs = useMemo<ColDef[]>(
    () => [
      {
        field: "columnName",
        headerName: "Column Name",
        rowDrag: true,
        flex: 1.4,
        editable: true,
      },
      {
        field: "displayName",
        headerName: "Display Name",
        flex: 1.6,
        editable: true,
      },
      {
        field: "dataType",
        headerName: "Datatype",
        width: 130,
        editable: true,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: ["String", "Float", "Integer", "Boolean", "Date"],
        },
      },
      {
        field: "uom",
        headerName: "UOM",
        width: 120,
        editable: true,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: UOM_VALUES,
        },
      },
      {
        field: "active",
        headerName: "Active",
        width: 90,
        sortable: false,
        filter: false,
        editable: false,
        cellRenderer: (p) => <ToggleRenderer value={p.value} />,
      },
      {
        field: "required",
        headerName: "Required",
        width: 100,
        sortable: false,
        filter: false,
        editable: false,
        cellRenderer: (p) => <ToggleRenderer value={p.value} />,
      },
      {
        field: "visible",
        headerName: "Visible",
        width: 90,
        sortable: false,
        filter: false,
        editable: false,
        cellRenderer: (p) => <ToggleRenderer value={p.value} />,
      },
      {
        field: "llmPrompt",
        headerName: "LLM Prompt",
        width: 120,
        sortable: false,
        filter: false,
        editable: false,
        cellRenderer: (p) => <ToggleRenderer value={p.value} />,
      },
      {
        field: "vlmPrompt",
        headerName: "VLM Prompt",
        width: 120,
        sortable: false,
        filter: false,
        editable: false,
        cellRenderer: (p) => <ToggleRenderer value={p.value} />,
      },
      {
        field: "notes",
        headerName: "Notes",
        flex: 1.5,
        editable: true,
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

  const handleCellClicked = (event: CellClickedEvent) => {
    const field = event.colDef.field as keyof AttributeRow | undefined;
    if (!field || !TOGGLE_FIELDS.has(field)) return;

    setRowData((prev) => {
      const updated = [...prev];
      const rowIndex = event.rowIndex ?? -1;
      if (rowIndex < 0 || rowIndex >= updated.length) return prev;

      const row = { ...updated[rowIndex] };
      row[field] = !row[field] as any;
      updated[rowIndex] = row;
      return updated;
    });
  };

  const handleAddAttribute = () => {
    setRowData((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        columnName: "",
        displayName: "",
        dataType: "String",
        uom: "",
        active: true,
        required: false,
        visible: true,
        llmPrompt: false,
        vlmPrompt: false,
        notes: "",
        lastUpdated: "",
        lastUpdatedBy: "",
      },
    ]);
  };

  const handleSubmitChanges = () => {
    // Replace with API call
    console.log("Submitting attribute changes:", rowData);
    alert("Mock submit — check console for payload.");
  };

  return (
    <div className={styles.wrapper}>
      {/* Title row */}
      <div className={styles.headerRow}>
        <h2 className={styles.title}>Attribute Administration</h2>
      </div>

      {/* Grid container */}
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
            filter: true,
          }}
          onCellClicked={handleCellClicked}
        />
      </div>

      {/* Footer buttons */}
      <div className={styles.footer}>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={handleAddAttribute}
        >
          Add Attribute
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

export default AttributeAdministrationList;
