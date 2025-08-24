import React from "react";

export default function Filters({
  filter,
  setFilter,
  query,
  setQuery,
  clearCompleted,
  onImport,
  onExport,
}) {
  return (
    <div className="card flex flex-col gap-3 md:flex-row md:items-center md:justify-between flex-wrap">
      {/* Left side: filter buttons */}
      <div className="flex items-center gap-2">
        <button
          className={`btn-ghost ${filter === "all" ? "underline" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`btn-ghost ${filter === "active" ? "underline" : ""}`}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={`btn-ghost ${filter === "completed" ? "underline" : ""}`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      {/* Right side: search + actions */}
      <div className="flex items-center gap-2 w-full">
        <input
          placeholder="Search tasks… (Ctrl/Cmd + K)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-auto md:w-96 rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-900"
        />

        {/* ⬇️ This wrapper is the key */}
        <div className="ml-auto flex items-center gap-2">
          <button className="btn-ghost" onClick={clearCompleted}>
            Clear Completed
          </button>
          <button className="btn-ghost" onClick={onImport}>
            Import JSON
          </button>
          <button className="btn-ghost" onClick={onExport}>
            Export JSON
          </button>
        </div>
      </div>
    </div>
  );
}
