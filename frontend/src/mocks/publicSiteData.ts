import type { Department, Doctor } from "@/types";

export const departments: Department[] = [
  {
    id: "cardiology",
    name: "Cardiology",
    description: "Diagnosis and treatment of heart and vascular conditions.",
    icon: "cardiology",
    services: ["Cardiac consultations", "ECG & echocardiography", "Heart failure care"],
    availability: "Consultations Monday–Saturday",
  },
  {
    id: "pediatrics",
    name: "Pediatrics",
    description: "Care for infants, children, and adolescents.",
    icon: "pediatrics",
    services: ["Well-child visits", "Childhood illness", "Growth monitoring"],
    availability: "Daily outpatient clinics",
  },
  {
    id: "orthopedics",
    name: "Orthopedics",
    description: "Bone, joint, and musculoskeletal treatment.",
    icon: "orthopedics",
    services: ["Fracture care", "Joint conditions", "Sports injuries"],
    availability: "Consultations Monday–Saturday",
  },
  {
    id: "laboratory",
    name: "Laboratory",
    description: "Diagnostic testing with fast, verified reporting.",
    icon: "laboratory",
    services: ["Blood testing", "Microbiology", "Health screening"],
    availability: "Open 24 hours",
  },
  {
    id: "radiology",
    name: "Radiology",
    description: "Imaging services including X-ray, CT, and ultrasound.",
    icon: "radiology",
    services: ["Digital X-ray", "Ultrasound", "CT & MRI coordination"],
    availability: "Imaging available daily",
  },
  {
    id: "emergency",
    name: "Emergency Care",
    description: "Round-the-clock trauma and emergency response.",
    icon: "emergency",
    services: ["Trauma response", "Acute illness", "Emergency stabilization"],
    availability: "Open 24 hours, every day",
  },
];

export const doctors: Doctor[] = [
  {
    id: "d1",
    name: "Dr. Amina Raza",
    department: "Cardiology",
    imageUrl: "/images/doctors/images.jpeg",
    title: "Consultant Cardiologist",
    specialties: ["Preventive cardiology", "Hypertension"],
    languages: ["English", "Urdu"],
  },
  {
    id: "d2",
    name: "Dr. Bilal Khan",
    department: "Orthopedics",
    imageUrl: "/images/doctors/image3.jpeg",
    title: "Consultant Orthopedic Surgeon",
    specialties: ["Joint care", "Sports injuries"],
    languages: ["English", "Urdu", "Punjabi"],
  },
  {
    id: "d3",
    name: "Dr. Sana Malik",
    department: "Pediatrics",
    imageUrl: "/images/doctors/img2.jpeg",
    title: "Consultant Pediatrician",
    specialties: ["General pediatrics", "Newborn care"],
    languages: ["English", "Urdu"],
  },
  {
    id: "d4",
    name: "Dr. Usman Tariq",
    department: "General Medicine",
    imageUrl: "/images/doctors/images4.jpeg",
    title: "Consultant Physician",
    specialties: ["Chronic disease", "Adult medicine"],
    languages: ["English", "Urdu"],
  },
];

export const additionalDepartments: Department[] = [
  { id: "general-medicine", name: "General Medicine", description: "Thoughtful diagnosis and ongoing care for adult health concerns.", icon: "cardiology", services: ["Adult consultations", "Diabetes care", "Long-term condition management"], availability: "Daily outpatient clinics" },
  { id: "general-surgery", name: "General Surgery", description: "Surgical assessment and care with clear guidance at every step.", icon: "orthopedics", services: ["Surgical consultations", "Minor procedures", "Post-operative care"], availability: "Planned and urgent referrals" },
  { id: "obstetrics", name: "Obstetrics & Gynecology", description: "Women’s health care from routine consultations to maternity support.", icon: "pediatrics", services: ["Women’s health", "Antenatal care", "Gynecology consultations"], availability: "Daily outpatient clinics" },
  { id: "dermatology", name: "Dermatology", description: "Assessment and treatment for common skin, hair, and nail conditions.", icon: "laboratory", services: ["Skin consultations", "Acne care", "Minor procedures"], availability: "By appointment" },
  { id: "ent", name: "Ear, Nose & Throat", description: "Specialist care for ear, nose, throat, and related conditions.", icon: "radiology", services: ["Hearing concerns", "Sinus care", "Throat conditions"], availability: "By appointment" },
  { id: "pharmacy", name: "Pharmacy", description: "Safe, convenient access to prescribed medicines and advice.", icon: "emergency", services: ["Prescription dispensing", "Medication advice", "Refill support"], availability: "Open daily" },
];

export const allDepartments = [...departments, ...additionalDepartments];

export const additionalDoctors: Doctor[] = [
  { id: "d5", name: "Dr. Hira Ahmed", department: "Cardiology", title: "Associate Cardiologist", specialties: ["Cardiac imaging", "Preventive care"], languages: ["English", "Urdu"] },
  { id: "d6", name: "Dr. Faraz Siddiqui", department: "General Medicine", title: "Consultant Physician", specialties: ["Diabetes care", "Internal medicine"], languages: ["English", "Urdu"] },
  { id: "d7", name: "Dr. Mariam Aziz", department: "Obstetrics & Gynecology", title: "Consultant Obstetrician & Gynecologist", specialties: ["Women’s health", "Antenatal care"], languages: ["English", "Urdu", "Punjabi"] },
  { id: "d8", name: "Dr. Hamza Iqbal", department: "General Surgery", title: "Consultant General Surgeon", specialties: ["Laparoscopic surgery", "General surgery"], languages: ["English", "Urdu"] },
  { id: "d9", name: "Dr. Nida Farooq", department: "Dermatology", title: "Consultant Dermatologist", specialties: ["Clinical dermatology", "Acne care"], languages: ["English", "Urdu"] },
  { id: "d10", name: "Dr. Saad Hasan", department: "Ear, Nose & Throat", title: "ENT Specialist", specialties: ["Sinus conditions", "Hearing care"], languages: ["English", "Urdu"] },
];

export const allDoctors = [...doctors, ...additionalDoctors];

/**
 * Single temporary source for public directory data. When the API is ready,
 * replace this export with an API-backed adapter; directory components do not
 * contain listing data or image paths.
 */
export const publicDirectoryData = {
  departments: allDepartments,
  doctors: allDoctors,
} as const;

export interface Leader {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl?: string;
}

export const leadership: Leader[] = [
  {
    id: "l1",
    name: "Dr. Farrukh Sheikh",
    role: "Chief Executive Officer",
    bio: "Two decades in hospital administration across Punjab and Sindh, with a focus on patient-first operations.",
    photoUrl: "/images/leadership/img1.jpeg",
  },
  {
    id: "l2",
    name: "Dr. Ayesha Noor",
    role: "Chief Medical Officer",
    bio: "Oversees clinical standards across all departments; previously led cardiology at a leading teaching hospital.",
    photoUrl: "/images/leadership/im2.jpeg",
  },
  {
    id: "l3",
    name: "Imran Qureshi",
    role: "Director of Nursing",
    bio: "Responsible for nursing staff training, ward standards, and patient care quality.",
    photoUrl: "/images/leadership/img3.jpeg",
  },
];

export interface Facility {
  id: string;
  name: string;
  description: string;
}

export const facilities: Facility[] = [
  { id: "f1", name: "24-bed ICU", description: "Fully monitored critical care with 1:2 nurse-to-patient ratio." },
  { id: "f2", name: "Modern imaging suite", description: "CT, MRI, ultrasound, and digital X-ray under one roof." },
  { id: "f3", name: "6 operation theatres", description: "Climate-controlled OTs with laminar airflow systems." },
  { id: "f4", name: "On-site pharmacy", description: "Round-the-clock dispensing, stocked from our own inventory." },
];

export interface Accreditation {
  id: string;
  name: string;
  year: string;
}

export const accreditations: Accreditation[] = [
  { id: "a1", name: "Punjab Healthcare Commission License", year: "Renewed 2026" },
  { id: "a2", name: "ISO 9001:2015 Quality Management", year: "Certified 2024" },
  { id: "a3", name: "National Accreditation Board for Hospitals", year: "Certified 2023" },
];

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  context: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "The nursing staff explained every step before my surgery. I never felt like just another patient.",
    author: "Rabia H.",
    context: "Orthopedic surgery patient",
  },
  {
    id: "t2",
    quote: "Emergency care got my father stabilized within minutes of arriving. I'm grateful for the team.",
    author: "Tariq M.",
    context: "Family member, Emergency",
  },
  {
    id: "t3",
    quote: "Clear communication from the pediatric team made a stressful week much easier to manage.",
    author: "Sana W.",
    context: "Parent, Pediatrics",
  },
];
