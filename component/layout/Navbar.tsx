import Link from "next/link";
import { Suspense, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/component/shared/Container";
import { JoinButton } from "@/component/shared/JoinButton";
import { Logo } from "@/component/shared/Logo";
import { ActiveNavLinks } from "./ActiveNavLinks";
import { HeaderShell, headerClasses } from "./HeaderShell";
import { MobileMenu } from "./MobileMenu";
import { NavLinkList, headerLinkClasses, navUnderlineClasses } from "./NavLinkList";

/** Header row. It is h-20: the homepage hero uses -mt-20 to slide under it. */
function NavbarContent({ links }: { links: ReactNode }) {
  return (
    <Container className="relative flex h-20 items-center justify-between gap-6">
      <Logo tone="header" />

      <nav aria-label="Main menu" className="hidden lg:block">
        {links}
      </nav>

      <div className="hidden items-center gap-6 lg:flex">
        <Link href="/login" className={cn("hidden xl:inline", navUnderlineClasses, headerLinkClasses)}>
          Log in
        </Link>
        <JoinButton size="md" />
      </div>

      <MobileMenu />
    </Container>
  );
}

export function Navbar() {
  return (
    // usePathname (inside HeaderShell / ActiveNavLinks) may suspend on dynamic
    // routes when Cache Components is on, so a solid header is the fallback.
    <Suspense
      fallback={
        <header data-overlay={false} className={headerClasses}>
          <NavbarContent links={<NavLinkList />} />
        </header>
      }
    >
      <HeaderShell>
        <NavbarContent links={<ActiveNavLinks />} />
      </HeaderShell>
    </Suspense>
  );
}
