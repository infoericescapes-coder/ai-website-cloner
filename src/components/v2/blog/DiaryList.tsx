import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/v2/chrome/Reveal";
import type { PostSummary } from "@/lib/blog";

/**
 * Editorial diary row list — shared by the Visual Diaries index (`/blog-1`)
 * and the category/tag archives. NO cards: mono kicker + date, Space Grotesk
 * title, muted excerpt, small mounted thumb, hairline dividers, year-break
 * labels. Spec: docs/design-v2/specs/diaries-index.md §2.
 *
 * Hover (arrow 0->1, thumb mount border 0.16->0.45) is pure CSS, scoped to the
 * `.ee-diarylist-row` class (globals.css). Server component — no client state.
 */

const MUTED = "#8B8F86";
const HAIRLINE = "rgba(242,239,230,0.09)";

/** "12 JAN 2026" — uppercase DD MMM YYYY. */
function formatRowDate(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";
  return date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .toUpperCase();
}

/** Post year for year-break grouping; "" when the date is unparseable. */
function postYear(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";
  return String(date.getFullYear());
}

/** "DIARY · TRAVEL" — kicker from the post's primary category. */
function kickerFor(post: PostSummary): string {
  const primary = post.categories[0];
  return primary ? `DIARY · ${primary.toUpperCase()}` : "DIARY";
}

function DiaryRow({ post }: { post: PostSummary }) {
  return (
    <Reveal>
      <Link
        href={`/blog-1/${post.slug}`}
        className="ee-diarylist-row"
        style={{
          display: "grid",
          gridTemplateColumns: "var(--diarylist-cols)",
          alignItems: "center",
          gap: 30,
          padding: "26px 0",
          borderTop: `1px solid ${HAIRLINE}`,
          cursor: "pointer",
          textDecoration: "none",
          color: "inherit",
        }}
      >
        {/* Col 1 — kicker + date */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 7,
            fontSize: 11.5,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          <span>{kickerFor(post)}</span>
          <span>{formatRowDate(post.date)}</span>
        </div>

        {/* Col 2 — title + excerpt */}
        <div>
          <h2
            className="ee-diarylist-title"
            style={{
              fontSize: 28,
              fontWeight: 500,
              letterSpacing: "-0.005em",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            {post.title}
          </h2>
          {post.excerpt ? (
            <p
              style={{
                marginTop: 8,
                marginBottom: 0,
                fontSize: 15,
                lineHeight: 1.55,
                color: MUTED,
                maxWidth: "56ch",
              }}
            >
              {post.excerpt}
            </p>
          ) : null}
        </div>

        {/* Col 3 — arrow (hidden on mobile via CSS) */}
        <span
          className="ee-diarylist-arrow"
          aria-hidden
          style={{ fontSize: 16, color: "var(--ee-accent)", textAlign: "center" }}
        >
          →
        </span>

        {/* Col 4 — thumbnail, clean (Eric, B3 round 4: no mount box) */}
        <div className="ee-diarylist-thumb">
          {post.featured ? (
            <Image
              src={post.featured}
              alt={post.title}
              width={156}
              height={104}
              sizes="168px"
              style={{
                display: "block",
                width: "100%",
                height: "auto",
                aspectRatio: "3 / 2",
                objectFit: "cover",
                objectPosition: "50% 45%",
              }}
            />
          ) : (
            <div
              style={{ width: "100%", aspectRatio: "3 / 2", background: "var(--ee-panel)" }}
            />
          )}
        </div>
      </Link>
    </Reveal>
  );
}

export default function DiaryList({ posts }: { posts: PostSummary[] }) {
  const rows = posts.map((post, i) => {
    const year = postYear(post.date);
    const prevYear = i > 0 ? postYear(posts[i - 1].date) : "";
    const showBreak = year !== "" && year !== prevYear;
    return { post, year, showBreak };
  });

  return (
    <div>
      {rows.map(({ post, year, showBreak }) => (
        <div key={post.slug}>
          {showBreak ? (
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.22em",
                color: MUTED,
                padding: "30px 0 14px",
              }}
            >
              {year}
            </div>
          ) : null}
          <DiaryRow post={post} />
        </div>
      ))}
      {/* trailing hairline closing the last row */}
      <div style={{ borderTop: `1px solid ${HAIRLINE}` }} />
    </div>
  );
}
