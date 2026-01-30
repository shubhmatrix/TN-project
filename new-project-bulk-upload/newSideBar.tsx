"use client";
 
import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCog,
  faQuestion,
  faList,
  faFolderTree,
  faHouse,
  faChartLine,
  faColumns,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
 
export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [assetOpen, setAssetOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
 
  return (
    <aside
      className={`sidebar transition-all duration-300 ${
        collapsed ? "w-[120px]" : "w-[280px]"
      }`}
    >
      {/* ================= HEADER ================= */}
      <div className="sidebar-top px-4 py-4">
        <div className="sidebar-header flex items-center relative group">
          {/* TEXT (only expanded) */}
          {!collapsed && (
            <div className="sidebar-title flex flex-col leading-tight">
              <span>KPD Structure</span>
              <span>Database</span>
            </div>
          )}
 
          {/* LOGO + COLLAPSE */}
          <div
            className={`relative w-[120px] h-[48px] flex items-center justify-center
            ${collapsed ? "ml-0" : "ml-auto"}`}
          >
            {/* LOGO */}
            <Image
              src="/images/kds-lightgray-trans.png"
              alt="KDS Logo"
              width={120}
              height={48}
              className={`transition-opacity duration-300 ${
                collapsed
                  ? "opacity-100 group-hover:opacity-0"
                  : "opacity-100"
              }`}
            />
 
            {/* EXPAND ICON (hover only when collapsed) */}
            {collapsed && (
              <button
                onClick={() => setCollapsed(false)}
                className="absolute inset-0 flex items-center justify-center
                           opacity-0 group-hover:opacity-100
                           transition-opacity duration-300"
              >
                <FontAwesomeIcon icon={faColumns} size="lg" />
              </button>
            )}
 
            {/* COLLAPSE ICON (expanded mode) */}
            {!collapsed && (
              <button
                onClick={() => setCollapsed(true)}
                className="absolute -right-10 w-8 h-8 flex items-center justify-center
                           rounded hover:bg-gray-100"
              >
                <FontAwesomeIcon icon={faColumns} size="lg" />
              </button>
            )}
          </div>
        </div>
      </div>
 
      {/* ================= NAV ================= */}
      <nav className="sidebar-nav">
        <Link href="/" className="sidebar-item flex items-center">
          <FontAwesomeIcon icon={faHouse} className="mr-2" />
          {!collapsed && "Home"}
        </Link>
 
        {/* Asset Management */}
        <div
          className="sidebar-item flex items-center justify-between pr-3 cursor-pointer"
          onClick={() => {
            if (collapsed) {
              setCollapsed(false);
              return;
            }
            setAssetOpen(!assetOpen);
          }}
        >
          <div className="flex items-center">
            <FontAwesomeIcon icon={faFolderTree} className="mr-2" />
            {!collapsed && "Asset Management"}
          </div>
 
          {!collapsed && (
            <FontAwesomeIcon
              icon={faCaretDown}
              className={`transition-transform duration-200 ${
                assetOpen ? "rotate-180" : ""
              }`}
            />
          )}
        </div>
 
        {!collapsed && assetOpen && (
          <div className="sidebar-sub">
            <Link href="/asset-management/structure-library">
              Structure Library
            </Link>
            <Link href="/asset-management/document-upload">
              Document Upload
            </Link>
          </div>
        )}
 
        <div className="sidebar-item flex items-center">
          <FontAwesomeIcon icon={faList} className="mr-2" />
          {!collapsed && <Link href="/asset-list">Asset List</Link>}
        </div>
 
        <div className="sidebar-item flex items-center">
          <FontAwesomeIcon icon={faChartLine} className="mr-2" />
          {!collapsed && <Link href="/predictions">Predictions</Link>}
        </div>
      </nav>
 
      {/* ================= FOOTER ================= */}
      <div className="sidebar-footer">
        <button
          className="sidebar-item flex items-center justify-between w-full"
          onClick={() => {
            if (collapsed) {
              setCollapsed(false);
              return;
            }
            setSettingsOpen(!settingsOpen);
          }}
        >
          <div className="flex items-center">
            <FontAwesomeIcon icon={faCog} className="mr-2" />
            {!collapsed && "Settings"}
          </div>
 
          {!collapsed && (
            <FontAwesomeIcon
              icon={faCaretDown}
              className={`transition-transform duration-200 ${
                settingsOpen ? "rotate-180" : ""
              }`}
            />
          )}
        </button>
 
        {!collapsed && settingsOpen && (
          <div className="sidebar-sub">
            <Link href="/admin/document-list">Document List</Link>
            <Link href="/admin/attribute-admin">Attribute Admin</Link>
            <Link href="/admin/project-management">
              Project Management
            </Link>
          </div>
        )}
 
        <div className="sidebar-item flex items-center">
          <FontAwesomeIcon icon={faQuestion} className="mr-2" />
          {!collapsed && "Help"}
        </div>
      </div>
    </aside>
  );
}