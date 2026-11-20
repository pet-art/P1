# CLAUDE.md

Guidance for AI assistants working in this repository.

## Project overview

**فينيش ميتال (Finish Metal)** — a single-page, Arabic (RTL) marketing/landing site for a powder-coating and heat-oven metal painting business in Saudi Arabia. It was scaffolded from a Google AI Studio applet template (Vite + React + Tailwind), so some tooling (Gemini, Express) is present in `package.json` but **not currently used by the app code**.

Primary goal of the site: convert visitors into WhatsApp/phone leads.

## Tech stack

- React 19 + TypeScript (`~5.8`), bundled with Vite 6 (`@vitejs/plugin-react`)
- Tailwind CSS v4 via `@tailwindcss/vite` (CSS-first config; **no** `tailwind.config.js`)
- `motion` (`motion/react`) for animations, `lucide-react` for icons
- Font: Cairo (Google Fonts, imported in `src/index.css`)
- Unused-but-installed: `@google/genai`, `express`, `dotenv`, `tsx`, `autoprefixer`. Don't assume a backend exists.

## Repository layout

```
index.html        Root HTML: lang="ar" dir="rtl", Arabic <title>/meta/OG tags, mounts #root
metadata.json     AI Studio applet metadata (name, description)
vite.config.ts    Plugins, GEMINI_API_KEY define, "@" alias -> repo root, HMR toggle
tsconfig.json     TS config (not strict), noEmit, "@/*" -> "./*"
.env.example      GEMINI_API_KEY, APP_URL (AI Studio injects at runtime)
src/main.tsx      React entry (StrictMode)
src/App.tsx       The entire site (~560 lines, one component + data arrays)
src/index.css     Tailwind import, @theme tokens, custom keyframes/utilities
```

There are no tests, no router, no state library, and no `public/` directory.

## Commands

```bash
npm install
npm run dev       # vite on port 3000, host 0.0.0.0
npm run build     # production build to dist/
npm run preview   # serve the build
npm run lint      # tsc --noEmit  (the only "lint"/type check; run it after changes)
npm run clean     # rm -rf dist
```

For local runs, put `GEMINI_API_KEY` in `.env.local` (git-ignored via `.env*`; only `.env.example` is tracked). The key is injected into the client bundle through `define` in `vite.config.ts` — never put real secrets in tracked files.

## Architecture of `src/App.tsx`

Top-level data arrays (Arabic content) followed by one default-exported `App` component:

- `icons`, `services`, `features`, `testimonials`, `galleryImages` — content arrays rendered with `.map`. Edit copy/content here rather than in JSX.
- State: `isMenuOpen` (mobile menu) and `scrolled` (navbar style after `scrollY > 50`, via a `useEffect` scroll listener).
- `navLinks` drives both the top nav and footer links.
- Sections, in page order, with anchor ids: `#home` (hero), `#features`, `#services`, (marquee/unnamed section), `#gallery`, `#testimonials`, `#contact`, then `<footer>` and a floating WhatsApp button.
- Contact form builds a pre-filled WhatsApp message (`name`, `phone`, `service`, `details` from `FormData`) and opens `https://wa.me/966569297493?text=...` in a new tab. There is no server submission.
- The business phone/WhatsApp number `966569297493` is hard-coded in many places (nav, hero, form handler, footer, floating button). When changing it, grep for all occurrences (`wa.me/`, `tel:`).

## Styling conventions

- Theme tokens in `src/index.css` `@theme`: `--color-primary` (#FFD700 gold), `--color-secondary` (black), `--color-accent` (white), `--font-sans` Cairo. Use `bg-primary`, `text-primary`, etc. rather than raw hex.
- Dark industrial look: black/`zinc-950` backgrounds, white text, gold accents; WhatsApp CTAs are `bg-green-600`; the contact section is inverted (gold bg, black text).
- Utility-first Tailwind classes inline; custom CSS is limited to `.bg-industrial`, `.animate-marquee`, `.animate-pulse-slow`, `.shadow-3xl` and their keyframes.
- The site is **RTL**: prefer logical/direction-aware layouts, test arrows/chevrons and translate animations in RTL (the marquee keyframes are direction-sensitive).
- All user-facing text is Arabic. Keep new copy in Arabic, keep `lang="ar" dir="rtl"` in `index.html`, and update `index.html` meta/OG tags and `metadata.json` together if branding/description changes.

## Known gotchas

- **Missing image assets**: the code references `input_file_0.png`, `input_file_1.png`, and `input_file_10.png` (gallery, `.bg-industrial`, og:image) but these files are not in the repo and there is no `public/` dir. Add them to `public/` (served at `/`) if images are needed; don't "fix" by deleting references without asking.
- `package.json` lists `vite` in both `dependencies` and `devDependencies`, and the package name is the template default `react-example`.
- `vite.config.ts` comment: HMR is controlled by `DISABLE_HMR` for AI Studio — do not remove that setting.
- `tsconfig.json` is not `strict`; `npm run lint` only type-checks.
- `index.html` og:image uses a relative path (`input_file_10.png`), which social crawlers cannot resolve; it needs an absolute URL.

## Workflow notes for AI assistants

- Keep changes minimal and in the existing single-file style unless asked to refactor; if splitting `App.tsx`, create `src/components/` and keep data arrays alongside or in `src/data/`.
- After edits run `npm run lint` and `npm run build`.
- Preserve Apache-2.0 SPDX header at top of `src/App.tsx`.
- Git: develop on the branch assigned for the session; don't open PRs unless asked.
