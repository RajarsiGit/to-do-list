import React, { useRef } from "react";

export default function ImportExport({ onImport, onExport }) {
  const fileRef = useRef(null);

  function triggerImport() {
    fileRef.current?.click();
  }

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (!Array.isArray(data)) throw new Error("Invalid file format");
      onImport(data);
    } catch (err) {
      alert("Import failed: " + err.message);
    } finally {
      e.target.value = "";
    }
  }

  return (
    <div className="flex items-center gap-2">
      <input
        ref={fileRef}
        type="file"
        accept="application/json"
        onChange={handleFile}
        className="hidden"
      />
      <button className="btn-ghost" onClick={triggerImport}>
        Import JSON
      </button>
      <button className="btn-ghost" onClick={onExport}>
        Export JSON
      </button>
    </div>
  );
}
