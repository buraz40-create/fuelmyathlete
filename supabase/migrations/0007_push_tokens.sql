-- Where to send a reminder.
--
-- One row per device per player, because a household can have two parents with a phone each and
-- both should get the Saturday reminder. The token is what Firebase hands the app on
-- registration, and it changes: on reinstall, on clearing app data, and occasionally on its own.
-- So the unique key is the token itself and rows are upserted rather than inserted.
--
-- Nothing here is a schedule. What gets sent, and when, is deliberately not modelled yet: the
-- roadmap rejected hydration streaks because a mechanism whose purpose is pushing a child to
-- drink more every day is incoherent alongside a logging cap that exists for hyponatremia risk.
-- The same caution applies to anything that buzzes a phone about a child's eating. This table
-- only records where a message could go.
--
-- Run in the Supabase SQL Editor.

create table if not exists public.push_tokens (
  id          uuid primary key default uuid_generate_v4(),
  player_id   uuid not null references public.players(id) on delete cascade,
  user_id     uuid not null references auth.users(id) on delete cascade,
  token       text not null unique,
  platform    text not null check (platform in ('android', 'ios', 'web')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists push_tokens_player_idx on public.push_tokens (player_id);

comment on table public.push_tokens is
  'Firebase registration tokens, one per device. Tokens rotate, so the client upserts on token rather than inserting.';

alter table public.push_tokens enable row level security;

-- Scoped through membership, like everything else since 0005. A parent can register their own
-- device against a player in their household and can see and remove their own devices.
drop policy if exists "push_tokens_member_all" on public.push_tokens;
create policy "push_tokens_member_all" on public.push_tokens
  for all using (
    player_id in (
      select p.id from public.players p
      where p.family_id in (select public.my_family_ids())
    )
  ) with check (
    player_id in (
      select p.id from public.players p
      where p.family_id in (select public.my_family_ids())
    )
    and user_id = auth.uid()
  );
