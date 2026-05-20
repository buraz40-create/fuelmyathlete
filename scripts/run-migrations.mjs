#!/usr/bin/env node
// One-off migration runner. Usage:
//   SUPABASE_DB_URL='postgresql://postgres:PASSWORD@db.PROJECT.supabase.co:5432/postgres' \
//     node scripts/run-migrations.mjs
// Or pass connection string as first arg.

import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "..");

const FILES = [
  "supabase/migrations/0001_init_schema.sql",
  "supabase/migrations/0002_rls_policies.sql",
  "supabase/seed-meals.sql",
];

const connStr = process.argv[2] ?? process.env.SUPABASE_DB_URL;
if (!connStr) {
  console.error("Pass connection string as arg or SUPABASE_DB_URL env var.");
  process.exit(1);
}

const client = new pg.Client({
  connectionString: connStr,
  ssl: { rejectUnauthorized: false },
});

try {
  await client.connect();
  console.log("Connected to Postgres.");

  for (const file of FILES) {
    const path = resolve(projectRoot, file);
    const sql = readFileSync(path, "utf8");
    console.log(`\n→ Running ${file} (${sql.length} chars)...`);
    try {
      await client.query(sql);
      console.log(`  OK ${file}`);
    } catch (err) {
      console.error(`  FAIL ${file}: ${err.message}`);
      if (err.position) console.error(`     at char ${err.position}`);
      throw err;
    }
  }

  console.log("\nAll migrations applied successfully.");
} finally {
  await client.end();
}
