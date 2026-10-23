"use client";

import { usePathname } from "next/navigation";
import { NavLinkList } from "./NavLinkList";

export function ActiveNavLinks() {
  const pathname = usePathname();
  return <NavLinkList pathname={pathname} />;
}
