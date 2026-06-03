import { NextResponse } from "next/server";
import { insertLead } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clean(value: unknown, max: number): string {
  return String(value ?? "").trim().slice(0, max);
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
    }

    // Honeypot — bots fill hidden fields; humans never see it.
    if (clean((body as Record<string, unknown>).company, 100) !== "") {
      return NextResponse.json({ ok: true, stored: false });
    }

    const b = body as Record<string, unknown>;
    const name = clean(b.name, 120);
    const phone = clean(b.phone, 40);
    const email = clean(b.email, 160);
    const service = clean(b.service, 80);
    const message = clean(b.message, 2000);
    const locale = clean(b.locale, 5);

    // Require a name, a message, and at least one way to reach back.
    if (!name || !message || (!phone && !email)) {
      return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
    }

    const { stored } = await insertLead({
      name,
      phone,
      email,
      service,
      message,
      locale,
    });

    return NextResponse.json({ ok: true, stored });
  } catch (err) {
    console.error("[contact] failed to store lead:", err);
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
