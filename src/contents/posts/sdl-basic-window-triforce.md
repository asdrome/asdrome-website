---
title: "[SDL3] 01 — Basic Window: Triforce"
published: 2026-08-28
description: First entry of the SDL3 Emscripten series — a basic SDL3 window rendering a triforce, compiled to WebAssembly with emcc and running in the browser.
tags: [SDL3, Emscripten, WebAssembly, C]
category: SDL3
licenseName: "CC BY-NC-SA"
licenseUrl: "https://creativecommons.org/licenses/by-nc-sa/4.0/"
author: asdromundo
authorImage: "../../assets/avatars/fox-circle.webp"
draft: false
---

# [SDL3] 01 — Basic Window: Triforce

> **System Status:** `RUNTIME_ACTIVE` \
> **Component:** SDL3 → WebAssembly (emcc) \
> **Objective:** A basic SDL3 window rendering a triforce — this series' take on the classic "graphics triangle" hello-world.

## Run the demo

The demo below is the actual Emscripten bundle running in your browser — nothing to install. **Click the canvas** to give it keyboard focus, and use the **Fullscreen** button for the full-window experience.

<iframe src="/demos/sdl-basic-window-triforce/index.html" width="100%" height="600" allowfullscreen allow="fullscreen; autoplay" title="SDL3 Basic Window: Triforce demo"></iframe>

`[ OPEN_FULL_PAGE ]` | [Run standalone](/demos/sdl-basic-window-triforce/index.html)

## What this covers

- Creating a window and renderer with SDL3
- The basic event loop: init → render → wait for events → quit
- Compiling C to WebAssembly with `emcc` and running the result in the browser
