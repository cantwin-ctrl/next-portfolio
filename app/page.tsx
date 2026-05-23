"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Terminal from "./Terminal";
import ThemeToggle from "./ThemeToggle";

gsap.registerPlugin(ScrollTrigger);

// ── Power Lines SVG ──
function PowerLines() {
  return (
    <div className="powerlines">
      <svg viewBox="0 0 800 140" preserveAspectRatio="none">
        {/* Poles */}
        <line x1="50" y1="140" x2="50" y2="60" stroke="#1e1e38" strokeWidth="2" />
        <line x1="250" y1="140" x2="250" y2="70" stroke="#1e1e38" strokeWidth="2" />
        <line x1="480" y1="140" x2="480" y2="55" stroke="#1e1e38" strokeWidth="2" />
        <line x1="700" y1="140" x2="700" y2="65" stroke="#1e1e38" strokeWidth="2" />
        {/* Cross arms */}
        <line x1="35" y1="80" x2="65" y2="80" stroke="#1e1e38" strokeWidth="1.5" />
        <line x1="235" y1="90" x2="265" y2="90" stroke="#1e1e38" strokeWidth="1.5" />
        <line x1="465" y1="75" x2="495" y2="75" stroke="#1e1e38" strokeWidth="1.5" />
        <line x1="685" y1="85" x2="715" y2="85" stroke="#1e1e38" strokeWidth="1.5" />
        {/* Wires (catenary curves via quadratic beziers) */}
        <path d="M50 80 Q150 120 250 90" fill="none" stroke="#1e1e38" strokeWidth="1" />
        <path d="M250 90 Q365 130 480 75" fill="none" stroke="#1e1e38" strokeWidth="1" />
        <path d="M480 75 Q590 115 700 85" fill="none" stroke="#1e1e38" strokeWidth="1" />
        {/* Sagging second wire */}
        <path d="M50 80 Q150 135 250 90" fill="none" stroke="#15152e" strokeWidth="0.8" />
        <path d="M250 90 Q365 145 480 75" fill="none" stroke="#15152e" strokeWidth="0.8" />
        <path d="M480 75 Q590 130 700 85" fill="none" stroke="#15152e" strokeWidth="0.8" />
      </svg>
    </div>
  );
}

export default function Home() {
  const [introDone, setIntroDone] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  // ── Intro Sequence ──
  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setIntroDone(true),
    });

    // Ensure overlay and elements exist
    const overlay = overlayRef.current;
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    const line3 = line3Ref.current;

    if (!overlay || !line1 || !line2 || !line3) return;

    tl.set(overlay, { opacity: 1 })
      .set([line1, line2, line3], { opacity: 0, y: 10 })
      // "PRESENT DAY"
      .to(line1, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
      .to(line1, { opacity: 1, duration: 0.8 })
      // "PRESENT TIME"
      .to(line2, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.2")
      .to(line2, { opacity: 1, duration: 0.7 })
      // Static burst effect
      .to(overlay, {
        duration: 0.08,
        backgroundColor: "#fff",
        repeat: 3,
        yoyo: true,
        ease: "none",
      })
      // "HAHAHAHA"
      .to(line3, { opacity: 0.9, y: 0, duration: 0.3, ease: "power2.out" })
      .to(line3, { opacity: 1, duration: 0.3 })
      // Distort & dissolve
      .to([line1, line2, line3], {
        opacity: 0,
        y: -15,
        duration: 0.6,
        ease: "power3.in",
        stagger: 0.05,
      })
      // Red flash
      .to(overlay, { backgroundColor: "#330000", duration: 0.15 })
      .to(overlay, { opacity: 0, duration: 0.8, ease: "power2.in" });

    return () => {
      tl.kill();
    };
  }, []);

  // ── Scroll Animations ──
  useEffect(() => {
    if (!introDone) return;

    const ctx = gsap.context(() => {
      // Animate sections on scroll
      const sections = gsap.utils.toArray<HTMLElement>(".anim-section");
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              end: "top 50%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Skill bars animate when visible
      const bars = document.querySelectorAll(".bar-fill");
      bars.forEach((bar) => {
        const targetWidth = (bar as HTMLElement).style.width;
        (bar as HTMLElement).style.width = "0%";
        ScrollTrigger.create({
          trigger: bar,
          start: "top 90%",
          onEnter: () => {
            gsap.to(bar, { width: targetWidth, duration: 1.2, ease: "power2.out" });
          },
          once: true,
        });
      });

      // Card hover effects
      const cards = gsap.utils.toArray<HTMLElement>(".card");
      cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, { y: -3, duration: 0.25, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { y: 0, duration: 0.25, ease: "power2.out" });
        });
      });

      // Wired phrases fade in
      gsap.utils.toArray<HTMLElement>(".wired-phrase").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, letterSpacing: "1em" },
          {
            opacity: 0.4,
            letterSpacing: "0.5em",
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
          }
        );
      });
    });

    return () => ctx.revert();
  }, [introDone]);

  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* ── Intro Overlay ── */}
      <div ref={overlayRef} className="intro-overlay">
        <span ref={line1Ref} className="intro-line">
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

      {/* ── Main Content ── */}
      <main ref={mainRef} style={{ opacity: introDone ? 1 : 0 }}>
        {/* Header */}
        <header className="anim-section">
          <PowerLines />
          <p className="tagline">Close the world, Open the nExt</p>
          <h1 className="glitch-text" data-text="Vk">
            Vk
          </h1>
          <p className="bio">
            Electronic Engineering student by day, tinkerer in the Wired by night.
            Year 3 at Puok General &amp; Technical High School, Siem Reap.
            Building things that blink, beep, and occasionally catch fire.
            Armed with an ESP32, a soldering iron, too much coffee,
            and a deep distrust of closed-source firmware.
          </p>
          <div className="header-links">
            <a href="https://github.com/cantwin-ctrl">GitHub</a>
            <a href="https://kh.linkedin.com/in/eng-vicheka-27150b410">LinkedIn</a>
            <a href="https://t.me/Callme_vexshell">Telegram</a>
            <a href="https://t.me/OmenAndroid">Channel</a>
            <a href="mailto:rtmny078@gmail.com">Email</a>
          </div>
        </header>

        <div className="wired-phrase">And you don&apos;t seem to understand...</div>

        {/* Status Card */}
        <section className="anim-section">
          <div className="box">
            <p className="box-title">LAYER:01 — shell — 80×24</p>
            <p><span className="prompt">wired://vk:~$</span> whoami</p>
            <p>Vk — electronic engineering, year 3</p>
            <p><span className="prompt">wired://vk:~$</span> uname -a</p>
            <p>Debian 13 trixie · Celeron N4000 · 7.6GB · oh-my-zsh</p>
            <p><span className="prompt">wired://vk:~$</span> uptime</p>
            <p>since 2004 · Siem Reap, Cambodia · ☕ cups: ∞</p>
          </div>
        </section>

        <div className="section-wire" />

        {/* NRFBOX */}
        <section className="anim-section">
          <h2>▸ NRFBOX — WiFi Deauth-Jammer</h2>
          <p style={{ fontSize: "0.82rem", color: "var(--text-dim)", marginBottom: "0.75rem", lineHeight: 1.7 }}>
            Handheld wireless security tool. ESP32-WROOM-32U brain, NRF24L01+PA+LNA
            radio module for 2.4GHz, 0.96&quot; SSD1306 OLED display, NeoPixel RGB status
            ring, custom PCB. Battery-powered, pocket-sized. Scans networks, sends
            deauth frames, all from a custom menu-driven interface. My final year project.
          </p>
          <div>
            {["ESP32", "NRF24L01", "C/C++", "RF", "PCB Design", "OLED"].map((tag) => (
              <span key={tag} className="tag-nr">{tag}</span>
            ))}
          </div>
        </section>

        <div className="section-wire" />

        {/* Projects */}
        <section className="anim-section">
          <h2>▸ Projects</h2>
          <div className="card-grid">
            {[
              { title: "Portfolio Site", desc: "This site. Next.js static export on GitHub Pages. Cyberpunk x Serial Experiments Lain, GSAP animations.", tags: ["Next.js", "TypeScript", "GSAP"] },
              { title: "Discord RPG Bot", desc: "Custom RPG bot — leveling, inventory, turn-based battles, quests, crafting, PvP. discord.py + SQLite on Raspberry Pi.", tags: ["Python", "discord.py", "SQLite"] },
              { title: "Crypto Dashboard", desc: "Real-time price tracker aggregating Binance, CoinGecko, Kraken. CLI-first with Telegram alerts.", tags: ["Python", "REST APIs", "CLI"] },
              { title: "Android Modding Toolkit", desc: "Shell scripts: one-shot debloater, ADB-over-TCP, Magisk module manager, build.prop tweaks, scrcpy wireless.", tags: ["Shell", "ADB", "Android"] },
              { title: "USB DAC Audiophile Tuning", desc: "PulseAudio + ALSA config for CX31993+97220HIFI. Bit-perfect s32le 384kHz playback on Debian.", tags: ["ALSA", "PulseAudio", "Linux Audio"] },
              { title: "NRFBOX v0.3 (WIP)", desc: "Current focus — refining PCB layout, optimizing power draw, extending battery life.", tags: ["KiCad", "ESP-IDF", "Low Power"] },
            ].map((project) => (
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

        <div className="section-wire" />

        {/* Skills */}
        <section className="anim-section">
          <h2>▸ Skills</h2>
          {[
            { name: "Embedded Systems", pct: 85, ctx: "ESP32, Arduino, NRF24L01, low-level" },
            { name: "Shell Scripting", pct: 80, ctx: "bash, zsh, automation, ADB" },
            { name: "Python", pct: 65, ctx: "Flask, discord.py, data, tooling" },
            { name: "C/C++", pct: 60, ctx: "ESP-IDF, Arduino, firmware" },
            { name: "PCB Design", pct: 50, ctx: "KiCad, schematics, routing" },
            { name: "Linux Admin", pct: 75, ctx: "Debian, PulseAudio, system tuning" },
          ].map((skill) => (
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

        <div className="section-wire" />

        {/* Tools */}
        <section className="anim-section">
          <h2>▸ Tools</h2>
          <div>
            {["Debian", "vim+tmux", "zsh", "Python", "ESP-IDF", "KiCad", "ADB/scrcpy", "PulseAudio"].map((tool) => (
              <span key={tool} className="tool-chip">{tool}</span>
            ))}
          </div>
        </section>

        {/* Currently */}
        <section className="currently anim-section">
          <h2>▸ Currently</h2>
          <ul>
            <li>NRFBOX v0.3 — refining PCB layout and battery optimization</li>
            <li>Learning Python deep dive — OOP, async, networking</li>
            <li>Working toward publishing my first open-source tool</li>
            <li>Exploring Next.js, GSAP &amp; the Wired</li>
          </ul>
        </section>

        <div className="wired-phrase" style={{ marginTop: "3rem" }}>
          Let&apos;s all love Lain
        </div>

        {/* Footer */}
        <footer className="anim-section">
          <pre>
{`┌─────────────────────────────────────┐
│  Powered by caffeine               │
│  Crafted in vim · Debian 13        │
│  All bugs reserved                 │
│  © ${currentYear} Vk · Siem Reap, KH       │
└─────────────────────────────────────┘`}
          </pre>
          <p>Built with Next.js · GSAP · Static export on GitHub Pages</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "0.5rem" }}>
            <a href="https://github.com/cantwin-ctrl">GitHub</a>
            <a href="https://t.me/OmenAndroid">Channel</a>
            <a href="https://t.me/Callme_vexshell">Telegram</a>
            <a href="https://github.com/cantwin-ctrl/next-portfolio">Source</a>
          </div>
        </footer>

        <Terminal />
        <ThemeToggle />
      </main>
    </>
  );
}
