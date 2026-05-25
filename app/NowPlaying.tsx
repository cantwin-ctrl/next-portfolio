"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const TRACKS = [
  { title: "Duvet", artist: "Bôa", album: "Twilight", year: "1998", duration: "3:22" },
  { title: "A Sobrenatureza", artist: "Yasushi Ishii", album: "Lain OST", year: "1998", duration: "4:15" },
  { title: "Pulse of the Wired", artist: "Nujabes", album: "Modal Soul", year: "2005", duration: "3:48" },
  { title: "Paranoid Android", artist: "Radiohead", album: "OK Computer", year: "1997", duration: "6:23" },
  { title: "Cowboy Bebop", artist: "Seatbelts", album: "Tank!", year: "1998", duration: "3:31" },
  { title: "Ghost in the Shell", artist: "Kenji Kawai", album: "GITS OST", year: "1995", duration: "5:42" },
  { title: "Clubbed to Death", artist: "Rob Dougan", album: "The Matrix OST", year: "1999", duration: "7:26" },
  { title: "Teardrop", artist: "Massive Attack", album: "Mezzanine", year: "1998", duration: "5:31" },
];

const LAIN_QUOTES = [
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

export default function NowPlaying() {
  const [trackIdx, setTrackIdx] = useState(0);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [bars, setBars] = useState([20, 45, 30, 60, 25, 50, 35]);
  const [elapsed, setElapsed] = useState("00:00");
  const quoteRef = useRef<HTMLSpanElement>(null);
  const track = TRACKS[trackIdx];

  // Simulate playback time
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed((prev) => {
        const [m, s] = prev.split(":").map(Number);
        const total = m * 60 + s + 1;
        const [dm, ds] = track.duration.split(":").map(Number);
        const max = dm * 60 + ds;
        if (total >= max - 1) {
          setTrackIdx((i) => (i + 1) % TRACKS.length);
          return "00:00";
        }
        return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [trackIdx, track.duration]);

  // Quote rotator
  useEffect(() => {
    const interval = setInterval(() => {
      if (quoteRef.current) {
        gsap.to(quoteRef.current, {
          opacity: 0, y: -8, duration: 0.3, ease: "power2.in",
          onComplete: () => {
            setQuoteIdx((i) => (i + 1) % LAIN_QUOTES.length);
            gsap.fromTo(quoteRef.current!, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });
          },
        });
      }
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Equalizer bars
  useEffect(() => {
    const interval = setInterval(() => {
      setBars(Array.from({ length: 7 }, () => Math.floor(Math.random() * 55) + 10));
    }, 350);
    return () => clearInterval(interval);
  }, []);

  // Calculate progress bar percentage
  const [em, es] = elapsed.split(":").map(Number);
  const [dm, ds] = track.duration.split(":").map(Number);
  const pct = Math.min(((em * 60 + es) / (dm * 60 + ds)) * 100, 100);
  const barLen = 20;
  const filled = Math.floor(pct / (100 / barLen));

  return (
    <section className="now-playing">
      <h2>▸ Now Playing</h2>
      <div className="np-container">
        {/* CRT display */}
        <div className="np-display">
          <div className="np-track-info">
            <span className="np-label">TRACK</span>
            <span className="np-value">{track.title}</span>
          </div>
          <div className="np-track-info">
            <span className="np-label">ARTIST</span>
            <span className="np-value">{track.artist}</span>
          </div>
          <div className="np-track-info">
            <span className="np-label">ALBUM</span>
            <span className="np-value">{track.album}</span>
          </div>
          <div className="np-track-info">
            <span className="np-label">YEAR</span>
            <span className="np-value">{track.year}</span>
          </div>

          {/* Equalizer bars */}
          <div className="np-eq">
            {bars.map((h, i) => (
              <div key={i} className="np-eq-bar" style={{ height: `${h}%` }} />
            ))}
          </div>

          {/* Time display */}
          <div className="np-time">
            <span>▶ {elapsed}</span>
            <span style={{ whiteSpace: "pre", letterSpacing: 0 }}>
              {"━".repeat(filled)}{"●"}{"━".repeat(Math.max(barLen - filled, 0))}
            </span>
            <span>{track.duration}</span>
          </div>

          {/* Track indicator */}
          <div className="np-time" style={{ marginTop: "0.3rem", justifyContent: "center", opacity: 0.5 }}>
            <span>track {trackIdx + 1}/{TRACKS.length}</span>
          </div>
        </div>

        {/* Quote */}
        <div className="np-quote">
          <span ref={quoteRef} className="np-quote-text">
            &ldquo;{LAIN_QUOTES[quoteIdx]}&rdquo;
          </span>
        </div>
      </div>
    </section>
  );
}
