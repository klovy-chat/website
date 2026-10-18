#!/usr/bin/env node

import fs from "fs";
import path from "path";

const slug = process.argv[2]?.trim();

if (!slug) {
  console.error("Użycie: npm run new-post -- nazwa-wpisu");
  console.error("Przykład: npm run new-post -- aktualizacja-beta");
  process.exit(1);
}

if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
  console.error("Slug może zawierać tylko małe litery, cyfry i myślniki.");
  process.exit(1);
}

const postDir = path.join("content", "blog", slug);

if (fs.existsSync(postDir)) {
  console.error(`Wpis "${slug}" już istnieje: ${postDir}`);
  process.exit(1);
}

fs.mkdirSync(postDir, { recursive: true });

const template = `---
title: "Post title"
description: "Short description shown on the blog list"
image: "/blog/${slug}.webp"
tags: ["Klovy Chat"]
readingTime: "5 min"
---

# Post title

Post content in Markdown or MDX...

## Section heading

- list item
- another item
`;

fs.writeFileSync(path.join(postDir, "en.mdx"), template, "utf-8");

console.log(`Utworzono wpis: content/blog/${slug}/`);
console.log("  - en.mdx");
console.log("");
console.log("Następne kroki:");
console.log(`  1. Edytuj content/blog/${slug}/en.mdx`);
console.log(`  2. (Opcjonalnie) dodaj tłumaczenie jako content/blog/${slug}/pl.mdx lub pl.md`);
console.log(`  3. (Opcjonalnie) dodaj obrazek do public/blog/${slug}.webp`);
console.log("  4. Wypchnij zmiany na GitHub — Cloudflare zbuduje stronę automatycznie");
