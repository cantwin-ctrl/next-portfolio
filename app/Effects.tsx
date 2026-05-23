"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";

// ── Cursor Trail ──
function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const particles: { x: number; y: number; life: number; vx: number; vy: number; size: number }[] = [];
    let mx = w / 2;
    let my = h / 2;
    let frame = 0;

    const onResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);

    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, w, h);

      // Spawn particles (throttled)
      if (frame % 3 === 0 && particles.length < 60) {
        particles.push({
          x: mx + (Math.random() - 0.5) * 6,
          y: my + (Math.random() - 0.5) * 6,
          life: 1,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          size: Math.random() * 2 + 0.5,
        });
      }

      // Update & draw
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.025;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = p.life * 0.5;
        ctx.fillStyle = "#6699ff";
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }
      ctx.globalAlpha = 1;

      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 996,
      }}
    />
  );
}

// ── Click Ripple ──
function ClickRipple() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = document.createElement("div");
      el.className = "click-ripple";
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
      document.body.appendChild(el);

      gsap.fromTo(
        el,
        { scale: 0, opacity: 0.8 },
        { scale: 8, opacity: 0, duration: 0.6, ease: "power2.out" }
      );

      setTimeout(() => el.remove(), 700);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return null;
}

// ── Random Micro-Glitches ──
function MicroGlitches() {
  useEffect(() => {
    const trigger = () => {
      const el = document.createElement("div");
      el.className = "micro-glitch";
      document.body.appendChild(el);

      // Randomize position & size
      const top = Math.random() * 80;
      const h = 2 + Math.random() * 6;
      el.style.top = `${top}%`;
      el.style.height = `${h}px`;
      el.style.opacity = `${0.15 + Math.random() * 0.25}`;

      setTimeout(() => el.remove(), 200);

      // Schedule next
      const delay = 5000 + Math.random() * 12000;
      timeout = setTimeout(trigger, delay);
    };

    let timeout = setTimeout(trigger, 8000);

    return () => clearTimeout(timeout);
  }, []);

  return null;
}

// ── Navi Easter Egg ──
function NaviEasterEgg() {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [clicks, setClicks] = useState(0);
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const show = () => {
      const corners = [
        { x: 20, y: window.innerHeight - 100 },      // bottom-left
        { x: window.innerWidth - 80, y: window.innerHeight - 100 }, // bottom-right
        { x: window.innerWidth - 80, y: 100 },        // top-right
        { x: 20, y: 100 },                             // top-left
      ];
      const corner = corners[Math.floor(Math.random() * corners.length)];
      setPos(corner);
      setVisible(true);

      // Auto-hide after 5s
      setTimeout(() => setVisible(false), 5000);
    };

    const schedule = () => {
      const delay = 25000 + Math.random() * 45000;
      return setTimeout(() => {
        show();
        schedule();
      }, delay);
    };

    let timer = setTimeout(() => {
      show();
      schedule();
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = useCallback(() => {
    if (!elRef.current) return;
    setClicks((c) => c + 1);
    gsap.to(elRef.current, {
      scale: 0,
      rotation: 360,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => setVisible(false),
    });
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={elRef}
      onClick={handleClick}
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        zIndex: 10001,
        fontSize: "2.5rem",
        cursor: "pointer",
        filter: "brightness(0.7) sepia(0.3) hue-rotate(-10deg)",
        userSelect: "none",
      }}
      title={clicks > 0 ? `found ${clicks} time${clicks > 1 ? "s" : ""}` : "🐻"}
    >
      🧸
    </div>
  );
}

// ── CRT Power Off ──
function CRTPowerOff() {
  const overlayRef = useRef<HTMLDivElement>(null);

  const trigger = useCallback(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const tl = gsap.timeline();
    tl.set(overlay, { display: "flex", opacity: 0, height: "100vh" })
      // Flash white line
      .to(overlay, { opacity: 1, duration: 0.05 })
      .set(overlay, { backgroundColor: "#fff" })
      .to(overlay, { duration: 0.08 })
      .set(overlay, { backgroundColor: "#000" })
      // Collapse to center line
      .to(overlay, {
        height: "2px",
        top: "50%",
        duration: 0.3,
        ease: "power2.in",
      })
      // Hold
      .to(overlay, { duration: 0.5 })
      // Expand back
      .to(overlay, {
        height: "100vh",
        top: "0%",
        duration: 0.4,
        ease: "power2.out",
      })
      .to(overlay, { opacity: 0, duration: 0.3 })
      .set(overlay, { display: "none" });
  }, []);

  // Expose globally for terminal command
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__crtPowerOff = trigger;
    return () => {
      delete (window as unknown as Record<string, unknown>).__crtPowerOff;
    };
  }, [trigger]);

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 99999,
        pointerEvents: "none",
        display: "none",
        alignItems: "center",
        justifyContent: "center",
      }}
    />
  );
}

// ── Combined Effects ──
export default function Effects() {
  return (
    <>
      <CursorTrail />
      <ClickRipple />
      <MicroGlitches />
      <NaviEasterEgg />
      <CRTPowerOff />
    </>
  );
}
