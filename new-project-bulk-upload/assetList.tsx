"use client";

import React, { useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, GridApi, ColumnApi } from "ag-grid-community";

// AG Grid CSS (ensure installed)
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css"; // pick your theme

import styles from "@/styles/AssetListEnhanced.module.css";

/* ----------------------- Mock data (short example, extend as needed) ----------------------- */
const initialRows = [
  {
    assetTag: "P-4001",
    verificationStatus: "Not Verified",
    equipment: "Pump",
    equipmentType: "Centrifugal Pump",
    equipmentName: "Pump - Centrifugal - Generic",
    service: "Cooling Water",
    designFlow: 500,
    designFlowUnits: "gpm",
    // ... other columns omitted for brevity
    numberOfDocuments: 3,
  },
  {
    assetTag: "P-4002",
    verificationStatus: "Verified",
    equipment: "Pump",
    equipmentType: "Centrifugal Pump - Double Casing",
    equipmentName: "PC-4002",
    service: "Hot Oil",
    designFlow: 80,
    designFlowUnits: "gpm",
    numberOfDocuments: 1,
  },
  // add more rows
];

/* ----------------------- small yellow toggle renderer ----------------------- */
const YellowToggleRenderer: React.FC<{ value?: any }> = ({ value }) => {
  const on = !!value;
  return <div className={on ? styles.yellowOn : styles.yellowOff} />;
};

/* ----------------------- AssetListEnhanced component ----------------------- */
export default function AssetListEnhanced() {
  const [rowData, setRowData] = useState(initialRows);
  const [activeTab, setActiveTab] = useState<"median" | "all">("median");
  const [editingEnabled, setEditingEnabled] = useState(false);

  // AG Grid APIs
  const gridApiRef = useRef<GridApi | null>(null);
  const colApiRef = useRef<ColumnApi | null>(null);

  const onGridReady = (params: any) => {
    gridApiRef.current = params.api as GridApi;
    colApiRef.current = params.columnApi as ColumnApi;
  };

  // Column definitions: pin first two columns left, action pinned right.
  const columnDefs = useMemo<ColDef[]>(
    () => [
      { headerName: "Asset Tag", field: "assetTag", width: 160, pinned: "left", suppressMovable: true },
      { headerName: "Verification Status", field: "verificationStatus", width: 140, pinned: "left", suppressMovable: true },

      // center columns (example subset, expand to full list)
      { headerName: "Equipment", field: "equipment", width: 120 },
      { headerName: "Equipment Type", field: "equipmentType", width: 220 },
      { headerName: "Equipment Name", field: "equipmentName", width: 320 },
      { headerName: "Service", field: "service", width: 160 },
      { headerName: "Design Flow", field: "designFlow", width: 100 },
      { headerName: "Design Flow Units", field: "designFlowUnits", width: 120 },

      // boolean-style column with yellow toggle visuals
      {
        headerName: "VIM",
        field: "vim",
        width: 90,
        cellRenderer: (params) => {
          return params.value ? '<div class="__kds_yellow_on"></div>' : '<div class="__kds_yellow_off"></div>';
        },
        filter: false,
      },

      // more center columns ...
      { headerName: "Number of Docs", field: "numberOfDocuments", width: 140 },

      // Action column pinned to right
      {
        headerName: "Actions",
        field: "action",
        width: 120,
        pinned: "right",
        suppressMovable: true,
        cellRenderer: (params) => {
          // return html string; you can attach click handlers by using grid cell renderer components instead
          return `
            <div style="display:flex; gap:6px; justify-content:center; align-items:center;">
              <button title="Download" class="kds-action-btn">📥</button>
              <button title="Edit" class="kds-action-btn">✏️</button>
              <button title="Delete" class="kds-action-btn">🗑️</button>
            </div>
          `;
        },
      },
    ],
    []
  );

  const defaultColDef = useMemo<ColDef>(
    () => ({
      sortable: true,
      resizable: true,
      filter: true,
      editable: editingEnabled, // toggled by button
      suppressMenu: false,
      minWidth: 80,
    }),
    [editingEnabled]
  );

  /* ----------------------- header/action handlers ----------------------- */

  const handleResetFilters = () => {
    gridApiRef.current?.setFilterModel(null);
    gridApiRef.current?.setSortModel(null);
  };

  const handleExport = () => {
    gridApiRef.current?.exportDataAsCsv({ fileName: "asset-list.csv" });
  };

  const toggleEditing = () => {
    setEditingEnabled((s) => !s);
  };

  /* optional: to pin first two columns programmatically */
  const pinFirstTwo = () => {
    const colApi = colApiRef.current;
    if (!colApi) return;
    colApi.applyColumnState({
      state: [
        { colId: "assetTag", pinned: "left" },
        { colId: "verificationStatus", pinned: "left" },
      ],
    });
  };

  /* run once to ensure pinned — but we already set pinned in defs */
  React.useEffect(() => {
    pinFirstTwo();
  }, []);

  return (
    <div className={styles.pageWrapper}>
      {/* header with tabs and header buttons */}
      <div className={styles.header}>
        <div className={styles.leftHeader}>
          <div className={styles.title}>Asset List</div>

          {/* Tabs */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tabBtn} ${activeTab === "median" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("median")}
            >
              Median Data
            </button>
            <button
              className={`${styles.tabBtn} ${activeTab === "all" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("all")}
            >
              All Data
            </button>
          </div>
        </div>

        <div className={styles.headerActions}>
          <button className={styles.headerBtn} onClick={handleResetFilters}>
            Reset Filters
          </button>

          <button
            className={`${styles.headerBtn} ${editingEnabled ? styles.headerBtnActive : ""}`}
            onClick={toggleEditing}
          >
            {editingEnabled ? "Disable Editing" : "Enable Editing"}
          </button>

          <button className={styles.headerBtn} onClick={handleExport}>
            Export List
          </button>
        </div>
      </div>

      {/* grid container: fixed height; pinned columns left/right will remain fixed */}
      <div className={`ag-theme-quartz ${styles.gridContainer}`} role="region" aria-label="Asset grid">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          rowHeight={36}
          headerHeight={36}
          animateRows={true}
        />
      </div>

      {/* footer */}
      <div className={styles.footer}>
        <button className={styles.secondaryBtn}>Save Changes</button>
      </div>
    </div>
  );
}
