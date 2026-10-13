export interface Department {
  id: string;
  name: string;
  description: string;
  icon: "cardiology" | "pediatrics" | "orthopedics" | "laboratory" | "radiology" | "emergency";
  services?: string[];
  availability?: string;
}

export interface Doctor {
  id: string;
  name: string;
  department: string;
  /** Optional URL from the future doctor-directory API. */
  imageUrl?: string;
  title?: string;
  specialties?: string[];
  languages?: string[];
}

export interface AppointmentRequest {
  fullName: string;
  phone: string;
  departmentId: string;
}

export interface ContactInquiry {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export type UserRole = "patient" | "doctor" | "staff" | "admin";

export interface LoginCredentials {
  role: UserRole;
  identifier: string; // email, phone, or staff ID depending on role
  password: string;
}
