# CityHospital — Frontend

React + TypeScript + Tailwind CSS frontend for the CityHospital LLM-Augmented Healthcare Management System.

## Getting started

```bash
cd frontend
npm install
npm run dev
```

App runs at http://localhost:5173

## Structure

- `src/app` — routes, layouts, providers
- `src/components` — reusable UI (`ui/`) and layout (`layout/`) components
- `src/config/hospital.config.ts` — single source of truth for branding (name, contact, address, logo)
- `src/features` — one folder per independent module (public site, patient, doctor, etc.)
- `src/mocks` — temporary data before backend APIs exist
- `src/services` — API client layer (added in Phase 4)
- `src/types` — shared TypeScript types
