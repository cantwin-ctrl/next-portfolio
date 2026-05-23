"use client";

import { useState, useCallback } from "react";
import { gsap } from "gsap";

export default function LayerToggle() {
  const [layer, setLayer] = useState<1 | 2>(1);

  const toggle = useCallback(() => {
    const next = layer === 1 ? 2 : 1;
    const body = document.body;

    // Flash
    gsap.to(body, {
      backgroundColor: next === 2 ? "#1a0000" : "#0d0d16",
      duration: 0.15,
      ease: "power2.out",
    });

    body.classList.toggle("layer-02", next === 2);
    setLayer(next);
  }, [layer]);

  return (
    <button
      onClick={toggle}
      className="layer-toggle"
      title={`Switch to Layer:0${layer === 1 ? 2 : 1}`}
    >
      LAYER:0{layer}
    </button>
  );
}
