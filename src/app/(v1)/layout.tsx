import V1Shell from "@/components/V1Shell";

/**
 * (v1) route-group layout — the OLD (pre-redesign) site shell.
 *
 * Route groups don't affect URLs: `src/app/(v1)/about/page.tsx` still serves
 * `/about`. Every un-migrated page lives in this group and gets exactly the
 * chrome the root layout used to provide (old Header/Footer, padded <main>,
 * Open Sans cascade) via V1Shell. When a page is migrated to the redesign,
 * move its folder to `src/app/(v2)/<route>/` and rebuild it there — never let
 * the same route exist in both groups (build-time collision).
 */
export default function V1Layout({ children }: { children: React.ReactNode }) {
  return <V1Shell>{children}</V1Shell>;
}
