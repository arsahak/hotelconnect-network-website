"use client";

import { usePathname } from "next/navigation";
import type { NavItem } from "@/lib/types";
import { NavLinkList } from "./NavLinkList";

export function ActiveNavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  return <NavLinkList pathname={pathname} items={items} />;
}
