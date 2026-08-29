import { defineConfig } from "astro/config";

import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import svelte from "@astrojs/svelte";
import swup from "@swup/astro";

import { unified } from "@astrojs/markdown-remark";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkMath from "remark-math";
import { remarkReadingTime } from "./src/plugins/remark-reading-time.mjs";

import YukinaConfig from "./yukina.config";

import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
  site: YukinaConfig.site,
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    svelte(),
    icon(),
    swup({
      theme: false,
      containers: ["main", "footer", ".banner-inner"],
      smoothScrolling: true,
      progress: true,
      cache: true,
      preload: true,
      updateHead: true,
      updateBodyClass: false,
      globalInstance: true,
    }),
    sitemap(),
    pagefind(),
  ],
  markdown: {
    shikiConfig: {
      theme: "github-dark-default",
    },
    processor: unified({
      remarkPlugins: [remarkReadingTime, remarkMath],
      rehypePlugins: [
        rehypeSlug,
        rehypeKatex,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "prepend",
          },
        ],
      ],
    }),
  },
  image: {
    remotePatterns: [{ protocol: "https" }],
  },
});
