import Image from "next/image";
import Link from "next/link";
import type { PostSummary } from "@/lib/blog";

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

type PostCardGridProps = {
  posts: PostSummary[];
};

/**
 * The blog card grid, shared by the blog index and the category/tag
 * archive pages. Mirrors the card JSX from src/app/blog-1/page.tsx so
 * the archives stay visually identical to the index.
 */
export default function PostCardGrid({ posts }: PostCardGridProps) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
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
              <span className="eyebrow text-black/50">{post.categories[0]}</span>
            ) : null}
            <h2 className="font-heading text-xl font-normal text-black transition-opacity group-hover:opacity-60">
              {post.title}
            </h2>
            <span className="text-sm text-black/45">{formatDate(post.date)}</span>
            {post.excerpt ? (
              <p className="text-base leading-relaxed text-black/70">
                {post.excerpt}
              </p>
            ) : null}
          </div>
        </Link>
      ))}
    </div>
  );
}
