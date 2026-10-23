"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

type Slide = { src: string; alt: string };

/** How long the cross-fade between two photos takes (ms). */
const FADE_MS = 1600;

/**
 * Hero background: photos stacked on top of each other. Every few seconds the
 * next one fades in (no sliding). Stays on the first photo for reduced motion.
 *
 * Each photo gets a slow, steady zoom-in (`hero-ken-burns`, linear) that starts
 * when it appears and keeps running while it fades out, so the movement never
 * stops, speeds up or reverses. Hidden photos are reset without animation.
 */
export function HeroSlideshow({ slides, interval = 6000 }: { slides: Slide[]; interval?: number }) {
  const [{ active, previous }, setState] = useState<{ active: number; previous: number | null }>({
    active: 0,
    previous: null,
  });
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || slides.length < 2) return;
    const timer = window.setInterval(() => {
      setState(({ active: current }) => ({ active: (current + 1) % slides.length, previous: current }));
    }, interval);
    return () => window.clearInterval(timer);
  }, [reducedMotion, slides.length, interval]);

  // The zoom lasts for the whole time a photo is visible: its own turn plus the fade-out.
  const zoom = `hero-ken-burns ${interval + FADE_MS}ms linear forwards`;

  return (
    <div className="absolute inset-0 -z-20 overflow-hidden">
      {slides.map((slide, i) => {
        const isActive = i === active;
        const isLeaving = i === previous;
        return (
          <Image
            key={slide.src}
            src={slide.src}
            alt={isActive ? slide.alt : ""}
            aria-hidden={!isActive}
            fill
            preload={i === 0}
            sizes="100vw"
            className="object-cover will-change-[opacity,transform]"
            style={{
              opacity: isActive ? 1 : 0,
              // The new photo is fully visible underneath; only the leaving photo on top
              // fades out. That way the background never shows through mid-fade.
              zIndex: isLeaving ? 2 : isActive ? 1 : 0,
              transition: isLeaving ? `opacity ${FADE_MS}ms ease-in-out` : "none",
              animation: !reducedMotion && (isActive || isLeaving) ? zoom : "none",
            }}
          />
        );
      })}
    </div>
  );
}
