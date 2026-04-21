import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Q2Methods | Quantitative Consulting",
  description:
    "Q2Methods delivers quantitative consulting for capital markets, risk management, and AI-enabled transformation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-950">
        <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 md:px-10">
            <Link href="/" className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-cyan-500/90 text-sm font-black text-white">
                Q2
              </span>
              <span className="text-sm font-semibold tracking-[0.2em] text-slate-900 uppercase">
                Q2Methods
              </span>
            </Link>
            <nav className="flex items-center gap-6 text-sm text-slate-700">
              <Link href="/" className="transition hover:text-cyan-700">
                Landing
              </Link>
              <Link href="/about-us" className="transition hover:text-cyan-700">
                About Us
              </Link>
              <Link href="/projects" className="transition hover:text-cyan-700">
                Projects
              </Link>
              <Link href="/ai" className="transition hover:text-cyan-700">
                AI Twin
              </Link>
              <Link href="/contacts" className="transition hover:text-cyan-700">
                Contacts
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-6 py-8 text-xs text-slate-600 md:flex-row md:items-center md:justify-between md:px-10">
            <p>Q2Methods Quantitative Consulting</p>
            <p>Independent boutique quantitative consultancy.</p>
            <Link
              href="/impressum"
              className="transition hover:text-cyan-700"
            >
              Impressum
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
