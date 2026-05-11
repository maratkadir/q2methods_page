import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSlugs, getProject } from "@/lib/projects";
import type { Metadata } from "next";
import { isLocale, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const project = getProject(slug, locale);
  if (!project) return {};
  return {
    title: `${project.title} | Q2Methods`,
    description: project.summary,
  };
}

export function generateStaticParams() {
  const slugs = getAllSlugs();
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const project = getProject(slug, locale);
  if (!project) notFound();
  const dict = (await getDictionary(locale)).projectDetail;

  return (
    <>
      {/* ===================== HEADER ===================== */}
      <div className="hero-grid hero-grid-fade">
        <section className="relative mx-auto w-full max-w-7xl overflow-hidden px-6 py-16 md:px-10 md:py-20">
          <span
            aria-hidden="true"
            className="glyph-watermark glyph-watermark--accent right-[-1rem] top-[-4rem] md:right-[4rem] md:top-[-5rem]"
          >
            β
          </span>

          <Link
            href={`/${locale}/projects`}
            className="link-accent num inline-flex items-center gap-2 text-xs"
          >
            {dict.backToProjects}
          </Link>

          <div className="relative mt-8 max-w-5xl">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {project.tags.map((tag) => (
                <span key={tag} className="mono-tag mono-tag--accent">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="hero-title mt-8">{project.title}</h1>

            <p className="text-secondary mt-6 max-w-3xl text-lg leading-8">
              {project.tagline}
            </p>

            <p className="num mt-6 text-xs text-[var(--accent-color)] opacity-90">
              <span className="text-[var(--secondary-text)]">
                {dict.clientType}
              </span>{" "}
              {project.clientType}
            </p>
          </div>
        </section>
      </div>

      {/* ===================== CHALLENGE / APPROACH ===================== */}
      <section className="border-t border-[var(--border-soft)] bg-[var(--bg-surface)]">
        <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-24">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-[var(--border-soft)] lg:grid-cols-2">
            <article className="bg-[var(--bg-surface)] p-8 md:p-10">
              <div className="section-divider mb-6">
                <span className="section-divider__index num">§ 01</span>
                <span>{dict.challengeTitle}</span>
              </div>
              <p className="text-secondary text-base leading-8">
                {project.challenge}
              </p>
            </article>

            <article className="bg-[var(--bg-surface)] p-8 md:p-10">
              <div className="section-divider mb-6">
                <span className="section-divider__index num">§ 02</span>
                <span>{dict.approachTitle}</span>
              </div>
              <p className="text-secondary text-base leading-8">
                {project.approach}
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ===================== DELIVERABLES / OUTCOMES ===================== */}
      <section className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-24">
        <div className="grid gap-8 lg:grid-cols-2">
          <article className="panel rounded-2xl p-8 md:p-10">
            <div className="section-divider mb-6">
              <span className="section-divider__index num">§ 03</span>
              <span>{dict.deliverablesTitle}</span>
            </div>
            <ol className="space-y-0 border-t border-[var(--border-soft)]">
              {project.deliverables.map((item, idx) => (
                <li
                  key={item}
                  className="grid grid-cols-[auto_1fr] items-baseline gap-5 border-b border-[var(--border-soft)] py-4 last:border-b-0"
                >
                  <span className="num text-sm text-[var(--accent-color)] opacity-80">
                    D.{String(idx + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-7 text-[var(--primary-text)]">
                    {item}
                  </p>
                </li>
              ))}
            </ol>
          </article>

          <article className="panel neon-ring rounded-2xl p-8 md:p-10">
            <div className="section-divider mb-6">
              <span className="section-divider__index num">§ 04</span>
              <span>{dict.outcomesTitle}</span>
            </div>
            <ol className="space-y-0 border-t border-[var(--border-soft)]">
              {project.outcomes.map((item, idx) => (
                <li
                  key={item}
                  className="grid grid-cols-[auto_1fr] items-baseline gap-5 border-b border-[var(--border-soft)] py-4 last:border-b-0"
                >
                  <span className="num text-sm text-[var(--accent-color)]">
                    R.{String(idx + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-7 text-[var(--primary-text)]">
                    {item}
                  </p>
                </li>
              ))}
            </ol>
          </article>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="border-t border-[var(--border-soft)] bg-[var(--bg-surface)]">
        <div className="mx-auto w-full max-w-7xl px-6 py-14 md:px-10">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <p className="text-sm text-[var(--secondary-text)]">
              {dict.cta}
            </p>
            <Link
              href={`/${locale}/contacts`}
              className="btn-action neon-ring"
            >
              {dict.ctaLink}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
