import Link from "next/link";
import { mainNav } from "@/lib/site";
import { cn } from "@/lib/cn";

export function isActivePath(pathname: string | undefined, href: string) {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Text colours for header links: dark on the solid header, white over the hero. */
export const headerLinkClasses =
  "text-ink-700 hover:text-ink-950 group-data-[overlay=true]/header:text-white/85 group-data-[overlay=true]/header:hover:text-white";

/**
 * Brass underline that moves left → right: on hover it grows from the left,
 * and when the pointer leaves it shrinks away to the right (the origin flips).
 * Add `after:scale-x-100` to keep it visible, e.g. for the active page.
 */
export const navUnderlineClasses =
  "relative py-2 text-base transition-colors duration-300 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[2px] after:origin-right after:scale-x-0 hover:after:origin-left focus-visible:after:origin-left after:rounded-full after:bg-brass-500 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:after:scale-x-100 focus-visible:after:scale-x-100 group-data-[overlay=true]/header:after:bg-brass-400";

/** Desktop navigation links. `pathname` highlights the current page. */
export function NavLinkList({ pathname }: { pathname?: string }) {
  return (
    <ul className="flex items-center gap-7 xl:gap-9">
      {mainNav.map((item) => {
        const active = isActivePath(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                navUnderlineClasses,
                active
                  ? "text-brass-600 after:scale-x-100 group-data-[overlay=true]/header:text-brass-400"
                  : headerLinkClasses,
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
