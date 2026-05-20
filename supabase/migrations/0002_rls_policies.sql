-- Row-level security policies for FuelMyAthlete (Phase 1B).
-- Run AFTER 0001_init_schema.sql.

-- Enable RLS on every table.
alter table public.teams                enable row level security;
alter table public.families             enable row level security;
alter table public.players              enable row level security;
alter table public.meals                enable row level security;
alter table public.ingredients          enable row level security;
alter table public.meal_ingredients     enable row level security;
alter table public.recipes              enable row level security;
alter table public.recipe_steps         enable row level security;
alter table public.meal_plans           enable row level security;
alter table public.meal_plan_entries    enable row level security;
alter table public.grocery_check_state  enable row level security;
alter table public.hydration_logs       enable row level security;
alter table public.energy_logs          enable row level security;

-- =========================================================
-- CATALOG: anyone authenticated can read; nobody writes from the client.
-- =========================================================
create policy "catalog_read_meals"            on public.meals            for select using (auth.role() = 'authenticated');
create policy "catalog_read_ingredients"      on public.ingredients      for select using (auth.role() = 'authenticated');
create policy "catalog_read_meal_ingredients" on public.meal_ingredients for select using (auth.role() = 'authenticated');
create policy "catalog_read_recipes"          on public.recipes          for select using (auth.role() = 'authenticated');
create policy "catalog_read_recipe_steps"     on public.recipe_steps     for select using (auth.role() = 'authenticated');

-- =========================================================
-- FAMILIES: owner can do anything with their own family.
-- =========================================================
create policy "families_owner_all" on public.families
  for all using (owner_id = auth.uid()) with check (owner_id = auth.uid());

-- =========================================================
-- PLAYERS: scoped to the user's families.
-- =========================================================
create policy "players_family_owner_all" on public.players
  for all using (
    family_id in (select id from public.families where owner_id = auth.uid())
  ) with check (
    family_id in (select id from public.families where owner_id = auth.uid())
  );

-- =========================================================
-- MEAL PLANS + ENTRIES + GROCERY: scoped to user's families.
-- =========================================================
create policy "meal_plans_family_owner_all" on public.meal_plans
  for all using (
    family_id in (select id from public.families where owner_id = auth.uid())
  ) with check (
    family_id in (select id from public.families where owner_id = auth.uid())
  );

create policy "meal_plan_entries_owner_all" on public.meal_plan_entries
  for all using (
    meal_plan_id in (
      select mp.id from public.meal_plans mp
      join public.families f on f.id = mp.family_id
      where f.owner_id = auth.uid()
    )
  ) with check (
    meal_plan_id in (
      select mp.id from public.meal_plans mp
      join public.families f on f.id = mp.family_id
      where f.owner_id = auth.uid()
    )
  );

create policy "grocery_check_state_owner_all" on public.grocery_check_state
  for all using (
    meal_plan_id in (
      select mp.id from public.meal_plans mp
      join public.families f on f.id = mp.family_id
      where f.owner_id = auth.uid()
    )
  ) with check (
    meal_plan_id in (
      select mp.id from public.meal_plans mp
      join public.families f on f.id = mp.family_id
      where f.owner_id = auth.uid()
    )
  );

-- =========================================================
-- TEAMS: coach can manage their own team (Phase 2 UI; schema ready now).
-- =========================================================
create policy "teams_coach_all" on public.teams
  for all using (coach_id = auth.uid()) with check (coach_id = auth.uid());

-- =========================================================
-- LOGS (hydration + energy): scoped to user's players.
-- =========================================================
create policy "hydration_logs_owner_all" on public.hydration_logs
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

create policy "energy_logs_owner_all" on public.energy_logs
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
