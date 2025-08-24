import React from "react";

export default function Stats({ total, done }) {
  return (
    <div className="text-sm text-zinc-600 dark:text-zinc-400">
      {done}/{total} completed
    </div>
  );
}
