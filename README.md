# Asdrome Labs | Research & Development Hub

This is the central repository for **Asdrome Labs**, a digital forge for software engineering, performance benchmarks, and technical documentation. Built on top of the **Astro** ecosystem and powered by **Bun**.

> **Status:** `PRODUCTION_READY`  
> **Base Template:** [Yukina](https://github.com/WhitePaper233/yukina)  
> **Runtime:** [Bun](https://bun.sh/)

---

## Tech Stack

* **Framework:** [Astro](https://astro.build/)
* **UI Components:** [Svelte](https://svelte.dev/) + [Skeleton UI](https://www.skeleton.dev/)
* **Runtime & Package Manager:** [Bun](https://bun.sh/)
* **Styling:** Tailwind CSS
* **Deployment:** [Cloudflare/Self-Hosted]

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
│   ├── content/
│   │   ├── posts/        # Research logs and transmissions
│   │   └── config.ts    # Content collections schema (Tags/Categories)
│   ├── components/      # Svelte & Astro components
│   └── pages/           # Site routes
├── public/              # Static assets
└── astro.config.mjs     # Astro configuration

```

## ⚖️ License & Credits

This project is a customized version of the [Yukina](https://github.com/WhitePaper233/yukina) template by **WhitePaper233**.

* **Original Template License:** MIT
* **Asdrome Labs Customizations:** MIT

Copyright (c) 2026 Asdrome Labs.

---

**[ ACCESSING_END_OF_FILE... ]**

