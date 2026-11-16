import { notFound } from "next/navigation";
import { getVacancyAction } from "@/app/actions/vacancy";
import { Badge } from "@/component/shared/Badge";
import { buttonClasses } from "@/component/shared/button-styles";
import { Container } from "@/component/shared/Container";
import { Icon, type IconName } from "@/component/shared/Icon";
import { Photo } from "@/component/shared/Photo";
import { TextLink } from "@/component/shared/TextLink";
import { emailApplyUrl, whatsappApplyUrl } from "@/lib/apply-links";
import { formatDate } from "@/lib/format";
import { videoEmbedUrl } from "@/lib/video";
import { JobApplicationForm } from "./JobApplicationForm";
import { employerOf } from "@/lib/employer";

/**
 * One job: details on the left, the three ways to apply on the right.
 * Visual style (briefing §3.7): the job's own photo, a video, and WhatsApp
 * first; the CV form folds away.
 */
export async function JobDetails({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const res = await getVacancyAction(slug);
  const vacancy = res.data;
  if (!vacancy) notFound();

  const visual = vacancy.style === "visual";
  const video = visual ? videoEmbedUrl(vacancy.videoUrl) : null;
  const employer = employerOf(vacancy);
  const headerPhoto = (visual && vacancy.image) || employer.image;
  const whatsappFirst = visual && Boolean(vacancy.applyWhatsapp);

  const facts: { icon: IconName; label: string; value: string }[] = [
    { icon: "building", label: employer.label, value: employer.name },
    { icon: "map-pin", label: "Location", value: [vacancy.city, vacancy.region].filter(Boolean).join(", ") },
    { icon: "briefcase", label: "Department", value: vacancy.category },
    { icon: "clock", label: "Hours", value: [vacancy.employmentType, vacancy.hours].filter(Boolean).join(" · ") },
    { icon: "calendar", label: "Posted", value: formatDate(vacancy.publishedAt) },
  ];

  return (
    <>
      {/* Header */}
      <section className="relative isolate overflow-hidden bg-ink-950 text-white">
        <Photo src={headerPhoto} alt="" sizes="100vw" priority className={visual && vacancy.image ? "-z-20 opacity-60" : "-z-20 opacity-40"} />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950/90 via-ink-950/60 to-ink-950/30" />
        <Container className="py-14 sm:py-16">
          <TextLink href="/jobs" tone="light" className="[&>svg]:rotate-180 flex-row-reverse">
            All jobs
          </TextLink>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {vacancy.urgent && (
              <Badge tone="ember">
                <span className="size-1.5 rounded-full bg-ember-600" aria-hidden="true" />
                Urgent
              </Badge>
            )}
            <Badge tone="glass">{vacancy.category}</Badge>
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight [-webkit-text-stroke:0.8px_currentColor] sm:text-5xl">
            {vacancy.title}
          </h1>
          <p className="mt-3 text-white/80">
            {employer.name} · {vacancy.city}
          </p>
        </Container>
      </section>

      <section className="bg-cream py-14 lg:py-20">
        <Container className="grid gap-10 lg:grid-cols-12">
          {/* About the job */}
          <div className="lg:col-span-7">
            <ul className="grid gap-4 rounded-xl bg-white p-6 shadow-[0_6px_24px_-12px_rgba(36,30,24,0.25)] sm:grid-cols-2">
              {facts.map((fact) => (
                <li key={fact.label} className="flex items-start gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brass-100 text-brass-600">
                    <Icon name={fact.icon} size={17} />
                  </span>
                  <span>
                    <span className="block text-xs text-ink-500">{fact.label}</span>
                    <span className="block text-sm font-medium text-ink-900">{fact.value}</span>
                  </span>
                </li>
              ))}
            </ul>

            {video && (
              <div className="mt-10 aspect-video overflow-hidden rounded-xl bg-ink-950 shadow-[0_10px_40px_-18px_rgba(27,22,17,0.45)]">
                <iframe
                  src={video}
                  title={`Video: ${vacancy.title} at ${employer.name}`}
                  className="h-full w-full"
                  loading="lazy"
                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            )}

            <h2 className="mt-10 font-display text-3xl text-ink-950">About the job</h2>
            {vacancy.description ? (
              // Rich text, cleaned by the API when saved (bold, italic, lists, links only).
              <div className="job-text mt-4 text-[0.9375rem] leading-relaxed text-ink-700" dangerouslySetInnerHTML={{ __html: vacancy.description }} />
            ) : (
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-700">The hotel will tell you more when you get in touch.</p>
            )}
          </div>

          {/* Apply */}
          <aside className="lg:col-span-5">
            <div className="rounded-xl bg-white p-6 shadow-[0_10px_40px_-18px_rgba(27,22,17,0.35)] ring-1 ring-line sm:p-8 lg:sticky lg:top-28">
              <h2 className="font-display text-2xl text-ink-950">Apply in one click</h2>
              <p className="mt-1 text-sm text-ink-500">Send a message straight to {employer.name}.</p>
              {whatsappFirst && (
                <a
                  href={whatsappApplyUrl(vacancy)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClasses({ size: "lg", className: "mt-5 w-full" })}
                >
                  <Icon name="chat" size={19} />
                  Apply via WhatsApp
                  <span className="sr-only">(opens WhatsApp)</span>
                </a>
              )}
              <div className={whatsappFirst ? "mt-2 grid gap-2" : "mt-5 grid gap-2 sm:grid-cols-2"}>
                {vacancy.applyWhatsapp && !whatsappFirst && (
                  <a
                    href={whatsappApplyUrl(vacancy)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClasses({ className: "w-full" })}
                  >
                    <Icon name="chat" size={17} />
                    WhatsApp
                    <span className="sr-only">(opens WhatsApp)</span>
                  </a>
                )}
                <a href={emailApplyUrl(vacancy)} className={buttonClasses({ variant: "outline", className: "w-full" })}>
                  <Icon name="mail" size={17} />
                  Email
                </a>
              </div>

              {visual ? (
                <details className="group mt-6 border-t border-line pt-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-ink-700 [&::-webkit-details-marker]:hidden">
                    Or send your CV
                    <Icon name="chevron-down" size={17} className="transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="mt-5">
                    <JobApplicationForm slug={vacancy.slug} hotelName={employer.name} />
                  </div>
                </details>
              ) : (
                <>
                  <div className="my-7 flex items-center gap-3 text-xs tracking-[0.2em] text-ink-300 uppercase">
                    <span className="h-px flex-1 bg-line" />
                    or send your CV
                    <span className="h-px flex-1 bg-line" />
                  </div>
                  <JobApplicationForm slug={vacancy.slug} hotelName={employer.name} />
                </>
              )}
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
