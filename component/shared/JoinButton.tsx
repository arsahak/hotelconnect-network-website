"use client";

import { useState, type ReactNode } from "react";
import { membershipPlans, site } from "@/lib/site";
import { cn } from "@/lib/cn";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "./button-styles";
import { Icon } from "./Icon";
import { Modal } from "./Modal";
import { WaitlistForm } from "./WaitlistForm";

/**
 * "Become a member" button. Opens the membership popup with plans and prices.
 * During the test phase the popup shows the waitlist form instead.
 */
export function JoinButton({
  children = "Become a member",
  variant = "primary",
  size = "md",
  className,
}: {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={buttonClasses({ variant, size, className })}
      >
        {children}
      </button>
      <Modal open={open} onClose={() => setOpen(false)} label="Become a member">
        <MembershipContent />
      </Modal>
    </>
  );
}

function MembershipContent() {
  return (
    <div>
      <p className="eyebrow text-brass-600">Private network</p>
      <h2 className="mt-3 pr-10 font-display text-3xl text-ink-950 sm:text-4xl">Join {site.name}</h2>
      <p className="mt-3 max-w-xl text-[0.9375rem] text-ink-500">
        Only verified hotels and suppliers get access. Every member gets their own member number.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {membershipPlans.map((plan) => (
          <article
            key={plan.id}
            className={cn(
              "flex flex-col rounded-lg border p-6",
              plan.highlighted ? "border-brass-500 bg-brass-100/50" : "border-line bg-white",
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display text-2xl text-ink-950">{plan.name}</h3>
              <span className="rounded bg-white px-2 py-1 text-xs text-ink-500 ring-1 ring-line">
                {plan.memberNumber}
              </span>
            </div>
            <p className="mt-4 text-2xl font-semibold text-brass-600">{plan.priceLabel}</p>
            <p className="text-sm text-ink-500">{plan.priceNote}</p>
            <ul className="mt-5 space-y-2.5 text-sm text-ink-700">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-2.5">
                  <Icon name="check" size={17} className="mt-0.5 shrink-0 text-brass-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {site.testPhase && (
        <div className="mt-8 rounded-lg bg-sand p-6">
          <h3 className="font-display text-2xl text-ink-950">Sign-ups open soon</h3>
          <p className="mt-1 mb-5 text-sm text-ink-500">
            We are in our test phase with the first hotels and suppliers. Leave your email address
            and you will be the first to know when you can sign up.
          </p>
          <WaitlistForm />
        </div>
      )}
    </div>
  );
}
