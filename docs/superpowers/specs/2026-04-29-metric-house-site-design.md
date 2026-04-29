# Design Spec: Metric House Marketing Site

**Date:** 2026-04-29
**Status:** Approved

---

## Overview

A single-page marketing website for **Metric House, LLC** — an independent software studio building Knowmad and Formulate. Goals in priority order:

1. Exist at `metric-house.com`
2. Connect visitors to `info@metric-house.com`
3. Advertise Knowmad and Formulate with links to their respective sites

One scrolling page with anchor sections. No CMS, no auth, no app logic.

---

## Stack & Tooling

- **Framework:** Next.js 15 (App Router), TypeScript
- **Rendering:** Static export (`output: 'export'` in `next.config.ts`)
- **Styling:** CSS Modules per component + `globals.css` for design tokens. No Tailwind, no CSS-in-JS.
- **Fonts:** Google Fonts — Inter 400/500/600, Instrument Serif 400/italic, JetBrains Mono 400/500
- **Hosting:** Vercel (static). Repo: `tsteelman91/metric-house-site` on GitHub.
- **Domain:** `metric-house.com` (DNS pointed at Vercel after deploy)

---

## File Structure

```
metric-house-site/
├── app/
│   ├── layout.tsx              # <html>, fonts, meta, OG tags, SmoothScroll
│   ├── page.tsx                # Composes all six section components
│   └── globals.css             # :root tokens, body base, grain overlay
├── components/
│   ├── LogoMark.tsx            # Shared inline SVG monogram — used in Nav + Footer
│   ├── SmoothScroll.tsx        # 'use client' — attaches anchor click handlers on mount
│   ├── Nav.tsx + Nav.module.css
│   ├── Hero.tsx + Hero.module.css
│   ├── About.tsx + About.module.css
│   ├── Products.tsx + Products.module.css
│   ├── Contact.tsx + Contact.module.css
│   └── Footer.tsx + Footer.module.css
├── public/
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── og-image.png            # 1200×630, generated via scripts/generate-og.ts
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/
│   └── generate-og.ts          # Node script: generates og-image.png + favicon set
└── next.config.ts              # output: 'export', images: { unoptimized: true }
```

---

## Sections (single-page, top to bottom)

### 1. Sticky Nav
- Sticky top, `z-index: 50`, frosted glass background, bottom border `1px solid var(--rule)`
- Left: LogoMark (26×26 ink square, MH SVG) + "Metric House" in Inter 600
- Right: "About", "Products", "Contact" anchor links + "Get in touch" CTA (`mailto:info@metric-house.com`)
- ≤880px: hide non-CTA nav links; only brand + CTA remain

### 2. Hero (`#top`)
- Two-column grid `1fr 320px`, gap 56px
- Left: eyebrow with warm dot, H1 in Instrument Serif with italic "actually" in accent color, subhead, CTA row (primary + ghost buttons)
- Right: `<dl>` meta block — Studio, Based, Products live, Hiring
- ≤880px: single column; meta switches to top-bordered block

### 3. About (`#about`)
- Background `var(--paper-2)`, two-column grid `220px 1fr`
- Left rail: eyebrow + large section number `01/03`
- Right: H2, two body paragraphs (product names italicized in Instrument Serif), 3-column principles strip
- ≤880px: single column; principles collapse to single column with horizontal dividers

### 4. Products (`#products`)
- Header row: eyebrow + H2 left, small note right
- Two `<article>` cards separated by rule borders, each two-column `1fr 480px`
- Left: product meta (number, status eyebrow, name, tagline, blurb, stats strip, outbound link with hover arrow gap animation)
- Right: browser-window mockup, `aria-hidden="true"`
  - **Knowmad:** map with CSS grid lines, four positioned pins with white-bg labels + colored dots + shadow
  - **Formulate:** survey draft with three flagged question blocks, custom highlight gradient on leading questions
- ≤880px: single column; visuals stack below meta

### 5. Contact (`#contact`)
- Full-width dark block (`var(--ink)` background), white text
- H2 in Instrument Serif with italic span, body paragraph
- Mail box CTA: `<a href="mailto:info@metric-house.com">` — inverts dark→light on hover (150ms ease)

### 6. Footer
- 4-column grid: brand + tagline | Products | Company | Reach us
- Bottom row: copyright left, version + origin right
- ≤880px: 2-column grid; bottom row stacks

---

## Design Tokens (globals.css)

### Colors
| Token | Hex | Use |
|---|---|---|
| `--paper` | `#f6f3ec` | Page background, footer |
| `--paper-2` | `#efeadd` | About section, browser chrome |
| `--paper-3` | `#e7e1cf` | Inactive pills |
| `--rule` | `#d8d2bf` | Borders, dividers |
| `--rule-soft` | `#e3ddc9` | Map gridlines |
| `--ink` | `#14130f` | Primary text, nav, contact bg, primary buttons |
| `--ink-2` | `#3a3730` | Body copy |
| `--ink-3` | `#6b6657` | Tertiary text, mono labels |
| `--ink-4` | `#8d8775` | Faintest UI |
| `--accent` | `#1a3d52` | Slate-blue: italic emphasis, status tags, hover |
| `--accent-soft` | `#d8e0e6` | Reserved |
| `--warm` | `#b35a2a` | Terracotta: ≤5 uses — eyebrow dot, best-match pin, issues flag, survey highlight |
| `--white` | `#fffdf6` | Off-white inverse |

### Typography
- **Instrument Serif** — display: H1, H2, H3, section numbers, italic emphasis, contact email
- **Inter** — body, UI, buttons, nav (400/500/600)
- **JetBrains Mono** — eyebrows, labels, stats, footer micro-copy (always uppercase, ~1.4px letter-spacing)

### Spacing
4px base. Common values: 4, 8, 10, 12, 14, 16, 18, 22, 24, 28, 32, 36, 40, 44, 48, 56, 64, 80, 96, 100, 120. Section vertical padding: 96–120px desktop, 64px mobile.

### Border Radius
Three values: **2px** (rare), **3px** (buttons, brand mark), **4px** (product visuals, mail box). No pill shapes except search-bar pills in Knowmad mock.

### Borders
`1px solid var(--rule)` default. Dashed (`1px dashed var(--rule)`) for product stat strips and Formulate doc header. No shadows except Knowmad pin dots (`0 1px 3px rgba(0,0,0,.2)`).

### Grain Overlay
Fixed `body::before` with `radial-gradient` 3×3px dot pattern, `mix-blend-mode: multiply`, `opacity: 0.6`. All sections set `position: relative; z-index: 2` to sit above it.

---

## Interactions & Behavior

- **Smooth scroll:** `SmoothScroll.tsx` attaches click handlers on mount. Sections have `scroll-margin-top: 60px`.
- **Hover transitions:** ~150ms ease on all buttons, links, mail box.
- **Product link arrow:** gap grows 8→12px on hover (CSS `gap` transition).
- **Contact mail box:** full dark→light inversion on hover.
- **External links:** `target="_blank" rel="noopener"` on all product + footer outbound links.
- **No scroll animations, no parallax, no carousels.**
- **No contact form** — all CTAs are `mailto:info@metric-house.com`.

---

## SEO & Meta

```html
<title>Metric House — Software for better workflows</title>
<meta name="description" content="Metric House is a software company building Knowmad and Formulate. Tools that help people work better." />
<!-- OG -->
<meta property="og:title" content="Metric House — Software for better workflows" />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://metric-house.com/og-image.png" />
<meta property="og:url" content="https://metric-house.com" />
<meta property="og:type" content="website" />
<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Metric House — Software for better workflows" />
<meta name="twitter:image" content="https://metric-house.com/og-image.png" />
```

- `<html lang="en">`
- `<meta name="viewport" content="width=device-width, initial-scale=1" />`
- Favicon + apple-touch-icon generated from MH SVG mark

---

## Accessibility

- Focus rings: `outline: 2px solid var(--accent); outline-offset: 2px` in `globals.css`
- Product visuals: `aria-hidden="true"`
- Heading order: H1 → H2 (About, Products, Contact) → H3 (Knowmad, Formulate) → H4 (principle titles)
- Contact CTA: real `<a href="mailto:...">`, never a button

---

## Deployment

- `public/robots.txt` — allows all, references sitemap
- `public/sitemap.xml` — one URL: `https://metric-house.com`
- Vercel: push repo, connect in dashboard, set custom domain `metric-house.com` + `www` redirect
- Analytics: none (add Plausible/Fathom later as a single script tag in `layout.tsx`)

---

## Out of Scope

Blog, CMS, auth, contact form, careers page, tracking pixels, multi-language, multi-page.
