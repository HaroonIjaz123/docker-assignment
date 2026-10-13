from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_admin
from app.core.security import hash_password
from app.models import AuditLog, Department, HospitalSetting, Permission, Role, RolePermission, User
from app.schemas import (
    AdminDashboard, AdminUser, AuditItem, AuditList, DepartmentInput, DepartmentItem,
    ManagedUser, Pagination, PasswordReset, PermissionItem, RoleCreate, RoleItem,
    RoleUpdate, SettingsPayload, SettingsResponse, UserCreate, UserList, UserUpdate,
)

router = APIRouter(prefix="/admin", tags=["administration"])


def audit(db: Session, actor_id: str, action: str, detail: str) -> None:
    db.add(AuditLog(actor_id=actor_id, action=action, detail=detail))


def paginate(page: int, page_size: int, total: int) -> Pagination:
    return Pagination(total=total, page=page, page_size=page_size)


def get_role(db: Session, key: str) -> Role:
    role = db.scalar(select(Role).where(Role.key == key))
    if role is None:
        raise HTTPException(status_code=422, detail="Select a valid role.")
    return role


def role_item(db: Session, role: Role) -> RoleItem:
    permissions = db.scalars(
        select(Permission.code).join(RolePermission, RolePermission.permission_id == Permission.id).where(RolePermission.role_id == role.id).order_by(Permission.code)
    ).all()
    return RoleItem(id=role.id, key=role.key, name=role.name, description=role.description, is_system=role.is_system, permissions=list(permissions))


def replace_permissions(db: Session, role: Role, codes: list[str]) -> None:
    requested = sorted(set(codes))
    permissions = db.scalars(select(Permission).where(Permission.code.in_(requested))).all() if requested else []
    if len(permissions) != len(requested):
        raise HTTPException(status_code=422, detail="One or more selected permissions are invalid.")
    db.query(RolePermission).filter(RolePermission.role_id == role.id).delete(synchronize_session=False)
    for permission in permissions:
        db.add(RolePermission(role_id=role.id, permission_id=permission.id))


@router.get("/dashboard", response_model=AdminDashboard)
def dashboard(
    user: Annotated[User, Depends(get_current_admin)],
    db: Annotated[Session, Depends(get_db)],
) -> AdminDashboard:
    total_users = db.scalar(select(func.count()).select_from(User)) or 0
    active_administrators = db.scalar(select(func.count()).select_from(User).where(User.role == "admin", User.is_active.is_(True))) or 0
    activities = db.scalars(select(AuditLog).order_by(AuditLog.created_at.desc()).limit(8)).all()
    return AdminDashboard(
        welcome_name=user.full_name,
        total_users=total_users,
        active_administrators=active_administrators,
        recent_activity=[AuditItem.model_validate(activity) for activity in activities],
    )


@router.get("/users", response_model=UserList)
def list_users(
    _: Annotated[User, Depends(get_current_admin)], db: Annotated[Session, Depends(get_db)],
    page: int = Query(1, ge=1), page_size: int = Query(20, ge=1, le=100), search: str = Query("", max_length=160),
) -> UserList:
    query = select(User)
    if search.strip():
        term = f"%{search.strip()}%"
        query = query.where(or_(User.full_name.ilike(term), User.email.ilike(term), User.role.ilike(term)))
    total = db.scalar(select(func.count()).select_from(query.subquery())) or 0
    users = db.scalars(query.order_by(User.created_at.desc()).offset((page - 1) * page_size).limit(page_size)).all()
    return UserList(items=[ManagedUser.model_validate(item) for item in users], pagination=paginate(page, page_size, total))


@router.post("/users", response_model=ManagedUser, status_code=status.HTTP_201_CREATED)
def create_user(payload: UserCreate, actor: Annotated[User, Depends(get_current_admin)], db: Annotated[Session, Depends(get_db)]) -> ManagedUser:
    email = str(payload.email).lower()
    if db.scalar(select(User).where(User.email == email)):
        raise HTTPException(status_code=409, detail="A user with this email already exists.")
    get_role(db, payload.role)
    user = User(email=email, full_name=payload.full_name.strip(), role=payload.role, password_hash=hash_password(payload.password), is_active=payload.is_active)
    db.add(user)
    db.flush()
    audit(db, actor.id, "admin.user.created", f"Created {user.role} account for {user.email}.")
    db.commit()
    db.refresh(user)
    return ManagedUser.model_validate(user)


@router.put("/users/{user_id}", response_model=ManagedUser)
def update_user(user_id: str, payload: UserUpdate, actor: Annotated[User, Depends(get_current_admin)], db: Annotated[Session, Depends(get_db)]) -> ManagedUser:
    target = db.get(User, user_id)
    if target is None:
        raise HTTPException(status_code=404, detail="User not found.")
    get_role(db, payload.role)
    if target.id == actor.id and (not payload.is_active or payload.role != "admin"):
        raise HTTPException(status_code=422, detail="You cannot remove your own administrator access.")
    if target.role == "admin" and target.is_active and (not payload.is_active or payload.role != "admin"):
        active_admins = db.scalar(select(func.count()).select_from(User).where(User.role == "admin", User.is_active.is_(True))) or 0
        if active_admins <= 1:
            raise HTTPException(status_code=422, detail="At least one active administrator is required.")
    target.full_name, target.role, target.is_active = payload.full_name.strip(), payload.role, payload.is_active
    audit(db, actor.id, "admin.user.updated", f"Updated account for {target.email}.")
    db.commit()
    db.refresh(target)
    return ManagedUser.model_validate(target)


@router.post("/users/{user_id}/reset-password", status_code=status.HTTP_204_NO_CONTENT)
def reset_password(user_id: str, payload: PasswordReset, actor: Annotated[User, Depends(get_current_admin)], db: Annotated[Session, Depends(get_db)]) -> None:
    target = db.get(User, user_id)
    if target is None:
        raise HTTPException(status_code=404, detail="User not found.")
    target.password_hash = hash_password(payload.password)
    audit(db, actor.id, "admin.user.password_reset", f"Reset password for {target.email}.")
    db.commit()


@router.get("/permissions", response_model=list[PermissionItem])
def list_permissions(_: Annotated[User, Depends(get_current_admin)], db: Annotated[Session, Depends(get_db)]) -> list[PermissionItem]:
    return [PermissionItem.model_validate(item) for item in db.scalars(select(Permission).order_by(Permission.group, Permission.name)).all()]


@router.get("/roles", response_model=list[RoleItem])
def list_roles(_: Annotated[User, Depends(get_current_admin)], db: Annotated[Session, Depends(get_db)]) -> list[RoleItem]:
    return [role_item(db, role) for role in db.scalars(select(Role).order_by(Role.name)).all()]


@router.post("/roles", response_model=RoleItem, status_code=status.HTTP_201_CREATED)
def create_role(payload: RoleCreate, actor: Annotated[User, Depends(get_current_admin)], db: Annotated[Session, Depends(get_db)]) -> RoleItem:
    if db.scalar(select(Role).where(Role.key == payload.key)):
        raise HTTPException(status_code=409, detail="A role with this key already exists.")
    role = Role(key=payload.key, name=payload.name.strip(), description=payload.description.strip() if payload.description else None)
    db.add(role)
    db.flush()
    replace_permissions(db, role, payload.permissions)
    audit(db, actor.id, "admin.role.created", f"Created role {role.key}.")
    db.commit()
    return role_item(db, role)


@router.put("/roles/{role_id}", response_model=RoleItem)
def update_role(role_id: str, payload: RoleUpdate, actor: Annotated[User, Depends(get_current_admin)], db: Annotated[Session, Depends(get_db)]) -> RoleItem:
    role = db.get(Role, role_id)
    if role is None:
        raise HTTPException(status_code=404, detail="Role not found.")
    role.name, role.description = payload.name.strip(), payload.description.strip() if payload.description else None
    replace_permissions(db, role, payload.permissions)
    audit(db, actor.id, "admin.role.updated", f"Updated role {role.key}.")
    db.commit()
    return role_item(db, role)


@router.get("/departments", response_model=list[DepartmentItem])
def list_departments(_: Annotated[User, Depends(get_current_admin)], db: Annotated[Session, Depends(get_db)]) -> list[DepartmentItem]:
    return [DepartmentItem.model_validate(item) for item in db.scalars(select(Department).order_by(Department.name)).all()]


@router.post("/departments", response_model=DepartmentItem, status_code=status.HTTP_201_CREATED)
def create_department(payload: DepartmentInput, actor: Annotated[User, Depends(get_current_admin)], db: Annotated[Session, Depends(get_db)]) -> DepartmentItem:
    if db.scalar(select(Department).where(or_(Department.name == payload.name.strip(), Department.code == payload.code))):
        raise HTTPException(status_code=409, detail="A department with this name or code already exists.")
    department_data = payload.model_dump()
    department_data["name"] = payload.name.strip()
    department_data["description"] = payload.description.strip() if payload.description else None
    department = Department(**department_data)
    db.add(department)
    db.flush()
    audit(db, actor.id, "admin.department.created", f"Created department {department.name} ({department.code}).")
    db.commit()
    db.refresh(department)
    return DepartmentItem.model_validate(department)


@router.put("/departments/{department_id}", response_model=DepartmentItem)
def update_department(department_id: str, payload: DepartmentInput, actor: Annotated[User, Depends(get_current_admin)], db: Annotated[Session, Depends(get_db)]) -> DepartmentItem:
    department = db.get(Department, department_id)
    if department is None:
        raise HTTPException(status_code=404, detail="Department not found.")
    duplicate = db.scalar(select(Department).where(Department.id != department_id, or_(Department.name == payload.name.strip(), Department.code == payload.code)))
    if duplicate:
        raise HTTPException(status_code=409, detail="A department with this name or code already exists.")
    for key, value in payload.model_dump().items():
        setattr(department, key, value.strip() if isinstance(value, str) else value)
    audit(db, actor.id, "admin.department.updated", f"Updated department {department.name} ({department.code}).")
    db.commit()
    db.refresh(department)
    return DepartmentItem.model_validate(department)


DEFAULT_SETTINGS = {"name": "CityHospital", "phone": "+92 300 0000000", "email": "info@cityhospital.example", "emergency_phone": "+92 300 0000001", "address_line1": "123 Hospital Road", "city": "Lahore", "country": "Pakistan", "reception_hours": "8:00 AM – 10:00 PM, every day"}


@router.get("/settings", response_model=SettingsResponse)
def get_settings(_: Annotated[User, Depends(get_current_admin)], db: Annotated[Session, Depends(get_db)]) -> SettingsResponse:
    setting = db.get(HospitalSetting, "profile")
    return SettingsResponse(**(setting.value if setting else DEFAULT_SETTINGS), updated_at=setting.updated_at if setting else None)


@router.put("/settings", response_model=SettingsResponse)
def update_settings(payload: SettingsPayload, actor: Annotated[User, Depends(get_current_admin)], db: Annotated[Session, Depends(get_db)]) -> SettingsResponse:
    setting = db.get(HospitalSetting, "profile")
    if setting is None:
        setting = HospitalSetting(key="profile", value=payload.model_dump(mode="json"), updated_by=actor.id)
        db.add(setting)
    else:
        setting.value, setting.updated_by = payload.model_dump(mode="json"), actor.id
    audit(db, actor.id, "admin.settings.updated", "Updated hospital profile settings.")
    db.commit()
    db.refresh(setting)
    return SettingsResponse(**setting.value, updated_at=setting.updated_at)


@router.get("/audit-logs", response_model=AuditList)
def list_audit_logs(
    _: Annotated[User, Depends(get_current_admin)], db: Annotated[Session, Depends(get_db)],
    page: int = Query(1, ge=1), page_size: int = Query(30, ge=1, le=100), action: str = Query("", max_length=120),
) -> AuditList:
    query = select(AuditLog)
    if action.strip():
        query = query.where(AuditLog.action.ilike(f"%{action.strip()}%"))
    total = db.scalar(select(func.count()).select_from(query.subquery())) or 0
    logs = db.scalars(query.order_by(AuditLog.created_at.desc()).offset((page - 1) * page_size).limit(page_size)).all()
    return AuditList(items=[AuditItem.model_validate(item) for item in logs], pagination=paginate(page, page_size, total))
