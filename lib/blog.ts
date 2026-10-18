import { BLOG_POSTS } from "./generated-blog-content";

export type BlogMeta = {
  slug: string;
  language: string;
  title: string;
  description: string;
  publishedAt?: string;
  author?: string;
  image?: string;
  tags: string[];
  readingTime?: string;
};

export type BlogPost = BlogMeta & {
  content: string;
};

function readBlogFile(slug: string, lang: string): BlogPost | null {
  const translations = BLOG_POSTS[slug];
  if (!translations) return null;

  return translations[lang] ?? translations.en ?? translations.pl ?? null;
}

export function getBlogSlugs(): string[] {
  return Object.keys(BLOG_POSTS);
}

export function getAllBlogs(lang: string): BlogMeta[] {
  return getBlogSlugs()
    .map((slug) => readBlogFile(slug, lang))
    .filter((post): post is BlogPost => post !== null)
    .map((post) => ({
      slug: post.slug,
      language: post.language,
      title: post.title,
      description: post.description,
      publishedAt: post.publishedAt,
      author: post.author,
      image: post.image,
      tags: post.tags,
      readingTime: post.readingTime,
    }));
}

export function getBlogPost(slug: string, lang: string): BlogPost | null {
  return readBlogFile(slug, lang);
}

export function getAllBlogsByLang(): Record<string, BlogMeta[]> {
  return {
    pl: getAllBlogs("pl"),
    en: getAllBlogs("en"),
  };
}

export function getBlogPostByLang(slug: string): Record<string, BlogPost | null> {
  return {
    pl: getBlogPost(slug, "pl"),
    en: getBlogPost(slug, "en"),
  };
}
