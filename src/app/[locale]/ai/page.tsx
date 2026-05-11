import { AiChatWidget } from "@/components/AiChatWidget";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = (await getDictionary(locale)).ai;
  return { title: dict.metaTitle, description: dict.metaDescription };
}

export default async function AITwinPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const fullDict = await getDictionary(locale);
  const dict = fullDict.ai;

  return (
    <>
      {/* ===================== INTRO ===================== */}
      <div className="hero-grid hero-grid-fade">
        <section className="relative mx-auto w-full max-w-7xl overflow-hidden px-6 py-20 md:px-10 md:py-24">
          <span
            aria-hidden="true"
            className="glyph-watermark glyph-watermark--accent right-[-1rem] top-[-3rem] md:right-[4rem] md:top-[-4rem]"
          >
            μ
          </span>

          <div className="relative max-w-4xl">
            <p className="eyebrow reveal-up reveal-up-1">{dict.badge}</p>
            <h1 className="hero-title reveal-up reveal-up-2 mt-6">
              {dict.title}
            </h1>
            <p className="text-secondary reveal-up reveal-up-3 mt-6 max-w-3xl text-lg leading-8">
              {dict.intro}
            </p>
            {dict.languageNote && (
              <p className="text-secondary num reveal-up reveal-up-4 mt-4 max-w-3xl text-xs leading-6 italic">
                <span className="terminal-bracket">→</span> {dict.languageNote}
              </p>
            )}
          </div>
        </section>
      </div>

      {/* ===================== CHAT ===================== */}
      <section className="border-t border-[var(--border-soft)] bg-[var(--bg-surface)]">
        <div className="mx-auto w-full max-w-5xl px-6 py-16 md:px-10 md:py-20">
          <AiChatWidget
            starterMessage={fullDict.chat.starter}
            placeholder={fullDict.chat.placeholder}
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
