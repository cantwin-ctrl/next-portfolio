"use client";

import { useState } from "react";

const JOKES = [
  "Nice try. There is no light mode.",
  "The dark side called. They want their theme back.",
  "Light mode? In this economy?",
  "lol. no.",
  "Who hurt you?",
  "Your eyes will thank me later.",
  "Have you tried sunglasses?",
  "Dark mode isn't a phase, mom.",
  "☀️ → ❌",
  "🔦 not included.",
  "what do you expect.",
  "No my eyes burning.",
];

export default function ThemeToggle() {
  const [joke, setJoke] = useState("");
  const [visible, setVisible] = useState(false);

  const click = () => {
    const j = JOKES[Math.floor(Math.random() * JOKES.length)];
    setJoke(j);
    setVisible(true);
    setTimeout(() => setVisible(false), 2000);
  };

  return (
    <>
      <button
        onClick={click}
        style={{
          position: "fixed",
          bottom: 20,
          left: 20,
          zIndex: 100,
          background: "#0a0a0a",
          color: "#00ff41",
          border: "1px solid #0a3a0a",
          padding: "0.5rem",
          fontFamily: "monospace",
          fontSize: "1rem",
          cursor: "pointer",
          borderRadius: "4px",
        }}
        title="Toggle theme"
      >
        🌙
      </button>
      {visible && (
        <div
          style={{
            position: "fixed",
            bottom: 60,
            left: 20,
            zIndex: 101,
            background: "#0a0a0a",
            color: "#00ff41",
            border: "1px solid #0a3a0a",
            padding: "0.5rem 1rem",
            fontFamily: "monospace",
            fontSize: "0.8rem",
            boxShadow: "0 0 10px rgba(0, 255, 65, 0.15)",
            animation: "fadeIn 0.2s ease",
          }}
        >
          {joke}
        </div>
      )}
    </>
  );
}
