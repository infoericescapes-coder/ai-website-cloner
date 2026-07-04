import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import PostCardGrid from "@/components/PostCardGrid";

/**
 * Authoritative category archive names, taken verbatim from the live
 * sitemap (https://www.ericescapes.com/sitemap.xml). Case matters for SEO
 * parity (FujiFilm, Film Simulations). generateStaticParams returns
 * exactly these so the archive URLs match the live site 1:1.
 */
const CATEGORY_ARCHIVES = [
  "Diary",
  "Film Simulations",
  "FujiFilm",
  "Gear",
  "Guide",
  "Inspiration",
  "Lesson",
  "Photography",
  "Review",
  "Travel",
] as const;

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return CATEGORY_ARCHIVES.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  // '+' in the live URL encodes a space (e.g. Film+Simulations). decodeURIComponent
  // does NOT convert '+', so normalise it explicitly.
  const name = decodeURIComponent(category).replace(/\+/g, " ");
  return {
    title: `${name} — Blog — ERIC ESCAPES`,
    description: `Photography stories and notes filed under ${name}.`,
  };
}

export default async function CategoryArchivePage({
  params,
}: CategoryPageProps) {
  const { category } = await params;
  // '+' in the live URL encodes a space (e.g. Film+Simulations); decodeURIComponent
  // leaves '+' intact, so normalise it before matching/displaying.
  const name = decodeURIComponent(category).replace(/\+/g, " ");

  // Matching: post frontmatter categories[] contains the name,
  // case-insensitively. getAllPosts() is already sorted newest-first.
  const posts = getAllPosts().filter((post) =>
    post.categories.some(
      (cat) => cat.toLowerCase() === name.toLowerCase(),
    ),
  );

  return (
    <section className="w-full bg-white px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <span className="eyebrow text-black/50">Category</span>
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
