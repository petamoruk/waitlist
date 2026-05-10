import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  let body: { name?: string; email?: string; subject?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 422 });
  }

  const name    = (body.name    ?? "").trim().slice(0, 100) || null;
  const subject = (body.subject ?? "").trim().slice(0, 200) || null;
  const message = (body.message ?? "").trim().slice(0, 5000) || null;

  try {
    await getSupabase()
      .from("contact_messages")
      .insert({ name, email, subject, message });
  } catch (err) {
    console.error("Contact form DB error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}