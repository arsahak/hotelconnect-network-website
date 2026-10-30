"use client";

import { useActionState, useId, useState, type Ref } from "react";
import { joinWaitlistAction } from "@/app/actions/waitlist";
import { cn } from "@/lib/cn";
import { buttonClasses } from "./button-styles";
import { Icon } from "./Icon";

const types = [
  { value: "hotel", label: "I'm a hotel" },
  { value: "supplier", label: "I'm a supplier" },
] as const;

export type WaitlistType = (typeof types)[number]["value"];

type State = { done: boolean; alreadyListed?: boolean; error?: string };

/**
 * Email + member type form for the test-phase waitlist. Saved by the API
 * (POST /waitlist), which also adds the address to the mailing list.
 * Pass `type` + `onTypeChange` to choose hotel/supplier from outside (e.g. a plan button).
 */
export function WaitlistForm({
  className,
  type,
  onTypeChange,
  emailRef,
}: {
  className?: string;
  type?: WaitlistType;
  onTypeChange?: (type: WaitlistType) => void;
  emailRef?: Ref<HTMLInputElement>;
}) {
  const id = useId();
  const [ownType, setOwnType] = useState<WaitlistType>("hotel");
  const currentType = type ?? ownType;
  const changeType = onTypeChange ?? setOwnType;
  const [state, formAction, isPending] = useActionState<State, FormData>(
    async (_prev, formData) => {
      const email = String(formData.get("email") ?? "").trim();
      const type = formData.get("type") === "supplier" ? "supplier" : "hotel";
      const res = await joinWaitlistAction(email, type);
      return res.ok
        ? { done: true, alreadyListed: res.data?.alreadyListed }
        : { done: false, error: res.error };
    },
    { done: false },
  );

  if (state.done) {
    return (
      <div
        role="status"
        className={cn("flex items-start gap-3 rounded-md bg-moss-100 p-4 text-sm text-moss-600", className)}
      >
        <Icon name="check" className="mt-0.5 shrink-0" />
        <p>
          {state.alreadyListed
            ? "You were already on the waitlist. We will let you know as soon as sign-ups open."
            : "You are on the waitlist. We will let you know as soon as sign-ups open."}
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className={cn("flex flex-col gap-4", className)}
    >
      <fieldset className="grid grid-cols-2 gap-2">
        <legend className="sr-only">What kind of member are you?</legend>
        {types.map((option) => (
          <label key={option.value} className="cursor-pointer">
            <input
              type="radio"
              name="type"
              value={option.value}
              checked={currentType === option.value}
              onChange={() => changeType(option.value)}
              className="peer sr-only"
            />
            <span className="flex h-11 items-center justify-center rounded-md border border-line bg-white text-sm text-ink-700 transition-colors peer-checked:border-brass-500 peer-checked:bg-brass-100/60 peer-checked:font-medium peer-checked:text-brass-700 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brass-500">
              {option.label}
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
            ref={emailRef}
            id={`${id}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Your email address"
            className="h-12 w-full rounded-md border border-line bg-white pr-4 pl-11 text-[0.9375rem] text-ink-900 outline-none transition-colors placeholder:text-ink-300 focus:border-brass-500"
          />
        </div>
        <button type="submit" disabled={isPending} className={buttonClasses({ size: "lg" })}>
          {isPending ? "Joining…" : "Join the waitlist"}
          {!isPending && <Icon name="arrow-right" size={17} />}
        </button>
      </div>

      {state.error && (
        <p role="alert" className="rounded-md bg-ember-100 px-4 py-3 text-sm text-ember-600">
          {state.error}
        </p>
      )}

      <p className="text-xs text-ink-500">
        We only use your email address to tell you when sign-ups open.
      </p>
    </form>
  );
}
