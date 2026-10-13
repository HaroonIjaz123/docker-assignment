import { useState, FormEvent } from "react";
import { CheckCircle2, CircleAlert } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { DepartmentIcon } from "@/components/ui/DepartmentIcon";
import { DoctorCard } from "@/components/ui/DoctorCard";
import { departments, doctors } from "@/mocks/publicSiteData";
import type { AppointmentRequest } from "@/types";
import { routes, siteContent } from "@/config/siteContent";
import { validateAppointment } from "./appointmentValidation";

export default function HomePage() {
  const [form, setForm] = useState<AppointmentRequest>({
    fullName: "",
    phone: "",
    departmentId: departments[0].id,
  });
  const [touched, setTouched] = useState({ fullName: false, phone: false, departmentId: false });
  const errors = validateAppointment(form);

  const fieldState = (field: keyof AppointmentRequest) => ({
    error: touched[field] ? errors[field] : undefined,
    valid: touched[field] && !errors[field] && form[field].trim().length > 0,
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched({ fullName: true, phone: true, departmentId: true });
    if (Object.keys(errors).length) return;
    // TODO: replace with POST to backend appointments API once Phase 3/4 is live.
    console.log("Appointment request submitted:", form);
  }

  return (
    <>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7">
          <p className="text-sm text-accent">{siteContent.home.eyebrow}</p>
          <h1 className="text-5xl md:text-6xl leading-[1.08] mt-3 text-primary">
            {siteContent.home.heading[0]}
            <br />
            {siteContent.home.heading[1]}
          </h1>
          <p className="mt-6 text-lg text-gray-700 max-w-md leading-relaxed">
            {siteContent.home.introduction}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <LinkButton href={routes.appointments}>{siteContent.home.bookAppointment}</LinkButton>
            <LinkButton href={routes.doctors} variant="outline">
              {siteContent.home.findDoctor}
            </LinkButton>
          </div>
          <div className="mt-12 flex gap-10 border-t border-hairline pt-6">
            {siteContent.home.statistics.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl text-primary">{stat.value}</p>
                <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-5">
          <div className="rounded-lg p-8 bg-surface">
            <p className="font-display text-xl text-primary">{siteContent.home.appointment.title}</p>
            <p className="text-sm text-gray-600 mt-1">
              {siteContent.home.appointment.description}
            </p>
            <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="fullName" className="text-sm text-gray-700">
                  {siteContent.home.appointment.fullName}
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  className={inputClass(fieldState("fullName").error, fieldState("fullName").valid)}
                  placeholder={siteContent.home.appointment.fullNamePlaceholder}
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  onBlur={() => setTouched({ ...touched, fullName: true })}
                  aria-invalid={Boolean(fieldState("fullName").error)}
                  aria-describedby="fullName-feedback"
                />
                <FieldFeedback id="fullName-feedback" {...fieldState("fullName")} />
              </div>
              <div>
                <label htmlFor="phone" className="text-sm text-gray-700">
                  {siteContent.home.appointment.phone}
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  className={inputClass(fieldState("phone").error, fieldState("phone").valid)}
                  placeholder={siteContent.home.appointment.phonePlaceholder}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  onBlur={() => setTouched({ ...touched, phone: true })}
                  aria-invalid={Boolean(fieldState("phone").error)}
                  aria-describedby="phone-feedback"
                />
                <FieldFeedback id="phone-feedback" {...fieldState("phone")} />
              </div>
              <div>
                <label htmlFor="department" className="text-sm text-gray-700">
                  {siteContent.home.appointment.department}
                </label>
                <select
                  id="department"
                  className={inputClass(fieldState("departmentId").error, fieldState("departmentId").valid)}
                  value={form.departmentId}
                  onChange={(e) => setForm({ ...form, departmentId: e.target.value })}
                  onBlur={() => setTouched({ ...touched, departmentId: true })}
                  aria-invalid={Boolean(fieldState("departmentId").error)}
                  aria-describedby="department-feedback"
                >
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
                <FieldFeedback id="department-feedback" {...fieldState("departmentId")} />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded bg-accent text-white text-[15px] font-medium hover:bg-accent-hover transition-colors"
              >
                {siteContent.home.appointment.submit}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-hairline bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="md:flex md:items-end md:justify-between mb-12">
            <div>
              <h2 className="text-3xl text-primary">{siteContent.home.services.title}</h2>
              <p className="text-gray-600 mt-2 max-w-lg">
                {siteContent.home.services.description}
              </p>
            </div>
            <a href={routes.services} className="text-sm text-primary hover:underline mt-4 md:mt-0 inline-block">
              {siteContent.home.services.action}
            </a>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-px bg-hairline">
            {departments.slice(0, 6).map((dept) => (
              <div key={dept.id} className="bg-white p-7">
                <DepartmentIcon icon={dept.icon} />
                <p className="font-display text-lg mt-4 text-primary">{dept.name}</p>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">{dept.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="md:flex md:items-end md:justify-between mb-12">
          <div>
            <h2 className="text-3xl text-primary">{siteContent.home.doctors.title}</h2>
            <p className="text-gray-600 mt-2 max-w-lg">
              {siteContent.home.doctors.description}
            </p>
          </div>
          <a href={routes.doctors} className="text-sm text-primary hover:underline mt-4 md:mt-0 inline-block">
            {siteContent.home.doctors.action}
          </a>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doc) => <DoctorCard key={doc.id} doctor={doc} />)}
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-primary">
        <div className="max-w-6xl mx-auto px-6 py-14 md:flex items-center justify-between">
          <div>
            <h2 className="text-3xl text-white">{siteContent.home.contact.title}</h2>
            <p className="text-white/75 mt-2">
              {siteContent.home.contact.description}
            </p>
          </div>
          <LinkButton href={routes.contact} className="mt-6 md:mt-0">
            {siteContent.home.contact.action}
          </LinkButton>
        </div>
      </section>
    </>
  );
}

function inputClass(error?: string, valid?: boolean) {
  return `mt-1 w-full rounded border px-3 py-2 bg-white ${error ? "border-red-600" : valid ? "border-accent" : "border-hairline"}`;
}

function FieldFeedback({ id, error, valid }: { id: string; error?: string; valid?: boolean }) {
  if (!error && !valid) return null;
  return <p id={id} className={`mt-1 flex items-center gap-1 text-xs ${error ? "text-red-600" : "text-accent"}`} aria-live="polite">
    {error ? <CircleAlert size={14} /> : <CheckCircle2 size={14} />}{error ?? siteContent.validation.valid}
  </p>;
}
