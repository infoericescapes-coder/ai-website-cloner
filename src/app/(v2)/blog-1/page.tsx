import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import Reveal from "@/components/v2/chrome/Reveal";
import LedDot from "@/components/v2/chrome/LedDot";
import DiaryList from "@/components/v2/blog/DiaryList";
import DiaryPaged from "@/components/v2/blog/DiaryPaged";

/**
 * Visual Diaries index — STATICALLY generated (force-static below).
 *
 * getAllPosts() runs at BUILD time, when every content/blog/*.md file is
 * present, so a rebuild always reflects the current post set and newly
 * published posts appear immediately (same guarantee the [slug] pages have).
 *
 * HISTORY (2026-07-08): this route was previously dynamic because it read
 * `?page=` from server `searchParams`. On Netlify's serverless runtime the
 * dynamic function served a STALE post list — its filesystem snapshot lagged
 * behind newly-committed posts (a Sveltia CMS post rendered at its own URL but
 * never appeared in the index). Fix: keep the index static and move pagination
 * to a client component (DiaryPaged) that reads `?page=` from the URL.
 */
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Photography Blog — ERIC ESCAPES",
  description:
    "Street and travel photography stories, visual diaries, and gear notes from the road.",
};

const POSTS_PER_PAGE = 9;
const MUTED = "#8B8F86";

/** Year (number) of a post date, or null when unparseable. */
function yearOf(dateString: string): number | null {
  if (!dateString) return null;
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return null;
  return date.getFullYear();
}

export default function BlogIndexPage() {
  const posts = getAllPosts();

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

      {/* Rows + pager — client component reads ?page= via useSearchParams,
          wrapped in Suspense (required for useSearchParams under static
          rendering). The fallback renders the first page's rows so the static
          HTML is non-empty and looks right before hydration. */}
      <Suspense
        fallback={
          <div style={{ marginTop: 20 }}>
            <DiaryList posts={posts.slice(0, POSTS_PER_PAGE)} />
          </div>
        }
      >
        <DiaryPaged posts={posts} postsPerPage={POSTS_PER_PAGE} />
      </Suspense>
    </div>
  );
}
