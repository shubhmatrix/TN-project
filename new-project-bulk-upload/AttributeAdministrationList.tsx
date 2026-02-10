"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ModuleRegistry,
  CellClickedEvent,
  ColDef,
} from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
import "ag-grid-enterprise";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "@/styles/Ag-theme-kds.module.css";

import styles from "@/styles/AttributeAdministrationList.module.css";
import {
  getAttributesByDocumentType,
  submitAttributes,
} from "@/services/adminAttributes.api";

ModuleRegistry.registerModules([AllCommunityModule]);

/* ==================== Types ==================== */
type AttributeRow = {
  id: number | null;
  columnName: string;   // UI Column Name = backend `name`
  dataType: string;
  uom: string;
  required: boolean;
  visible: boolean;
  llmPrompt: boolean;
  vlmPrompt: boolean;
  notes: string;
};

/* ==================== Constants ==================== */
const DOCUMENT_TYPE_ID = 1;

const UOM_VALUES = ["", "psi", "kPa", "bar", "ft", "m", "C", "F", "%"];

const TOGGLE_FIELDS = new Set<keyof AttributeRow>([
  "required",
  "visible",
  "llmPrompt",
  "vlmPrompt",
]);

/* ==================== API → UI Mapper ==================== */
const mapApiAttributesToRows = (attributes: any[]): AttributeRow[] =>
  attributes.map((attr: any) => ({
    id: attr.attribute_id ?? null,
    columnName: attr.name, // ✅ Column Name = name
    dataType: attr.data_type ?? "string",
    uom: attr.unit_of_measure ?? "",
    required: Boolean(attr.is_required),
    visible: Boolean(attr.is_displayed_in_asset_list),
    llmPrompt: Boolean(attr.is_prediction_input),
    vlmPrompt: Boolean(attr.is_prediction_output),
    notes: attr.description ?? "",
  }));

/* ==================== UI → Submit Payload Mapper ==================== */
const mapRowsToSubmitPayload = (
  rows: AttributeRow[],
  documentTypeId: number
) => ({
  document_type_id: documentTypeId,
  attributes: rows.map((row, index) => ({
    attribute_id: row.id ?? 0,

    // ✅ EXACT backend schema
    name: row.columnName,
    code: row.columnName
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_"),

    description: row.notes || "",
    data_type: row.dataType,

    is_displayed_in_asset_list: row.visible,
    display_order: index + 1,
    is_required: row.required,
    is_prediction_input: row.llmPrompt,
    is_prediction_output: row.vlmPrompt,

    unit_of_measure: row.uom || "",
  })),
});

/* ==================== Component ==================== */
const AttributeAdministrationList: React.FC = () => {
  const [rowData, setRowData] = useState<AttributeRow[]>([]);
  const [loading, setLoading] = useState(false);

  /* -------- Load Attributes -------- */
  useEffect(() => {
    const loadAttributes = async () => {
      try {
        setLoading(true);
        const res = await getAttributesByDocumentType(DOCUMENT_TYPE_ID);
        setRowData(mapApiAttributesToRows(res.data.attributes));
      } catch (err) {
        console.error("Failed to load attributes", err);
      } finally {
        setLoading(false);
      }
    };

    loadAttributes();
  }, []);

  /* -------- Grid Columns -------- */
  const columnDefs = useMemo<ColDef[]>(
    () => [
      {
        field: "columnName",
        headerName: "Column Name",
        editable: true, // ✅ user edits name
        rowDrag: true,
        flex: 1.6,
      },
      {
        field: "dataType",
        headerName: "Datatype",
        width: 130,
        editable: true,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: ["string", "number", "boolean", "date"],
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
        field: "required",
        headerName: "Required",
        width: 100,
        editable: false,
      },
      {
        field: "visible",
        headerName: "Visible",
        width: 100,
        editable: false,
      },
      {
        field: "llmPrompt",
        headerName: "LLM Prompt",
        width: 130,
        editable: false,
      },
      {
        field: "vlmPrompt",
        headerName: "VLM Prompt",
        width: 130,
        editable: false,
      },
      {
        field: "notes",
        headerName: "Notes",
        flex: 1.5,
        editable: true,
      },
    ],
    []
  );

  /* -------- Toggle Handling -------- */
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

  /* -------- Add Attribute -------- */
  const handleAddAttribute = () => {
    setRowData((prev) => [
      ...prev,
      {
        id: null,
        columnName: "",
        dataType: "string",
        uom: "",
        required: false,
        visible: true,
        llmPrompt: false,
        vlmPrompt: false,
        notes: "",
      },
    ]);
  };

  /* -------- Submit -------- */
  const handleSubmitChanges = async () => {
    try {
      const payload = mapRowsToSubmitPayload(rowData, DOCUMENT_TYPE_ID);
      console.log("Submitting payload:", payload);
      await submitAttributes(payload);
      alert("Attributes saved successfully");
    } catch (err) {
      console.error("Submit failed", err);
      alert("Failed to save attributes");
    }
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
          loading={loading}
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
