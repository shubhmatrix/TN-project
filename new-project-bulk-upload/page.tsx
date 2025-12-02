"use client";

import React, { useState } from "react";

type BulkRow = {
  id: number;
  poleStructureName: string;
  height: string;
  structureType: string;
  shopDrawing: string;
  plsRtf: string;
  plsXml: string;
};

const mockRows: BulkRow[] = [
  {
    id: 1,
    poleStructureName: "20685402-132 kV / 475 kA / 120",
    height: "120",
    structureType: "Tangent",
    shopDrawing: "\\imports\\Shop Drawing\\DRW-001-12345-A1.pdf",
    plsRtf: "\\imports\\PLS RT Files\\PLS_001_12345_A1.rtf",
    plsXml: "\\imports\\PLS XML Files\\PLS_001_12345_A1.xml",
  },
  {
    id: 2,
    poleStructureName: "20685403-132 kV / 500 kA / 130",
    height: "130",
    structureType: "Tangent",
    shopDrawing: "\\imports\\Shop Drawing\\DRW-002-56789-B1.pdf",
    plsRtf: "\\imports\\PLS RT Files\\PLS_002_56789_B1.rtf",
    plsXml: "\\imports\\PLS XML Files\\PLS_002_56789_B1.xml",
  },
  // add more static rows if you want…
];

export default function NewProjectBulkUploadPage() {
  const [showSettings, setShowSettings] = useState(true);
  const [hasSaved, setHasSaved] = useState(false);

  const [selectedJob, setSelectedJob] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState("");

  const [error, setError] = useState("");

  const handleSave = () => {
    if (!selectedJob || !selectedEquipment) {
      setError("Please select Job and Equipment to continue.");
      return;
    }
    setError("");
    setHasSaved(true);
    setShowSettings(false);
  };

  return (
  <>
    {/* Navbar */}
    <Navbar />

    <div className="page-content-container">
      <div className="template-content" id="new_asset_document" style={{ overflowY: "auto" }}>

        <div className="header" id="context_filter_bar">
          <h1 id="context-bar-header" className="header-title">
            {header_title}
          </h1>
        </div>

        <div className="header-attributes">
          {context_attributes?.map((attribute: any, index: number) => (
            <div key={index}>
              <dt className="attribute-name">{attribute.attribute_name}</dt>

              <dd
                className={
                  attribute.attribute_value === "Not Selected"
                    ? "attribute-text-unselected"
                    : "attribute-text"
                }
              >
                {attribute.attribute_value}
              </dd>
            </div>
          ))}
        </div>

        {/* Settings Button */}
        <button
          className="btn btn-outline-primary btn-sm me-4 float-end"
          type="button"
          id="btn-settings"
          data-bs-toggle="offcanvas"
          data-bs-target="#reportSettings"
        >
          Settings
        </button>

      </div>
    </div>
  </>
);

}
