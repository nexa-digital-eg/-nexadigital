-- Nexa Digital — database schema (Neon Postgres)
-- The app creates this table automatically on first form submission,
-- but you can run it manually in the Neon SQL editor if you prefer.

CREATE TABLE IF NOT EXISTS leads (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  phone       TEXT,
  email       TEXT,
  service     TEXT,
  message     TEXT NOT NULL,
  locale      TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- View the latest leads:
--   SELECT name, phone, email, service, message, created_at
--   FROM leads ORDER BY created_at DESC;
