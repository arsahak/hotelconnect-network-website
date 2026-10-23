"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";
import { buttonClasses } from "./button-styles";
import { Icon } from "./Icon";

const types = [
  { value: "hotel", label: "I'm a hotel" },
  { value: "supplier", label: "I'm a supplier" },
] as const;

/**
 * Email + member type form for the test-phase waitlist.
 * UI only (dummy): submitting just shows a confirmation, nothing is sent or saved.
 */
export function WaitlistForm({ className }: { className?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const id = useId();

  if (submitted) {
    return (
      <div
        role="status"
        className={cn("flex items-start gap-3 rounded-md bg-moss-100 p-4 text-sm text-moss-600", className)}
      >
        <Icon name="check" className="mt-0.5 shrink-0" />
        <p>You are on the waitlist. We will let you know as soon as sign-ups open.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
      className={cn("flex flex-col gap-4", className)}
    >
      <fieldset className="grid grid-cols-2 gap-2">
        <legend className="sr-only">What kind of member are you?</legend>
        {types.map((type, index) => (
          <label key={type.value} className="cursor-pointer">
            <input
              type="radio"
              name="type"
              value={type.value}
              defaultChecked={index === 0}
              className="peer sr-only"
            />
            <span className="flex h-11 items-center justify-center rounded-md border border-line bg-white text-sm text-ink-700 transition-colors peer-checked:border-brass-500 peer-checked:bg-brass-100/60 peer-checked:font-medium peer-checked:text-brass-700 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brass-500">
              {type.label}
            </span>
          </label>
        ))}
      </fieldset>

      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={`${id}-email`} className="sr-only">
          Email address
        </label>
        <div className="relative min-w-0 flex-1">
          <Icon
            name="mail"
            size={18}
            className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-ink-300"
          />
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Your email address"
            className="h-12 w-full rounded-md border border-line bg-white pr-4 pl-11 text-[0.9375rem] text-ink-900 outline-none transition-colors placeholder:text-ink-300 focus:border-brass-500"
          />
        </div>
        <button type="submit" className={buttonClasses({ size: "lg" })}>
          Join the waitlist
          <Icon name="arrow-right" size={17} />
        </button>
      </div>

      <p className="text-xs text-ink-500">
        We only use your email address to tell you when sign-ups open.
      </p>
    </form>
  );
}
