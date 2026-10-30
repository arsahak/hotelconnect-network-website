"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Member } from "@/lib/types";

const MemberContext = createContext<Member | null>(null);

/** Shares the signed-in supplier (or null) with client components below it. */
export function MemberProvider({ member, children }: { member: Member | null; children: ReactNode }) {
  return <MemberContext value={member}>{children}</MemberContext>;
}

/** The supplier signed in on the website, or null. */
export function useMember() {
  return useContext(MemberContext);
}
