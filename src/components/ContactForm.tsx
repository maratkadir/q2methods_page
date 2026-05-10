"use client";

import { FormEvent, useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

type Labels = {
  heading: string;
  nameLabel: string;
  emailLabel: string;
  companyLabel: string;
  messageLabel: string;
  sending: string;
  send: string;
  successTitle: string;
  successBody: string;
  unexpectedError: string;
  submissionFailed: string;
};

const FALLBACK_LABELS: Labels = {
  heading: "Send a Message",
  nameLabel: "Name *",
  emailLabel: "Email *",
  companyLabel: "Organisation",
  messageLabel: "Message *",
  sending: "Sending…",
  send: "Send Message",
  successTitle: "Thank you.",
  successBody: "We will review your message and respond within one business day.",
  unexpectedError: "Unexpected error.",
  submissionFailed: "Submission failed.",
};

type Props = {
  labels?: Labels;
};

export function ContactForm({ labels }: Props) {
  const t = labels ?? FALLBACK_LABELS;
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setErrorMsg(null);

    const form = event.currentTarget;
    const payload = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = (await res.json()) as { error?: string };
        throw new Error(body.error ?? t.submissionFailed);
      }
      setState("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : t.unexpectedError);
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="panel rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-3">
        <p className="text-2xl font-semibold text-[var(--primary-text)]">{t.successTitle}</p>
        <p className="text-secondary text-sm leading-7">{t.successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="panel rounded-2xl p-8 space-y-5">
      <h2 className="text-2xl font-semibold text-[var(--primary-text)]">{t.heading}</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-xs font-semibold tracking-[0.15em] text-[var(--accent-color)] uppercase">
            {t.nameLabel}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[var(--primary-text)] outline-none transition focus:border-[var(--accent-color)]"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs font-semibold tracking-[0.15em] text-[var(--accent-color)] uppercase">
            {t.emailLabel}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[var(--primary-text)] outline-none transition focus:border-[var(--accent-color)]"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="company" className="text-xs font-semibold tracking-[0.15em] text-[var(--accent-color)] uppercase">
          {t.companyLabel}
        </label>
        <input
          id="company"
          name="company"
          type="text"
          className="rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[var(--primary-text)] outline-none transition focus:border-[var(--accent-color)]"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-xs font-semibold tracking-[0.15em] text-[var(--accent-color)] uppercase">
          {t.messageLabel}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[var(--primary-text)] outline-none transition focus:border-[var(--accent-color)]"
        />
      </div>
      {state === "error" && <p className="text-sm text-rose-400">{errorMsg}</p>}
      <button
        type="submit"
        disabled={state === "loading"}
        className="btn-action rounded-full px-6 py-3 text-sm transition hover:brightness-105 disabled:cursor-not-allowed disabled:bg-slate-500"
      >
        {state === "loading" ? t.sending : t.send}
      </button>
    </form>
  );
}
