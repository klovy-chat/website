import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import BlogContent from "@/components/Blog/BlogContent";
import BlogPost from "@/components/Blog/BlogPost";
import { getBlogPostByLang, getBlogSlugs } from "@/lib/blog";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const postsByLang = getBlogPostByLang(slug);

  if (!postsByLang.pl && !postsByLang.en) {
    notFound();
  }

  const renderedPostsByLang = Object.fromEntries(
    Object.entries(postsByLang).map(([lang, post]) => [
      lang,
      post ? { ...post, content: <BlogContent content={post.content} /> } : null,
    ]),
  );

  return (
    <>
      <Navbar />
      <BlogPost postsByLang={renderedPostsByLang} />
      <Footer />
    </>
  );
}
