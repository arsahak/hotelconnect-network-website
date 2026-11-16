import { Suspense, type ReactNode } from "react";
import { getCachedOpenTenderCount } from "@/component/shared/cached-tenders";
import { navItems } from "@/lib/site";
import type { NavItem } from "@/lib/types";
import { Container } from "@/component/shared/Container";
import { Logo } from "@/component/shared/Logo";
import { ActiveNavLinks } from "./ActiveNavLinks";
import { HeaderShell, headerClasses } from "./HeaderShell";
import { MobileMenu } from "./MobileMenu";
import { NavLinkList } from "./NavLinkList";

/** Header row. It is h-20: the homepage hero uses -mt-20 to slide under it. */
function NavbarContent({ links, items }: { links: ReactNode; items: NavItem[] }) {
  return (
    <Container className="relative flex h-20 items-center justify-between gap-6">
      <Logo tone="header" />

      {/* Master Briefing v4: only these four links. Log in sits in the hero and the footer. */}
      <nav aria-label="Main menu" className="hidden lg:block">
        {links}
      </nav>

      <MobileMenu items={items} />
    </Container>
  );
}

export async function Navbar() {
  const items = navItems((await getCachedOpenTenderCount()) > 0);
  return (
    // usePathname (inside HeaderShell / ActiveNavLinks) may suspend on dynamic
    // routes when Cache Components is on, so a solid header is the fallback.
    <Suspense
      fallback={
        <header data-overlay={false} className={headerClasses}>
          <NavbarContent links={<NavLinkList items={items} />} items={items} />
        </header>
      }
    >
      <HeaderShell>
        <NavbarContent links={<ActiveNavLinks items={items} />} items={items} />
      </HeaderShell>
    </Suspense>
  );
}
