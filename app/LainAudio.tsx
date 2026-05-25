"use client";

import { useState, useCallback, useEffect } from "react";

const AUDIO_URL = "https://www.myinstants.com/media/sounds/present-day-heh.mp3";

export default function LainAudio() {
  const [muted, setMuted] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const toggle = useCallback(() => {
    setMuted((m) => !m);
  }, []);

  // Try to preload
  useEffect(() => {
    const audio = new Audio(AUDIO_URL);
    audio.preload = "auto";
    audio.muted = true; // don't actually play on preload
    audio.load();
    // We'll play the real one on demand
    setLoaded(true);
  }, []);

  // Expose play method globally so BootSequence can call it
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__playLainAudio = () => {
      if (muted) return;
      const audio = new Audio(AUDIO_URL);
      audio.volume = 0.6;
      audio.play().catch(() => {
        // Browser may block autoplay — that's fine
      });
    };
    return () => {
      delete (window as unknown as Record<string, unknown>).__playLainAudio;
    };
  }, [muted]);

  return (
    <button
      onClick={toggle}
      style={{
        position: "fixed",
        top: 12,
        right: 12,
        zIndex: 10001,
        background: "rgba(0,0,0,0.7)",
        border: "1px solid var(--wire)",
        color: "var(--text-dim)",
        fontFamily: "'Courier New', monospace",
        fontSize: "0.65rem",
        padding: "5px 10px",
        cursor: "pointer",
        letterSpacing: "0.1em",
      }}
      title={muted ? "Unmute Lain" : "Mute Lain"}
    >
      ♪ {muted ? "off" : "on"}
    </button>
  );
}
