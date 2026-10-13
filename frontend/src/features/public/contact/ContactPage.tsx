import { type FormEvent, useState } from "react";
import { CheckCircle2, CircleAlert, Clock3, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { hospitalConfig } from "@/config/hospital.config";
import { siteContent } from "@/config/siteContent";
import type { ContactInquiry } from "@/types";
import { validateContactInquiry } from "./contactValidation";

const emptyInquiry: ContactInquiry = { fullName: "", email: "", phone: "", subject: "", message: "" };

export default function ContactPage() {
  const [inquiry, setInquiry] = useState<ContactInquiry>(emptyInquiry);
  const [touched, setTouched] = useState<Partial<Record<keyof ContactInquiry, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const errors = validateContactInquiry(inquiry);

  const fieldState = (field: keyof ContactInquiry) => ({
    error: touched[field] ? errors[field] : undefined,
    valid: Boolean(touched[field] && !errors[field] && inquiry[field].trim()),
  });

  function updateField(field: keyof ContactInquiry, value: string) {
    setInquiry((current) => ({ ...current, [field]: value }));
    setSubmitted(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched({ fullName: true, email: true, phone: true, subject: true, message: true });
    if (Object.keys(errors).length) return;
    // TODO: send to the secured contact-support API once the backend is available.
    setSubmitted(true);
    setInquiry(emptyInquiry);
    setTouched({});
  }

  return (
    <>
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-14">
        <p className="text-sm text-accent">{siteContent.contact.eyebrow}</p>
        <h1 className="text-5xl md:text-6xl leading-[1.08] mt-3 text-primary">{siteContent.contact.heading}</h1>
        <p className="mt-6 text-lg text-gray-700 max-w-2xl leading-relaxed">{siteContent.contact.introduction}</p>
      </section>

      <section className="border-y border-hairline bg-white">
        <div className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-12 gap-12">
          <aside className="lg:col-span-5">
            <h2 className="text-3xl text-primary">{siteContent.contact.detailsTitle}</h2>
            <div className="mt-8 space-y-7">
              <ContactDetail icon={<Phone size={21} />} title={siteContent.contact.reception}>
                <a className="hover:text-primary" href={`tel:${hospitalConfig.contact.phone.replace(/\s/g, "")}`}>{hospitalConfig.contact.phone}</a>
                <a className="block mt-1 hover:text-primary" href={`mailto:${hospitalConfig.contact.email}`}>{hospitalConfig.contact.email}</a>
              </ContactDetail>
              <ContactDetail icon={<MapPin size={21} />} title={siteContent.contact.visit}>
                {hospitalConfig.address.line1}<br />{hospitalConfig.address.city}, {hospitalConfig.address.country}
              </ContactDetail>
              <ContactDetail icon={<Clock3 size={21} />} title={siteContent.contact.hours}>
                <span className="font-medium text-ink">{siteContent.contact.reception}: </span>{hospitalConfig.hours.reception}<br />
                <span className="font-medium text-ink">{siteContent.contact.emergency}: </span>{hospitalConfig.hours.emergency}
              </ContactDetail>
            </div>
            <div className="mt-10 rounded-lg bg-primary p-7">
              <p className="font-display text-xl text-white">{siteContent.contact.emergency}</p>
              <p className="mt-2 text-sm leading-relaxed text-white/75">{siteContent.contact.emergencyText}</p>
              <a href={`tel:${hospitalConfig.contact.emergencyPhone.replace(/\s/g, "")}`} className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white hover:text-accent">
                <Phone size={16} />{hospitalConfig.contact.emergencyPhone}
              </a>
            </div>
          </aside>

          <div className="lg:col-span-7 rounded-lg bg-surface p-6 sm:p-8">
            <h2 className="text-3xl text-primary">{siteContent.contact.sendMessage}</h2>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">{siteContent.contact.formIntroduction}</p>
            {submitted && <p className="mt-5 flex gap-2 rounded border border-accent/30 bg-white px-4 py-3 text-sm text-primary" role="status"><CheckCircle2 size={18} className="shrink-0 text-accent" />{siteContent.contact.success}</p>}
            <form className="mt-7 grid sm:grid-cols-2 gap-5" onSubmit={handleSubmit} noValidate>
              <FormField label={siteContent.contact.fullName} field="fullName" value={inquiry.fullName} placeholder={siteContent.contact.fullNamePlaceholder} state={fieldState("fullName")} onChange={updateField} onBlur={() => setTouched((current) => ({ ...current, fullName: true }))} />
              <FormField label={siteContent.contact.email} field="email" type="email" value={inquiry.email} placeholder={siteContent.contact.emailPlaceholder} state={fieldState("email")} onChange={updateField} onBlur={() => setTouched((current) => ({ ...current, email: true }))} />
              <FormField label={siteContent.contact.phone} field="phone" type="tel" value={inquiry.phone} placeholder={siteContent.contact.phonePlaceholder} state={fieldState("phone")} onChange={updateField} onBlur={() => setTouched((current) => ({ ...current, phone: true }))} />
              <div>
                <label htmlFor="contact-subject" className="text-sm text-gray-700">{siteContent.contact.subject}</label>
                <select id="contact-subject" value={inquiry.subject} onChange={(event) => updateField("subject", event.target.value)} onBlur={() => setTouched((current) => ({ ...current, subject: true }))} className={inputClass(fieldState("subject").error, fieldState("subject").valid)} aria-invalid={Boolean(fieldState("subject").error)} aria-describedby="contact-subject-feedback">
                  <option value="">{siteContent.contact.subjectPlaceholder}</option>
                  {siteContent.contact.topics.map((topic) => <option key={topic} value={topic}>{topic}</option>)}
                </select>
                <FieldFeedback id="contact-subject-feedback" {...fieldState("subject")} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="contact-message" className="text-sm text-gray-700">{siteContent.contact.message}</label>
                <textarea id="contact-message" rows={5} value={inquiry.message} placeholder={siteContent.contact.messagePlaceholder} onChange={(event) => updateField("message", event.target.value)} onBlur={() => setTouched((current) => ({ ...current, message: true }))} className={inputClass(fieldState("message").error, fieldState("message").valid)} aria-invalid={Boolean(fieldState("message").error)} aria-describedby="contact-message-feedback" />
                <FieldFeedback id="contact-message-feedback" {...fieldState("message")} />
              </div>
              <div className="sm:col-span-2"><Button type="submit">{siteContent.contact.submit}</Button></div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactDetail({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return <div className="flex gap-4"><span className="mt-0.5 text-accent">{icon}</span><div className="text-sm text-gray-600 leading-relaxed"><p className="font-medium text-ink mb-1">{title}</p>{children}</div></div>;
}

function FormField({ label, field, type = "text", value, placeholder, state, onChange, onBlur }: { label: string; field: keyof ContactInquiry; type?: string; value: string; placeholder: string; state: { error?: string; valid: boolean }; onChange: (field: keyof ContactInquiry, value: string) => void; onBlur: () => void }) {
  const id = `contact-${field}`;
  return <div><label htmlFor={id} className="text-sm text-gray-700">{label}</label><input id={id} type={type} value={value} placeholder={placeholder} onChange={(event) => onChange(field, event.target.value)} onBlur={onBlur} className={inputClass(state.error, state.valid)} aria-invalid={Boolean(state.error)} aria-describedby={`${id}-feedback`} /><FieldFeedback id={`${id}-feedback`} {...state} /></div>;
}

function inputClass(error?: string, valid?: boolean) {
  return `mt-1 w-full rounded border px-3 py-2 bg-white ${error ? "border-red-600" : valid ? "border-accent" : "border-hairline"}`;
}

function FieldFeedback({ id, error, valid }: { id: string; error?: string; valid?: boolean }) {
  if (!error && !valid) return null;
  return <p id={id} className={`mt-1 flex items-center gap-1 text-xs ${error ? "text-red-600" : "text-accent"}`} aria-live="polite">{error ? <CircleAlert size={14} /> : <CheckCircle2 size={14} />}{error ?? siteContent.validation.valid}</p>;
}
