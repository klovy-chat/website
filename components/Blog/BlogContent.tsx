import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

export default function BlogContent({ content }: { content: string }) {
  return (
    <div
      className="
    prose
    prose-lg
    dark:prose-invert
    w-full
    prose-p:mx-0
    prose-h1:mx-0
    prose-h2:mx-0
    prose-h3:mx-0
    prose-h1:text-primary
    prose-h2:text-primary
    prose-h3:text-primary
  "
    >
      <MDXRemote
        source={content}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        components={{
          h1: (props) => <h2 {...props} />,
        }}
      />
    </div>
  );
}
