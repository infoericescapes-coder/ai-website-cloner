import { GATE_SCRIPT } from "./intro-gate";

/**
 * The archive intro's pre-paint gate: an inline classic script, rendered as
 * the FIRST node of the homepage markup so it runs during HTML parsing,
 * before hydration and before the page content below it can paint. It only
 * ever touches <head> (one injected <style>), so hydration sees nothing
 * foreign. Server component: no client JS of its own.
 */
export default function IntroGate() {
  return <script id="ee-intro-gate" dangerouslySetInnerHTML={{ __html: GATE_SCRIPT }} />;
}
