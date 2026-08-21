-- Inviting the second parent.
--
-- 0005 made a household able to have more than one parent and deliberately left no way to add
-- one, because any policy permissive enough for the client to insert a family_members row is
-- permissive enough for anyone who learns a family id to add themselves to that household.
--
-- So membership is still not directly insertable by another user. Joining goes through a code
-- that the existing parent creates and hands over, and a security definer function that checks
-- it. The function is the only thing in the database that can add a member who is not already
-- the family's owner.
--
-- Run in the Supabase SQL Editor, after 0005. Safe to run twice.

create table if not exists public.family_invites (
  id          uuid primary key default uuid_generate_v4(),
  family_id   uuid not null references public.families(id) on delete cascade,
  code        text not null unique,
  created_by  uuid not null references auth.users(id) on delete cascade,
  created_at  timestamptz not null default now(),
  -- Short-lived on purpose. An invite to join a household is not a thing that should sit valid
  -- in a text message thread for a year.
  expires_at  timestamptz not null default (now() + interval '7 days'),
  redeemed_by uuid references auth.users(id) on delete set null,
  redeemed_at timestamptz
);

create index if not exists family_invites_family_idx on public.family_invites (family_id);

comment on table public.family_invites is
  'Single-use codes for joining a family. Codes are never looked up directly by the client: redemption goes through redeem_family_invite, which is the only path that can add a member.';

alter table public.family_invites enable row level security;

-- Members of a family can see and create invites for their own family, which is what makes the
-- settings screen able to show a pending invite and revoke it.
--
-- Critically there is no policy that lets anyone select an invite by code. Without that, a
-- stranger cannot confirm whether a guessed code exists, and cannot read who created it or
-- which household it belongs to. The only way a code does anything is through the function
-- below, which answers with a family id or an error and nothing else.
drop policy if exists "family_invites_member_read" on public.family_invites;
create policy "family_invites_member_read" on public.family_invites
  for select using (family_id in (select public.my_family_ids()));

drop policy if exists "family_invites_member_create" on public.family_invites;
create policy "family_invites_member_create" on public.family_invites
  for insert with check (
    family_id in (select public.my_family_ids()) and created_by = auth.uid()
  );

drop policy if exists "family_invites_member_delete" on public.family_invites;
create policy "family_invites_member_delete" on public.family_invites
  for delete using (family_id in (select public.my_family_ids()));

-- =========================================================
-- REDEMPTION
-- =========================================================
--
-- Security definer because it has to do the one thing no policy allows: insert a membership row
-- for a family the caller has no relationship to yet.
--
-- Everything it will not do is as important as what it does. It takes only a code. It never
-- returns anything about a household the caller failed to join, so a wrong code is
-- indistinguishable from an expired one and from one that was already used. It refuses to
-- exceed a member cap, so a leaked code cannot be used to fill a household. And it marks the
-- invite used inside the same statement that reads it, so two people racing the same code
-- cannot both get in.

create or replace function public.redeem_family_invite(invite_code text)
returns uuid
language plpgsql
security definer
set search_path = public
as $redeem$
declare
  target_family uuid;
  member_count  int;
begin
  if auth.uid() is null then
    raise exception 'not signed in';
  end if;

  -- Claim the invite and read it in one statement. A second caller racing the same code finds
  -- redeemed_at already set and matches no row.
  update public.family_invites
     set redeemed_by = auth.uid(),
         redeemed_at = now()
   where code = invite_code
     and redeemed_at is null
     and expires_at > now()
  returning family_id into target_family;

  if target_family is null then
    -- One message for every failure: wrong, expired, already used. Telling them apart would
    -- turn this into an oracle for guessing codes.
    raise exception 'that invite is not valid';
  end if;

  -- A household, not a mailing list. If a code does leak, this is the ceiling on the damage.
  select count(*) into member_count
    from public.family_members
   where family_id = target_family;

  if member_count >= 6 then
    raise exception 'that household already has the maximum number of parents';
  end if;

  insert into public.family_members (family_id, user_id, role)
  values (target_family, auth.uid(), 'parent')
  on conflict (family_id, user_id) do nothing;

  return target_family;
end $redeem$;

revoke all on function public.redeem_family_invite(text) from public;
grant execute on function public.redeem_family_invite(text) to authenticated;
