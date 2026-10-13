import { UserRound } from "lucide-react";
import type { Doctor } from "@/types";
import { siteContent } from "@/config/siteContent";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";

type DoctorPortraitProps = {
  doctor: Doctor;
  className: string;
  imageClassName?: string;
};

/** Keeps optional doctor imagery consistent for mock and API-sourced records. */
export function DoctorPortrait({ doctor, className, imageClassName }: DoctorPortraitProps) {
  if (doctor.imageUrl) {
    return (
      <ResponsiveImage
        src={doctor.imageUrl}
        alt={siteContent.doctorsDirectory.portraitAlt(doctor.name)}
        fit="cover"
        focalPoint="top"
        className={className}
        imageClassName={imageClassName}
      />
    );
  }

  return (
    <div className={`image-frame ${className} flex items-center justify-center p-6 text-primary/50`} role="img" aria-label={siteContent.doctorsDirectory.photoUnavailable}>
      <UserRound size={52} strokeWidth={1.3} aria-hidden="true" />
    </div>
  );
}
