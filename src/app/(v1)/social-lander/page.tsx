export const metadata = {
  title: "Social Lander — ERIC ESCAPES",
};

/**
 * Faithful clone note: the live page at ericescapes.com/social-lander is a
 * Squarespace stub — a single full-bleed "medium height" section with an
 * empty fluid-engine grid (no blocks placed inside it) between the shared
 * header and footer. Verified via rendered DOM + screenshot: no gallery
 * photos, no copy, no buttons/links beyond the standard nav and footer.
 * Reproduced here as the same empty spacer section rather than inventing
 * content that doesn't exist on the source page.
 */
export default function SocialLanderPage() {
  return <section className="min-h-[10vh] w-full md:min-h-[15vh]" aria-hidden="true" />;
}
