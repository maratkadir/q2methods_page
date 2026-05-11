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

    const nextMessages = [
      ...messages,
      { role: "user" as const, content: trimmed },
    ];
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
      if (!response.ok || !reply)
        throw new Error(data.error ?? resolvedLabels.chatFailed);

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : resolvedLabels.unexpectedError,
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="panel relative rounded-2xl p-5 md:p-6">
      <div className="mb-4 flex items-center justify-between border-b border-[var(--border-soft)] pb-3">
        <p className="mono-tag mono-tag--accent">TWIN-SESSION</p>
        <span className="num text-[0.7rem] text-[var(--secondary-text)]">
          {String(messages.length).padStart(2, "0")} /
          turns
        </span>
      </div>

      <div className="max-h-[52vh] space-y-4 overflow-y-auto pr-1">
        {messages.map((message, index) => (
          <article
            key={`${message.role}-${index}`}
            className={
              message.role === "user"
                ? "ml-auto max-w-3xl rounded-2xl bg-[var(--accent-color)] px-5 py-4 text-sm leading-7 text-[var(--accent-text)]"
                : "mr-auto max-w-3xl rounded-2xl border border-[var(--border-soft)] bg-[var(--bg-color)] px-5 py-4 text-sm leading-7 text-[var(--primary-text)]"
            }
          >
            {message.role === "assistant" && (
              <p className="num mb-2 text-[0.68rem] uppercase tracking-[0.15em] text-[var(--accent-color)] opacity-70">
                Q²-TWIN
              </p>
            )}
            {message.content}
          </article>
        ))}
        {isLoading && (
          <p className="text-secondary num text-xs">
            <span className="terminal-bracket">→</span> {resolvedLabels.thinking}
          </p>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-6 flex flex-col gap-3 border-t border-[var(--border-soft)] pt-5"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={3}
          placeholder={resolvedPlaceholder}
          className="input resize-y"
        />
        <div className="flex items-center justify-between gap-3">
          <p className="text-secondary num text-[0.7rem] uppercase tracking-[0.12em]">
            {resolvedLabels.poweredBy}
          </p>
          <button
            type="submit"
            disabled={isLoading || input.trim().length === 0}
            className="btn-action"
          >
            {resolvedLabels.send}
            <span className="num opacity-80">↗</span>
          </button>
        </div>
      </form>
      {error && (
        <p className="num mt-3 text-sm text-[var(--negative)]">
          <span className="terminal-bracket">!</span> {error}
        </p>
      )}
    </div>
  );
}
