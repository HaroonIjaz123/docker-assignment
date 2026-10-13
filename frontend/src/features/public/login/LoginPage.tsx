import { useState, FormEvent, type InputHTMLAttributes } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { User, Stethoscope, Building2, ShieldCheck, Eye, EyeOff, CheckCircle2, CircleAlert } from "lucide-react";
import { hospitalConfig } from "@/config/hospital.config";
import type { UserRole, LoginCredentials } from "@/types";
import { routes, siteContent } from "@/config/siteContent";
import { validateLogin } from "./authValidation";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { loginAdmin } from "@/features/admin/adminAuth";

const roles: { id: UserRole; label: string; icon: typeof User; identifierLabel: string; identifierPlaceholder: string }[] = [
  { id: "patient", icon: User, ...siteContent.login.roles.patient },
  { id: "doctor", icon: Stethoscope, ...siteContent.login.roles.doctor },
  { id: "staff", icon: Building2, ...siteContent.login.roles.staff },
  { id: "admin", icon: ShieldCheck, ...siteContent.login.roles.admin },
];

export default function LoginPage() {
  const location = useLocation();
  const isAdminLogin = location.pathname === routes.adminLogin;
  const [role, setRole] = useState<UserRole>(isAdminLogin ? "admin" : "patient");
  const [form, setForm] = useState<LoginCredentials>({ role: isAdminLogin ? "admin" : "patient", identifier: "", password: "" });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [touched, setTouched] = useState({ identifier: false, password: false });
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const activeRole = roles.find((r) => r.id === role)!;
  const errors = validateLogin({ ...form, role });

  const fieldState = (field: "identifier" | "password") => ({
    error: touched[field] ? errors[field] : undefined,
    valid: touched[field] && !errors[field] && form[field].trim().length > 0,
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched({ identifier: true, password: true });
    if (Object.keys(errors).length) return;
    if (role === "admin") {
      setSubmitError("");
      setIsSubmitting(true);
      try { await loginAdmin(form.identifier, form.password); navigate(routes.adminDashboard); }
      catch (reason) { setSubmitError(reason instanceof Error ? reason.message : "Unable to sign in."); }
      finally { setIsSubmitting(false); }
      return;
    }
    // The current backend slice only exposes administrator authentication.
    // Keep this visible to the user instead of silently logging the submit
    // event to the browser console.
    setSubmitError("This sign-in is not available yet. Please use the Admin role.");
  }

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <Link to={routes.home} className="flex items-center justify-center gap-2.5 mb-8">
          <ResponsiveImage src={hospitalConfig.logo.src} alt={hospitalConfig.logo.alt} fit="contain" className="image-frame--logo" />
          <span className="font-display text-xl text-primary">{hospitalConfig.name}</span>
        </Link>

        <div className="bg-white border border-hairline rounded-lg p-8">
          <h1 className="font-display text-2xl text-primary text-center">{siteContent.login.title}</h1>
          <p className="text-sm text-gray-600 text-center mt-1">{siteContent.login.subtitle}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-6">
            {roles.map((r) => {
              const Icon = r.icon;
              const isActive = role === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => {
                    setRole(r.id);
                    setForm({ ...form, role: r.id, identifier: "" });
                    setTouched({ identifier: false, password: false });
                  }}
                  className={`flex flex-col items-center gap-1.5 py-3 rounded border text-sm transition-colors ${
                    isActive
                      ? "border-primary bg-primary text-white"
                      : "border-hairline text-gray-600 hover:border-primary hover:text-primary"
                  }`}
                >
                  <Icon size={18} strokeWidth={1.7} />
                  {r.label}
                </button>
              );
            })}
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="identifier" className="text-sm text-gray-700">
                {activeRole.identifierLabel}
              </label>
              <ValidatedInput
                id="identifier"
                type="text"
                required
                placeholder={activeRole.identifierPlaceholder}
                value={form.identifier}
                onChange={(e) => { setSubmitError(""); setForm({ ...form, identifier: e.target.value }); }}
                onBlur={() => setTouched({ ...touched, identifier: true })}
                error={fieldState("identifier").error}
                valid={fieldState("identifier").valid}
              />
            </div>
            <div>
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-sm text-gray-700">
                  {siteContent.login.password}
                </label>
                <a href={routes.forgotPassword} className="text-xs text-primary hover:underline">
                  {siteContent.login.forgotPassword}
                </a>
              </div>
              <div className="relative mt-1">
                <input
                  id="password"
                  type={isPasswordVisible ? "text" : "password"}
                  required
                  className={inputClass(fieldState("password").error, fieldState("password").valid, true)}
                  placeholder={siteContent.login.passwordPlaceholder}
                  value={form.password}
                  onChange={(e) => { setSubmitError(""); setForm({ ...form, password: e.target.value }); }}
                  onBlur={() => setTouched({ ...touched, password: true })}
                  aria-invalid={Boolean(fieldState("password").error)}
                  aria-describedby="password-feedback"
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-gray-500 hover:text-primary"
                  aria-label={isPasswordVisible ? siteContent.login.hidePassword : siteContent.login.showPassword}
                  aria-pressed={isPasswordVisible}
                >
                  {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <FieldFeedback id="password-feedback" error={fieldState("password").error} valid={fieldState("password").valid} />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded bg-accent text-white text-[15px] font-medium hover:bg-accent-hover transition-colors"
            >
              {isSubmitting ? "Signing in…" : siteContent.login.loginAs(activeRole.label)}
            </button>
            {submitError && <p className="text-sm text-red-600" role="alert">{submitError}</p>}
          </form>

          {role === "patient" && (
            <p className="text-sm text-gray-600 text-center mt-6">
              {siteContent.login.newHere}{" "}
              <a href={routes.register} className="text-primary hover:underline">
                {siteContent.login.createAccount}
              </a>
            </p>
          )}
        </div>

        <p className="text-xs text-gray-500 text-center mt-6">
          {siteContent.login.help(hospitalConfig.contact.phone)}
        </p>
      </div>
    </div>
  );
}

function inputClass(error?: string, valid?: boolean, hasButton = false) {
  return `mt-1 w-full rounded border px-3 py-2 bg-white ${hasButton ? "pr-11" : ""} ${error ? "border-red-600" : valid ? "border-accent" : "border-hairline"}`;
}

function ValidatedInput({ error, valid, ...props }: InputHTMLAttributes<HTMLInputElement> & { error?: string; valid?: boolean }) {
  const feedbackId = `${props.id}-feedback`;
  return (
    <>
      <input {...props} className={inputClass(error, valid)} aria-invalid={Boolean(error)} aria-describedby={feedbackId} />
      <FieldFeedback id={feedbackId} error={error} valid={valid} />
    </>
  );
}

function FieldFeedback({ id, error, valid }: { id: string; error?: string; valid?: boolean }) {
  if (!error && !valid) return null;
  return <p id={id} className={`mt-1 flex items-center gap-1 text-xs ${error ? "text-red-600" : "text-accent"}`} aria-live="polite">
    {error ? <CircleAlert size={14} /> : <CheckCircle2 size={14} />}{error ?? siteContent.validation.valid}
  </p>;
}
