"use client";
import { useEffect, useRef, useState } from "react";

function clamp(n: number, min = 0, max = 1) { return Math.min(max, Math.max(min, n)); }

export default function ParallaxCar() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current!;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const h = window.innerHeight || 1;
      const raw = 1 - clamp((rect.top + rect.height * 0.3) / (h + rect.height * 0.3));
      setProgress(clamp(raw));
    };
    onScroll();
    const obs = new IntersectionObserver(onScroll, { threshold: Array.from({ length: 11 }, (_, i) => i/10) });
    obs.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); obs.disconnect(); };
  }, []);

  const rotate = (progress * 6 - 3); // -3deg..+3deg
  const translateX = (progress * 30 - 15); // -15..+15px
  const shadowScale = 0.9 + progress * 0.2; // 0.9..1.1

  return (
    <div ref={ref} style={{ height: "120svh", display: "grid", placeItems: "center" }}>
      <div style={{ width: "min(1100px, 90vw)", aspectRatio: "16/9", position: "relative" }}>
        {/* ground shadow */}
        <div style={{
          position: "absolute", inset: 0,
          display: "grid", placeItems: "end center",
          filter: "blur(24px)", transform: `scale(${shadowScale})`, opacity: .7
        }}>
          <div style={{ width: "66%", height: 24, borderRadius: 999, background: "radial-gradient(100% 100% at 50% 50%, rgba(0,0,0,.9), rgba(0,0,0,0))" }} />
        </div>

        {/* neon trails */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }} aria-hidden>
          <div style={{ position: "absolute", left: "-10%", right: "-10%", top: "55%", height: 2, background: `linear-gradient(90deg, transparent, rgba(0,229,255,.6), transparent)` , transform: `translateX(${translateX * -1.5}px)` }} />
          <div style={{ position: "absolute", left: "-10%", right: "-10%", top: "60%", height: 2, background: `linear-gradient(90deg, transparent, rgba(255,45,85,.5), transparent)`, transform: `translateX(${translateX * 1.2}px)` }} />
        </div>

        <svg viewBox="0 0 1200 600" style={{ width: "100%", height: "100%", display: "block", filter: "drop-shadow(0 10px 24px rgba(0,0,0,.4))", transform: `translateX(${translateX}px) rotate(${rotate}deg)`, transition: "transform .06s linear" }}>
          {/* Body */}
          <defs>
            <linearGradient id="paintBody" x1="0" x2="1">
              <stop offset="0%" stopColor="#111" />
              <stop offset="50%" stopColor="#1a1a1a" />
              <stop offset="100%" stopColor="#333" />
            </linearGradient>
            <linearGradient id="paintAccent" x1="0" x2="1">
              <stop offset="0%" stopColor="#00e5ff" />
              <stop offset="100%" stopColor="#7afcff" />
            </linearGradient>
          </defs>

          {/* chassis */}
          <g>
            <rect x="150" y="240" rx="24" ry="24" width="900" height="180" fill="url(#paintBody)" />
            <rect x="300" y="190" rx="18" ry="18" width="520" height="90" fill="#0f0f0f" />
            <rect x="840" y="210" rx="8" ry="8" width="160" height="60" fill="#151515" />
            <rect x="860" y="220" rx="6" ry="6" width="120" height="40" fill="#0a0a0a" />

            {/* accent stripes */}
            <rect x="180" y="260" width="860" height="8" fill="url(#paintAccent)" opacity=".85" />
            <rect x="180" y="390" width="860" height="6" fill="#ff2d55" opacity=".6" />

            {/* cockpit glass */}
            <path d="M340 200 h440 a30 30 0 0 1 30 30 v20 a20 20 0 0 1 -20 20 h-460 a25 25 0 0 1 -25 -25 v-10 a35 35 0 0 1 35 -35 z" fill="#2b2b2b" />
            <path d="M360 215 h400 a18 18 0 0 1 18 18 v10 a12 12 0 0 1 -12 12 h-412 a15 15 0 0 1 -15 -15 v-5 a20 20 0 0 1 21 -20 z" fill="#0c0c0c" />

            {/* lights */}
            <rect x="160" y="288" width="16" height="28" rx="6" fill="#ffe066" />
            <rect x="1024" y="328" width="16" height="28" rx="6" fill="#67e8f9" />
          </g>

          {/* wheels */}
          <g>
            <circle cx="280" cy="420" r="74" fill="#0b0b0b" />
            <circle cx="280" cy="420" r="60" fill="#151515" />
            <circle cx="280" cy="420" r="40" fill="#202020" />

            <circle cx="920" cy="420" r="74" fill="#0b0b0b" />
            <circle cx="920" cy="420" r="60" fill="#151515" />
            <circle cx="920" cy="420" r="40" fill="#202020" />

            {/* hub glows */}
            <circle cx="280" cy="420" r="16" fill="#00e5ff" opacity=".9" />
            <circle cx="920" cy="420" r="16" fill="#ff2d55" opacity=".9" />
          </g>
        </svg>
      </div>
    </div>
  );
}
