from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session

from app.core.security import create_access_token, verify_password
from app.database import get_db
from app.dependencies import get_current_admin
from app.models import AuditLog, User
from app.schemas import AdminUser, LoginRequest, LoginResponse

router = APIRouter(prefix="/auth", tags=["authentication"])


@router.post("/login", response_model=LoginResponse)
def login(payload: LoginRequest, request: Request, db: Annotated[Session, Depends(get_db)]) -> LoginResponse:
    if payload.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="This endpoint only supports administrator login.")

    user = db.query(User).filter(User.email == payload.email.lower()).first()
    if user is None or not user.is_active or user.role != "admin" or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password.")

    db.add(AuditLog(actor_id=user.id, action="auth.login", detail=f"Administrator login from {request.client.host if request.client else 'unknown'}"))
    db.commit()
    return LoginResponse(access_token=create_access_token(user.id, user.role), user=AdminUser.model_validate(user))


@router.get("/me", response_model=AdminUser)
def current_user(user: Annotated[User, Depends(get_current_admin)]) -> AdminUser:
    return AdminUser.model_validate(user)
