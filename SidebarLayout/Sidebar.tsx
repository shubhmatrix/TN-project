"use client";

import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [assetOpen, setAssetOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <aside className="sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <div className="text-sm font-semibold">KPD Structure Database</div>
      </div>

      {/* Navigation */}
      <div className="sidebar-nav">
        <Link href="/" className="sidebar-item">
          Home
        </Link>

        {/* Asset Management */}
        <div
          className="sidebar-item flex justify-between"
          onClick={() => setAssetOpen(!assetOpen)}
        >
          Asset Management
          <span>{assetOpen ? "▾" : "▸"}</span>
        </div>

        {assetOpen && (
          <div className="sidebar-sub">
            <Link href="/structure-library">Structure Library</Link>
            <Link href="/document-upload">Document Upload</Link>
          </div>
        )}

        <Link href="/asset-list" className="sidebar-item">
          Asset List
        </Link>

        <Link href="/predictions" className="sidebar-item">
          Predictions
        </Link>
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <button
          className="sidebar-item flex justify-between"
          onClick={() => setSettingsOpen(!settingsOpen)}
        >
          ⚙ Settings
          <span>{settingsOpen ? "▾" : "▸"}</span>
        </button>

        {settingsOpen && (
          <div className="sidebar-sub">
            <a>Document List</a>
            <a>Attribute Admin</a>
            <a>Project Management</a>
            <a>Predictions</a>
          </div>
        )}

        <button className="sidebar-item">? Help</button>

        <div className="kds-logo">KDS</div>
      </div>
    </aside>
  );
}
