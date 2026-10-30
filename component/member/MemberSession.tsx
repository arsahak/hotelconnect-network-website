import type { ReactNode } from "react";
import { getSignedInMemberAction } from "@/app/actions/member";
import { MemberProvider } from "./MemberContext";

/**
 * Reads the signed-in supplier from the cookie and shares it with its children.
 * Reads the request, so always put it inside a <Suspense> boundary.
 */
export async function MemberSession({ children }: { children: ReactNode }) {
  const member = await getSignedInMemberAction();
  return <MemberProvider member={member}>{children}</MemberProvider>;
}
