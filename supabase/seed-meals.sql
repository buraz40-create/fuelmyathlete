-- Seed the global meal + ingredient catalog (Phase 1B).
-- Run AFTER 0001 + 0002. Idempotent UPSERTs by slug.
-- TypeScript at src/data/meals.ts + src/data/ingredients.ts is the authoring source.
-- Re-run this whenever those files change to push updates to the database.

-- =========================================================
-- INGREDIENTS
-- =========================================================
insert into public.ingredients (slug, name, category, unit) values
  ('banana',        'Bananas',                 'produce',   'each'),
  ('apple',         'Apples',                  'produce',   'each'),
  ('strawberry',    'Strawberries',            'produce',   'cup'),
  ('blueberry',     'Blueberries',             'produce',   'cup'),
  ('romaine',       'Romaine lettuce',         'produce',   'cup'),
  ('spinach',       'Baby spinach',            'produce',   'cup'),
  ('broccoli',      'Broccoli',                'produce',   'cup'),
  ('carrot',        'Baby carrots',            'produce',   'cup'),
  ('bell-pepper',   'Bell pepper',             'produce',   'each'),
  ('sweet-potato',  'Sweet potato',            'produce',   'each'),
  ('green-beans',   'Green beans',             'produce',   'cup'),
  ('garlic',        'Garlic cloves',           'produce',   'each'),
  ('ginger',        'Fresh ginger',            'produce',   'tbsp'),
  ('lime',          'Limes',                   'produce',   'each'),
  ('lemon',         'Lemons',                  'produce',   'each'),
  ('chicken-breast','Chicken breast',          'protein',   'lb'),
  ('ground-turkey', 'Ground turkey (lean)',    'protein',   'lb'),
  ('salmon',        'Salmon fillet',           'protein',   'lb'),
  ('eggs',          'Eggs',                    'protein',   'each'),
  ('greek-yogurt',  'Plain Greek yogurt',      'protein',   'cup'),
  ('deli-turkey',   'Sliced deli turkey',      'protein',   'oz'),
  ('cheese-stick',  'String cheese',           'protein',   'each'),
  ('cheese-slice',  'Cheddar slices',          'protein',   'each'),
  ('almonds',       'Raw almonds',             'protein',   'cup'),
  ('jasmine-rice',  'Jasmine rice',            'pantry',    'cup'),
  ('wholegrain-bread',     'Whole-grain bread',         'pantry', 'each'),
  ('wholegrain-tortilla',  'Whole-grain tortillas',     'pantry', 'each'),
  ('pasta',         'Whole-grain pasta',       'pantry',    'oz'),
  ('marinara',      'Marinara sauce',          'pantry',    'cup'),
  ('peanut-butter', 'Peanut butter',           'pantry',    'tbsp'),
  ('honey',         'Honey',                   'pantry',    'tbsp'),
  ('soy-sauce',     'Low-sodium soy sauce',    'pantry',    'tbsp'),
  ('sesame-oil',    'Toasted sesame oil',      'pantry',    'tsp'),
  ('olive-oil',     'Olive oil',               'pantry',    'tbsp'),
  ('rice-vinegar',  'Rice vinegar',            'pantry',    'tbsp'),
  ('sesame-seeds',  'Sesame seeds',            'pantry',    'tsp'),
  ('crackers-wg',   'Whole-grain crackers',    'pantry',    'oz'),
  ('cereal-wg',     'Whole-grain cereal',      'pantry',    'cup'),
  ('taco-seasoning','Taco seasoning',          'pantry',    'tbsp'),
  ('milk',          'Milk',                    'dairy',     'cup'),
  ('butter',        'Unsalted butter',         'dairy',     'tbsp'),
  ('edamame',       'Shelled edamame',         'frozen',    'cup'),
  ('mixed-berry',   'Frozen mixed berries',    'frozen',    'cup'),
  ('english-muffin','Whole-grain English muffins', 'bakery', 'each'),
  ('orange-juice',  'Orange juice',            'beverages', 'cup'),
  ('electrolyte',   'Electrolyte mix',         'beverages', 'each')
on conflict (slug) do update
  set name = excluded.name,
      category = excluded.category,
      unit = excluded.unit;

-- =========================================================
-- RECIPE: Hibachi Chicken
-- =========================================================
insert into public.recipes (slug, name, servings, total_minutes) values
  ('hibachi-chicken', 'Hibachi Chicken (meal prep)', 8, 25)
on conflict (slug) do update set name = excluded.name, servings = excluded.servings, total_minutes = excluded.total_minutes;

delete from public.recipe_steps where recipe_id = (select id from public.recipes where slug = 'hibachi-chicken');

insert into public.recipe_steps (recipe_id, step_order, title, body, timer_sec)
select id, 1, 'Slice the chicken thin',
  'Slice 2 lb boneless skinless chicken breast into thin strips, about ½ inch thick. Thin cuts are the secret. They cook fast, stay juicy, and reheat well in school containers without drying out. Pat dry with paper towels for a better sear.', null
from public.recipes where slug = 'hibachi-chicken';
insert into public.recipe_steps (recipe_id, step_order, title, body, timer_sec)
select id, 2, 'Season',
  'Toss the chicken strips with ½ tsp salt and ½ tsp black pepper. Don''t add the soy sauce yet. Adding it too early draws out moisture and prevents a good sear.', null
from public.recipes where slug = 'hibachi-chicken';
insert into public.recipe_steps (recipe_id, step_order, title, body, timer_sec)
select id, 3, 'Heat the pan, screaming hot',
  'Heat a large skillet or wok over HIGH heat for 2 minutes. Add 1 tbsp avocado or vegetable oil. You want the oil to shimmer and almost smoke. Cast iron or stainless steel works best.', 120
from public.recipes where slug = 'hibachi-chicken';
insert into public.recipe_steps (recipe_id, step_order, title, body, timer_sec)
select id, 4, 'Sear the chicken',
  'Add the chicken in a single layer. Do NOT overcrowd the pan. Cook in 2 batches if needed. Let it sear untouched for 4 minutes, then flip and cook another 2 minutes until golden brown on both sides.', 240
from public.recipes where slug = 'hibachi-chicken';
insert into public.recipe_steps (recipe_id, step_order, title, body, timer_sec)
select id, 5, 'Add the hibachi sauce',
  'Push the chicken to the edges of the pan. Add 2 tbsp unsalted butter + 4 cloves minced garlic to the center. Let the butter melt and garlic sizzle for 30 seconds, then pour 3 tbsp low-sodium soy sauce and 1 tbsp sesame oil over everything. Toss to coat.', 30
from public.recipes where slug = 'hibachi-chicken';
insert into public.recipe_steps (recipe_id, step_order, title, body, timer_sec)
select id, 6, 'Finish + caramelize',
  'Toss everything together over high heat for 1-2 more minutes until the sauce caramelizes slightly and coats the chicken in a glossy glaze. You''ll smell it. That''s the hibachi magic.', 90
from public.recipes where slug = 'hibachi-chicken';
insert into public.recipe_steps (recipe_id, step_order, title, body, timer_sec)
select id, 7, 'Cool + portion',
  'Spread chicken on a baking sheet or large plate to cool completely before portioning. Never pack warm food straight into containers or it steams itself soggy. Once cool, divide into 5 meal-prep containers alongside rice and veggies, plus 3 dinner portions.', null
from public.recipes where slug = 'hibachi-chicken';

-- =========================================================
-- MEALS catalog (mirror of src/data/meals.ts)
-- For brevity here, only metadata is upserted. Meal ingredients are loaded
-- via a script in Phase 2 when the catalog moves fully into Supabase.
-- =========================================================

insert into public.meals (slug, name, slot, description, prep_minutes, suitable_for, kid_rating, image_url, recipe_slug) values
  ('cereal-banana-milk',     'Whole-grain cereal + banana + milk',  'breakfast', 'Fast, kid-approved fuel. Switch to whole-grain cereal for steady energy.', 3, '{school,rest}', 5, 'https://images.pexels.com/photos/4819353/pexels-photo-4819353.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1', null),
  ('eggs-toast',             'Scrambled eggs + whole-grain toast',  'breakfast', 'Real protein + slow carbs to last through morning classes.', 8, '{school,training,match}', 4, 'https://images.pexels.com/photos/4846309/pexels-photo-4846309.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1', null),
  ('berry-smoothie',         'Berry banana smoothie',               'breakfast', 'Hidden spinach for vitamins. Kids can''t taste it, promise.', 5, '{school,training,match}', 5, 'https://images.pexels.com/photos/5589043/pexels-photo-5589043.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1', null),
  ('english-muffin-pb',      'English muffin + peanut butter + banana', 'breakfast', 'Pre-game favorite. High carb, easy to digest, packable.', 4, '{training,match}', 5, 'https://images.pexels.com/photos/4946999/pexels-photo-4946999.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1', null),
  ('yogurt-parfait',         'Greek yogurt parfait',                'breakfast', 'Layered yogurt + berries + honey. Looks fancy, takes 3 minutes.', 3, '{school,rest}', 4, 'https://images.pexels.com/photos/5591699/pexels-photo-5591699.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1', null),
  ('hibachi-chicken-bowl',   'Hibachi chicken rice bowl',           'lunch',     'Elvis''s favorite school lunch. One Sunday cook = 5 reheats. Pack sauce separately.', 5, '{school,training,rest}', 5, 'https://images.pexels.com/photos/6107772/pexels-photo-6107772.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1', 'hibachi-chicken'),
  ('turkey-wrap',            'Turkey + cheese whole-grain wrap',    'lunch',     'Quick, packable lunch with carrots on the side.', 5, '{school,rest}', 4, 'https://images.pexels.com/photos/8964022/pexels-photo-8964022.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1', null),
  ('chicken-pasta-broccoli', 'Pasta + grilled chicken + broccoli',  'lunch',     'Solid carb + protein combo. Reheats well in a thermos.', 15, '{school,training}', 4, 'https://images.pexels.com/photos/5602477/pexels-photo-5602477.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1', null),
  ('apple-pb',               'Apple + peanut butter',               'snack',     'Classic combo. Natural sugar + protein + fat.', 2, '{school,training,match,rest}', 5, 'https://images.pexels.com/photos/7440377/pexels-photo-7440377.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1', null),
  ('cheese-crackers',        'String cheese + whole-grain crackers','snack',     'Easy soccer-bag snack. Doesn''t melt as fast as you''d think.', 1, '{school,training,match,rest}', 4, 'https://images.pexels.com/photos/7440380/pexels-photo-7440380.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1', null),
  ('yogurt-honey-berries',   'Greek yogurt + honey + berries',      'snack',     'Recovery snack. Protein + carbs within 30 min post-practice.', 2, '{training,match}', 4, 'https://images.pexels.com/photos/5852457/pexels-photo-5852457.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1', null),
  ('banana-almonds',         'Banana + handful of almonds',         'snack',     'Quick energy + slow-release fat. Pre-practice winner.', 1, '{training,match}', 4, 'https://images.pexels.com/photos/8922007/pexels-photo-8922007.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1', null),
  ('chicken-rice-broccoli',  'Grilled chicken + jasmine rice + broccoli', 'dinner', 'The workhorse dinner. Boring on paper, perfect for athletes.', 25, '{school,training,match,rest}', 4, 'https://images.pexels.com/photos/9893216/pexels-photo-9893216.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1', null),
  ('salmon-sweet-potato',    'Salmon + sweet potato + green beans', 'dinner',    'Omega-3 for recovery + complex carbs. Best as a rest-day dinner.', 30, '{rest,school}', 3, 'https://images.pexels.com/photos/33706292/pexels-photo-33706292.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1', null),
  ('turkey-tacos',           'Turkey tacos on whole-grain tortillas','dinner',   'Kid favorite. Build-your-own bar means less complaining.', 20, '{school,rest}', 5, 'https://images.pexels.com/photos/8448335/pexels-photo-8448335.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1', null),
  ('pasta-marinara',         'Pasta + turkey marinara + side salad','dinner',    'Carb-load night before a match. The classic pre-game dinner.', 25, '{training,match}', 5, 'https://images.pexels.com/photos/9304081/pexels-photo-9304081.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1', null),
  ('stirfry-chicken-rice',   'Stir-fry chicken + rice + edamame',   'dinner',    'Same hibachi technique, dinner-portioned. Family-style cook.', 20, '{school,rest,training}', 4, 'https://images.pexels.com/photos/7340936/pexels-photo-7340936.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1', 'hibachi-chicken')
on conflict (slug) do update
  set name = excluded.name,
      slot = excluded.slot,
      description = excluded.description,
      prep_minutes = excluded.prep_minutes,
      suitable_for = excluded.suitable_for,
      kid_rating = excluded.kid_rating,
      image_url = excluded.image_url,
      recipe_slug = excluded.recipe_slug;
