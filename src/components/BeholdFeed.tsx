"use client";

import { useEffect, useState } from "react";

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

/** Pick the best displayable thumbnail URL for any media type (image/video/carousel). */
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

export default function BeholdFeed() {
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

  // Error state: plain link to the Instagram profile.
  if (errored) {
    return (
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener"
        className="block text-sm text-white/60 underline underline-offset-4 transition-colors hover:text-white"
      >
        View on Instagram → @ericescapes
      </a>
    );
  }

  // Loading state: 6 square placeholders so layout stays stable.
  if (posts === null) {
    return (
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-square w-full animate-pulse bg-white/5" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      {posts.map((post) => {
        const src = pickImageUrl(post);
        if (!src) return null;
        return (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener"
            className="group relative block aspect-square w-full overflow-hidden bg-white/5"
          >
            {/* External Instagram/Behold CDN URLs — plain <img> to avoid next/image remotePatterns config. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={post.caption?.slice(0, 120) ?? "Instagram post"}
              loading="lazy"
              className="h-full w-full object-cover transition duration-300 group-hover:brightness-75"
            />
          </a>
        );
      })}
    </div>
  );
}
