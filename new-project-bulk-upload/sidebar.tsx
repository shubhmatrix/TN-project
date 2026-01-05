"use client";

import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [assetMgmtOpen, setAssetMgmtOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <aside className="sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <span className="sidebar-title">KPD Tangents</span>
      </div>

      {/* Main Navigation */}
      <nav className="sidebar-nav">
        {/* Asset Management */}
        <div
          className="nav-item has-children"
          onClick={() => setAssetMgmtOpen(!assetMgmtOpen)}
        >
          <span>Asset Management</span>
          <span className="caret">{assetMgmtOpen ? "▴" : "▾"}</span>
        </div>

        {assetMgmtOpen && (
          <div className="nav-children">
            <Link href="/structure-library" className="nav-subitem">
              Structure Library
            </Link>
            <Link href="/document-upload" className="nav-subitem">
              Document Upload
            </Link>
          </div>
        )}

        {/* Asset List */}
        <Link href="/asset-list" className="nav-item">
          Asset List
        </Link>
      </nav>

      {/* Bottom Section */}
      <div className="sidebar-footer">
        {/* Settings */}
        <div
          className="nav-item has-children"
          onClick={() => setSettingsOpen(!settingsOpen)}
        >
          <span>⚙ Settings</span>
          <span className="caret">{settingsOpen ? "▴" : "▾"}</span>
        </div>

        {settingsOpen && (
          <div className="nav-children">
            <Link href="#" className="nav-subitem">
              Document List
            </Link>
            <Link href="#" className="nav-subitem">
              Attribute Admin
            </Link>
            <Link href="#" className="nav-subitem">
              Project Management
            </Link>
            <Link href="#" className="nav-subitem">
              Predictions
            </Link>
          </div>
        )}

        {/* Help */}
        <button className="footer-btn">? Help</button>

        {/* KDS Logo */}
        <div className="kds-logo">KDS</div>
      </div>
    </aside>
  );
}
