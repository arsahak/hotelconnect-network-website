import { Container } from "@/component/shared/Container";
import { Icon, type IconName } from "@/component/shared/Icon";
import { JoinButton } from "@/component/shared/JoinButton";
import { Eyebrow } from "@/component/shared/Eyebrow";
import { sectionTitleClasses } from "@/component/shared/SectionHeading";
import { cn } from "@/lib/cn";

const features: { icon: IconName; title: string; text: string }[] = [
  { icon: "shield-check", title: "Compliance Radar", text: "Reminders in advance" },
  { icon: "file", title: "Tenders", text: "Compare up to 3 quotes" },
  { icon: "briefcase", title: "Jobs", text: "1-click applications" },
  { icon: "zap", title: "Group Purchasing", text: "Better energy deals" },
  { icon: "wrench", title: "Repair Contacts", text: "One tap to call" },
  { icon: "book", title: "Knowledge Base", text: "Laws and official sources" },
  { icon: "tag", title: "Corporate Vouchers", text: "Business deals at hotels" },
  { icon: "building", title: "Hotel Guide", text: "Direct bookings, 0% commission" },
];

const hotelPoints = [
  "Compare up to 3 quotes for every tender",
  "Save on energy and other costs with group purchasing",
  "Direct room bookings at 0% commission",
];

const supplierPoints = [
  "An invitation for every tender in your category and region",
  "Your own profile in the supplier directory",
  "Good reviews move you up the ranking",
];

/** What the platform offers: icon grid, then a card for suppliers and one for hotels (with prices). */
export function PlatformFeatures() {
  return (
    <section aria-labelledby="platform-title" className="py-20 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="reveal lg:col-span-5">
            <Eyebrow>The platform</Eyebrow>
            <h2 id="platform-title" className={cn("mt-4 max-w-md text-ink-950", sectionTitleClasses)}>
              Everything Your Hotel Needs, in One Place
            </h2>
            <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-ink-500">
              Less time on contracts, permits and suppliers. More time for your guests.
            </p>
            <JoinButton className="mt-8">
              Become a member
              <Icon name="arrow-right" size={16} />
            </JoinButton>
          </div>

          <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-7">
            {features.map((feature) => (
              <li key={feature.title} className="reveal group flex flex-col items-center text-center">
                <span className="grid size-16 place-items-center rounded-full bg-white text-brass-500 shadow-[0_6px_20px_-10px_rgba(36,30,24,0.3)] ring-1 ring-line transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-brass-500 group-hover:text-white group-hover:ring-brass-500">
                  <Icon name={feature.icon} size={24} strokeWidth={1.5} />
                </span>
                <p className="mt-4 text-sm font-medium text-ink-900">{feature.title}</p>
                <p className="mt-1 text-xs text-ink-500">{feature.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-20 grid gap-6 lg:grid-cols-2">
          <article className="reveal flex flex-col rounded-lg bg-ink-900 p-8 text-white sm:p-10">
            <div className="flex items-center justify-between gap-4">
              <Eyebrow tone="light">For suppliers</Eyebrow>
              <span className="rounded bg-white/10 px-2 py-1 text-xs text-white/80">Free, or €49 a month</span>
            </div>
            <h3 className="heading-strong mt-4 font-display text-3xl">Get Requests, Not Cold Calls</h3>
            <ul className="mt-6 space-y-3 text-sm text-white/75">
              {supplierPoints.map((point) => (
                <li key={point} className="flex gap-2.5">
                  <Icon name="check" size={17} className="mt-0.5 shrink-0 text-brass-400" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-8">
              <JoinButton variant="light">Join as a supplier</JoinButton>
            </div>
          </article>

          <article className="reveal flex flex-col rounded-lg bg-sand p-8 sm:p-10">
            <div className="flex items-center justify-between gap-4">
              <Eyebrow>For hotels</Eyebrow>
              <span className="rounded bg-white px-2 py-1 text-xs text-ink-500 ring-1 ring-line">€499 per year</span>
            </div>
            <h3 className="heading-strong mt-4 font-display text-3xl text-ink-950">Less Admin, More Hospitality</h3>
            <ul className="mt-6 space-y-3 text-sm text-ink-700">
              {hotelPoints.map((point) => (
                <li key={point} className="flex gap-2.5">
                  <Icon name="check" size={17} className="mt-0.5 shrink-0 text-brass-500" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-8">
              <JoinButton variant="dark">Join as a hotel</JoinButton>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
