# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Asdrome Labs" website — a customized fork of the [Yukina](https://github.com/WhitePaper233/yukina) Astro blog theme. Astro 5 + Svelte 5 + Tailwind CSS 3, run with **Bun** (pinned to 1.4 via `mise.toml`), deployed to Cloudflare Pages (`wrangler.jsonc`, build output `./dist`).

## Commands

```bash
bun install           # install dependencies
bun dev               # dev server at http://localhost:4321
bun run build         # production build (output in dist/)
bun run preview       # preview the built site
bun run build-preview # build then preview
```

There is no test suite and no lint script. Prettier is configured (`.prettierrc.mjs`) with `prettier-plugin-astro` and `prettier-plugin-tailwindcss` — run `bunx prettier --write` on changed files to keep formatting consistent. `@astrojs/check` is installed, so `bunx astro check` can be used for type-checking.

## Architecture

### `yukina.config.ts` is the single source of truth for site config

Located at the repo root (not in `src/`). It holds the site URL, title, navigators, banners, locale, license, and `slugMode`. It is imported by `astro.config.mjs`, components, utils, and the i18n layer — any site-wide change (nav links, banner images, locale) goes here, not into individual components.

### Content collections (`src/content.config.ts`)

Two collections, both using Astro 5's `glob` loader:

- **`posts`** — `src/contents/posts/**/*.md`, with a zod schema (`title`, `published`, `draft`, `description`, `cover`, `tags`, `category`, `author`, `authorImage`, `sourceLink`, `licenseName`, `licenseUrl`). The **filename (without extension) is the post's id and becomes its URL slug**.
- **`specs`** — `src/contents/specs/*.md`, untyped standalone pages (`about.md`, `showcase.md`) fetched by name via `getEntry("specs", "showcase")` in their respective pages.

All post data access is centralized in `src/utils/content.ts`: `GetSortedPosts()` (date-desc, injects `nextSlug`/`prevSlug` nav), `GetArchives()` (grouped by year), `GetTags()`, `GetCategories()`. Every one of these filters out `draft: true` posts in production (`import.meta.env.PROD`), so drafts are visible only in dev.

### Slug mode

`IdToSlug()` in `src/utils/hash.ts` converts entry ids to URL slugs based on `YukinaConfig.slugMode`: currently `"RAW"` (filename as-is, e.g. `/posts/godot-individual-export-templates`); `"HASH"` would produce 8-char SHA256 prefixes. **Always build post/tag/category URLs through `IdToSlug`** — never string-concatenate raw ids — so a mode switch doesn't break links.

### i18n

`src/locales/keys.ts` defines the `I18nKeys` enum; `src/locales/languages/` has per-language files (`en.ts`, `zh_cn.ts`) typed against the enum via the `Translation` map type in `translation.ts`. `i18n(key, ...interpolations)` reads `YukinaConfig.locale` and replaces `{{}}` placeholders. To add a string: add the key to the enum **and** to every language file (the type enforces completeness).

### Markdown pipeline (`astro.config.mjs`)

- `remarkReadingTime` (custom, `src/plugins/remark-reading-time.mjs`) injects `readingMetadata` (minutes, word count) into frontmatter data — consumed by `PostCard`.
- `remark-math` + `rehype-katex` enable KaTeX math in posts; `rehype-slug` + `rehype-autolink-headings` give headings anchors.
- Shiki theme: `github-dark-default`.
- `src/plugins/remark-toc.mjs` exists but is **not** wired into the pipeline; TOC rendering in `PostLayout` is commented out.

### Search

Pagefind (`astro-pagefind`) builds the index at build time. The Svelte `SearchBar.svelte` / `MobileSearchBar.svelte` call the global `pagefind` object. Post pages wrap content in `data-pagefind-body` divs (with a hidden weighted title div) — keep that markup when restructuring post rendering.

### Client-side behavior

- **swup** powers SPA-like page transitions; containers are `main`, `footer`, `.banner-inner` (see `astro.config.mjs`). New top-level page regions that should transition must be added there.
- `lozad` handles lazy image loading (banner uses `lozad` class + `data-src`), `overlayscrollbars` styles scroll areas in the search panels.
- Svelte components live in `src/components/` (search bars) and `src/components/controllers/` (`Pagination.astro`).

### Layout chain

`BaseLayout` → `MainLayout` (nav bar, banner carousel, sidebar with tag/category chips) → page-specific layouts: `PostLayout` (articles), `ChipLayout` (tag/category index pages), `PostArchiveLayout` (archive). The banner carousel reads `YukinaConfig.banners`; `GetCoverURLForUnspecifiedEntry()` in `src/utils/cover.ts` deterministically picks a banner for entries without a cover.

## Conventions

- Post frontmatter follows the existing pattern: title prefixed with `[INIT]`/`[RELEASE]`, explicit `licenseName`/`licenseUrl` (site default CC BY-NC-SA 4.0), `author` + `authorImage` (avatars in `src/assets/avatars/`), and `draft: false`.
- `cover` may be a local relative path (e.g. `../../assets/logo-color.svg`) or a remote https URL — `remotePatterns` in `astro.config.mjs` allows any https host. Remote images for this site live on Cloudinary (`res.cloudinary.com/asdrome-media/...`).
- The `specs` collection is how standalone non-post pages get their content: to add one, drop a `.md` in `src/contents/specs/` and a page in `src/pages/` that `getEntry`s it by name.

## Note

The README's "Project Structure" section is slightly stale: content lives in `src/contents/` (not `src/content/`), and Skeleton UI is not actually a dependency. Must be updated

## Status

We are working on migrating the project from Astro 5 up to Astro 7 using the migration guides:
https://docs.astro.build/en/guides/upgrade-to/v6/
https://docs.astro.build/en/guides/upgrade-to/v7/

- [x] Phase 1: Tailwind v3 → v4 — swap deps, @tailwindcss/vite, global.css, utility renames
- [x] Phase 1: verify bun run build + visual spot-check
- [x] Phase 2: Astro 5 → 6 — bump deps, move z import to astro/zod
- [x] Phase 2: verify bun run build
- [x] Phase 3: Astro 6 → 7 — bump deps, add @astrojs/markdown-remark + unified() processor, fix Rust-compiler HTML
- [x] Phase 3: verify build + visual + astro check

## agent usage

we've been hitting the CLAUDE_CODE_MAX_OUTPUT_TOKENS of 128k, we need to chunk the work up after planning and use handouts to fresh sessions. We can test if the enviroment allows to use local .claude/agents on this directory