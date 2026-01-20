import { useEffect, useState } from "react";
import { searchPoleStructures } from "@/services/documentUpload.api";

/* -------------------- Types -------------------- */

export type UploadedFile = {
  id: string;
  file: File;
  fileName: string;
  documentType: string;
};

export type PoleUpload = {
  poleId: string;
  poleLabel: string;
  files: UploadedFile[];
};

type PoleOption = {
  poleId: string;
  poleLabel: string;
};

/* -------------------- Hook -------------------- */

export function useDocumentUpload() {
  /* Pole options from API */
  const [poleOptions, setPoleOptions] = useState<PoleOption[]>([]);

  /* Selected poles + uploads */
  const [poles, setPoles] = useState<PoleUpload[]>([]);
  const [activePoleId, setActivePoleId] = useState<string | null>(null);

  /* Loading & error (future-ready) */
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* -------------------- Load Pole Structures -------------------- */

  useEffect(() => {
    const loadPoleOptions = async () => {
      try {
        setLoading(true);
        const res = await searchPoleStructures();
        // API returns { colDefs, data }
        setPoleOptions(res.data.data);
      } catch (err) {
        setError("Failed to load pole structures");
      } finally {
        setLoading(false);
      }
    };

    loadPoleOptions();
  }, []);

  /* -------------------- Pole Selection -------------------- */

  const addPole = (poleId: string) => {
    const pole = poleOptions.find((p) => p.poleId === poleId);
    if (!pole) return;

    // Prevent duplicates
    if (poles.some((p) => p.poleId === pole.poleId)) return;

    const newPole: PoleUpload = {
      poleId: pole.poleId,
      poleLabel: pole.poleLabel,
      files: [],
    };

    setPoles((prev) => [...prev, newPole]);
    setActivePoleId(pole.poleId);
  };

  /* -------------------- File Handling (Per Pole) -------------------- */

  const addFilesToActivePole = (files: FileList) => {
    if (!activePoleId) return;

    const newFiles: UploadedFile[] = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      file,
      fileName: file.name,
      documentType: "",
    }));

    setPoles((prev) =>
      prev.map((pole) =>
        pole.poleId === activePoleId
          ? { ...pole, files: [...pole.files, ...newFiles] }
          : pole
      )
    );
  };

  const removeFileFromActivePole = (fileId: string) => {
    if (!activePoleId) return;

    setPoles((prev) =>
      prev.map((pole) =>
        pole.poleId === activePoleId
          ? {
              ...pole,
              files: pole.files.filter((f) => f.id !== fileId),
            }
          : pole
      )
    );
  };

  const updateFileDocType = (fileId: string, value: string) => {
    if (!activePoleId) return;

    setPoles((prev) =>
      prev.map((pole) =>
        pole.poleId === activePoleId
          ? {
              ...pole,
              files: pole.files.map((f) =>
                f.id === fileId ? { ...f, documentType: value } : f
              ),
            }
          : pole
      )
    );
  };

  /* -------------------- Expose API -------------------- */

  return {
    /* Data */
    poleOptions,
    poles,
    activePoleId,

    /* Actions */
    setActivePoleId,
    addPole,
    addFilesToActivePole,
    removeFileFromActivePole,
    updateFileDocType,

    /* Status */
    loading,
    error,
  };
}
