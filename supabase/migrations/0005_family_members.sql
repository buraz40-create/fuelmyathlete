-- A family can have more than one parent.
--
-- families.owner_id is a single uuid, and every policy in 0002 asks "is this row's family owned
-- by me". So a second parent cannot see the plan at all: not to read it, not to tick the
-- grocery list in the shop while the other one is at home. For a product whose whole job is the
-- week's food in a household, one adult per household is the wrong shape.
--
-- owner_id stays. It still records who created the family and who would be billed, and it is
-- what this migration backfills from. Membership is what authorises access from here on.
--
-- Run in the Supabase SQL Editor. Written to be safe to run twice.

-- =========================================================
-- MEMBERSHIP
-- =========================================================

create table if not exists public.family_members (
  id          uuid primary key default uuid_generate_v4(),
  family_id   uuid not null references public.families(id) on delete cascade,
  user_id     uuid not null references auth.users(id) on delete cascade,
  role        text not null default 'parent' check (role in ('owner', 'parent')),
  created_at  timestamptz not null default now(),
  unique (family_id, user_id)
);

create index if not exists family_members_user_idx on public.family_members (user_id);

comment on table public.family_members is
  'Who may act on a family. Backfilled from families.owner_id. owner_id is retained as the record of who created the family, but authorisation reads this table.';

-- Everyone who owns a family today becomes its owner-member. Idempotent.
insert into public.family_members (family_id, user_id, role)
select f.id, f.owner_id, 'owner' from public.families f
on conflict (family_id, user_id) do nothing;

-- =========================================================
-- THE HELPER, AND WHY IT IS SECURITY DEFINER
-- =========================================================
--
-- A policy on family_members that selects from family_members recurses, and Postgres raises
-- "infinite recursion detected in policy for relation family_members". A security definer
-- function runs as its owner and is not subject to RLS, which breaks the loop.
--
-- It is deliberately narrow: no arguments, returns only the caller's own family ids, reads
-- nothing else. There is no way to ask it about another user.

create or replace function public.my_family_ids()
returns setof uuid
language sql
security definer
stable
set search_path = public
as $fn$
  select family_id from public.family_members where user_id = auth.uid()
$fn$;

revoke all on function public.my_family_ids() from public;
grant execute on function public.my_family_ids() to authenticated;

-- A second helper, for the same reason. Policies are subject to RLS inside their own
-- subqueries, so "is this a family I own" cannot be answered by selecting from families: the
-- select is itself filtered by the families policy, which requires membership, which is the
-- thing being bootstrapped. That returns nothing and the insert fails.
create or replace function public.owns_family(fid uuid)
returns boolean
language sql
security definer
stable
set search_path = public
as $own$
  select exists (
    select 1 from public.families f where f.id = fid and f.owner_id = auth.uid()
  )
$own$;

revoke all on function public.owns_family(uuid) from public;
grant execute on function public.owns_family(uuid) to authenticated;

-- =========================================================
-- POLICIES REWRITTEN AROUND MEMBERSHIP
-- =========================================================
-- Dropped by name and recreated, so this file is a single description of who can see what
-- rather than a diff against 0002.

alter table public.family_members enable row level security;

drop policy if exists "family_members_self_read" on public.family_members;
create policy "family_members_self_read" on public.family_members
  for select using (family_id in (select public.my_family_ids()));

-- You may add yourself to a family you already own, and to nothing else.
--
-- This exists because the app provisions on demand as well as through the signup trigger: an
-- account the trigger missed creates its own family on first sync, and without this it would
-- then be unable to record itself as a member of the family it just made. Sign-in would work
-- and nothing would be written, which is the exact failure this codebase has already had once.
--
-- It does not let a second parent in. owns_family is true only for the creator, so joining
-- somebody else's household still needs a redemption path that checks an invite, which does
-- not exist yet.
drop policy if exists "family_members_bootstrap_self" on public.family_members;
create policy "family_members_bootstrap_self" on public.family_members
  for insert with check (user_id = auth.uid() and public.owns_family(family_id));

-- No update or delete policy. Removing a parent from a household is a real decision and should
-- go through something deliberate rather than a stray request from a client.

-- Split by command rather than one "for all", because insert is the odd one out: at the moment
-- a family is created the creator is not yet a member of it, so a membership check would
-- reject the very first write.
drop policy if exists "families_owner_all" on public.families;
drop policy if exists "families_member_all" on public.families;

create policy "families_member_read" on public.families
  for select using (id in (select public.my_family_ids()));

create policy "families_self_insert" on public.families
  for insert with check (owner_id = auth.uid());

create policy "families_member_update" on public.families
  for update using (id in (select public.my_family_ids()))
  with check (id in (select public.my_family_ids()));

-- Deleting a household is the owner's call, not any member's.
create policy "families_owner_delete" on public.families
  for delete using (owner_id = auth.uid());

drop policy if exists "players_family_owner_all" on public.players;
create policy "players_family_member_all" on public.players
  for all using (family_id in (select public.my_family_ids()))
  with check (family_id in (select public.my_family_ids()));

drop policy if exists "meal_plans_family_owner_all" on public.meal_plans;
create policy "meal_plans_family_member_all" on public.meal_plans
  for all using (family_id in (select public.my_family_ids()))
  with check (family_id in (select public.my_family_ids()));

drop policy if exists "meal_plan_entries_owner_all" on public.meal_plan_entries;
create policy "meal_plan_entries_member_all" on public.meal_plan_entries
  for all using (
    meal_plan_id in (
      select mp.id from public.meal_plans mp
      where mp.family_id in (select public.my_family_ids())
    )
  ) with check (
    meal_plan_id in (
      select mp.id from public.meal_plans mp
      where mp.family_id in (select public.my_family_ids())
    )
  );

drop policy if exists "grocery_check_state_owner_all" on public.grocery_check_state;
create policy "grocery_check_state_member_all" on public.grocery_check_state
  for all using (
    meal_plan_id in (
      select mp.id from public.meal_plans mp
      where mp.family_id in (select public.my_family_ids())
    )
  ) with check (
    meal_plan_id in (
      select mp.id from public.meal_plans mp
      where mp.family_id in (select public.my_family_ids())
    )
  );

drop policy if exists "hydration_logs_owner_all" on public.hydration_logs;
create policy "hydration_logs_member_all" on public.hydration_logs
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
  );

drop policy if exists "energy_logs_owner_all" on public.energy_logs;
create policy "energy_logs_member_all" on public.energy_logs
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
  );

-- meal_ratings only exists once 0004 has been run. Guarded, so the order of the two does not
-- matter and neither has to be run twice.
do $mr$
begin
  if to_regclass('public.meal_ratings') is not null then
    drop policy if exists "meal_ratings_owner_all" on public.meal_ratings;
    drop policy if exists "meal_ratings_member_all" on public.meal_ratings;
    create policy "meal_ratings_member_all" on public.meal_ratings
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
      );
  end if;
end $mr$;

-- =========================================================
-- SIGNUP TRIGGER
-- =========================================================
-- The new family needs its creator as a member, or the account it just created would be
-- invisible to the person who created it.

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer
set search_path = public
as $tr$
declare new_family_id uuid;
begin
  insert into public.families (name, owner_id)
  values (coalesce(new.raw_user_meta_data->>'family_name', 'My Family'), new.id)
  returning id into new_family_id;

  insert into public.family_members (family_id, user_id, role)
  values (new_family_id, new.id, 'owner')
  on conflict (family_id, user_id) do nothing;

  insert into public.players (family_id, name, sport)
  values (new_family_id, coalesce(new.raw_user_meta_data->>'player_name', 'My Athlete'), 'soccer');

  return new;
end $tr$;
