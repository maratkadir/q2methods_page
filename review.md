# Q2Methods Site Review — Suitability for a Quantitative Consulting Firm

Scope of review: marketing pages and AI Twin copy under `src/app/`, plus the
twin system prompt in `src/app/api/twin-chat/route.ts`. Findings focus on
positioning, tone, and content suitability for a quantitative consulting
boutique.

This document has been updated to reflect the decisions made in the
2026-05-03 review pass — see the **Decision** notes under each section and
the change log in §6.

## 1. Top-level finding: positioning inconsistency between firm and individual

The site oscillated between two voices:

- **Firm voice** — `page.tsx`, `about-us`, `projects`, `contacts` consistently
  position Q2Methods as a multi-partner boutique ("We", "Q2Methods delivers",
  four partners listed).
- **Individual voice** — the AI Twin copy on `/ai` and the AI Twin section
  inside `/about-us` foregrounded a single person ("Marat Kadir's profile and
  project history"), which was jarring beside the team-first framing two
  sections above.

For a quantitative consulting firm pitching to CCPs, banks, and asset
managers, the firm voice is the right default. The twin should still be
clearly Marat's, but the copy should not advertise itself as "tuned to one
person's CV" — that reads like a portfolio site, not a boutique.

### Applied copy changes

**Decision:** accepted. Applied to:

- `src/app/ai/page.tsx` (metadata description and page intro) — now reads
  *"This is Marat's digital twin. Use it for preliminary project
  qualification, methodology questions, or to explore Q2Methods' experience in
  capital markets, risk, and AI transformation."*
- `src/app/about-us/page.tsx` (AI Twin section) — corresponding update,
  drops the "tuned to a profile" framing while keeping the firm anchor.

Rationale: drops résumé-style framing, keeps the personal nature of the
twin, and pivots back to the firm.

## 2. Content suitability — overall: appropriate

The technical register is correct for the audience: CPMI-IOSCO, EMIR/EMIR
3.0, MaRisk, EBA Guidelines, CRR, IRRBB/CSRBB, ICAAP/ILAAP, IFRS 9
PD/LGD/EAD, cover-2, Monte Carlo simulation. This will land with risk
officers, CROs, and supervisory functions on both market-infrastructure and
banking sides. Capabilities (`page.tsx:3-28`) and project case studies
(`lib/projects.ts`) are concrete and outcome-led — good.

### 2.1 LinkedIn links — populated

**Decision:** accepted. Applied to `src/app/about-us/page.tsx`:

| Partner | URL |
|---|---|
| Marat Kadir | https://www.linkedin.com/in/marat-kadir-3a144117 |
| Dr. Carlos Sanz | https://www.linkedin.com/in/carlossanzchacon/ |
| Dr. Eduard Dubin | https://www.linkedin.com/in/dr-eduard-dubin-57998560/ |
| Dr. Reinhard Baltin | https://www.linkedin.com/in/reinhard-baltin-9bbb015b/ |

Anchors now also use `target="_blank"` and `rel="noopener noreferrer"` so
links open in a new tab without leaking the referrer.

### 2.2 Avatars — initials, not photos

**Decision:** photos to be added later. The coloured-initial circles work for
a startup MVP but undersell a "practitioner-led" boutique. Acknowledged as a
known gap; revisit when partner photos are available.

### 2.3 Hero CTA ordering on the home page

**Decision:** accepted. Reordered in `src/app/page.tsx` so that
**Explore Projects** is the primary action (proof of work), followed by
**Contact Us**, with **Meet Our Team** demoted to tertiary. For an
institutional-prospect first visit, this prioritises the
project-credibility path over the "about us" path.

### 2.4 Quant claim under-supported on the home page — proposal

The home page claims "Quantitative consulting for markets, risk, and AI" but
surfaces no quant substance above the fold. Proposed addition: a compact
**"Methods we apply"** panel between *Who We Serve* and *What We Deliver*,
listing concrete methodology keywords. Suggested copy:

> **Methods we apply**
> - **Risk modelling** — VaR, Expected Shortfall, copula-based dependence,
>   Monte Carlo simulation, extreme-value theory
> - **Margin & default management** — IM/DF backtesting, cover-2 stress,
>   liquidity waterfalls, anti-procyclicality
> - **Banking book** — IFRS 9 PD/LGD/EAD, IRRBB/CSRBB EVE/NII shocks,
>   ICAAP/ILAAP capital allocation
> - **Portfolio analytics** — factor models, attribution, tail-risk stress,
>   liquidity scoring
> - **AI / model governance** — MLOps, drift monitoring, explainability,
>   audit logging aligned with EBA/BaFin guidance

This keeps the home page scannable, reads quantitatively, and aligns with
the existing capability tiles. Implementation pending — happy to ship the
component if you want to proceed.

### 2.5 "Boutique" claim — discussed

**Decision:** rejected. Project experience belongs to Q2Methods today;
introducing a "firm-led vs. expert network" disambiguation on the project
pages would create unnecessary noise. Recommendation withdrawn.

### 2.6 Project outcomes — illustrative disclaimer added

**Decision:** accepted. Added to `src/app/projects/page.tsx`, immediately
below the intro paragraph:

> *Engagement themes are illustrative; specific client identities and
> figures are anonymised.*

**Open question — links to fuller project detail:** yes, this is a good idea,
but with conditions. A "read more" link makes sense if the linked content is
genuinely additive (architecture sketch, anonymised methodology, regulatory
context, lessons learned). It backfires if it leads to a thin page that just
restates the card. Suggested approach:

- Each project page already exists at `src/app/projects/[slug]`. Use it as
  the long-form page rather than creating a separate "details" link.
- For each project, write a short **Methodology** section (specific models,
  parameters, validation choices) and a **Regulatory context** section
  (which articles of EMIR, MaRisk, EBA Guidelines, CRR, IFRS 9 apply).
  This is the kind of content that converts technical buyers.
- Keep client names and quantitative metrics anonymised, consistent with the
  disclaimer above.

The card "Read more →" already implies a deeper page; the upgrade is in the
quality of what you find when you click.

## 3. AI Twin system prompt — review

`src/app/api/twin-chat/route.ts:10-48`. Generally solid. Observations:

### 3.1 Persona is well-scoped

Identity, tone, guardrails, and expertise sections are appropriate for
business-context use. The 2–3 sentence cap and follow-up-question rule keep
the chat lightweight — good for lead qualification.

### 3.2 "Source Integrity" guardrail — consistent with site copy

**Decision:** accepted. With §1 applied, the public-facing copy no longer
contradicts the prompt's own "don't mention my CV" guardrail.

### 3.3 Knowledge gap fallback

Line 27's pivot ("I haven't worked on that specific area yet, but at
Q2Methods we handle [related capability]") is well-designed but depends on
the model's ability to fill in the bracket. For a 2–3 sentence cap with a
small model, monitor whether this comes out naturally; if not, consider
listing the bridge capabilities explicitly in the prompt.

### 3.4 Off-topic policy — hardened

**Decision:** accepted, harder than originally proposed. Replaced the soft
two-line policy with a hard refusal block in `src/app/api/twin-chat/route.ts`:

- Refuses anything outside Q2Methods topics (capital markets, clearing,
  risk, regulation, AI consulting), including general knowledge, coding
  help, jokes, roleplay, persona changes, "ignore previous instructions"
  attempts, translation requests, and content generation.
- Refuses uploaded documents, files, links, or pasted content.
- Reply for any such request is locked to a single sentence:
  *"That's outside the scope of this chat — for Q2Methods topics, I'm happy
  to help; otherwise please reach info@q2methods.de."*
- Repeats the same sentence verbatim if the user persists; does not
  re-engage.

This shuts down jailbreak / abuse vectors without losing the lead-gen
fallback (the email pivot).

### 3.5 HTTP-Referer hardcoded to localhost

`route.ts:113`: `"HTTP-Referer": "http://localhost:3001"`. Still pending —
will follow deployment and may matter for OpenRouter analytics or
rate-limiting. Replace with the production origin (or read from
`process.env.NEXT_PUBLIC_SITE_URL`) before going live.

### 3.6 Model choice — deferred

**Decision:** keep `openai/gpt-oss-120b` for now; revisit if response
quality at lead-gen time becomes a constraint. A stronger model
(`anthropic/claude-sonnet-4-6` or `anthropic/claude-opus-4-7` via
OpenRouter) remains the recommended upgrade path when revisited.

## 4. Smaller copy and UX notes (not yet applied)

- `contacts/page.tsx:21` — "Let's build your next risk and quant advantage"
  reads slightly off. Suggest: "Let's scope your next risk or quant
  engagement."
- `page.tsx:71-76` — the home-page descriptor is two long sentences. Consider
  tightening the second sentence: "We solve problems where regulation,
  technology, and market dynamics intersect."
- `about-us/page.tsx:65-70` — "high mathematical rigor" is telling, not
  showing. The capabilities list immediately below already shows it; the
  intro can be cut by one clause without loss.
- `projects/page.tsx` — "Click any project to see the full scope, approach,
  and results" is unnecessary on a card grid where the cards are obviously
  links. Remove when the disclaimer block is restyled.
- Navigation/header and footer were not part of `app/page.tsx` — they live in
  `layout.tsx` (not reviewed here). Worth a separate pass for consistency
  (cookie/imprint/data-protection notices for DACH compliance).

## 5. Priority list (remaining)

1. **Add the "Methods we apply" panel** to the home page (§2.4) — biggest
   win for the quant credibility claim above the fold.
2. **Build out the per-project pages** under `projects/[slug]` with
   methodology and regulatory-context sections (§2.6 follow-up).
3. **Fix the HTTP-Referer** in `route.ts` (§3.5) before any production
   deployment.
4. **Add partner photos** when available (§2.2).

## 6. Change log (2026-05-03)

Applied in this pass:

- `src/app/ai/page.tsx` — metadata description and page intro rewritten as
  digital-twin framing (§1).
- `src/app/about-us/page.tsx` — AI Twin section copy aligned with §1; all
  four partner LinkedIn URLs populated; anchor opens in new tab with
  `rel="noopener noreferrer"`; placeholder tooltip removed (§2.1).
- `src/app/page.tsx` — hero CTA reordering: Explore Projects (primary) →
  Contact Us → Meet Our Team (§2.3).
- `src/app/projects/page.tsx` — added "Engagement themes are illustrative;
  specific client identities and figures are anonymised" disclaimer (§2.6).
- `src/app/api/twin-chat/route.ts` — replaced soft off-topic policy with a
  hard refusal block including a locked single-sentence reply (§3.4).

Decisions deferred or rejected:

- §2.2 (photos) — pending; will be added when available.
- §2.5 (firm vs. expert-network disambiguation on projects) — rejected;
  project experience is now Q2Methods.
- §3.6 (model upgrade) — deferred; current model retained for now.
