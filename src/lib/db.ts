import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

/**
 * Lightweight Neon Postgres access layer.
 *
 * The connection string is read from the DATABASE_URL environment variable
 * (set automatically by the Vercel ↔ Neon integration, or locally in .env).
 * If it is missing, the app keeps working — the contact form simply falls
 * back to WhatsApp/Email without persisting the lead.
 */

let cached: NeonQueryFunction<false, false> | null = null;

export function getSql(): NeonQueryFunction<false, false> | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (!cached) cached = neon(url);
  return cached;
}

export type LeadInput = {
  name: string;
  phone?: string;
  email?: string;
  service?: string;
  message: string;
  locale?: string;
};

/** Create the leads table on first use (idempotent). */
async function ensureLeadsTable(sql: NeonQueryFunction<false, false>) {
  await sql`
    CREATE TABLE IF NOT EXISTS leads (
      id          SERIAL PRIMARY KEY,
      name        TEXT NOT NULL,
      phone       TEXT,
      email       TEXT,
      service     TEXT,
      message     TEXT NOT NULL,
      locale      TEXT,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
}

/**
 * Persist a contact lead. Returns whether it was actually stored
 * (false when no database is configured).
 */
export async function insertLead(lead: LeadInput): Promise<{ stored: boolean }> {
  const sql = getSql();
  if (!sql) return { stored: false };

  await ensureLeadsTable(sql);
  await sql`
    INSERT INTO leads (name, phone, email, service, message, locale)
    VALUES (
      ${lead.name},
      ${lead.phone ?? null},
      ${lead.email ?? null},
      ${lead.service ?? null},
      ${lead.message},
      ${lead.locale ?? null}
    )
  `;
  return { stored: true };
}
