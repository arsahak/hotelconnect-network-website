import { ButtonLink } from "@/component/shared/ButtonLink";
import { Container } from "@/component/shared/Container";
import { Icon } from "@/component/shared/Icon";
import { PageHero } from "@/component/shared/PageHero";
import { pageImages } from "@/lib/data/images";
import { site } from "@/lib/site";

/**
 * Privacy policy / terms page until the lawyer's final text arrives
 * (briefing §8: legal documents are written by a lawyer, not by us).
 * Replace this component's body with the delivered text.
 */
export function LegalPlaceholder({ title, summary }: { title: string; summary: string }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} image={pageImages.legal} />
      <section className="bg-cream py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-[0_6px_24px_-12px_rgba(36,30,24,0.25)] sm:p-10">
            <span className="grid size-12 place-items-center rounded-full bg-brass-100 text-brass-600">
              <Icon name="file" size={22} strokeWidth={1.5} />
            </span>
            <h2 className="mt-5 font-display text-3xl text-ink-950">Being finalised</h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-700">{summary}</p>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-700">
              Questions in the meantime? Email us at{" "}
              <a href={`mailto:${site.email}`} className="text-brass-600 underline underline-offset-4">
                {site.email}
              </a>
              .
            </p>
            <ButtonLink href="/" variant="outline" className="mt-8">
              <Icon name="arrow-left" size={16} />
              Back to home
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
