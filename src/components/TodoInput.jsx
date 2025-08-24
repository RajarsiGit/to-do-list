import React, { useState } from "react";

export default function TodoInput({ onAdd }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("none");
  const [due, setDue] = useState("");

  function add() {
    const v = text.trim();
    if (!v) return;
    onAdd(v, priority, due || null);
    setText("");
    setPriority("none");
    setDue("");
  }

  return (
    <div className="card">
      <div className="flex flex-col gap-3 md:flex-row md:items-end">
        <div className="flex-1">
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Task
          </label>
          <input
            placeholder="What needs to be done? (press Enter to add)"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? add() : null)}
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-900"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Priority
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-3 outline-none focus:ring-2 focus:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-900"
          >
            <option value="none">None</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Due
          </label>
          <input
            type="date"
            value={due}
            onChange={(e) => setDue(e.target.value)}
            className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-3 outline-none focus:ring-2 focus:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-900"
          />
        </div>

        <div className="md:ml-2">
          <button onClick={add} className="btn w-full">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
