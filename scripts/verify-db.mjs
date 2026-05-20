#!/usr/bin/env node
import pg from "pg";

const connStr = process.argv[2] ?? process.env.SUPABASE_DB_URL;
const client = new pg.Client({
  connectionString: connStr,
  ssl: { rejectUnauthorized: false },
});

try {
  await client.connect();

  const tables = await client.query(
    "select table_name from information_schema.tables where table_schema = 'public' order by table_name"
  );
  console.log("Public tables:", tables.rows.map((r) => r.table_name).join(", "));

  const counts = await client.query(`
    select
      (select count(*) from public.meals) as meals,
      (select count(*) from public.ingredients) as ingredients,
      (select count(*) from public.recipes) as recipes,
      (select count(*) from public.recipe_steps) as recipe_steps,
      (select count(*) from public.families) as families,
      (select count(*) from public.players) as players;
  `);
  console.log("Row counts:", counts.rows[0]);

  const trigger = await client.query(`
    select trigger_name, event_manipulation, action_timing
    from information_schema.triggers
    where trigger_name = 'on_auth_user_created';
  `);
  console.log("Auth trigger:", trigger.rows.length > 0 ? trigger.rows[0] : "MISSING");
} finally {
  await client.end();
}
