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
    <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10">
      <section className="panel rounded-2xl p-8">
        <p className="text-xs tracking-[0.2em] text-[var(--accent-color)] uppercase">
          {dict.badge}
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-[var(--primary-text)] md:text-5xl">
          {dict.title}
        </h1>
        <p className="text-secondary mt-4 max-w-4xl text-base leading-8">
          {dict.intro}
        </p>
        {dict.languageNote && (
          <p className="text-secondary mt-3 max-w-4xl text-xs italic">
            {dict.languageNote}
          </p>
        )}
      </section>

      <div className="mt-8">
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
    </div>
  );
}
