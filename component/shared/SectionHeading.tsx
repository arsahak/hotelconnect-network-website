import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Optional element on the right (e.g. a "View all" button). */
  action?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  id?: string;
  className?: string;
};

/** Shared classes for section titles, so manual headings match SectionHeading. */
export const sectionTitleClasses =
  "heading-strong font-display text-3xl leading-[1.15] text-balance sm:text-4xl lg:text-[2.625rem]";

/** Section heading: small uppercase eyebrow, serif title, short description. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  tone = "dark",
  align = "left",
  id,
  className,
}: SectionHeadingProps) {
  const light = tone === "light";
  const centered = align === "center";

  return (
    <div
      className={cn(
        "reveal flex flex-col gap-6",
        centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", centered && "mx-auto")}>
        {eyebrow && (
          <Eyebrow tone={tone} centered={centered} className="mb-4">
            {eyebrow}
          </Eyebrow>
        )}
        <h2 id={id} className={cn(sectionTitleClasses, light ? "text-white" : "text-ink-950")}>
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "mt-4 text-[0.9375rem] leading-relaxed text-pretty",
              light ? "text-white/75" : "text-ink-500",
            )}
          >
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
