"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

/** Renders the 3D network only on capable, non-reduced-motion, non-small screens. Otherwise a CSS orb. */
export default function HeroVisual() {
  const [use3d, setUse3d] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia("(min-width: 820px)").matches;
    let webgl = false;
    try { webgl = !!document.createElement("canvas").getContext("webgl"); } catch { webgl = false; }
    setUse3d(!reduce && wide && webgl);
  }, []);
  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="orb" />
      {use3d && <div className="hero-canvas"><HeroScene /></div>}
    </div>
  );
}
