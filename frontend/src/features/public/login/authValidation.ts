import { siteContent } from "@/config/siteContent";
import type { UserRole } from "@/types";

export type LoginFormValues = { role: UserRole; identifier: string; password: string };
export type RegisterFormValues = { fullName: string; email: string; phone: string; password: string; confirmPassword: string };

type LoginErrors = Partial<Record<keyof LoginFormValues, string>>;
type RegisterErrors = Partial<Record<keyof RegisterFormValues, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[0-9][0-9\s-]{7,}$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

function passwordError(password: string) {
  return passwordPattern.test(password) ? undefined : siteContent.validation.password;
}

export function validateLogin(values: LoginFormValues): LoginErrors {
  const errors: LoginErrors = {};
  const identifier = values.identifier.trim();

  if (!identifier) {
    errors.identifier = siteContent.validation.required(siteContent.login.roles[values.role].identifierLabel);
  } else if ((values.role === "doctor" || values.role === "admin") && !emailPattern.test(identifier)) {
    errors.identifier = siteContent.validation.email;
  } else if (values.role === "patient" && !emailPattern.test(identifier) && !phonePattern.test(identifier)) {
    errors.identifier = siteContent.validation.loginIdentifier;
  }

  // Authentication must accept every password shape the API accepts. Password
  // complexity belongs to account creation/reset; enforcing it here can stop a
  // legitimate existing account from ever sending a login request.
  if (!values.password) {
    errors.password = siteContent.validation.required(siteContent.login.password);
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  return errors;
}

export function validateRegistration(values: RegisterFormValues): RegisterErrors {
  const errors: RegisterErrors = {};
  const fullName = values.fullName.trim();
  const email = values.email.trim();
  const phone = values.phone.trim();

  if (!fullName) errors.fullName = siteContent.validation.required(siteContent.register.fullName);
  else if (fullName.length < 2) errors.fullName = siteContent.validation.fullName;

  if (!email) errors.email = siteContent.validation.required(siteContent.register.email);
  else if (!emailPattern.test(email)) errors.email = siteContent.validation.email;

  if (!phone) errors.phone = siteContent.validation.required(siteContent.register.phone);
  else if (!phonePattern.test(phone)) errors.phone = siteContent.validation.phone;

  if (!values.password) errors.password = siteContent.validation.required(siteContent.register.password);
  else errors.password = passwordError(values.password);

  if (!values.confirmPassword) errors.confirmPassword = siteContent.validation.required(siteContent.register.confirmation);
  else if (values.confirmPassword !== values.password) errors.confirmPassword = siteContent.validation.passwordMatch;

  return errors;
}
