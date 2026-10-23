import { heroSlides } from "@/lib/data/home";
import { ButtonLink } from "@/component/shared/ButtonLink";
import { Container } from "@/component/shared/Container";
import { Icon } from "@/component/shared/Icon";
import { JoinButton } from "@/component/shared/JoinButton";
import { HeroSearch } from "./HeroSearch";
import { HeroSlideshow } from "./HeroSlideshow";
import { Eyebrow } from "@/component/shared/Eyebrow";

/**
 * Full-width photo hero (3 photos that fade into each other). It slides under
 * the transparent header; the search box overlaps the next section on large screens.
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
      <HeroSlideshow slides={heroSlides} />
      {/* Even shade over the photo (darker in the middle, where the centred text sits) */}
      <div className="absolute inset-0 -z-10 bg-ink-950/45" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(27,22,17,0.45),transparent_70%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-ink-950/60 to-transparent" />

      <Container className="flex flex-1 items-center justify-center pt-36 pb-10 lg:pt-28 lg:pb-28">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow tone="light" centered className="animate-hero-in [&>span]:hidden sm:[&>span]:block">
            A private B2B network for boutique hotels
          </Eyebrow>
          <h1
            id="hero-title"
            // Gilda Display has no bold weight, so a thin text-stroke makes the letters heavier.
            className="mt-5 animate-hero-in font-display text-5xl leading-[1.08] text-balance [-webkit-text-stroke:1px_currentColor] [animation-delay:120ms] sm:text-6xl lg:text-[4.25rem] lg:[-webkit-text-stroke:1.4px_currentColor]"
          >
            Less Admin, More Hospitality
          </h1>
          <p className="mx-auto mt-6 max-w-xl animate-hero-in text-[0.9375rem] leading-relaxed text-white/85 [animation-delay:240ms] sm:text-base">
            The private network where boutique hotels and verified suppliers find each other.
            Compliance, tenders, jobs and group purchasing, mostly handled automatically.
          </p>
          <div className="mt-9 flex animate-hero-in flex-col justify-center gap-3 [animation-delay:360ms] sm:flex-row">
            <JoinButton size="lg">
              Become a member
              <Icon name="arrow-right" size={17} />
            </JoinButton>
            <ButtonLink href="/hotels" variant="outline-light" size="lg">
              Book a hotel
            </ButtonLink>
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
