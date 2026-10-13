import { Link, NavLink } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { hospitalConfig } from "@/config/hospital.config";
import { LinkButton } from "@/components/ui/Button";
import { routes, siteContent } from "@/config/siteContent";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";

export function SiteHeader() {
  return (
    <>
      <div className="hidden md:block bg-primary">
        <div className="max-w-6xl mx-auto px-6 py-2 flex justify-between items-center text-xs text-white/90">
          <span className="flex items-center gap-1.5">
            <MapPin size={13} />
            {hospitalConfig.address.line1}, {hospitalConfig.address.city},{" "}
            {hospitalConfig.address.country}
          </span>
          <div className="flex gap-6">
            <span className="flex items-center gap-1.5">
              <Phone size={13} />
              {siteContent.header.emergencyLabel} {hospitalConfig.contact.emergencyPhone}
            </span>
            <span className="flex items-center gap-1.5">
              <Mail size={13} />
              {hospitalConfig.contact.email}
            </span>
          </div>
        </div>
      </div>

      <header className="border-b border-hairline bg-paper">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <ResponsiveImage src={hospitalConfig.logo.src} alt={hospitalConfig.logo.alt} fit="contain" className="image-frame--logo" />
            <span className="font-display text-xl text-primary">{hospitalConfig.name}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-[15px]">
            {siteContent.navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-px after:bg-primary after:transition-all hover:after:w-full ${
                    isActive ? "after:w-full text-primary" : "after:w-0 text-ink"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to={routes.login}
              className="hidden sm:inline-block px-4 py-2 text-sm rounded border border-primary text-primary hover:bg-primary hover:text-white transition-colors"
            >
              {siteContent.header.login}
            </Link>
            <LinkButton href={routes.appointments} className="px-4 py-2 text-sm">
              {siteContent.header.bookAppointment}
            </LinkButton>
          </div>
        </div>
      </header>
    </>
  );
}
