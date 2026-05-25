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

// ── EN / KH translations ──
const T = {
  en: {
    tagline: "Close the world, Open the nExt",
    bio: "Electronic Engineering student by day, tinkerer in the Wired by night. Year 3 at Puok General & Technical High School, Siem Reap. Building things that blink, beep, and occasionally catch fire. Armed with an ESP32, a soldering iron, too much coffee, and a deep distrust of closed-source firmware.",
    statusTitle: "LAYER:01 — shell — 80×24",
    statusWhoami: "Vk — electronic engineering, year 3",
    statusUname: "Debian 13 trixie · Celeron N4000 · 7.6GB · oh-my-zsh",
    statusUptime: "since 2004 · Siem Reap, Cambodia · ☕ cups: ∞",
    nrfboxTitle: "▸ NRFBOX — WiFi Deauth-Jammer",
    nrfboxDesc: "Handheld wireless security tool. ESP32-WROOM-32U brain, NRF24L01+PA+LNA radio module for 2.4GHz, 0.96\" SSD1306 OLED display, NeoPixel RGB status ring, custom PCB. Battery-powered, pocket-sized. Scans networks, sends deauth frames, all from a custom menu-driven interface. My final year project.",
    projectsTitle: "▸ Projects",
    skillsTitle: "▸ Skills",
    toolsTitle: "▸ Tools",
    currentlyTitle: "▸ Currently",
    currentlyItems: [
      "NRFBOX v0.3 — refining PCB layout and battery optimization",
      "Learning Python deep dive — OOP, async, networking",
      "Working toward publishing my first open-source tool",
      "Exploring Next.js, GSAP & the Wired",
    ],
    poweredBy: "Powered by caffeine",
    craftedIn: "Crafted in vim · Debian 13",
    allBugs: "All bugs reserved",
    builtWith: "Built with Next.js · GSAP · Static export on GitHub Pages",
    wiredPhrase1: "And you don't seem to understand...",
    wiredPhrase2: "Let's all love Lain",
    hint: "press 1-5 to navigate",
    toastConnected: "connected to the Wired",
    toastWelcome: "welcome back, Vk",
  },
  kh: {
    tagline: "បិទពិភពលោក បើក nExt",
    bio: "និស្សិតវិស្វកម្មអេឡិចត្រូនិកពេលថ្ងៃ អ្នកជួសជុលពេលយប់។ ឆ្នាំទី៣ នៅវិទ្យាល័យចំណេះទូទៅ និងបច្ចេកទេសពួក សៀមរាប។ សាងសង់របស់ដែលភ្លឹបភ្លែត ប៊ីប និងពេលខ្លះឆេះ។ បំពាក់ដោយ ESP32 ដែកផ្សារ កាហ្វេច្រើនពេក និងការមិនទុកចិត្តលើកម្មវិធីបិទប្រភព។",
    statusTitle: "LAYER:01 — shell — 80×24",
    statusWhoami: "Vk — វិស្វកម្មអេឡិចត្រូនិក ឆ្នាំទី៣",
    statusUname: "Debian 13 trixie · Celeron N4000 · 7.6GB · oh-my-zsh",
    statusUptime: "តាំងពី 2004 · សៀមរាប កម្ពុជា · ☕ កែវ: ∞",
    nrfboxTitle: "▸ NRFBOX — WiFi Deauth-Jammer",
    nrfboxDesc: "ឧបករណ៍សុវត្ថិភាពឥតខ្សែចល័ត។ ខួរក្បាល ESP32-WROOM-32U ម៉ូឌុលវិទ្យុ NRF24L01+PA+LNA សម្រាប់ 2.4GHz អេក្រង់ 0.96\" SSD1306 OLED ក្រវ៉ាត់ស្ថានភាព NeoPixel RGB PCB ផ្ទាល់ខ្លួន។ ដំណើរការដោយថ្ម ទំហំហោប៉ៅ។ ស្កេនបណ្តាញ ផ្ញើ deauth frames ទាំងអស់ពីចំណុចប្រទាក់ម៉ឺនុយផ្ទាល់ខ្លួន។ គម្រោងឆ្នាំចុងក្រោយរបស់ខ្ញុំ។",
    projectsTitle: "▸ គម្រោង",
    skillsTitle: "▸ ជំនាញ",
    toolsTitle: "▸ ឧបករណ៍",
    currentlyTitle: "▸ បច្ចុប្បន្ន",
    currentlyItems: [
      "NRFBOX v0.3 — កែលម្អប្លង់ PCB និងបង្កើនប្រសិទ្ធភាពថ្ម",
      "រៀន Python ស៊ីជម្រៅ — OOP, async, networking",
      "កំពុងធ្វើការដើម្បីបោះពុម្ពឧបករណ៍ប្រភពបើកចំហដំបូងរបស់ខ្ញុំ",
      "ស្វែងយល់ Next.js, GSAP និង Wired",
    ],
    poweredBy: "ដំណើរការដោយកាហ្វេអ៊ីន",
    craftedIn: "បង្កើតក្នុង vim · Debian 13",
    allBugs: "រក្សាសិទ្ធិគ្រប់កំហុស",
    builtWith: "បង្កើតដោយ Next.js · GSAP · Static export លើ GitHub Pages",
    wiredPhrase1: "ហើយអ្នកហាក់ដូចជាមិនយល់...",
    wiredPhrase2: "តោះយើងទាំងអស់គ្នាស្រឡាញ់ Lain",
    hint: "ចុច 1-5 ដើម្បីរុករក",
    toastConnected: "បានភ្ជាប់ទៅ Wired",
    toastWelcome: "សូមស្វាគមន៍មកកាន់ Vk",
  },
};

const PROJECTS = [
  { title: "Portfolio Site", desc: "This site. Next.js static export on GitHub Pages. Cyberpunk x Serial Experiments Lain, GSAP animations.", tags: ["Next.js", "TypeScript", "GSAP"] },
  { title: "Discord RPG Bot", desc: "Custom RPG bot — leveling, inventory, turn-based battles, quests, crafting, PvP. discord.py + SQLite on Raspberry Pi.", tags: ["Python", "discord.py", "SQLite"] },
  { title: "Crypto Dashboard", desc: "Real-time price tracker aggregating Binance, CoinGecko, Kraken. CLI-first with Telegram alerts.", tags: ["Python", "REST APIs", "CLI"] },
  { title: "Android Modding Toolkit", desc: "Shell scripts: one-shot debloater, ADB-over-TCP, Magisk module manager, build.prop tweaks, scrcpy wireless.", tags: ["Shell", "ADB", "Android"] },
  { title: "USB DAC Audiophile Tuning", desc: "PulseAudio + ALSA config for CX31993+97220HIFI. Bit-perfect s32le 384kHz playback on Debian.", tags: ["ALSA", "PulseAudio", "Linux Audio"] },
  { title: "NRFBOX v0.3 (WIP)", desc: "Current focus — refining PCB layout, optimizing power draw, extending battery life.", tags: ["KiCad", "ESP-IDF", "Low Power"] },
];

const SKILLS = [
  { name: "Embedded Systems", pct: 85, ctx: "ESP32, Arduino, NRF24L01, low-level" },
  { name: "Shell Scripting", pct: 80, ctx: "bash, zsh, automation, ADB" },
  { name: "Python", pct: 65, ctx: "Flask, discord.py, data, tooling" },
  { name: "C/C++", pct: 60, ctx: "ESP-IDF, Arduino, firmware" },
  { name: "PCB Design", pct: 50, ctx: "KiCad, schematics, routing" },
  { name: "Linux Admin", pct: 75, ctx: "Debian, PulseAudio, system tuning" },
];

const TOOLS = ["Debian", "vim+tmux", "zsh", "Python", "ESP-IDF", "KiCad", "ADB/scrcpy", "PulseAudio"];

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

  useEffect(() => {
    setStarted(true);
  }, []);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    setDisplayed("");
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
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
┌─────────────────────────────┐
│ ✓ ${t.toastConnected.padEnd(26)} │
│   ${t.toastWelcome.padEnd(26)}   │
└─────────────────────────────┘`}</pre>
    </div>
  );
}

// ── Khmer Toggle ──
function LangToggle({ lang, setLang }: { lang: "en" | "kh"; setLang: (l: "en" | "kh") => void }) {
  return (
    <button
      onClick={() => setLang(lang === "en" ? "kh" : "en")}
      className="lang-toggle"
      title={lang === "en" ? "ប្តូរជាភាសាខ្មែរ" : "Switch to English"}
    >
      [{lang === "en" ? "EN | ខ្មែរ" : "ខ្មែរ | EN"}]
    </button>
  );
}

// ── Favicon Animation ──
function AnimatedFavicon() {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let angle = 0;
    const link = document.querySelector<HTMLLinkElement>("link[rel*='icon']") ||
      (() => { const l = document.createElement("link"); l.rel = "icon"; document.head.appendChild(l); return l; })();

    const draw = () => {
      ctx.clearRect(0, 0, 32, 32);
      ctx.save();
      ctx.translate(16, 16);
      ctx.rotate(angle);
      ctx.translate(-16, -16);

      // Cicada
      ctx.strokeStyle = "#3366cc";
      ctx.lineWidth = 0.8;
      // Wings
      ctx.beginPath();
      ctx.ellipse(9, 14, 10, 7, -0.15, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(23, 14, 10, 7, 0.15, 0, Math.PI * 2);
      ctx.stroke();
      // Body
      ctx.beginPath();
      ctx.ellipse(16, 16, 5, 9, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "#cc3333";
      ctx.stroke();
      // Head
      ctx.beginPath();
      ctx.ellipse(16, 8, 4, 3, 0, 0, Math.PI * 2);
      ctx.stroke();
      // Eyes
      ctx.fillStyle = "#ff4444";
      ctx.beginPath();
      ctx.arc(14, 7, 1, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(18, 7, 1, 0, Math.PI * 2);
      ctx.fill();

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
  text: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
}) {
  return (
    <Tag className={`glitch ${className}`} data-text={text}>
      {text}
    </Tag>
  );
}

// ── ASCII Divider ──
function AsciiDivider() {
  return <div className="section-wire" />;
}

// ── Tab Content: Status Card ──
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

// ── Tab Content: NRFBOX + Projects ──
function ProjectsSection({ t }: { t: typeof T.en }) {
  return (
    <>
      <section>
        <h2>{t.nrfboxTitle}</h2>
        <p style={{ fontSize: "0.82rem", color: "var(--text-dim)", marginBottom: "0.75rem", lineHeight: 1.7 }}>
          {t.nrfboxDesc}
        </p>
        <div>
          {["ESP32", "NRF24L01", "C/C++", "RF", "PCB Design", "OLED"].map((tag) => (
            <span key={tag} className="tag-nr">{tag}</span>
          ))}
        </div>
      </section>
      <AsciiDivider />
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
    </>
  );
}

// ── Tab Content: Skills + Tools ──
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

// ── Tab Content: Now ──
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
  const [quoteIdx] = useState(() => Math.floor(Math.random() * LAIN_QUOTES.length));
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
        // Check localStorage for boot skip
        const visited = localStorage.getItem("vk_booted");
        if (!visited) {
          setPhase("boot");
          // Play audio during boot
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

  // ── Boot Complete Handler ──
  const handleBootDone = useCallback(() => {
    localStorage.setItem("vk_booted", "true");
    setPhase("site");
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  }, []);

  // ── Tab change handler (dispatches event for QuoteBanner) ──
  const switchTab = useCallback((tab: Tab) => {
    setActiveTab(tab);
    window.dispatchEvent(new CustomEvent("vk-tab-change"));
  }, []);

  // ── Keyboard Navigation ──
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const num = parseInt(e.key);
      if (num >= 1 && num <= TABS.length) {
        switchTab(TABS[num - 1]);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [switchTab]);

  // ── Tab content animation ──
  useEffect(() => {
    if (phase !== "site") return;
    const content = document.getElementById("tab-content");
    if (!content) return;
    gsap.fromTo(content, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" });
  }, [activeTab, phase]);

  // ── Skill bars animation ──
  useEffect(() => {
    if (phase !== "site" || activeTab !== "Skills") return;
    const bars = document.querySelectorAll(".bar-fill");
    bars.forEach((bar) => {
      const target = (bar as HTMLElement).style.width;
      (bar as HTMLElement).style.width = "0%";
      setTimeout(() => {
        gsap.to(bar, { width: target, duration: 1.2, ease: "power2.out" });
      }, 100);
    });
  }, [activeTab, phase]);

  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* ── Animated Favicon ── */}
      <AnimatedFavicon />

      {/* ── Intro Overlay ── */}
      <div ref={overlayRef} className="intro-overlay">
        <CicadaLogo />
        <span ref={line1Ref} className="intro-line" style={{ marginTop: "1rem" }}>
          PRESENT DAY
        </span>
        <span ref={line2Ref} className="intro-line" style={{ marginTop: "0.75rem" }}>
          PRESENT TIME
        </span>
        <span
          ref={line3Ref}
          className="intro-line"
          style={{ marginTop: "1.5rem", color: "#cc3333", fontSize: "clamp(1rem, 2.5vw, 1.5rem)" }}
        >
          HAHAHAHAHA
        </span>
      </div>

      {/* ── Boot Sequence (first visit only) ── */}
      {phase === "boot" && <BootSequence onDone={handleBootDone} />}

      {/* ── Main Content ── */}
      <main ref={mainRef} style={{ opacity: phase === "site" ? 1 : 0, transition: "opacity 0.5s" }}>
        {/* Header */}
        <header>
          <PowerLines />
          <p className="tagline">{t.tagline}</p>
          <GlitchText text="Vk" as="h1" className="glitch-text" />
          <p className="bio">
            <TypewriterText text={t.bio} speed={15} />
          </p>
          <div className="header-links">
            <a href="https://github.com/cantwin-ctrl">GitHub</a>
            <a href="https://kh.linkedin.com/in/eng-vicheka-27150b410">LinkedIn</a>
            <a href="https://t.me/Callme_vexshell">Telegram</a>
            <a href="https://t.me/OmenAndroid">Channel</a>
            <a href="mailto:rtmny078@gmail.com">Email</a>
          </div>
        </header>

        <div className="wired-phrase">{t.wiredPhrase1}</div>

        {/* ── Top Navigation Bar ── */}
        <nav className="top-nav">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              className={`nav-tab ${activeTab === tab ? "nav-tab-active" : ""}`}
              onClick={() => switchTab(tab)}
            >
              [{' '}{tab}{' '}]
            </button>
          ))}
        </nav>

        {/* ── Quote Banner ── */}
        <div className="wired-phrase" style={{ margin: "0.5rem 0 1.5rem", opacity: 0.5 }}>
          <QuoteBanner />
        </div>

        {/* ── Tab Content ── */}
        <div id="tab-content" style={{ minHeight: 400 }}>
          {activeTab === "Welcome" && (
            <>
              <StatusCard t={t} />
              <AsciiDivider />
              <section>
                <h2>▸ NRFBOX — WiFi Deauth-Jammer</h2>
                <p style={{ fontSize: "0.82rem", color: "var(--text-dim)", marginBottom: "0.75rem", lineHeight: 1.7 }}>
                  {t.nrfboxDesc}
                </p>
                <div>
                  {["ESP32", "NRF24L01", "C/C++", "RF", "PCB Design", "OLED"].map((tag) => (
                    <span key={tag} className="tag-nr">{tag}</span>
                  ))}
                </div>
              </section>
            </>
          )}
          {activeTab === "Projects" && <ProjectsSection t={t} />}
          {activeTab === "Skills" && <SkillsSection t={t} />}
          {activeTab === "Now" && <NowSection t={t} />}
          {activeTab === "Contact" && <ContactForm t={t} />}
        </div>

        <div className="wired-phrase" style={{ marginTop: "2rem" }}>
          {t.wiredPhrase2}
        </div>

        {/* ── Footer ── */}
        <footer>
          <pre>
{`┌─────────────────────────────────────┐
│  ${t.poweredBy.padEnd(34)}│
│  ${t.craftedIn.padEnd(34)}│
│  ${t.allBugs.padEnd(34)}│
│  web-version "${GIT_HASH}"          │
│  © ${currentYear} Vk · Siem Reap, KH       │
└─────────────────────────────────────┘`}
          </pre>
          <p>{t.builtWith}</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "0.5rem" }}>
            <a href="https://github.com/cantwin-ctrl">GitHub</a>
            <a href="https://t.me/OmenAndroid">Channel</a>
            <a href="https://t.me/Callme_vexshell">Telegram</a>
            <a href="https://github.com/cantwin-ctrl/next-portfolio">Source</a>
          </div>
        </footer>

        {/* ── Corner UI ── */}
        <div className="hint-bar">// {t.hint}</div>

        <LangToggle lang={lang} setLang={setLang} />
        <LainAudio />
        <Terminal />
        <ThemeToggle />
        <LayerToggle />
      </main>

      {/* ── Toast ── */}
      <Toast visible={toastVisible} t={t} />

      <Effects />
    </>
  );
}
