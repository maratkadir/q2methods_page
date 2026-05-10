import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = (await getDictionary(locale)).contacts;
  return { title: dict.metaTitle, description: dict.metaDescription };
}

export default async function ContactsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = (await getDictionary(locale)).contacts;

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        {/* Contact info */}
        <div className="flex flex-col gap-6">
          <article className="panel rounded-2xl p-8">
            <p className="text-xs tracking-[0.2em] text-[var(--accent-color)] uppercase">
              {dict.badge}
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-[var(--primary-text)] md:text-5xl">
              {dict.title}
            </h1>
            <p className="text-secondary mt-6 text-base leading-8">
              {dict.intro}
            </p>
          </article>

          <article className="panel rounded-2xl p-8">
            <h2 className="text-xl font-semibold text-[var(--primary-text)]">
              {dict.primaryContact}
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--primary-text)]">
              <p>
                <span className="text-[var(--accent-color)]">{dict.name} </span>
                Marat Kadir
              </p>
              <p>
                <span className="text-[var(--accent-color)]">{dict.phone} </span>
                +49 172 7676616
              </p>
              <p>
                <span className="text-[var(--accent-color)]">{dict.email} </span>
                info@q2methods.de
              </p>
              <p>
                <span className="text-[var(--accent-color)]">{dict.office} </span>
                {dict.addressValue}
              </p>
            </div>
          </article>
        </div>

        {/* Contact form */}
        <ContactForm labels={dict.form} />
      </div>
    </div>
  );
}
