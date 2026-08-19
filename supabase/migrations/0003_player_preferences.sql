-- Player preferences: hidden meals and the recurring weekly schedule.
--
-- Both currently live in localStorage only (src/lib/player/preferences.ts and
-- src/lib/player/schedule.ts). That was deliberate: the profile round-trips through
-- Supabase and players had no column for either, so hanging them off the profile would have
-- meant a signed-in device silently wiping them on first remote load.
--
-- Applying this migration does not by itself make them sync. The client still has to write
-- them, which is intentionally not wired up yet: nobody has completed a sign-in on this
-- project since the outage, so that code path cannot be runtime-verified. Wire it after
-- sign-in is confirmed working end to end.
--
-- Run in the Supabase SQL Editor.

alter table public.players
  add column if not exists preferences jsonb not null default '{}'::jsonb;

comment on column public.players.preferences is
  'Client-owned preferences. Expected shape: { "excludedMeals": ["slug", ...], "weeklySchedule": ["rest","school",...7 day types] }. Read and written whole by the client; the server does not interpret it.';

-- No new RLS policy needed. players is already scoped by family ownership in
-- 0002_rls_policies.sql, and this column inherits that.
--
-- Deliberately one jsonb column rather than two tables: these are small, always read
-- together, always written by the one client that owns them, and never queried across
-- families. A join table would be ceremony for no benefit.
