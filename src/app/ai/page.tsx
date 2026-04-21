"use client";

import { FormEvent, useMemo, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const starterMessage: Message = {
  role: "assistant",
  content:
    "I am your Q2Methods digital twin assistant. Ask me about Marat Kadir's completed projects, quantitative capabilities, or relevant capital-markets experience.",
};

export default function AITwinPage() {
  const [messages, setMessages] = useState<Message[]>([starterMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const placeholder = useMemo(
    () =>
      "Example: What projects has Marat completed around T+1, EMIR, and AI?",
    [],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const nextMessages = [...messages, { role: "user" as const, content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/twin-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = (await response.json()) as { reply?: string; error?: string };
      if (!response.ok || !data.reply) {
        throw new Error(data.error ?? "Chat failed.");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch (submitError) {
      const message =
        submitError instanceof Error ? submitError.message : "Unexpected error.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10">
      <section className="rounded-2xl border border-slate-200 bg-white p-8">
        <p className="text-xs tracking-[0.2em] text-cyan-700 uppercase">AI Twin</p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-950 md:text-5xl">
          Chat with Marat&apos;s digital twin
        </h1>
        <p className="mt-4 max-w-4xl text-base leading-8 text-slate-700">
          This assistant is tuned to Marat Kadir&apos;s profile and accomplished
          projects in capital markets, risk, and AI transformation. It is intended
          for professional qualification and project-context questions.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 md:p-6">
        <div className="max-h-[56vh] space-y-4 overflow-y-auto p-2">
          {messages.map((message, index) => (
            <article
              key={`${message.role}-${index}`}
              className={
                message.role === "user"
                  ? "ml-auto max-w-3xl rounded-2xl bg-cyan-600 px-5 py-4 text-sm leading-7 text-white"
                  : "mr-auto max-w-3xl rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-800"
              }
            >
              {message.content}
            </article>
          ))}
          {isLoading ? (
            <p className="text-sm text-slate-500">Thinking...</p>
          ) : null}
        </div>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            rows={4}
            placeholder={placeholder}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-600"
          />
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-slate-500">
              Independent consultancy.
            </p>
            <button
              type="submit"
              disabled={isLoading || input.trim().length === 0}
              className="rounded-full bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Send
            </button>
          </div>
        </form>
        {error ? <p className="mt-3 text-sm text-rose-600">{error}</p> : null}
      </section>
    </div>
  );
}
