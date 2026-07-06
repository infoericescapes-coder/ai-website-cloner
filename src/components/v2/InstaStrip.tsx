"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/v2/chrome/Reveal";
import LedDot from "@/components/v2/chrome/LedDot";

/**
 * @ericescapes strip (home-archive.md §6). Re-skinned wrap around the live
 * Behold IG feed (feeds.behold.so JSON). Header = "@ericescapes" kicker + LED
 * live dot on the left, "Follow on Instagram ↗" on the right. Grid = 6 square
 * tiles, gap 2px (repeat(6,1fr) desktop / repeat(3,1fr) mobile), each hover →
 * inset accent hairline (120ms). Images are external Instagram/Behold CDN URLs
 * (plain <img>, no next/image remotePatterns config needed).
 */

const BEHOLD_FEED_URL = "https://feeds.behold.so/rAfeJ0kqND2SHoZkoZoz";
const INSTAGRAM_URL = "https://www.instagram.com/ericescapes";

interface BeholdSize {
  mediaUrl: string;
}

interface BeholdSizes {
  small?: BeholdSize;
  medium?: BeholdSize;
  large?: BeholdSize;
  full?: BeholdSize;
}

interface BeholdPost {
  id: string;
  permalink: string;
  caption?: string;
  mediaType?: string;
  mediaUrl?: string;
  sizes?: BeholdSizes;
}

interface BeholdFeedResponse {
  posts: BeholdPost[];
}

/** Best displayable thumbnail URL for any media type (image/video/carousel). */
function pickImageUrl(post: BeholdPost): string | null {
  const s = post.sizes;
  return (
    s?.medium?.mediaUrl ??
    s?.small?.mediaUrl ??
    s?.large?.mediaUrl ??
    s?.full?.mediaUrl ??
    post.mediaUrl ??
    null
  );
}

export default function InstaStrip() {
  const [posts, setPosts] = useState<BeholdPost[] | null>(null);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    fetch(BEHOLD_FEED_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Behold feed ${res.status}`);
        return res.json() as Promise<BeholdFeedResponse>;
      })
      .then((data) => {
        if (!active) return;
        const next = Array.isArray(data.posts) ? data.posts.slice(0, 6) : [];
        setPosts(next);
      })
      .catch((err: unknown) => {
        if (!active || (err instanceof DOMException && err.name === "AbortError")) {
          return;
        }
        setErrored(true);
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  const kicker = {
    fontSize: 12,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: "var(--ee-muted)",
  };

  return (
    <Reveal
      as="section"
      className="ee-gutter"
      style={{ maxWidth: 1560, margin: "0 auto", paddingTop: 84, paddingBottom: 96 }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between"
        style={{ marginBottom: 26 }}
      >
        <div className="flex items-center" style={{ gap: 12 }}>
          <LedDot size={6} />
          <span style={kicker}>@ericescapes</span>
        </div>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="ee-social"
          style={{
            fontSize: 11.5,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--ee-muted)",
            transition: "color 120ms ease",
          }}
        >
          Follow on Instagram ↗
        </a>
      </div>

      {/* Grid — 3 cols mobile, 6 cols desktop */}
      {errored ? (
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="ee-social"
          style={{
            fontSize: 12.5,
            letterSpacing: "0.1em",
            color: "var(--ee-muted)",
            transition: "color 120ms ease",
          }}
        >
          View on Instagram → @ericescapes
        </a>
      ) : (
        <div
          className="grid grid-cols-3 md:grid-cols-6"
          style={{ gap: 2 }}
        >
          {posts === null
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse"
                  style={{ aspectRatio: "1 / 1", background: "var(--ee-panel)" }}
                />
              ))
            : posts.map((post) => {
                const src = pickImageUrl(post);
                if (!src) return null;
                return (
                  <a
                    key={post.id}
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ee-insta-tile"
                    style={{
                      position: "relative",
                      display: "block",
                      aspectRatio: "1 / 1",
                      overflow: "hidden",
                      background: "var(--ee-panel)",
                      cursor: "pointer",
                    }}
                  >
                    {/* External Instagram/Behold CDN URL — plain <img> by design. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={post.caption?.slice(0, 120) ?? "Instagram post"}
                      loading="lazy"
                      style={{ height: "100%", width: "100%", objectFit: "cover" }}
                    />
                  </a>
                );
              })}
        </div>
      )}
    </Reveal>
  );
}
