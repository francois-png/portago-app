"use client";

import { useState } from "react";
import { Send, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function ListBusinessForm() {
  const [form, setForm] = useState({
    business_name: "",
    contact_name: "",
    email: "",
    phone: "",
    category: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const supabase = createClient();
      const { error } = await supabase.from("business_signups").insert(form);
      if (error) throw error;
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
          <Check size={32} className="text-green-600" />
        </div>
        <h3 className="text-xl font-semibold font-[family-name:var(--font-playfair)] text-[var(--dark)] mb-2">
          Thank you
        </h3>
        <p className="text-[var(--text-light)]">
          We have received your submission and will be in touch shortly.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-gray-200 bg-[var(--cream)] text-[var(--text)] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:border-transparent transition";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-1.5">
            Business Name
          </label>
          <input
            type="text"
            required
            value={form.business_name}
            onChange={(e) => setForm({ ...form, business_name: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-1.5">
            Contact Name
          </label>
          <input
            type="text"
            required
            value={form.contact_name}
            onChange={(e) => setForm({ ...form, contact_name: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-1.5">
            Email
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text)] mb-1.5">
            Phone
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--text)] mb-1.5">
          Category
        </label>
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className={inputClass}
        >
          <option value="">Select a category</option>
          <option value="Restaurants">Restaurants</option>
          <option value="Activities">Activities</option>
          <option value="Wellness">Wellness</option>
          <option value="Property">Property</option>
          <option value="Shopping">Shopping</option>
          <option value="Legal">Legal</option>
          <option value="Transport">Transport</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--text)] mb-1.5">
          Tell us about your business
        </label>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={inputClass}
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-[var(--gold)] hover:bg-[var(--gold-dark)] text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <Send size={16} />
        Submit
      </button>
      {status === "error" && (
        <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
