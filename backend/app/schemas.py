from datetime import datetime

from pydantic import BaseModel, EmailStr, Field, field_validator


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    role: str = "admin"


class AdminUser(BaseModel):
    id: str
    email: EmailStr
    full_name: str
    role: str

    model_config = {"from_attributes": True}


class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: AdminUser


class AuditItem(BaseModel):
    action: str
    detail: str | None
    created_at: datetime

    model_config = {"from_attributes": True}


class AdminDashboard(BaseModel):
    welcome_name: str
    total_users: int
    active_administrators: int
    recent_activity: list[AuditItem]


class Pagination(BaseModel):
    total: int
    page: int
    page_size: int


class UserCreate(BaseModel):
    email: EmailStr
    full_name: str = Field(min_length=2, max_length=160)
    role: str = Field(min_length=2, max_length=40)
    password: str = Field(min_length=12, max_length=128)
    is_active: bool = True


class UserUpdate(BaseModel):
    full_name: str = Field(min_length=2, max_length=160)
    role: str = Field(min_length=2, max_length=40)
    is_active: bool


class PasswordReset(BaseModel):
    password: str = Field(min_length=12, max_length=128)


class ManagedUser(AdminUser):
    is_active: bool
    created_at: datetime


class UserList(BaseModel):
    items: list[ManagedUser]
    pagination: Pagination


class PermissionItem(BaseModel):
    code: str
    name: str
    group: str
    description: str | None

    model_config = {"from_attributes": True}


class RoleItem(BaseModel):
    id: str
    key: str
    name: str
    description: str | None
    is_system: bool
    permissions: list[str]


class RoleCreate(BaseModel):
    key: str = Field(min_length=2, max_length=40, pattern=r"^[a-z][a-z0-9_-]*$")
    name: str = Field(min_length=2, max_length=100)
    description: str | None = Field(default=None, max_length=2000)
    permissions: list[str] = Field(default_factory=list)


class RoleUpdate(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    description: str | None = Field(default=None, max_length=2000)
    permissions: list[str] = Field(default_factory=list)


class DepartmentInput(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    code: str = Field(min_length=2, max_length=20, pattern=r"^[A-Z0-9_-]+$")
    description: str | None = Field(default=None, max_length=2000)
    is_active: bool = True


class DepartmentItem(DepartmentInput):
    id: str
    created_at: datetime

    model_config = {"from_attributes": True}


class SettingsPayload(BaseModel):
    name: str = Field(min_length=2, max_length=160)
    phone: str = Field(min_length=7, max_length=40)
    email: EmailStr
    emergency_phone: str = Field(min_length=7, max_length=40)
    address_line1: str = Field(min_length=2, max_length=200)
    city: str = Field(min_length=2, max_length=100)
    country: str = Field(min_length=2, max_length=100)
    reception_hours: str = Field(min_length=2, max_length=120)


class SettingsResponse(SettingsPayload):
    updated_at: datetime | None = None


class AuditList(BaseModel):
    items: list[AuditItem]
    pagination: Pagination
