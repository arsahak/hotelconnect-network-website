import { Container } from "@/component/shared/Container";
import { Icon, type IconName } from "@/component/shared/Icon";
import { JoinButton } from "@/component/shared/JoinButton";
import { Eyebrow } from "@/component/shared/Eyebrow";
import { sectionTitleClasses } from "@/component/shared/SectionHeading";
import { cn } from "@/lib/cn";

// The four platform pillars (Master Briefing v4).
const features: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "shield-check",
    title: "Compliance Radar & Audit Shield",
    text: "Contracts, permits and certificates with reminders before every deadline. Legionella, HACCP and maintenance logs ready for any inspection.",
  },
  {
    icon: "users",
    title: "4-Department Floor Control",
    text: "Housekeeping, Maintenance, Front Office and F&B on one mobile app: issues, checklists and shift handovers, in every team member's own language.",
  },
  {
    icon: "file",
    title: "Procurement & Contracts",
    text: "Staff tap a product photo to request it; managers order from their partners with one tap. Every contract and notice period in one place.",
  },
  {
    icon: "building",
    title: "0% Commission Network & Tenders",
    text: "Post a tender and get quotes from verified suppliers, hire through the jobs page and take direct bookings — with zero commission.",
  },
];

/** What the platform offers: the four v4 pillars. */
export function PlatformFeatures() {
  return (
    <section aria-labelledby="platform-title" className="py-20 lg:py-28">
      <Container>
        <div className="reveal mx-auto max-w-2xl text-center">
          <Eyebrow centered>The platform</Eyebrow>
          <h2 id="platform-title" className={cn("mt-4 text-ink-950", sectionTitleClasses)}>
            Everything Your Hotel Needs, in One Place
          </h2>
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-500">
            One clear workspace for the whole hotel. Less paperwork, no inspection stress, more time for your guests.
          </p>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <li
              key={feature.title}
              className="reveal group flex flex-col rounded-lg bg-white p-7 ring-1 ring-line transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(36,30,24,0.45)] hover:ring-brass-500/50"
            >
              <span className="grid size-14 place-items-center rounded-full bg-sand text-brass-500 transition-colors duration-300 group-hover:bg-brass-500 group-hover:text-white">
                <Icon name={feature.icon} size={24} strokeWidth={1.5} />
              </span>
              <h3 className="mt-6 font-display text-xl leading-snug text-ink-950">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-500">{feature.text}</p>
            </li>
          ))}
        </ul>

        <div className="reveal mt-12 text-center">
          <JoinButton>
            Join as Hotel / Supplier
            <Icon name="arrow-right" size={16} />
          </JoinButton>
        </div>
      </Container>
    </section>
  );
}
