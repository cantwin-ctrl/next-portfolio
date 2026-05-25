"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const QUOTES = [
  "No matter where you go, everyone's connected.",
  "If you're not remembered, then you never existed.",
  "Close the world, Open the nExt.",
  "The body is just a vessel.",
  "I am here. Therefore, I exist.",
  "In the Wired, the real and the virtual overlap.",
  "God is in the Wired.",
  "You're not alone. You're connected to everyone.",
  "Memory is merely a record. You just need to rewrite that record.",
  "Whatever happens, happens. That's all.",
  "I have no physical form. I exist only in the Wired.",
  "Everyone is connected. There is no boundary between people.",
];

export default function QuoteBanner() {
  const [quote, setQuote] = useState("Loading...");
  const elRef = useRef<HTMLDivElement>(null);

  const pickRandom = () => {
    const q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    const el = elRef.current;
    if (!el) { setQuote(q); return; }

    gsap.to(el, {
      opacity: 0,
      y: -5,
      duration: 0.25,
      onComplete: () => {
        setQuote(q);
        gsap.fromTo(el, { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.3 });
      },
    });
  };

  // Listen for custom tab change events
  useEffect(() => {
    const handler = () => pickRandom();
    window.addEventListener("vk-tab-change", handler);
    return () => window.removeEventListener("vk-tab-change", handler);
  }, []);

  // Initial quote
  useEffect(() => {
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  }, []);

  return (
    <div ref={elRef} style={{ fontFamily: "'Courier New', monospace", fontSize: "0.68rem" }}>
      // system: &ldquo;{quote}&rdquo;
    </div>
  );
}
