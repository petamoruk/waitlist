"use client";

import { useEffect, useRef } from "react";

const features = [
  {
    title: "AI pet matching",
    desc: "Answer a few questions and find the perfect pet for your home, lifestyle, and family.",
    iconBg: "#FDEEF1",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E85D75" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
      </svg>
    ),
    delay: "0.05s",
  },
  {
    title: "Daily care tracker",
    desc: "Log feeding, walks, medication, and grooming. Never miss a routine, for any pet.",
    iconBg: "#E8F8EF",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#45A36D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>
      </svg>
    ),
    delay: "0.10s",
  },
  {
    title: "Vet telemedicine",
    desc: "Book on-demand video consultations with qualified UK vets, whenever you need them.",
    iconBg: "#F0EBFF",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7B5CF0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    delay: "0.15s",
  },
  {
    title: "Pet shop & rewards",
    desc: "Discover trusted local pet shops and earn loyalty points on every purchase.",
    iconBg: "#FEF9E7",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B8960A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
    delay: "0.20s",
  },
  {
    title: "AI advisor",
    desc: "Get personalised health and care advice for your specific pet, powered by AI.",
    iconBg: "#FDEEF1",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E85D75" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10H12V2z"/>
        <path d="M21.18 8A10 10 0 0 0 14 2.68"/>
      </svg>
    ),
    delay: "0.25s",
  },
  {
    title: "Pet sitter handover",
    desc: "Share a complete care guide with your sitter — routines, contacts, and emergency info.",
    iconBg: "#E8F7FD",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A8FB5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    delay: "0.30s",
  },
  {
    title: "Insurance marketplace",
    desc: "Compare and connect with leading UK pet insurance providers — all in one place.",
    iconBg: "#E8F8EF",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#45A36D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    delay: "0.35s",
  },
];

export default function FeatureCards() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLDivElement).style.opacity = "1";
          }
        });
      },
      { threshold: 0.1 }
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
      {features.map((f, i) => (
        <div
          key={f.title}
          ref={(el) => { refs.current[i] = el; }}
          className="bg-white border border-[#E5E5E5] rounded-2xl p-7 cursor-default transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-[#EDE6DF]"
          style={{ opacity: 0, animationDelay: f.delay }}
        >
          <div
            className="flex items-center justify-center rounded-xl mb-4"
            style={{ width: 44, height: 44, background: f.iconBg }}
          >
            {f.icon}
          </div>
          <div className="text-base font-bold text-[#1F1F1F] mb-1.5">{f.title}</div>
          <div className="text-sm text-[#6B6B6B] leading-snug">{f.desc}</div>
        </div>
      ))}
    </div>
  );
}
