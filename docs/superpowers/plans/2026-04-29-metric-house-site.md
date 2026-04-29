# Metric House Marketing Site — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a pixel-faithful, high-fidelity static marketing site for Metric House, LLC from the approved design spec and push it to GitHub for Vercel deployment.

**Architecture:** Next.js 15 App Router with `output: 'export'` for fully static output. Six section components (`Nav`, `Hero`, `About`, `Products`, `Contact`, `Footer`) composed in `app/page.tsx`. Design tokens live in `globals.css` as CSS custom properties; each component has its own CSS Module for layout and typography. The only client-side JS is a `SmoothScroll` component that attaches anchor click handlers.

**Tech Stack:** Next.js 15, TypeScript, CSS Modules, Jest + React Testing Library, sharp (OG/favicon image generation), to-ico (favicon.ico), tsx (script runner), gh CLI (GitHub push)

**Working directory for all steps:** `/Users/tylersteelman/Documents/metric-house-site`

---

## File Map

```
metric-house-site/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── __tests__/
│   │   ├── LogoMark.test.tsx
│   │   ├── SmoothScroll.test.tsx
│   │   ├── Nav.test.tsx
│   │   ├── Hero.test.tsx
│   │   ├── About.test.tsx
│   │   ├── Products.test.tsx
│   │   ├── Contact.test.tsx
│   │   ├── Footer.test.tsx
│   │   └── Page.test.tsx
│   ├── LogoMark.tsx
│   ├── SmoothScroll.tsx
│   ├── Nav.tsx + Nav.module.css
│   ├── Hero.tsx + Hero.module.css
│   ├── About.tsx + About.module.css
│   ├── Products.tsx + Products.module.css
│   ├── Contact.tsx + Contact.module.css
│   └── Footer.tsx + Footer.module.css
├── public/
│   ├── favicon.ico          (generated)
│   ├── favicon.svg          (generated)
│   ├── apple-touch-icon.png (generated)
│   ├── og-image.png         (generated)
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/
│   └── generate-og.ts
├── docs/                    (already exists — design spec + this plan)
├── jest.config.ts
├── jest.setup.ts
└── next.config.ts
```

---

## Task 1: Scaffold Next.js project and configure static export

**Files:**
- Create: all Next.js scaffold files
- Modify: `next.config.ts`
- Create: `package.json` scripts for test + generate

- [ ] **Step 1: Scaffold into the existing directory**

The repo at `/Users/tylersteelman/Documents/metric-house-site` is already git-initialized. Run `create-next-app` with `.` as the target — it will add Next.js files around the existing `docs/` folder without touching it.

```bash
cd /Users/tylersteelman/Documents/metric-house-site
npx create-next-app@latest . \
  --typescript \
  --eslint \
  --no-tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*" \
  --yes
```

Expected: scaffold completes, `app/`, `components/` (if any), `public/`, `package.json`, `tsconfig.json`, `next.config.ts` created.

- [ ] **Step 2: Install additional dev dependencies**

```bash
npm install --save-dev \
  jest \
  jest-environment-jsdom \
  @testing-library/react \
  @testing-library/jest-dom \
  @types/jest \
  tsx
npm install --save-dev sharp to-ico
npm install --save-dev @types/node
```

- [ ] **Step 3: Replace next.config.ts with static export config**

```ts
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
};

export default nextConfig;
```

- [ ] **Step 4: Add scripts to package.json**

In `package.json`, inside `"scripts"`, add:
```json
"test": "jest",
"test:watch": "jest --watch",
"generate": "tsx scripts/generate-og.ts"
```

- [ ] **Step 5: Delete scaffold placeholder files**

```bash
rm -f app/page.tsx app/globals.css app/layout.tsx
# Also remove any default favicon/svg that create-next-app added
rm -f public/next.svg public/vercel.svg public/file.svg public/globe.svg public/window.svg
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "scaffold: Next.js 15 App Router with static export config"
```

---

## Task 2: Configure Jest and React Testing Library

**Files:**
- Create: `jest.config.ts`
- Create: `jest.setup.ts`

- [ ] **Step 1: Create jest.config.ts**

```ts
// jest.config.ts
import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({ dir: './' });

const customConfig: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
};

export default createJestConfig(customConfig);
```

- [ ] **Step 2: Create jest.setup.ts**

```ts
// jest.setup.ts
import '@testing-library/jest-dom';
```

- [ ] **Step 3: Verify Jest runs (no tests yet)**

```bash
npx jest --passWithNoTests
```

Expected output: `No tests found, exiting with code 0` or similar passing exit.

- [ ] **Step 4: Commit**

```bash
git add jest.config.ts jest.setup.ts package.json
git commit -m "test: configure Jest with React Testing Library"
```

---

## Task 3: Global CSS — design tokens, base styles, grain overlay

**Files:**
- Create: `app/globals.css`

No unit tests for pure CSS — visual correctness is verified at build time in the browser. This task is just writing the file.

- [ ] **Step 1: Create app/globals.css**

```css
/* app/globals.css */

:root {
  --paper: #f6f3ec;
  --paper-2: #efeadd;
  --paper-3: #e7e1cf;
  --rule: #d8d2bf;
  --rule-soft: #e3ddc9;
  --ink: #14130f;
  --ink-2: #3a3730;
  --ink-3: #6b6657;
  --ink-4: #8d8775;
  --accent: #1a3d52;
  --accent-soft: #d8e0e6;
  --warm: #b35a2a;
  --white: #fffdf6;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: auto;
}

body {
  font-family: 'Inter', -apple-system, system-ui, sans-serif;
  font-size: 16px;
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  background-color: var(--paper);
  color: var(--ink);
}

body::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  background-image: radial-gradient(rgba(20, 19, 15, 0.025) 1px, transparent 1px);
  background-size: 3px 3px;
  mix-blend-mode: multiply;
  opacity: 0.6;
}

main,
header,
footer,
section,
nav {
  position: relative;
  z-index: 2;
}

a:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
```

- [ ] **Step 2: Commit**

```bash
git add app/globals.css
git commit -m "style: add design tokens and base styles"
```

---

## Task 4: LogoMark and SmoothScroll shared components

**Files:**
- Create: `components/__tests__/LogoMark.test.tsx`
- Create: `components/__tests__/SmoothScroll.test.tsx`
- Create: `components/LogoMark.tsx`
- Create: `components/SmoothScroll.tsx`

- [ ] **Step 1: Create test files**

```tsx
// components/__tests__/LogoMark.test.tsx
import { render, screen } from '@testing-library/react';
import { LogoMark } from '../LogoMark';

describe('LogoMark', () => {
  it('renders an SVG element', () => {
    const { container } = render(<LogoMark />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('SVG is aria-hidden', () => {
    const { container } = render(<LogoMark />);
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });
});
```

```tsx
// components/__tests__/SmoothScroll.test.tsx
import { render } from '@testing-library/react';
import { SmoothScroll } from '../SmoothScroll';

describe('SmoothScroll', () => {
  it('renders nothing visible', () => {
    const { container } = render(<SmoothScroll />);
    expect(container.firstChild).toBeNull();
  });
});
```

- [ ] **Step 2: Run tests — expect failure**

```bash
npx jest components/__tests__/LogoMark.test.tsx components/__tests__/SmoothScroll.test.tsx
```

Expected: FAIL — `Cannot find module '../LogoMark'`

- [ ] **Step 3: Create LogoMark.tsx**

```tsx
// components/LogoMark.tsx

export function LogoMark() {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 26,
        height: 26,
        backgroundColor: 'var(--ink)',
        borderRadius: 3,
        flexShrink: 0,
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M2 11.5V2.5" stroke="#fffdf6" strokeWidth="1.4" strokeLinecap="square" />
        <path d="M2 2.5L5.2 8" stroke="#fffdf6" strokeWidth="1.4" strokeLinecap="square" />
        <path d="M5.2 8L8.4 2.5" stroke="#fffdf6" strokeWidth="1.4" strokeLinecap="square" />
        <path d="M8.4 2.5V11.5" stroke="#fffdf6" strokeWidth="1.4" strokeLinecap="square" />
        <path d="M11 2.5V11.5" stroke="#fffdf6" strokeWidth="1.4" strokeLinecap="square" />
      </svg>
    </span>
  );
}
```

- [ ] **Step 4: Create SmoothScroll.tsx**

```tsx
// components/SmoothScroll.tsx
'use client';

import { useEffect } from 'react';

export function SmoothScroll() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute('href');
      if (!id || id.length <= 1) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      window.scrollTo({ top: (el as HTMLElement).offsetTop - 60, behavior: 'smooth' });
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return null;
}
```

- [ ] **Step 5: Run tests — expect pass**

```bash
npx jest components/__tests__/LogoMark.test.tsx components/__tests__/SmoothScroll.test.tsx
```

Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add components/LogoMark.tsx components/SmoothScroll.tsx components/__tests__/
git commit -m "feat: add LogoMark SVG and SmoothScroll client component"
```

---

## Task 5: Nav component

**Files:**
- Create: `components/__tests__/Nav.test.tsx`
- Create: `components/Nav.tsx`
- Create: `components/Nav.module.css`

- [ ] **Step 1: Write failing test**

```tsx
// components/__tests__/Nav.test.tsx
import { render, screen } from '@testing-library/react';
import { Nav } from '../Nav';

describe('Nav', () => {
  it('renders the brand name', () => {
    render(<Nav />);
    expect(screen.getByText('Metric House')).toBeInTheDocument();
  });

  it('renders Get in touch CTA with mailto href', () => {
    render(<Nav />);
    const cta = screen.getByRole('link', { name: /get in touch/i });
    expect(cta).toHaveAttribute('href', 'mailto:info@metric-house.com');
  });

  it('renders About anchor link', () => {
    render(<Nav />);
    expect(screen.getByRole('link', { name: /^about$/i })).toHaveAttribute('href', '#about');
  });

  it('renders Products anchor link', () => {
    render(<Nav />);
    expect(screen.getByRole('link', { name: /^products$/i })).toHaveAttribute('href', '#products');
  });

  it('renders Contact anchor link', () => {
    render(<Nav />);
    expect(screen.getByRole('link', { name: /^contact$/i })).toHaveAttribute('href', '#contact');
  });
});
```

- [ ] **Step 2: Run — expect failure**

```bash
npx jest components/__tests__/Nav.test.tsx
```

Expected: FAIL — `Cannot find module '../Nav'`

- [ ] **Step 3: Create Nav.tsx**

```tsx
// components/Nav.tsx
import { LogoMark } from './LogoMark';
import styles from './Nav.module.css';

export function Nav() {
  return (
    <header className={styles.nav}>
      <div className={styles.inner}>
        <a href="#top" className={styles.brand} aria-label="Metric House home">
          <LogoMark />
          <span className={styles.brandName}>Metric House</span>
        </a>
        <nav className={styles.links} aria-label="Main navigation">
          <a href="#about" className={styles.navLink}>About</a>
          <a href="#products" className={styles.navLink}>Products</a>
          <a href="#contact" className={styles.navLink}>Contact</a>
          <a href="mailto:info@metric-house.com" className={styles.cta}>Get in touch</a>
        </nav>
      </div>
    </header>
  );
}
```

- [ ] **Step 4: Create Nav.module.css**

```css
/* components/Nav.module.css */

.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: color-mix(in oklab, var(--paper) 88%, transparent);
  -webkit-backdrop-filter: saturate(140%) blur(10px);
  backdrop-filter: saturate(140%) blur(10px);
  border-bottom: 1px solid var(--rule);
}

.inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 16px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--ink);
}

.brandName {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 15px;
  letter-spacing: -0.2px;
  color: var(--ink);
}

.links {
  display: flex;
  align-items: center;
  gap: 24px;
}

.navLink {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: var(--ink-2);
  text-decoration: none;
  transition: color 150ms ease;
}

.navLink:hover {
  color: var(--ink);
}

.cta {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: var(--white);
  background: var(--ink);
  padding: 8px 14px;
  border-radius: 3px;
  text-decoration: none;
  transition: background 150ms ease;
}

.cta:hover {
  background: var(--accent);
}

@media (max-width: 880px) {
  .inner {
    padding: 16px 24px;
  }

  .navLink {
    display: none;
  }
}
```

- [ ] **Step 5: Run — expect pass**

```bash
npx jest components/__tests__/Nav.test.tsx
```

Expected: PASS (5 tests)

- [ ] **Step 6: Commit**

```bash
git add components/Nav.tsx components/Nav.module.css components/__tests__/Nav.test.tsx
git commit -m "feat: add Nav component with sticky header and CTA"
```

---

## Task 6: Hero section

**Files:**
- Create: `components/__tests__/Hero.test.tsx`
- Create: `components/Hero.tsx`
- Create: `components/Hero.module.css`

- [ ] **Step 1: Write failing test**

```tsx
// components/__tests__/Hero.test.tsx
import { render, screen } from '@testing-library/react';
import { Hero } from '../Hero';

describe('Hero', () => {
  it('renders H1 with key text', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/software for the/i)).toBeInTheDocument();
  });

  it('renders the italic "actually" emphasis', () => {
    render(<Hero />);
    const em = document.querySelector('em');
    expect(em).toBeInTheDocument();
    expect(em?.textContent).toBe('actually');
  });

  it('renders See our products CTA pointing to #products', () => {
    render(<Hero />);
    const link = screen.getByRole('link', { name: /see our products/i });
    expect(link).toHaveAttribute('href', '#products');
  });

  it('renders ghost CTA with mailto href', () => {
    render(<Hero />);
    const link = screen.getByRole('link', { name: /info@metric-house\.com/i });
    expect(link).toHaveAttribute('href', 'mailto:info@metric-house.com');
  });

  it('renders meta: Chapel Hill NC', () => {
    render(<Hero />);
    expect(screen.getByText('Chapel Hill, NC')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run — expect failure**

```bash
npx jest components/__tests__/Hero.test.tsx
```

Expected: FAIL — `Cannot find module '../Hero'`

- [ ] **Step 3: Create Hero.tsx**

```tsx
// components/Hero.tsx
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <p className={styles.eyebrow}>
            <span className={styles.dot} aria-hidden="true">●</span>
            Metric House, LLC · Est. 2026 · North Carolina
          </p>
          <h1 className={styles.h1}>
            Software for the<br />
            way people <em>actually</em><br />
            want to work.
          </h1>
          <p className={styles.subhead}>
            We&apos;re a small software company building tools that fix specific, irritating problems
            in modern work — finding a good place to focus, writing a survey that won&apos;t embarrass
            you. Two products so far. More on the way.
          </p>
          <div className={styles.ctaRow}>
            <a href="#products" className={styles.primaryCta}>See our products ↓</a>
            <a href="mailto:info@metric-house.com" className={styles.ghostCta}>
              info@metric-house.com
            </a>
          </div>
        </div>
        <dl className={styles.meta}>
          <div className={styles.metaItem}>
            <dt className={styles.metaLabel}>Studio</dt>
            <dd className={styles.metaValue}>Independent · self-funded</dd>
          </div>
          <div className={styles.metaItem}>
            <dt className={styles.metaLabel}>Based</dt>
            <dd className={styles.metaValue}>Chapel Hill, NC</dd>
          </div>
          <div className={styles.metaItem}>
            <dt className={styles.metaLabel}>Products live</dt>
            <dd className={styles.metaValue}>2 — Knowmad, Formulate</dd>
          </div>
          <div className={styles.metaItem}>
            <dt className={styles.metaLabel}>Hiring</dt>
            <dd className={styles.metaValue}>Not yet — say hi anyway</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create Hero.module.css**

```css
/* components/Hero.module.css */

.hero {
  padding: 96px 0 80px;
  border-bottom: 1px solid var(--rule);
  scroll-margin-top: 60px;
}

.inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 40px;
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 56px;
  align-items: end;
}

.left {
  display: flex;
  flex-direction: column;
}

.eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 1.6px;
  text-transform: uppercase;
  color: var(--ink-3);
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 20px;
}

.dot {
  font-size: 8px;
  color: var(--warm);
  line-height: 1;
}

.h1 {
  font-family: 'Instrument Serif', Georgia, serif;
  font-weight: 400;
  font-size: clamp(56px, 8vw, 104px);
  line-height: 0.98;
  letter-spacing: -1.6px;
  margin-bottom: 28px;
}

.h1 em {
  font-style: italic;
  color: var(--accent);
}

.subhead {
  font-family: 'Inter', sans-serif;
  font-size: 19px;
  line-height: 1.55;
  color: var(--ink-2);
  max-width: 540px;
  margin-bottom: 36px;
}

.ctaRow {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-top: 22px;
  border-top: 1px solid var(--rule);
  flex-wrap: wrap;
}

.primaryCta {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: var(--white);
  background: var(--ink);
  padding: 11px 18px;
  border-radius: 3px;
  text-decoration: none;
  transition: background 150ms ease;
}

.primaryCta:hover {
  background: var(--accent);
}

.ghostCta {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: var(--ink);
  text-decoration: none;
  border: 1px solid var(--rule);
  padding: 11px 18px;
  border-radius: 3px;
  transition: border-color 150ms ease;
}

.ghostCta:hover {
  border-color: var(--ink);
}

.meta {
  border-left: 1px solid var(--rule);
  padding-left: 22px;
  align-self: end;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.metaItem {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.metaLabel {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10.5px;
  text-transform: uppercase;
  letter-spacing: 1.4px;
  color: var(--ink-3);
}

.metaValue {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: var(--ink);
}

@media (max-width: 880px) {
  .hero {
    padding: 64px 0;
  }

  .inner {
    grid-template-columns: 1fr;
    padding: 0 24px;
    gap: 40px;
    align-items: start;
  }

  .meta {
    border-left: none;
    padding-left: 0;
    border-top: 1px solid var(--rule);
    padding-top: 24px;
  }
}
```

- [ ] **Step 5: Run — expect pass**

```bash
npx jest components/__tests__/Hero.test.tsx
```

Expected: PASS (5 tests)

- [ ] **Step 6: Commit**

```bash
git add components/Hero.tsx components/Hero.module.css components/__tests__/Hero.test.tsx
git commit -m "feat: add Hero section with two-column layout and meta block"
```

---

## Task 7: About section

**Files:**
- Create: `components/__tests__/About.test.tsx`
- Create: `components/About.tsx`
- Create: `components/About.module.css`

- [ ] **Step 1: Write failing test**

```tsx
// components/__tests__/About.test.tsx
import { render, screen } from '@testing-library/react';
import { About } from '../About';

describe('About', () => {
  it('renders section H2', () => {
    render(<About />);
    expect(
      screen.getByRole('heading', { level: 2, name: /small studio/i })
    ).toBeInTheDocument();
  });

  it('renders section number 01', () => {
    render(<About />);
    expect(screen.getByText('01')).toBeInTheDocument();
  });

  it('renders all three principle titles', () => {
    render(<About />);
    expect(screen.getByRole('heading', { name: /specific over general/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /quiet by default/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /independent/i })).toBeInTheDocument();
  });

  it('renders italic product names in prose', () => {
    render(<About />);
    const ems = document.querySelectorAll('em.productName, [class*="productName"]');
    expect(ems.length).toBeGreaterThanOrEqual(2);
  });
});
```

- [ ] **Step 2: Run — expect failure**

```bash
npx jest components/__tests__/About.test.tsx
```

Expected: FAIL — `Cannot find module '../About'`

- [ ] **Step 3: Create About.tsx**

```tsx
// components/About.tsx
import styles from './About.module.css';

export function About() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.inner}>
        <div className={styles.rail}>
          <p className={styles.eyebrow}>§01 · About</p>
          <div className={styles.sectionNum}>
            <span className={styles.numBig}>01</span>
            <span className={styles.numTotal}>/03</span>
          </div>
        </div>
        <div className={styles.body}>
          <h2 className={styles.h2}>
            A small studio that builds the software it wishes existed.
          </h2>
          <p className={styles.prose}>
            Metric House started in 2026 as a software company built around{' '}
            <em className={styles.productName}>Knowmad</em>, a remote-work discovery app, and grew
            into a second product, <em className={styles.productName}>Formulate</em>, when we
            realized the surveys we needed didn&apos;t exist either.
          </p>
          <p className={styles.prose}>
            That&apos;s the pattern. We notice a workflow that&apos;s quietly bad — the kind of
            thing people accept because they assume it&apos;s fixed — and we go build the version
            we&apos;d actually want to use. Then we ship it.
          </p>
          <div className={styles.principles}>
            <div className={styles.principle}>
              <p className={styles.principleNum}>01</p>
              <h4 className={styles.principleTitle}>Specific over general</h4>
              <p className={styles.principleBody}>
                Each product solves one problem well. We&apos;d rather make Knowmad excellent than
                build a platform.
              </p>
            </div>
            <div className={styles.principle}>
              <p className={styles.principleNum}>02</p>
              <h4 className={styles.principleTitle}>Quiet by default</h4>
              <p className={styles.principleBody}>
                No dark patterns, no growth-hacked notifications. The software gets out of your way.
              </p>
            </div>
            <div className={styles.principle}>
              <p className={styles.principleNum}>03</p>
              <h4 className={styles.principleTitle}>Independent</h4>
              <p className={styles.principleBody}>
                Self-funded so we can move slow on the things worth getting right.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create About.module.css**

```css
/* components/About.module.css */

.about {
  padding: 100px 0;
  background: var(--paper-2);
  border-bottom: 1px solid var(--rule);
  scroll-margin-top: 60px;
}

.inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 40px;
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 64px;
  align-items: start;
}

.rail {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10.5px;
  text-transform: uppercase;
  letter-spacing: 1.4px;
  color: var(--ink-3);
}

.sectionNum {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.numBig {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 64px;
  color: var(--accent);
  line-height: 1;
}

.numTotal {
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  color: var(--ink-3);
}

.h2 {
  font-family: 'Instrument Serif', Georgia, serif;
  font-weight: 400;
  font-size: 44px;
  line-height: 1.06;
  letter-spacing: -0.8px;
  max-width: 620px;
  margin-bottom: 28px;
}

.prose {
  font-family: 'Inter', sans-serif;
  font-size: 17px;
  line-height: 1.65;
  color: var(--ink-2);
  max-width: 600px;
  margin-bottom: 20px;
}

.productName {
  font-family: 'Instrument Serif', Georgia, serif;
  font-style: italic;
  font-size: 19px;
  color: var(--ink);
}

.principles {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 48px;
  border-top: 1px solid var(--rule);
}

.principle {
  padding: 24px;
  border-right: 1px solid var(--rule);
}

.principle:last-child {
  border-right: none;
}

.principleNum {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--ink-3);
  margin-bottom: 8px;
}

.principleTitle {
  font-family: 'Instrument Serif', Georgia, serif;
  font-weight: 400;
  font-size: 22px;
  margin-bottom: 10px;
}

.principleBody {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: var(--ink-2);
  line-height: 1.6;
}

@media (max-width: 880px) {
  .about {
    padding: 64px 0;
  }

  .inner {
    grid-template-columns: 1fr;
    padding: 0 24px;
    gap: 40px;
  }

  .principles {
    grid-template-columns: 1fr;
  }

  .principle {
    border-right: none;
    border-bottom: 1px solid var(--rule);
    padding: 24px 0;
  }

  .principle:last-child {
    border-bottom: none;
  }
}
```

- [ ] **Step 5: Run — expect pass**

```bash
npx jest components/__tests__/About.test.tsx
```

Expected: PASS (4 tests)

- [ ] **Step 6: Commit**

```bash
git add components/About.tsx components/About.module.css components/__tests__/About.test.tsx
git commit -m "feat: add About section with principles strip"
```

---

## Task 8: Products section

**Files:**
- Create: `components/__tests__/Products.test.tsx`
- Create: `components/Products.tsx`
- Create: `components/Products.module.css`

- [ ] **Step 1: Write failing test**

```tsx
// components/__tests__/Products.test.tsx
import { render, screen } from '@testing-library/react';
import { Products } from '../Products';

describe('Products', () => {
  it('renders section H2', () => {
    render(<Products />);
    expect(screen.getByRole('heading', { level: 2, name: /two things/i })).toBeInTheDocument();
  });

  it('renders two product article elements', () => {
    render(<Products />);
    const articles = document.querySelectorAll('article');
    expect(articles).toHaveLength(2);
  });

  it('renders Knowmad H3 heading', () => {
    render(<Products />);
    expect(screen.getByRole('heading', { level: 3, name: /knowmad/i })).toBeInTheDocument();
  });

  it('renders Formulate H3 heading', () => {
    render(<Products />);
    expect(screen.getByRole('heading', { level: 3, name: /formulate/i })).toBeInTheDocument();
  });

  it('knowmad link has correct href and opens new tab', () => {
    render(<Products />);
    const link = screen.getByRole('link', { name: /visit knowmad\.work/i });
    expect(link).toHaveAttribute('href', 'https://knowmad.work');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener');
  });

  it('formulate link has correct href and opens new tab', () => {
    render(<Products />);
    const link = screen.getByRole('link', { name: /visit formulatesurveys\.com/i });
    expect(link).toHaveAttribute('href', 'https://formulatesurveys.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener');
  });

  it('product visuals are aria-hidden', () => {
    render(<Products />);
    const visuals = document.querySelectorAll('[aria-hidden="true"]');
    expect(visuals.length).toBeGreaterThanOrEqual(2);
  });
});
```

- [ ] **Step 2: Run — expect failure**

```bash
npx jest components/__tests__/Products.test.tsx
```

Expected: FAIL — `Cannot find module '../Products'`

- [ ] **Step 3: Create Products.tsx**

```tsx
// components/Products.tsx
import styles from './Products.module.css';

function KnowmadMockup() {
  return (
    <div className={styles.productVisual} aria-hidden="true">
      <div className={styles.browserChrome}>
        <div className={styles.chromeLeft}>
          <span className={styles.lockIcon}>▬</span>
          <span>knowmad.work</span>
        </div>
        <span className={styles.statusLive}>● live</span>
      </div>
      <div className={styles.browserBody}>
        <div className={styles.searchBar}>
          <span className={styles.searchText}>Today I want to do</span>
          <span className={styles.pillInk}>focus work</span>
          <span className={styles.pillPaper}>+ alone</span>
        </div>
        <div className={styles.map}>
          <div
            className={`${styles.pin}`}
            style={{ left: '22%', top: '38%' }}
          >
            <span className={styles.pinLabel}>Carrboro Library</span>
            <span className={`${styles.pinDot} ${styles.pinDotAccent}`} />
          </div>
          <div
            className={styles.pin}
            style={{ left: '48%', top: '56%' }}
          >
            <span className={styles.pinLabel}>Open Eye Café · 92% match</span>
            <span className={`${styles.pinDot} ${styles.pinDotWarm} ${styles.pinDotLarge}`} />
          </div>
          <div
            className={styles.pin}
            style={{ left: '74%', top: '32%' }}
          >
            <span className={styles.pinLabel}>Perennial · Durham</span>
            <span className={`${styles.pinDot} ${styles.pinDotAccent}`} />
          </div>
          <div
            className={styles.pin}
            style={{ left: '38%', top: '76%' }}
          >
            <span className={styles.pinLabel}>Looking Glass</span>
            <span className={`${styles.pinDot} ${styles.pinDotAccent}`} />
          </div>
        </div>
        <div className={styles.mapLegend}>
          <span className={styles.legendItem}>
            <span className={`${styles.legendSwatch} ${styles.legendSwatchWarm}`} />
            Best match
          </span>
          <span className={styles.legendItem}>
            <span className={`${styles.legendSwatch} ${styles.legendSwatchAccent}`} />
            Good fit
          </span>
          <span className={styles.legendRight}>4 spots within 2.4 mi</span>
        </div>
      </div>
    </div>
  );
}

function FormulateMockup() {
  return (
    <div className={styles.productVisual} aria-hidden="true">
      <div className={styles.browserChrome}>
        <div className={styles.chromeLeft}>
          <span className={styles.lockIcon}>▬</span>
          <span>formulatesurveys.com</span>
        </div>
        <span className={styles.statusComingSoon}>● coming soon</span>
      </div>
      <div className={styles.browserBody}>
        <div className={styles.docHeader}>
          <span>onboarding_v3.draft</span>
          <span className={styles.issuesFlagged}>2 issues flagged</span>
        </div>
        <div className={`${styles.question} ${styles.questionAccent}`}>
          <p className={styles.questionNum}>Q1</p>
          <p className={styles.questionText}>
            In the last 7 days, how many days did you open the app?{' '}
            <span className={styles.questionHint}>(0–7)</span>
          </p>
        </div>
        <div className={`${styles.question} ${styles.questionWarm}`}>
          <p className={styles.questionNum}>Q2 · Leading</p>
          <p className={styles.questionText}>
            Wouldn&apos;t you agree that our{' '}
            <mark className={styles.highlight}>new dashboard is a major improvement</mark>?
          </p>
          <p className={styles.questionFlag}>
            → rewrite as neutral comparison · cite: Schuman &amp; Presser 1981
          </p>
        </div>
        <div className={`${styles.question} ${styles.questionWarm}`}>
          <p className={styles.questionNum}>Q3 · Double-barreled</p>
          <p className={styles.questionText}>
            How satisfied are you with our{' '}
            <mark className={styles.highlight}>pricing and support</mark>?
          </p>
          <p className={styles.questionFlag}>
            → split into two questions · cite: DeVellis 2017
          </p>
        </div>
      </div>
    </div>
  );
}

export function Products() {
  return (
    <section id="products" className={styles.products}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>§02 · Products</p>
            <h2 className={styles.h2}>Two things, made well.</h2>
          </div>
          <p className={styles.headerNote}>
            Both are independently developed and supported by Metric House. Click through for full
            product sites.
          </p>
        </div>

        <article className={styles.card}>
          <div className={styles.cardMeta}>
            <div className={styles.productTag}>
              <span className={styles.productNum}>P/01</span>
              <span className={styles.productStatus}>Live in NC Triangle</span>
            </div>
            <h3 className={styles.productName}>Knowmad</h3>
            <p className={styles.tagline}>
              A remote-work discovery app for finding the right place to work — today, near you.
            </p>
            <p className={styles.blurb}>
              Tell Knowmad what kind of work you&apos;re doing — focus, light, alone, with a group
              — and it matches you with cafés, libraries, and coworking spots in your area that fit.
              No more rolling the dice on a noisy bakery at 9am.
            </p>
            <dl className={styles.stats}>
              <div className={styles.stat}>
                <dt className={styles.statLabel}>Coverage</dt>
                <dd className={styles.statValue}>Chapel Hill · Durham · Carrboro</dd>
              </div>
              <div className={styles.stat}>
                <dt className={styles.statLabel}>For</dt>
                <dd className={styles.statValue}>Remote &amp; hybrid workers</dd>
              </div>
            </dl>
            <a
              href="https://knowmad.work"
              className={styles.productLink}
              target="_blank"
              rel="noopener"
            >
              <span>Visit knowmad.work</span>
              <span className={styles.arrow}>→</span>
            </a>
          </div>
          <KnowmadMockup />
        </article>

        <article className={styles.card}>
          <div className={styles.cardMeta}>
            <div className={styles.productTag}>
              <span className={styles.productNum}>P/02</span>
              <span className={styles.productStatus}>In development</span>
            </div>
            <h3 className={styles.productName}>Formulate</h3>
            <p className={styles.tagline}>
              The AI-powered survey teammate you need to develop, deploy, and analyze your work.
            </p>
            <p className={styles.blurb}>
              Trained on PhD-level and corporate-level knowledge and experience, Formulate gives you
              the methodology guardrails to generate the insights you actually need. It catches the
              leading questions, vague scales, and double-barreled prompts before your respondents
              ever see them.
            </p>
            <dl className={styles.stats}>
              <div className={styles.stat}>
                <dt className={styles.statLabel}>Stage</dt>
                <dd className={styles.statValue}>Active development</dd>
              </div>
              <div className={styles.stat}>
                <dt className={styles.statLabel}>For</dt>
                <dd className={styles.statValue}>Researchers, PMs, ops teams</dd>
              </div>
            </dl>
            <a
              href="https://formulatesurveys.com"
              className={styles.productLink}
              target="_blank"
              rel="noopener"
            >
              <span>Visit formulatesurveys.com</span>
              <span className={styles.arrow}>→</span>
            </a>
          </div>
          <FormulateMockup />
        </article>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create Products.module.css**

```css
/* components/Products.module.css */

.products {
  padding: 100px 0 110px;
  border-bottom: 1px solid var(--rule);
  scroll-margin-top: 60px;
}

.inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 40px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 56px;
}

.eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10.5px;
  text-transform: uppercase;
  letter-spacing: 1.4px;
  color: var(--ink-3);
  margin-bottom: 10px;
}

.h2 {
  font-family: 'Instrument Serif', Georgia, serif;
  font-weight: 400;
  font-size: 56px;
  line-height: 1.02;
  letter-spacing: -1px;
}

.headerNote {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: var(--ink-3);
  max-width: 240px;
  text-align: right;
  line-height: 1.5;
}

.card {
  display: grid;
  grid-template-columns: 1fr 480px;
  gap: 56px;
  padding: 44px 0;
  border-top: 1px solid var(--rule);
}

.card + .card {
  border-top: 1px solid var(--rule);
}

.cardMeta {
  display: flex;
  flex-direction: column;
}

.productTag {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.productNum {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--ink-3);
}

.productStatus {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

.productName {
  font-family: 'Instrument Serif', Georgia, serif;
  font-weight: 400;
  font-size: 56px;
  line-height: 1;
  letter-spacing: -1.4px;
  margin-bottom: 16px;
}

.tagline {
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  color: var(--ink-2);
  max-width: 520px;
  line-height: 1.5;
  margin-bottom: 16px;
}

.blurb {
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  color: var(--ink-2);
  line-height: 1.65;
  max-width: 520px;
  margin-bottom: 24px;
}

.stats {
  border-top: 1px dashed var(--rule);
  border-bottom: 1px dashed var(--rule);
  margin-bottom: 24px;
}

.stat {
  display: flex;
  gap: 16px;
  padding: 10px 0;
  align-items: baseline;
}

.stat + .stat {
  border-top: 1px dashed var(--rule);
}

.statLabel {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10.5px;
  text-transform: uppercase;
  letter-spacing: 1.4px;
  color: var(--ink-3);
  min-width: 80px;
  flex-shrink: 0;
}

.statValue {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: var(--ink);
}

.productLink {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: var(--ink);
  text-decoration: none;
  border-bottom: 1px solid var(--ink);
  padding-bottom: 1px;
  align-self: flex-start;
  transition: gap 150ms ease, border-color 150ms ease;
  margin-top: auto;
}

.productLink:hover {
  gap: 12px;
  border-color: var(--accent);
}

.arrow {
  font-family: 'JetBrains Mono', monospace;
}

/* ── Browser window mockup ── */

.productVisual {
  border: 1px solid var(--rule);
  border-radius: 4px;
  background: var(--white);
  overflow: hidden;
  align-self: start;
  min-height: 360px;
}

.browserChrome {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  background: var(--paper-2);
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--ink-3);
}

.chromeLeft {
  display: flex;
  align-items: center;
  gap: 6px;
}

.lockIcon {
  color: var(--ink-4);
  font-size: 7px;
}

.statusLive {
  color: var(--accent);
}

.statusComingSoon {
  color: var(--ink-3);
}

.browserBody {
  padding: 22px;
}

/* ── Knowmad mockup ── */

.searchBar {
  display: flex;
  align-items: center;
  gap: 6px;
  border: 1px solid var(--rule);
  border-radius: 24px;
  padding: 8px 14px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: var(--ink-3);
  margin-bottom: 16px;
}

.searchText {
  flex: 1;
}

.pillInk {
  background: var(--ink);
  color: var(--white);
  font-size: 12px;
  padding: 3px 10px;
  border-radius: 24px;
}

.pillPaper {
  background: var(--paper-3);
  color: var(--ink-2);
  font-size: 12px;
  padding: 3px 10px;
  border-radius: 24px;
}

.map {
  height: 220px;
  background: var(--paper-2);
  position: relative;
  background-image:
    linear-gradient(var(--rule-soft) 1px, transparent 1px),
    linear-gradient(90deg, var(--rule-soft) 1px, transparent 1px);
  background-size: 28px 28px;
  margin-bottom: 12px;
  overflow: hidden;
}

.pin {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  transform: translate(-50%, -100%);
}

.pinLabel {
  background: var(--white);
  font-family: 'Inter', sans-serif;
  font-size: 9px;
  padding: 2px 6px;
  border-radius: 3px;
  white-space: nowrap;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  color: var(--ink);
}

.pinDot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 3px solid var(--white);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.pinDotAccent {
  background: var(--accent);
}

.pinDotWarm {
  background: var(--warm);
}

.pinDotLarge {
  width: 18px;
  height: 18px;
}

.mapLegend {
  display: flex;
  align-items: center;
  gap: 14px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: var(--ink-3);
}

.legendItem {
  display: flex;
  align-items: center;
  gap: 5px;
}

.legendSwatch {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.legendSwatchWarm {
  background: var(--warm);
}

.legendSwatchAccent {
  background: var(--accent);
}

.legendRight {
  margin-left: auto;
}

/* ── Formulate mockup ── */

.docHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--ink-3);
  padding-bottom: 12px;
  margin-bottom: 14px;
  border-bottom: 1px dashed var(--rule);
}

.issuesFlagged {
  color: var(--warm);
}

.question {
  border-left: 2px solid transparent;
  padding: 10px 0 12px 14px;
  margin-bottom: 14px;
}

.questionAccent {
  border-left-color: var(--accent);
}

.questionWarm {
  border-left-color: var(--warm);
}

.questionNum {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10.5px;
  color: var(--ink-3);
  margin-bottom: 5px;
}

.questionText {
  font-family: 'Inter', sans-serif;
  font-size: 13.5px;
  color: var(--ink);
  line-height: 1.5;
}

.questionHint {
  color: var(--ink-3);
}

.highlight {
  background: linear-gradient(
    transparent 60%,
    color-mix(in oklab, var(--warm) 25%, transparent) 60%
  );
  padding: 0 1px;
  color: var(--ink);
}

.questionFlag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10.5px;
  color: var(--warm);
  margin-top: 8px;
}

/* ── Responsive ── */

@media (max-width: 880px) {
  .products {
    padding: 64px 0;
  }

  .inner {
    padding: 0 24px;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .headerNote {
    text-align: left;
    max-width: none;
  }

  .card {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
```

- [ ] **Step 5: Run — expect pass**

```bash
npx jest components/__tests__/Products.test.tsx
```

Expected: PASS (7 tests)

- [ ] **Step 6: Commit**

```bash
git add components/Products.tsx components/Products.module.css components/__tests__/Products.test.tsx
git commit -m "feat: add Products section with Knowmad and Formulate cards and mockups"
```

---

## Task 9: Contact section

**Files:**
- Create: `components/__tests__/Contact.test.tsx`
- Create: `components/Contact.tsx`
- Create: `components/Contact.module.css`

- [ ] **Step 1: Write failing test**

```tsx
// components/__tests__/Contact.test.tsx
import { render, screen } from '@testing-library/react';
import { Contact } from '../Contact';

describe('Contact', () => {
  it('renders H2 with key text', () => {
    render(<Contact />);
    expect(screen.getByRole('heading', { level: 2, name: /hear from you/i })).toBeInTheDocument();
  });

  it('renders italic span in H2', () => {
    render(<Contact />);
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2.querySelector('em')).toBeInTheDocument();
  });

  it('renders mailto link', () => {
    render(<Contact />);
    const link = screen.getByRole('link', { name: /info@metric-house\.com/i });
    expect(link).toHaveAttribute('href', 'mailto:info@metric-house.com');
  });

  it('renders WRITE TO US label', () => {
    render(<Contact />);
    expect(screen.getByText('WRITE TO US')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run — expect failure**

```bash
npx jest components/__tests__/Contact.test.tsx
```

Expected: FAIL — `Cannot find module '../Contact'`

- [ ] **Step 3: Create Contact.tsx**

```tsx
// components/Contact.tsx
import styles from './Contact.module.css';

export function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>§03 · Contact</p>
        <h2 className={styles.h2}>
          We&apos;d love to <em>hear from you</em>.
        </h2>
        <p className={styles.body}>
          Questions about Knowmad or Formulate, partnerships, press, an idea you want to throw at
          us, or just want to say hi — the inbox is small and we read everything.
        </p>
        <a href="mailto:info@metric-house.com" className={styles.mailBox}>
          <span className={styles.mailInner}>
            <span className={styles.mailLabel}>WRITE TO US</span>
            <span className={styles.mailAddress}>info@metric-house.com</span>
          </span>
          <span className={styles.mailArrow} aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create Contact.module.css**

```css
/* components/Contact.module.css */

.contact {
  padding: 120px 0;
  background: var(--ink);
  scroll-margin-top: 60px;
}

.inner {
  max-width: 880px;
  margin: 0 auto;
  padding: 0 40px;
}

.eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10.5px;
  text-transform: uppercase;
  letter-spacing: 1.4px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 24px;
}

.h2 {
  font-family: 'Instrument Serif', Georgia, serif;
  font-weight: 400;
  font-size: clamp(48px, 7vw, 96px);
  line-height: 1;
  letter-spacing: -1.6px;
  color: var(--white);
  margin-bottom: 28px;
}

.h2 em {
  font-style: italic;
  color: #cfd6dc;
}

.body {
  font-family: 'Inter', sans-serif;
  font-size: 17px;
  color: rgba(255, 253, 246, 0.66);
  max-width: 560px;
  line-height: 1.6;
  margin-bottom: 40px;
}

.mailBox {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px 14px 22px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.18);
  text-decoration: none;
  color: var(--white);
  transition: background 150ms ease, border-color 150ms ease;
}

.mailBox:hover {
  background: var(--white);
  border-color: var(--white);
}

.mailBox:hover .mailLabel {
  color: rgba(20, 19, 15, 0.55);
}

.mailBox:hover .mailAddress {
  color: var(--ink);
}

.mailBox:hover .mailArrow {
  color: var(--ink);
}

.mailInner {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.mailLabel {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10.5px;
  color: rgba(255, 255, 255, 0.55);
  letter-spacing: 0.8px;
  transition: color 150ms ease;
}

.mailAddress {
  font-family: 'Instrument Serif', Georgia, serif;
  font-style: italic;
  font-size: 26px;
  transition: color 150ms ease;
}

.mailArrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  transition: color 150ms ease;
}

@media (max-width: 880px) {
  .contact {
    padding: 80px 0;
  }

  .inner {
    padding: 0 24px;
  }
}
```

- [ ] **Step 5: Run — expect pass**

```bash
npx jest components/__tests__/Contact.test.tsx
```

Expected: PASS (4 tests)

- [ ] **Step 6: Commit**

```bash
git add components/Contact.tsx components/Contact.module.css components/__tests__/Contact.test.tsx
git commit -m "feat: add Contact section with dark mail-box CTA"
```

---

## Task 10: Footer

**Files:**
- Create: `components/__tests__/Footer.test.tsx`
- Create: `components/Footer.tsx`
- Create: `components/Footer.module.css`

- [ ] **Step 1: Write failing test**

```tsx
// components/__tests__/Footer.test.tsx
import { render, screen } from '@testing-library/react';
import { Footer } from '../Footer';

describe('Footer', () => {
  it('renders copyright text', () => {
    render(<Footer />);
    expect(screen.getByText(/© 2026 Metric House/i)).toBeInTheDocument();
  });

  it('renders Knowmad footer link with noopener', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: /knowmad ↗/i });
    expect(link).toHaveAttribute('href', 'https://knowmad.work');
    expect(link).toHaveAttribute('rel', 'noopener');
  });

  it('renders Formulate footer link with noopener', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: /formulate ↗/i });
    expect(link).toHaveAttribute('href', 'https://formulatesurveys.com');
    expect(link).toHaveAttribute('rel', 'noopener');
  });

  it('renders mailto link', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: /info@metric-house\.com/i });
    expect(link).toHaveAttribute('href', 'mailto:info@metric-house.com');
  });

  it('renders brand tagline', () => {
    render(<Footer />);
    expect(screen.getByText(/independent software studio/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run — expect failure**

```bash
npx jest components/__tests__/Footer.test.tsx
```

Expected: FAIL — `Cannot find module '../Footer'`

- [ ] **Step 3: Create Footer.tsx**

```tsx
// components/Footer.tsx
import { LogoMark } from './LogoMark';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.brandMark}>
              <LogoMark />
              <span className={styles.brandName}>Metric House, LLC</span>
            </div>
            <p className={styles.tagline}>
              Independent software studio. Building the tools we wish existed, one workflow at a
              time.
            </p>
          </div>
          <div className={styles.col}>
            <p className={styles.colHeading}>Products</p>
            <a
              href="https://knowmad.work"
              className={styles.colLink}
              target="_blank"
              rel="noopener"
            >
              Knowmad ↗
            </a>
            <a
              href="https://formulatesurveys.com"
              className={styles.colLink}
              target="_blank"
              rel="noopener"
            >
              Formulate ↗
            </a>
          </div>
          <div className={styles.col}>
            <p className={styles.colHeading}>Company</p>
            <a href="#about" className={styles.colLink}>About</a>
            <a href="#contact" className={styles.colLink}>Contact</a>
          </div>
          <div className={styles.col}>
            <p className={styles.colHeading}>Reach us</p>
            <a href="mailto:info@metric-house.com" className={styles.colLink}>
              info@metric-house.com
            </a>
            <span className={styles.colMuted}>Chapel Hill, NC</span>
          </div>
        </div>
        <div className={styles.bottom}>
          <span>© 2026 Metric House, LLC · All rights reserved</span>
          <span>v1.0 · Made in NC</span>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Create Footer.module.css**

```css
/* components/Footer.module.css */

.footer {
  background: var(--paper);
  padding: 52px 0 40px;
}

.inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 40px;
}

.grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr;
  gap: 40px;
  padding-bottom: 36px;
  border-bottom: 1px solid var(--rule);
}

.brand {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.brandMark {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brandName {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: var(--ink);
  letter-spacing: -0.2px;
}

.tagline {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: var(--ink-2);
  line-height: 1.6;
  max-width: 280px;
}

.col {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.colHeading {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10.5px;
  text-transform: uppercase;
  letter-spacing: 1.4px;
  color: var(--ink-3);
  margin-bottom: 4px;
}

.colLink {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: var(--ink-2);
  text-decoration: none;
  transition: color 150ms ease;
}

.colLink:hover {
  color: var(--ink);
}

.colMuted {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: var(--ink-3);
}

.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 28px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--ink-3);
}

@media (max-width: 880px) {
  .inner {
    padding: 0 24px;
  }

  .grid {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }

  .bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
```

- [ ] **Step 5: Run — expect pass**

```bash
npx jest components/__tests__/Footer.test.tsx
```

Expected: PASS (5 tests)

- [ ] **Step 6: Commit**

```bash
git add components/Footer.tsx components/Footer.module.css components/__tests__/Footer.test.tsx
git commit -m "feat: add Footer with 4-column grid and brand block"
```

---

## Task 11: layout.tsx, page.tsx, and full-page smoke test

**Files:**
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `components/__tests__/Page.test.tsx`

- [ ] **Step 1: Write full-page smoke test**

```tsx
// components/__tests__/Page.test.tsx
import { render, screen } from '@testing-library/react';
import Home from '../../app/page';

describe('Home page', () => {
  it('renders without crashing', () => {
    render(<Home />);
  });

  it('has exactly one H1', () => {
    render(<Home />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
  });

  it('has H2 headings for About, Products, Contact sections', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { level: 2, name: /small studio/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /two things/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /hear from you/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run — expect failure**

```bash
npx jest components/__tests__/Page.test.tsx
```

Expected: FAIL — `Cannot find module '../../app/page'`

- [ ] **Step 3: Create app/layout.tsx**

```tsx
// app/layout.tsx
import type { Metadata } from 'next';
import { SmoothScroll } from '@/components/SmoothScroll';
import './globals.css';

export const metadata: Metadata = {
  title: 'Metric House — Software for better workflows',
  description:
    'Metric House is a software company building Knowmad and Formulate. Tools that help people work better.',
  openGraph: {
    title: 'Metric House — Software for better workflows',
    description:
      'Metric House is a software company building Knowmad and Formulate. Tools that help people work better.',
    url: 'https://metric-house.com',
    siteName: 'Metric House',
    images: [{ url: 'https://metric-house.com/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Metric House — Software for better workflows',
    images: ['https://metric-house.com/og-image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Create app/page.tsx**

```tsx
// app/page.tsx
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Products } from '@/components/Products';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Products />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 5: Run — expect pass**

```bash
npx jest components/__tests__/Page.test.tsx
```

Expected: PASS (3 tests)

- [ ] **Step 6: Run all tests to confirm nothing broken**

```bash
npx jest
```

Expected: All tests pass (no failures).

- [ ] **Step 7: Commit**

```bash
git add app/layout.tsx app/page.tsx components/__tests__/Page.test.tsx
git commit -m "feat: wire layout and page, composing all six sections"
```

---

## Task 12: OG image and favicon generation script

**Files:**
- Create: `scripts/generate-og.ts`
- Run script to populate `public/`

- [ ] **Step 1: Create scripts/generate-og.ts**

```ts
// scripts/generate-og.ts
import sharp from 'sharp';
import toIco from 'to-ico';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const PUBLIC = join(process.cwd(), 'public');
mkdirSync(PUBLIC, { recursive: true });

const MH_PATHS = `
  <path d="M2 11.5V2.5" stroke="#fffdf6" stroke-width="1.4" stroke-linecap="square"/>
  <path d="M2 2.5L5.2 8" stroke="#fffdf6" stroke-width="1.4" stroke-linecap="square"/>
  <path d="M5.2 8L8.4 2.5" stroke="#fffdf6" stroke-width="1.4" stroke-linecap="square"/>
  <path d="M8.4 2.5V11.5" stroke="#fffdf6" stroke-width="1.4" stroke-linecap="square"/>
  <path d="M11 2.5V11.5" stroke="#fffdf6" stroke-width="1.4" stroke-linecap="square"/>
`;

function markSvg(size: number): string {
  const r = Math.round(size * 0.12);
  const pad = Math.round(size * 0.18);
  const inner = size - pad * 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    <rect width="${size}" height="${size}" rx="${r}" fill="#14130f"/>
    <svg x="${pad}" y="${pad}" width="${inner}" height="${inner}" viewBox="0 0 14 14" fill="none">
      ${MH_PATHS}
    </svg>
  </svg>`;
}

async function generateOg() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <rect width="1200" height="630" fill="#f6f3ec"/>
    <!-- grain approximation -->
    <rect width="1200" height="630" fill="url(#grain)" opacity="0.04"/>
    <!-- MH mark 64x64 -->
    <rect x="80" y="200" width="64" height="64" rx="8" fill="#14130f"/>
    <svg x="95" y="215" width="34" height="34" viewBox="0 0 14 14" fill="none">
      ${MH_PATHS}
    </svg>
    <!-- Company name -->
    <text x="158" y="245" font-family="Georgia, serif" font-size="28" fill="#14130f" letter-spacing="-0.5">Metric House</text>
    <!-- Rule -->
    <line x1="80" y1="290" x2="520" y2="290" stroke="#d8d2bf" stroke-width="1"/>
    <!-- H1 line 1 -->
    <text x="80" y="360" font-family="Georgia, serif" font-size="64" fill="#14130f" letter-spacing="-2">Software for the</text>
    <!-- H1 line 2 -->
    <text x="80" y="440" font-family="Georgia, serif" font-size="64" fill="#14130f" letter-spacing="-2">way people </text>
    <text x="594" y="440" font-family="Georgia, serif" font-size="64" fill="#1a3d52" font-style="italic" letter-spacing="-2">actually</text>
    <!-- H1 line 3 -->
    <text x="80" y="520" font-family="Georgia, serif" font-size="64" fill="#14130f" letter-spacing="-2">want to work.</text>
    <!-- Domain label -->
    <text x="80" y="595" font-family="monospace" font-size="14" fill="#6b6657" letter-spacing="1.4">METRIC-HOUSE.COM</text>
  </svg>`;

  await sharp(Buffer.from(svg)).png().toFile(join(PUBLIC, 'og-image.png'));
  console.log('✓ og-image.png');
}

async function generateFavicons() {
  const faviconSvg = markSvg(32);
  writeFileSync(join(PUBLIC, 'favicon.svg'), markSvg(64));

  const png32 = await sharp(Buffer.from(faviconSvg)).resize(32, 32).png().toBuffer();
  const ico = await toIco([png32]);
  writeFileSync(join(PUBLIC, 'favicon.ico'), ico);
  console.log('✓ favicon.ico');

  const appleSvg = markSvg(180);
  await sharp(Buffer.from(appleSvg)).resize(180, 180).png().toFile(join(PUBLIC, 'apple-touch-icon.png'));
  console.log('✓ apple-touch-icon.png (180×180)');
}

async function main() {
  await generateOg();
  await generateFavicons();
  console.log('All assets generated.');
}

main().catch((err) => { console.error(err); process.exit(1); });
```

- [ ] **Step 2: Run the script**

```bash
npm run generate
```

Expected output:
```
✓ og-image.png
✓ favicon.ico
✓ apple-touch-icon.png (180×180)
All assets generated.
```

- [ ] **Step 3: Verify files exist**

```bash
ls -lh public/og-image.png public/favicon.ico public/apple-touch-icon.png public/favicon.svg
```

Expected: all four files present with non-zero sizes.

- [ ] **Step 4: Commit**

```bash
git add scripts/generate-og.ts public/og-image.png public/favicon.ico public/apple-touch-icon.png public/favicon.svg
git commit -m "feat: add OG image and favicon generation script, commit generated assets"
```

---

## Task 13: Static assets — robots.txt and sitemap.xml

**Files:**
- Create: `public/robots.txt`
- Create: `public/sitemap.xml`

- [ ] **Step 1: Create public/robots.txt**

```
User-agent: *
Allow: /
Sitemap: https://metric-house.com/sitemap.xml
```

- [ ] **Step 2: Create public/sitemap.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://metric-house.com/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

- [ ] **Step 3: Commit**

```bash
git add public/robots.txt public/sitemap.xml
git commit -m "feat: add robots.txt and sitemap.xml"
```

---

## Task 14: Verify static build

- [ ] **Step 1: Run type check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 2: Run all tests one final time**

```bash
npx jest
```

Expected: all tests pass.

- [ ] **Step 3: Build the site**

```bash
npm run build
```

Expected: build completes with no errors. An `out/` directory is created.

- [ ] **Step 4: Verify output directory**

```bash
ls out/
```

Expected: `index.html`, `_next/`, `og-image.png`, `favicon.ico`, `robots.txt`, `sitemap.xml` all present.

- [ ] **Step 5: Spot-check index.html for key content**

```bash
grep -c "Metric House" out/index.html
grep "metric-house.com/og-image.png" out/index.html
```

Expected: first command outputs a number > 0; second command outputs at least one matching line.

- [ ] **Step 6: Add out/ to .gitignore**

Open `.gitignore` and confirm `out/` and `.next/` are listed. If not, add them:

```
# append to .gitignore if missing
out/
.next/
```

```bash
git add .gitignore
git commit -m "chore: confirm out/ and .next/ are gitignored"
```

---

## Task 15: Push to GitHub

- [ ] **Step 1: Confirm gh CLI is authenticated**

```bash
gh auth status
```

Expected: shows `Logged in to github.com as tsteelman91`. If not: run `gh auth login` and follow prompts.

- [ ] **Step 2: Create the remote repo and push**

```bash
gh repo create tsteelman91/metric-house-site \
  --public \
  --source=. \
  --remote=origin \
  --push
```

Expected output includes `✓ Created repository tsteelman91/metric-house-site` and a push confirmation.

- [ ] **Step 3: Verify on GitHub**

```bash
gh repo view tsteelman91/metric-house-site --web
```

Expected: opens the repo in the browser showing all commits.

- [ ] **Step 4: Note Vercel deploy steps (manual — done by user)**

> After the repo is live, the user will:
> 1. Go to vercel.com → Add New Project → Import `tsteelman91/metric-house-site`
> 2. Framework preset: Next.js (auto-detected)
> 3. No env vars needed
> 4. Deploy — Vercel handles `output: 'export'` automatically
> 5. Add `metric-house.com` custom domain in Project → Settings → Domains
> 6. Update DNS at your registrar: add Vercel's A record (76.76.21.21) for `@` and a CNAME for `www`

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Task |
|---|---|
| Sticky nav with frosted glass, CTA | Task 5 |
| Hero two-column grid, H1, meta dl | Task 6 |
| About two-column, principles strip | Task 7 |
| Products two cards, Knowmad mockup, Formulate mockup | Task 8 |
| Contact dark block, mail-box CTA | Task 9 |
| Footer 4-col grid, bottom row | Task 10 |
| Google Fonts: Inter, Instrument Serif, JetBrains Mono | Task 11 (layout.tsx) |
| Design tokens as CSS custom properties | Task 3 |
| Grain overlay | Task 3 |
| scroll-margin-top: 60px on sections | Tasks 6–9 (each module) |
| Smooth scroll JS | Task 4 (SmoothScroll.tsx) |
| aria-hidden on product visuals | Task 8 |
| rel="noopener" on external links | Tasks 8, 10 |
| OG meta tags | Task 11 (layout.tsx metadata) |
| favicon + apple-touch-icon | Task 12 |
| robots.txt + sitemap.xml | Task 13 |
| Static build verified | Task 14 |
| GitHub push | Task 15 |
| 880px responsive breakpoint | All component CSS modules |

**Placeholder scan:** No TBDs or TODOs. All code is complete.

**Type consistency:** `LogoMark` used identically in `Nav.tsx` and `Footer.tsx`. CSS Module class names used consistently — `styles.productVisual` in Products.tsx matches the class defined in Products.module.css. `SmoothScroll` returns `null` consistently.

**Ambiguity resolved:** The `to-ico` package requires PNG buffers as an array — the script passes `[png32]` correctly.
