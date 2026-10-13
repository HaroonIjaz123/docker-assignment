import { BedDouble, Award, Quote } from "lucide-react";
import { LeadershipCard } from "@/components/ui/LeadershipCard";
import { leadership, facilities, accreditations, testimonials } from "@/mocks/publicSiteData";
import { hospitalConfig } from "@/config/hospital.config";
import { siteContent } from "@/config/siteContent";

export default function AboutPage() {
  return (
    <>
      {/* Story / mission */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid md:grid-cols-12 gap-10 items-start">
        <div className="md:col-span-7">
          <p className="text-sm text-accent">{siteContent.about.eyebrow(hospitalConfig.name)}</p>
          <h1 className="text-5xl leading-[1.1] mt-3 text-primary">
            {siteContent.about.heading}
          </h1>
          <p className="mt-6 text-lg text-gray-700 max-w-xl leading-relaxed">
            {siteContent.about.story(hospitalConfig.name)}
          </p>
        </div>
        <div className="md:col-span-5 rounded-lg p-8 bg-surface">
          <p className="font-display text-lg text-primary">{siteContent.about.missionTitle}</p>
          <p className="text-sm text-gray-700 mt-3 leading-relaxed">
            {siteContent.about.mission}
          </p>
        </div>
      </section>

      {/* Leadership */}
      <section className="border-t border-hairline bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl text-primary mb-12">{siteContent.about.leadership}</h2>
          <div className="grid gap-8 lg:grid-cols-2">
            {leadership.map((leader) => <LeadershipCard key={leader.id} leader={leader} />)}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl text-primary mb-12">{siteContent.about.facilities}</h2>
        <div className="grid sm:grid-cols-2 gap-px bg-hairline">
          {facilities.map((f) => (
            <div key={f.id} className="bg-white p-7 flex gap-4">
              <BedDouble size={24} strokeWidth={1.6} className="text-primary shrink-0 mt-1" />
              <div>
                <p className="font-display text-lg text-primary">{f.name}</p>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Accreditations */}
      <section className="border-t border-hairline bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl text-primary mb-12">{siteContent.about.accreditations}</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {accreditations.map((a) => (
              <div key={a.id} className="flex gap-3">
                <Award size={22} strokeWidth={1.6} className="text-accent shrink-0 mt-1" />
                <div>
                  <p className="text-[15px] text-ink font-medium">{a.name}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{a.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-primary">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl text-white mb-12">{siteContent.about.testimonials}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white/5 border border-white/15 rounded-lg p-7">
                <Quote size={22} strokeWidth={1.6} className="text-accent" />
                <p className="text-white/90 mt-4 leading-relaxed text-[15px]">{t.quote}</p>
                <p className="text-white/60 text-sm mt-5">
                  {t.author} — {t.context}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
