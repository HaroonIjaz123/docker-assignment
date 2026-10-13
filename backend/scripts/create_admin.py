"""Create or rotate a CityHospital administrator account.

Usage (from backend):
    python scripts/create_admin.py --email admin@example.com --name "Hospital Admin"

The password is always prompted interactively unless ADMIN_PASSWORD is supplied
by a protected deployment secret. It is never printed or stored in source code.
"""

from __future__ import annotations

import argparse
import getpass
import os
import sys
from pathlib import Path

# Allow running this file directly from the backend directory.
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from sqlalchemy import select

from app.database import Base, SessionLocal, engine
from app.models import AuditLog, User
from app.core.security import hash_password


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Provision a CityHospital administrator")
    parser.add_argument("--email", required=True, help="Administrator email address")
    parser.add_argument("--name", required=True, help="Administrator display name")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    email = args.email.strip().lower()
    if "@" not in email:
        raise SystemExit("A valid administrator email is required.")
    password = os.getenv("ADMIN_PASSWORD") or getpass.getpass("New administrator password (12+ characters): ")
    if len(password) < 12:
        raise SystemExit("Administrator passwords must be at least 12 characters long.")

    Base.metadata.create_all(bind=engine)
    with SessionLocal.begin() as db:
        user = db.scalar(select(User).where(User.email == email))
        if user is None:
            user = User(email=email, full_name=args.name.strip(), role="admin", password_hash=hash_password(password), is_active=True)
            db.add(user)
            db.flush()
            action = "admin.created"
        else:
            user.full_name = args.name.strip()
            user.role = "admin"
            user.password_hash = hash_password(password)
            user.is_active = True
            action = "admin.password_rotated"
        db.flush()
        db.add(AuditLog(actor_id=user.id, action=action, detail="Administrator provisioned through the management CLI."))
    print(f"Administrator ready: {email}")


if __name__ == "__main__":
    main()
