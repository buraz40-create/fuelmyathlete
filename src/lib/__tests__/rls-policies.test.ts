import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

// Migrations are never type checked and never imported, and a wrong policy fails silently in
// the most expensive way: the app works for whoever wrote it and shows nothing to everybody
// else. This codebase has already had one version of that, where sign-in worked and no row was
// ever written, and production sat at 1 user and 0 families.
//
// Since 0005 a family can have more than one parent, and access is authorised through
// family_members rather than families.owner_id. The failure this guards is somebody adding a
// table later, copying the older policy shape because it is right there in 0002, and quietly
// making that table single-parent again.

const DIR = join("supabase", "migrations");

function migrations(): { name: string; sql: string }[] {
  return readdirSync(DIR)
    .filter((f) => f.endsWith(".sql"))
    .sort()
    .map((name) => ({ name, sql: readFileSync(join(DIR, name), "utf8") }));
}

/** Each `create policy` statement, up to its terminating semicolon. */
function policies(sql: string): string[] {
  return [...sql.matchAll(/create policy[\s\S]*?;/g)].map((m) => m[0]);
}

// Two policies name owner_id on purpose, and both are about the family row itself rather than
// about the data inside it.
const DELIBERATE_OWNER_POLICIES = ["families_self_insert", "families_owner_delete"];

test("policies written from 0005 onward authorise through membership, not ownership", () => {
  const offenders: string[] = [];

  for (const { name, sql } of migrations()) {
    // 0002 and 0004 predate multi-parent families and their policies are dropped and replaced
    // by 0005. Anything from 0005 onward is the current model.
    if (name < "0005") continue;

    for (const policy of policies(sql)) {
      const named = DELIBERATE_OWNER_POLICIES.some((p) => policy.includes(p));
      if (named) continue;
      if (/owner_id\s*=\s*auth\.uid\(\)/.test(policy)) {
        const title = policy.match(/create policy\s+"([^"]+)"/)?.[1] ?? policy.slice(0, 60);
        offenders.push(`${name}: ${title} scopes by owner_id instead of my_family_ids()`);
      }
    }
  }

  assert.deepEqual(
    offenders,
    [],
    offenders.join("\n") +
      "\n\nUse `in (select public.my_family_ids())`. Scoping by owner_id means only the parent " +
      "who created the family can see the row, which is the bug 0005 exists to fix."
  );
});

test("0005 supersedes every family-scoped policy that came before it", () => {
  // A policy left behind is not a security hole, since policies are OR'd, but it is a second
  // description of who can see what, and the next person has to work out which one is live.
  const all = migrations();
  const latest = all.find((m) => m.name.startsWith("0005"));
  assert.ok(latest, "0005 should exist");

  const olderPolicyNames = all
    .filter((m) => m.name < "0005")
    .flatMap((m) => policies(m.sql))
    .map((p) => p.match(/create policy\s+"([^"]+)"/)?.[1])
    .filter((n): n is string => Boolean(n))
    // The catalogue tables are readable by any signed-in user and have nothing to do with
    // families, so they are not superseded.
    .filter((n) => !n.startsWith("catalog_"))
    .filter((n) => !n.startsWith("teams_") && !n.startsWith("team_"));

  const notDropped = olderPolicyNames.filter(
    (n) => !latest!.sql.includes(`drop policy if exists "${n}"`)
  );

  assert.deepEqual(
    notDropped,
    [],
    `these older policies are still live alongside the membership ones: ${notDropped.join(", ")}`
  );
});

test("the security definer helpers are not executable by anonymous callers", () => {
  // my_family_ids and owns_family bypass RLS by design, which is the only way to avoid infinite
  // recursion in a policy on the membership table. That makes their grants load-bearing.
  const sql = migrations().find((m) => m.name.startsWith("0005"))!.sql;

  for (const fn of ["public.my_family_ids()", "public.owns_family(uuid)"]) {
    assert.match(
      sql,
      new RegExp(`revoke all on function ${fn.replace(/[().]/g, "\\$&")} from public`),
      `${fn} should have its default public execute grant revoked`
    );
    assert.match(
      sql,
      new RegExp(`grant execute on function ${fn.replace(/[().]/g, "\\$&")} to authenticated`),
      `${fn} should be granted only to authenticated`
    );
  }
});

test("every security definer function pins its search_path", () => {
  // Without `set search_path`, a definer function resolves unqualified names against the
  // caller's search_path, which is the classic way one of these turns into a privilege
  // escalation.
  for (const { name, sql } of migrations()) {
    const definers = [...sql.matchAll(/create or replace function[\s\S]*?\$[a-z]*\$/g)].map(
      (m) => m[0]
    );
    for (const fn of definers) {
      if (!/security definer/i.test(fn)) continue;
      const title = fn.match(/function\s+([\w.]+)/)?.[1] ?? "unknown";
      assert.match(fn, /set search_path/i, `${name}: ${title} should pin search_path`);
    }
  }
});
