"use client";

import { useState, type ReactNode } from "react";
import { site } from "@/lib/site";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "./button-styles";
import { Icon } from "./Icon";
import { Modal } from "./Modal";

/** "About us" button. Opens a popup about the founders and contact details. */
export function AboutButton({
  children = "About us",
  variant = "outline",
  size = "md",
  className,
  unstyled = false,
}: {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Use only `className` (e.g. to look like a nav link). */
  unstyled?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={unstyled ? className : buttonClasses({ variant, size, className })}
      >
        {children}
      </button>
      <Modal open={open} onClose={() => setOpen(false)} label="About us">
        <AboutContent />
      </Modal>
    </>
  );
}

// TODO: replace with the final text and photos from Hamid and Maaike.
const founders = [
  {
    name: "Hamid",
    role: "Co-founder",
    bio: "Years of experience in hotel management. Knows first-hand how much time permits, contracts and suppliers take.",
  },
  {
    name: "Maaike",
    role: "Co-founder",
    bio: "Builds the network of hotels and suppliers, and makes sure group purchasing delivers real savings.",
  },
];

function AboutContent() {
  return (
    <div>
      <p className="eyebrow text-brass-600">About us</p>
      <h2 className="mt-3 pr-10 font-display text-3xl text-ink-950 sm:text-4xl">
        Built by hoteliers, for hoteliers
      </h2>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {founders.map((person) => (
          <div key={person.name} className="rounded-lg border border-line p-5">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="grid size-12 place-items-center rounded-full bg-brass-100 font-display text-xl text-brass-600"
              >
                {person.name[0]}
              </span>
              <div>
                <p className="font-display text-xl text-ink-950">{person.name}</p>
                <p className="text-sm text-ink-500">{person.role}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-700">{person.bio}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="font-display text-2xl text-ink-950">Why this platform?</h3>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-700">
          Boutique hotels do everything themselves: compliance, purchasing, staff and maintenance.
          Large chains have whole departments for that. With {site.name} we join forces: one
          private place where hotels and trusted suppliers find each other, and where everything
          that can be automated is automated.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-4 rounded-lg bg-sand p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-medium text-ink-900">Questions? Feel free to get in touch.</p>
        <div className="flex flex-wrap gap-2">
          <a href={`mailto:${site.email}`} className={buttonClasses({ size: "sm" })}>
            <Icon name="mail" size={16} />
            {site.email}
          </a>
          <a href={site.phoneHref} className={buttonClasses({ variant: "outline", size: "sm" })}>
            <Icon name="phone" size={16} />
            {site.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
