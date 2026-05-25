"use client";

import { useState } from "react";

// Syntax highlighting for terminal-style code blocks
function SyntaxLine({ text }: { text: string }) {
  // Very basic: highlight comments (//), strings ("..."), keywords
  const highlight = (t: string): React.ReactNode => {
    const parts: React.ReactNode[] = [];
    let remaining = t;

    // Keywords
    const keywords = ["wired:", "send", "subject", "message", "transmit"];
    const colorMap: Record<string, string> = {
      "wired:": "#3366cc",
      send: "#cc3333",
      subject: "#cc3333",
      message: "#cc3333",
      transmit: "#00cc33",
    };

    let i = 0;
    // Simple approach: just color known words
    const regex = /(\/\/.*|"[^"]*"|wired:|send|subject|message|transmit|\[|\]|\$)/g;
    let lastIdx = 0;
    let match;

    while ((match = regex.exec(t)) !== null) {
      if (match.index > lastIdx) {
        parts.push(
          <span key={`t-${i++}`} style={{ color: "#c4c4d8" }}>
            {t.slice(lastIdx, match.index)}
          </span>
        );
      }

      let color = "#c4c4d8";
      const m = match[0];
      if (m.startsWith("//")) color = "#6a6a88";
      else if (m.startsWith('"')) color = "#00cc66";
      else if (m === "wired:" || m === "$" || m.includes("vk")) color = "#3366cc";
      else if (m === "send" || m === "subject" || m === "message") color = "#cc3333";
      else if (m === "transmit") color = "#00cc33";
      else if (m === "[" || m === "]") color = "#6a6a88";

      parts.push(
        <span key={`m-${i++}`} style={{ color }}>
          {m}
        </span>
      );
      lastIdx = match.index + m.length;
    }

    if (lastIdx < t.length) {
      parts.push(
        <span key={`t-${i++}`} style={{ color: "#c4c4d8" }}>
          {t.slice(lastIdx)}
        </span>
      );
    }

    return parts.length > 0 ? parts : <span style={{ color: "#c4c4d8" }}>{t}</span>;
  };

  return <div style={{ whiteSpace: "pre", lineHeight: 1.8 }}>{highlight(text)}</div>;
}

interface Props {
  t: {
    statusTitle?: string;
    statusWhoami?: string;
    statusUname?: string;
    statusUptime?: string;
    [key: string]: unknown;
  };
}

export default function ContactForm({ t: _t }: Props) {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleTransmit = () => {
    if (!name || !subject || !message) return;
    // Visual-only — no actual send
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setName("");
      setSubject("");
      setMessage("");
    }, 4000);
  };

  return (
    <section>
      <h2>▸ Contact</h2>
      <div className="box" style={{ fontSize: "0.82rem" }}>
        {!sent ? (
          <>
            <SyntaxLine text={'wired://vk:~$ send --to [     ]'} />
            <div style={{ display: "flex", alignItems: "center", marginBottom: "0.4rem" }}>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="your name / email..."
                className="cli-input"
                autoFocus
              />
            </div>
            <SyntaxLine text={'wired://vk:~$ subject  [     ]'} />
            <div style={{ display: "flex", alignItems: "center", marginBottom: "0.4rem" }}>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="what's this about?"
                className="cli-input"
              />
            </div>
            <SyntaxLine text={'wired://vk:~$ message  [     ]'} />
            <div style={{ display: "flex", alignItems: "flex-start", marginBottom: "0.6rem" }}>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="your message..."
                className="cli-input cli-textarea"
                rows={4}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ color: "#00cc33" }}>wired://vk:~$ transmit</span>
              <span className="cursor-blink" style={{ marginLeft: 2 }}>▌</span>
              <button onClick={handleTransmit} className="transmit-btn" style={{ marginLeft: "auto" }}>
                [ ENTER ]
              </button>
            </div>
            <div style={{ marginTop: "0.75rem", fontSize: "0.65rem", color: "#6a6a88" }}>
              // Form is visual only — reach me via Telegram or Email for real.
            </div>
          </>
        ) : (
          <div>
            <div style={{ color: "#00cc33", marginBottom: "0.5rem", fontFamily: "monospace" }}>
              ✓ Transmission complete
            </div>
            <div style={{ color: "#6a6a88", fontSize: "0.75rem" }}>
              // Signal sent. Acknowledged. (Visual mode)
            </div>
            <div style={{ color: "#6a6a88", fontSize: "0.75rem", marginTop: "0.5rem" }}>
              // Real contact: <a href="https://t.me/Callme_vexshell">@Callme_vexshell</a> or <a href="mailto:rtmny078@gmail.com">rtmny078@gmail.com</a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
