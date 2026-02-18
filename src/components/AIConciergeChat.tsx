"use client";

import { useEffect, useRef, useState } from "react";

interface ChatMessage {
  type: "user" | "bot";
  html: string;
}

const messages: ChatMessage[] = [
  {
    type: "user",
    html: "We're moving to Mallorca with two kids (8 &amp; 12). Best areas for families with international schools nearby?",
  },
  {
    type: "bot",
    html: `Great question! For families with school-age children, I'd recommend these areas:<br><br>🏡 <strong>Palma & surrounds</strong> — Closest to most international schools (Baleares Int'l, Agora Portals, Bellver). Urban lifestyle with everything on your doorstep.<br><br>• <strong>Calvià / Santa Ponsa</strong> — Beautiful area, close to Agora Portals and King Richard III. More space, great outdoor lifestyle.<br><br>• <strong>Alaró / Binissalem</strong> — Village life at its best. 25 min to Palma schools. Amazing community feel, very safe for kids.<br><br>Want me to compare property prices across these areas?`,
  },
  {
    type: "user",
    html: "Yes! What's the property market like in Calvià?",
  },
  {
    type: "bot",
    html: `<strong>Calvià / Santa Ponsa</strong> at a glance:<br><br>📊 Avg 4-bed villa: <strong>€750k - €1.2M</strong><br>📈 Price trend: +6% YoY<br>• 10 min to beaches, 20 min to Palma<br>🎓 Agora Portals (5 min), King Richard III (10 min)<br><br>At €800k you'd get a lovely 4-bed with pool and garden. It's the sweet spot for families — space, schools, beach, and still connected to Palma.<br><br>Shall I show you <a href="#" style="color:#C9A96E;text-decoration:underline">trusted property agents in Calvià</a>?`,
  },
];

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export function AIConciergeChat() {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [chatMessages, setChatMessages] = useState<{ type: string; html: string }[]>([]);
  const [showDots, setShowDots] = useState(false);
  const playingRef = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const scrollDown = () => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  };

  const play = async () => {
    if (playingRef.current) return;
    playingRef.current = true;
    setChatMessages([]);
    setShowDots(false);

    for (const m of messages) {
      if (m.type === "user") {
        await sleep(800);
        setChatMessages((prev) => [...prev, { type: "user", html: m.html }]);
        await sleep(100);
        scrollDown();
        await sleep(600);
      } else {
        setShowDots(true);
        scrollDown();
        await sleep(1500 + Math.random() * 700);
        setShowDots(false);
        setChatMessages((prev) => [...prev, { type: "bot", html: m.html }]);
        await sleep(100);
        scrollDown();
        await sleep(1000);
      }
    }

    await sleep(4000);
    playingRef.current = false;
    play();
  };

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observerRef.current?.disconnect();
          setTimeout(() => play(), 500);
        }
      },
      { threshold: 0.3 }
    );
    observerRef.current.observe(el);
    return () => observerRef.current?.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex justify-center">
      <div className="bg-white rounded-[20px] w-full max-w-[420px] h-[480px] flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.3)] overflow-hidden">
        <div className="bg-[var(--warm-dark)] px-5 py-4 flex items-center gap-2.5 text-sm font-semibold text-white">
          <div className="w-2.5 h-2.5 rounded-full bg-[#4ADE80] shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
          <span>Portago AI Concierge</span>
        </div>
        <div
          ref={bodyRef}
          className="flex-1 overflow-y-auto p-2"
          style={{ scrollBehavior: "smooth" }}
        >
          {chatMessages.map((msg, i) => (
            <div
              key={i}
              className={`mx-4 my-2 px-[18px] py-[14px] rounded-[18px] text-[13px] leading-[1.6] max-w-[85%] animate-fadeInUp ${
                msg.type === "user"
                  ? "bg-[var(--sand)] text-[var(--text)] ml-auto rounded-br-[4px]"
                  : "bg-[#F0F4F8] text-[var(--text)] rounded-bl-[4px]"
              }`}
              dangerouslySetInnerHTML={{ __html: msg.html }}
            />
          ))}
          {showDots && (
            <div className="mx-4 my-2 flex gap-[5px] items-center px-[18px] py-3 bg-[#F0F4F8] rounded-[18px] w-fit">
              <span className="w-[7px] h-[7px] rounded-full bg-[#B0B8C4] animate-typingBounce" />
              <span className="w-[7px] h-[7px] rounded-full bg-[#B0B8C4] animate-typingBounce [animation-delay:0.2s]" />
              <span className="w-[7px] h-[7px] rounded-full bg-[#B0B8C4] animate-typingBounce [animation-delay:0.4s]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
