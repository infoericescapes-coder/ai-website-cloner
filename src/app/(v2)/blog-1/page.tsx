import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import Reveal from "@/components/v2/chrome/Reveal";
import LedDot from "@/components/v2/chrome/LedDot";
import DiaryList from "@/components/v2/blog/DiaryList";

export const metadata: Metadata = {
  title: "Photography Blog — ERIC ESCAPES",
  description:
    "Street and travel photography stories, visual diaries, and gear notes from the road.",
};

const POSTS_PER_PAGE = 9;
const MUTED = "#8B8F86";

type BlogIndexPageProps = {
  searchParams: Promise<{ page?: string }>;
};

/** Year (number) of a post date, or null when unparseable. */
function yearOf(dateString: string): number | null {
  if (!dateString) return null;
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return null;
  return date.getFullYear();
}

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

  // Meta line: "{N} entries · {min}–{max}" computed from the full post set.
  const years = posts.map((p) => yearOf(p.date)).filter((y): y is number => y !== null);
  const minYear = years.length ? Math.min(...years) : null;
  const maxYear = years.length ? Math.max(...years) : null;
  const yearRange =
    minYear !== null && maxYear !== null
      ? minYear === maxYear
        ? String(minYear)
        : `${minYear}–${maxYear}`
      : "";
  const metaLine = `${posts.length} entries${yearRange ? ` · ${yearRange}` : ""}`;

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
      {/* Header */}
      <Reveal>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <LedDot size={6} />
          <span
            style={{
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            Field notes &amp; longer looks
          </span>
        </div>
        <div
          className="ee-diaries-titlerow"
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 40,
            marginTop: 20,
            paddingBottom: 30,
            borderBottom: "1px solid rgba(242,239,230,0.13)",
          }}
        >
          <h1
            className="ee-diaries-title"
            style={{ fontWeight: 600, lineHeight: 1, letterSpacing: "-0.01em", margin: 0 }}
          >
            Visual Diaries
          </h1>
          <span
            style={{
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: MUTED,
              whiteSpace: "nowrap",
            }}
          >
            {metaLine}
          </span>
        </div>
      </Reveal>

      {/* Rows */}
      {pagePosts.length === 0 ? (
        <p style={{ marginTop: 48, color: MUTED, fontSize: 15 }}>
          No entries yet — check back soon.
        </p>
      ) : (
        <div style={{ marginTop: 20 }}>
          <DiaryList posts={pagePosts} />
        </div>
      )}

      {/* Pager — restyled to the token system (11px uppercase, accent hover). */}
      {totalPages > 1 ? (
        <nav
          aria-label="Blog pagination"
          style={{
            marginTop: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 32,
          }}
        >
          {currentPage > 1 ? (
            <Link
              href={
                currentPage - 1 === 1 ? "/blog-1" : `/blog-1?page=${currentPage - 1}`
              }
              className="ee-diaries-pagelink"
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: MUTED,
                textDecoration: "none",
                transition: "color 120ms ease",
              }}
            >
              ← Newer
            </Link>
          ) : null}

          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(139,143,134,0.6)",
            }}
          >
            Page {currentPage} / {totalPages}
          </span>

          {currentPage < totalPages ? (
            <Link
              href={`/blog-1?page=${currentPage + 1}`}
              className="ee-diaries-pagelink"
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: MUTED,
                textDecoration: "none",
                transition: "color 120ms ease",
              }}
            >
              Older →
            </Link>
          ) : null}
        </nav>
      ) : null}
    </div>
  );
}
