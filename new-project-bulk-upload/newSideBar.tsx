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
      className={`sticky top-0 h-screen flex flex-col border-r transition-all duration-300
      ${collapsed ? "w-[88px]" : "w-[280px]"}`}
    >
{/* ================= HEADER ================= */}
<div className="border-b border-gray-200">
 
  {/* EXPANDED HEADER */}
  {!collapsed && (
    <div className="flex items-center justify-between px-6 py-4 min-h-[80px] -mt-1">
      <div className="leading-tight">
        <div className="text-lg font-medium">KPD Structure</div>
        <div className="text-lg font-medium">Database</div>
      </div>
 
      <div className="relative w-[80px] h-[80px] flex-shrink-0">
  <Image
    src="/images/kds-lightgray-trans.png"
    alt="KDS Logo"
    fill
    className="object-contain scale-110"
    priority
  />
</div>
 
      <button onClick={() => setCollapsed(true)}>
        <FontAwesomeIcon icon={faColumns} />
      </button>
    </div>
  )}
 
  {/* COLLAPSED HEADER */}
  {collapsed && (
    <div className="flex justify-center py-4 group relative">
 
<div className="relative w-[72px] h-[72px]
                    transition-opacity duration-200
                    group-hover:opacity-0">
  <Image
    src="/images/kds-lightgray-trans.png"
    alt="KDS Logo"
    fill
    className="object-contain scale-110"
    priority
  />
</div>
 
       <button
      onClick={() => setCollapsed(false)}
      className="absolute inset-0 flex items-center justify-center
                 opacity-0 group-hover:opacity-100
                 transition-opacity duration-200"
    >
      <FontAwesomeIcon icon={faColumns} size="lg" />
    </button>
 
    </div>
  )}
</div>
 
      {/* ================= NAV ================= */}
      <nav className="flex-1 py-4">
       
        {/* HOME */}
        <Link
          href="/"
          className={`sidebar-item flex items-center w-full px-6 py-3
          ${collapsed ? "justify-center" : ""}`}
        >
          <FontAwesomeIcon icon={faHouse} />
          {!collapsed && <span className="ml-3">Home</span>}
        </Link>
 
        {/* ASSET MANAGEMENT */}
        <div
          className={`sidebar-item flex items-center w-full px-6 py-3 cursor-pointer
          ${collapsed ? "justify-center" : "justify-between"}`}
          onClick={() => {
            if (collapsed) {
              setCollapsed(false); // explicit
            } else {
              setAssetOpen(prev => !prev);
            }
          }}
        >
          <div className="flex items-center">
            <FontAwesomeIcon icon={faFolderTree} />
            {!collapsed && <span className="ml-3">Asset Management</span>}
          </div>
 
          {!collapsed && (
            <FontAwesomeIcon
              icon={faCaretDown}
              className={`transition-transform duration-200
              ${assetOpen ? "rotate-180" : ""}`}
            />
          )}
        </div>
 
 
{!collapsed && assetOpen && (
  <div className="pl-12 flex flex-col gap-2 py-2">
    <Link
      href="/asset-management/structure-library"
      className="text-gray-600 transition-colors duration-200 hover:text-black"
    >
      Structure Library
    </Link>
 
    <Link
      href="/asset-management/document-upload"
      className="text-gray-600 transition-colors duration-200 hover:text-black"
    >
      Document Upload
    </Link>
  </div>
)}
 
        {/* ASSET LIST */}
        <Link
          href="/asset-list"
          className={`sidebar-item flex items-center w-full px-6 py-3
          ${collapsed ? "justify-center" : ""}`}
        >
          <FontAwesomeIcon icon={faList} />
          {!collapsed && <span className="ml-3">Asset List</span>}
        </Link>
 
        {/* PREDICTIONS */}
        <Link
          href="/admin/predictions"
          className={`sidebar-item flex items-center w-full px-6 py-3
          ${collapsed ? "justify-center" : ""}`}
        >
          <FontAwesomeIcon icon={faChartLine} />
          {!collapsed && <span className="ml-3">Predictions</span>}
        </Link>
      </nav>
 
      {/* ================= FOOTER ================= */}
      <div className="border-t border-gray-200 py-3">
 
        {/* SETTINGS */}
        <div
          className={`sidebar-item flex items-center w-full px-6 py-3 cursor-pointer
          ${collapsed ? "justify-center" : "justify-between"}`}
          onClick={() => {
            if (collapsed) {
              setCollapsed(false);
            } else {
              setSettingsOpen(prev => !prev);
            }
          }}
        >
          <div className="flex items-center">
            <FontAwesomeIcon icon={faCog} />
            {!collapsed && <span className="ml-3">Settings</span>}
          </div>
 
          {!collapsed && (
            <FontAwesomeIcon
              icon={faCaretDown}
              className={`transition-transform duration-200
              ${settingsOpen ? "rotate-180" : ""}`}
            />
          )}
        </div>
 
        {!collapsed && settingsOpen && (
  <div className="pl-12 flex flex-col gap-2 py-2">
    <Link
      href="/admin/document-list"
      className="text-gray-600 transition-colors duration-200 hover:text-black"
 
    >
      Document List
    </Link>
 
    <Link
      href="/admin/attribute-admin"
      className="text-gray-600 transition-colors duration-200 hover:text-black"
 
    >
      Attribute Admin
    </Link>
 
    <Link
      href="/admin/project-management"
      className="text-gray-600 transition-colors duration-200 hover:text-black"
 
    >
      Project Management
    </Link>
  </div>
)}
 
        {/* HELP */}
        <div
          className={`sidebar-item flex items-center w-full px-6 py-3
          ${collapsed ? "justify-center" : ""}`}
        >
          <FontAwesomeIcon icon={faQuestion} />
          {!collapsed && <span className="ml-3">Help</span>}
        </div>
      </div>
    </aside>
  );
}
 