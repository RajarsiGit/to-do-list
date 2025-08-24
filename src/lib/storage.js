const KEY = "todo-items-v1";

export function loadTodos() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveTodos(todos) {
  try {
    localStorage.setItem(KEY, JSON.stringify(todos));
  } catch {}
}
