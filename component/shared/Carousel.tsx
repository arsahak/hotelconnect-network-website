"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { Icon } from "./Icon";

type CarouselProps = {
  children: ReactNode;
  /** Accessible name, e.g. "Featured suppliers". */
  label: string;
  /** Autoplay delay in ms (briefing: 5–10 seconds). */
  interval?: number;
  className?: string;
  /** Where the arrows + dots sit (they render after the slides by default). */
  controlsClassName?: string;
};

/**
 * Slideshow: auto-advances, arrows + dots, swipe on touch screens.
 * Pauses on hover/focus and when the visitor prefers reduced motion.
 */
export function Carousel({
  children,
  label,
  interval = 7000,
  className,
  controlsClassName = "mt-6",
}: CarouselProps) {
  const slides = Children.toArray(children);
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const pointerStart = useRef<number | null>(null);

  const goTo = (next: number) => setIndex(((next % count) + count) % count);

  // `index` is a dependency so manual navigation restarts the timer.
  useEffect(() => {
    if (paused || reducedMotion || count < 2) return;
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % count), interval);
    return () => window.clearTimeout(timer);
  }, [paused, reducedMotion, count, interval, index]);

  const arrowClasses =
    "grid size-11 place-items-center rounded-full border border-brass-500/40 bg-white text-brass-600 transition-colors hover:border-brass-500 hover:bg-brass-500 hover:text-white";

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      className={cn("relative", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="touch-pan-y overflow-hidden"
        onPointerDown={(event) => {
          pointerStart.current = event.clientX;
        }}
        onPointerUp={(event) => {
          if (pointerStart.current === null) return;
          const distance = event.clientX - pointerStart.current;
          pointerStart.current = null;
          if (Math.abs(distance) > 50) goTo(index + (distance < 0 ? 1 : -1));
        }}
        onPointerCancel={() => {
          pointerStart.current = null;
        }}
      >
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={i !== index}
              inert={i !== index}
              className="w-full shrink-0"
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {count > 1 && (
        <div className={cn("flex items-center justify-between gap-4", controlsClassName)}>
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-current={i === index}
                className="grid h-6 place-items-center"
              >
                <span
                  className={cn(
                    "block h-2 rounded-full transition-all duration-300",
                    i === index ? "w-6 bg-brass-500" : "w-2 bg-brass-500/25 hover:bg-brass-500/50",
                  )}
                />
                <span className="sr-only">Go to slide {i + 1}</span>
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => goTo(index - 1)} className={arrowClasses}>
              <Icon name="chevron-left" size={18} />
              <span className="sr-only">Previous</span>
            </button>
            <button type="button" onClick={() => goTo(index + 1)} className={arrowClasses}>
              <Icon name="chevron-right" size={18} />
              <span className="sr-only">Next</span>
            </button>
          </div>
        </div>
      )}

      <p className="sr-only" aria-live={paused ? "polite" : "off"}>
        Slide {index + 1} of {count}
      </p>
    </section>
  );
}
