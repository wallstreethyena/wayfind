-- Wayfind backend schema
-- Paste this whole file into Supabase: Dashboard > SQL Editor > New query > Run.
-- It is safe to run more than once.

-- 1. PROFILES (public identity for each user)
create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  username text unique,
  display_name text,
  avatar_url text,
  created_at timestamptz default now()
);
alter table profiles enable row level security;
drop policy if exists "profiles are public" on profiles;
create policy "profiles are public" on profiles for select using (true);
drop policy if exists "users manage own profile" on profiles;
create policy "users manage own profile" on profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

-- 2. LIKES (public; powers "top places someone liked this week")
create table if not exists likes (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users on delete cascade,
  place_id text not null,
  place jsonb,
  created_at timestamptz default now(),
  unique (user_id, place_id)
);
alter table likes enable row level security;
drop policy if exists "likes are public" on likes;
create policy "likes are public" on likes for select using (true);
drop policy if exists "users manage own likes" on likes;
create policy "users manage own likes" on likes
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 3. SAVED PLACES / LISTS (public-read so profiles can show them)
create table if not exists saved_places (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users on delete cascade,
  place_id text not null,
  place jsonb,
  list_name text default 'Favorites',
  created_at timestamptz default now(),
  unique (user_id, place_id, list_name)
);
alter table saved_places enable row level security;
drop policy if exists "saved are public" on saved_places;
create policy "saved are public" on saved_places for select using (true);
drop policy if exists "users manage own saved" on saved_places;
create policy "users manage own saved" on saved_places
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 4. FOLLOWS (who follows whom)
create table if not exists follows (
  follower_id uuid references auth.users on delete cascade,
  following_id uuid references auth.users on delete cascade,
  created_at timestamptz default now(),
  primary key (follower_id, following_id)
);
alter table follows enable row level security;
drop policy if exists "follows are public" on follows;
create policy "follows are public" on follows for select using (true);
drop policy if exists "users manage own follows" on follows;
create policy "users manage own follows" on follows
  for all using (auth.uid() = follower_id) with check (auth.uid() = follower_id);

-- 5. Auto-create a profile row when a new user signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
