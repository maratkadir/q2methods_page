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
  successBody:
    "We will review your message and respond within one business day.",
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
      <div className="panel neon-ring relative flex flex-col items-start justify-center gap-3 rounded-2xl p-10">
        <span className="crosshair-corner crosshair-corner--tl" />
        <span className="crosshair-corner crosshair-corner--tr" />
        <span className="crosshair-corner crosshair-corner--bl" />
        <span className="crosshair-corner crosshair-corner--br" />
        <p className="mono-tag mono-tag--accent">STATUS: 200 OK</p>
        <p className="mt-2 text-3xl font-semibold text-[var(--primary-text)]">
          {t.successTitle}
        </p>
        <p className="text-secondary text-sm leading-7">{t.successBody}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="panel relative rounded-2xl p-8 md:p-10"
    >
      <div className="section-divider mb-8">
        <span className="section-divider__index num">§ 02</span>
        <span>{t.heading}</span>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="num text-[0.7rem] uppercase tracking-[0.18em] text-[var(--accent-color)]"
          >
            {t.nameLabel}
          </label>
          <input id="name" name="name" type="text" required className="input" />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="num text-[0.7rem] uppercase tracking-[0.18em] text-[var(--accent-color)]"
          >
            {t.emailLabel}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="input"
          />
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <label
          htmlFor="company"
          className="num text-[0.7rem] uppercase tracking-[0.18em] text-[var(--accent-color)]"
        >
          {t.companyLabel}
        </label>
        <input id="company" name="company" type="text" className="input" />
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <label
          htmlFor="message"
          className="num text-[0.7rem] uppercase tracking-[0.18em] text-[var(--accent-color)]"
        >
          {t.messageLabel}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="input resize-y"
        />
      </div>

      {state === "error" && (
        <p className="num mt-4 text-sm text-[var(--negative)]">
          <span className="terminal-bracket">!</span> {errorMsg}
        </p>
      )}

      <div className="mt-8 flex items-center justify-between gap-3">
        <p className="text-secondary num text-[0.7rem] uppercase tracking-[0.12em]">
          Reply &lt; 24h
        </p>
        <button
          type="submit"
          disabled={state === "loading"}
          className="btn-action neon-ring"
        >
          {state === "loading" ? t.sending : t.send}
          <span className="num opacity-80">↗</span>
        </button>
      </div>
    </form>
  );
}
