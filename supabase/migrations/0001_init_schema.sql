-- FuelMyAthlete.com initial schema (Phase 1B).
-- Run this once in Supabase SQL Editor before anything else.

create extension if not exists "uuid-ossp";

-- =========================================================
-- TENANCY
-- =========================================================

create table public.teams (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  invite_code text unique not null,
  coach_id    uuid references auth.users(id) on delete set null,
  created_at  timestamptz not null default now()
);

create table public.families (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  owner_id    uuid not null references auth.users(id) on delete cascade,
  team_id     uuid references public.teams(id) on delete set null,
  created_at  timestamptz not null default now()
);

create table public.players (
  id              uuid primary key default uuid_generate_v4(),
  family_id       uuid not null references public.families(id) on delete cascade,
  name            text not null,
  age_years       int,
  weight_lb       numeric,
  sex             text check (sex in ('male', 'female')),
  height_in       numeric,
  sport           text default 'soccer',
  position        text,
  activity_level  text check (activity_level in ('light', 'moderate', 'heavy')),
  parent_show_calories_to_teen boolean default false,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- =========================================================
-- CATALOG (global; authenticated-read; admin-write only)
-- =========================================================

create type meal_slot as enum ('breakfast', 'lunch', 'snack', 'dinner');
create type day_type  as enum ('school', 'training', 'match', 'rest');

create table public.meals (
  id            uuid primary key default uuid_generate_v4(),
  slug          text unique not null,
  name          text not null,
  slot          meal_slot not null,
  description   text,
  prep_minutes  int,
  suitable_for  day_type[] not null default '{school,training,match,rest}',
  kid_rating    int,
  image_url     text,
  recipe_slug   text,
  created_at    timestamptz not null default now()
);

create table public.ingredients (
  id        uuid primary key default uuid_generate_v4(),
  slug      text unique not null,
  name      text not null,
  category  text not null,
  unit      text not null
);

create table public.meal_ingredients (
  meal_id        uuid not null references public.meals(id) on delete cascade,
  ingredient_id  uuid not null references public.ingredients(id) on delete restrict,
  quantity       numeric not null,
  notes          text,
  primary key (meal_id, ingredient_id)
);

create table public.recipes (
  id            uuid primary key default uuid_generate_v4(),
  slug          text unique not null,
  name          text not null,
  servings      int not null,
  total_minutes int
);

create table public.recipe_steps (
  id          uuid primary key default uuid_generate_v4(),
  recipe_id   uuid not null references public.recipes(id) on delete cascade,
  step_order  int not null,
  title       text not null,
  body        text not null,
  timer_sec   int,
  unique (recipe_id, step_order)
);

-- =========================================================
-- USER DATA
-- =========================================================

create table public.meal_plans (
  id          uuid primary key default uuid_generate_v4(),
  family_id   uuid not null references public.families(id) on delete cascade,
  player_id   uuid not null references public.players(id) on delete cascade,
  week_start  date not null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (player_id, week_start)
);

create table public.meal_plan_entries (
  id           uuid primary key default uuid_generate_v4(),
  meal_plan_id uuid not null references public.meal_plans(id) on delete cascade,
  day_of_week  int  not null check (day_of_week between 0 and 6),
  day_type     day_type not null default 'school',
  slot         meal_slot not null,
  meal_id      uuid references public.meals(id) on delete set null,
  servings     numeric not null default 1,
  notes        text,
  unique (meal_plan_id, day_of_week, slot)
);

create table public.grocery_check_state (
  meal_plan_id  uuid not null references public.meal_plans(id) on delete cascade,
  ingredient_id uuid not null references public.ingredients(id) on delete cascade,
  is_checked    boolean not null default false,
  primary key (meal_plan_id, ingredient_id)
);

create table public.hydration_logs (
  id          uuid primary key default uuid_generate_v4(),
  player_id   uuid not null references public.players(id) on delete cascade,
  logged_date date not null,
  cups        int not null default 0,
  unique (player_id, logged_date)
);

create table public.energy_logs (
  id                   uuid primary key default uuid_generate_v4(),
  player_id            uuid not null references public.players(id) on delete cascade,
  meal_plan_entry_id   uuid references public.meal_plan_entries(id) on delete set null,
  logged_at            timestamptz not null default now(),
  rating               int not null check (rating between 1 and 5),
  notes                text
);

-- =========================================================
-- INDEXES
-- =========================================================

create index on public.meal_plans (family_id);
create index on public.meal_plans (player_id, week_start desc);
create index on public.meal_plan_entries (meal_plan_id);
create index on public.players (family_id);
create index on public.families (team_id);
create index on public.hydration_logs (player_id, logged_date desc);

-- =========================================================
-- AUTO-BOOTSTRAP TRIGGER
-- Creates a default family + player on first sign-in so the planner never
-- has to handle "no family yet." User can rename later in settings.
-- =========================================================

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer
set search_path = public
as $$
declare new_family_id uuid;
begin
  insert into public.families (name, owner_id)
  values (coalesce(new.raw_user_meta_data->>'family_name', 'My Family'), new.id)
  returning id into new_family_id;

  insert into public.players (family_id, name, sport)
  values (new_family_id, coalesce(new.raw_user_meta_data->>'player_name', 'My Athlete'), 'soccer');

  return new;
end $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
