interface ContactPayload {
  name?: string;
  email: string;
  subject?: string;
  message?: string;
}

export async function submitContact(payload: ContactPayload): Promise<boolean> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.ok;
}
