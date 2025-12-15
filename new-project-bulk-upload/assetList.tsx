"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, GridApi, ColDef } from "ag-grid-community";
// import enterprise package (enables enterprise features if licensed)
import "ag-grid-enterprise";

// register community modules (keeps compatibility); if your build registers modules elsewhere, remove this
import { AllCommunityModules } from "ag-grid-community/dist/allModules";
ModuleRegistry.registerModules(AllCommunityModules);

// styles required by ag-grid + our css module
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import styles from "@/styles/AssetList.module.css";

/**
 * Minimal mock data for demonstration — replace with your real data.
 * The component uses the column keys requested in the conversation.
 */
const mockRows = [
  {
    assetTag: "PC-001",
    verificationStatus: "Not Verified",
    equipment: "Pump",
    equipmentType: "Centrifugal - Generic",
    equipmentName: "Pump A",
    service: "Cooling Water",
    designFlow: 845,
    designFlowUnits: "gpm",
    differentialHead: 55,
    differentialHeadUnits: "m",
    suctionPressure: 2,
    suctionPressureUnits: "bar",
    dischargePressure: 7,
    dischargePressureUnits: "bar",
    hydraulicPower: 5.4,
    hydraulicPowerUnits: "kW",
    ratedSpeed: 2950,
    driverType: "Electric",
    notes: "Sample note",
    crmJob: "2004528",
    selectedVendors: "Vendor A",
    documentsCount: 3,
  },
  {
    assetTag: "PC-002",
    verificationStatus: "Verified",
    equipment: "Pump",
    equipmentType: "Centrifugal - Double Casing",
    equipmentName: "Pump B",
    service: "Process",
    designFlow: 100,
    designFlowUnits: "gpm",
    differentialHead: 12,
    differentialHeadUnits: "m",
    suctionPressure: 1.2,
    suctionPressureUnits: "bar",
    dischargePressure: 4,
    dischargePressureUnits: "bar",
    hydraulicPower: 1.2,
    hydraulicPowerUnits: "kW",
    ratedSpeed: 3500,
    driverType: "Electric",
    notes: "",
    crmJob: "2004529",
    selectedVendors: "Vendor B",
    documentsCount: 1,
  },
];

const ActionCellRenderer: React.FC<any> = (props) => {
  return (
    <div className={styles.actionCell}>
      {/* Verify */}
      <button
        className={styles.iconBtn}
        title="Verify"
        onClick={() => alert(`Verify ${props.data?.assetTag}`)}
      >
        <svg width="14" height="14" viewBox="0 0 16 16">
          <path
            d="M6.5 11.2L3.3 8l1.1-1.1 2.1 2.1 5-5L12.6 5z"
            fill="currentColor"
          />
        </svg>
      </button>

      {/* View Document */}
      <button
        className={styles.iconBtn}
        title="View Document"
        onClick={() => alert(`View ${props.data?.assetTag}`)}
      >
        <svg width="14" height="14" viewBox="0 0 16 16">
          <path
            d="M3 1h6l4 4v10H3V1zm6 1.5V6h3.5L9 2.5z"
            fill="currentColor"
          />
        </svg>
      </button>

      {/* Delete */}
      <button
        className={`${styles.iconBtn} ${styles.danger}`}
        title="Delete"
        onClick={() => alert(`Delete ${props.data?.assetTag}`)}
      >
        <svg width="14" height="14" viewBox="0 0 16 16">
          <path
            d="M6 1h4l1 1h4v2H1V2h4l1-1zm-1 5h2v7H5V6zm4 0h2v7H9V6z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  );
};


const VerificationRenderer: React.FC<any> = (props) => {
  const val = props.value;
  const cls = val === "Verified" ? styles.verifiedBadge : styles.notVerifiedBadge;
  return <span className={cls}>{val}</span>;
};

export default function AssetList(): JSX.Element {
  // grid refs
  const gridApiRef = useRef<any>(null); // GridApi any for compatibility
  // keep columnApi as any to avoid type errors across different ag-grid versions
  const columnApiRef = useRef<any>(null);

  const [rowData] = useState<any[]>(mockRows);
  const [enableEditing, setEnableEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<"median" | "all">("median");

  // full column definitions — I included many fields you asked for (trimmed some repetition)
  const columnDefs = useMemo<ColDef[]>(
    () => [
      {
        headerName: "Asset Tag",
        field: "assetTag",
        pinned: "left",
        lockPinned: true,
        rowDrag: true,
        minWidth: 150,
        suppressMenu: true,
      },
      {
        headerName: "Verification Status",
        field: "verificationStatus",
        pinned: "left",
        lockPinned: true,
        cellRenderer: VerificationRenderer,
        minWidth: 150,
      },

      // The long central set of columns — many of these will be in the horizontal scroll area
      { headerName: "Equipment", field: "equipment", flex: 1, minWidth: 150, editable: enableEditing },
      { headerName: "Equipment Type", field: "equipmentType", minWidth: 200, editable: enableEditing },
      { headerName: "Equipment Name", field: "equipmentName", minWidth: 220, editable: enableEditing },
      { headerName: "Service", field: "service", minWidth: 140, editable: enableEditing },
      { headerName: "Design Flow", field: "designFlow", width: 120, editable: enableEditing },
      { headerName: "Design Flow Units", field: "designFlowUnits", width: 100, editable: enableEditing },

      { headerName: "Differential Head", field: "differentialHead", width: 140, editable: enableEditing },
      { headerName: "Differential Head Units", field: "differentialHeadUnits", width: 120, editable: enableEditing },

      { headerName: "Suction Pressure", field: "suctionPressure", width: 140, editable: enableEditing },
      { headerName: "Suction Pressure Units", field: "suctionPressureUnits", width: 120, editable: enableEditing },

      { headerName: "Discharge Pressure", field: "dischargePressure", width: 140, editable: enableEditing },
      { headerName: "Discharge Pressure Units", field: "dischargePressureUnits", width: 120, editable: enableEditing },

      { headerName: "Hydraulic Power", field: "hydraulicPower", width: 140, editable: enableEditing },
      { headerName: "Hydraulic Power Units", field: "hydraulicPowerUnits", width: 120, editable: enableEditing },

      { headerName: "Rated Speed", field: "ratedSpeed", width: 120, editable: enableEditing },
      { headerName: "Driver Type", field: "driverType", width: 140, editable: enableEditing },

      // CRM / vendor / doc counts
      { headerName: "CRM Job", field: "crmJob", width: 120, editable: enableEditing },
      { headerName: "Selected Vendor(s)", field: "selectedVendors", minWidth: 180, editable: enableEditing },
      { headerName: "Number of Documents", field: "documentsCount", width: 160, editable: enableEditing },

      // notes
      { headerName: "Notes", field: "notes", minWidth: 300, editable: enableEditing },

      // final actions pinned right
      {
        headerName: "Actions",
        field: "actions",
        pinned: "right",
        lockPinned: true,
        minWidth: 120,
        cellRenderer: ActionCellRenderer,
        suppressMenu: true,
        sortable: false,
      },
    ],
    // include enableEditing in deps so editable toggles when it changes
    [enableEditing]
  );

  const onGridReady = useCallback((params: any) => {
    gridApiRef.current = params.api;
    columnApiRef.current = params.columnApi;

    // auto-size first columns to fit content a bit
    try {
      params.columnApi.autoSizeColumns(["assetTag", "verificationStatus"], false);
    } catch (err) {
      // ignore if auto size fails
    }
  }, []);

  const resetFilters = useCallback(() => {
    gridApiRef.current?.setFilterModel(null);
    gridApiRef.current?.setSortModel(null);
    // reset column widths or order if needed:
    // columnApiRef.current?.resetColumnState();
  }, []);

  const exportCsv = useCallback(() => {
    gridApiRef.current?.exportDataAsCsv({
      fileName: "asset-list.csv",
    });
  }, []);

  const toggleEditing = useCallback(() => {
    setEnableEditing((s) => !s);
  }, []);

  const onTabChange = useCallback((tab: "median" | "all") => {
    setActiveTab(tab);
    // If you need to change visible columns, update columnDefs / api here.
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageHeader}>
        <h3>Asset List</h3>

        <div className={styles.headerRight}>
          <button className={styles.settingsBtn}>Settings</button>
        </div>
      </div>

      {/* tabs */}
      <div className={styles.tabsRow}>
        <div className={styles.tabsLeft}>
          <button
            className={`${styles.tabBtn} ${activeTab === "median" ? styles.tabActive : ""}`}
            onClick={() => onTabChange("median")}
          >
            Median Data
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === "all" ? styles.tabActive : ""}`}
            onClick={() => onTabChange("all")}
          >
            All Data
          </button>
        </div>

        <div className={styles.tabsRight}>
          <button className={styles.headerAction} onClick={resetFilters}>
            Reset Filters
          </button>
          <button className={styles.headerAction} onClick={toggleEditing}>
            {enableEditing ? "Disable Editing" : "Enable Editing"}
          </button>
          <button className={styles.headerAction} onClick={exportCsv}>
            Export List
          </button>
        </div>
      </div>

      {/* grid container with fixed height so footer buttons are visible */}
      <div className={`${styles.gridWrap} ag-theme-quartz`}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{
            sortable: true,
            resizable: true,
            filter: true,
            minWidth: 80,
          }}
          onGridReady={onGridReady}
          rowHeight={32}
          animateRows={true}
          suppressRowClickSelection={true}
        />
      </div>

      {/* footer actions */}
      <div className={styles.footer}>
        <button className={styles.secondaryButton} onClick={() => alert("Add New Asset")}>
          Add Asset
        </button>
        <button className={styles.primaryButton} onClick={() => alert("Submit Changes")}>
          Submit Changes
        </button>
      </div>
    </div>
  );
}
