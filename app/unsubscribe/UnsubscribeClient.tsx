"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useRef } from "react";
import Nav from "../components/Nav";
import SiteFooter from "../components/SiteFooter";

type UiState = "form" | "unsubscribed" | "resubscribed";

const REASONS = [
  { value: "too-many",     label: "Too many emails" },
  { value: "not-relevant", label: "Not relevant to me anymore" },
  { value: "never-signed", label: "I don't remember signing up" },
  { value: "found-alt",    label: "Found a different solution" },
  { value: "other",        label: "Something else" },
];

const C = {
  pink:       "#E85D75",
  pinkLight:  "#FDEEF1",
  warm:       "#F7F3F0",
  warmDark:   "#EDE6DF",
  green:      "#6FCF97",
  greenLight: "#E8F8EF",
  greenDark:  "#45A36D",
  text:       "#1F1F1F",
  textSec:    "#6B6B6B",
  textTert:   "#9E9E9E",
  border:     "#E5E5E5",
  borderStrong: "#D0D0D0",
} as const;

function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="11" width="16" height="10" rx="2"/>
      <path d="M8 11V7a4 4 0 0 1 8 0v4"/>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 6-10 7L2 6"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke={C.greenDark} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6,16 13,23 26,9"/>
    </svg>
  );
}

function HeartIcon({ size = 34 }: Readonly<{ size?: number }>) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 34C20 34 5 22 5 12.5C5 7.25 9.25 3 14.5 3C17.12 3 20 4.8 20 4.8C20 4.8 22.88 3 25.5 3C30.75 3 35 7.25 35 12.5C35 22 20 34 20 34Z" fill={C.pink}/>
      <circle cx="13" cy="4.5" r="3" fill={C.pink} opacity="0.5"/>
      <circle cx="27" cy="4.5" r="3" fill={C.pink} opacity="0.5"/>
      <circle cx="7.5" cy="11" r="2.5" fill={C.pink} opacity="0.4"/>
      <circle cx="32.5" cy="11" r="2.5" fill={C.pink} opacity="0.4"/>
    </svg>
  );
}

export default function UnsubscribeClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") ?? "";
  const email = searchParams.get("email") ?? "";

  const [uiState, setUiState]           = useState<UiState>("form");
  const [selectedReason, setReason]     = useState("");
  const [otherText, setOtherText]       = useState("");
  const [dialledDown, setDialledDown]   = useState(false);
  const [submitting, setSubmitting]     = useState(false);

  const successRef = useRef<HTMLDivElement>(null);
  const resubRef   = useRef<HTMLDivElement>(null);

  async function handleUnsubscribe() {
    setSubmitting(true);
    const reason = selectedReason === "other" ? otherText : selectedReason;
    try {
      await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(token ? { token, reason } : { email, reason }),
      });
    } catch { /* silent — show success either way */ }
    setSubmitting(false);
    setUiState("unsubscribed");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => successRef.current?.focus(), 80);
  }

  async function handleResubscribe() {
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "resubscribe" }),
      });
    } catch { /* silent */ }
    setUiState("resubscribed");
    setTimeout(() => resubRef.current?.focus(), 80);
  }

  /* ── Shared card shell ── */
  const card: React.CSSProperties = {
    background: "#fff",
    border: `1px solid ${C.border}`,
    borderRadius: 24,
    boxShadow: "0 10px 40px rgba(0,0,0,0.05), 0 2px 8px rgba(0,0,0,0.03)",
    width: "100%",
    maxWidth: 560,
    overflow: "hidden",
  };

  return (
    <>
      <Nav variant="inner" />
      <div className="pt-[73px] bg-mesh relative">
        <div className="relative z-[1]">
          <main
            className="flex items-center justify-center px-5 py-16 sm:py-20"
            style={{ minHeight: "calc(100vh - 73px)" }}
          >
            <div style={card}>

              {/* ── STATE 1: Form ── */}
              {uiState === "form" && (
                <div role="region" aria-labelledby="unsub-title">

                  {/* Header */}
                  <div className="px-6 pt-7 sm:px-10 sm:pt-9">
                    <p style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.textTert, marginBottom: 18 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.textTert, display: "inline-block" }} aria-hidden="true" />
                      Email preferences
                    </p>
                    <h1
                      id="unsub-title"
                      className="text-2xl sm:text-[30px]"
                      style={{ fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.15, color: C.text, marginBottom: 12 }}
                    >
                      We're sorry to see you <span style={{ color: C.pink }}>go.</span>
                    </h1>
                    <p style={{ fontSize: 16, color: C.textSec, lineHeight: 1.6 }}>
                      Confirm below and we'll stop sending waitlist updates. No more emails, that's a promise.
                    </p>

                    {/* Email pill */}
                    <div
                      className="inline-flex items-center mt-5 overflow-hidden"
                      style={{ gap: 10, padding: "8px 14px 8px 8px", background: C.warm, border: `1px solid ${C.warmDark}`, borderRadius: 999, fontSize: 14, fontWeight: 500, color: C.text, maxWidth: "100%" }}
                    >
                      <span style={{ width: 26, height: 26, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: C.textSec }}>
                        <MailIcon />
                      </span>
                      <span className="truncate" aria-label="Subscribed email address">
                        {email || "your@email.com"}
                      </span>
                      <span
                        style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, borderRadius: "50%", background: "rgba(255,255,255,0.7)", color: C.textTert, marginLeft: 2, flexShrink: 0 }}
                        title="Locked to the email this unsubscribe link was sent to"
                        aria-label="Email locked from this link"
                      >
                        <LockIcon />
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="px-6 pt-7 pb-8 sm:px-10">

                    {/* Soft alt banner */}
                    {!dialledDown ? (
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "16px 18px", background: "#FFFAF0", border: "1px solid #F4E6CC", borderRadius: 14, marginBottom: 24 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: "#fff", border: "1px solid #F4E6CC", display: "flex", alignItems: "center", justifyContent: "center", color: "#B8860B", flexShrink: 0 }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="9"/></svg>
                        </div>
                        <div style={{ fontSize: 14, color: C.text, lineHeight: 1.55 }}>
                          <strong>Getting too many emails?</strong> We can dial it down to one update a month, just the launch news, nothing else.
                          <br />
                          <button
                            type="button"
                            onClick={() => setDialledDown(true)}
                            aria-label="Switch to monthly emails only instead of unsubscribing"
                            style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 6, fontSize: 13, fontWeight: 600, color: "#B8860B", cursor: "pointer", border: "none", background: "transparent", padding: 0, fontFamily: "inherit", textDecoration: "underline", textUnderlineOffset: 3 }}
                          >
                            Switch to monthly only
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "16px 18px", background: C.greenLight, border: `1px solid ${C.green}`, borderRadius: 14, marginBottom: 24 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: "#fff", border: `1px solid ${C.green}`, display: "flex", alignItems: "center", justifyContent: "center", color: "#2E7D52", flexShrink: 0 }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        <div style={{ fontSize: 14, color: C.text, lineHeight: 1.55 }}>
                          <strong>Done, you're now on monthly only.</strong><br />
                          One short email a month, just the highlights.{" "}
                          <button onClick={() => router.push("/")} style={{ color: "#2E7D52", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 3, border: "none", background: "transparent", cursor: "pointer", fontFamily: "inherit", fontSize: 14 }}>
                            Back to home
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Reason picker */}
                    <fieldset style={{ border: "none", padding: 0, margin: "0 0 24px" }}>
                      <legend style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 12, display: "block" }}>
                        A quick reason, if you'd like to share
                        <span style={{ fontWeight: 400, color: C.textTert, marginLeft: 6 }}>optional</span>
                      </legend>
                      <div style={{ display: "grid", gap: 8 }} role="radiogroup" aria-label="Reason for unsubscribing">
                        {REASONS.map((r) => {
                          const checked = selectedReason === r.value;
                          return (
                            <label
                              key={r.value}
                              style={{
                                position: "relative",
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                                minHeight: 48,
                                padding: "14px 16px",
                                border: `1.5px solid ${checked ? C.pink : C.border}`,
                                borderRadius: 12,
                                cursor: "pointer",
                                background: checked ? C.pinkLight : "#fff",
                                transition: "border-color 150ms ease, background 150ms ease",
                              }}
                            >
                              <input
                                type="radio"
                                name="reason"
                                value={r.value}
                                checked={checked}
                                onChange={() => setReason(r.value)}
                                style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}
                              />
                              <span style={{ width: 18, height: 18, borderRadius: "50%", border: `1.5px solid ${checked ? C.pink : C.borderStrong}`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 150ms ease" }}>
                                {checked && <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.pink }} />}
                              </span>
                              <span style={{ fontSize: 15, fontWeight: 500, color: C.text, lineHeight: 1.4 }}>
                                {r.label}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                      {selectedReason === "other" && (
                        <textarea
                          value={otherText}
                          onChange={(e) => setOtherText(e.target.value)}
                          placeholder="Tell us a little more, we read every reply."
                          autoFocus
                          aria-label="More detail about why you're unsubscribing"
                          style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 10, fontFamily: "inherit", fontSize: 14, background: "#fff", outline: "none", resize: "vertical", minHeight: 70, marginTop: 10, padding: "12px 14px", transition: "border-color 200ms ease, box-shadow 200ms ease", display: "block" }}
                          onFocus={(e) => { e.target.style.borderColor = C.pink; e.target.style.boxShadow = "0 0 0 3px rgba(232,93,117,0.15)"; }}
                          onBlur={(e)  => { e.target.style.borderColor = C.border; e.target.style.boxShadow = "none"; }}
                        />
                      )}
                    </fieldset>

                    {/* Actions */}
                    <div className="flex flex-col-reverse sm:flex-row gap-3 items-stretch sm:items-center flex-wrap pt-[22px]" style={{ borderTop: `1px solid ${C.border}` }}>
                      <button
                        type="button"
                        onClick={handleUnsubscribe}
                        disabled={submitting}
                        style={{ minHeight: 48, padding: "13px 22px", fontSize: 14, fontWeight: 600, background: "transparent", color: C.textSec, border: `1.5px solid ${C.border}`, borderRadius: 10, cursor: "pointer", fontFamily: "inherit", transition: "all 150ms ease" }}
                        onMouseEnter={(e) => { const b = e.currentTarget; b.style.borderColor = C.textSec; b.style.color = C.text; b.style.background = "#FAFAFA"; }}
                        onMouseLeave={(e) => { const b = e.currentTarget; b.style.borderColor = C.border; b.style.color = C.textSec; b.style.background = "transparent"; }}
                        onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.97)"; }}
                        onMouseUp={(e)   => { e.currentTarget.style.transform = ""; }}
                      >
                        {submitting ? "Unsubscribing..." : "Unsubscribe"}
                      </button>
                      <button
                        type="button"
                        onClick={() => router.push("/")}
                        className="flex-1"
                        style={{ minHeight: 48, padding: "13px 22px", fontSize: 15, fontWeight: 700, background: C.pink, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontFamily: "inherit", transition: "all 150ms ease" }}
                        onMouseEnter={(e) => { e.currentTarget.style.filter = "brightness(0.93)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.filter = ""; }}
                        onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.97)"; }}
                        onMouseUp={(e)   => { e.currentTarget.style.transform = ""; }}
                      >
                        Keep me subscribed
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ── STATE 2: Unsubscribed ── */}
              {uiState === "unsubscribed" && (
                <div
                  ref={successRef}
                  tabIndex={-1}
                  className="animate-fade-in flex flex-col items-center text-center px-6 py-14 sm:px-10 sm:py-14"
                  role="status"
                  aria-live="polite"
                >
                  <div style={{ width: 72, height: 72, borderRadius: "50%", background: C.greenLight, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, position: "relative" }} aria-hidden="true">
                    <div style={{ position: "absolute", inset: -6, borderRadius: "50%", border: `2px solid ${C.green}`, opacity: 0.25 }} />
                    <CheckIcon />
                  </div>
                  <h2 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.02em", color: C.text, marginBottom: 10, lineHeight: 1.2 }}>
                    You've been unsubscribed
                  </h2>
                  <p style={{ fontSize: 15, color: C.textSec, lineHeight: 1.6, maxWidth: 380, marginBottom: 28 }}>
                    We won't send any more waitlist emails to <strong style={{ color: C.text, fontWeight: 600 }}>{email}</strong>. Thank you for the time you spent with us.
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <button
                      type="button"
                      onClick={handleResubscribe}
                      style={{ background: "transparent", border: `1.5px solid ${C.border}`, color: C.text, fontFamily: "inherit", fontSize: 14, fontWeight: 600, cursor: "pointer", padding: "11px 22px", borderRadius: 10, transition: "all 150ms ease", display: "inline-flex", alignItems: "center", gap: 8 }}
                      onMouseEnter={(e) => { const b = e.currentTarget; b.style.borderColor = C.pink; b.style.color = C.pink; b.style.background = C.pinkLight; }}
                      onMouseLeave={(e) => { const b = e.currentTarget; b.style.borderColor = C.border; b.style.color = C.text; b.style.background = "transparent"; }}
                      onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.97)"; }}
                      onMouseUp={(e)   => { e.currentTarget.style.transform = ""; }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>
                      Changed your mind? Resubscribe
                    </button>
                  </div>
                  <p style={{ marginTop: 28, fontSize: 13, color: C.textTert }}>
                    <a href="/" style={{ color: C.textSec, textDecoration: "underline", textUnderlineOffset: 3, fontWeight: 500 }}>Back to petamor.co.uk</a>
                  </p>
                </div>
              )}

              {/* ── STATE 3: Resubscribed ── */}
              {uiState === "resubscribed" && (
                <div
                  ref={resubRef}
                  tabIndex={-1}
                  className="animate-fade-in flex flex-col items-center text-center px-6 py-14 sm:px-10 sm:py-14"
                  role="status"
                  aria-live="polite"
                >
                  <div style={{ width: 72, height: 72, borderRadius: "50%", background: C.pinkLight, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, position: "relative" }} aria-hidden="true">
                    <div style={{ position: "absolute", inset: -6, borderRadius: "50%", border: `2px solid ${C.pink}`, opacity: 0.20 }} />
                    <HeartIcon />
                  </div>
                  <h2 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.02em", color: C.text, marginBottom: 10 }}>
                    Welcome <span style={{ color: C.pink }}>back.</span>
                  </h2>
                  <p style={{ fontSize: 15, color: C.textSec, lineHeight: 1.6, maxWidth: 380 }}>
                    You're back on the waitlist. We'll be in touch with launch news and the occasional pet-care tip.
                  </p>
                  <p style={{ marginTop: 28, fontSize: 13, color: C.textTert }}>
                    <a href="/" style={{ color: C.textSec, textDecoration: "underline", textUnderlineOffset: 3, fontWeight: 500 }}>Back to petamor.co.uk</a>
                  </p>
                </div>
              )}

            </div>
          </main>
          <SiteFooter />
        </div>
      </div>
    </>
  );
}
