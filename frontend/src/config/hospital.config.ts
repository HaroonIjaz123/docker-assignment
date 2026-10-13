// Central hospital branding & configuration.
// Change name, contact details, address, logo, and theme here — nowhere else.
// Theme values here should stay in sync with tailwind.config.js.

export const hospitalConfig = {
  name: "CityHospital",
  tagline: "Careful medicine, close to home.",
  contact: {
    phone: "+92 300 0000000",
    email: "info@cityhospital.example",
    emergencyPhone: "+92 300 0000001",
  },
  address: {
    line1: "123 Hospital Road",
    city: "Lahore",
    country: "Pakistan",
  },
  logo: {
    src: "/images/logo/image.png",
    alt: "CityHospital logo",
  },
  hours: {
    reception: "8:00 AM – 10:00 PM, every day",
    emergency: "24/7",
  },
} as const;

export type HospitalConfig = typeof hospitalConfig;
