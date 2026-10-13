import { FormEvent, useState } from "react";
import { Eye, EyeOff, CheckCircle2, CircleAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { hospitalConfig } from "@/config/hospital.config";
import { routes, siteContent } from "@/config/siteContent";
import { validateRegistration, type RegisterFormValues } from "./authValidation";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";

export default function RegisterPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [form, setForm] = useState<RegisterFormValues>({ fullName: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [touched, setTouched] = useState<Record<keyof RegisterFormValues, boolean>>({ fullName: false, email: false, phone: false, password: false, confirmPassword: false });
  const errors = validateRegistration(form);

  const fieldState = (field: keyof RegisterFormValues) => ({
    error: touched[field] ? errors[field] : undefined,
    valid: touched[field] && !errors[field] && form[field].trim().length > 0,
  });

  function updateField(field: keyof RegisterFormValues, value: string) {
    setForm({ ...form, [field]: value });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({ fullName: true, email: true, phone: true, password: true, confirmPassword: true });
    if (Object.keys(errors).length) return;
    // TODO: replace with POST to backend patient registration API once available.
  }

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <Link to={routes.home} className="flex items-center justify-center gap-2.5 mb-8">
          <ResponsiveImage src={hospitalConfig.logo.src} alt={hospitalConfig.logo.alt} fit="contain" className="image-frame--logo" />
          <span className="font-display text-xl text-primary">{hospitalConfig.name}</span>
        </Link>

        <div className="bg-white border border-hairline rounded-lg p-8">
          <h1 className="font-display text-2xl text-primary text-center">{siteContent.register.title}</h1>
          <p className="text-sm text-gray-600 text-center mt-1">{siteContent.register.subtitle}</p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
            <TextField id="fullName" label={siteContent.register.fullName} type="text" placeholder={siteContent.register.fullNamePlaceholder} value={form.fullName} onChange={(value) => updateField("fullName", value)} onBlur={() => setTouched({ ...touched, fullName: true })} {...fieldState("fullName")} />
            <TextField id="email" label={siteContent.register.email} type="email" placeholder={siteContent.register.emailPlaceholder} value={form.email} onChange={(value) => updateField("email", value)} onBlur={() => setTouched({ ...touched, email: true })} {...fieldState("email")} />
            <TextField id="phone" label={siteContent.register.phone} type="tel" placeholder={siteContent.register.phonePlaceholder} value={form.phone} onChange={(value) => updateField("phone", value)} onBlur={() => setTouched({ ...touched, phone: true })} {...fieldState("phone")} />
            <PasswordField
              id="newPassword"
              label={siteContent.register.password}
              isVisible={isPasswordVisible}
              onToggle={() => setIsPasswordVisible(!isPasswordVisible)}
              value={form.password}
              onChange={(value) => updateField("password", value)}
              onBlur={() => setTouched({ ...touched, password: true })}
              {...fieldState("password")}
            />
            <PasswordField
              id="confirmPassword"
              label={siteContent.register.confirmation}
              isVisible={isConfirmationVisible}
              onToggle={() => setIsConfirmationVisible(!isConfirmationVisible)}
              value={form.confirmPassword}
              onChange={(value) => updateField("confirmPassword", value)}
              onBlur={() => setTouched({ ...touched, confirmPassword: true })}
              {...fieldState("confirmPassword")}
            />
            <button type="submit" className="w-full py-2.5 rounded bg-accent text-white text-[15px] font-medium hover:bg-accent-hover transition-colors">
              {siteContent.register.submit}
            </button>
          </form>

          <p className="text-sm text-gray-600 text-center mt-6">
            {siteContent.register.existingAccount}{" "}<Link to={routes.login} className="text-primary hover:underline">{siteContent.register.login}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function TextField({ id, label, type, placeholder, value, onChange, onBlur, error, valid }: { id: string; label: string; type: string; placeholder: string; value: string; onChange: (value: string) => void; onBlur: () => void; error?: string; valid?: boolean }) {
  return <div>
    <label htmlFor={id} className="text-sm text-gray-700">{label}</label>
    <input id={id} type={type} required className={inputClass(error, valid)} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} onBlur={onBlur} aria-invalid={Boolean(error)} aria-describedby={`${id}-feedback`} />
    <Feedback id={`${id}-feedback`} error={error} valid={valid} />
  </div>;
}

function PasswordField({ id, label, isVisible, onToggle, value, onChange, onBlur, error, valid }: { id: string; label: string; isVisible: boolean; onToggle: () => void; value: string; onChange: (value: string) => void; onBlur: () => void; error?: string; valid?: boolean }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm text-gray-700">{label}</label>
      <div className="relative mt-1">
        <input id={id} type={isVisible ? "text" : "password"} required className={inputClass(error, valid, true)} placeholder={siteContent.register.passwordPlaceholder} value={value} onChange={(e) => onChange(e.target.value)} onBlur={onBlur} aria-invalid={Boolean(error)} aria-describedby={`${id}-feedback`} />
        <button
          type="button"
          onClick={onToggle}
          className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-gray-500 hover:text-primary"
          aria-label={isVisible ? siteContent.register.hideField(label) : siteContent.register.showField(label)}
          aria-pressed={isVisible}
        >
          {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      <Feedback id={`${id}-feedback`} error={error} valid={valid} />
    </div>
  );
}

function inputClass(error?: string, valid?: boolean, hasButton = false) {
  return `mt-1 w-full rounded border px-3 py-2 bg-white ${error ? "border-red-600" : valid ? "border-accent" : "border-hairline"} ${hasButton ? "pr-11" : ""}`;
}

function Feedback({ id, error, valid }: { id: string; error?: string; valid?: boolean }) {
  if (!error && !valid) return null;
  return <p id={id} className={`mt-1 flex items-center gap-1 text-xs ${error ? "text-red-600" : "text-accent"}`} aria-live="polite">{error ? <CircleAlert size={14} /> : <CheckCircle2 size={14} />}{error ?? siteContent.validation.valid}</p>;
}
