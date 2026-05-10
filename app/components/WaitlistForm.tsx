"use client";

import { useState, useRef } from "react";
import { useWaitlistEmail } from "./WaitlistEmailProvider";
import { submitWaitlist } from "@/lib/api/waitlist";

interface WaitlistFormProps {
  id: string;
  source: string;
  placeholder?: string;
  buttonText?: string;
  compact?: boolean;
}

export default function WaitlistForm({
  id,
  source,
  placeholder = "Enter your email address",
  buttonText = "Join waitlist",
  compact = false,
}: Readonly<WaitlistFormProps>) {
  const { email, setEmail, isSubscribed, setIsSubscribed, selectedPet } = useWaitlistEmail();

  function getPetType(): string {
    if (!selectedPet || selectedPet === "Other") return "pet";
    return selectedPet.split(" ").at(-1)!.toLowerCase();
  }
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit() {
    const value = email.trim();
    if (!value || !value.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      inputRef.current?.focus();
      setTimeout(() => setErrorMsg(""), 2500);
      return;
    }
    setStatus("loading");
    try {
      const { ok, data } = await submitWaitlist(value, source, getPetType());
      if (ok) {
        setIsSubscribed(true);
      } else {
        setErrorMsg(data.error ?? "Something went wrong. Let's try that again.");
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setErrorMsg("Something went wrong. Let's try that again.");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  /* ── Success: hero variant ── */
  if (isSubscribed && !compact) {
    return (
      <div
        className="animate-fade-in w-full"
        style={{ maxWidth: 480 }}
      >
        <div
          style={{
            background: "#F7F3F0",
            border: "1.5px solid #EDE6DF",
            borderRadius: 20,
            padding: "32px 36px",
            boxShadow: "0 4px 32px rgba(232,93,117,0.09), 0 2px 8px rgba(0,0,0,0.05)",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 34, marginBottom: 14, lineHeight: 1 }}>🐾</div>
          <div
            style={{
              fontSize: 19,
              fontWeight: 800,
              color: "#1F1F1F",
              letterSpacing: "-0.02em",
              marginBottom: 8,
            }}
          >
            You&apos;re officially on the waitlist.
          </div>
          <div style={{ fontSize: 15, color: "#6B6B6B", lineHeight: 1.65 }}>
            We&apos;ll let you know when early access opens.
          </div>
        </div>
      </div>
    );
  }

  /* ── Success: footer variant ── */
  if (isSubscribed && compact) {
    return (
      <div
        className="animate-fade-in flex items-center gap-2"
        style={{ maxWidth: 440, fontSize: 14, color: "#9E9E9E" }}
      >
        Already subscribed
        <span style={{ color: "#6FCF97", fontWeight: 700 }}>✓</span>
      </div>
    );
  }

  /* ── Form ── */
  return (
    <div className="w-full" style={{ maxWidth: compact ? 440 : 480 }}>
      <div
        className="flex flex-col sm:flex-row w-full bg-white border rounded-2xl transition-all duration-200"
        style={{
          borderWidth: "1.5px",
          borderColor: status === "error" ? "#EB5757" : errorMsg ? "#EB5757" : "#E5E5E5",
          boxShadow:
            status === "error" || errorMsg
              ? "0 0 0 4px rgba(235,87,87,0.12)"
              : "0 4px 24px rgba(232,93,117,0.10), 0 2px 8px rgba(0,0,0,0.06)",
          overflow: "hidden",
        }}
      >
        <input
          ref={inputRef}
          id={id}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          autoComplete="email"
          disabled={status === "loading"}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="flex-1 min-w-0 border-none outline-none bg-transparent px-5 py-4 text-[#1F1F1F] placeholder-[#9E9E9E] disabled:opacity-60"
          style={{ fontFamily: "inherit", fontSize: 15 }}
        />
        <button
          onClick={handleSubmit}
          disabled={status === "loading"}
          className="form-submit-btn font-bold text-white transition-all duration-150 active:scale-95 disabled:opacity-70 cursor-pointer whitespace-nowrap bg-[#E85D75] hover:bg-[#C44560]"
          style={{
            fontFamily: "inherit",
            fontSize: 15,
            padding: "13px 24px",
            borderRadius: 10,
          }}
        >
          {status === "loading" ? "Joining…" : buttonText}
        </button>
      </div>
      {errorMsg && (
        <p className="mt-2 text-sm text-[#EB5757] pl-1">{errorMsg}</p>
      )}
    </div>
  );
}
