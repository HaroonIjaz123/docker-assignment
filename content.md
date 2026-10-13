# CityHospital — LLM-Augmented Healthcare Management System

## Project overview

This project will deliver a modern, web-based traditional Hospital Management System (HMS) enhanced later with carefully controlled AI features. The system supports hospital staff, doctors, and patients through role-based workflows.

`CityHospital` is a temporary brand name. Change its name, contact details, address, logo, and theme settings later in one central frontend configuration file: `frontend/src/config/hospital.config.ts`.

## Goals

1. Build the core traditional HMS before adding AI.
2. Use the approved stack: React, Tailwind CSS, FastAPI, PostgreSQL, Docker, and Python AI services.
3. Keep modules independent, reusable, testable, and scalable.
4. Add AI only after reliable patient, appointment, and clinical-record workflows exist.

## Technology stack

| Layer | Technology |
| --- | --- |
| Frontend | React, TypeScript, Tailwind CSS |
| Backend | Python 3.11, FastAPI |
| Database | PostgreSQL 15 |
| Authentication | JWT, PyJWT, bcrypt |
| AI orchestration | LangChain and OpenAI API |
| Embeddings | multilingual-e5-large |
| Vector store | FAISS or ChromaDB |
| Evaluation | Python, rouge-score, scikit-learn |
| Deployment | Docker and Docker Compose |

## Included traditional HMS modules

### Public and access

- Public website: Home, About, Services, Doctors, Contact
- Authentication and role-based access
- Patient, doctor, administrative, reception, pharmacy, laboratory, nursing, and billing roles

### Patient and clinical operations

- Patient registration, profiles, search, and document management
- Department, doctor, staff, and schedule management
- Appointments, walk-in registration, and queue management
- OPD consultation: vitals, diagnoses, allergies, notes, prescriptions, orders, and follow-ups
- IPD admission, wards, beds, transfers, inpatient records, and discharge
- Nursing: observations, medication administration, notes, and care plans
- Emergency registration, triage, consultation, and orders
- Longitudinal medical records and discharge summaries

### Financial and diagnostic operations

- Billing, invoices, payments, refunds, discounts, and receipts
- Laboratory: test catalog, orders, sample collection, result entry, verification, and reports
- Radiology: imaging orders and reports
- Pharmacy: medicine catalog, dispensing, billing, and stock control
- Inventory and procurement: stock, suppliers, purchase orders, goods receipts, transfers, and alerts
- Operation theatre: scheduling, procedure records, surgical teams, consumables, and notes

### Administration and oversight

- Hospital configuration, master data, users, roles, permissions, and audit logs
- Dashboards and operational reporting

## Deferred optional modules

The following are intentionally out of the first release and can be assessed later: accounting, payroll, insurance/claims, fixed assets, CSSD, maternity, vaccination, marketing referrals, and helpdesk.

## AI features — implemented after the HMS

1. **Urdu/English RAG chatbot:** provides answers grounded in approved hospital knowledge, departments, services, and policies.
2. **Chatbot appointment booking:** checks live schedules and creates, changes, or cancels appointments only through secured HMS APIs.
3. **Doctor clinical-history summarizer:** creates a structured draft from approved patient records. A doctor must review and approve it; it never makes autonomous clinical decisions.

## Planned folder structure

```text
LLM Augmented Healtcare Mangement System/
├── README.md
├── docs/                         # Architecture, module, API, and AI documentation
├── frontend/                     # React + TypeScript + Tailwind application
│   ├── public/
│   └── src/
│       ├── app/                  # Routes, layouts, app providers
│       ├── components/           # Reusable UI components
│       ├── config/               # Central hospital branding/configuration
│       ├── features/             # Independent HMS modules
│       ├── hooks/
│       ├── lib/
│       ├── mocks/                # Temporary UI data before APIs are built
│       ├── services/             # API-client layer
│       ├── types/
│       └── styles/
├── backend/                      # FastAPI application; created after frontend
├── ai-service/                   # RAG, booking, and summary agents; created last
├── database/                     # Schema, migrations, and seed data
├── infrastructure/               # Docker and deployment files
└── .github/workflows/            # CI workflows
```

## Delivery plan

### Phase 1 — Frontend foundation

Create the React application, design system, central CityHospital configuration, navigation, responsive layouts, reusable UI components, and mock data.

### Phase 2 — Traditional HMS frontend

Build all planned public, patient, doctor, reception, clinical, IPD, nursing, emergency, laboratory, pharmacy, billing, inventory, OT, reporting, and administration interfaces.

### Phase 3 — Backend and database

Implement the FastAPI API, PostgreSQL schema, authentication, role permissions, audit logging, validation, and API tests.

### Phase 4 — HMS integration

Replace mock data with secured backend APIs and test each complete operational workflow.

### Phase 5 — AI implementation

Implement the RAG chatbot, appointment-booking tool, clinical summarizer, Urdu/English retrieval, safety controls, and research evaluation pipeline.

### Phase 6 — Production preparation

Add Docker configuration, automated tests, documentation, monitoring, backup guidance, security review, and deployment instructions.

## Development principles

- Build one file at a time and review progress continuously.
- Keep business logic out of UI components.
- Use typed interfaces and reusable components.
- Keep AI access narrowly scoped, logged, consent-aware, and secure.
- Never allow AI-generated clinical summaries or booking actions to bypass required validation and human review.
