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
      <body className="min-h-full flex flex-col">
        <header className="navbar sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
            <Link href={`/${typed}`} className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[var(--accent-color)] text-sm font-black text-[var(--accent-text)]">
                Q2
              </span>
              <span className="company-name tracking-[0.2em] uppercase">
                Q2Methods
              </span>
            </Link>
            <div className="flex items-center gap-3">
              <nav className="nav-links flex items-center gap-1">
                <Link
                  href={`/${typed}`}
                  className="transition hover:text-[var(--accent-color)]"
                >
                  {dict.nav.home}
                </Link>
                <Link
                  href={`/${typed}/about-us`}
                  className="transition hover:text-[var(--accent-color)]"
                >
                  {dict.nav.about}
                </Link>
                <Link
                  href={`/${typed}/projects`}
                  className="transition hover:text-[var(--accent-color)]"
                >
                  {dict.nav.projects}
                </Link>
                <Link
                  href={`/${typed}/contacts`}
                  className="transition hover:text-[var(--accent-color)]"
                >
                  {dict.nav.contact}
                </Link>
              </nav>
              <LanguageSwitcher
                current={typed}
                label={dict.languageSwitcher.label}
              />
            </div>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-white/10 bg-[var(--navbar-bg)]">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-6 py-8 text-xs text-[var(--secondary-text)] md:flex-row md:items-center md:justify-between md:px-10">
            <p>{dict.footer.company}</p>
            <p>{dict.footer.address}</p>
            <Link
              href={`/${typed}/impressum`}
              className="transition hover:text-[var(--accent-color)]"
            >
              {dict.nav.impressum}
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
