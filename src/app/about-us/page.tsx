const partners = [
  {
    name: "Marat Kadir",
    role: "Associate Partner | Capital Markets & AI Leadership",
    bio: "Former quant trader, risk leader, and senior manager with deep expertise in market infrastructure, model governance, and implementation of AI use cases in highly regulated environments.",
  },
  {
    name: "Dr. Carlos Sanz",
    role: "Partner | Quantitative Risk & Data Engineering",
    bio: "Specialist in credit, market, and liquidity risk parameter modeling with strong full-stack implementation capabilities for audit-ready analytics in banking and infrastructure contexts.",
  },
  {
    name: "Dr. Eduard Dubin",
    role: "Associate Partner | Portfolio Analytics & Construction",
    bio: "Senior advisor for institutional investors with broad expertise in index and factor research, risk attribution, and production rollout of investment analytics platforms.",
  },
  {
    name: "Dr. Reinhard Baltin",
    role: "Expert Network | Quantitative Risk Engineering",
    bio: "Experienced quantitative analyst and developer with decades of front-office and validation expertise in risk and valuation systems for banks and FMIs.",
  },
];

const capabilityAreas = [
  "Model architecture, validation, and model risk governance",
  "Capital markets process redesign across trading, clearing, and settlement",
  "Regulatory implementation across EMIR, MaRisk, EBA, IFRS 9, and Basel contexts",
  "Portfolio analytics, attribution, stress testing, and liquidity diagnostics",
  "Numerical engineering and robust implementation in Python, R, Julia, and C++",
  "AI use-case discovery, rapid MVP execution, and production integration",
];

export default function AboutUsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10">
      <section className="rounded-2xl border border-slate-200 bg-white/90 p-8 backdrop-blur">
        <p className="text-xs tracking-[0.2em] text-cyan-700 uppercase">
          About Us
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900 md:text-5xl">
          Practitioner-led consulting with quant depth
        </h1>
        <p className="mt-6 max-w-4xl text-base leading-8 text-slate-700">
          Q2Methods is built by practitioners who have held responsibility in
          trading, risk, clearing, and technology delivery. We combine strategic
          advisory with hands-on execution and bring high mathematical rigor to
          every engagement.
        </p>
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-2">
        {partners.map((partner) => (
          <article
            key={partner.name}
            className="rounded-2xl border border-slate-200 bg-white p-6"
          >
            <h2 className="text-xl font-semibold text-slate-900">{partner.name}</h2>
            <p className="mt-1 text-sm text-cyan-700">{partner.role}</p>
            <p className="mt-4 text-sm leading-7 text-slate-700">{partner.bio}</p>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white/90 p-8">
        <h2 className="text-2xl font-semibold text-slate-900">
          Core Capabilities
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {capabilityAreas.map((item) => (
            <div
              key={item}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700"
            >
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
