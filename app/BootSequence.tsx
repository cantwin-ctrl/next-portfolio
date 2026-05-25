"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const BOOT_LINES = [
  { text: "initializing kernel...", ok: true },
  { text: "mounting /wired...", ok: true },
  { text: "establishing uplink...", ok: true },
  { text: "connecting to the Wired...", ok: true },
  { text: "loading layer:01...", ok: true },
  { text: "calling Lain...", ok: true },
];

interface Props {
  onDone: () => void;
}

export default function BootSequence({ onDone }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const tl = gsap.timeline({ onComplete: onDone });

    tl.set(container, { opacity: 1, backgroundColor: "#000" });

    BOOT_LINES.forEach((line, i) => {
      const el = document.createElement("div");
      el.style.cssText = `
        font-family: 'Courier New', monospace;
        color: #00ff41;
        font-size: 1rem;
        letter-spacing: 0.15em;
        margin-bottom: 0.4rem;
        opacity: 0;
        text-align: center;
      `;
      el.textContent = `${line.text.padEnd(35, " ")}[  ${line.ok ? "OK" : "FAIL"}  ]`;
      container.appendChild(el);

      tl.to(el, { opacity: 1, duration: 0.25, ease: "none" }, i === 0 ? "+=0.3" : "+=0.35");
    });

    // Brief pause then fade out
    tl.to({}, { duration: 0.8 });
    tl.to(container, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
    });

    return () => {
      tl.kill();
      container.innerHTML = "";
    };
  }, [onDone]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        opacity: 0,
      }}
    />
  );
}
