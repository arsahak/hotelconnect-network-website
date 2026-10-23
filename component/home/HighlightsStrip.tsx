import { Container } from "@/component/shared/Container";
import { Icon, type IconName } from "@/component/shared/Icon";

const highlights: { icon: IconName; title: string; text: string }[] = [
  { icon: "shield-check", title: "Compliance Radar", text: "Contracts & permits with reminders" },
  { icon: "file", title: "Tenders", text: "Quotes from verified suppliers" },
  { icon: "briefcase", title: "Jobs", text: "Apply in one click via WhatsApp" },
  { icon: "zap", title: "Group Purchasing", text: "Buy energy together, save more" },
];

/** Four key features right under the hero. */
export function HighlightsStrip() {
  return (
    <section aria-label="What the platform offers" className="bg-sand py-14 lg:pt-32 lg:pb-16">
      <Container>
        <ul className="grid grid-cols-2 gap-y-10 lg:grid-cols-4 lg:divide-x lg:divide-line">
          {highlights.map((item) => (
            <li key={item.title} className="reveal flex flex-col items-center px-4 text-center">
              <Icon name={item.icon} size={36} strokeWidth={1.25} className="text-brass-500" />
              <p className="mt-4 font-display text-xl text-ink-950">{item.title}</p>
              <p className="mt-1 text-[0.8125rem] text-ink-500">{item.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
