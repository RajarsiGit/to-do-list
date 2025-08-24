import React from "react";
import TodoItem from "./TodoItem.jsx";

export default function TodoList({ items, onToggle, onDelete, onUpdate }) {
  if (!items.length) {
    return (
      <p className="rounded-xl border border-dashed border-zinc-300 p-6 text-center text-sm text-zinc-500 dark:border-zinc-700">
        No tasks to show.
      </p>
    );
  }
  return (
    <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
      {items.map((item) => (
        <TodoItem
          key={item.id}
          item={item}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}
