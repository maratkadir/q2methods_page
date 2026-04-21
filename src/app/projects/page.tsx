const projects = [
  {
    title: "T+1 Readiness and Post-Trade Optimization",
    detail:
      "Assessment and redesign of trade, clearing, and settlement workflows to support accelerated cycles and liquidity resilience.",
  },
  {
    title: "EMIR and FMI Risk Framework Programs",
    detail:
      "Engineering and validation of initial margin and default fund methodologies aligned with supervisory requirements.",
  },
  {
    title: "Banking Book Risk Transformation",
    detail:
      "Design and implementation of IFRS 9, IRRBB/CSRBB, and integrated ICAAP/ILAAP frameworks with robust governance controls.",
  },
  {
    title: "Portfolio Analytics Platforms for Asset Managers",
    detail:
      "Delivery of stress, liquidity, attribution, and ESG overlays with scalable analytics and decision-support dashboards.",
  },
  {
    title: "AI Acceleration for Capital Markets",
    detail:
      "Discovery, prototyping, and operationalization of high-value AI use cases with governance and model traceability by design.",
  },
];

export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10">
      <section className="rounded-2xl border border-slate-200 bg-white/90 p-8">
        <p className="text-xs tracking-[0.2em] text-cyan-700 uppercase">
          Projects
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900 md:text-5xl">
          Selected engagement themes
        </h1>
        <p className="mt-6 max-w-4xl text-base leading-8 text-slate-700">
          We tailor each engagement to client constraints, governance context,
          and system landscape. The following project categories reflect the
          types of outcomes we deliver.
        </p>
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="rounded-2xl border border-slate-200 bg-white p-6"
          >
            <h2 className="text-xl font-semibold text-slate-900">{project.title}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-700">
              {project.detail}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
