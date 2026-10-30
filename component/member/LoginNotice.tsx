"use client";

import { useSearchParams } from "next/navigation";
import { Icon } from "@/component/shared/Icon";
import { cn } from "@/lib/cn";

const MESSAGES: Record<string, string> = {
  failed: "We could not sign you in. Please try again.",
  "not-supplier":
    "Only supplier accounts can book vouchers. You are signed in to the dashboard with another kind of account.",
  required: "Please log in as a supplier to book this voucher.",
};

/** Shows why a supplier sign-in did not work (?login=… after the dashboard sends them back). */
export function LoginNotice({ className }: { className?: string }) {
  const message = MESSAGES[useSearchParams().get("login") ?? ""];
  if (!message) return null;
  return (
    <p role="alert" className={cn("flex items-start gap-2.5 rounded-md bg-ember-100 px-4 py-3 text-sm text-ember-600", className)}>
      <Icon name="bell" size={17} className="mt-0.5 shrink-0" />
      {message}
    </p>
  );
}
