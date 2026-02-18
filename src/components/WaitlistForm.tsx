"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const supabase = createClient();
      const { error } = await supabase.from("waitlist").insert({ email: email.trim() });
      if (error) throw error;
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 text-[var(--gold)]">
        <Check size={20} />
        <span className="font-medium">Welcome to Portago. We will be in touch.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 w-full max-w-md">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="flex-1 px-4 py-3 rounded-lg border border-gray-200 bg-white text-[var(--text)] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--gold)]"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-[var(--gold)] hover:bg-[var(--gold-dark)] text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 disabled:opacity-50"
      >
        Join
        <ArrowRight size={16} />
      </button>
      {status === "error" && (
        <p className="text-red-500 text-sm mt-1">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
