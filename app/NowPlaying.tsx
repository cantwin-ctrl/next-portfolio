"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const quotes = [
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
];

export default function NowPlaying() {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [bars, setBars] = useState([20, 45, 30, 60, 25, 50, 35]);
  const quoteRef = useRef<HTMLSpanElement>(null);

  // Quote rotator
  useEffect(() => {
    const interval = setInterval(() => {
      if (quoteRef.current) {
        gsap.to(quoteRef.current, {
          opacity: 0,
          y: -8,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            setQuoteIdx((i) => (i + 1) % quotes.length);
            gsap.fromTo(
              quoteRef.current!,
              { opacity: 0, y: 8 },
              { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
            );
          },
        });
      }
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Pseudo-equalizer bars
  useEffect(() => {
    const interval = setInterval(() => {
      setBars(
        Array.from({ length: 7 }, () => Math.floor(Math.random() * 55) + 10)
      );
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="now-playing">
      <h2>▸ Now Playing</h2>
      <div className="np-container">
        {/* CRT display */}
        <div className="np-display">
          <div className="np-track-info">
            <span className="np-label">TRACK</span>
            <span className="np-value">Duvet</span>
          </div>
          <div className="np-track-info">
            <span className="np-label">ARTIST</span>
            <span className="np-value">Bôa</span>
          </div>
          <div className="np-track-info">
            <span className="np-label">ALBUM</span>
            <span className="np-value">Twilight</span>
          </div>
          <div className="np-track-info">
            <span className="np-label">YEAR</span>
            <span className="np-value">1998</span>
          </div>

          {/* Equalizer bars */}
          <div className="np-eq">
            {bars.map((h, i) => (
              <div
                key={i}
                className="np-eq-bar"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>

          {/* Time display */}
          <div className="np-time">
            <span>▶ 01:23</span>
            <span>━━━━━━━●━━━━</span>
            <span>03:22</span>
          </div>
        </div>

        {/* Quote */}
        <div className="np-quote">
          <span ref={quoteRef} className="np-quote-text">
            &ldquo;{quotes[quoteIdx]}&rdquo;
          </span>
        </div>
      </div>
    </section>
  );
}
