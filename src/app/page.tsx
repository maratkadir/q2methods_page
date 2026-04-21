import Link from "next/link";

export default function Home() {
  const capabilities = [
    "Capital markets process optimization across trade lifecycle, clearing, and settlement",
    "Quant model design, independent validation, and audit-ready governance frameworks",
    "Banking risk architecture including IFRS 9, IRRBB/CSRBB, ICAAP/ILAAP integration",
    "Production-grade implementation in Python, R, Julia, and C++ ecosystems",
    "AI use-case discovery, rapid MVP delivery, and controlled production integration",
  ];

  const highlights = [
    "Hands-on expertise from quant trading desks, CCP risk, and Big Four transformation",
    "Bridge between front office, risk control, and engineering teams",
    "Independent perspective focused on measurable impact and regulator-ready outcomes",
  ];

  return (
    <div className="hero-grid">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-20 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-8">
            <p className="inline-flex rounded-full border border-cyan-700/20 bg-cyan-100 px-4 py-1 text-xs font-semibold tracking-[0.2em] text-cyan-800 uppercase">
              Enterprise meets edgy
            </p>
            <h1 className="max-w-4xl text-5xl font-bold leading-tight text-slate-950 md:text-7xl">
              Quantitative consulting for
              <span className="bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent">
                {" "}
                markets, risk, and AI
              </span>
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-700">
              Q2Methods delivers end-to-end solutions from business process
              design to mathematical model architecture and production-grade
              implementation. We solve complex problems where regulation,
              technology, and market dynamics collide.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/about-us"
                className="neon-ring rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500"
              >
                Meet Our Team
              </Link>
              <Link
                href="/projects"
                className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-cyan-500/60 hover:text-cyan-700"
              >
                Explore Projects
              </Link>
              <Link
                href="/contacts"
                className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-cyan-500/60 hover:text-cyan-700"
              >
                Contact Us
              </Link>
            </div>
            <p className="text-sm text-slate-600">
              Independent boutique quantitative consulting.
            </p>
          </div>
          <div className="neon-ring rounded-2xl border border-cyan-900/10 bg-white/80 p-6">
            <p className="text-xs tracking-[0.2em] text-cyan-700 uppercase">
              Why Clients Choose Us
            </p>
            <ul className="mt-4 space-y-4 text-sm leading-7 text-slate-700">
              {highlights.map((item) => (
                <li key={item} className="border-b border-slate-200 pb-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white p-8 backdrop-blur">
          <h2 className="text-2xl font-semibold text-slate-950">What We Deliver</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {capabilities.map((capability) => (
              <article
                key={capability}
                className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-700"
              >
                {capability}
              </article>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}
