import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum | Q2Methods",
  description:
    "Impressum und Anbieterkennzeichnung der q²methods GmbH & Co. KG gemäß § 5 DDG.",
};

export default function ImpressumPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16 md:px-10">
      <section className="rounded-2xl border border-slate-200 bg-white/90 p-8">
        <p className="text-xs tracking-[0.2em] text-cyan-700 uppercase">
          Rechtliche Hinweise
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900 md:text-5xl">
          Impressum
        </h1>
        <p className="mt-4 text-sm text-slate-600">
          Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)
        </p>
      </section>

      <section className="mt-8 space-y-8 rounded-2xl border border-slate-200 bg-white p-8 text-sm leading-7 text-slate-700">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Anbieter
          </h2>
          <address className="mt-3 not-italic">
            q²methods GmbH &amp; Co. KG<br />
            Mergenthalerallee 73–75<br />
            65760 Eschborn<br />
            Deutschland
          </address>
        </div>

        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Vertreten durch
          </h2>
          <p className="mt-3">
            Persönlich haftende Gesellschafterin: q²methods Verwaltungsgesellschaft mbH
          </p>
          <p className="mt-1">
            Geschäftsführer der persönlich haftenden Gesellschafterin: Dr. Carlos Sanz Chacon
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-slate-900">Kontakt</h2>
          <p className="mt-3">
            E-Mail:{" "}
            <a
              href="mailto:info@q2methods.de"
              className="text-cyan-700 underline-offset-2 hover:underline"
            >
              info@q2methods.de
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Registereintrag
          </h2>
          <p className="mt-3">Eintragung im Handelsregister.</p>
          <p className="mt-1">Registergericht: Amtsgericht Frankfurt am Main</p>
          <p className="mt-1">Registernummer: HRA 51808</p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-slate-900">Umsatzsteuer</h2>
          <p className="mt-3">
            Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:
          </p>
          <p className="mt-1 font-mono text-slate-900">DE344751236</p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Verbraucherstreitbeilegung / Universalschlichtungsstelle
          </h2>
          <p className="mt-3">
            Die q²methods GmbH &amp; Co. KG ist weder verpflichtet noch bereit,
            an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
            teilzunehmen.
          </p>
        </div>
      </section>
    </div>
  );
}
