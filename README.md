# Asdrome Labs | Research & Development Hub

This is the central repository for **Asdrome Labs**, a digital forge for software engineering, performance benchmarks, and technical documentation. Built on top of the **Astro** ecosystem and powered by **Bun**.

> **Status:** `PRODUCTION_READY`  
> **Base Template:** [Yukina](https://github.com/WhitePaper233/yukina)  
> **Runtime:** [Bun](https://bun.sh/)

---

## Tech Stack

* **Framework:** [Astro](https://astro.build/) 7
* **UI Components:** [Svelte](https://svelte.dev/) 5
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) v4
* **Runtime & Package Manager:** [Bun](https://bun.sh/) (pinned via [mise](https://mise.jdx.dev/))
* **Deployment:** [Cloudflare Pages](https://pages.cloudflare.com/)
* **Search:** [Pagefind](https://pagefind.app/) (static index, built at build time)
* **Transitions:** [Swup](https://swup.js.org/) (SPA-like page transitions)

## Quick Start

Since this project uses **Bun**, the workflow is optimized for speed.

### 1. Clone the repository
```bash
git clone https://github.com/asdrome/asdrome-website.git
cd asdrome-website

```

### 2. Install dependencies

```bash
bun install

```

### 3. Start development server

```bash
bun dev

```

Your local environment will be live at `http://localhost:4321`.

### 4. Build for production

```bash
bun run build

```

---

## Project Structure

```text
/
├── src/
│   ├── contents/
│   │   ├── posts/        # Blog posts (filename = URL slug)
│   │   └── specs/        # Standalone pages (about, showcase)
│   ├── components/       # Astro & Svelte components
│   ├── layouts/          # Layout chain (Base → Main → Post/Chip/Archive)
│   ├── locales/          # i18n strings
│   ├── plugins/          # Custom remark/rehype plugins
│   ├── pages/            # Site routes
│   └── content.config.ts # Content collections schema
├── public/
│   └── demos/            # SDL3 demo bundles (static, one folder per sample)
├── templates/
│   └── demo-wrapper.html # Wrapper template for demo bundles
├── yukina.config.ts      # Site config (single source of truth)
└── astro.config.mjs      # Astro configuration

```

## Demos — SDL3 Series

Interactive [Emscripten](https://emscripten.org/)-compiled SDL examples for the course semester, published as a post series under the `SDL3` category. Each sample is a self-contained static bundle in `public/demos/<slug>/`, embedded in its post via an `<iframe>`. The emscripten default `index.html` is **not** used — a minimal custom wrapper (canvas, loading progress, click-to-focus, fullscreen) is written per sample from [`templates/demo-wrapper.html`](templates/demo-wrapper.html).

### Adding a new sample

1. **Drop the bundle** — copy the compiled `bin/` contents (`.js`, `.wasm`, assets) into `public/demos/<slug>/`.
2. **Add the wrapper** — copy `templates/demo-wrapper.html` to `public/demos/<slug>/index.html`, then set the title, the entry script filename, and merge any `Module` config from the bundle's original emscripten `index.html` (which is then discarded).
3. **Add the post** — create `src/contents/posts/<slug>.md` with `category: SDL3` and embed the demo:

   ```html
   <iframe src="/demos/<slug>/index.html" width="100%" height="600" allowfullscreen allow="fullscreen; autoplay"></iframe>
   ```

   (Reference the explicit `index.html` — directory-index resolution is unreliable on the dev server.)

The series index is the auto-generated category page at `/categories/SDL3`, linked from the showcase.

## ⚖️ License & Credits

This project is a customized version of the [Yukina](https://github.com/WhitePaper233/yukina) template by **WhitePaper233**.

* **Original Template License:** MIT
* **Asdrome Labs Customizations:** MIT

Copyright (c) 2026 Asdrome Labs.

---

**[ ACCESSING_END_OF_FILE... ]**

