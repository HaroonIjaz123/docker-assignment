# CityHospital backend

The administration backend uses FastAPI, SQLAlchemy, bcrypt password hashes, and signed JWT access tokens. It provides a protected administration API for dashboard metrics, user account lifecycle management, role/permission reference data, departments, hospital operating settings, and audit records.

## Administration API

All routes below require an administrator bearer token:

- `GET /api/v1/admin/dashboard`
- `GET, POST /api/v1/admin/users`; `PUT /api/v1/admin/users/{id}`; `POST /api/v1/admin/users/{id}/reset-password`
- `GET, POST /api/v1/admin/roles`; `PUT /api/v1/admin/roles/{id}`; `GET /api/v1/admin/permissions`
- `GET, POST /api/v1/admin/departments`; `PUT /api/v1/admin/departments/{id}`
- `GET, PUT /api/v1/admin/settings`
- `GET /api/v1/admin/audit-logs`

Mutating operations generate audit records. The API prevents removal of the final active administrator and does not expose password hashes.

## Run locally

1. Create and activate a Python 3.11 virtual environment.
2. Install dependencies: `pip install -r requirements.txt`.
3. Optionally copy `.env.example` to `.env`. The default database is local SQLite for a zero-configuration development run; use a PostgreSQL `DATABASE_URL` in deployed environments.
4. Start the API: `uvicorn app.main:app --reload`.

Administrator accounts are never created with a known default password. Create one explicitly (the password is prompted and only a bcrypt hash is stored):

```bash
python scripts/create_admin.py --email admin@example.com --name "Hospital Administrator"
```

If no administrator exists, production startup also supports a one-time seed via
`INITIAL_ADMIN_EMAIL` and `INITIAL_ADMIN_PASSWORD`; use a secret manager for the
password and remove those variables after provisioning. Production refuses to
start without an administrator or explicit seed credentials.

The frontend expects the API at `http://localhost:8000/api/v1` by default.

## Production notes

Use PostgreSQL, a secret-manager supplied `JWT_SECRET`, HTTPS at the reverse proxy, an explicit production `CORS_ORIGINS` allow-list, and a managed backup policy. The current schema bootstrap is suitable for a new installation; introduce a migration tool such as Alembic before applying schema changes to an established production database.
