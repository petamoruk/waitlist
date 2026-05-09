import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { sendWaitlistConfirmation } from "@/lib/resend";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Simple in-memory rate limiter: max 5 requests per IP per 60 seconds.
// Note: resets per serverless instance — protects against bursts, not distributed floods.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now >= entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count++;
  return false;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    null;

  if (isRateLimited(ip ?? "unknown")) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let email: string;
  let source: string | null = null;
  let petType = "pet";
  try {
    const body = await req.json();
    email = (body.email ?? "").trim().toLowerCase().slice(0, 254);
    source = typeof body.source === "string" ? body.source.trim().slice(0, 64) || null : null;
    if (typeof body.petType === "string" && /^[a-z]{1,32}$/.test(body.petType)) {
      petType = body.petType;
    }
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 422 });
  }

  const { error: dbError } = await getSupabase()
    .from("waitlist")
    .insert({ email, source, ip });

  if (dbError) {
    if (dbError.code === "23505") {
      return NextResponse.json({ ok: true, alreadyJoined: true }, { status: 200 });
    }
    console.error("Supabase error:", dbError);
    return NextResponse.json(
      { error: "Something went wrong. Let's try that again." },
      { status: 500 }
    );
  }

  /* Send confirmation email — failure must not fail the request */
  let emailSent = false;
  try {
    await sendWaitlistConfirmation(email, petType);
    emailSent = true;
  } catch (err) {
    console.error("Resend error:", err);
  }

  if (emailSent) {
    await getSupabase()
      .from("waitlist")
      .update({ email_sent: true })
      .eq("email", email);
  }

  return NextResponse.json({ ok: true, alreadyJoined: false }, { status: 200 });
}
