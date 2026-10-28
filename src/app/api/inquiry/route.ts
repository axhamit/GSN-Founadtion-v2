import { NextResponse } from "next/server";

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }

  if (clean(body.website, 50)) return NextResponse.json({ ok: true }); // honeypot

  const payload = {
    name: clean(body.name, 100),
    phone: clean(body.phone, 20),
    email: clean(body.email, 120),
    course: clean(body.course, 100),
    message: clean(body.message, 1000),
    receivedAt: new Date().toISOString(),
  };
  if (!payload.name || !/^[0-9+()\-\s]{7,20}$/.test(payload.phone))
    return NextResponse.json({ error: "Please enter your name and a valid phone number." }, { status: 400 });
  if (payload.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(payload.email))
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });

  const hook = process.env.INQUIRY_WEBHOOK_URL;
  if (!hook) return NextResponse.json({ error: "Inquiry delivery is not configured yet. Please call or email us." }, { status: 503 });

  try {
    const r = await fetch(hook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (!r.ok) throw new Error("upstream");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "We could not send your inquiry. Please try again or call us." }, { status: 502 });
  }
}
