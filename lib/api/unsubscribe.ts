interface UnsubscribePayload {
  token?: string;
  email?: string;
  reason?: string;
}

export async function submitUnsubscribe(payload: UnsubscribePayload): Promise<void> {
  await fetch("/api/unsubscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function submitResubscribe(email: string): Promise<void> {
  await fetch("/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, source: "resubscribe" }),
  });
}
