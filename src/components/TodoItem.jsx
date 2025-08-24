import React, { useState } from "react";

export default function TodoItem({ item, onToggle, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(item.text);

  function commit() {
    const v = text.trim();
    if (v && v !== item.text) onUpdate(item.id, { text: v });
    setEditing(false);
  }

  return (
    <li className="group flex items-start gap-3 rounded-xl px-2 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => onToggle(item.id)}
        className="mt-1 h-5 w-5 cursor-pointer accent-zinc-900 dark:accent-zinc-100"
        aria-label={item.completed ? "Mark as not done" : "Mark as done"}
      />

      <div className="flex-1">
        {editing ? (
          <input
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) =>
              e.key === "Enter"
                ? commit()
                : e.key === "Escape"
                ? (setEditing(false), setText(item.text))
                : null
            }
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-900"
          />
        ) : (
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <p
                className={`text-sm ${
                  item.completed
                    ? "line-through text-zinc-400 dark:text-zinc-500"
                    : ""
                }`}
                onDoubleClick={() => setEditing(true)}
              >
                {item.text}
              </p>
              {item.priority !== "none" && (
                <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide dark:bg-zinc-800">
                  {item.priority}
                </span>
              )}
              {item.due && (
                <span className="text-[10px] text-zinc-500">
                  Due: {new Date(item.due).toLocaleDateString()}
                </span>
              )}
            </div>
            <span className="mt-0.5 text-[10px] text-zinc-500">
              Added {new Date(item.createdAt).toLocaleString()}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          className="btn-ghost"
          onClick={() => setEditing((v) => !v)}
          aria-label="Edit"
        >
          ✏️
        </button>
        <button
          className="btn-ghost"
          onClick={() => onDelete(item.id)}
          aria-label="Delete"
        >
          🗑️
        </button>
      </div>
    </li>
  );
}
