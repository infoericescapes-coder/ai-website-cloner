import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import PostCardGrid from "@/components/PostCardGrid";

/**
 * Authoritative tag archive names, taken verbatim from the live sitemap
 * (https://www.ericescapes.com/sitemap.xml). Case matters for SEO parity
 * (FujiFilm, iPad, iPadOS). generateStaticParams returns exactly these so
 * the archive URLs match the live site 1:1 — including names with no
 * matching posts, which render an empty state so the URL still exists.
 */
const TAG_ARCHIVES = [
  "Film Simulations",
  "FujiFilm",
  "Gear",
  "Guide",
  "Inspiration",
  "Journal",
  "Lesson",
  "Photography",
  "Review",
  "Story",
  "iPad",
  "iPadOS",
] as const;

type TagPageProps = {
  params: Promise<{ tag: string }>;
};

export function generateStaticParams() {
  return TAG_ARCHIVES.map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  // '+' in the live URL encodes a space (e.g. Film+Simulations). decodeURIComponent
  // does NOT convert '+', so normalise it explicitly.
  const name = decodeURIComponent(tag).replace(/\+/g, " ");
  return {
    title: `${name} — Blog — ERIC ESCAPES`,
    description: `Photography stories and notes tagged ${name}.`,
  };
}

export default async function TagArchivePage({ params }: TagPageProps) {
  const { tag } = await params;
  // '+' in the live URL encodes a space (e.g. Film+Simulations); decodeURIComponent
  // leaves '+' intact, so normalise it before matching/displaying.
  const name = decodeURIComponent(tag).replace(/\+/g, " ");

  // Matching: post frontmatter tags[] contains the name, case-insensitively.
  // getAllPosts() is already sorted newest-first.
  const posts = getAllPosts().filter((post) =>
    post.tags.some(
      (t) => t.toLowerCase() === name.toLowerCase(),
    ),
  );

  return (
    <section className="w-full bg-white px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <span className="eyebrow text-black/50">Tag</span>
        <h1 className="mt-2 font-heading text-[30px] font-normal text-black">
          {name}
        </h1>

        {posts.length === 0 ? (
          <p className="mt-12 text-base text-black/60">No posts yet.</p>
        ) : (
          <div className="mt-12">
            <PostCardGrid posts={posts} />
          </div>
        )}

        <div className="mt-16">
          <Link
            href="/blog-1"
            className="font-eyebrow text-xs text-black/50 transition-colors hover:text-black"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    </section>
  );
}
