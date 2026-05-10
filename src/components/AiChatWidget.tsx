"use client";

import { FormEvent, useMemo, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

const FALLBACK_STARTER =
  "I am your Q2Methods digital twin assistant. Ask me about Marat Kadir's completed projects, quantitative capabilities, or relevant capital-markets experience.";

const FALLBACK_PLACEHOLDER =
  "Example: What projects has Marat completed around T+1, EMIR, and AI?";

type Labels = {
  thinking: string;
  poweredBy: string;
  send: string;
  chatFailed: string;
  unexpectedError: string;
};

const FALLBACK_LABELS: Labels = {
  thinking: "Thinking…",
  poweredBy: "Powered by Q2Methods AI",
  send: "Send",
  chatFailed: "Chat failed.",
  unexpectedError: "Unexpected error.",
};

type Props = {
  starterMessage?: string;
  placeholder?: string;
  labels?: Labels;
};

export function AiChatWidget({ starterMessage, placeholder, labels }: Props) {
  const resolvedLabels = labels ?? FALLBACK_LABELS;
  const starter: Message = {
    role: "assistant",
    content: starterMessage ?? FALLBACK_STARTER,
  };

  const [messages, setMessages] = useState<Message[]>([starter]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resolvedPlaceholder = useMemo(
    () => placeholder ?? FALLBACK_PLACEHOLDER,
    [placeholder],
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
      const reply = data.reply;
      if (!response.ok || !reply) throw new Error(data.error ?? resolvedLabels.chatFailed);

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : resolvedLabels.unexpectedError);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="panel rounded-2xl p-4 md:p-6">
      <div className="max-h-[48vh] space-y-4 overflow-y-auto p-2">
        {messages.map((message, index) => (
          <article
            key={`${message.role}-${index}`}
            className={
              message.role === "user"
                ? "ml-auto max-w-3xl rounded-2xl bg-[var(--accent-color)] px-5 py-4 text-sm leading-7 text-[var(--accent-text)]"
                : "mr-auto max-w-3xl rounded-2xl border border-[#e2e8f0] bg-white px-5 py-4 text-sm leading-7 text-[var(--primary-text)]"
            }
          >
            {message.content}
          </article>
        ))}
        {isLoading && <p className="text-secondary text-sm">{resolvedLabels.thinking}</p>}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={3}
          placeholder={resolvedPlaceholder}
          className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[var(--primary-text)] outline-none transition focus:border-[var(--accent-color)]"
        />
        <div className="flex items-center justify-between gap-3">
          <p className="text-secondary text-xs">{resolvedLabels.poweredBy}</p>
          <button
            type="submit"
            disabled={isLoading || input.trim().length === 0}
            className="btn-action rounded-full px-5 py-2.5 text-sm transition hover:brightness-105 disabled:cursor-not-allowed disabled:bg-slate-500"
          >
            {resolvedLabels.send}
          </button>
        </div>
      </form>
      {error && <p className="mt-3 text-sm text-rose-400">{error}</p>}
    </div>
  );
}
