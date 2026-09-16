# DocuMed — Healthcare Records

A modern **EMR (Electronic Medical Records) web app** built from the
*DocuMed — Clinician Dashboard* Product Requirements Document (v1.0). The
Dashboard is the canonical reference implementation of the DocuMed design
system, and every card is a summary with a drill-down into the adjacent module.

![stack](https://img.shields.io/badge/React_18-Vite_5-646CFF) ![stack](https://img.shields.io/badge/TypeScript-Tailwind_3-3178C6)

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173  (binds 0.0.0.0)
```

Other scripts:

```bash
npm run build      # type-check (tsc --noEmit) + production bundle
npm run preview    # serve the production build
```

The app is a client-side SPA with a **mock data layer** (`src/lib/mock.ts`) — no
backend is required. A seeded session signs you in as **Dr. Sarah Wilson
(Cardiologist)** so the Dashboard is the landing screen; **Sign out** clears the
session and routes to the Login screen, which signs you back in.

---

## Feature map (vs. PRD)

| PRD section | Where | Notes |
|---|---|---|
| §6.1 Sidebar nav | `components/layout/Sidebar.tsx` | Active filled pill, hover states, red Sign out, off-canvas drawer on mobile |
| §6.2 Global patient search | `components/layout/TopBar.tsx` | Debounced (300 ms), avatar + DOB/MRN results, empty state w/ “Create new patient” |
| §6.3 Notifications | `components/layout/TopBar.tsx` | Red dot badge, panel, mark-all-read, item → context navigation, read on view |
| §6.4 Profile menu | `components/layout/TopBar.tsx` | Avatar + name/role + chevron dropdown (View Profile / Settings / Sign out) |
| §6.5 Greeting | `components/dashboard/Greeting.tsx` | Time-of-day aware (“Good Morning/Afternoon/Evening, Dr. Sarah”) |
| §6.6 KPI cards | `components/dashboard/StatCards.tsx` | 4-across, per-card skeleton loading, click → pre-filtered module |
| §6.7 Upcoming Appointments | `components/dashboard/UpcomingAppointments.tsx` | Chronological, row → patient chart, empty state, See Details |
| §6.8 Recent Patients | `components/dashboard/RecentPatients.tsx` | Most-recent-first, row → Patient Profile |
| §6.9 Health Trend | `components/dashboard/HealthTrendChart.tsx` | Headline % + semantic delta chip, 7d/30d/90d switcher, tooltips |
| §6.10 Patient Statistics | `components/dashboard/PatientStatistics.tsx` | Grouped bars (New Patients / Follow-ups), legend, tooltips |
| §6.11 Test Results | `components/dashboard/TestResultsTable.tsx` | Scoped search, inline sparklines, out-of-range flag, row → Lab Detail |
| §6.12 Sign out | `Sidebar` / `TopBar` | Confirmation modal → session cleared → Login |
| §7.1 First paint | `lib/useAsyncData.ts` | Shell renders instantly; each widget resolves independently (skeleton → content) |
| §5 IA entry points | `pages/*` | Patients, Appointments, Prescriptions, Lab Results, Analytics, Settings + Patient/Lab detail |

---

## Design system (PRD §4)

Tokens live in `tailwind.config.js` as named scales so the semantic mapping is
explicit and reusable:

- `primary` (brand blue #2F5AF0), `success` (green), `warning` (amber),
  `danger` (red), `accent` (purple), `neutral` (slate), `surface` (white / app-bg).
- **Semantic color rule is preserved**: blue = action, green = positive,
  amber = needs attention soon, red = urgent. Every color-coded state is paired
  with a non-color signal (icon + text) for WCAG compliance (PRD §8).
- **Typeface:** Nunito — a rounded geometric sans-serif, self-hosted via
  `@fontsource` so it renders identically offline.
- **Components:** `Panel`, `IconBadge`, `StatCard`, `AvatarListRow`,
  `SearchInput`, `StatusChip`, `Sparkline`, `ConfirmModal` (see `src/components`).

---

## Architecture

```
src/
  App.tsx                 Router (HashRouter) + auth protection
  context/AuthContext     Client-only session (seeded → sign-out clears PHI caches)
  hooks/useClickOutside   Dropdown / menu outside-click + Escape handling
  lib/
    mock.ts               All mock entities (patients, appts, labs, rx, stats, trend)
    useAsyncData.ts       Per-widget async loading (skeleton states)
    tokens.ts             Chart hex colors (mirror of the design tokens)
    format.ts             Greeting, initials, avatar tints, number/time helpers
  components/
    layout/  AppShell · Sidebar · TopBar
    dashboard/  Greeting · StatCards · UpcomingAppointments · RecentPatients ·
                HealthTrendChart · PatientStatistics · TestResultsTable · …
    ui/  Panel · IconBadge · Avatar · SearchInput · StatusChip · Sparkline · …
  pages/  Login · Dashboard · Patients · PatientProfile · Appointments ·
          Prescriptions · LabResults · LabResultDetail · Analytics · Settings · 404
```

- **Routing:** `react-router` v6 with **HashRouter** so deep links and refresh
  work behind the proxied preview without server rewrites.
- **Charts:** Recharts (area, grouped bars, donut). **Icons:** Lucide.
- **Avatars:** deterministic tinted initials (no external image host — reliable
  and PHI-appropriate).

### Stubs & open items (PRD §9)
Sub-module **detail** screens are scoped as functional stubs that reuse the
design system (they're navigation targets, not dead ends). Open product
questions from the PRD — the definition of the “85%” Health score, refresh
cadence / real-time urgent counts, and role-conditional dashboards — are
left as documented extension points.
