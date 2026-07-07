import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import Reveal from "@/components/v2/chrome/Reveal";
import DiaryList from "@/components/v2/blog/DiaryList";

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

const MUTED = "#8B8F86";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

// Off-list category slugs 404 instead of rendering a thin empty archive.
// Safe because generateStaticParams below enumerates every real archive.
export const dynamicParams = false;

export function generateStaticParams() {
  // The live sitemap encodes spaces as "+" (e.g. Film+Simulations). With
  // dynamicParams=false only these exact params resolve, so emit the "+" form
  // to match the sitemap 1:1 — otherwise the sitemap's multi-word archive URLs
  // 404. The page normalises "+" back to a space for matching/display.
  return CATEGORY_ARCHIVES.map((category) => ({
    category: category.replace(/ /g, "+"),
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  // '+' in the live URL encodes a space (e.g. Film+Simulations). decodeURIComponent
  // does NOT convert '+', so normalise it explicitly.
  const name = decodeURIComponent(category).replace(/\+/g, " ");
  return {
    title: `${name} — Photography Blog — ERIC ESCAPES`,
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
          Category
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
