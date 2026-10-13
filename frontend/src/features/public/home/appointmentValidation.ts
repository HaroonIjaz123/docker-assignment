import { siteContent } from "@/config/siteContent";
import type { AppointmentRequest } from "@/types";

export type AppointmentErrors = Partial<Record<keyof AppointmentRequest, string>>;

const phonePattern = /^\+?[0-9][0-9\s-]{7,}$/;

export function validateAppointment(values: AppointmentRequest): AppointmentErrors {
  const errors: AppointmentErrors = {};
  const fullName = values.fullName.trim();
  const phone = values.phone.trim();

  if (!fullName) errors.fullName = siteContent.validation.required(siteContent.home.appointment.fullName);
  else if (fullName.length < 2) errors.fullName = siteContent.validation.fullName;

  if (!phone) errors.phone = siteContent.validation.required(siteContent.home.appointment.phone);
  else if (!phonePattern.test(phone)) errors.phone = siteContent.validation.phone;

  if (!values.departmentId) errors.departmentId = siteContent.validation.appointmentDepartment;

  return errors;
}
