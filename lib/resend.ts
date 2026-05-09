import "server-only";
import { Resend } from "resend";

let _resend: Resend | null = null;

function getResend(): Resend {
    if (_resend) return _resend;
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error("Missing required env var: RESEND_API_KEY");
    _resend = new Resend(apiKey);
    return _resend;
}

export async function sendWaitlistConfirmation(email: string, petType = "pet"): Promise<void> {
    const from = process.env.RESEND_FROM_EMAIL;
    if (!from) throw new Error("Missing required env var: RESEND_FROM_EMAIL");

    const { error } = await getResend().emails.send(
        {
            from,
            to: [email],
            subject: "You're on the list",
            html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f7f3f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f3f0;padding:40px 16px">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.06)">
        <tr><td style="background:#e85d75;padding:32px 40px;text-align:center">
          <span style="font-size:28px;font-weight:900;color:#ffffff;letter-spacing:-0.03em">Pet Amor</span>
        </td></tr>
        <tr><td style="padding:40px 40px 32px">
          <p style="margin:0 0 16px;font-size:22px;font-weight:800;color:#1f1f1f;letter-spacing:-0.02em">You're on the list! 🎉</p>
          <p style="margin:0 0 24px;font-size:16px;color:#6b6b6b;line-height:1.6">
            Thanks for signing up — you'll hear from us as soon as Pet Amor launches in the UK. We'll be in touch with early access details before anyone else.
          </p>
          <p style="margin:0;font-size:14px;color:#9e9e9e;line-height:1.5">
            In the meantime, sit tight — and give your ${petType} an extra cuddle from us. 🐾
          </p>
        </td></tr>
        <tr><td style="padding:0 40px 40px;border-top:1px solid #ede6df">
          <p style="margin:24px 0 0;font-size:12px;color:#9e9e9e">
            You're receiving this because you signed up at <a href="https://petamor.co.uk" style="color:#e85d75;text-decoration:none">petamor.co.uk</a>.
            If this wasn't you, you can safely ignore this email.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
            tags: [{ name: "category", value: "waitlist" }],
            headers: {
                "List-Unsubscribe": "<mailto:hello@petamor.co.uk?subject=unsubscribe>",
            },
        },
        { idempotencyKey: `waitlist-confirmation/${email}` }
    );

    if (error) {
        throw new Error(`Resend error: ${error.message}`);
    }
}
