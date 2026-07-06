import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Lander — ERIC ESCAPES",
};

/**
 * Social Lander (`/social-lander`) — migrated into the (v2) dark shell.
 *
 * CONTENT LOCK: the live page at ericescapes.com/social-lander is a Squarespace
 * stub — a single empty full-bleed spacer section with no blocks, no copy, no
 * links (verified against rendered DOM). There is no link list to carry over;
 * inventing one would be content drift. Reproduced faithfully as the same empty
 * spacer, now sitting inside the v2 Nav/Footer shell.
 */
export default function SocialLanderPage() {
  return <section className="min-h-[10vh] w-full md:min-h-[15vh]" aria-hidden="true" />;
}
