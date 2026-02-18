"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchBar({ className = "" }: { className?: string }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-light)]"
      />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search restaurants, activities, services..."
        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 bg-white text-[var(--text)] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent transition"
      />
    </form>
  );
}
