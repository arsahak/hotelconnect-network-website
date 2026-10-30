import Image from "next/image";
import { homeImages } from "@/lib/data/images";
import { Container } from "@/component/shared/Container";
import { Icon } from "@/component/shared/Icon";
import { WaitlistForm } from "@/component/shared/WaitlistForm";
import { Eyebrow } from "@/component/shared/Eyebrow";
import { ButtonLink } from "@/component/shared/ButtonLink";
import { getCachedSettings } from "@/component/shared/cached-settings";

const perks = [
  "Be the first to know when sign-ups open",
  "Early access for hotels and suppliers",
  "No spam, only one email when we open",
];

/**
 * Call to action over a photo: the waitlist during the test phase (the top
 * bar links here via #waitlist), the sign-up buttons once registration opens.
 */
export async function WaitlistCta() {
  const { testPhase } = await getCachedSettings();
  if (!testPhase) return <SignUpCta />;
  return (
    <section
      id="waitlist"
      aria-labelledby="waitlist-title"
      className="relative isolate scroll-mt-20 overflow-hidden py-20 text-white lg:py-28"
    >
      <Image src={homeImages.waitlist} alt="" fill sizes="100vw" className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-ink-950/75" />

      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="reveal">
          <Eyebrow tone="light">Test phase</Eyebrow>
          <h2 id="waitlist-title" className="heading-strong mt-4 font-display text-4xl leading-tight sm:text-5xl">
            Sign-ups Open Soon
          </h2>
          <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-white/80">
            We are testing the platform with the first ten hotels and suppliers. Join the waitlist
            and be the first to know when you can become a member.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-white/85">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-3">
                <span className="grid size-6 place-items-center rounded-full bg-brass-500 text-white">
                  <Icon name="check" size={13} strokeWidth={2.5} />
                </span>
                {perk}
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal rounded-xl bg-white p-6 text-ink-900 shadow-2xl shadow-ink-950/40 sm:p-10">
          <h3 className="heading-strong font-display text-2xl text-ink-950 sm:text-3xl">Join the waitlist</h3>
          <p className="mt-2 mb-6 text-sm text-ink-500">Tell us who you are and leave your email address.</p>
          <WaitlistForm />
        </div>
      </Container>
    </section>
  );
}

function SignUpCta() {
  return (
    <section aria-labelledby="signup-title" className="relative isolate overflow-hidden py-20 text-white lg:py-28">
      <Image src={homeImages.waitlist} alt="" fill sizes="100vw" className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-ink-950/75" />
      <Container>
        <div className="reveal mx-auto max-w-3xl text-center">
          <Eyebrow tone="light" centered>
            Become a member
          </Eyebrow>
          <h2 id="signup-title" className="heading-strong mt-4 font-display text-4xl leading-tight sm:text-5xl">
            Join the Network
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[0.9375rem] leading-relaxed text-white/80">
            Hotels and suppliers can now register. We check every new member, so the network stays trusted.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/register?type=hotel" size="lg">
              Register a hotel
              <Icon name="arrow-right" size={17} />
            </ButtonLink>
            <ButtonLink href="/register?type=supplier" variant="outline-light" size="lg">
              Register as a supplier
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
