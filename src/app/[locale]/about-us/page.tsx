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
    avatarBg: "#38a169",
    linkedin: "https://www.linkedin.com/in/marat-kadir-3a144117",
  },
  {
    key: "sanz",
    name: "Dr. Carlos Sanz",
    initials: "CS",
    avatarBg: "#2a4365",
    linkedin: "https://www.linkedin.com/in/carlossanzchacon/",
  },
  {
    key: "dubin",
    name: "Dr. Eduard Dubin",
    initials: "ED",
    avatarBg: "#553c9a",
    linkedin: "https://www.linkedin.com/in/dr-eduard-dubin-57998560/",
  },
  {
    key: "baltin",
    name: "Dr. Reinhard Baltin",
    initials: "RB",
    avatarBg: "#2c7a7b",
    linkedin: "https://www.linkedin.com/in/reinhard-baltin-9bbb015b/",
  },
] as const;

export default async function AboutUsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const fullDict = await getDictionary(locale);
  const dict = fullDict.about;

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10">
      {/* Intro */}
      <section className="panel rounded-2xl p-8 backdrop-blur">
        <p className="text-xs tracking-[0.2em] text-[var(--accent-color)] uppercase">
          {dict.badge}
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-[var(--primary-text)] md:text-5xl">
          {dict.title}
        </h1>
        <p className="text-secondary mt-6 max-w-4xl text-base leading-8">
          {dict.intro}
        </p>
      </section>

      {/* Team */}
      <section className="mt-10 grid gap-5 md:grid-cols-2">
        {partners.map((partner) => (
          <article key={partner.name} className="panel rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div
                className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full text-lg font-bold text-white"
                style={{ backgroundColor: partner.avatarBg }}
              >
                {partner.initials}
              </div>
              <div className="min-w-0">
                <h2 className="text-xl font-semibold text-[var(--primary-text)]">
                  {partner.name}
                </h2>
                <p className="mt-0.5 text-sm text-[var(--accent-color)]">
                  {dict.partnerRoles[partner.key]}
                </p>
                <a
                  href={partner.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-xs text-[var(--secondary-text)] hover:text-[var(--accent-color)] transition"
                >
                  {dict.linkedin}
                </a>
              </div>
            </div>
            <p className="text-secondary mt-4 text-sm leading-7">
              {dict.partnerBios[partner.key]}
            </p>
          </article>
        ))}
      </section>

      {/* Capabilities */}
      <section className="panel mt-10 rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-[var(--primary-text)]">
          {dict.capabilitiesTitle}
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {dict.capabilities.map((item) => (
            <div
              key={item}
              className="rounded-xl border border-[#e2e8f0] bg-white p-4 text-sm leading-7 text-[var(--primary-text)]"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* AI Twin */}
      <section className="mt-10">
        <div className="mb-6">
          <p className="text-xs tracking-[0.2em] text-[var(--accent-color)] uppercase">
            {dict.twinBadge}
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[var(--primary-text)]">
            {dict.twinHeading}
          </h2>
          <p className="text-secondary mt-3 max-w-3xl text-sm leading-7">
            {dict.twinIntro}
          </p>
          {dict.twinNote && (
            <p className="text-secondary mt-2 max-w-3xl text-xs italic">
              {dict.twinNote}
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
      </section>
    </div>
  );
}
