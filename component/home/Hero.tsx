import Image from "next/image";
import { heroImage } from "@/lib/data/images";
import { site } from "@/lib/site";
import { ButtonLink } from "@/component/shared/ButtonLink";
import { Container } from "@/component/shared/Container";
import { Icon } from "@/component/shared/Icon";
import { JoinButton } from "@/component/shared/JoinButton";
import { HeroSearch } from "./HeroSearch";
import { Eyebrow } from "@/component/shared/Eyebrow";

/**
 * Full-width hero with one calm photo. It slides under the transparent header;
 * the search box overlaps the next section on large screens.
 */
export function Hero() {
  return (
    // Header = 5rem row + 1px bottom border, so pull up by exactly that much.
    // On large screens the search box hangs half over the next section. The hero is
    // sized to the screen minus ~8rem (test bar + lower half of the box + some space),
    // so the whole box is still visible without scrolling.
    <section
      aria-labelledby="hero-title"
      className="relative isolate z-20 -mt-[calc(5rem_+_1px)] flex flex-col bg-ink-950 text-white lg:min-h-[calc(100svh_-_8rem)]"
    >
      <Image
        src={heroImage.src}
        alt={heroImage.alt}
        fill
        preload
        sizes="100vw"
        className="-z-20 object-cover"
      />
      {/* Even shade over the photo (darker in the middle, where the centred text sits) */}
      <div className="absolute inset-0 -z-10 bg-ink-950/45" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(27,22,17,0.45),transparent_70%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-ink-950/60 to-transparent" />

      <Container className="flex flex-1 items-center justify-center pt-36 pb-10 lg:pt-28 lg:pb-28">
        <div className="mx-auto max-w-4xl text-center">
          <h1
            id="hero-title"
            // Gilda Display has no bold weight, so a thin text-stroke makes the letters heavier.
            className="animate-hero-in font-display text-[2.5rem] leading-[1.1] text-balance [-webkit-text-stroke:1px_currentColor] sm:text-6xl lg:text-[4rem] lg:[-webkit-text-stroke:1.4px_currentColor]"
          >
            Less admin, full compliance, and more time for your guests.
          </h1>
          <Eyebrow tone="light" centered className="mt-6 animate-hero-in [animation-delay:120ms]">
            {site.name}
          </Eyebrow>
          <p className="mx-auto mt-5 max-w-2xl animate-hero-in text-[0.9375rem] leading-relaxed text-white/85 [animation-delay:240ms] sm:text-base">
            The digital cockpit for independent boutique hotels. Streamline daily operations for Housekeeping,
            Maintenance, Front Office, and F&amp;B — stay 100% inspection-proof, and join our 0% Commission Hotel
            Network.
          </p>
          {/* Master Briefing v4: Log in and Join live here, not in the header. */}
          <div className="mt-9 flex animate-hero-in flex-col justify-center gap-3 [animation-delay:360ms] sm:flex-row sm:flex-wrap">
            <ButtonLink href="/login" variant="outline-light" size="lg">
              <Icon name="lock" size={17} />
              Log in
            </ButtonLink>
            <ButtonLink href="/hotels" variant="outline-light" size="lg">
              <Icon name="building" size={17} />
              Book a Hotel
            </ButtonLink>
            <JoinButton size="lg">
              <Icon name="mail" size={17} />
              Join as Hotel / Supplier
            </JoinButton>
          </div>
        </div>
      </Container>

      {/* Search box: half on the photo, half on the next section (large screens) */}
      <div className="relative z-10 pb-10 lg:absolute lg:inset-x-0 lg:bottom-0 lg:translate-y-1/2 lg:pb-0">
        <Container className="lg:max-w-6xl">
          <HeroSearch />
        </Container>
      </div>
    </section>
  );
}
