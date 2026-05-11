# Design System Update Instructions

## Objective
Update the webpage HTML and CSS to a modern, sophisticated, high-contrast, data-driven aesthetic — while **preserving the Q2Methods quant identity**. The site must read as a quantitative consultancy, not a generic SaaS or law-firm template. Strict geometric grids, generous whitespace, and explicit data-display affordances are core; neutralizing the palette to pure monochrome is not.

## 0. Identity Anchors (Do Not Erase)
These elements carry the brand. Preserve or evolve — do not strip.

* **Navy + green palette.** The existing `#2a4365` navy and `#38a169` accent green are the brand. The refined palette *extends* them; it does not replace them with grey-on-white.
* **Persistent dark navy navbar.** Solid, sticky. *Not* transparent-over-hero with scroll-triggered white — that pattern reads SaaS, not quant.
* **The hero grid backdrop** (`.hero-grid`, 28px lattice). The most distinctive "data terminal" cue on the site. Stays.
* **The subtle green ring** (`.neon-ring`) on hero CTAs and signature panels — used sparingly as a brand signature, not blanket-applied.
* **Geist Sans + Geist Mono.** Already loaded. Mono is the primary carrier of quant identity — numbers, tickers, IDs, regulatory tags.

## 1. Design Tokens (Global Styles)

### A. Typography
* **Sans family:** Geist Sans (already wired via `--font-geist-sans`). Modern, geometric.
* **Mono family:** Geist Mono (already wired). **All numerical content** — KPIs, percentages, durations, dates, tickers, IDs, code, regulatory tags — uses Mono with `font-variant-numeric: tabular-nums`. This is the single highest-leverage quant cue.
* **Headings (H1–H3):** Heavy weight, tight tracking (`-0.02em`), high contrast. H1 may be paired with a faint Greek-letter watermark (see §4).
* **Body text:** Regular weight, line-height 1.5–1.6, max ~70ch.
* **Eyebrows / labels / tags:** Uppercase, ~0.2em tracking, semibold, accent green or muted grey. Already used throughout (`tracking-[0.2em] uppercase`) — codify as a reusable class.

### B. Color Palette
* **Backgrounds:**
    * Primary: `#f7fafc` (existing — cool off-white reads as terminal/data, *not* pure white).
    * Surface: `#ffffff` for cards.
    * Inverted: `#2a4365` (existing navy) for navbar and footer. Brand.
* **Text:**
    * Primary: `#1a365d` (existing navy).
    * Secondary: `#4a5568` (existing muted grey).
    * Inverted (on navy surfaces): `#ffffff` / 80% white.
* **Brand accent:** `#38a169` (existing green). Active states, primary CTAs, eyebrow labels, positive data points.
* **Data-state colors** (new — small additive set, used *only* on numerical content):
    * Positive: `#38a169` (matches brand green).
    * Negative: `#c53030`.
    * Neutral: `#4a5568`.
    * Reserved for actual data display. Do not deploy as decorative accents.

### C. Layout & Spacing
* **Grid:** 12-column responsive.
* **Containers:** `max-w-7xl` central, generous gutters.
* **Section padding:** Bump to `py-24` desktop (currently `py-20`); headline sections `py-32`. Pace it — do not blanket-apply 120px.
* **Backdrop allocation:** Hero and explicitly "data-themed" sections retain the 28px lattice (`.hero-grid`). Other content sections sit on flat `#f7fafc`.

## 2. Component Archetypes

### A. Buttons & Links
* **Primary CTA:** Pill (`rounded-full`), accent-green fill, `.neon-ring` in hero contexts. The pill shape is a brand element and stays — it visually echoes a "run" button. Brightness lift on hover.
* **Secondary CTA:** Pill outline, navy text, accent-green on hover. Existing pattern.
* **Utility / inline controls** (filters, toggles, table actions): Sharp 4px radius — this is where the "sharp corners" instinct lives, *not* on hero CTAs.
* **Text links:** Accent green, underline appears on hover with `underline-offset-4`.

### B. Navigation Bar
* **Behavior:** Sticky. *Always* solid navy.
* **Style:** Subtle bottom border (`border-white/10`), light backdrop blur to soften scroll overlap.
* **Dropdowns:** Flat, borderless, fade in. Mono used for any code/ID items.

### C. Cards & Containers
* **Default surface:** `.panel` (white, 1px `#e2e8f0` border). Keep.
* **Signature panels:** Add `.neon-ring` for the green halo — reserved for 2–3 panels per page, never blanket.
* **Hover:** Y-axis lift (`-translate-y-0.5`) + soft diffused shadow. 200ms ease-out.
* **Radius:** `rounded-2xl` for content cards; `rounded-md` for KPI tiles (sharper reads more terminal).

### D. Imagery & Iconography
* **Client/partner logos:** Monochrome — `filter: grayscale(100%) brightness(0)` on light, inverted on navy.
* **Icons:** Thin line, geometric. **Bias toward quant-native motifs** — distribution curves, candlestick glyphs, sparklines, summation/integral marks — over generic UI metaphors (rockets, gears, lightbulbs). If a concept doesn't have a natural quant icon, prefer a tiny inline sparkline or a labeled Greek glyph over a stock icon.

## 3. Interaction & Animation Patterns
* **Transitions:** 150–250ms, `ease-out`. No bounce, no spring.
* **Content reveal:** Fade + 8px translate-up on viewport entry.
* **Numeric tick-in (signature, optional):** KPI numbers may increment from 0 → final value on first viewport entry (~600ms ease-out). ≤4 per page.
* **Sparkline draw-in:** Path `stroke-dasharray` reveal over ~500ms on viewport entry.
* **Tabbed interfaces:** Fade between panels; accent-green underline slides between active tabs.

## 4. Quant Signal Elements (New)
The small, high-density details that distinguish a quant site from a generic consultancy. Use deliberately — sparseness is the point.

* **Mono tags.** Regulatory / topic tags rendered as `[T+1]`, `[EMIR]`, `[MIFID II]` in Geist Mono, muted grey, with bracketed delimiters. Inline metadata, not primary headings.
* **Greek-letter watermarks.** Optional, *one per page max*. Large (≥160px), low-opacity (≤8%) α / β / σ / Δ / μ behind a section heading. Decorative anchor; never load-bearing for comprehension.
* **KPI tiles.** Small `rounded-md` panels — Mono number, eyebrow label, optional sparkline. Reserved for *real, defensible* numbers (years of experience, mandates delivered). Do not invent metrics to fill tiles.
* **Annotation eyebrows.** Already in the codebase (`text-xs tracking-[0.2em] uppercase` over a stat or title). Codify as `.eyebrow`. Standard pattern for any numeric or named claim.
* **Tabular figures everywhere numbers appear.** `font-variant-numeric: tabular-nums` on body, mandatory on tables.
* **Sparklines as content, not chrome.** Inline SVG, monochrome 1.5px stroke, no axis chrome. Must reflect real or representative data — never random noise for decoration.

## 5. Execution Steps for Claude Code
1. **Audit `src/app/globals.css`.** Most identity anchors are already there — extend, don't replace.
2. **Add data-state colors** (`--positive`, `--negative`, `--neutral`) as additional root variables. Do not overwrite existing brand vars.
3. **Wire Mono numerals.** Add a utility (`.num` or `.tabular`) applying `font-family: var(--font-geist-mono)` + `font-variant-numeric: tabular-nums`. Apply to existing KPI/stat displays.
4. **Codify the eyebrow pattern** as `.eyebrow` instead of repeating `text-xs tracking-[0.2em] uppercase` inline.
5. **Unify transitions** under a `--transition: 200ms ease-out` token; reference from interactive elements.
6. **Apply the monochrome logo filter** to any future client/partner logo grids.
7. **Pilot one Greek-letter watermark** on the home hero (e.g., faint σ behind H1). Validate before propagating.
8. **Add sparklines / KPI tiles only where real data backs them.** Omit the tile rather than invent a number.
9. **Leave the navbar, hero grid, and neon-ring as-is.** Do not "modernize" them away.
