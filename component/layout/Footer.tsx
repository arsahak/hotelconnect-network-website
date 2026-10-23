import Link from "next/link";
import type { ReactNode } from "react";
import { footerNav, legalNav, site, socialLinks } from "@/lib/site";
import { AboutButton } from "@/component/shared/AboutButton";
import { Container } from "@/component/shared/Container";
import { Icon, type IconName } from "@/component/shared/Icon";
import { Logo } from "@/component/shared/Logo";

const linkClasses =
  "inline-block text-sm text-white/65 transition-all duration-200 hover:text-brass-400 sm:hover:translate-x-0.5";

/**
 * Site footer. Centred on phones; brand on top of the link columns on tablets;
 * brand + three link columns side by side on large screens.
 */
export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-ink-950 text-white">
      {/* Thin brass line and a soft glow at the top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brass-500/60 to-transparent" />
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 size-[36rem] -translate-x-1/2 rounded-full bg-brass-500/10 blur-3xl sm:left-0 sm:translate-x-0" />

      <Container className="grid gap-14 py-16 text-center sm:text-left lg:grid-cols-12 lg:py-20">
        {/* Brand */}
        <div className="flex flex-col items-center sm:items-start lg:col-span-4">
          <Logo tone="light" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">{site.description}</p>
          <ul aria-label="Follow us" className="mt-7 flex items-center justify-center gap-3 sm:justify-start">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid size-10 place-items-center rounded-full bg-white/5 text-brass-400 ring-1 ring-white/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brass-500 hover:text-white hover:ring-brass-500"
                >
                  <Icon name={social.icon} size={18} />
                  <span className="sr-only">{social.label} (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:col-span-7 lg:col-start-6">
          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <FooterHeading>{group.title}</FooterHeading>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClasses}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="col-span-2 sm:col-span-1">
            <FooterHeading>Contact</FooterHeading>
            <ul className="mt-5 flex flex-col items-center space-y-3 sm:items-start">
              <li>
                <ContactLink icon="mail" href={`mailto:${site.email}`}>
                  {site.email}
                </ContactLink>
              </li>
              <li>
                <ContactLink icon="phone" href={site.phoneHref}>
                  {site.phone}
                </ContactLink>
              </li>
              <li>
                <AboutButton unstyled className="group inline-flex items-center gap-3 text-sm text-white/65 transition-colors hover:text-brass-400">
                  <ContactIcon icon="users" />
                  About us
                </AboutButton>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center gap-4 py-7 text-center text-sm text-white/60 sm:flex-row sm:justify-between sm:text-left">
          <p>
            © {site.copyrightYear} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {legalNav.map((item, i) => (
              <li key={item.href} className="flex items-center gap-4">
                {i > 0 && <span className="size-1.5 rounded-full bg-brass-500/60" aria-hidden="true" />}
                <Link href={item.href} className="transition-colors hover:text-brass-400">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}

/** Column heading with a short brass line underneath (centred on phones). */
function FooterHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display text-xl text-white">
      {children}
      <span className="mx-auto mt-3 block h-px w-8 bg-brass-500 sm:mx-0" aria-hidden="true" />
    </h2>
  );
}

function ContactIcon({ icon }: { icon: IconName }) {
  return (
    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white/5 text-brass-400 ring-1 ring-white/10 transition-colors group-hover:bg-brass-500 group-hover:text-white">
      <Icon name={icon} size={15} />
    </span>
  );
}

function ContactLink({ icon, href, children }: { icon: IconName; href: string; children: ReactNode }) {
  return (
    <a href={href} className="group inline-flex items-center gap-3 text-sm text-white/65 transition-colors hover:text-brass-400">
      <ContactIcon icon={icon} />
      {children}
    </a>
  );
}
