# CityHospital — Build Progress

Stack: React + TypeScript + Tailwind (frontend, being built now) → FastAPI + PostgreSQL (later phases) → AI service (last).
Reference only: hospital-management-system-emr-opensource (Danphe EMR) — used for module/workflow ideas, not code (different stack: Angular/ASP.NET/SQL Server).

## Design tokens (locked for whole app)
- Primary: #0B3D3A | Primary hover: #2F6F5E | Accent: #C77B4A
- Background: #F7F5F0 | Surface: #E8E3D8 | Text: #1A1A1A
- Display font: Newsreader (serif) | Body/UI font: Inter
- Config source of truth: `frontend/src/config/hospital.config.ts`

## Screen sequence & status

| # | Screen | Status |
|---|--------|--------|
| 1 | Public — Home | ✅ Approved, real .tsx code written |
| 2 | Public — About | ✅ Real .tsx code written, pending your review |
| 3 | Public — Login | ✅ Real .tsx code written (role selector: Patient/Doctor/Staff), pending your review |
| 4 | Public — Services | ⏳ Not started |
| 5 | Public — Doctors | ⏳ Not started |
| 6 | Public — Contact | ⏳ Not started |
| ... | Patient/Doctor/Reception/Clinical/IPD/etc. | ⏳ Comes after public site, per README module order |

## Real project scaffold — done
Full runnable Vite + React + TS + Tailwind project created under `frontend/`:
package.json, vite.config.ts, tsconfig.json, tailwind.config.js, postcss.config.js,
index.html, src/main.tsx, src/app/App.tsx, src/app/layouts/PublicLayout.tsx,
src/components/layout/SiteHeader.tsx, SiteFooter.tsx, src/components/ui/Button.tsx,
DepartmentIcon.tsx, src/config/hospital.config.ts, src/types, src/mocks, src/styles.

## Notes
- Each screen is reviewed as a published preview artifact first, then converted to real .tsx once approved.
- About and Login currently exist as placeholder components so routing/build works — will be designed next, one at a time.
