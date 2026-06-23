# 🧠 Second Brain OS

> **A unified digital workspace to eliminate mental overwhelm.**

Track habits, manage projects, save resources, and monitor lifestyle metrics — all in one stunning dark-themed command center.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-v4-000?logo=shadcnui)

---

## ✨ Features

### 📥 The Inbox
Rapid-capture text entry for thoughts, links, and tasks. Press `C` anywhere to instantly capture.

### 📁 Action Suite
Interconnected **Projects**, **Tasks**, and Sub-tasks with kanban-style views and priority badges.

### 📝 The Laboratory
Knowledge base for Notes and Resources (articles, videos) with colored tag organization.

### 🔄 The Tracker
Daily Habit checklist with **streak counters** and weekly heatmaps.

### 💰 Finances
Track income, expenses, and savings with summary cards and transaction logs.

### 💪 Fitness
Log workouts, track calories, and monitor weekly goals.

---

## 🎨 Design System

**Cyber-Minimalist / Dark Cyber** aesthetic:

| Token | Value | Purpose |
|-------|-------|---------|
| Background | `#0B0B0F` | Deep Charcoal |
| Cards | `#16161F` | Soft Dark Gray |
| Primary | `#E50914` | Crimson Neon Red |
| Accent | `#FF3344` | Neon Red Highlights |
| Text | `#FFFFFF` / `#8A8A93` | Crisp White / Muted Gray |

Plus glassmorphism cards, glow effects, smooth animations, and custom scrollbars.

---

## 🚀 Getting Started

### Prerequisites

You need a Supabase project set up. Create a project at [supabase.com](https://supabase.com) and retrieve your project URL and anon API key.

### Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/iammsp-star/second-brain-os.git
   cd second-brain-os
   ```

2. **Configure environment variables:**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `C` | Open Quick Capture |
| `/` | Focus Search Bar |
| `Esc` | Close Modal |

---

## 🏗️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript 5
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui v4](https://ui.shadcn.com/)
- **State**: [Zustand](https://zustand.docs.pmnd.rs/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: [Inter](https://fonts.google.com/specimen/Inter)

---

## 📂 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Dashboard (bento grid)
│   ├── inbox/             # Quick capture inbox
│   ├── projects/          # Project management
│   ├── tasks/             # Kanban task board
│   ├── notes/             # Knowledge base
│   ├── habits/            # Habit tracker
│   ├── finances/          # Financial tracking
│   └── fitness/           # Workout logging
├── components/
│   ├── layout/            # Sidebar, TopNav, AppShell
│   ├── dashboard/         # Dashboard widgets
│   ├── quick-capture/     # Quick capture modal
│   ├── shared/            # Reusable components
│   └── ui/                # shadcn/ui primitives
├── hooks/                 # Custom React hooks
├── store/                 # Zustand state stores
└── lib/                   # Utilities
```

---

## 🗺️ Roadmap

- [x] **Phase 1**: Static shell + dark cyber theme + full UI layout
- [x] **Phase 2**: Supabase backend + Auth (Credentials / Sign Up / Google OAuth / Anonymous Guest session)
- [ ] **Phase 3**: Projects & Tasks CRUD with relational linking
- [ ] **Phase 4**: Habit streak logic + real-time tracking
- [ ] **Phase 5**: Charts, mobile optimization, keyboard shortcuts polish

---

## 📄 License

MIT — built with ❤️ by [Manas](https://github.com/iammsp-star)
