import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";

type Props = { params: Promise<{ locale: string }> };

export const metadata: Metadata = {
  title: "Impressum | Q2Methods",
  description:
    "Impressum und Anbieterkennzeichnung der q²methods GmbH & Co. KG gemäß § 5 DDG.",
};

const entries = [
  {
    id: "01",
    title: "Anbieter",
    body: (
      <address className="not-italic num text-sm leading-7 text-[var(--primary-text)]">
        q²methods GmbH &amp; Co. KG
        <br />
        Mergenthalerallee 73–75
        <br />
        65760 Eschborn
        <br />
        Deutschland
      </address>
    ),
  },
  {
    id: "02",
    title: "Vertreten durch",
    body: (
      <div className="space-y-1.5 text-sm leading-7 text-[var(--primary-text)]">
        <p>
          Persönlich haftende Gesellschafterin: q²methods Verwaltungsgesellschaft mbH
        </p>
        <p>
          Geschäftsführer der persönlich haftenden Gesellschafterin: Dr. Carlos
          Sanz Chacon
        </p>
      </div>
    ),
  },
  {
    id: "03",
    title: "Kontakt",
    body: (
      <p className="text-sm leading-7 text-[var(--primary-text)]">
        E-Mail:{" "}
        <a
          href="mailto:info@q2methods.de"
          className="link-accent num"
        >
          info@q2methods.de
        </a>
      </p>
    ),
  },
  {
    id: "04",
    title: "Registereintrag",
    body: (
      <div className="space-y-1.5 text-sm leading-7 text-[var(--primary-text)]">
        <p>Eintragung im Handelsregister.</p>
        <p>
          <span className="num text-[0.72rem] uppercase tracking-[0.15em] text-[var(--accent-color)]">
            Registergericht
          </span>{" "}
          Amtsgericht Frankfurt am Main
        </p>
        <p>
          <span className="num text-[0.72rem] uppercase tracking-[0.15em] text-[var(--accent-color)]">
            Registernummer
          </span>{" "}
          <span className="num">HRA 51808</span>
        </p>
      </div>
    ),
  },
  {
    id: "05",
    title: "Umsatzsteuer",
    body: (
      <div className="space-y-1.5 text-sm leading-7 text-[var(--primary-text)]">
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:
        </p>
        <p className="num text-[var(--primary-text)]">DE344751236</p>
      </div>
    ),
  },
  {
    id: "06",
    title: "Verbraucherstreitbeilegung / Universalschlichtungsstelle",
    body: (
      <p className="text-sm leading-7 text-[var(--primary-text)]">
        Die q²methods GmbH &amp; Co. KG ist weder verpflichtet noch bereit, an
        Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
        teilzunehmen.
      </p>
    ),
  },
];

export default async function ImpressumPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <>
      <div className="hero-grid hero-grid-fade">
        <section className="relative mx-auto w-full max-w-4xl overflow-hidden px-6 py-16 md:px-10 md:py-20">
          <p className="eyebrow">Rechtliche Hinweise</p>
          <h1 className="hero-title mt-6">Impressum</h1>
          <p className="text-secondary num mt-6 max-w-3xl text-xs leading-6">
            <span className="terminal-bracket">→</span> Angaben gemäß § 5
            Digitale-Dienste-Gesetz (DDG)
          </p>
        </section>
      </div>

      <section className="border-t border-[var(--border-soft)] bg-[var(--bg-surface)]">
        <div className="mx-auto w-full max-w-4xl px-6 py-16 md:px-10 md:py-20">
          <ol className="border-t border-[var(--border-soft)]">
            {entries.map((entry) => (
              <li
                key={entry.id}
                className="grid grid-cols-[auto_1fr] items-baseline gap-6 border-b border-[var(--border-soft)] py-7 md:gap-10"
              >
                <span className="num text-sm text-[var(--accent-color)] opacity-80">
                  § {entry.id}
                </span>
                <div>
                  <h2 className="text-base font-semibold text-[var(--primary-text)]">
                    {entry.title}
                  </h2>
                  <div className="mt-3">{entry.body}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
