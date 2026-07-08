"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { PostSummary } from "@/lib/blog";
import DiaryList from "@/components/v2/blog/DiaryList";

/**
 * Client-side pagination for the Visual Diaries index.
 *
 * WHY THIS IS A CLIENT COMPONENT: the server index page must stay STATICALLY
 * generated so every rebuild reflects the current post set (see the note in
 * blog-1/page.tsx). Reading `?page=` via server `searchParams` would force the
 * route dynamic. Instead the server page passes the FULL post list down here,
 * and this component reads `?page=` from `useSearchParams()` to slice + render
 * the same paginated view. Look and pager markup are byte-identical to the
 * original server page — only the source of `currentPage` moved to the URL.
 *
 * Must be rendered inside a <Suspense> boundary (Next requirement for
 * useSearchParams under static rendering).
 */

const MUTED = "#8B8F86";

export default function DiaryPaged({
  posts,
  postsPerPage,
}: {
  posts: PostSummary[];
  postsPerPage: number;
}) {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");

  const totalPages = Math.max(1, Math.ceil(posts.length / postsPerPage));
  const currentPage = Math.min(
    Math.max(1, Number.parseInt(pageParam ?? "1", 10) || 1),
    totalPages,
  );

  const start = (currentPage - 1) * postsPerPage;
  const pagePosts = posts.slice(start, start + postsPerPage);

  return (
    <>
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
    </>
  );
}
