import { useMemo, useState } from "react";
import { DoctorCard } from "@/components/ui/DoctorCard";
import { publicDirectoryData } from "@/mocks/publicSiteData";
import { siteContent } from "@/config/siteContent";

export default function DoctorsPage() {
  const allDepartmentId = siteContent.doctorsDirectory.allDepartmentId;
  const [department, setDepartment] = useState<string>(allDepartmentId);
  const doctorDepartments = useMemo(() => Array.from(new Set(publicDirectoryData.doctors.map((doctor) => doctor.department))).sort(), []);
  const visibleDoctors = department === allDepartmentId ? publicDirectoryData.doctors : publicDirectoryData.doctors.filter((doctor) => doctor.department === department);

  return (
    <>
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-14">
        <p className="text-sm text-accent">{siteContent.doctorsDirectory.eyebrow}</p>
        <h1 className="text-5xl md:text-6xl leading-[1.08] mt-3 text-primary">{siteContent.doctorsDirectory.heading}</h1>
        <p className="mt-6 text-lg text-gray-700 max-w-2xl leading-relaxed">{siteContent.doctorsDirectory.introduction}</p>
      </section>

      <section className="border-t border-hairline bg-white">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div><label htmlFor="doctor-department" className="block text-sm text-gray-700 mb-2">{siteContent.doctorsDirectory.filterLabel}</label><select id="doctor-department" value={department} onChange={(event) => setDepartment(event.target.value)} className="rounded border border-hairline bg-white px-3 py-2 text-sm text-ink min-w-60"><option value={allDepartmentId}>{siteContent.doctorsDirectory.allDepartments}</option>{doctorDepartments.map((item) => <option key={item} value={item}>{item}</option>)}</select></div>
            <p className="text-sm text-gray-600">{siteContent.doctorsDirectory.results(visibleDoctors.length)}</p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        {visibleDoctors.length ? <div className="grid gap-8 xl:grid-cols-2">{visibleDoctors.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} />)}</div> : <p className="text-gray-600">{siteContent.doctorsDirectory.noResults}</p>}
      </section>
    </>
  );
}
