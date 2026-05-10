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
    <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10">
      <Link
        href={`/${locale}/projects`}
        className="inline-flex items-center gap-2 text-sm text-[var(--accent-color)] hover:underline"
      >
        {dict.backToProjects}
      </Link>

      <section className="panel mt-6 rounded-2xl p-8">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--accent-color)]/40 bg-[var(--navbar-bg)] px-3 py-0.5 text-xs font-semibold tracking-[0.15em] text-[var(--accent-color)] uppercase"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="mt-4 text-4xl font-semibold text-[var(--primary-text)] md:text-5xl">
          {project.title}
        </h1>
        <p className="text-secondary mt-3 text-lg leading-8">{project.tagline}</p>
        <p className="mt-2 text-sm text-[var(--accent-color)]">
          {dict.clientType} {project.clientType}
        </p>
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="panel rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-[var(--primary-text)]">
            {dict.challengeTitle}
          </h2>
          <p className="text-secondary mt-4 text-sm leading-7">{project.challenge}</p>
        </section>

        <section className="panel rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-[var(--primary-text)]">
            {dict.approachTitle}
          </h2>
          <p className="text-secondary mt-4 text-sm leading-7">{project.approach}</p>
        </section>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="panel rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-[var(--primary-text)]">
            {dict.deliverablesTitle}
          </h2>
          <ul className="mt-4 space-y-3">
            {project.deliverables.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-7 text-[var(--primary-text)]"
              >
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--accent-color)]" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="panel rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-[var(--primary-text)]">
            {dict.outcomesTitle}
          </h2>
          <ul className="mt-4 space-y-3">
            {project.outcomes.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-7 text-[var(--primary-text)]"
              >
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--accent-color)]" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="panel mt-8 rounded-2xl p-6">
        <p className="text-sm text-[var(--secondary-text)]">
          {dict.cta}{" "}
          <Link
            href={`/${locale}/contacts`}
            className="text-[var(--accent-color)] hover:underline"
          >
            {dict.ctaLink}
          </Link>
        </p>
      </section>
    </div>
  );
}
