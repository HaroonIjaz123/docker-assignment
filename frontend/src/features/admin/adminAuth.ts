// Use the Vite same-origin proxy in development. This works whether the UI is
// opened as localhost, 127.0.0.1, or a LAN hostname. Deployments can override
// it with VITE_API_BASE_URL when the API has a separate public origin.
const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL ?? "/api/v1").replace(/\/$/, "");
const storageKey = "cityhospital.admin.session";

export type AdminSession = { accessToken: string; user: { id: string; email: string; full_name: string; role: "admin" } };
type ApiError = { detail?: string };

export async function loginAdmin(email: string, password: string): Promise<AdminSession> {
  let response: Response;
  try {
    response = await fetch(`${apiBaseUrl}/auth/login`, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ email: email.trim().toLowerCase(), password, role: "admin" }) });
  } catch { throw new Error(`Unable to reach the sign-in service at ${apiBaseUrl}. Confirm the backend is running and try again.`); }
  const body = await response.json().catch(() => ({} as ApiError));
  if (!response.ok) throw new Error((body as ApiError).detail ?? "Unable to sign in.");
  if (!body.access_token || !body.user) throw new Error("The sign-in service returned an invalid response.");
  const session = { accessToken: body.access_token, user: body.user } as AdminSession;
  sessionStorage.setItem(storageKey, JSON.stringify(session));
  return session;
}

export function getAdminSession(): AdminSession | null {
  const value = sessionStorage.getItem(storageKey);
  if (!value) return null;
  try { return JSON.parse(value) as AdminSession; } catch { sessionStorage.removeItem(storageKey); return null; }
}

export function clearAdminSession() { sessionStorage.removeItem(storageKey); }

export async function adminRequest<T>(path: string, token: string, options: RequestInit = {}): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${apiBaseUrl}${path}`, {
      ...options,
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json", ...(options.body ? { "Content-Type": "application/json" } : {}), ...options.headers },
    });
  }
  catch { throw new Error("Unable to reach the administration service. Please try again."); }
  if (!response.ok) {
    const body = await response.json().catch(() => ({} as ApiError));
    if (response.status === 401 || response.status === 403) throw new Error("Your session has expired. Please sign in again.");
    throw new Error((body as ApiError).detail ?? "The request could not be completed.");
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}
