"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/i18n/useTranslation";
import type { BlogPost as BlogPostType } from "@/lib/blog";
import type { ReactNode } from "react";

type BlogPostProps = {
  postsByLang: Record<
    string,
    (Omit<BlogPostType, "content"> & { content: ReactNode }) | null
  >;
};

export default function BlogPost({ postsByLang }: BlogPostProps) {
  const { lang } = useLanguage();
  const { t } = useTranslation(lang);
  const post = postsByLang[lang] ?? postsByLang.en ?? postsByLang.pl;

  if (!post) {
    return (
      <article className="w-full py-section">
        <div className="max-w-7xl mx-auto px-spacing_lg xl:px-spacing_xl">
          <p className="opacity-70">{t("blog.postNotFound")}</p>
        </div>
      </article>
    );
  }

  return (
    <article className="w-full py-section">
      <div className="max-w-7xl mx-auto px-spacing_lg xl:px-spacing_xl">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="opacity-70 mb-6">{post.description}</p>

        {post.language !== lang && (
          <p
            role="note"
            className="mb-6 rounded-lg bg-primary/10 px-4 py-3 text-sm"
          >
            {lang === "pl"
              ? "Ten wpis nie ma jeszcze polskiego tłumaczenia. Wyświetlamy wersję angielską."
              : "This post is not available in English yet. Showing the Polish version."}
          </p>
        )}

        {post.content}
      </div>
    </article>
  );
}
