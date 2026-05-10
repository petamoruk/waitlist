export async function submitWaitlist(email: string, source: string, petType: string) {
  const res = await fetch("/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, source, petType }),
  });
  const data: { error?: string; alreadyJoined?: boolean } = await res.json();
  return { ok: res.ok, data };
}
