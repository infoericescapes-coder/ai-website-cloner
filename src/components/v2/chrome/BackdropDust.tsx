"use client";

import { useEffect, useRef } from "react";
import { designConfig, type BackdropMode } from "@/lib/design-config";

/**
 * Backdrop canvas (motion.md §9, shell.md §1). Fixed, z-0, behind everything.
 * Modes: dust (default) / code / rain, plus 2–3 slow radial glows tied to
 * scroll parallax, intensity scaled by `atmosphere`.
 *
 * HARD GATES:
 *  - DISABLED on mobile (vw < 760): paint the static base once, no rAF loop.
 *  - DISABLED under prefers-reduced-motion: paint static base + 2 static glows,
 *    return (no rAF), per the prototype early-return branch.
 * The `*{animation:none}` CSS rule does NOT stop requestAnimationFrame, so the
 * component must enforce these itself.
 */
type Dust = { x: number; y: number; r: number; a: number; tw: number; vx: number; vy: number; g: boolean };
type Streak = { x: number; y: number; len: number; v: number };
type Col = { x: number; y: number; speed: number; chars: string[] };

const GLYPHS = "アカサタナハマ01<>/:+·".split("");

export default function BackdropDust({
  mode = designConfig.backdrop,
  atmosphere = designConfig.atmosphere,
}: {
  mode?: BackdropMode;
  atmosphere?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 760;

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const paintBase = () => {
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "#050605");
      g.addColorStop(0.5, "#060806");
      g.addColorStop(1, "#040504");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    };

    const k = atmosphere;
    const glows = [
      { x: 0.25, y: 0.3, r: 0.55 },
      { x: 0.75, y: 0.6, r: 0.65 },
      { x: 0.5, y: 0.85, r: 0.5 },
    ];
    const paintGlows = (scroll: number) => {
      ctx.globalCompositeOperation = "lighter";
      for (const gl of glows) {
        const cx = gl.x * w;
        const cy = gl.y * h - scroll * 0.12;
        const rad = gl.r * Math.max(w, h) * 0.5;
        const rg = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        rg.addColorStop(0, `rgba(105,110,103,${0.05 * k})`);
        rg.addColorStop(1, "rgba(105,110,103,0)");
        ctx.fillStyle = rg;
        ctx.fillRect(0, 0, w, h);
      }
      ctx.globalCompositeOperation = "source-over";
    };

    // Static-only path: mobile or reduced-motion. Base + 2 static glows, no rAF.
    if (isMobile || reduced) {
      paintBase();
      paintGlows(0);
      const onResize = () => {
        resize();
        paintBase();
        paintGlows(0);
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    // ── animated path ──────────────────────────────────────────────────────
    const dust: Dust[] = [];
    const rain: Streak[] = [];
    const cols: Col[] = [];

    const buildDust = () => {
      dust.length = 0;
      for (let i = 0; i < 70; i++) {
        dust.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.5 + Math.random() * 1.4,
          a: 0.1 + Math.random() * 0.35,
          tw: Math.random() * Math.PI * 2,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          g: Math.random() < 0.45,
        });
      }
    };
    const buildRain = () => {
      rain.length = 0;
      for (let i = 0; i < 110; i++) {
        rain.push({
          x: Math.random() * w,
          y: Math.random() * h,
          len: 9 + Math.random() * 16,
          v: 34 + Math.random() * 52,
        });
      }
    };
    const buildCode = () => {
      cols.length = 0;
      const n = Math.floor(w / 26);
      for (let i = 0; i < n; i++) {
        if (Math.random() < 0.45) {
          cols.push({
            x: i * 26 + 6,
            y: Math.random() * h,
            speed: 20 + Math.random() * 40,
            chars: Array.from({ length: 6 + ((Math.random() * 10) | 0) }, () => GLYPHS[(Math.random() * GLYPHS.length) | 0]),
          });
        }
      }
    };

    if (mode === "dust") buildDust();
    else if (mode === "rain") buildRain();
    else buildCode();

    let raf = 0;
    let last = performance.now();
    let scrollY = window.scrollY;
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      paintBase();
      paintGlows(scrollY);
      ctx.globalCompositeOperation = "lighter";

      if (mode === "dust") {
        for (const p of dust) {
          p.x += p.vx;
          p.y += p.vy;
          p.tw += 0.02;
          if (p.x < 0) p.x = w;
          if (p.x > w) p.x = 0;
          if (p.y < 0) p.y = h;
          if (p.y > h) p.y = 0;
          const tw = 0.6 + 0.4 * Math.sin(p.tw);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = p.g
            ? `rgba(120,180,110,${p.a * tw})`
            : `rgba(150,152,146,${p.a * tw})`;
          ctx.fill();
        }
      } else if (mode === "rain") {
        ctx.strokeStyle = "rgba(150,152,146,0.18)";
        ctx.lineWidth = 1;
        for (const s of rain) {
          s.y += s.v * dt * 6;
          if (s.y > h) {
            s.y = -s.len;
            s.x = Math.random() * w;
          }
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x, s.y + s.len);
          ctx.stroke();
        }
      } else {
        ctx.font = "13px 'Space Grotesk', monospace";
        for (const c of cols) {
          c.y += c.speed * dt * 3;
          if (c.y > h + 120) c.y = -20;
          c.chars.forEach((ch, i) => {
            const cy = c.y - i * 16;
            if (cy < -16 || cy > h + 16) return;
            const alpha = i === 0 ? 0.22 : Math.max(0, 0.12 - i * 0.012);
            ctx.fillStyle = `rgba(120,180,110,${alpha})`;
            ctx.fillText(ch, c.x, cy);
          });
        }
      }

      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onResize = () => {
      resize();
      if (mode === "dust") buildDust();
      else if (mode === "rain") buildRain();
      else buildCode();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [mode, atmosphere]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}
