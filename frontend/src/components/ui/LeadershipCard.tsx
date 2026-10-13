import { Award, Building2, Quote } from "lucide-react";
import type { Leader } from "@/mocks/publicSiteData";
import { hospitalConfig } from "@/config/hospital.config";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";

export function LeadershipCard({ leader }: { leader: Leader }) {
  return (
    <article className="group relative overflow-hidden rounded-[22px] border border-[#d7ebf8] bg-gradient-to-br from-white via-white to-[#f4f9fd] shadow-[0_14px_38px_rgba(18,59,99,0.10)] transition-shadow duration-300 hover:shadow-[0_18px_44px_rgba(18,59,99,0.16)]">
      <div className="grid md:grid-cols-[minmax(190px,34%)_1fr]">
        <div className="relative min-h-[260px] overflow-hidden bg-[#eaf5fc] p-5">
          <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full border-[30px] border-[#03a9f4]/20" aria-hidden="true" />
          <div className="absolute -right-16 top-8 h-40 w-40 rounded-full bg-[#0288d1]/10" aria-hidden="true" />
          {leader.photoUrl ? (
            <ResponsiveImage
              src={leader.photoUrl}
              alt={`Portrait of ${leader.name}`}
              fit="cover"
              focalPoint="top"
              className="image-frame--portrait rounded-2xl border border-white/80 bg-white shadow-[0_8px_24px_rgba(2,136,209,0.12)]"
              imageClassName="transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : <div className="image-frame image-frame--portrait rounded-2xl border border-white/80 bg-white shadow-[0_8px_24px_rgba(2,136,209,0.12)]" />}
        </div>
        <div className="flex min-w-0 flex-col p-6 sm:p-7">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#b9e2f8] bg-[#eaf5fc] px-3 py-1.5 text-xs font-semibold tracking-wide text-[#0288d1]"><Award size={14} strokeWidth={2} /> Leadership</span>
            <h2 className="mt-4 font-display text-3xl leading-none text-[#123b63] sm:text-[2rem]">{leader.name}</h2>
            <p className="mt-2 text-sm font-medium text-[#47718f]">{leader.role}</p>
            <div className="mt-5 h-px w-full bg-gradient-to-r from-[#03a9f4] via-[#b9e2f8] to-transparent" />
          </div>
          <p className="mt-5 text-sm leading-relaxed text-[#456a86]">{leader.bio}</p>
          <dl className="mt-5 grid gap-4 border-t border-[#dcecf7] pt-4 text-sm sm:grid-cols-2">
            <div className="flex gap-3"><Quote size={18} className="mt-0.5 shrink-0 text-[#0288d1]" strokeWidth={1.8} /><div><dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#6a8ba4]">Focus</dt><dd className="mt-1 font-medium text-[#123b63]">Patient-first care</dd></div></div>
            <div className="flex gap-3"><Building2 size={18} className="mt-0.5 shrink-0 text-[#0288d1]" strokeWidth={1.8} /><div><dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#6a8ba4]">Location</dt><dd className="mt-1 font-medium leading-snug text-[#123b63]">{hospitalConfig.name}</dd></div></div>
          </dl>
        </div>
      </div>
    </article>
  );
}
