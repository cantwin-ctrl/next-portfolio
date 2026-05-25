"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CicadaLogo() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    gsap.set(svg, { y: -120, opacity: 0, scale: 0.6 });
    gsap.to(svg, {
      y: 0,
      opacity: 0.85,
      scale: 1,
      duration: 0.7,
      ease: "back.out(1.4)",
      delay: 0.1,
    });
  }, []);

  return (
    <div className="cicada-container">
      <svg
        ref={svgRef}
        viewBox="0 0 120 80"
        width="120"
        height="80"
        style={{ opacity: 0 }}
      >
        {/* Wings */}
        <ellipse cx="35" cy="38" rx="28" ry="18" fill="none" stroke="#3366cc" strokeWidth="1.2" transform="rotate(-10, 35, 38)" />
        <ellipse cx="85" cy="38" rx="28" ry="18" fill="none" stroke="#3366cc" strokeWidth="1.2" transform="rotate(10, 85, 38)" />
        <ellipse cx="35" cy="38" rx="20" ry="12" fill="none" stroke="#4466dd" strokeWidth="0.8" transform="rotate(-10, 35, 38)" opacity="0.6" />
        <ellipse cx="85" cy="38" rx="20" ry="12" fill="none" stroke="#4466dd" strokeWidth="0.8" transform="rotate(10, 85, 38)" opacity="0.6" />
        {/* Veins */}
        <line x1="35" y1="25" x2="18" y2="45" stroke="#4466dd" strokeWidth="0.5" opacity="0.5" />
        <line x1="35" y1="30" x2="50" y2="45" stroke="#4466dd" strokeWidth="0.5" opacity="0.5" />
        <line x1="85" y1="25" x2="102" y2="45" stroke="#4466dd" strokeWidth="0.5" opacity="0.5" />
        <line x1="85" y1="30" x2="70" y2="45" stroke="#4466dd" strokeWidth="0.5" opacity="0.5" />
        {/* Body */}
        <ellipse cx="60" cy="42" rx="14" ry="22" fill="none" stroke="#cc3333" strokeWidth="1" />
        <ellipse cx="60" cy="36" rx="8" ry="10" fill="#1a1a2e" stroke="#cc3333" strokeWidth="0.8" />
        {/* Head */}
        <ellipse cx="60" cy="24" rx="10" ry="7" fill="#0d0d16" stroke="#cc3333" strokeWidth="0.8" />
        {/* Eyes */}
        <circle cx="56" cy="22" r="2.5" fill="#ff4444" opacity="0.9" />
        <circle cx="64" cy="22" r="2.5" fill="#ff4444" opacity="0.9" />
        <circle cx="56" cy="22" r="1" fill="#ff8888" />
        <circle cx="64" cy="22" r="1" fill="#ff8888" />
        {/* Antennae */}
        <path d="M54 18 Q48 6 40 4" fill="none" stroke="#3366cc" strokeWidth="0.7" />
        <path d="M66 18 Q72 6 80 4" fill="none" stroke="#3366cc" strokeWidth="0.7" />
        {/* 3301 text */}
        <text x="60" y="72" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#3366cc" letterSpacing="3">3301</text>
      </svg>
    </div>
  );
}
