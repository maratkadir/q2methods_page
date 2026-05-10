import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

type Props = { params: Promise<{ locale: string }> };

export default async function Home({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = (await getDictionary(locale)).home;

  return (
    <div className="hero-grid">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-20 md:px-10">
        {/* Hero */}
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-8">
            <p className="inline-flex rounded-full border border-[var(--accent-color)]/40 bg-[var(--navbar-bg)] px-4 py-1 text-xs font-semibold tracking-[0.2em] text-[var(--accent-color)] uppercase">
              {dict.badge}
            </p>
            <h1 className="hero-title max-w-4xl leading-tight md:text-7xl">
              {dict.titleLead}
              <span className="highlight"> {dict.titleHighlight}</span>
            </h1>
            <p className="text-secondary max-w-3xl text-lg leading-8">
              {dict.intro}
            </p>
            <p className="text-secondary text-sm">{dict.introMandates}</p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${locale}/projects`}
                className="btn-action neon-ring rounded-full text-sm transition hover:brightness-105"
              >
                {dict.ctaProjects}
              </Link>
              <Link
                href={`/${locale}/contacts`}
                className="rounded-full border border-[var(--secondary-text)]/40 px-6 py-3 text-sm font-semibold text-[var(--primary-text)] transition hover:border-[var(--accent-color)] hover:text-[var(--accent-color)]"
              >
                {dict.ctaContact}
              </Link>
              <Link
                href={`/${locale}/about-us`}
                className="rounded-full border border-[var(--secondary-text)]/40 px-6 py-3 text-sm font-semibold text-[var(--primary-text)] transition hover:border-[var(--accent-color)] hover:text-[var(--accent-color)]"
              >
                {dict.ctaTeam}
              </Link>
            </div>
          </div>
          <div className="panel neon-ring rounded-2xl p-6">
            <p className="text-xs tracking-[0.2em] text-[var(--accent-color)] uppercase">
              {dict.whyTitle}
            </p>
            <ul className="mt-4 space-y-4 text-sm leading-7 text-[var(--primary-text)]">
              {dict.whyItems.map((item) => (
                <li key={item} className="border-b border-white/10 pb-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Who We Serve */}
        <section>
          <h2 className="text-2xl font-semibold text-[var(--primary-text)]">
            {dict.whoWeServeTitle}
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {dict.clientTypes.map((client) => (
              <article key={client.title} className="panel rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-[var(--primary-text)]">
                  {client.title}
                </h3>
                <p className="mt-1 text-xs tracking-wide text-[var(--accent-color)]">
                  {client.subtitle}
                </p>
                <p className="text-secondary mt-4 text-sm leading-7">
                  {client.detail}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* What We Deliver */}
        <section className="panel rounded-2xl p-8 backdrop-blur">
          <h2 className="text-2xl font-semibold text-[var(--primary-text)]">
            {dict.deliverTitle}
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {dict.capabilities.map((capability) => (
              <article
                key={capability.label}
                className="rounded-xl border border-[#e2e8f0] bg-white p-5"
              >
                <p className="text-xs font-semibold tracking-[0.2em] text-[var(--accent-color)] uppercase">
                  {capability.label}
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--primary-text)]">
                  {capability.detail}
                </p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
