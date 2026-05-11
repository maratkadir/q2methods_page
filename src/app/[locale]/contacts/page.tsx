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
    <>
      {/* ===================== INTRO ===================== */}
      <div className="hero-grid hero-grid-fade">
        <section className="relative mx-auto w-full max-w-7xl overflow-hidden px-6 py-20 md:px-10 md:py-24">
          <span
            aria-hidden="true"
            className="glyph-watermark glyph-watermark--accent right-[-1rem] top-[-3rem] md:right-[4rem] md:top-[-4rem]"
          >
            α
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

      {/* ===================== CONTACT + FORM ===================== */}
      <section className="border-t border-[var(--border-soft)] bg-[var(--bg-surface)]">
        <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
            {/* Contact info */}
            <div className="flex flex-col gap-6">
              <article className="panel relative rounded-2xl p-8">
                <span className="crosshair-corner crosshair-corner--tl" />
                <span className="crosshair-corner crosshair-corner--tr" />
                <span className="crosshair-corner crosshair-corner--bl" />
                <span className="crosshair-corner crosshair-corner--br" />

                <div className="section-divider mb-6">
                  <span className="section-divider__index num">§ 01</span>
                  <span>{dict.primaryContact}</span>
                </div>

                <div className="space-y-5">
                  <div className="grid grid-cols-[auto_1fr] items-baseline gap-4">
                    <p className="num text-[0.7rem] uppercase tracking-[0.15em] text-[var(--accent-color)]">
                      {dict.name}
                    </p>
                    <p className="text-sm text-[var(--primary-text)]">
                      Marat Kadir
                    </p>
                  </div>
                  <div className="grid grid-cols-[auto_1fr] items-baseline gap-4">
                    <p className="num text-[0.7rem] uppercase tracking-[0.15em] text-[var(--accent-color)]">
                      {dict.phone}
                    </p>
                    <p className="num text-sm text-[var(--primary-text)]">
                      +49 172 7676616
                    </p>
                  </div>
                  <div className="grid grid-cols-[auto_1fr] items-baseline gap-4">
                    <p className="num text-[0.7rem] uppercase tracking-[0.15em] text-[var(--accent-color)]">
                      {dict.email}
                    </p>
                    <a
                      href="mailto:info@q2methods.de"
                      className="num text-sm text-[var(--primary-text)] transition hover:text-[var(--accent-color)]"
                    >
                      info@q2methods.de
                    </a>
                  </div>
                  <div className="grid grid-cols-[auto_1fr] items-baseline gap-4">
                    <p className="num text-[0.7rem] uppercase tracking-[0.15em] text-[var(--accent-color)]">
                      {dict.office}
                    </p>
                    <p className="num text-sm leading-6 text-[var(--primary-text)]">
                      {dict.addressValue}
                    </p>
                  </div>
                </div>
              </article>

              <article className="panel-dark rounded-2xl p-8">
                <p className="eyebrow-bare text-[var(--accent-color)]">
                  Response time
                </p>
                <p className="num mt-4 text-4xl font-medium text-white">
                  &lt; 24<span className="text-lg text-white/60">h</span>
                </p>
                <div className="mt-4 h-px w-8 bg-[var(--accent-color)] opacity-60" />
                <p className="mt-3 text-xs leading-6 text-white/65">
                  Partners respond personally within one business day.
                </p>
              </article>
            </div>

            {/* Contact form */}
            <ContactForm labels={dict.form} />
          </div>
        </div>
      </section>
    </>
  );
}
