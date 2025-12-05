"use client";

import React, { useState } from "react";
import Navbar from "@/components/navbar";
import SettingsBar from "@/components/SettingsBar";
import DocumentAdministrationList from "@/components/DocumentAdministrationList";

export default function DocumentAdministrationPage() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <Navbar />

      {/* Settings sidebar (if needed on this page) */}
      <SettingsBar
        isOpen={isSettingsOpen}
        selectedJobId={""}
        jobOptions={[]}
        onJobChange={() => {}}
        onSave={() => setIsSettingsOpen(false)}
        onClose={() => setIsSettingsOpen(false)}
      />

      <DocumentAdministrationList />
    </>
  );
}
