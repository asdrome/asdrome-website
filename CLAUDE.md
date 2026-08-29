# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Asdrome Labs" website — a customized fork of the [Yukina](https://github.com/WhitePaper233/yukina) Astro blog theme. Astro 7 + Svelte 5 + Tailwind CSS 4, run with **Bun** (pinned to 1.4 via `mise.toml`), deployed to Cloudflare Pages (`wrangler.jsonc`, build output `./dist`).

## Commands

```bash
bun install           # install dependencies
bun dev               # dev server at http://localhost:4321
bun run build         # production build (output in dist/)
bun run preview       # preview the built site
bun run build-preview # build then preview
```

There is no test suite and no lint script. Prettier is configured (`.prettierrc.mjs`) with `prettier-plugin-astro` and `prettier-plugin-tailwindcss` — run `bunx prettier --write` on changed files to keep formatting consistent. `@astrojs/check` is installed, so `bunx astro check` can be used for type-checking.

**Flaky:** in non-interactive shells `bun` may not be on PATH even with mise configured — fall back to `mise x bun -- <cmd>` or the absolute path from `mise which bun`. Also, the Vite dev server can go stale for `public/` directories created *after* it started (directory-index URLs 404) — restart the dev server or reference explicit file URLs.

## Architecture

### `yukina.config.ts` is the single source of truth for site config

Located at the repo root (not in `src/`). It holds the site URL, title, navigators, banners, locale, license, and `slugMode`. It is imported by `astro.config.mjs`, components, utils, and the i18n layer — any site-wide change (nav links, banner images, locale) goes here, not into individual components.

### Content collections (`src/content.config.ts`)

Two collections, both using the `glob` loader (`astro/loaders`), with zod from `astro/zod`:

- **`posts`** — `src/contents/posts/**/*.md`, with a zod schema (`title`, `published`, `draft`, `description`, `cover`, `tags`, `category`, `author`, `authorImage`, `sourceLink`, `licenseName`, `licenseUrl`). The **filename (without extension) is the post's id and becomes its URL slug**.
- **`specs`** — `src/contents/specs/*.md`, untyped standalone pages (`about.md`, `showcase.md`) fetched by name via `getEntry("specs", "showcase")` in their respective pages.

All post data access is centralized in `src/utils/content.ts`: `GetSortedPosts()` (date-desc, injects `nextSlug`/`prevSlug` nav), `GetArchives()` (grouped by year), `GetTags()`, `GetCategories()`. Every one of these filters out `draft: true` posts in production (`import.meta.env.PROD`), so drafts are visible only in dev.

### Slug mode

`IdToSlug()` in `src/utils/hash.ts` converts entry ids to URL slugs based on `YukinaConfig.slugMode`: currently `"RAW"` (filename as-is, e.g. `/posts/godot-individual-export-templates`); `"HASH"` would produce 8-char SHA256 prefixes. **Always build post/tag/category URLs through `IdToSlug`** — never string-concatenate raw ids — so a mode switch doesn't break links.

### i18n

`src/locales/keys.ts` defines the `I18nKeys` enum; `src/locales/languages/` has per-language files (`en.ts`, `zh_cn.ts`) typed against the enum via the `Translation` map type in `translation.ts`. `i18n(key, ...interpolations)` reads `YukinaConfig.locale` and replaces `{{}}` placeholders. To add a string: add the key to the enum **and** to every language file (the type enforces completeness).

### Markdown pipeline (`astro.config.mjs`)

- Since Astro 7, plugins are wired through `markdown.processor: unified()` from `@astrojs/markdown-remark` (`remarkPlugins` / `rehypePlugins` options) — not the legacy top-level `remarkPlugins`/`rehypePlugins` config keys.
- `remarkReadingTime` (custom, `src/plugins/remark-reading-time.mjs`) injects `readingMetadata` (minutes, word count) into frontmatter data — consumed by `PostCard`.
- `remark-math` + `rehype-katex` enable KaTeX math in posts; `rehype-slug` + `rehype-autolink-headings` give headings anchors.
- Shiki theme: `github-dark-default`.
- `src/plugins/remark-toc.mjs` exists but is **not** wired into the pipeline; TOC rendering in `PostLayout` is commented out.

### Search

Pagefind (`astro-pagefind`) builds the index at build time. The Svelte `SearchBar.svelte` / `MobileSearchBar.svelte` call the global `pagefind` object. Post pages wrap content in `data-pagefind-body` divs (with a hidden weighted title div) — keep that markup when restructuring post rendering.

### Demos (SDL3 series)

Interactive Emscripten-compiled SDL samples for the course semester. Each sample is a self-contained static bundle in `public/demos/<slug>/` (JS glue + WASM + assets) with a minimal custom `index.html` wrapper built from `templates/demo-wrapper.html` (canvas, loading progress, click-to-focus, fullscreen). The emscripten default `index.html` is **never** used — read it only for the entry script name and `Module` config, then replace it. Bundles typically include a `*.data` preload package (all runtime assets packed into the emscripten virtual FS) — the `.data` file is required; an on-disk `assets/` folder, if present, is only its source and is **not** fetched at runtime (safe to drop). Each sample is published as a post (`category: SDL3`) embedding the bundle via `<iframe src="/demos/<slug>/index.html" ...>` — always reference the explicit `index.html`, since directory-index resolution is unreliable on the dev server; the series index is the auto-generated `/categories/SDL3` page, linked from the showcase. Full drop-in procedure: README "Demos — SDL3 Series".

### Client-side behavior

- **swup** powers SPA-like page transitions; containers are `main`, `footer`, `.banner-inner` (see `astro.config.mjs`). New top-level page regions that should transition must be added there.
- `lozad` handles lazy image loading (banner uses `lozad` class + `data-src`), `overlayscrollbars` styles scroll areas in the search panels.
- Svelte components live in `src/components/` (search bars) and `src/components/controllers/` (`Pagination.astro`).

### Layout chain

`BaseLayout` → `MainLayout` (nav bar, banner carousel, sidebar with tag/category chips) → page-specific layouts: `PostLayout` (articles), `ChipLayout` (tag/category index pages), `PostArchiveLayout` (archive). The banner carousel reads `YukinaConfig.banners`; `GetCoverURLForUnspecifiedEntry()` in `src/utils/cover.ts` deterministically picks a banner for entries without a cover.

## Conventions

- Post frontmatter follows the existing pattern: title prefixed with a series tag (`[INIT]`/`[RELEASE]` for project posts, `[SDL3] NN —` for the demos series), explicit `licenseName`/`licenseUrl` (site default CC BY-NC-SA 4.0), `author` + `authorImage` (avatars in `src/assets/avatars/`), and `draft: false`.
- `cover` may be a local relative path (e.g. `../../assets/logo-color.svg`) or a remote https URL — `remotePatterns` in `astro.config.mjs` allows any https host. Remote images for this site live on Cloudinary (`res.cloudinary.com/asdrome-media/...`).
- The `specs` collection is how standalone non-post pages get their content: to add one, drop a `.md` in `src/contents/specs/` and a page in `src/pages/` that `getEntry`s it by name.

## Status

- Astro 5 → 7 migration: **complete** (2026-08-28; guides: [v6](https://docs.astro.build/en/guides/upgrade-to/v6/), [v7](https://docs.astro.build/en/guides/upgrade-to/v7/)).
- SDL3 Emscripten demos series: **in progress** — sample 01 (basic window / triforce) published; more examples land throughout the course semester.

## Agent usage

- We've been hitting the CLAUDE_CODE_MAX_OUTPUT_TOKENS of 128k — chunk the work up after planning and use handouts to fresh sessions.
- Subagents (Agent tool) currently **fail in this environment** with a model error (`model_not_found` for `claude-opus-5`) — do exploration and planning inline instead of spawning Explore/Plan agents.