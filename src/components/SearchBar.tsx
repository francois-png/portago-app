"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchBar({ variant = "hero" }: { variant?: "hero" | "page" }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  if (variant === "hero") {
    return (
      <form
        onSubmit={handleSubmit}
        className="flex items-center bg-[rgba(255,255,255,0.12)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.15)] rounded-full max-w-[600px] mx-auto p-[6px] pl-7 focus-within:bg-[rgba(255,255,255,0.18)] focus-within:border-[rgba(201,169,110,0.5)] transition-all"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search restaurants, architects, wellness..."
          className="flex-1 bg-transparent border-none outline-none text-base text-white font-light placeholder:text-[rgba(255,255,255,0.5)]"
        />
        <button
          type="submit"
          className="bg-[var(--gold)] text-white border-none px-8 py-3.5 rounded-full text-sm font-semibold tracking-[0.5px] hover:bg-[var(--terracotta)] hover:scale-[1.02] transition-all"
        >
          Explore
        </button>
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center bg-[rgba(255,255,255,0.12)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.15)] rounded-full max-w-[600px] mx-auto p-[6px] pl-7 focus-within:bg-[rgba(255,255,255,0.18)] focus-within:border-[rgba(201,169,110,0.5)] transition-all"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search listings..."
        className="flex-1 bg-transparent border-none outline-none text-base text-white font-light placeholder:text-[rgba(255,255,255,0.5)]"
      />
      <button
        type="submit"
        className="bg-[var(--gold)] text-white border-none px-8 py-3.5 rounded-full text-sm font-semibold tracking-[0.5px] hover:bg-[var(--terracotta)] hover:scale-[1.02] transition-all"
      >
        Search
      </button>
    </form>
  );
}
