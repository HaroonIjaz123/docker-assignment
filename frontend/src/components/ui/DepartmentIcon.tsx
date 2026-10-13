import { HeartPulse, Baby, Bone, FlaskConical, Radar, Siren, LucideIcon } from "lucide-react";
import type { Department } from "@/types";
import { themeColors } from "../../../theme.config.js";

const iconMap: Record<Department["icon"], LucideIcon> = {
  cardiology: HeartPulse,
  pediatrics: Baby,
  orthopedics: Bone,
  laboratory: FlaskConical,
  radiology: Radar,
  emergency: Siren,
};

export function DepartmentIcon({ icon, size = 26 }: { icon: Department["icon"]; size?: number }) {
  const Icon = iconMap[icon];
  return <Icon size={size} strokeWidth={1.6} color={themeColors.primary.DEFAULT} />;
}
