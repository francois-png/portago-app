"use client";

import { useState } from "react";
import { Check } from "lucide-react";
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
    <form
      onSubmit={handleSubmit}
      className="flex max-w-[480px] w-full bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.15)] rounded-full p-[5px] pl-6"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="flex-1 bg-transparent border-none outline-none text-white text-[15px] placeholder:text-[rgba(255,255,255,0.4)]"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-[var(--gold)] text-white border-none px-7 py-3 rounded-full text-sm font-semibold hover:bg-[var(--terracotta)] transition-all disabled:opacity-50"
      >
        Subscribe
      </button>
      {status === "error" && (
        <p className="text-red-400 text-sm mt-2 absolute">Something went wrong.</p>
      )}
    </form>
  );
}
