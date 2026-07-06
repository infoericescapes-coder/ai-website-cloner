import LedDot from "./chrome/LedDot";

/**
 * design-v2 Footer (shell.md §5). 3-col grid (copyright / centered monogram
 * mark / social links), fade treatment via the top gradient. Center mark = 4
 * accent corner brackets + a centered LED dot. Social icons accent-stroked.
 */
export default function Footer() {
  const bracket = { position: "absolute" as const, width: 10, height: 10 };
  return (
    <footer
      style={{
        borderTop: "1px solid var(--ee-hairline)",
        padding: "36px 40px 48px",
        background:
          "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 70%, #000 100%)",
      }}
    >
      <div
        className="grid items-center"
        style={{
          maxWidth: 1560,
          margin: "0 auto",
          gridTemplateColumns: "1fr auto 1fr",
          gap: 40,
        }}
      >
        {/* Left — copyright */}
        <div
          className="flex flex-col text-center md:text-left"
          style={{
            gap: 7,
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--ee-muted)",
          }}
        >
          <span>© 2026 Eric Escapes</span>
          <span>All rights reserved</span>
        </div>

        {/* Center — monogram mark */}
        <div
          className="hidden md:flex items-center justify-center"
          style={{ position: "relative", width: 36, height: 36, justifySelf: "center" }}
          aria-hidden
        >
          <span style={{ ...bracket, top: 0, left: 0, borderTop: "1px solid var(--ee-accent)", borderLeft: "1px solid var(--ee-accent)" }} />
          <span style={{ ...bracket, top: 0, right: 0, borderTop: "1px solid var(--ee-accent)", borderRight: "1px solid var(--ee-accent)" }} />
          <span style={{ ...bracket, bottom: 0, left: 0, borderBottom: "1px solid var(--ee-accent)", borderLeft: "1px solid var(--ee-accent)" }} />
          <span style={{ ...bracket, bottom: 0, right: 0, borderBottom: "1px solid var(--ee-accent)", borderRight: "1px solid var(--ee-accent)" }} />
          <LedDot size={5} />
        </div>

        {/* Right — social */}
        <div
          className="flex items-center justify-center md:justify-end"
          style={{ gap: 32, justifySelf: "end" }}
        >
          <a
            href="https://www.instagram.com/ericescapes"
            target="_blank"
            rel="noopener noreferrer"
            className="ee-social flex items-center"
            style={{ gap: 9, color: "var(--ee-muted)", transition: "color 120ms ease" }}
          >
            <svg width={15} height={15} viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x={3} y={3} width={18} height={18} rx={5} stroke="var(--ee-accent)" strokeWidth={1.6} />
              <circle cx={12} cy={12} r={4.2} stroke="var(--ee-accent)" strokeWidth={1.6} />
              <circle cx={17.4} cy={6.6} r={1.1} fill="var(--ee-accent)" />
            </svg>
            <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.2em" }}>
              INSTAGRAM
            </span>
          </a>
          <a
            href="https://ericescapes.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="ee-social flex items-center"
            style={{ gap: 9, color: "var(--ee-muted)", transition: "color 120ms ease" }}
          >
            <svg width={13} height={14} viewBox="0 0 24 26" fill="none" aria-hidden>
              <path d="M2 1.5 H22" stroke="var(--ee-accent)" strokeWidth={2.4} />
              <path d="M2 7 H22" stroke="var(--ee-accent)" strokeWidth={2.4} />
              <path d="M2 12.5 H22 V24.5 L12 19 L2 24.5 Z" fill="var(--ee-accent)" />
            </svg>
            <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.2em" }}>
              SUBSTACK
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
