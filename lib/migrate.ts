// lib/migrate.ts
import pool from "./db";

async function migrate() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS articles (
      id        SERIAL PRIMARY KEY,
      title     TEXT NOT NULL,
      summary   TEXT NOT NULL,
      link      TEXT NOT NULL,
      source    TEXT DEFAULT 'aibusiness.com',
      date      TEXT,
      category  TEXT DEFAULT 'AI',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
  console.log("✅ Table created");
  await pool.end();
}

migrate();