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
    <main className="min-h-screen bg-gray-100 py-4">
      <div className="max-w-7xl mx-auto bg-white shadow-md border border-gray-200">
        {/* Header bar */}
        <div className="flex items-center justify-between bg-gray-800 text-white px-4 py-2">
          <div>
            <h1 className="text-lg font-semibold">New Project Bulk Upload</h1>
            {hasSaved && selectedJob && (
              <p className="text-xs text-gray-300 mt-0.5">
                Job: <span className="font-medium">{selectedJob}</span>{" "}
                &nbsp;•&nbsp; Equipment:{" "}
                <span className="font-medium">{selectedEquipment}</span>
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => setShowSettings((prev) => !prev)}
            className="text-sm px-3 py-1 border border-gray-400 rounded bg-gray-700 hover:bg-gray-600 transition"
          >
            Settings
          </button>
        </div>

        {/* Content area */}
        <div className="flex flex-col md:flex-row">
          {/* Main area */}
          <section className="flex-1 p-4 overflow-x-auto">
            {!hasSaved ? (
              <div className="h-[420px] flex items-center justify-center bg-gray-50 border border-dashed border-gray-300 text-sm text-gray-500">
                Please enter Job and Equipment selection via Settings bar to
                proceed with asset upload.
              </div>
            ) : (
              <div className="overflow-auto max-h-[480px] border border-gray-200">
                <table className="min-w-full text-xs bulk-table">
                  <thead className="bg-gray-100 border-b border-gray-300">
                    <tr>
                      <th className="px-3 py-2 w-10 text-center">
                        <input type="checkbox" />
                      </th>
                      <th className="px-3 py-2 text-left whitespace-nowrap">
                        Pole Structure Name
                      </th>
                      <th className="px-3 py-2 text-left whitespace-nowrap">
                        Height
                      </th>
                      <th className="px-3 py-2 text-left whitespace-nowrap">
                        Structure Type
                      </th>
                      <th className="px-3 py-2 text-left whitespace-nowrap">
                        Shop Drawing
                      </th>
                      <th className="px-3 py-2 text-left whitespace-nowrap">
                        PLS for Analysis (RTF)
                      </th>
                      <th className="px-3 py-2 text-left whitespace-nowrap">
                        PLS for Analysis (XML)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockRows.map((row) => (
                      <tr key={row.id} className="odd:bg-white even:bg-gray-50">
                        <td className="px-3 py-2 text-center">
                          <input type="checkbox" />
                        </td>
                        <td className="px-3 py-2 align-top">
                          {row.poleStructureName}
                        </td>
                        <td className="px-3 py-2 align-top">{row.height}</td>
                        <td className="px-3 py-2 align-top">
                          {row.structureType}
                        </td>
                        <td className="px-3 py-2 align-top">
                          <span className="text-blue-700 underline cursor-pointer">
                            {row.shopDrawing}
                          </span>
                        </td>
                        <td className="px-3 py-2 align-top">
                          <span className="text-blue-700 underline cursor-pointer">
                            {row.plsRtf}
                          </span>
                        </td>
                        <td className="px-3 py-2 align-top">
                          <span className="text-blue-700 underline cursor-pointer">
                            {row.plsXml}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {hasSaved && (
              <div className="mt-4 flex justify-end">
                <button className="px-4 py-1.5 text-xs rounded bg-blue-600 text-white hover:bg-blue-700">
                  Submit Changes
                </button>
              </div>
            )}
          </section>

          {/* Settings Sidebar */}
          {showSettings && (
            <aside className="w-full md:w-72 border-l border-gray-200 bg-gray-50 p-4 md:h-[480px] slide-in-right">
              <h2 className="text-sm font-semibold mb-4">Settings</h2>

              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Job Number
                </label>
                <select
                  className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={selectedJob}
                  onChange={(e) => setSelectedJob(e.target.value)}
                >
                  <option value="">Select Job</option>
                  <option value="20084523">
                    20084523 - El Dorado 345kV Line
                  </option>
                  <option value="20091234">
                    20091234 - North Ridge 230kV Line
                  </option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Equipment / Library
                </label>
                <select
                  className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={selectedEquipment}
                  onChange={(e) => setSelectedEquipment(e.target.value)}
                >
                  <option value="">Select Equipment</option>
                  <option value="Transmission">Transmission Library</option>
                  <option value="Distribution">Distribution Library</option>
                </select>
              </div>

              {error && <p className="text-xs text-red-600 mb-3">{error}</p>}

              <div className="flex justify-between gap-2 mt-2">
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex-1 px-3 py-1.5 text-xs rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Save &amp; Close
                </button>
                <button
                  type="button"
                  onClick={() => setShowSettings(false)}
                  className="px-3 py-1.5 text-xs rounded border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </aside>
          )}
        </div>
      </div>
    </main>
  );
}
