import type { ContactInquiry } from "@/types";
import { siteContent } from "@/config/siteContent";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+\d][\d\s()-]{6,}$/;

export function validateContactInquiry(values: ContactInquiry): Partial<Record<keyof ContactInquiry, string>> {
  const errors: Partial<Record<keyof ContactInquiry, string>> = {};

  if (values.fullName.trim().length < 2) errors.fullName = siteContent.validation.fullName;
  if (!emailPattern.test(values.email.trim())) errors.email = siteContent.validation.email;
  if (!phonePattern.test(values.phone.trim())) errors.phone = siteContent.validation.phone;
  if (!values.subject) errors.subject = siteContent.validation.required(siteContent.contact.subject);
  if (values.message.trim().length < 10) errors.message = "Please enter a message of at least 10 characters.";

  return errors;
}
