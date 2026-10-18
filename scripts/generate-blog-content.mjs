#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { compile, run } from "@mdx-js/mdx";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";

const projectDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const blogDir = path.join(projectDir, "content/blog");
const outputPath = path.join(projectDir, "lib/generated-blog-content.ts");
const posts = {};

for (const entry of fs.readdirSync(blogDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;

  const translations = {};
  for (const language of ["en", "pl"]) {
    const filePath = [".mdx", ".md"]
      .map((extension) => path.join(blogDir, entry.name, `${language}${extension}`))
      .find((candidate) => fs.existsSync(candidate));

    if (!filePath) continue;

    const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
    const compiled = await compile(content, {
      outputFormat: "function-body",
      remarkPlugins: [remarkGfm],
    });
    const { default: PostContent } = await run(String(compiled), {
      Fragment,
      jsx,
      jsxs,
    });
    const renderedContent = renderToStaticMarkup(
      createElement(PostContent, {
        components: {
          h1: ({ children, ...props }) =>
            createElement("h2", props, children),
        },
      }),
    );

    translations[language] = {
      slug: entry.name,
      language,
      title: data.title,
      description: data.description,
      publishedAt: data.publishedAt,
      author: data.author,
      image: data.image,
      tags: data.tags || [],
      readingTime: data.readingTime,
      content: renderedContent,
    };
  }

  if (Object.keys(translations).length > 0) {
    posts[entry.name] = translations;
  }
}

const generatedContent = `import type { BlogPost } from "./blog";\n\nexport const BLOG_POSTS: Record<string, Partial<Record<string, BlogPost>>> = ${JSON.stringify(posts, null, 2)};\n`;
fs.writeFileSync(outputPath, generatedContent, "utf8");
console.log(`Generated blog content for ${Object.keys(posts).length} posts.`);
