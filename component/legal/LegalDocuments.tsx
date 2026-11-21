import { ButtonLink } from "@/component/shared/ButtonLink";
import { Container } from "@/component/shared/Container";
import { Icon } from "@/component/shared/Icon";
import { PageHero } from "@/component/shared/PageHero";
import { pageImages } from "@/lib/data/images";
import { LEGAL_VERSION, site, type LegalDoc, type LegalLang } from "@/lib/site";

const LANG_NAMES: Record<LegalLang, string> = { en: "English", nl: "Dutch", fr: "French" };

/** Privacy / terms page: the official documents as PDF, in each language they exist in. */
export function LegalDocuments({ title, intro, docs }: { title: string; intro: string; docs: LegalDoc[] }) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} image={pageImages.legal} />
      <section className="bg-cream py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-[0_6px_24px_-12px_rgba(36,30,24,0.25)] sm:p-10">
            <h2 className="font-display text-3xl text-ink-950">Our official documents</h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-700">{intro}</p>

            <ul className="mt-7 space-y-3">
              {docs.map((doc) => (
                <li key={doc.key} className="flex flex-wrap items-center gap-4 rounded-lg border border-line p-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brass-100 text-brass-600">
                    <Icon name="file" size={20} strokeWidth={1.5} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium text-ink-950">{doc.label}</span>
                    <span className="block text-sm text-ink-500">{doc.title} · PDF</span>
                  </span>
                  {/* One link per language (opens the PDF in a new tab). */}
                  <span className="flex gap-1.5">
                    {(Object.entries(doc.files) as [LegalLang, string][]).map(([lang, href]) => (
                      <a
                        key={lang}
                        href={href}
                        target="_blank"
                        rel="noopener"
                        aria-label={`${doc.label} (${LANG_NAMES[lang]}, PDF, opens in a new tab)`}
                        className="rounded-md border border-line px-2.5 py-1 text-xs font-semibold uppercase text-ink-700 transition-colors hover:border-brass-500 hover:text-brass-600"
                      >
                        {lang}
                      </a>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-ink-500">Version {LEGAL_VERSION}</p>

            <p className="mt-7 text-[0.9375rem] leading-relaxed text-ink-700">
              Questions? Email us at{" "}
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
