-- What the athlete actually thought of each meal.
--
-- Ratings have been in the product for a while and have only ever existed in localStorage, so
-- they do not follow a parent to their phone and a cleared browser loses them. They also feed
-- auto-fill, which only offers meals rated three or better, so a second device plans the week
-- from our guesses rather than from what the child will actually eat.
--
-- A table rather than another key inside players.preferences, for two reasons. Whole-record
-- last-write-wins would mean rating one meal on a phone discarding every rating made on the
-- laptop since. And if "what other families like" is ever built, it needs rows to aggregate,
-- not a jsonb blob per player.
--
-- Run in the Supabase SQL Editor.

create table if not exists public.meal_ratings (
  id          uuid primary key default uuid_generate_v4(),
  player_id   uuid not null references public.players(id) on delete cascade,
  meal_slug   text not null,
  rating      int  not null check (rating between 1 and 5),
  updated_at  timestamptz not null default now(),
  unique (player_id, meal_slug)
);

create index if not exists meal_ratings_player_idx on public.meal_ratings (player_id);

comment on table public.meal_ratings is
  'One row per player per meal slug. meal_slug references the catalogue in src/data/meals.ts by slug rather than by foreign key, because the catalogue ships with the app and is not stored here. Rows for slugs that no longer exist are harmless and ignored by the client.';

alter table public.meal_ratings enable row level security;

-- Same shape as the hydration policy in 0002: scoped to players in a family this user owns.
create policy "meal_ratings_owner_all" on public.meal_ratings
  for all using (
    player_id in (
      select p.id from public.players p
      join public.families f on f.id = p.family_id
      where f.owner_id = auth.uid()
    )
  ) with check (
    player_id in (
      select p.id from public.players p
      join public.families f on f.id = p.family_id
      where f.owner_id = auth.uid()
    )
  );
