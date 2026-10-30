import type { Metadata } from "next";
import { buttonClasses } from "@/component/shared/button-styles";
import { Container } from "@/component/shared/Container";
import { Eyebrow } from "@/component/shared/Eyebrow";
import { Icon, type IconName } from "@/component/shared/Icon";
import { JoinButton } from "@/component/shared/JoinButton";
import { PageHero } from "@/component/shared/PageHero";
import { SectionHeading, sectionTitleClasses } from "@/component/shared/SectionHeading";
import { homeImages } from "@/lib/data/images";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About us",
  description: `Who is behind ${site.name}, and why we built one private place for boutique hotels and their suppliers: compliance, purchasing, staff and more.`,
  path: "/about",
});

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

const pillars: { icon: IconName; title: string; text: string }[] = [
  { icon: "shield-check", title: "Compliance in order", text: "Permits, contracts and deadlines in one overview, with a reminder before anything expires." },
  { icon: "tag", title: "Buying together", text: "Hotels join forces on energy, linen and more, and get the prices of a large chain." },
  { icon: "briefcase", title: "Staff and jobs", text: "Jobs at member hotels in one place. Candidates apply directly, without an account." },
  { icon: "users", title: "Trusted suppliers", text: "Hotels post what they need; the right suppliers hear about it and send a quote." },
];

/** About us: who is behind the platform and why (briefing §2.1). */
export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Built by Hoteliers, for Hoteliers"
        description={`${site.founders.join(" and ")} know the hotel world from the inside. ${site.name} is the platform they always wished they had.`}
        image={homeImages.about}
      />

      <section aria-labelledby="why-title" className="bg-cream py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="reveal lg:col-span-5">
            <Eyebrow>Why this platform?</Eyebrow>
            <h2 id="why-title" className={cn("mt-4 text-ink-950", sectionTitleClasses)}>
              Boutique Hotels Do Everything Themselves
            </h2>
          </div>
          <div className="reveal space-y-5 text-[0.9375rem] leading-relaxed text-ink-700 lg:col-span-7">
            <p>
              Compliance, purchasing, staff and maintenance: a boutique hotel takes care of it all, usually with a small
              team. Large chains have whole departments for that.
            </p>
            <p>
              With {site.name} we join forces. One private place where hotels and trusted suppliers find each other, and
              where everything that can be automated is automated. So there is more time for what matters most: the
              guests.
            </p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="pillars-title" className="bg-sand py-20 lg:py-28">
        <Container>
          <SectionHeading id="pillars-title" eyebrow="What we do" title="One Place for Everything" className="mb-12" />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => (
              <li key={pillar.title} className="reveal rounded-lg bg-white p-6 shadow-sm">
                <span className="grid size-11 place-items-center rounded-full bg-brass-100 text-brass-600">
                  <Icon name={pillar.icon} size={20} />
                </span>
                <h3 className="mt-5 font-display text-xl text-ink-950">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{pillar.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="founders-title" className="bg-cream py-20 lg:py-28">
        <Container>
          <SectionHeading id="founders-title" eyebrow="The founders" title="Who We Are" className="mb-12" />
          <div className="grid gap-6 md:grid-cols-2">
            {founders.map((person) => (
              <article key={person.name} className="reveal rounded-lg border border-line bg-white p-8">
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="grid size-16 place-items-center rounded-full bg-brass-100 font-display text-2xl text-brass-600"
                  >
                    {person.name[0]}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl text-ink-950">{person.name}</h3>
                    <p className="text-sm text-ink-500">{person.role}</p>
                  </div>
                </div>
                <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-700">{person.bio}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="contact-title" className="bg-cream pb-24">
        <Container>
          <div className="reveal relative isolate overflow-hidden rounded-2xl bg-ink-900 p-8 text-white sm:p-12 lg:p-16">
            <div className="pointer-events-none absolute -top-24 -right-24 -z-10 size-80 rounded-full bg-brass-500/20 blur-3xl" />
            <Eyebrow tone="light">Contact</Eyebrow>
            <h2 id="contact-title" className="heading-strong mt-4 max-w-2xl font-display text-4xl leading-tight sm:text-5xl">
              Questions? Feel Free to Get in Touch
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${site.email}`} className={buttonClasses({})}>
                <Icon name="mail" size={16} />
                {site.email}
              </a>
              <a href={site.phoneHref} className={buttonClasses({ variant: "outline-light" })}>
                <Icon name="phone" size={16} />
                {site.phone}
              </a>
              <JoinButton variant="light" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
