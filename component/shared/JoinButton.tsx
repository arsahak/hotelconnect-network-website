"use client";

import { useRef, useState, type ReactNode } from "react";
import { hotelTiers, membershipPlans, site, supplierFreeUntil } from "@/lib/site";
import { cn } from "@/lib/cn";
import type { MembershipPlan } from "@/lib/types";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "./button-styles";
import { ButtonLink } from "./ButtonLink";
import { Icon } from "./Icon";
import { Modal } from "./Modal";
import { usePlatform } from "./PlatformContext";
import { WaitlistForm, type WaitlistType } from "./WaitlistForm";

type Tab = "hotel" | "supplier";

/**
 * "Join as Hotel / Supplier" button. Opens the pricing popup with two tabs
 * (Master Briefing v4). During the test phase it also shows the waitlist form.
 */
export function JoinButton({
  children = "Join as Hotel / Supplier",
  variant = "primary",
  size = "md",
  className,
  tab = "hotel",
}: {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Which tab the popup opens on. */
  tab?: Tab;
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
      <Modal open={open} onClose={() => setOpen(false)} label="Join HotelConnect Network" wide>
        <MembershipContent initialTab={tab} />
      </Modal>
    </>
  );
}

function MembershipContent({ initialTab }: { initialTab: Tab }) {
  const { testPhase } = usePlatform();
  const [tab, setTab] = useState<Tab>(initialTab);
  const [waitlistType, setWaitlistType] = useState<WaitlistType>(initialTab);
  const waitlistRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const plans = membershipPlans.filter((plan) => plan.memberType === tab);

  function chooseTab(next: Tab) {
    setTab(next);
    setWaitlistType(next);
  }

  // Test phase: a plan button picks hotel/supplier in the waitlist form and jumps to it.
  function choosePlan(plan: MembershipPlan) {
    setWaitlistType(plan.memberType);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    emailRef.current?.focus({ preventScroll: true });
    waitlistRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
  }

  const tabs: { value: Tab; label: string; icon: "building" | "wrench" }[] = [
    { value: "hotel", label: "Independent Hotels", icon: "building" },
    { value: "supplier", label: "Suppliers & Contractors", icon: "wrench" },
  ];

  return (
    <div>
      <p className="eyebrow text-brass-600">0% commission network</p>
      <h2 className="mt-3 pr-10 font-display text-3xl text-ink-950 sm:text-4xl">Join {site.name}</h2>
      <p className="mt-3 max-w-xl text-[0.9375rem] text-ink-500">
        Only verified hotels and suppliers get access. Prices excl. VAT, billed once a year via Moneybird.
      </p>

      <div role="tablist" aria-label="Membership type" className="mt-7 grid grid-cols-2 gap-1 rounded-lg bg-sand p-1 sm:inline-grid">
        {tabs.map((t) => (
          <button
            key={t.value}
            type="button"
            role="tab"
            id={`join-tab-${t.value}`}
            aria-selected={tab === t.value}
            aria-controls="join-panel"
            onClick={() => chooseTab(t.value)}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200 sm:px-5",
              tab === t.value ? "bg-white text-ink-950 shadow-sm ring-1 ring-line" : "text-ink-500 hover:text-ink-900",
            )}
          >
            <Icon name={t.icon} size={16} className={tab === t.value ? "text-brass-500" : undefined} />
            {t.label}
          </button>
        ))}
      </div>

      <div id="join-panel" role="tabpanel" aria-labelledby={`join-tab-${tab}`} className="mt-6">
        {tab === "hotel" ? (
          <div className="grid gap-3 sm:grid-cols-3">
            {hotelTiers.map((tier, i) => (
              <div
                key={tier.name}
                className={cn("rounded-lg border p-5", i === 1 ? "border-brass-500 bg-brass-100/50" : "border-line bg-white")}
              >
                <p className="font-display text-xl text-ink-950">{tier.name}</p>
                <p className="mt-1 text-sm text-ink-500">{tier.rooms}</p>
                <p className="mt-4 flex items-baseline gap-1.5">
                  <span className="text-3xl font-semibold text-brass-600">{tier.price}</span>
                  <span className="text-sm text-ink-500">/ year</span>
                </p>
              </div>
            ))}
            <p className="flex items-start gap-2 rounded-lg bg-moss-100/60 p-4 text-sm text-ink-700 sm:col-span-3">
              <Icon name="sparkles" size={17} className="mt-0.5 shrink-0 text-moss-600" />
              <span>
                <strong className="font-semibold text-ink-950">Founding Hotels:</strong> the first 10 hotels get year 1 for €0.
                Your tier follows your number of rooms.
              </span>
            </p>
          </div>
        ) : (
          <p className="flex items-start gap-2 rounded-lg bg-moss-100/60 p-4 text-sm text-ink-700">
            <Icon name="sparkles" size={17} className="mt-0.5 shrink-0 text-moss-600" />
            <span>
              <strong className="font-semibold text-ink-950">€0 until {supplierFreeUntil}.</strong> From then: Project &amp;
              Capex Partner €19 / month or Maintenance Partner €59 / month, billed annually (1 month free).
            </span>
          </p>
        )}

        <div className={cn("mt-4 grid gap-4", plans.length > 1 && "lg:grid-cols-2")}>
          {plans.map((plan) => (
            <article
              key={plan.id}
              className={cn(
                "flex flex-col rounded-lg border p-6",
                plan.highlighted || plan.id === "supplier-contract" ? "border-brass-500/60 bg-white" : "border-line bg-white",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-2xl leading-tight text-ink-950">{plan.name}</h3>
                <span className="shrink-0 text-right">
                  <span className="block text-2xl font-semibold text-brass-600">{plan.priceLabel}</span>
                </span>
              </div>
              <p className="mt-1 text-sm text-ink-500">{plan.priceNote}</p>
              <p className="mt-3 text-sm text-ink-700">{plan.audience}</p>

              <ul className={cn("mt-5 mb-6 grid gap-2.5 text-sm text-ink-700", plans.length === 1 && "sm:grid-cols-2")}>
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
                  className={buttonClasses({ variant: plan.highlighted ? "primary" : "outline", className: "mt-auto w-full" })}
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
        <p className="mt-4 text-xs text-ink-500">0% commission for everyone. Cancel at least 3 months before the end of your contract year.</p>
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
