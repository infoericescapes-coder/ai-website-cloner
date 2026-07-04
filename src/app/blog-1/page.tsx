import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — ERIC ESCAPES",
  description:
    "Street and travel photography stories, visual diaries, and gear notes from the road.",
};

const POSTS_PER_PAGE = 9;

function formatDate(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

type BlogIndexPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function BlogIndexPage({ searchParams }: BlogIndexPageProps) {
  const { page: pageParam } = await searchParams;
  const posts = getAllPosts();

  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const currentPage = Math.min(
    Math.max(1, Number.parseInt(pageParam ?? "1", 10) || 1),
    totalPages,
  );

  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const pagePosts = posts.slice(start, start + POSTS_PER_PAGE);

  return (
    <section className="w-full bg-white px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-heading text-[30px] font-normal text-black">Blog</h1>

        {pagePosts.length === 0 ? (
          <p className="mt-12 text-base text-black/60">
            No posts yet — check back soon.
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {pagePosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog-1/${post.slug}`}
                className="group flex flex-col gap-4"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/5">
                  {post.featured ? (
                    <Image
                      src={post.featured}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : null}
                </div>

                <div className="flex flex-col gap-2">
                  {post.categories.length > 0 ? (
                    <span className="eyebrow text-black/50">
                      {post.categories[0]}
                    </span>
                  ) : null}
                  <h2 className="font-heading text-xl font-normal text-black transition-opacity group-hover:opacity-60">
                    {post.title}
                  </h2>
                  <span className="text-sm text-black/45">
                    {formatDate(post.date)}
                  </span>
                  {post.excerpt ? (
                    <p className="text-base leading-relaxed text-black/70">
                      {post.excerpt}
                    </p>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>
        )}

        {totalPages > 1 ? (
          <nav
            aria-label="Blog pagination"
            className="mt-16 flex items-center justify-center gap-8"
          >
            {currentPage > 1 ? (
              <Link
                href={currentPage - 1 === 1 ? "/blog-1" : `/blog-1?page=${currentPage - 1}`}
                className="font-eyebrow text-xs text-black/60 transition-colors hover:text-black"
              >
                ← Newer Posts
              </Link>
            ) : null}

            <span className="font-eyebrow text-xs text-black/40">
              Page {currentPage} of {totalPages}
            </span>

            {currentPage < totalPages ? (
              <Link
                href={`/blog-1?page=${currentPage + 1}`}
                className="font-eyebrow text-xs text-black/60 transition-colors hover:text-black"
              >
                Older Posts →
              </Link>
            ) : null}
          </nav>
        ) : null}
      </div>
    </section>
  );
}
