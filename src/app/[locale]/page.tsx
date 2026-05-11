import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

type Props = { params: Promise<{ locale: string }> };

const BANKING_BOOK = "banking-book-risk-transformation";
const EMIR_FMI = "emir-fmi-risk-framework";
const T1 = "t1-settlement-readiness";
const CCP = "ccp-stress-testing-liquidity";

const FRAMEWORKS: { label: string; slug: string }[] = [
  { label: "CRR", slug: BANKING_BOOK },
  { label: "MaRisk", slug: BANKING_BOOK },
  { label: "EMIR", slug: EMIR_FMI },
  { label: "Basel", slug: BANKING_BOOK },
  { label: "EBA", slug: BANKING_BOOK },
  { label: "MIFID II", slug: EMIR_FMI },
  { label: "T+1", slug: T1 },
  { label: "IFRS 9", slug: BANKING_BOOK },
  { label: "IRRBB", slug: BANKING_BOOK },
  { label: "CSRBB", slug: BANKING_BOOK },
  { label: "ICAAP", slug: BANKING_BOOK },
  { label: "ILAAP", slug: BANKING_BOOK },
  { label: "CPMI-IOSCO", slug: CCP },
];

const KPI_DATA = [
  { value: "6", unit: "", corner: "01" },
  { value: "4", unit: "", corner: "02" },
  { value: "12+", unit: "", corner: "03" },
  { value: "DACH+", unit: "EU", corner: "04" },
] as const;

const OUTCOME_DATA = [
  {
    value: "34",
    unit: "%",
    slug: "ai-acceleration-capital-markets",
    sparkline: false,
  },
  {
    value: "3d→4h",
    unit: "",
    slug: "portfolio-analytics-platform",
    sparkline: true,
  },
  {
    value: "2.5",
    unit: "FTE",
    slug: "ai-acceleration-capital-markets",
    sparkline: false,
  },
  {
    value: "8",
    unit: "wks",
    slug: "t1-settlement-readiness",
    sparkline: false,
  },
] as const;

export default async function Home({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = (await getDictionary(locale)).home;

  return (
    <>
      {/* ===================== HERO ===================== */}
      <div className="hero-grid hero-grid-fade">
        <section className="relative mx-auto w-full max-w-7xl overflow-hidden px-6 py-20 md:px-10 md:py-28">
          <span
            aria-hidden="true"
            className="glyph-watermark glyph-watermark--accent right-[-2rem] top-[-4rem] md:right-[2rem] md:top-[-6rem]"
          >
            σ
          </span>

          <div className="relative grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
            {/* Left: title block */}
            <div className="space-y-7">
              <div className="reveal-up reveal-up-1 flex items-center gap-3">
                <span className="eyebrow">{dict.badge}</span>
                <span className="text-secondary num text-[0.7rem] opacity-70">
                  / EST. 2021
                </span>
              </div>

              <h1 className="hero-title reveal-up reveal-up-2 max-w-4xl">
                {dict.titleLead}
                <span className="highlight"> {dict.titleHighlight}</span>
              </h1>

              <p className="text-secondary reveal-up reveal-up-3 max-w-2xl text-lg leading-8">
                {dict.intro}
              </p>

              <p className="text-secondary reveal-up reveal-up-4 num max-w-2xl text-xs leading-6 tracking-wide">
                <span className="terminal-bracket">→</span> {dict.introMandates}
              </p>

              <div className="reveal-up reveal-up-5 flex flex-wrap gap-3 pt-2">
                <Link
                  href={`/${locale}/projects`}
                  className="btn-action neon-ring"
                >
                  {dict.ctaProjects}
                  <span className="num opacity-80">↗</span>
                </Link>
                <Link href={`/${locale}/contacts`} className="btn-ghost">
                  {dict.ctaContact}
                </Link>
                <Link href={`/${locale}/about-us`} className="btn-ghost">
                  {dict.ctaTeam}
                </Link>
              </div>
            </div>

            {/* Right: Why Clients Choose Us panel */}
            <aside className="reveal-up reveal-up-3 panel neon-ring relative rounded-2xl p-7">
              <span className="crosshair-corner crosshair-corner--tl" />
              <span className="crosshair-corner crosshair-corner--tr" />
              <span className="crosshair-corner crosshair-corner--bl" />
              <span className="crosshair-corner crosshair-corner--br" />

              <div className="flex items-baseline justify-between">
                <p className="eyebrow-bare">{dict.whyTitle}</p>
                <span className="num text-xs text-[var(--secondary-text)] opacity-60">
                  {String(dict.whyItems.length).padStart(2, "0")}
                </span>
              </div>

              <ul className="mt-5 space-y-4">
                {dict.whyItems.map((item, idx) => (
                  <li
                    key={item}
                    className="border-b border-[var(--border-soft)] pb-4 text-sm leading-7 text-[var(--primary-text)] last:border-b-0 last:pb-0"
                  >
                    <span className="num mr-2 text-[0.7rem] text-[var(--accent-color)] opacity-70">
                      0{idx + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>
      </div>

      {/* ===================== FRAMEWORKS STRIP ===================== */}
      <section className="border-y border-[var(--border-soft)] bg-[var(--bg-surface)]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-6 py-5 md:flex-row md:items-center md:gap-8 md:px-10">
          <p className="eyebrow-bare flex items-center gap-2 whitespace-nowrap">
            <span className="text-[var(--secondary-text)]">/</span>
            {dict.framework.eyebrow}
          </p>
          <div className="tag-strip">
            {FRAMEWORKS.map((fw) => (
              <Link
                key={fw.label}
                href={`/${locale}/projects/${fw.slug}`}
                className="mono-tag mono-tag--link"
                aria-label={`${fw.label} — view related engagement`}
              >
                {fw.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== WHO WE SERVE ===================== */}
      <section className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-24">
        <div className="section-divider mb-10">
          <span className="section-divider__index num">§ 01</span>
          <span>{dict.sections.whoWeServe}</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.85fr_2.15fr] lg:gap-14">
          <div>
            <h2 className="text-3xl font-semibold text-[var(--primary-text)] md:text-4xl">
              {dict.whoWeServeTitle}
            </h2>
            <p className="text-secondary mt-4 text-sm leading-7">
              {dict.whoWeServeIntro}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {dict.clientTypes.map((client, idx) => (
              <article
                key={client.title}
                className="panel panel-hover relative rounded-2xl p-6"
              >
                <span className="num absolute right-5 top-5 text-[0.7rem] text-[var(--secondary-text)] opacity-60">
                  0{idx + 1} / 03
                </span>
                <h3 className="pr-12 text-lg font-semibold text-[var(--primary-text)]">
                  {client.title}
                </h3>
                <p className="num mt-2 text-[0.72rem] leading-5 text-[var(--accent-color)]">
                  {client.subtitle}
                </p>
                <div className="my-5 h-px bg-[var(--border-soft)]" />
                <p className="text-secondary text-sm leading-7">
                  {client.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== WHAT WE DELIVER ===================== */}
      <section className="border-t border-[var(--border-soft)] bg-[var(--bg-surface)]">
        <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-24">
          <div className="section-divider mb-10">
            <span className="section-divider__index num">§ 02</span>
            <span>{dict.sections.whatWeDeliver}</span>
          </div>

          <div className="mb-10 max-w-2xl">
            <h2 className="text-3xl font-semibold text-[var(--primary-text)] md:text-4xl">
              {dict.deliverTitle}
            </h2>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-[var(--border-soft)] md:grid-cols-2 lg:grid-cols-3">
            {dict.capabilities.map((capability, idx) => (
              <article
                key={capability.label}
                className="group relative bg-[var(--bg-surface)] p-6 transition hover:bg-[#fbfdfe]"
              >
                <span className="num absolute right-5 top-5 text-[0.7rem] text-[var(--secondary-text)] opacity-50">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <p className="eyebrow">{capability.label}</p>
                <p className="mt-4 text-sm leading-7 text-[var(--primary-text)]">
                  {capability.detail}
                </p>
                <div className="mt-5 h-px w-8 bg-[var(--accent-color)] opacity-40 transition-all duration-300 group-hover:w-16 group-hover:opacity-80" />
              </article>
            ))}
            <div className="hidden bg-[var(--bg-surface)] lg:block" />
          </div>
        </div>
      </section>

      {/* ===================== KPI / FIRMOGRAPHICS ===================== */}
      <section className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-24">
        <div className="section-divider mb-10">
          <span className="section-divider__index num">§ 03</span>
          <span>{dict.sections.atAGlance}</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {KPI_DATA.map((kpi, idx) => (
            <div key={dict.kpiLabels[idx]} className="kpi-tile">
              <span className="kpi-tile__corner">/{kpi.corner}</span>
              <div className="flex items-baseline">
                <span className="kpi-tile__value">{kpi.value}</span>
                {kpi.unit && (
                  <span className="kpi-tile__unit">{kpi.unit}</span>
                )}
              </div>
              <div className="mt-4 h-px w-6 bg-[var(--accent-color)] opacity-50" />
              <p className="mt-3 text-[0.78rem] leading-5 text-[var(--secondary-text)]">
                {dict.kpiLabels[idx]}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== SELECTED OUTCOMES ===================== */}
      <section className="border-t border-[var(--border-soft)] bg-[var(--bg-surface)]">
        <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-24">
          <div className="section-divider mb-10">
            <span className="section-divider__index num">§ 04</span>
            <span>{dict.sections.selectedOutcomes}</span>
          </div>

          <div className="mb-10 grid gap-8 md:grid-cols-[1fr_1.5fr]">
            <h2 className="text-3xl font-semibold text-[var(--primary-text)] md:text-4xl">
              {dict.outcomes.heading}
            </h2>
            <p className="text-secondary self-end text-sm leading-7">
              {dict.outcomes.intro}
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-[var(--border-soft)] sm:grid-cols-2 lg:grid-cols-4">
            {OUTCOME_DATA.map((o, idx) => (
              <Link
                key={o.slug + idx}
                href={`/${locale}/projects/${o.slug}`}
                className="group relative bg-[var(--bg-surface)] p-6 transition hover:bg-[#fbfdfe]"
              >
                <span className="num absolute right-5 top-5 text-[0.7rem] text-[var(--secondary-text)] opacity-50">
                  {String(idx + 1).padStart(2, "0")} / 04
                </span>
                <div className="flex items-baseline">
                  <span className="kpi-tile__value">{o.value}</span>
                  {o.unit && (
                    <span className="kpi-tile__unit">{o.unit}</span>
                  )}
                </div>

                {o.sparkline ? (
                  <svg
                    viewBox="0 0 120 28"
                    className="mt-3 h-7 w-28"
                    aria-hidden="true"
                  >
                    <path
                      className="sparkline sparkline--draw"
                      d="M2,8 L20,8 L22,8 L40,9 L42,9 L58,9 L60,10 L78,10 L80,22 L82,24 L100,24 L118,24"
                    />
                  </svg>
                ) : (
                  <div className="mt-4 h-px w-6 bg-[var(--accent-color)] opacity-50" />
                )}

                <p className="mt-3 text-[0.78rem] leading-5 text-[var(--secondary-text)] transition group-hover:text-[var(--primary-text)]">
                  {dict.outcomes.labels[idx]}
                </p>
                <span className="num mt-3 inline-block text-[0.65rem] text-[var(--accent-color)] opacity-0 transition group-hover:opacity-100">
                  {dict.outcomes.view}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CLOSING CTA ===================== */}
      <section className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-24">
        <div className="panel relative overflow-hidden rounded-2xl p-10 md:p-14">
          <div className="relative grid gap-8 md:grid-cols-[1.4fr_0.6fr] md:items-center">
            <div>
              <p className="eyebrow">{dict.closingCta.eyebrow}</p>
              <h2 className="mt-4 text-3xl font-semibold text-[var(--primary-text)] md:text-4xl">
                {dict.closingCta.heading}
              </h2>
              <p className="text-secondary mt-4 max-w-xl text-sm leading-7">
                {dict.closingCta.intro}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link
                href={`/${locale}/contacts`}
                className="btn-action neon-ring"
              >
                {dict.closingCta.contact}
                <span className="num opacity-80">↗</span>
              </Link>
              <Link href={`/${locale}/ai`} className="btn-ghost">
                {dict.closingCta.twin}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
