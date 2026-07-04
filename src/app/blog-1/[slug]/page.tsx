import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post not found — ERIC ESCAPES" };
  }

  return {
    title: `${post.title} — ERIC ESCAPES`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.featured ? [post.featured] : undefined,
    },
  };
}

function formatDate(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";
  // Matches the live site's post meta: "23 Mar"
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

const markdownComponents: Components = {
  img: ({ src, alt }) => {
    if (typeof src !== "string") return null;
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt ?? ""}
        loading="lazy"
        className="w-full h-auto my-8 rounded-sm"
      />
    );
  },
};

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const metaParts = [
    ...post.categories,
    formatDate(post.date),
    "Written By Eric Kowalczyk",
  ].filter(Boolean);

  return (
    <article className="w-full bg-white px-6 py-16 md:py-24">
      {/* Header — left-aligned, single normal-case meta line + large bold title (matches live) */}
      <div className="mx-auto max-w-3xl">
        {metaParts.length > 0 ? (
          <p className="font-body text-sm text-black/55 md:text-base">
            {metaParts.join("  ·  ")}
          </p>
        ) : null}

        <h1 className="mt-4 font-sans text-4xl font-bold leading-[1.05] tracking-tight text-black md:text-6xl lg:text-7xl">
          {post.title}
        </h1>
      </div>

      <div className="mx-auto mt-12 max-w-3xl text-black">
        <div
          className="prose-blog font-body text-lg leading-[1.8] text-black/85
            [&_a]:text-black [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-black/30 [&_a:hover]:decoration-black
            [&_blockquote]:border-l-2 [&_blockquote]:border-black/20 [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-black/70
            [&_h1]:font-heading [&_h1]:mt-12 [&_h1]:mb-4 [&_h1]:text-2xl [&_h1]:font-normal
            [&_h2]:font-heading [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-normal
            [&_h3]:font-heading [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:text-xl [&_h3]:font-normal
            [&_p]:my-6
            [&_ul]:my-6 [&_ul]:list-disc [&_ul]:pl-6
            [&_ol]:my-6 [&_ol]:list-decimal [&_ol]:pl-6
            [&_li]:my-2
            [&_hr]:my-12 [&_hr]:border-black/10
            [&_strong]:font-semibold"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {post.content}
          </ReactMarkdown>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-3xl">
        <Link
          href="/blog-1"
          className="font-eyebrow text-xs text-black/50 transition-colors hover:text-black"
        >
          ← Back to Blog
        </Link>
      </div>
    </article>
  );
}
