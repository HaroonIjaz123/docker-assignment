import { BriefcaseMedical, CalendarDays, HeartPulse, Languages } from "lucide-react";
import { Link } from "react-router-dom";
import { DoctorPortrait } from "@/components/ui/DoctorPortrait";
import { routes, siteContent } from "@/config/siteContent";
import type { Doctor } from "@/types";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  const specialties = doctor.specialties?.join(" · ") ?? doctor.department;
  const languages = doctor.languages?.join(", ") ?? "English, Urdu";

  return (
    <article className="group relative overflow-hidden rounded-[22px] border border-[#d7ebf8] bg-gradient-to-br from-white via-white to-[#f4f9fd] shadow-[0_14px_38px_rgba(18,59,99,0.10)] transition-shadow duration-300 hover:shadow-[0_18px_44px_rgba(18,59,99,0.16)]">
      <div className="grid md:grid-cols-[minmax(210px,36%)_1fr]">
        <div className="relative min-h-[280px] overflow-hidden bg-[#eaf5fc] p-5">
          <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full border-[30px] border-[#03a9f4]/20" aria-hidden="true" />
          <div className="absolute -right-16 top-8 h-40 w-40 rounded-full bg-[#0288d1]/10" aria-hidden="true" />
          <DoctorPortrait
            doctor={doctor}
            className="image-frame--portrait rounded-2xl border border-white/80 bg-white shadow-[0_8px_24px_rgba(2,136,209,0.12)]"
            imageClassName="transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>

        <div className="flex min-w-0 flex-col p-6 sm:p-7">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#b9e2f8] bg-[#eaf5fc] px-3 py-1.5 text-xs font-semibold tracking-wide text-[#0288d1]"><HeartPulse size={14} strokeWidth={2} /> {doctor.department}</span>
            <h2 className="mt-4 font-display text-3xl leading-none text-[#123b63] sm:text-[2rem]">{doctor.name}</h2>
            <p className="mt-2 text-sm font-medium text-[#47718f]">{doctor.title ?? "Consultant Specialist"}</p>
            <div className="mt-5 h-px w-full bg-gradient-to-r from-[#03a9f4] via-[#b9e2f8] to-transparent" />
          </div>

          <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
            <div className="flex min-w-0 gap-3"><BriefcaseMedical size={18} className="mt-0.5 shrink-0 text-[#0288d1]" strokeWidth={1.8} /><div><dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#6a8ba4]">Specialty</dt><dd className="mt-1 leading-snug text-[#123b63]">{specialties}</dd></div></div>
            <div className="flex min-w-0 gap-3"><Languages size={18} className="mt-0.5 shrink-0 text-[#0288d1]" strokeWidth={1.8} /><div><dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#6a8ba4]">Languages</dt><dd className="mt-1 leading-snug text-[#123b63]">{languages}</dd></div></div>
          </dl>

          <div className="mt-5 flex items-center gap-3 border-t border-[#dcecf7] pt-4"><BriefcaseMedical size={18} className="shrink-0 text-[#0288d1]" strokeWidth={1.8} /><div><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#6a8ba4]">Experience</p><p className="mt-0.5 text-sm font-medium text-[#123b63]">12+ Years Experience</p></div></div>
          <Link to={routes.appointments} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0288d1] to-[#03a9f4] px-4 py-3.5 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(2,136,209,0.24)] transition hover:brightness-105 focus-visible:outline-white"><CalendarDays size={17} strokeWidth={2} /> {siteContent.doctorsDirectory.appointment} <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </article>
  );
}
