import { ArrowRight, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";
import { DepartmentIcon } from "@/components/ui/DepartmentIcon";
import { LinkButton } from "@/components/ui/Button";
import { routes, siteContent } from "@/config/siteContent";
import { publicDirectoryData } from "@/mocks/publicSiteData";

export default function ServicesPage() {
  return (
    <>
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20">
        <p className="text-sm text-accent">{siteContent.services.eyebrow}</p>
        <h1 className="text-5xl md:text-6xl leading-[1.08] mt-3 text-primary">{siteContent.services.heading}</h1>
        <p className="mt-6 text-lg text-gray-700 max-w-2xl leading-relaxed">{siteContent.services.introduction}</p>
      </section>

      <section className="border-y border-hairline bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {publicDirectoryData.departments.map((department) => (
            <article key={department.id} className="rounded-lg border border-hairline p-7 flex flex-col">
              <DepartmentIcon icon={department.icon} />
              <h2 className="font-display text-2xl mt-5 text-primary">{department.name}</h2>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">{department.description}</p>
              <div className="border-t border-hairline mt-6 pt-5">
                <p className="text-xs uppercase tracking-[0.14em] text-gray-500">{siteContent.services.serviceList}</p>
                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  {department.services?.map((service) => <li key={service} className="flex gap-2"><span className="text-accent">•</span>{service}</li>)}
                </ul>
              </div>
              <p className="mt-6 flex items-center gap-2 text-xs text-gray-500"><Clock3 size={14} className="text-accent" />{department.availability}</p>
              <Link to={routes.appointments} className="mt-5 text-sm text-primary font-medium inline-flex items-center gap-2 hover:underline">{siteContent.services.appointment}<ArrowRight size={15} /></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-primary">
        <div className="max-w-6xl mx-auto px-6 py-14 md:flex items-center justify-between gap-8">
          <div><h2 className="text-3xl text-white">{siteContent.services.emergencyTitle}</h2><p className="text-white/75 mt-2 max-w-2xl">{siteContent.services.emergencyText}</p></div>
          <LinkButton href={routes.appointments} className="shrink-0 mt-6 md:mt-0">{siteContent.services.emergencyAction}</LinkButton>
        </div>
      </section>
    </>
  );
}
