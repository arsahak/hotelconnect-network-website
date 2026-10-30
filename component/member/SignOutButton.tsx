"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { signOutMemberAction } from "@/app/actions/member";
import { cn } from "@/lib/cn";

/** Signs the supplier out on the website (the dashboard stays signed in). */
export function SignOutButton({ className }: { className?: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await signOutMemberAction();
          router.refresh();
        })
      }
      className={cn("text-sm text-ink-500 underline-offset-4 hover:text-brass-600 hover:underline", className)}
    >
      {isPending ? "Logging out…" : "Log out"}
    </button>
  );
}
