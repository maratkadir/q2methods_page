export default function ContactsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10">
      <section className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <article className="rounded-2xl border border-slate-200 bg-white/90 p-8">
          <p className="text-xs tracking-[0.2em] text-cyan-700 uppercase">
            Contacts
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900 md:text-5xl">
            Let&apos;s build your next risk and quant advantage
          </h1>
          <p className="mt-6 text-base leading-8 text-slate-700">
            We support financial institutions, market infrastructure providers,
            and investment firms with strategic advisory and hands-on delivery.
            Reach out for project scoping, workshops, or targeted expert support.
          </p>
          <p className="mt-6 text-sm text-slate-600">
            Independent consultancy statement: Q2Methods.
          </p>
        </article>

        <article className="rounded-2xl border border-cyan-700/25 bg-cyan-50 p-8">
          <h2 className="text-2xl font-semibold text-slate-900">Primary Contact</h2>
          <div className="mt-6 space-y-4 text-sm leading-7 text-slate-700">
            <p>
              <span className="text-cyan-700">Name:</span> Marat Kadir
            </p>
            <p>
              <span className="text-cyan-700">Phone:</span> +49 172 7676616
            </p>
            <p>
              <span className="text-cyan-700">Email:</span> kadir@q2methods.de
            </p>
            <p>
              <span className="text-cyan-700">Alternative:</span>{" "}
              marat.kadir@gmail.com
            </p>
            <p>
              <span className="text-cyan-700">Languages:</span> German, English,
              French
            </p>
          </div>
        </article>
      </section>
    </div>
  );
}
