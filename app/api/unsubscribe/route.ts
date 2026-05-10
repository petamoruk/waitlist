import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { isValidEmail } from "@/lib/validation";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(req: NextRequest) {
  let token: string | null = null;
  let email: string | null = null;
  let reason: string | null = null;
  try {
    const body = await req.json();
    token  = typeof body.token  === "string" ? body.token.trim()  : null;
    email  = typeof body.email  === "string" ? body.email.trim().toLowerCase().slice(0, 254) : null;
    reason = typeof body.reason === "string" ? body.reason.trim().slice(0, 500) || null : null;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  /* Token-based lookup (preferred — cryptographically verified) */
  if (token) {
    if (!UUID_RE.test(token)) {
      return NextResponse.json({ error: "Invalid token." }, { status: 422 });
    }
    const { error } = await getSupabase()
      .from("waitlist")
      .update({ is_subscribed: false, unsubscribe_reason: reason })
      .eq("unsubscribe_token", token);

    if (error) console.error("Unsubscribe error:", error);
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  /* Fallback: email-only (for older links without a token) */
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email or token." }, { status: 422 });
  }

  const { error } = await getSupabase()
    .from("waitlist")
    .update({ is_subscribed: false, unsubscribe_reason: reason })
    .eq("email", email);

  if (error) console.error("Unsubscribe error:", error);
  return NextResponse.json({ ok: true }, { status: 200 });
}
