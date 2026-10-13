import { hospitalConfig } from "@/config/hospital.config";
import { siteContent } from "@/config/siteContent";

export function SiteFooter() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-6xl mx-auto px-6 py-14 grid sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <p className="font-display text-lg">{hospitalConfig.name}</p>
          <p className="text-sm text-white/75 mt-3 leading-relaxed">
            {hospitalConfig.address.line1}
            <br />
            {hospitalConfig.address.city}, {hospitalConfig.address.country}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium">{siteContent.footer.patients}</p>
          <ul className="mt-3 space-y-2 text-sm text-white/75">
            {siteContent.footer.patientLinks.map((link) => <li key={link.to}><a href={link.to} className="hover:text-accent">{link.label}</a></li>)}
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium">{siteContent.footer.hospital}</p>
          <ul className="mt-3 space-y-2 text-sm text-white/75">
            {siteContent.footer.hospitalLinks.map((link) => <li key={link.to}><a href={link.to} className="hover:text-accent">{link.label}</a></li>)}
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium">{siteContent.footer.contact}</p>
          <ul className="mt-3 space-y-2 text-sm text-white/75">
            <li>{hospitalConfig.contact.phone}</li>
            <li>{hospitalConfig.contact.email}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/20">
        <p className="text-xs text-white/60 max-w-6xl mx-auto px-6 py-6">
          {siteContent.footer.copyright(new Date().getFullYear(), hospitalConfig.name)}
        </p>
      </div>
    </footer>
  );
}
