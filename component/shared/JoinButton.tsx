"use client";

import { useRef, useState, type ReactNode } from "react";
import { membershipPlans, site } from "@/lib/site";
import { cn } from "@/lib/cn";
import type { MembershipPlan } from "@/lib/types";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "./button-styles";
import { ButtonLink } from "./ButtonLink";
import { Icon } from "./Icon";
import { Modal } from "./Modal";
import { usePlatform } from "./PlatformContext";
import { WaitlistForm, type WaitlistType } from "./WaitlistForm";

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
      <Modal open={open} onClose={() => setOpen(false)} label="Become a member" wide>
        <MembershipContent />
      </Modal>
    </>
  );
}

function MembershipContent() {
  const { testPhase } = usePlatform();
  const [waitlistType, setWaitlistType] = useState<WaitlistType>("hotel");
  const waitlistRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  // Test phase: a plan button picks hotel/supplier in the waitlist form and jumps to it.
  function choosePlan(plan: MembershipPlan) {
    setWaitlistType(plan.memberType);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    emailRef.current?.focus({ preventScroll: true });
    waitlistRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
  }

  return (
    <div>
      <p className="eyebrow text-brass-600">Private network</p>
      <h2 className="mt-3 pr-10 font-display text-3xl text-ink-950 sm:text-4xl">Join {site.name}</h2>
      <p className="mt-3 max-w-xl text-[0.9375rem] text-ink-500">
        Only verified hotels and suppliers get access. Every member gets their own member number.
      </p>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {membershipPlans.map((plan) => (
          <article
            key={plan.id}
            className={cn(
              "flex flex-col rounded-lg border p-6",
              plan.highlighted ? "border-brass-500 bg-brass-100/50" : "border-line bg-white",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-2xl leading-tight text-ink-950">{plan.name}</h3>
              <span className="shrink-0 rounded bg-white px-2 py-1 text-xs text-ink-500 ring-1 ring-line">
                {plan.memberNumber}
              </span>
            </div>
            <p className="mt-2 text-sm text-ink-500">{plan.audience}</p>

            <p className="mt-5 flex flex-wrap items-baseline gap-x-2">
              <span className="text-3xl font-semibold text-brass-600">{plan.priceLabel}</span>
              <span className="text-sm text-ink-500">{plan.priceNote}</span>
            </p>

            <ul className="mt-5 mb-6 space-y-2.5 text-sm text-ink-700">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-2.5">
                  <Icon name="check" size={17} className="mt-0.5 shrink-0 text-brass-500" />
                  {feature}
                </li>
              ))}
            </ul>

            {testPhase ? (
              <button
                type="button"
                onClick={() => choosePlan(plan)}
                className={buttonClasses({
                  variant: plan.highlighted ? "primary" : "outline",
                  className: "mt-auto w-full",
                })}
              >
                {plan.cta}
                <Icon name="arrow-right" size={17} />
              </button>
            ) : (
              <ButtonLink
                href={`/register?type=${plan.memberType}${plan.memberType === "supplier" ? `&plan=${plan.id === "supplier-contract" ? "contract" : "commission"}` : ""}`}
                variant={plan.highlighted ? "primary" : "outline"}
                className="mt-auto w-full"
              >
                {plan.cta}
                <Icon name="arrow-right" size={17} />
              </ButtonLink>
            )}
          </article>
        ))}
      </div>

      {testPhase && (
        <div ref={waitlistRef} className="mt-8 rounded-lg bg-sand p-6">
          <h3 className="font-display text-2xl text-ink-950">Sign-ups open soon</h3>
          <p className="mt-1 mb-5 text-sm text-ink-500">
            We are in our test phase with the first hotels and suppliers. Leave your email address
            and you will be the first to know when you can sign up.
          </p>
          <WaitlistForm type={waitlistType} onTypeChange={setWaitlistType} emailRef={emailRef} />
        </div>
      )}
    </div>
  );
}
