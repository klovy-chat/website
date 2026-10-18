import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export type BlogMeta = {
  slug: string;
  language: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  readingTime?: string;
};

export type BlogPost = BlogMeta & {
  content: string;
};

function findBlogFile(slug: string, lang: string): string | null {
  for (const extension of ["mdx", "md"]) {
    const filePath = path.join(BLOG_DIR, slug, `${lang}.${extension}`);
    if (fs.existsSync(filePath)) return filePath;
  }

  return null;
}

function getBlogSlugsFromDisk(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

function readBlogFile(slug: string, lang: string): BlogPost | null {
  const resolvedFile = [lang, "en", "pl"]
    .map((candidateLang) => ({
      language: candidateLang,
      filePath: findBlogFile(slug, candidateLang),
    }))
    .find((candidate) => candidate.filePath !== null);

  if (!resolvedFile?.filePath) return null;

  const fileContent = fs.readFileSync(resolvedFile.filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    language: resolvedFile.language,
    title: data.title,
    description: data.description,
    image: data.image,
    tags: data.tags || [],
    readingTime: data.readingTime,
    content,
  };
}

export function getBlogSlugs(): string[] {
  return getBlogSlugsFromDisk();
}

export function getAllBlogs(lang: string): BlogMeta[] {
  return getBlogSlugsFromDisk()
    .map((slug): BlogMeta | null => {
      const post = readBlogFile(slug, lang);
      if (!post) return null;

      return {
        slug: post.slug,
        language: post.language,
        title: post.title,
        description: post.description,
        image: post.image,
        tags: post.tags,
        readingTime: post.readingTime,
      };
    })
    .filter((post): post is BlogMeta => post !== null);
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
