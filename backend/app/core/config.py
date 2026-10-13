from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    database_url: str = "sqlite:///./cityhospital.db"
    jwt_secret: str = "development-only-secret-change-before-deployment"
    jwt_expire_minutes: int = 60
    cors_origins: str = "http://localhost:5173"
    environment: str = "development"
    # Initial account provisioning is opt-in. Never ship a known password.
    initial_admin_email: str | None = None
    initial_admin_password: str | None = None

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
