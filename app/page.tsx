"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import Terminal from "./Terminal";
import ThemeToggle from "./ThemeToggle";
import Effects from "./Effects";
import NowPlaying from "./NowPlaying";
import LayerToggle from "./LayerToggle";
import CicadaLogo from "./CicadaLogo";
import BootSequence from "./BootSequence";
import LainAudio from "./LainAudio";
import ContactForm from "./ContactForm";
import QuoteBanner from "./QuoteBanner";

// ── Constants ──
const GIT_HASH = "eed3720";
const TABS = ["Welcome", "Projects", "Skills", "Now", "Contact"] as const;
type Tab = (typeof TABS)[number];

// ── EN / KH translations ──
const T = {
  en: {
    tagline: "Close the world, Open the nExt",
    bio: "Electronic Engineering student by day, tinkerer in the Wired by night. Year 3 at Puok General & Technical High School, Siem Reap. I build things that blink, beep, and occasionally catch fire — RF tools, embedded firmware, Linux automation, and whatever else keeps me up at 3 AM. Armed with an ESP32, a soldering iron, too much coffee, and a deep distrust of closed-source firmware. Currently obsessed with wireless security, low-level C, and making Debian do things it probably wasn't meant to.",
    statusTitle: "LAYER:01 — shell — 80×24",
    statusWhoami: "Vk — electronic engineering, year 3",
    statusUname: "Debian 13 trixie · Celeron N4000 · 7.6GB · oh-my-zsh",
    statusUptime: "since 2004 · Siem Reap, Cambodia · ☕ cups: ∞",
    aboutTitle: "▸ // whois vk",
    aboutLines: [
      "I'm a third-year Electronic Engineering student in Siem Reap, Cambodia — a rural kid with a laptop, a USB DAC, and an obsession with how things work at the lowest level.",
      "I don't just use tools. I take them apart, mod them, and build my own. From rooted Android devices to ESP32-based RF tools, if it runs code, I want to understand it — and probably break it once or twice along the way.",
      "My final year project is the NRFBOX — a handheld WiFi deauth-jammer that combines embedded C, RF engineering, PCB design, and custom firmware into one pocket-sized tool. It's my answer to 'what if a flipper zero, but DIY?'",
      "I run Debian 13 on a Celeron N4000 with 7.6GB of RAM. No GPU, no RGB, no excuses. I write in vim+tmux, live in zsh, and my USB DAC is tuned to bit-perfect 384kHz because why not. My internet comes through a phone's USB tether — rural Cambodia doesn't do fiber.",
      "When I'm not neck-deep in firmware or shell scripts, I'm learning Python properly — OOP, async, networking — and exploring what makes the web tick. This site is part of that exploration.",
    ],
    setupTitle: "▸ // uname -a",
    setupItems: [
      { label: "CPU", value: "Intel Celeron N4000 @ 1.1GHz (2C/2T)" },
      { label: "RAM", value: "7.6GB DDR4" },
      { label: "GPU", value: "Intel UHD Graphics 600" },
      { label: "OS", value: "Debian 13 trixie · Linux 6.12" },
      { label: "Shell", value: "zsh + oh-my-zsh + powerlevel10k" },
      { label: "Editor", value: "vim + tmux (yes, I exit vim just fine)" },
      { label: "Audio", value: "CX31993+97220HIFI USB DAC · s32le 384kHz" },
      { label: "Internet", value: "USB tether via vivo phone (rural setup)" },
    ],
    philosophyTitle: "▸ // .ethos",
    philosophyLines: [
      "> Open source isn't a preference — it's a principle.",
      "> If it's locked down, I want to unlock it.",
      "> Good tools are built, not bought.",
      "> Constraints breed creativity. My hardware proves it.",
      "> The Wired is everywhere. Stay connected.",
    ],
    nrfboxTitle: "▸ NRFBOX — WiFi Deauth-Jammer",
    nrfboxDesc: "My final year project. A fully custom, battery-powered handheld wireless security tool built from the ground up. ESP32-WROOM-32U brain driving an NRF24L01+PA+LNA radio module for 2.4GHz operations. Features a 0.96-inch SSD1306 OLED for real-time network display, a NeoPixel RGB ring for visual status feedback, and a custom-designed PCB — all packed into a pocketable form factor. Scans WiFi networks, displays AP details, and sends deauth frames — controlled entirely through a custom menu-driven interface on the OLED. Built in C/C++ using ESP-IDF.",
    nrfboxSpecs: [
      { label: "MCU", value: "ESP32-WROOM-32U (Xtensa LX6 dual-core)" },
      { label: "Radio", value: "NRF24L01+PA+LNA (2.4GHz, +22dBm)" },
      { label: "Display", value: "0.96\" SSD1306 OLED (128×64, I²C)" },
      { label: "Feedback", value: "NeoPixel WS2812B RGB ring (12 LEDs)" },
      { label: "Power", value: "18650 Li-ion · TP4056 charger · 3.3V LDO reg" },
      { label: "PCB", value: "Custom 2-layer · KiCad · 50×80mm" },
      { label: "Firmware", value: "C/C++ · ESP-IDF v5 · PlatformIO" },
      { label: "Version", value: "v0.3 — PCB refinement & battery optimization" },
    ],
    projectsTitle: "▸ Projects",
    skillsTitle: "▸ Skills",
    toolsTitle: "▸ Tools & Daily Drivers",
    currentlyTitle: "▸ Currently",
    currentlyItems: [
      "NRFBOX v0.3 — finalizing PCB trace routing, testing power profiles, shaving milliamps",
      "Python deep dive — async/await, socket programming, building real tools not just scripts",
      "Publishing my first open-source tool — the Android debloater script, polished and documented",
      "Exploring the web stack — Next.js, TypeScript, GSAP — understanding how the modern web works",
      "Reading: The C Programming Language (K&R), TCP/IP Illustrated, and whatever PDFs I can find",
    ],
    poweredBy: "Powered by caffeine & late nights",
    craftedIn: "Crafted in vim · Debian 13 trixie",
    allBugs: "All bugs are features in disguise",
    builtWith: "Built with Next.js 16 · GSAP 3 · TypeScript · Static export on GitHub Pages",
    wiredPhrase1: "And you don't seem to understand...",
    wiredPhrase2: "Let's all love Lain",
    hint: "[ hint: press 1-5 to navigate ]",
    toastConnected: "connected to the Wired",
    toastWelcome: "welcome back, Vk",
  },
  kh: {
    tagline: "បិទពិភពលោក បើក nExt",
    bio: "និស្សិតវិស្វកម្មអេឡិចត្រូនិកពេលថ្ងៃ អ្នកជួសជុលពេលយប់។ ឆ្នាំទី៣ នៅវិទ្យាល័យចំណេះទូទៅ និងបច្ចេកទេសពួក សៀមរាប។ ខ្ញុំសាងសង់របស់ដែលភ្លឹបភ្លែត ប៊ីប និងពេលខ្លះឆេះ — ឧបករណ៍ RF, firmware បង្កប់, ស្វ័យប្រវត្តិកម្ម Linux និងអ្វីផ្សេងទៀតដែលធ្វើឲ្យខ្ញុំភ្ញាក់ដល់ម៉ោង ៣ ព្រឹក។ បំពាក់ដោយ ESP32 ដែកផ្សារ កាហ្វេច្រើនពេក និងការមិនទុកចិត្តលើកម្មវិធីបិទប្រភព។",
    statusTitle: "LAYER:01 — shell — 80×24",
    statusWhoami: "Vk — វិស្វកម្មអេឡិចត្រូនិក ឆ្នាំទី៣",
    statusUname: "Debian 13 trixie · Celeron N4000 · 7.6GB · oh-my-zsh",
    statusUptime: "តាំងពី 2004 · សៀមរាប កម្ពុជា · ☕ កែវ: ∞",
    aboutTitle: "▸ // whois vk",
    aboutLines: [
      "ខ្ញុំជានិស្សិតវិស្វកម្មអេឡិចត្រូនិកឆ្នាំទី៣ នៅសៀមរាប កម្ពុជា — ក្មេងជនបទដែលមានកុំព្យូទ័រយួរដៃ និងចំណង់ចំណូលចិត្តលើរបៀបដែលអ្វីៗដំណើរការនៅកម្រិតទាបបំផុត។",
      "ខ្ញុំមិនគ្រាន់តែប្រើឧបករណ៍ទេ។ ខ្ញុំបំបែកវា កែប្រែវា និងសាងសង់ដោយខ្លួនឯង។ ពីឧបករណ៍ Android ដែលបាន root ទៅឧបករណ៍ RF ដែលមានមូលដ្ឋាន ESP32 — បើវាដំណើរការកូដ ខ្ញុំចង់យល់ពីវា។",
      "គម្រោងឆ្នាំចុងក្រោយរបស់ខ្ញុំគឺ NRFBOX — ឧបករណ៍ WiFi deauth-jammer ចល័តដែលរួមបញ្ចូល C បង្កប់ វិស្វកម្ម RF ការរចនា PCB និង firmware ផ្ទាល់ខ្លួន។",
      "ខ្ញុំប្រើ Debian 13 នៅលើ Celeron N4000 ដែលមាន RAM 7.6GB។ គ្មាន GPU គ្មាន RGB គ្មានលេស។ ខ្ញុំសរសេរក្នុង vim+tmux ហើយ USB DAC របស់ខ្ញុំត្រូវបានកែសម្រួលដល់ 384kHz។ អ៊ីនធឺណិតរបស់ខ្ញុំមកតាម USB tether ពីទូរស័ព្ទ — ជនបទកម្ពុជាមិនមានខ្សែ fiber ទេ។",
      "ពេលដែលខ្ញុំមិនកំពុងធ្វើការលើ firmware ឬ shell scripts ខ្ញុំកំពុងរៀន Python ឲ្យបានត្រឹមត្រូវ — OOP, async, networking — និងស្វែងយល់ពីរបៀបដែលវេបដំណើរការ។",
    ],
    setupTitle: "▸ // uname -a",
    setupItems: [
      { label: "CPU", value: "Intel Celeron N4000 @ 1.1GHz (2C/2T)" },
      { label: "RAM", value: "7.6GB DDR4" },
      { label: "GPU", value: "Intel UHD Graphics 600" },
      { label: "OS", value: "Debian 13 trixie · Linux 6.12" },
      { label: "Shell", value: "zsh + oh-my-zsh + powerlevel10k" },
      { label: "Editor", value: "vim + tmux (បាទ ខ្ញុំចេញពី vim បាន)" },
      { label: "Audio", value: "CX31993+97220HIFI USB DAC · s32le 384kHz" },
      { label: "Internet", value: "USB tether តាមទូរស័ព្ទ vivo (ការរៀបចំជនបទ)" },
    ],
    philosophyTitle: "▸ // .ethos",
    philosophyLines: [
      "> ប្រភពបើកចំហមិនមែនជាចំណូលចិត្តទេ — វាជាគោលការណ៍។",
      "> បើវាត្រូវបានចាក់សោ ខ្ញុំចង់ដោះសោវា។",
      "> ឧបករណ៍ល្អត្រូវបានសាងសង់ មិនមែនទិញទេ។",
      "> ការកំណត់បង្កើតភាពច្នៃប្រឌិត។ ហាដវែររបស់ខ្ញុំបញ្ជាក់វា។",
      "> Wired មាននៅគ្រប់ទីកន្លែង។ បន្តភ្ជាប់។",
    ],
    nrfboxTitle: "▸ NRFBOX — WiFi Deauth-Jammer",
    nrfboxDesc: "គម្រោងឆ្នាំចុងក្រោយរបស់ខ្ញុំ។ ឧបករណ៍សុវត្ថិភាពឥតខ្សែចល័តដែលបានសាងសង់ពីដើម។ ខួរក្បាល ESP32-WROOM-32U ម៉ូឌុលវិទ្យុ NRF24L01+PA+LNA សម្រាប់ 2.4GHz អេក្រង់ 0.96\" SSD1306 OLED សម្រាប់បង្ហាញបណ្តាញពេលវេលាជាក់ស្តែង ក្រវ៉ាត់ NeoPixel RGB សម្រាប់មតិស្ថានភាព និង PCB រចនាផ្ទាល់ខ្លួន។ ស្កេនបណ្តាញ WiFi បង្ហាញព័ត៌មាន AP និងផ្ញើ deauth frames — គ្រប់គ្រងតាមចំណុចប្រទាក់ម៉ឺនុយនៅលើ OLED។ សាងសង់ក្នុង C/C++ ដោយប្រើ ESP-IDF។",
    nrfboxSpecs: [
      { label: "MCU", value: "ESP32-WROOM-32U (Xtensa LX6 dual-core)" },
      { label: "Radio", value: "NRF24L01+PA+LNA (2.4GHz, +22dBm)" },
      { label: "Display", value: "0.96\" SSD1306 OLED (128×64, I²C)" },
      { label: "Feedback", value: "NeoPixel WS2812B RGB ring (12 LEDs)" },
      { label: "Power", value: "18650 Li-ion · TP4056 charger · 3.3V LDO reg" },
      { label: "PCB", value: "Custom 2-layer · KiCad · 50×80mm" },
      { label: "Firmware", value: "C/C++ · ESP-IDF v5 · PlatformIO" },
      { label: "Version", value: "v0.3 — PCB refinement & battery optimization" },
    ],
    projectsTitle: "▸ គម្រោង",
    skillsTitle: "▸ ជំនាញ",
    toolsTitle: "▸ ឧបករណ៍",
    currentlyTitle: "▸ បច្ចុប្បន្ន",
    currentlyItems: [
      "NRFBOX v0.3 — កែលម្អប្លង់ PCB សាកល្បងទម្រង់ថាមពល",
      "Python deep dive — async/await, socket programming",
      "បោះពុម្ពឧបករណ៍ប្រភពបើកចំហដំបូង — Android debloater script",
      "ស្វែងយល់ web stack — Next.js, TypeScript, GSAP",
      "អាន: The C Programming Language (K&R), TCP/IP Illustrated",
    ],
    poweredBy: "ដំណើរការដោយកាហ្វេអ៊ីន",
    craftedIn: "បង្កើតក្នុង vim · Debian 13 trixie",
    allBugs: "កំហុសទាំងអស់គឺជាលក្ខណៈពិសេស",
    builtWith: "បង្កើតដោយ Next.js 16 · GSAP 3 · TypeScript · Static export លើ GitHub Pages",
    wiredPhrase1: "ហើយអ្នកហាក់ដូចជាមិនយល់...",
    wiredPhrase2: "តោះយើងទាំងអស់គ្នាស្រឡាញ់ Lain",
    hint: "[ hint: press 1-5 to navigate ]",
    toastConnected: "connected to the Wired",
    toastWelcome: "welcome back, Vk",
  },
};

// ── Enriched Project Cards ──
const PROJECTS = [
  {
    title: "Portfolio Site",
    desc: "This site. Built from scratch with Next.js 16 + TypeScript, static-exported to GitHub Pages. GSAP-driven animations throughout — intro sequence, tab transitions, boot screen. Dark cyberpunk theme with Serial Experiments Lain aesthetic. Features: draggable terminal emulator with NRFBOX scanner sim, Konami code easter eggs, CRTV effects, cicada favicon, Khmer/English toggle, keyboard navigation. A love letter to the Wired.",
    tags: ["Next.js", "TypeScript", "GSAP", "GitHub Pages"],
  },
  {
    title: "Discord RPG Bot",
    desc: "Full-featured RPG experience on Discord — character creation with classes, leveling system with XP curves, turn-based combat engine, inventory management with item rarity tiers, quest system with branching dialogue, crafting system with recipes, PvP arena, dungeons with boss fights. Over 20 slash commands. Persistent SQLite database. Runs 24/7 on a Raspberry Pi 4. Built with discord.py and a lot of late nights.",
    tags: ["Python", "discord.py", "SQLite", "Raspberry Pi"],
  },
  {
    title: "Crypto Dashboard",
    desc: "Real-time cryptocurrency tracker pulling data from Binance, CoinGecko, and Kraken APIs simultaneously with automatic failover. CLI-first design with optional lightweight web UI. Features: customizable watchlists, price alerts via Telegram bot, portfolio P&L tracking, candlestick charts, volume analysis. Built because I was tired of switching between 5 tabs at 2 AM during volatile markets. Uses WebSockets for live price streams.",
    tags: ["Python", "REST APIs", "WebSocket", "Telegram Bot"],
  },
  {
    title: "Android Modding Toolkit",
    desc: "Battle-tested collection of shell scripts for rooted Android power users. Includes: one-shot system debloater (removes 80+ packages safely with confirmation), full app backup/restore with data preservation, ADB-over-TCP auto-enable on boot, Magisk module batch manager, build.prop editor with safety checks, and a wireless scrcpy launcher with quality presets. Saved my sanity through dozens of ROM flashes. Currently being polished for public release.",
    tags: ["Shell", "ADB", "Android", "Magisk"],
  },
  {
    title: "USB DAC Audiophile Tuning",
    desc: "Deep PulseAudio + ALSA configuration for the CX31993+97220HIFI USB DAC. Achieved true bit-perfect playback at s32le 384kHz by bypassing PulseAudio's resampler entirely, configuring direct ALSA hardware device access, and tuning buffer sizes (default-fragments, default-fragment-size-msec) to eliminate underruns. Also configured for DSD passthrough capability. Documented the entire process — it's both a config and a guide for anyone with this DAC on Linux.",
    tags: ["ALSA", "PulseAudio", "Linux Audio", "s32le"],
  },
  {
    title: "NRFBOX v0.3 (WIP)",
    desc: "The current iteration — refining the PCB in KiCad with proper ground planes and trace impedance matching for the 2.4GHz antenna. Optimizing power profiles: deep sleep at <100µA, active scanning at ~80mA. Testing different 18650 cells for runtime benchmarks. Writing cleaner firmware with proper FreeRTOS task management. Goal: 8+ hours of continuous scanning on a single 3000mAh cell. This is the version I'll present for my final defense.",
    tags: ["KiCad", "ESP-IDF", "FreeRTOS", "Low Power"],
  },
];

const SKILLS = [
  { name: "Embedded Systems", pct: 85, ctx: "ESP32 · Arduino · NRF24L01 · UART/SPI/I²C · FreeRTOS · sensor integration · low-power design" },
  { name: "Shell Scripting", pct: 80, ctx: "bash/zsh automation · ADB scripting · systemd units · cron · sed/awk · pipe mastery" },
  { name: "Python", pct: 65, ctx: "Flask web apps · discord.py bots · REST APIs · async/await · data processing · CLI tools" },
  { name: "C/C++", pct: 60, ctx: "ESP-IDF firmware · Arduino sketches · memory management · pointers · debugging with logs (no JTAG yet)" },
  { name: "PCB Design", pct: 50, ctx: "KiCad 7 · 2-layer routing · schematic capture · footprint creation · BOM management · learning impedance" },
  { name: "Linux Admin", pct: 75, ctx: "Debian daily driver · kernel tuning · PulseAudio/ALSA · networking · iptables · system hardening" },
];

const TOOLS = ["Debian 13", "vim+tmux", "zsh", "Python 3", "ESP-IDF v5", "KiCad 7", "ADB/scrcpy", "PulseAudio", "git", "ffmpeg", "gcc/g++", "PlatformIO"];

// ── Power Lines SVG ──
function PowerLines() {
  return (
    <div className="powerlines">
      <svg viewBox="0 0 800 140" preserveAspectRatio="none">
        <line x1="50" y1="140" x2="50" y2="60" stroke="#1e1e38" strokeWidth="2" />
        <line x1="250" y1="140" x2="250" y2="70" stroke="#1e1e38" strokeWidth="2" />
        <line x1="480" y1="140" x2="480" y2="55" stroke="#1e1e38" strokeWidth="2" />
        <line x1="700" y1="140" x2="700" y2="65" stroke="#1e1e38" strokeWidth="2" />
        <line x1="35" y1="80" x2="65" y2="80" stroke="#1e1e38" strokeWidth="1.5" />
        <line x1="235" y1="90" x2="265" y2="90" stroke="#1e1e38" strokeWidth="1.5" />
        <line x1="465" y1="75" x2="495" y2="75" stroke="#1e1e38" strokeWidth="1.5" />
        <line x1="685" y1="85" x2="715" y2="85" stroke="#1e1e38" strokeWidth="1.5" />
        <path d="M50 80 Q150 120 250 90" fill="none" stroke="#1e1e38" strokeWidth="1" />
        <path d="M250 90 Q365 130 480 75" fill="none" stroke="#1e1e38" strokeWidth="1" />
        <path d="M480 75 Q590 115 700 85" fill="none" stroke="#1e1e38" strokeWidth="1" />
        <path d="M50 80 Q150 135 250 90" fill="none" stroke="#15152e" strokeWidth="0.8" />
        <path d="M250 90 Q365 145 480 75" fill="none" stroke="#15152e" strokeWidth="0.8" />
        <path d="M480 75 Q590 130 700 85" fill="none" stroke="#15152e" strokeWidth="0.8" />
      </svg>
    </div>
  );
}

// ── Typewriter Text ──
function TypewriterText({ text, speed = 30 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => { setStarted(true); }, []);
  useEffect(() => {
    if (!started) return;
    let i = 0;
    setDisplayed("");
    const interval = setInterval(() => {
      if (i < text.length) { setDisplayed(text.slice(0, i + 1)); i++; }
      else clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, started]);

  return <span>{displayed}<span className="cursor-blink">▌</span></span>;
}

// ── Toast Notification ──
function Toast({ visible, t }: { visible: boolean; t: typeof T.en }) {
  if (!visible) return null;
  return (
    <div className="ascii-toast">
      <pre>{`
┌──────────────────────────────────┐
│  ✓ ${t.toastConnected.padEnd(31)}│
│    ${t.toastWelcome.padEnd(31)}  │
└──────────────────────────────────┘`}</pre>
    </div>
  );
}

// ── Khmer Toggle ──
function LangToggle({ lang, setLang }: { lang: "en" | "kh"; setLang: (l: "en" | "kh") => void }) {
  return (
    <button onClick={() => setLang(lang === "en" ? "kh" : "en")} className="lang-toggle" title={lang === "en" ? "ប្តូរជាភាសាខ្មែរ" : "Switch to English"}>
      [{lang === "en" ? "EN | ខ្មែរ" : "ខ្មែរ | EN"}]
    </button>
  );
}

// ── Animated Favicon ──
function AnimatedFavicon() {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 32; canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let angle = 0;
    const link = document.querySelector<HTMLLinkElement>("link[rel*='icon']") ||
      (() => { const l = document.createElement("link"); l.rel = "icon"; document.head.appendChild(l); return l; })();

    const draw = () => {
      ctx.clearRect(0, 0, 32, 32);
      ctx.save(); ctx.translate(16, 16); ctx.rotate(angle); ctx.translate(-16, -16);
      ctx.strokeStyle = "#3366cc"; ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.ellipse(9, 14, 10, 7, -0.15, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(23, 14, 10, 7, 0.15, 0, Math.PI * 2); ctx.stroke();
      ctx.strokeStyle = "#cc3333";
      ctx.beginPath(); ctx.ellipse(16, 16, 5, 9, 0, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(16, 8, 4, 3, 0, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = "#ff4444";
      ctx.beginPath(); ctx.arc(14, 7, 1, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(18, 7, 1, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
      angle += 0.02;
      link.href = canvas.toDataURL("image/png");
      requestAnimationFrame(draw);
    };
    draw();
  }, []);
  return null;
}

// ── Glitch Text ──
function GlitchText({ text, as: Tag = "span" as keyof React.JSX.IntrinsicElements, className = "" }: {
  text: string; as?: keyof React.JSX.IntrinsicElements; className?: string;
}) {
  return <Tag className={`glitch ${className}`} data-text={text}>{text}</Tag>;
}

// ── ASCII Divider ──
function AsciiDivider() {
  return <div className="section-wire" />;
}

// ── Status Card ──
function StatusCard({ t }: { t: typeof T.en }) {
  return (
    <section>
      <div className="box">
        <p className="box-title">{t.statusTitle}</p>
        <p><span className="prompt">wired://vk:~$</span> whoami</p>
        <p>{t.statusWhoami}</p>
        <p><span className="prompt">wired://vk:~$</span> uname -a</p>
        <p>{t.statusUname}</p>
        <p><span className="prompt">wired://vk:~$</span> uptime</p>
        <p>{t.statusUptime}</p>
      </div>
    </section>
  );
}

// ── About Section ──
function AboutSection({ t }: { t: typeof T.en }) {
  return (
    <section>
      <h2>{t.aboutTitle}</h2>
      <div className="box" style={{ lineHeight: 1.8, fontSize: "0.82rem" }}>
        {t.aboutLines.map((line, i) => (
          <p key={i} style={{ marginBottom: i < t.aboutLines.length - 1 ? "0.75rem" : 0, color: "var(--text-dim)" }}>
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}

// ── Setup Section ──
function SetupSection({ t }: { t: typeof T.en }) {
  return (
    <section>
      <h2>{t.setupTitle}</h2>
      <div className="box" style={{ fontSize: "0.78rem" }}>
        {t.setupItems.map((item, i) => (
          <p key={i} style={{ marginBottom: "0.35rem", display: "flex", gap: "0.75rem" }}>
            <span style={{ color: "var(--accent-blue)", minWidth: 80, fontWeight: "bold" }}>{item.label}:</span>
            <span style={{ color: "var(--text-dim)" }}>{item.value}</span>
          </p>
        ))}
      </div>
    </section>
  );
}

// ── Philosophy Section ──
function PhilosophySection({ t }: { t: typeof T.en }) {
  return (
    <section>
      <h2>{t.philosophyTitle}</h2>
      <div className="box" style={{ fontSize: "0.82rem", lineHeight: 1.9 }}>
        {t.philosophyLines.map((line, i) => (
          <p key={i} style={{ color: "var(--text)" }}>{line}</p>
        ))}
      </div>
    </section>
  );
}

// ── NRFBOX Spec Sheet ──
function NrfboxSpecs({ t }: { t: typeof T.en }) {
  return (
    <div className="box" style={{ marginTop: "0.75rem", fontSize: "0.72rem" }}>
      <p className="box-title">SPEC SHEET</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem 1rem" }}>
        {t.nrfboxSpecs.map((spec, i) => (
          <p key={i}>
            <span style={{ color: "var(--accent-blue)" }}>{spec.label}:</span>{" "}
            <span style={{ color: "var(--text-dim)" }}>{spec.value}</span>
          </p>
        ))}
      </div>
    </div>
  );
}

// ── NRFBOX Section ──
function NrfboxSection({ t }: { t: typeof T.en }) {
  return (
    <section>
      <h2>{t.nrfboxTitle}</h2>
      <p style={{ fontSize: "0.85rem", color: "var(--text-dim)", marginBottom: "0.75rem", lineHeight: 1.8 }}>
        {t.nrfboxDesc}
      </p>
      <div>
        {["ESP32", "NRF24L01", "C/C++", "RF", "PCB Design", "OLED", "FreeRTOS", "18650", "KiCad", "PlatformIO"].map((tag) => (
          <span key={tag} className="tag-nr">{tag}</span>
        ))}
      </div>
      <NrfboxSpecs t={t} />
    </section>
  );
}

// ── Projects Section ──
function ProjectsSection({ t }: { t: typeof T.en }) {
  return (
    <section>
      <h2>{t.projectsTitle}</h2>
      <div className="card-grid">
        {PROJECTS.map((project) => (
          <div key={project.title} className="card">
            <h3>{project.title}</h3>
            <p>{project.desc}</p>
            <div>
              {project.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Skills Section ──
function SkillsSection({ t }: { t: typeof T.en }) {
  return (
    <>
      <section>
        <h2>{t.skillsTitle}</h2>
        {SKILLS.map((skill) => (
          <div key={skill.name} className="skill-bar">
            <div className="label">
              <span>{skill.name}</span>
              <span className="pct">{skill.pct}%</span>
            </div>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: `${skill.pct}%` }} />
            </div>
            <p className="ctx">{skill.ctx}</p>
          </div>
        ))}
      </section>
      <AsciiDivider />
      <section>
        <h2>{t.toolsTitle}</h2>
        <div>
          {TOOLS.map((tool) => (
            <span key={tool} className="tool-chip">{tool}</span>
          ))}
        </div>
      </section>
    </>
  );
}

// ── Now Section ──
function NowSection({ t }: { t: typeof T.en }) {
  return (
    <>
      <div className="section-wire" />
      <NowPlaying />
      <section className="currently">
        <h2>{t.currentlyTitle}</h2>
        <ul>
          {t.currentlyItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>
    </>
  );
}

// ── Main Page ──
export default function Home() {
  const [phase, setPhase] = useState<"intro" | "boot" | "site">("intro");
  const [activeTab, setActiveTab] = useState<Tab>("Welcome");
  const [lang, setLang] = useState<"en" | "kh">("en");
  const [toastVisible, setToastVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const hasBooted = useRef(false);

  const t = T[lang];

  // ── Intro Animation ──
  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        const visited = localStorage.getItem("vk_booted");
        if (!visited) {
          setPhase("boot");
          const playAudio = (window as unknown as Record<string, unknown>).__playLainAudio as (() => void) | undefined;
          playAudio?.();
        } else {
          setPhase("site");
          if (!hasBooted.current) {
            hasBooted.current = true;
            setToastVisible(true);
            setTimeout(() => setToastVisible(false), 3000);
          }
        }
      },
    });

    const overlay = overlayRef.current;
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    const line3 = line3Ref.current;
    if (!overlay || !line1 || !line2 || !line3) return;

    tl.set(overlay, { opacity: 1 })
      .set([line1, line2, line3], { opacity: 0, y: 10 })
      .to(line1, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
      .to(line1, { opacity: 1, duration: 0.8 })
      .to(line2, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.2")
      .to(line2, { opacity: 1, duration: 0.7 })
      .to(overlay, { duration: 0.08, backgroundColor: "#fff", repeat: 3, yoyo: true, ease: "none" })
      .to(line3, { opacity: 0.9, y: 0, duration: 0.3, ease: "power2.out" })
      .to(line3, { opacity: 1, duration: 0.3 })
      .to([line1, line2, line3], { opacity: 0, y: -15, duration: 0.6, ease: "power3.in", stagger: 0.05 })
      .to(overlay, { backgroundColor: "#330000", duration: 0.15 })
      .to(overlay, { opacity: 0, duration: 0.8, ease: "power2.in" });

    return () => { tl.kill(); };
  }, []);

  const handleBootDone = useCallback(() => {
    localStorage.setItem("vk_booted", "true");
    setPhase("site");
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  }, []);

  const switchTab = useCallback((tab: Tab) => {
    setActiveTab(tab);
    window.dispatchEvent(new CustomEvent("vk-tab-change"));
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const num = parseInt(e.key);
      if (num >= 1 && num <= TABS.length) switchTab(TABS[num - 1]);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [switchTab]);

  useEffect(() => {
    if (phase !== "site") return;
    const content = document.getElementById("tab-content");
    if (!content) return;
    gsap.fromTo(content, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" });
  }, [activeTab, phase]);

  useEffect(() => {
    if (phase !== "site" || activeTab !== "Skills") return;
    const bars = document.querySelectorAll(".bar-fill");
    bars.forEach((bar) => {
      const target = (bar as HTMLElement).style.width;
      (bar as HTMLElement).style.width = "0%";
      setTimeout(() => { gsap.to(bar, { width: target, duration: 1.2, ease: "power2.out" }); }, 100);
    });
  }, [activeTab, phase]);

  const currentYear = new Date().getFullYear();

  return (
    <>
      <AnimatedFavicon />

      {/* ── Intro Overlay ── */}
      <div ref={overlayRef} className="intro-overlay">
        <CicadaLogo />
        <span ref={line1Ref} className="intro-line" style={{ marginTop: "1rem" }}>PRESENT DAY</span>
        <span ref={line2Ref} className="intro-line" style={{ marginTop: "0.75rem" }}>PRESENT TIME</span>
        <span ref={line3Ref} className="intro-line" style={{ marginTop: "1.5rem", color: "#cc3333", fontSize: "clamp(1rem, 2.5vw, 1.5rem)" }}>HAHAHAHAHA</span>
      </div>

      {phase === "boot" && <BootSequence onDone={handleBootDone} />}

      {/* ── Main Content ── */}
      <main ref={mainRef} style={{ opacity: phase === "site" ? 1 : 0, transition: "opacity 0.5s" }}>
        {/* Header */}
        <header>
          <PowerLines />
          <p className="tagline">{t.tagline}</p>
          <GlitchText text="Vk" as="h1" className="glitch-text" />
          <p className="bio"><TypewriterText text={t.bio} speed={12} /></p>
          <div className="header-links">
            <a href="https://github.com/cantwin-ctrl">GitHub</a>
            <a href="https://kh.linkedin.com/in/eng-vicheka-27150b410">LinkedIn</a>
            <a href="https://t.me/Callme_vexshell">Telegram</a>
            <a href="https://t.me/OmenAndroid">Channel</a>
            <a href="mailto:rtmny078@gmail.com">Email</a>
          </div>
        </header>

        <div className="wired-phrase">{t.wiredPhrase1}</div>

        {/* ── Top Navigation ── */}
        <nav className="top-nav">
          {TABS.map((tab) => (
            <button key={tab} className={`nav-tab ${activeTab === tab ? "nav-tab-active" : ""}`} onClick={() => switchTab(tab)}>
              [{' '}{tab}{' '}]
            </button>
          ))}
        </nav>

        <div className="wired-phrase" style={{ margin: "0.5rem 0 1.5rem", opacity: 0.5 }}>
          <QuoteBanner />
        </div>

        {/* ── Tab Content ── */}
        <div id="tab-content" style={{ minHeight: 400 }}>
          {activeTab === "Welcome" && (
            <>
              <StatusCard t={t} />
              <AsciiDivider />
              <AboutSection t={t} />
              <AsciiDivider />
              <SetupSection t={t} />
              <AsciiDivider />
              <PhilosophySection t={t} />
              <AsciiDivider />
              <NrfboxSection t={t} />
            </>
          )}
          {activeTab === "Projects" && <ProjectsSection t={t} />}
          {activeTab === "Skills" && <SkillsSection t={t} />}
          {activeTab === "Now" && <NowSection t={t} />}
          {activeTab === "Contact" && <ContactForm t={t} />}
        </div>

        <div className="wired-phrase" style={{ marginTop: "2rem" }}>{t.wiredPhrase2}</div>

        {/* ── Footer ── */}
        <footer>
          <pre>
{`┌───────────────────────────────────────┐
│  ${t.poweredBy.padEnd(37)}│
│  ${t.craftedIn.padEnd(37)}│
│  ${t.allBugs.padEnd(37)}│
│  web-version "${GIT_HASH}"              │
│  © ${currentYear} Vk · Siem Reap, KH         │
└───────────────────────────────────────┘`}
          </pre>
          <p>{t.builtWith}</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "0.5rem" }}>
            <a href="https://github.com/cantwin-ctrl">GitHub</a>
            <a href="https://t.me/OmenAndroid">Channel</a>
            <a href="https://t.me/Callme_vexshell">Telegram</a>
            <a href="https://github.com/cantwin-ctrl/next-portfolio">Source</a>
          </div>
        </footer>

        <div className="hint-bar">// {t.hint}</div>

        <LangToggle lang={lang} setLang={setLang} />
        <LainAudio />
        <Terminal />
        <ThemeToggle />
        <LayerToggle />
      </main>

      <Toast visible={toastVisible} t={t} />
      <Effects />
    </>
  );
}
