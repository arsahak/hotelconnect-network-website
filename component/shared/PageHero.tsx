import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";

/**
 * Top banner of every inner page: a dimmed photo with eyebrow, title, text and
 * optional buttons — a shorter version of the homepage hero.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  image: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950 text-white">
      <Image src={image} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-ink-950/65" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950/70 via-ink-950/30 to-transparent" />

      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-2xl">
          <Eyebrow tone="light" className="animate-hero-in">
            {eyebrow}
          </Eyebrow>
          <h1 className="mt-4 animate-hero-in font-display text-4xl leading-[1.1] text-balance [-webkit-text-stroke:0.8px_currentColor] [animation-delay:100ms] sm:text-5xl lg:text-[3.5rem]">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-xl animate-hero-in text-[0.9375rem] leading-relaxed text-white/80 [animation-delay:200ms] sm:text-base">
              {description}
            </p>
          )}
          {children && (
            <div className="mt-8 flex animate-hero-in flex-col gap-3 [animation-delay:300ms] sm:flex-row">{children}</div>
          )}
        </div>
      </Container>
    </section>
  );
}
