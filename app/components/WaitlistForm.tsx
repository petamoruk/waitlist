"use client";

import { useState, useRef } from "react";

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
}: WaitlistFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit() {
    const email = inputRef.current?.value.trim() ?? "";
    if (!email || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      inputRef.current?.focus();
      setTimeout(() => setErrorMsg(""), 2500);
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
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

  if (status === "success") {
    return (
      <div
        className="flex items-center gap-3 px-5 py-4 rounded-2xl border border-[#6FCF97] bg-[#E8F8EF] text-[#2E7D52] font-medium w-full"
        style={{ maxWidth: compact ? 440 : 480, fontSize: 15 }}
      >
        <span
          className="flex-shrink-0 flex items-center justify-center rounded-full bg-[#6FCF97]"
          style={{ width: 28, height: 28 }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="2,7 5.5,10.5 12,3" />
          </svg>
        </span>
        You&apos;re on the list! We&apos;ll be in touch soon.
      </div>
    );
  }

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
          className="form-submit-btn font-bold text-white transition-all duration-150 active:scale-95 disabled:opacity-70 cursor-pointer whitespace-nowrap"
          style={{
            background: "#E85D75",
            fontFamily: "inherit",
            fontSize: 15,
            padding: "13px 24px",
            borderRadius: 10,
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#C44560"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#E85D75"; }}
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