# 📝 To‑Do List App (React + Vite + Tailwind)

A clean, keyboard‑friendly to‑do app with search, filters, priorities, due dates, dark mode, and JSON import/export. Data is saved in `localStorage`.

## ✨ Features
- Add / edit / delete tasks
- Mark complete / undo
- Filters: All, Active, Completed
- Search (Cmd/Ctrl + K to focus)
- Optional priority + due date
- Dark mode toggle
- Clear completed
- Import / Export JSON
- Local persistence (no backend needed)

## 🚀 Quick Start

> Requires **Node.js 18+** and **npm**.

```bash
npm install
npm run dev
```

Visit the printed local URL to use the app.

### Build for production

```bash
npm run build
npm run preview
```

## 🛠 Tech
- [Vite](https://vitejs.dev/) for dev/build
- [React 18](https://react.dev/)
- [Tailwind CSS 3.x](https://tailwindcss.com/)

> Tailwind is pinned to v3.x here for stability. If you want Tailwind v4, update the dev dependency and switch your `postcss.config.js` plugin from `tailwindcss` to `@tailwindcss/postcss`.
