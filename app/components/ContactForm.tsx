"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { submitContact } from "@/lib/api/contact";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [emailError, setEmailError] = useState(false);
  const nameRef    = useRef<HTMLInputElement>(null);
  const emailRef   = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLSelectElement>(null);
  const msgRef     = useRef<HTMLTextAreaElement>(null);

  async function handleSubmit() {
    const email = emailRef.current?.value.trim() ?? "";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError(true);
      emailRef.current?.focus();
      return;
    }
    setEmailError(false);
    setStatus("loading");
    try {
      const ok = await submitContact({
        name:    nameRef.current?.value.trim(),
        email,
        subject: subjectRef.current?.value,
        message: msgRef.current?.value.trim(),
      });
      setStatus(ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  const inputClass = "w-full border rounded-[10px] px-3.5 py-3 text-[15px] text-[#1F1F1F] bg-white outline-none transition-all duration-200 placeholder-[#C0C0C0]";
  const inputStyle = (err?: boolean) => ({
    borderWidth: "1.5px",
    borderColor: err ? "var(--error)" : "var(--border)",
    fontFamily: "inherit",
  });

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 text-center py-10 px-5">
        <div
          className="flex items-center justify-center rounded-full bg-[#E8F8EF]"
          style={{ width: 56, height: 56 }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#45A36D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="5,14 11,20 23,8"/>
          </svg>
        </div>
        <h3 className="text-[20px] font-bold text-[#1F1F1F]">Message sent</h3>
        <p className="text-[15px] text-[#6B6B6B]">Thanks for reaching out. We&apos;ll get back to you within one business day.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-[20px] font-bold text-[#1F1F1F] mb-6" style={{ letterSpacing: "-0.01em" }}>
        Send us a message
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-[13px] font-medium text-[#1F1F1F] mb-1.5" htmlFor="c-name">Your name</label>
          <input ref={nameRef} id="c-name" type="text" placeholder="e.g. Sarah" className={inputClass} style={inputStyle()} />
        </div>
        <div>
          <label className="block text-[13px] font-medium text-[#1F1F1F] mb-1.5" htmlFor="c-email">Email address</label>
          <input
            ref={emailRef}
            id="c-email"
            type="email"
            placeholder="you@example.com"
            className={inputClass}
            style={inputStyle(emailError)}
            onFocus={() => setEmailError(false)}
          />
          {emailError && <p className="text-[12px] text-[#EB5757] mt-1">Please enter a valid email.</p>}
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-[13px] font-medium text-[#1F1F1F] mb-1.5" htmlFor="c-subject">Subject</label>
        <select ref={subjectRef} id="c-subject" className={inputClass} style={{ ...inputStyle(), appearance: "none", cursor: "pointer" }}>
          <option value="">Select a topic…</option>
          <option>Waitlist question</option>
          <option>Product feedback</option>
          <option>Partnership enquiry</option>
          <option>Press &amp; media</option>
          <option>Other</option>
        </select>
      </div>

      <div className="mb-5">
        <label className="block text-[13px] font-medium text-[#1F1F1F] mb-1.5" htmlFor="c-message">Message</label>
        <textarea
          ref={msgRef}
          id="c-message"
          placeholder="Tell us what's on your mind…"
          className={inputClass}
          style={{ ...inputStyle(), resize: "vertical", minHeight: 120 }}
          onKeyDown={(e) => { if (e.key === "Enter" && e.metaKey) handleSubmit(); }}
        />
      </div>

      {status === "error" && (
        <p className="text-[14px] text-[#EB5757] mb-4">Something went wrong. Please try again.</p>
      )}

      <div className="flex flex-wrap items-center gap-4 mt-2">
        <button
          onClick={handleSubmit}
          disabled={status === "loading"}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-[10px] bg-[#E85D75] hover:brightness-[0.93] text-white text-[15px] font-semibold cursor-pointer transition-all duration-150 disabled:opacity-70 active:scale-[0.97]"
          style={{ fontFamily: "inherit" }}
        >
          {status === "loading" ? "Sending…" : "Send message"}
        </button>
        <p className="text-[12px] text-[#9E9E9E] flex-1 min-w-[160px]">
          We&apos;ll only use your details to respond. See our{" "}
          <Link href="/privacy" className="text-[#E85D75] underline underline-offset-2">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}