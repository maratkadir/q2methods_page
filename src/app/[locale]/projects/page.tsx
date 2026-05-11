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
    <>
      {/* ===================== INTRO ===================== */}
      <div className="hero-grid hero-grid-fade">
        <section className="relative mx-auto w-full max-w-7xl overflow-hidden px-6 py-20 md:px-10 md:py-24">
          <span
            aria-hidden="true"
            className="glyph-watermark glyph-watermark--accent right-[-1rem] top-[-3rem] md:right-[4rem] md:top-[-4rem]"
          >
            Σ
          </span>

          <div className="relative max-w-4xl">
            <p className="eyebrow reveal-up reveal-up-1">{dict.badge}</p>
            <h1 className="hero-title reveal-up reveal-up-2 mt-6">
              {dict.title}
            </h1>
            <p className="text-secondary reveal-up reveal-up-3 mt-6 max-w-3xl text-lg leading-8">
              {dict.intro}
            </p>
            <p className="text-secondary reveal-up reveal-up-4 num mt-4 max-w-3xl text-xs leading-6 italic">
              <span className="terminal-bracket">→</span> {dict.disclaimer}
            </p>
          </div>
        </section>
      </div>

      {/* ===================== PROJECT GRID ===================== */}
      <section className="border-t border-[var(--border-soft)] bg-[var(--bg-surface)]">
        <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-24">
          <div className="section-divider mb-10">
            <span className="section-divider__index num">§ 01</span>
            <span>Engagement themes</span>
            <span className="num text-[var(--secondary-text)] opacity-60">
              N={projects.length}
            </span>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-[var(--border-soft)] md:grid-cols-2">
            {projects.map((project, idx) => (
              <Link
                key={project.slug}
                href={`/${locale}/projects/${project.slug}`}
                className="group relative flex flex-col bg-[var(--bg-surface)] p-7 transition hover:bg-[#fbfdfe] md:p-8"
              >
                <div className="flex items-baseline justify-between">
                  <span className="mono-tag mono-tag--accent">
                    M-{String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="num text-[0.7rem] text-[var(--secondary-text)] opacity-60">
                    {String(idx + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                  </span>
                </div>

                <h2 className="mt-5 text-xl leading-tight font-semibold text-[var(--primary-text)] transition group-hover:text-[var(--accent-color)] md:text-2xl">
                  {project.title}
                </h2>

                <p className="num mt-2 text-[0.72rem] text-[var(--accent-color)] opacity-90">
                  {project.clientType}
                </p>

                <div className="my-5 h-px bg-[var(--border-soft)]" />

                <p className="text-secondary text-sm leading-7">
                  {project.summary}
                </p>

                <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="mono-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="num text-[0.75rem] text-[var(--accent-color)] opacity-0 transition group-hover:opacity-100">
                    {dict.readMore}
                  </span>
                  <span className="h-px w-8 bg-[var(--accent-color)] opacity-40 transition-all duration-300 group-hover:w-20 group-hover:opacity-80" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
