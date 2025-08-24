import React, { useEffect, useMemo, useState } from "react";
import TodoInput from "./components/TodoInput.jsx";
import TodoList from "./components/TodoList.jsx";
import Filters from "./components/Filters.jsx";
import Stats from "./components/Stats.jsx";
import ImportExport from "./components/ImportExport.jsx";
import { useLocalStorage } from "./hooks/useLocalStorage.js";

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export default function App() {
  const [todos, setTodos] = useLocalStorage("todo-items-v1", []);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [dark, setDark] = useState(
    () =>
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    function onKey(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const search = document.querySelector(
          'input[placeholder^="Search tasks"]'
        );
        search?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function addTodo(text, priority = "none", due = null) {
    setTodos((prev) => [
      {
        id: uid(),
        text,
        completed: false,
        createdAt: Date.now(),
        priority,
        due,
      },
      ...prev,
    ]);
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function updateTodo(id, patch) {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  }

  function clearCompleted() {
    setTodos((prev) => prev.filter((t) => !t.completed));
  }

  function importData(list) {
    // Basic sanity check
    const cleaned = list
      .filter((x) => x && typeof x.text === "string")
      .map((x) => ({
        id: x.id || uid(),
        text: String(x.text).slice(0, 500),
        completed: !!x.completed,
        createdAt: Number(x.createdAt) || Date.now(),
        priority: ["none", "low", "medium", "high"].includes(x.priority)
          ? x.priority
          : "none",
        due: x.due || null,
      }));
    setTodos(cleaned);
  }

  function exportData() {
    const blob = new Blob([JSON.stringify(todos, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "todos.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  const filtered = useMemo(() => {
    let arr = todos;
    if (filter === "active") arr = arr.filter((t) => !t.completed);
    if (filter === "completed") arr = arr.filter((t) => t.completed);
    if (query.trim()) {
      const q = query.toLowerCase();
      arr = arr.filter((t) => t.text.toLowerCase().includes(q));
    }
    // sort: incomplete first, then by priority (high>med>low>none), then newest
    const rank = { high: 0, medium: 1, low: 2, none: 3 };
    return [...arr].sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      if (rank[a.priority] !== rank[b.priority])
        return rank[a.priority] - rank[b.priority];
      return b.createdAt - a.createdAt;
    });
  }, [todos, filter, query]);

  const total = todos.length;
  const done = todos.filter((t) => t.completed).length;

  return (
    <div className="mx-auto max-w-3xl p-6">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">📝 To‑Do List</h1>
        <div className="flex items-center gap-2">
          <Stats total={total} done={done} />
          <button
            className="btn-ghost"
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle theme"
          >
            {dark ? "🌙" : "☀️"}
          </button>
        </div>
      </header>

      <main className="space-y-4">
        <TodoInput onAdd={addTodo} />

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Filters
            filter={filter}
            setFilter={setFilter}
            query={query}
            setQuery={setQuery}
            clearCompleted={clearCompleted}
            onImport={() => {
              // trigger hidden input file selection
              const input = document.createElement("input");
              input.type = "file";
              input.accept = "application/json";
              input.onchange = async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                try {
                  const text = await file.text();
                  const data = JSON.parse(text);
                  importData(data);
                } catch (err) {
                  alert("Import failed: " + err.message);
                }
              };
              input.click();
            }}
            onExport={exportData}
          />
        </div>

        <section className="card">
          <TodoList
            items={filtered}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
          />
        </section>
      </main>

      <footer className="mt-8 text-center text-xs text-zinc-500">
        <p>
          Tip: Press{" "}
          <kbd className="rounded bg-zinc-200 px-1 py-0.5 text-[10px] text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
            Ctrl/Cmd + K
          </kbd>{" "}
          to focus search.
        </p>
      </footer>
    </div>
  );
}
