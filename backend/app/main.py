from contextlib import asynccontextmanager

from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware

from app.api import admin, auth
from app.core.config import get_settings
from app.database import Base, SessionLocal, engine
from app.seed import seed_administration_data, seed_initial_admin


@asynccontextmanager
async def lifespan(_: FastAPI):
    if settings.environment.lower() == "production" and (
        not settings.jwt_secret or settings.jwt_secret == "development-only-secret-change-before-deployment"
    ):
        raise RuntimeError("Set a unique JWT_SECRET before starting in production.")
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        seed_administration_data(db)
        seed_initial_admin(db)
    yield


settings = get_settings()
app = FastAPI(title="CityHospital API", version="0.1.0", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth.router, prefix="/api/v1")
app.include_router(admin.router, prefix="/api/v1")


@app.get("/", include_in_schema=False)
def root() -> dict[str, str]:
    """Provide a useful response when the API host is opened in a browser."""
    return {
        "service": "CityHospital API",
        "status": "ok",
        "docs": "/docs",
        "health": "/health",
        "api_base": "/api/v1",
    }


@app.get("/favicon.ico", include_in_schema=False)
def favicon() -> Response:
    # The frontend owns the branded favicon. Return an empty successful response
    # for direct API-host browser requests instead of logging a noisy 404.
    return Response(status_code=204)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
