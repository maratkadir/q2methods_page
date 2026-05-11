import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AiChatWidget } from "@/components/AiChatWidget";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = (await getDictionary(locale)).about;
  return { title: dict.metaTitle, description: dict.metaDescription };
}

const partners = [
  {
    key: "kadir",
    name: "Marat Kadir",
    initials: "MK",
    id: "P-01",
    linkedin: "https://www.linkedin.com/in/marat-kadir-3a144117",
  },
  {
    key: "sanz",
    name: "Dr. Carlos Sanz",
    initials: "CS",
    id: "P-02",
    linkedin: "https://www.linkedin.com/in/carlossanzchacon/",
  },
  {
    key: "dubin",
    name: "Dr. Eduard Dubin",
    initials: "ED",
    id: "P-03",
    linkedin: "https://www.linkedin.com/in/dr-eduard-dubin-57998560/",
  },
  {
    key: "baltin",
    name: "Dr. Reinhard Baltin",
    initials: "RB",
    id: "P-04",
    linkedin: "https://www.linkedin.com/in/reinhard-baltin-9bbb015b/",
  },
] as const;

export default async function AboutUsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const fullDict = await getDictionary(locale);
  const dict = fullDict.about;

  return (
    <>
      {/* ===================== INTRO ===================== */}
      <div className="hero-grid hero-grid-fade">
        <section className="relative mx-auto w-full max-w-7xl overflow-hidden px-6 py-20 md:px-10 md:py-24">
          <span
            aria-hidden="true"
            className="glyph-watermark glyph-watermark--accent right-[-1rem] top-[-3rem] md:right-[4rem] md:top-[-4rem]"
          >
            Δ
          </span>

          <div className="relative max-w-4xl">
            <p className="eyebrow reveal-up reveal-up-1">{dict.badge}</p>
            <h1 className="hero-title reveal-up reveal-up-2 mt-6">
              {dict.title}
            </h1>
            <p className="text-secondary reveal-up reveal-up-3 mt-6 max-w-3xl text-lg leading-8">
              {dict.intro}
            </p>
          </div>
        </section>
      </div>

      {/* ===================== TEAM ROSTER ===================== */}
      <section className="border-t border-[var(--border-soft)] bg-[var(--bg-surface)]">
        <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-24">
          <div className="section-divider mb-10">
            <span className="section-divider__index num">§ 01</span>
            <span>Partners</span>
            <span className="num text-[var(--secondary-text)] opacity-60">
              N={partners.length}
            </span>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-[var(--border-soft)] md:grid-cols-2">
            {partners.map((partner) => (
              <article
                key={partner.name}
                className="group relative bg-[var(--bg-surface)] p-7 transition hover:bg-[#fbfdfe] md:p-8"
              >
                <div className="flex items-baseline justify-between">
                  <span className="mono-tag mono-tag--accent">
                    {partner.id}
                  </span>
                  <a
                    href={partner.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="num text-[0.7rem] text-[var(--secondary-text)] transition hover:text-[var(--accent-color)]"
                  >
                    {dict.linkedin}
                  </a>
                </div>

                <div className="mt-5 flex items-center gap-5">
                  <span className="num flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-md bg-[var(--bg-color)] text-base font-semibold text-[var(--primary-text)]">
                    {partner.initials}
                  </span>
                  <div>
                    <h2 className="text-xl font-semibold leading-tight text-[var(--primary-text)]">
                      {partner.name}
                    </h2>
                    <p className="mt-1 text-sm leading-5 text-[var(--accent-color)]">
                      {dict.partnerRoles[partner.key]}
                    </p>
                  </div>
                </div>

                <div className="my-6 h-px bg-[var(--border-soft)]" />

                <p className="text-secondary text-sm leading-7">
                  {dict.partnerBios[partner.key]}
                </p>

                <div className="mt-6 h-px w-8 bg-[var(--accent-color)] opacity-40 transition-all duration-300 group-hover:w-16 group-hover:opacity-80" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CAPABILITIES ===================== */}
      <section className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-24">
        <div className="section-divider mb-10">
          <span className="section-divider__index num">§ 02</span>
          <span>Core capabilities</span>
        </div>

        <div className="grid gap-12 lg:grid-cols-[0.85fr_2.15fr]">
          <h2 className="text-3xl font-semibold text-[var(--primary-text)] md:text-4xl">
            {dict.capabilitiesTitle}
          </h2>

          <ol className="space-y-0 border-t border-[var(--border-soft)]">
            {dict.capabilities.map((item, idx) => (
              <li
                key={item}
                className="grid grid-cols-[auto_1fr] items-baseline gap-6 border-b border-[var(--border-soft)] py-5"
              >
                <span className="num text-sm text-[var(--accent-color)] opacity-80">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <p className="text-base leading-7 text-[var(--primary-text)]">
                  {item}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===================== AI TWIN ===================== */}
      <section className="border-t border-[var(--border-soft)] bg-[var(--bg-surface)]">
        <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-24">
          <div className="section-divider mb-10">
            <span className="section-divider__index num">§ 03</span>
            <span>{dict.twinBadge}</span>
          </div>

          <div className="mb-8 max-w-3xl">
            <h2 className="text-3xl font-semibold text-[var(--primary-text)] md:text-4xl">
              {dict.twinHeading}
            </h2>
            <p className="text-secondary mt-4 text-sm leading-7">
              {dict.twinIntro}
            </p>
            {dict.twinNote && (
              <p className="text-secondary num mt-3 text-xs leading-6 italic">
                <span className="terminal-bracket">→</span> {dict.twinNote}
              </p>
            )}
          </div>

          <AiChatWidget
            starterMessage={fullDict.chat.starter}
            placeholder={dict.twinPlaceholder}
            labels={{
              thinking: fullDict.chat.thinking,
              poweredBy: fullDict.chat.poweredBy,
              send: fullDict.chat.send,
              chatFailed: fullDict.chat.chatFailed,
              unexpectedError: fullDict.chat.unexpectedError,
            }}
          />
        </div>
      </section>
    </>
  );
}
