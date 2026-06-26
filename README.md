# JuniorConnect — Frontend ##live: https://juniorconnect.mahmoudrabea.website

JuniorConnect is a platform that helps junior developers build real portfolio
projects together. Users complete a guided onboarding, get **AI-powered team and
project matching**, collaborate on projects with a Kanban-style board, chat with
an **AI Mentor**, and grow a public profile with skills, badges, and a portfolio.

This repository contains the **frontend single-page application (SPA)**, built
with **Vue 3**, **Vue Router**, and **Tailwind CSS**. It talks to a separate
backend API over an authenticated session cookie.

---

## ✨ Features

### Authentication
- Email / password **registration and login**.
- **Social login** with Google and Facebook (OAuth).
- **Forgot / reset password** flow with email **OTP verification code**.
- Session handled by an **httpOnly cookie**; auth state is cached in a single
  central store (`state/authStore.js`) so the app asks the server only once.

### Guided Onboarding
A step-by-step wizard that collects everything the matching engine needs:
- Personal info, skills, interests, experience level, and availability.
- Ends with **"Match with AI"** and an **AI result** screen suggesting teams /
  projects tailored to the user.

### AI Matching & Mentor
- **AI team/project matching** based on the user's profile.
- **AI Mentor** chat (`AI_Mentor.vue` / `ChatAI.vue`) — a context-aware
  assistant with an expandable full-screen chat mode, suggestions, and the
  ability to attach an in-progress project to the conversation.

### Teams
- **Browse teams**, view team details, and inspect **match breakdowns** that
  explain why a team fits the user.

### Project Management
- **Projects dashboard** with all projects, filtered by status
  (`in-progress` / `completed`).
- **Project detail** views split into tabs: **Overview, Milestones, Teams,
  Tasks, and Files**.
- A **Kanban-style task board** with automatic movement between columns.

### Profile
- Public **profile page** with stats, a **portfolio** of projects, **skills**
  (with suggested skills), **earned and locked badges**, and a **milestones
  timeline**.
- **Edit profile**, manage **personal information**, and add portfolio projects.
- **Privacy & Security**: visibility controls, change password, active sessions,
  clear chat history, and account deletion.

### Help & Support
- **Help Center, FAQ, Guides, Support, Feedback, and Terms** pages.
- Static content lives in `data/` (`faq.js`, `guides.js`, `support.js`,
  `terms.js`) so copy can be edited without touching components.

### UX details
- Lightweight global **toast notifications** (`state/toastStore.js`) instead of
  native browser alerts.
- **3D tilt** card effects on the landing page (via `vanilla-tilt`).
- Respects `prefers-reduced-motion` for accessibility.
- Reusable design tokens (colors, fonts, shadows) defined as CSS variables in
  `style.css`.

---

## 🛠 Tech Stack

| Area            | Choice                                   |
| --------------- | ---------------------------------------- |
| Framework       | Vue 3                                    |
| Routing         | Vue Router (history mode)                |
| Styling         | Tailwind CSS + custom CSS variables      |
| State           | Lightweight `reactive()` stores (`state/`) |
| Build tool      | Vite                                     |
| Extra libraries | `vanilla-tilt` (card hover effect)       |

State is managed with simple Vue `reactive()` stores rather than a heavier
library — one store per domain (auth, profile, skills, achievements, portfolio,
privacy, mentor, toasts).

---

## 📁 Project Structure

```
.
├── main.js              # App entry point (mounts App.vue, installs router)
├── App.vue              # Root component
├── style.css            # Global styles, design tokens, Tailwind directives
│
├── router/
│   └── index.js         # All route definitions and navigation guards
│
├── views/               # Page-level components (one folder per area)
│   ├── auth/            # Register, login, OTP, forgot/reset password
│   ├── Onboarding/      # Multi-step onboarding wizard + AI matching
│   ├── Home/            # Public landing page sections
│   ├── Dahboard/        # Overview, team browse, my projects, AI mentor/chat
│   ├── projectManagment/# Projects dashboard, lists, project details + tabs
│   ├── profile/         # Profile, skills, portfolio, achievements, privacy
│   └── pages/           # Help center, FAQ, guides, support, feedback, terms
│
├── components/          # Reusable UI components
│   ├── profile/         # Profile cards, modals, sections
│   ├── teams/           # Team cards, match breakdown, profile snapshot
│   ├── project-management/
│   └── help center/     # Accordions, forms, banners, etc.
│
├── layouts/
│   └── DashboardLayout.vue
│
├── services/
│   ├── api.js           # Base fetch wrapper + BASE_URL config
│   └── auth.js          # Auth API calls (login, register, OAuth, OTP, ...)
│
├── state/               # Central reactive stores
│   ├── authStore.js
│   ├── profileStore.js
│   ├── skillsStore.js
│   ├── toastStore.js
│   └── ... (achievements, portfolio, privacy, mentor)
│
├── composables/
│   └── useProjects.js   # Reusable project-loading logic
│
└── data/                # Static content (faq, guides, support, terms)
```

> Note: the `views/Dahboard` folder name is spelled as-is in the codebase
> (a typo of "Dashboard"). The router imports it under that exact name, so don't
> rename the folder without updating `router/index.js`.

---

## 🔌 Backend Configuration

The frontend expects a backend API. The base URL is set at the top of
`services/api.js`:

```js
export const BASE_URL = "http://localhost:5000";
// production:        "https://juniorconnectback.mahmoudrabea.website";
```

- For **local development**, point `BASE_URL` at your running backend
  (default `http://localhost:5000`).
- For **production**, switch it to your deployed backend URL.

The backend exposes auth endpoints under `/api/auth/*`
(`register`, `login`, `logout`, `me`, `status`, `forgot-password`,
`verify-code`, `reset-password`, plus Google/Facebook OAuth). Authentication
relies on an **httpOnly session cookie**, so make sure CORS and credentials are
configured correctly on the backend for your frontend origin.

---

## 🚀 Getting Started (Run Locally)

> This repository contains the application **source folder** (`src`). It is meant
> to live inside a standard **Vite + Vue 3** project. If your project root
> already has `package.json`, `vite.config.js`, and `index.html`, skip the
> scaffolding step below.

### Prerequisites
- **Node.js** 18+ and **npm** (or pnpm / yarn)
- A running instance of the **JuniorConnect backend**

### 1. Install dependencies

```bash
npm install
```

The app uses, at minimum:

```bash
npm install vue vue-router vanilla-tilt
npm install -D vite @vitejs/plugin-vue tailwindcss postcss autoprefixer
```

### 2. Configure the API URL

Open `services/api.js` and set `BASE_URL` to your backend
(`http://localhost:5000` for local dev).

### 3. Start the dev server

```bash
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

### 4. Build for production

```bash
npm run build      # outputs an optimized production build to dist/
npm run preview    # serve the production build locally to verify
```

---

## 🧭 Key Routes

| Path                         | Page                                  |
| ---------------------------- | ------------------------------------- |
| `/Home`                      | Public landing page                   |
| `/register`, `/login`        | Authentication                        |
| `/otp`, `/reset_password`    | OTP verification & password reset     |
| `/ScreenPersonalInfo` → `/AIResult` | Onboarding wizard steps        |
| `/Overview`, `/Myproject1`   | Dashboard & my projects               |
| `/AI_Mentor`, `/ChatAI`      | AI mentor chat                        |
| `/browse-teams`, `/browse-teams/:id` | Browse / view teams           |
| `/projects`, `/projects/:id` | Project management & details          |
| `/profile`, `/skills`, `/portfolio`, `/achievements` | User profile areas |
| `/privacy-security`          | Account & privacy settings            |
| `/help-center`, `/faq`, `/guides`, `/support`, `/terms` | Help & info |

See `router/index.js` for the complete, authoritative list.

---

## 📝 Notes

- Code comments are written in **English**; some **user-facing UI text is in
  Arabic** by design (the product targets Arabic-speaking users).
- Styling combines **Tailwind utility classes** with scoped component CSS and
  the shared design tokens in `style.css`.
