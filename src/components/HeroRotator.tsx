"use client";

import { useState, useEffect } from "react";

const headlines = [
  { pre: "Live the", em: "Mallorca", post: "life" },
  { pre: "Discover the best of", em: "Palma", post: "" },
  { pre: "Explore", em: "hidden gems", post: "across the island" },
  { pre: "Your guide to", em: "luxury living", post: "in Mallorca" },
];

export function HeroRotator() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % headlines.length);
        setFade(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const h = headlines[index];

  return (
    <h1
      className={`text-4xl md:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-playfair)] text-white leading-tight transition-opacity duration-400 ${
        fade ? "opacity-100" : "opacity-0"
      }`}
    >
      {h.pre}{" "}
      <em className="text-[var(--gold)] not-italic">{h.em}</em>
      {h.post ? ` ${h.post}` : ""}
    </h1>
  );
}
