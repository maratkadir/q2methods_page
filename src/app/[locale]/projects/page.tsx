import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectsForLocale } from "@/lib/projects";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = (await getDictionary(locale)).projects;
  return { title: dict.metaTitle, description: dict.metaDescription };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = (await getDictionary(locale)).projects;
  const projects = getProjectsForLocale(locale);

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10">
      <section className="panel rounded-2xl p-8">
        <p className="text-xs tracking-[0.2em] text-[var(--accent-color)] uppercase">
          {dict.badge}
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-[var(--primary-text)] md:text-5xl">
          {dict.title}
        </h1>
        <p className="text-secondary mt-6 max-w-4xl text-base leading-8">
          {dict.intro}
        </p>
        <p className="text-secondary mt-4 max-w-4xl text-xs leading-6 italic">
          {dict.disclaimer}
        </p>
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/${locale}/projects/${project.slug}`}
            className="panel rounded-2xl p-6 block transition hover:border-[var(--accent-color)] hover:shadow-[0_0_0_1px_rgba(56,161,105,0.4)] group"
          >
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--accent-color)]/30 px-2.5 py-0.5 text-xs text-[var(--accent-color)]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-xl font-semibold text-[var(--primary-text)] group-hover:text-[var(--accent-color)] transition">
              {project.title}
            </h2>
            <p className="text-secondary mt-1 text-xs">{project.clientType}</p>
            <p className="text-secondary mt-3 text-sm leading-7">
              {project.summary}
            </p>
            <p className="mt-4 text-sm text-[var(--accent-color)]">
              {dict.readMore}
            </p>
          </Link>
        ))}
      </section>
    </div>
  );
}
