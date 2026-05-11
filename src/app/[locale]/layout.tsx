import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { notFound } from "next/navigation";
import "../globals.css";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type LayoutParams = { locale: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<LayoutParams>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.home.metaTitle,
    description: dict.home.metaDescription,
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<LayoutParams>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typed: Locale = locale;
  const dict = await getDictionary(typed);

  return (
    <html
      lang={typed}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* ===================== NAVBAR ===================== */}
        <header className="navbar sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
            <Link
              href={`/${typed}`}
              className="group flex items-center gap-3 transition"
            >
              <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-md bg-[var(--accent-color)] text-sm font-black text-[var(--accent-text)]">
                <span className="num">Q²</span>
              </span>
              <span className="flex flex-col leading-tight">
                <span className="company-name tracking-[0.18em] uppercase">
                  Q2Methods
                </span>
                <span className="num text-[0.6rem] uppercase tracking-[0.2em] text-white/40">
                  Quant Consulting
                </span>
              </span>
            </Link>
            <div className="flex items-center gap-5">
              <nav className="nav-links hidden items-center md:flex">
                <Link href={`/${typed}`}>{dict.nav.home}</Link>
                <Link href={`/${typed}/about-us`}>{dict.nav.about}</Link>
                <Link href={`/${typed}/projects`}>{dict.nav.projects}</Link>
                <Link href={`/${typed}/contacts`}>{dict.nav.contact}</Link>
              </nav>
              <LanguageSwitcher
                current={typed}
                label={dict.languageSwitcher.label}
              />
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        {/* ===================== FOOTER ===================== */}
        <footer className="relative overflow-hidden border-t border-white/10 bg-[var(--navbar-bg)]">
          <span
            aria-hidden="true"
            className="glyph-watermark right-[2rem] top-[-2rem] text-white"
            style={{ opacity: 0.04 }}
          >
            μ
          </span>

          <div className="mx-auto w-full max-w-7xl px-6 py-14 md:px-10">
            <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
              {/* Brand */}
              <div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[var(--accent-color)] text-sm font-black text-[var(--accent-text)]">
                    <span className="num">Q²</span>
                  </span>
                  <span className="text-white tracking-[0.18em] uppercase">
                    Q2Methods
                  </span>
                </div>
                <p className="mt-5 max-w-md text-sm leading-7 text-white/65">
                  {dict.footer.company}
                </p>
                <p className="num mt-3 text-xs text-white/45">
                  {dict.footer.address}
                </p>
              </div>

              {/* Nav */}
              <div>
                <p className="eyebrow-bare text-white/55">
                  {dict.nav.home} /
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li>
                    <Link
                      href={`/${typed}/about-us`}
                      className="text-white/75 transition hover:text-[var(--accent-color)]"
                    >
                      {dict.nav.about}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${typed}/projects`}
                      className="text-white/75 transition hover:text-[var(--accent-color)]"
                    >
                      {dict.nav.projects}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${typed}/contacts`}
                      className="text-white/75 transition hover:text-[var(--accent-color)]"
                    >
                      {dict.nav.contact}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${typed}/ai`}
                      className="text-white/75 transition hover:text-[var(--accent-color)]"
                    >
                      AI Twin
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <p className="eyebrow-bare text-white/55">Legal /</p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li>
                    <Link
                      href={`/${typed}/impressum`}
                      className="text-white/75 transition hover:text-[var(--accent-color)]"
                    >
                      {dict.nav.impressum}
                    </Link>
                  </li>
                  <li className="num text-xs text-white/40">
                    HRA 51808 · Frankfurt
                  </li>
                  <li className="num text-xs text-white/40">
                    USt-ID DE344751236
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-[0.7rem] md:flex-row md:items-center md:justify-between">
              <p className="num text-white/40">
                © {new Date().getFullYear()} q²methods GmbH &amp; Co. KG
              </p>
              <p className="num tracking-[0.18em] text-white/30 uppercase">
                σ · β · Δ · μ
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
