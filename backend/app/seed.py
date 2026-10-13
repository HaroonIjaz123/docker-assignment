from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.core.security import hash_password
from app.models import AuditLog, Permission, Role, RolePermission, User


DEFAULT_PERMISSIONS = (
    ("admin.dashboard.read", "View administration dashboard", "Administration", "View administrative operational summaries."),
    ("admin.users.manage", "Manage users", "Administration", "Create, edit, activate, and reset staff accounts."),
    ("admin.roles.manage", "Manage roles and permissions", "Administration", "Configure role-based access grants."),
    ("admin.departments.manage", "Manage departments", "Master data", "Maintain hospital departments."),
    ("admin.settings.manage", "Manage hospital settings", "Configuration", "Maintain hospital contact and operating information."),
    ("admin.audit.read", "View audit log", "Oversight", "Review traceable administrative events."),
)


def seed_administration_data(db: Session) -> None:
    """Install idempotent, non-secret administrative reference data."""
    permissions: dict[str, Permission] = {}
    for code, name, group, description in DEFAULT_PERMISSIONS:
        permission = db.scalar(select(Permission).where(Permission.code == code))
        if permission is None:
            permission = Permission(code=code, name=name, group=group, description=description)
            db.add(permission)
            db.flush()
        permissions[code] = permission

    admin_role = db.scalar(select(Role).where(Role.key == "admin"))
    if admin_role is None:
        admin_role = Role(key="admin", name="Administrator", description="Full administration access.", is_system=True)
        db.add(admin_role)
        db.flush()
    existing = set(db.scalars(select(RolePermission.permission_id).where(RolePermission.role_id == admin_role.id)).all())
    for permission in permissions.values():
        if permission.id not in existing:
            db.add(RolePermission(role_id=admin_role.id, permission_id=permission.id))
    db.commit()


def seed_initial_admin(db: Session) -> None:
    settings = get_settings()
    existing_admin = db.scalar(select(User).where(User.role == "admin"))
    if existing_admin:
        return

    if not settings.initial_admin_email or not settings.initial_admin_password:
        if settings.environment.lower() == "production":
            raise RuntimeError("No administrator exists. Set INITIAL_ADMIN_EMAIL and INITIAL_ADMIN_PASSWORD, or run scripts/create_admin.py.")
        # Local development can start without an administrator; provision one
        # explicitly with scripts/create_admin.py instead of using a known default.
        return

    admin = User(
        email=settings.initial_admin_email.lower(),
        full_name="System Administrator",
        role="admin",
        password_hash=hash_password(settings.initial_admin_password),
    )
    db.add(admin)
    db.flush()
    db.add(AuditLog(actor_id=admin.id, action="admin.seeded", detail="Initial administrator account created."))
    db.commit()
