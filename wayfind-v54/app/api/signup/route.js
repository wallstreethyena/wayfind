// Wayfind signup endpoint.
// Logs the email to Vercel function logs immediately (visible in your Vercel dashboard).
// Set SIGNUP_WEBHOOK_URL in Vercel env vars to forward to a Google Sheet, Zapier,
// Make.com, or any webhook that accepts a JSON POST — no extra code needed.
export async function POST(req) {
  try {
    const body = await req.json();
    const { email, likes = 0, signals: sigCount = 0 } = body || {};
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return Response.json({ error: "Valid email required" }, { status: 400 });
    }
    const entry = { email: email.trim().toLowerCase(), likes, signals: sigCount, ts: new Date().toISOString() };
    // Always log — visible in Vercel → your project → Functions → Logs
    console.log("[wayfind signup]", JSON.stringify(entry));
    // Forward to webhook if configured
    const webhook = process.env.SIGNUP_WEBHOOK_URL;
    if (webhook) {
      try {
        await fetch(webhook, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(entry),
        });
      } catch (e) {
        console.error("[wayfind signup webhook error]", e?.message);
      }
    }
    return Response.json({ ok: true });
  } catch (e) {
    console.error("[wayfind signup error]", e?.message);
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}
