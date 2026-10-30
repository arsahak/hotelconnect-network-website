"use client";

import { Icon } from "@/component/shared/Icon";
import { cn } from "@/lib/cn";
import { LoginNotice } from "./LoginNotice";
import { useMember } from "./MemberContext";
import { SignOutButton } from "./SignOutButton";

/** "Signed in as …  ·  Log out" for a supplier, plus any sign-in problem. */
export function MemberBar({ className }: { className?: string }) {
  const member = useMember();
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <LoginNotice />
      {member && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-sm text-ink-700">
            <Icon name="check" size={17} className="text-moss-600" />
            Signed in as <span className="font-semibold">{member.name}</span> ({member.memberNumber})
          </p>
          <SignOutButton />
        </div>
      )}
    </div>
  );
}
