"use client";

import { useState, useEffect } from "react";

const headlines = [
  { pre: "Live the", em: "Mallorca", post: "life you've always imagined" },
  { pre: "Discover the best of", em: "Mallorca", post: ", curated for you" },
  { pre: "Your insider guide to", em: "Mallorca's", post: "finest" },
  { pre: "Experience", em: "Mallorca", post: "like a local" },
  { pre: "Everything", em: "Mallorca", post: ", all in one place" },
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
      }, 600);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const h = headlines[index];

  return (
    <h1
      className={`font-[family-name:var(--font-playfair)] text-[clamp(42px,6vw,72px)] font-bold text-white leading-[1.1] mb-5 transition-opacity duration-[600ms] ${
        fade ? "opacity-100" : "opacity-0"
      }`}
    >
      {h.pre}{" "}
      <em className="italic text-[var(--gold-light)]">{h.em}</em>
      {h.post ? ` ${h.post}` : ""}
    </h1>
  );
}
