import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import Reveal from "@/components/v2/chrome/Reveal";
import DiaryList from "@/components/v2/blog/DiaryList";

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

const MUTED = "#8B8F86";

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
    title: `${name} — Photography Blog — ERIC ESCAPES`,
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
    <div
      className="ee-diaries"
      style={{
        position: "relative",
        zIndex: 1,
        maxWidth: 1180,
        margin: "0 auto",
        padding: "52px var(--ee-diaries-gutter, 40px) 110px",
      }}
    >
      <Reveal>
        <div
          style={{
            fontSize: 12,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          Tag
        </div>
        <h1
          className="ee-diaries-title"
          style={{
            marginTop: 14,
            marginBottom: 0,
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: "-0.01em",
            paddingBottom: 30,
            borderBottom: "1px solid rgba(242,239,230,0.13)",
          }}
        >
          {name}
        </h1>
      </Reveal>

      {posts.length === 0 ? (
        <p style={{ marginTop: 48, color: MUTED, fontSize: 15 }}>No entries yet.</p>
      ) : (
        <div style={{ marginTop: 20 }}>
          <DiaryList posts={posts} />
        </div>
      )}

      <div style={{ marginTop: 48 }}>
        <Link
          href="/blog-1"
          className="ee-diaries-pagelink"
          style={{
            fontSize: 11.5,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: MUTED,
            textDecoration: "none",
            transition: "color 120ms ease",
          }}
        >
          ← All entries
        </Link>
      </div>
    </div>
  );
}
