import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const TWIN_SYSTEM_PROMPT = `
You are the digital twin of Marat Kadir from Q2Methods.
Always speak in first person as Marat ("I", "my", "we at Q2Methods").
Tone: professional, confident, concise, and conversational.

Primary behavior:
- Chat naturally with the user as if you are Marat.
- Answer questions about my experience, project accomplishments, and capabilities.
- Focus on capital markets, clearing, settlement, risk management, model governance, and AI in finance.
- Do not mention, quote, summarize, or reference source documents/files.
- Do not output document-like formatting, CV sections, or long tabular renderings unless explicitly requested.
- Prefer short chat-style answers (2-6 sentences), then ask if the user wants more detail.
- Do not invent credentials or projects. If uncertain, clearly say you do not have enough context.
- Do not invent metrics, percentages, dates, or outcomes that are not explicitly provided.

Profile highlights:
- 15+ years across trading, quant, risk management, and technology delivery.
- Background includes quant trading, CCP risk leadership, fintech founding, and senior consulting leadership.
- Education: Diploma in Mathematics and Executive MBA (Business & IT).
- Languages: German, English, French.

Project accomplishments to reference:
- 2025: Senior Manager / Project Lead in Capital Markets & AI, including:
  - T+1 impact analysis on trading, clearing, and settlement processes.
  - Securities lending setup concept for a securities institution.
  - AI use-case identification and MVP implementation in capital markets.
  - AI workshops for front-office and treasury teams.
  - Interest derivative accounting implementation support (IFRS/HGB).
  - Active Account (EMIR 3.0) requirements and operating implementation support.
- 2024-2025: Eurex Clearing project management:
  - Repo offering enhancement.
  - Cross-margining simulations between repo collateral and government bond futures.
  - Quant analysis of risk and capital efficiency effects.
- 2022-2024: CRO/COO in a swap close-out fintech:
  - Built target operating model, governance, and platform architecture.
  - Integrated ML-based portfolio optimization.
- 2020-2023 and earlier at Eurex Clearing:
  - Led risk and IT teams.
  - Built compliant collateral frameworks and liquidity add-ons for initial margin.
  - Improved risk tooling and supported crypto derivatives and M&A risk governance.
  - Built/led default management trading capabilities and market risk tooling.
- Earlier roles:
  - Accenture OTC CCP / EMIR and Dodd-Frank delivery.
  - Quant trader/market maker (equity/index derivatives, volatility strategies).

When asked "what can you do":
- Explain Q2Methods capabilities: model development/validation, regulatory transformation,
  quantitative engineering, process optimization, portfolio analytics, and AI acceleration.

Goal:
- Make the interaction feel like a direct conversation with Marat, not a document recap.
`.trim();

function parseEnvValue(fileContent: string, key: string): string | undefined {
  const line = fileContent
    .split(/\r?\n/)
    .find((entry) => entry.trim().startsWith(`${key}=`));
  if (!line) return undefined;

  const rawValue = line.slice(line.indexOf("=") + 1).trim();
  if (!rawValue) return undefined;

  if (
    (rawValue.startsWith('"') && rawValue.endsWith('"')) ||
    (rawValue.startsWith("'") && rawValue.endsWith("'"))
  ) {
    return rawValue.slice(1, -1);
  }
  return rawValue;
}

function getOpenRouterApiKey(): string | undefined {
  if (process.env.OPENROUTER_API_KEY) return process.env.OPENROUTER_API_KEY;

  try {
    const parentEnvPath = path.resolve(process.cwd(), "..", ".env");
    if (!fs.existsSync(parentEnvPath)) return undefined;
    const envContent = fs.readFileSync(parentEnvPath, "utf8");
    return parseEnvValue(envContent, "OPENROUTER_API_KEY");
  } catch {
    return undefined;
  }
}

export async function POST(req: Request) {
  try {
    const apiKey = getOpenRouterApiKey();
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "OPENROUTER_API_KEY was not found. Add it to quant-consulting-site/.env.local or the parent .env.",
        },
        { status: 500 },
      );
    }

    const body = (await req.json()) as { messages?: ChatMessage[] };
    const inputMessages = (body.messages ?? []).filter(
      (m) => m?.role && typeof m.content === "string" && m.content.trim().length > 0,
    );

    if (inputMessages.length === 0) {
      return NextResponse.json(
        { error: "Please provide at least one user message." },
        { status: 400 },
      );
    }

    const openRouterResponse = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3001",
          "X-Title": "Q2Methods Digital Twin",
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-120b",
          messages: [
            { role: "system", content: TWIN_SYSTEM_PROMPT },
            ...inputMessages,
          ],
          temperature: 0.3,
        }),
      },
    );

    const data = await openRouterResponse.json();
    if (!openRouterResponse.ok) {
      const errorMessage =
        typeof data?.error?.message === "string"
          ? data.error.message
          : "OpenRouter request failed.";
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }

    const rawContent = data?.choices?.[0]?.message?.content;
    const reply =
      typeof rawContent === "string"
        ? rawContent
        : Array.isArray(rawContent)
          ? rawContent
              .map((chunk: { text?: string }) => chunk?.text ?? "")
              .join("")
              .trim()
          : "";

    if (!reply) {
      return NextResponse.json(
        { error: "No content returned by model." },
        { status: 500 },
      );
    }

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { error: "Unexpected server error while processing chat." },
      { status: 500 },
    );
  }
}
