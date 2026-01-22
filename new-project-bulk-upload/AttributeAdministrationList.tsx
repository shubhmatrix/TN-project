"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, CellClickedEvent, ColDef } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
import "ag-grid-enterprise";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "@/styles/Ag-theme-kds.module.css";

import styles from "@/styles/AttributeAdministrationList.module.css";
import { getAttributesByDocumentType } from "@/services/adminAttributes.api";

ModuleRegistry.registerModules([AllCommunityModule]);

/* -------------------- Types -------------------- */
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

/* -------------------- Constants -------------------- */
const UOM_VALUES = ["", "psi", "kPa", "bar", "ft", "m", "C", "F", "%"];

const TOGGLE_FIELDS = new Set([
  "active",
  "required",
  "visible",
  "llmPrompt",
  "vlmPrompt",
]);

const ToggleRenderer: React.FC<{ value: boolean }> = ({ value }) => (
  <span
    className={value ? styles.yellowToggleOn : styles.yellowToggleOff}
  />
);

/* -------------------- API → Grid Mapper -------------------- */
const mapApiAttributesToRows = (attributes: any[]): AttributeRow[] => {
  return attributes.map((attr) => ({
    id: attr.attribute_id,
    columnName: attr.code,
    displayName: attr.name,
    dataType: attr.data_type ?? "String",
    uom: attr.unit ?? "",
    active: true,
    required: Boolean(attr.is_required),
    visible: Boolean(attr.is_displayed_input),
    llmPrompt: Boolean(attr.is_prediction_output),
    vlmPrompt: false, // backend not providing yet
    notes: attr.description ?? "",
    lastUpdated: attr.updated_at,
    lastUpdatedBy: "",
  }));
};

/* -------------------- Component -------------------- */
const AttributeAdministrationList: React.FC = () => {
  const [rowData, setRowData] = useState<AttributeRow[]>([]);
  const [loading, setLoading] = useState(false);

  /* -------- Load Attributes -------- */
  useEffect(() => {
    const loadAttributes = async () => {
      try {
        setLoading(true);
        const res = await getAttributesByDocumentType(1); // document_type_id
        setRowData(mapApiAttributesToRows(res.data.attributes));
      } catch (error) {
        console.error("Failed to load attributes", error);
      } finally {
        setLoading(false);
      }
    };

    loadAttributes();
  }, []);

  /* -------- Grid Columns -------- */
  const columnDefs = useMemo<ColDef[]>(
    () => [
      { field: "columnName", headerName: "Column Name", rowDrag: true, flex: 1.4, editable: true },
      { field: "displayName", headerName: "Display Name", flex: 1.6, editable: true },
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
        editable: false,
        cellRenderer: (p) => <ToggleRenderer value={p.value} />,
      },
      {
        field: "required",
        headerName: "Required",
        width: 100,
        editable: false,
        cellRenderer: (p) => <ToggleRenderer value={p.value} />,
      },
      {
        field: "visible",
        headerName: "Visible",
        width: 90,
        editable: false,
        cellRenderer: (p) => <ToggleRenderer value={p.value} />,
      },
      {
        field: "llmPrompt",
        headerName: "LLM Prompt",
        width: 120,
        editable: false,
        cellRenderer: (p) => <ToggleRenderer value={p.value} />,
      },
      {
        field: "vlmPrompt",
        headerName: "VLM Prompt",
        width: 120,
        editable: false,
        cellRenderer: (p) => <ToggleRenderer value={p.value} />,
      },
      { field: "notes", headerName: "Notes", flex: 1.5, editable: true },
      { field: "lastUpdated", headerName: "Last Updated", width: 170 },
      { field: "lastUpdatedBy", headerName: "Last Updated By", width: 220 },
    ],
    []
  );

  /* -------- Toggle Click -------- */
  const handleCellClicked = (event: CellClickedEvent) => {
    const field = event.colDef.field as keyof AttributeRow;
    if (!TOGGLE_FIELDS.has(field)) return;

    setRowData((prev) => {
      const updated = [...prev];
      const index = event.rowIndex ?? -1;
      if (index < 0) return prev;

      updated[index] = {
        ...updated[index],
        [field]: !updated[index][field],
      };

      return updated;
    });
  };

  /* -------- Add Row -------- */
  const handleAddAttribute = () => {
    setRowData((prev) => [
      ...prev,
      {
        id: Date.now(),
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

  /* -------- Submit (NEXT API) -------- */
  const handleSubmitChanges = () => {
    console.log("Submitting attribute changes:", rowData);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>Attribute Administration</h2>
      </div>

      <div className={`ag-theme-kds ${styles.gridContainer}`}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          animateRows
          rowDragManaged
          suppressRowClickSelection
          defaultColDef={{ sortable: true, resizable: true, filter: true }}
          onCellClicked={handleCellClicked}
          overlayLoadingTemplate="Loading attributes..."
          loadingOverlayComponentParams={{ loading }}
        />
      </div>

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
