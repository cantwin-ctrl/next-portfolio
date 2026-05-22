"use client";

import { useState, useRef, useEffect, useCallback } from "react";

const HELP_TEXT = `
Available commands:
  help        Show this message
  whoami      Who am I?
  neofetch    System info
  skills      My skill set
  projects    What I'm building
  scan        NRFBOX WiFi scanner (sim)
  deauth      Send deauth frames (sim)
  coffee      Brew some coffee
  hack        Enter hackertyper mode
  clear       Clear terminal
  ls          List files
  pwd         Current directory
  date        Current date/time
  echo [msg]  Echo a message
  exit        Close terminal
`;

const NEOFETCH = `
       ██╗   ██╗██╗  ██╗
       ██║   ██║██║ ██╔╝    Vk@siem-reap
       ██║   ██║█████╔╝     --------------
       ╚██╗ ██╔╝██╔═██╗     OS: Debian 13 trixie
        ╚████╔╝ ██║  ██╗    Kernel: Linux 6.12
         ╚═══╝  ╚═╝  ╚═╝    Shell: zsh + oh-my-zsh
                             CPU: Celeron N4000 @ 1.1GHz
                             RAM: 7.6GB
                             Uptime: since 2004
                             Location: Siem Reap, KH
                             ☕ Coffee: overflow
`;

const SKILLS = `
Embedded Systems  ████████████████░░░░  85%
Shell Scripting   ████████████████░░░░  80%
Linux Admin       ███████████████░░░░░  75%
Python            █████████████░░░░░░░  65%
C/C++             ████████████░░░░░░░░  60%
PCB Design        ██████████░░░░░░░░░░  50%
`;

const PROJECTS = `
🔌 NRFBOX          WiFi Deauth-Jammer (Final Project)
🌐 Portfolio       Next.js static site on GitHub Pages
🎮 Discord RPG     Python bot with SQLite on Raspberry Pi
📊 Crypto Dashboard Multi-exchange price tracker + alerts
📱 Android Tools   Shell scripts for rooted Android modding
🎧 USB DAC Tuning  bit-perfect 384kHz on PulseAudio/ALSA
`;

const NETWORKS = [
  { ssid: "WiFi_Cambodia_2.4G", ch: 6, rssi: -42, enc: "WPA2", mac: "AA:BB:CC:11:22:33" },
  { ssid: "CoffeeShop_Free", ch: 1, rssi: -58, enc: "Open", mac: "AA:BB:CC:44:55:66" },
  { ssid: "TP-LINK_A7F2", ch: 11, rssi: -63, enc: "WPA2", mac: "AA:BB:CC:77:88:99" },
  { ssid: "NETGEAR_5G", ch: 3, rssi: -71, enc: "WPA3", mac: "AA:BB:CC:AA:BB:CC" },
  { ssid: "D-Link_DAP1360", ch: 9, rssi: -78, enc: "WEP", mac: "AA:BB:CC:DD:EE:FF" },
  { ssid: "Hidden Network", ch: 6, rssi: -82, enc: "WPA2", mac: "AA:BB:CC:12:34:56" },
];

export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [lines, setLines] = useState<string[]>([
    "Welcome to Vk's terminal. Type 'help' for commands. Type 'exit' to close.",
    "",
  ]);
  const [input, setInput] = useState("");
  const [pos, setPos] = useState({ x: 20, y: 20 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [scanning, setScanning] = useState(false);
  const [scanNets, setScanNets] = useState<typeof NETWORKS>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const termRef = useRef<HTMLDivElement>(null);
  const [hacking, setHacking] = useState(false);

  const addLine = useCallback((text: string) => {
    setLines((prev) => [...prev, text]);
  }, []);

  const execute = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();
      const args = trimmed.split(" ");
      addLine(`$ ${cmd}`);

      if (hacking && trimmed !== "exit" && trimmed !== "clear") return; // block during hack mode

      switch (args[0]) {
        case "help":
          HELP_TEXT.split("\n").forEach((l) => addLine(l));
          break;
        case "whoami":
          addLine("Vk");
          break;
        case "neofetch":
          NEOFETCH.split("\n").forEach((l) => addLine(l));
          break;
        case "skills":
          SKILLS.split("\n").forEach((l) => addLine(l));
          break;
        case "projects":
          PROJECTS.split("\n").forEach((l) => addLine(l));
          break;
        case "scan":
          setScanning(true);
          addLine("🔍 NRFBOX scanning 2.4GHz...");
          const found: typeof NETWORKS = [];
          NETWORKS.forEach((n, i) => {
            setTimeout(() => {
              found.push(n);
              setScanNets([...found]);
              if (i === NETWORKS.length - 1) {
                setScanning(false);
              }
            }, (i + 1) * 600);
          });
          break;
        case "deauth":
          addLine("⚡ Sending deauth frames to all detected APs...");
          addLine("📡 Packet injection active on channel 6");
          addLine("✅ Deauth attack complete. All clients disconnected.");
          addLine("⚠️ This was a simulation. No real frames were sent.");
          break;
        case "coffee":
          addLine("  ( (");
          addLine("   ) )");
          addLine("........|.....|");
          addLine('  |      |___/"-._');
          addLine("  '-..__/`  /`  |");
          addLine("       |__/      |");
          addLine("☕ Brewing... Done! Here's your coffee.");
          break;
        case "hack":
          setHacking(true);
          addLine("⚠️ Hackertyper mode activated. Just start typing...");
          addLine("(type 'exit' to stop)");
          break;
        case "clear":
          setLines([]);
          setScanNets([]);
          break;
        case "ls":
          addLine("projects/  tools/  coffee.sh  nrfbox/  secrets/");
          break;
        case "pwd":
          addLine("/home/Vk");
          break;
        case "date":
          addLine(new Date().toString());
          break;
        case "echo":
          addLine(args.slice(1).join(" ") || "");
          break;
        case "sudo":
          addLine("Nice try. But you're already root here. 😏");
          break;
        case "exit":
          if (hacking) {
            setHacking(false);
            addLine("Hackertyper mode deactivated.");
          } else {
            setOpen(false);
            setMinimized(false);
            setLines(["Welcome to Vk's terminal. Type 'help' for commands. Type 'exit' to close.", ""]);
            setScanNets([]);
          }
          break;
        default:
          if (hacking && trimmed) {
            const fake = [
              "defragmenting kernel modules...",
              "compiling buffer overflow...",
              "access mainframe at 192.168.1.1...",
              "bypassing firewall... OK",
              "injecting payload... SUCCESS",
              "escalating privileges...",
              "cracking hash: $2a$12$...",
              "connecting to tor node...",
              "decrypting packet capture...",
              "scanning open ports: 22 80 443 3306 8080",
            ];
            addLine(fake[Math.floor(Math.random() * fake.length)]);
          } else if (trimmed) {
            addLine(`bash: ${args[0]}: command not found`);
          }
      }
    },
    [addLine, hacking]
  );

  const toggleOpen = () => {
    if (open) {
      setOpen(false);
      setMinimized(false);
    } else {
      setOpen(true);
      setMinimized(false);
    }
  };

  // Drag handlers
  const onMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === "INPUT") return;
    setDragging(true);
    setDragStart({ x: e.clientX - pos.x, y: e.clientY - pos.y });
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    setPos({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };
  const onMouseUp = () => setDragging(false);

  // Scroll to bottom
  useEffect(() => {
    if (termRef.current) {
      termRef.current.scrollTop = termRef.current.scrollHeight;
    }
  }, [lines]);

  // Auto-focus input
  useEffect(() => {
    if (open && !minimized) inputRef.current?.focus();
  }, [open, minimized]);

  if (!open) {
    return (
      <button
        onClick={toggleOpen}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 100,
          background: "#0a0a0a",
          color: "#00ff41",
          border: "1px solid #0a3a0a",
          padding: "0.5rem 1rem",
          fontFamily: "monospace",
          fontSize: "0.8rem",
          cursor: "pointer",
        }}
      >
        &gt;_ terminal
      </button>
    );
  }

  return (
    <div
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        zIndex: 100,
        width: 500,
        maxWidth: "calc(100vw - 40px)",
        background: "rgba(0, 0, 0, 0.95)",
        border: "1px solid #0a3a0a",
        boxShadow: "0 0 20px rgba(0, 255, 65, 0.1)",
        display: minimized ? "none" : "block",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          padding: "0.4rem 0.8rem",
          borderBottom: "1px solid #0a3a0a",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "0.75rem",
          cursor: "move",
          userSelect: "none",
        }}
      >
        <span style={{ color: "#00ff41" }}>vk@siem-reap: ~</span>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => setMinimized(true)}
            style={{ color: "#0a7a0a", background: "none", border: "none", cursor: "pointer", fontSize: "0.8rem" }}
          >
            _
          </button>
          <button
            onClick={() => { setOpen(false); setMinimized(false); }}
            style={{ color: "#0a7a0a", background: "none", border: "none", cursor: "pointer", fontSize: "0.8rem" }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Terminal body */}
      <div
        ref={termRef}
        style={{
          height: 300,
          overflowY: "auto",
          padding: "0.5rem 0.8rem",
          fontSize: "0.75rem",
          lineHeight: "1.5",
          fontFamily: "monospace",
        }}
      >
        {lines.map((line, i) => (
          <div key={i} style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
            {line}
          </div>
        ))}
        {scanNets.length > 0 && (
          <div style={{ marginTop: "0.5rem" }}>
            <div style={{ color: "#00cc33", marginBottom: "0.25rem" }}>
              Found {scanNets.length} network{scanNets.length !== 1 ? "s" : ""}:
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto auto auto auto 1fr",
                gap: "0.25rem 0.75rem",
                fontSize: "0.7rem",
              }}
            >
              <span style={{ color: "#0a6a0a" }}>CH</span>
              <span style={{ color: "#0a6a0a" }}>RSSI</span>
              <span style={{ color: "#0a6a0a" }}>ENC</span>
              <span style={{ color: "#0a6a0a" }}>MAC</span>
              <span style={{ color: "#0a6a0a" }}>SSID</span>
              {scanNets.map((n, i) => (
                <>
                  <span key={`ch${i}`}>{n.ch}</span>
                  <span key={`rssi${i}`} style={{ color: n.rssi < -75 ? "#ff0041" : "#00cc33" }}>
                    {n.rssi} dBm
                  </span>
                  <span key={`enc${i}`}>{n.enc}</span>
                  <span key={`mac${i}`}>{n.mac}</span>
                  <span key={`ssid${i}`}>{n.ssid}</span>
                </>
              ))}
            </div>
          </div>
        )}
        {scanning && <div style={{ color: "#0a7a0a" }}>Scanning...</div>}

        {/* Input line */}
        {!hacking && (
          <div style={{ display: "flex", alignItems: "center", marginTop: "0.25rem" }}>
            <span style={{ color: "#00ff41" }}>$&nbsp;</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  execute(input);
                  if (input.trim()) {
                    setHistory((h) => [...h, input]);
                    setHistoryIdx(-1);
                  }
                  setInput("");
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  if (history.length > 0) {
                    const newIdx = historyIdx < history.length - 1 ? historyIdx + 1 : historyIdx;
                    setHistoryIdx(newIdx);
                    setInput(history[history.length - 1 - newIdx] || "");
                  }
                } else if (e.key === "ArrowDown") {
                  e.preventDefault();
                  if (historyIdx > 0) {
                    const newIdx = historyIdx - 1;
                    setHistoryIdx(newIdx);
                    setInput(history[history.length - 1 - newIdx] || "");
                  } else {
                    setHistoryIdx(-1);
                    setInput("");
                  }
                }
              }}
              style={{
                background: "transparent",
                border: "none",
                color: "#00ff41",
                fontFamily: "monospace",
                fontSize: "0.75rem",
                outline: "none",
                flex: 1,
                caretColor: "#00ff41",
              }}
              autoFocus
            />
          </div>
        )}
        {hacking && (
          <div style={{ display: "flex", alignItems: "center", marginTop: "0.25rem" }}>
            <span style={{ color: "#ff0041" }}>#&nbsp;</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (e.target.value.length > 0) {
                  execute("");
                }
              }}
              style={{
                background: "transparent",
                border: "none",
                color: "#ff0041",
                fontFamily: "monospace",
                fontSize: "0.75rem",
                outline: "none",
                flex: 1,
                caretColor: "#ff0041",
              }}
              autoFocus
            />
          </div>
        )}
      </div>
    </div>
  );
}
