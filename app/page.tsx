import Terminal from "./Terminal";
import ThemeToggle from "./ThemeToggle";

export default function Home() {
  return (
    <main>
      {/* Header */}
      <header>
        <pre className="ascii-banner">
{` ██╗   ██╗ ██╗  ██╗
 ██║   ██║ ██║ ██╔╝
 ██║   ██║ █████╔╝
 ╚██╗ ██╔╝ ██╔═██╗
  ╚████╔╝  ██║  ██╗
   ╚═══╝   ╚═╝  ╚═╝`}
        </pre>
        <h1 className="glitch" data-text="Vk">Vk</h1>
        <p>
          Electronic Engineering student by day, tinkerer by night. Year 3 at Puok General
          &amp; Technical High School, Siem Reap. Building things that blink, beep,
          and occasionally catch fire. Armed with an ESP32, a soldering iron,
          too much coffee, and a deep distrust of closed-source firmware.
        </p>
        <div className="header-links">
          <a href="https://github.com/cantwin-ctrl">GitHub</a>
          <a href="https://kh.linkedin.com/in/eng-vicheka-27150b410">LinkedIn</a>
          <a href="https://t.me/Callme_vexshell">Telegram</a>
          <a href="https://t.me/OmenAndroid">Channel</a>
          <a href="mailto:rtmny078@gmail.com">Email</a>
        </div>
      </header>

      {/* Status Card */}
      <section>
        <div className="box">
          <p className="box-title">system.info - bash - 80×24</p>
          <p><span className="prompt">user@host:~$</span> whoami</p>
          <p>Vk — electronic engineering, year 3</p>
          <p><span className="prompt">user@host:~$</span> uname -a</p>
          <p>Debian 13 trixie · Celeron N4000 · 7.6GB · oh-my-zsh</p>
          <p><span className="prompt">user@host:~$</span> uptime</p>
          <p>since 2004 · Siem Reap, Cambodia · ☕ cups: ∞</p>
        </div>
      </section>

      {/* NRFBOX */}
      <section>
        <h2 className="flicker">📡 NRFBOX — WiFi Deauth-Jammer</h2>
        <p style={{ fontSize: '0.85rem', color: '#00cc33', marginBottom: '0.75rem' }}>
          Handheld wireless security tool. ESP32-WROOM-32U brain, NRF24L01+PA+LNA
          radio module for 2.4GHz, 0.96&quot; SSD1306 OLED display, NeoPixel RGB status
          ring, custom PCB. Battery-powered, pocket-sized. Scans networks, sends
          deauth frames, all from a custom menu-driven interface. My final year project.
        </p>
        <div>
          {["ESP32", "NRF24L01", "C/C++", "RF", "PCB Design", "OLED"].map(tag => (
            <span key={tag} className="tag-nr">{tag}</span>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section>
        <h2 className="flicker">🛠 Projects</h2>
        <div className="card-grid">
          {[
            { title: "Portfolio Site", desc: "This site. Next.js static export on GitHub Pages. Cyberpunk theme, glitch effects, pure vibes.", tags: ["Next.js", "TypeScript", "CSS"] },
            { title: "Discord RPG Bot", desc: "Custom RPG bot — leveling, inventory, turn-based battles, quests, crafting, PvP. discord.py + SQLite on Raspberry Pi.", tags: ["Python", "discord.py", "SQLite"] },
            { title: "Crypto Dashboard", desc: "Real-time price tracker aggregating Binance, CoinGecko, Kraken. CLI-first with Telegram alerts.", tags: ["Python", "REST APIs", "CLI"] },
            { title: "Android Modding Toolkit", desc: "Shell scripts: one-shot debloater, ADB-over-TCP, Magisk module manager, build.prop tweaks, scrcpy wireless.", tags: ["Shell", "ADB", "Android"] },
            { title: "USB DAC Audiophile Tuning", desc: "PulseAudio + ALSA config for CX31993+97220HIFI. Bit-perfect s32le 384kHz playback on Debian.", tags: ["ALSA", "PulseAudio", "Linux Audio"] },
            { title: "NRFBOX v0.3 (WIP)", desc: "Current focus — refining PCB layout, optimizing power draw, extending battery life.", tags: ["KiCad", "ESP-IDF", "Low Power"] },
          ].map(project => (
            <div key={project.title} className="card">
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
              <div>
                {project.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section>
        <h2 className="flicker">💾 Skills</h2>
        {[
          { name: "Embedded Systems", pct: 85, ctx: "ESP32, Arduino, NRF24L01, low-level" },
          { name: "Shell Scripting", pct: 80, ctx: "bash, zsh, automation, ADB" },
          { name: "Python", pct: 65, ctx: "Flask, discord.py, data, tooling" },
          { name: "C/C++", pct: 60, ctx: "ESP-IDF, Arduino, firmware" },
          { name: "PCB Design", pct: 50, ctx: "KiCad, schematics, routing" },
          { name: "Linux Admin", pct: 75, ctx: "Debian, PulseAudio, system tuning" },
        ].map(skill => (
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

      {/* Tools */}
      <section>
        <h2 className="flicker">🔧 Tools</h2>
        <div>
          {["Debian", "vim+tmux", "zsh", "Python", "ESP-IDF", "KiCad", "ADB/scrcpy", "PulseAudio"].map(tool => (
            <span key={tool} className="tool-chip">{tool}</span>
          ))}
        </div>
      </section>

      {/* Currently */}
      <section className="currently">
        <h2 className="flicker">⚡ Currently</h2>
        <ul>
          <li>NRFBOX v0.3 — refining PCB layout and battery optimization</li>
          <li>Learning Python deep dive — OOP, async, networking</li>
          <li>Working toward publishing my first open-source tool</li>
          <li>Exploring Next.js static sites (you&apos;re looking at it)</li>
        </ul>
      </section>

      {/* Footer */}
      <footer>
        <pre>
{`┌─────────────────────────────────────┐
│  Powered by caffeine               │
│  Crafted in vim · Debian 13        │
│  All bugs reserved                 │
│  © ${new Date().getFullYear()} Vk · Siem Reap, KH       │
└─────────────────────────────────────┘`}
        </pre>
        <p>Built with Next.js · Static export on GitHub Pages</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '0.5rem' }}>
          <a href="https://github.com/cantwin-ctrl">GitHub</a>
          <a href="https://t.me/OmenAndroid">Channel</a>
          <a href="https://t.me/Callme_vexshell">Telegram</a>
          <a href="https://github.com/cantwin-ctrl/next-portfolio">Source</a>
        </div>
      </footer>

      <Terminal />
      <ThemeToggle />
    </main>
  );
}
