-- Enable required extension for UUID generation
create extension if not exists pgcrypto;

-- Create waitlist table
create table if not exists public.waitlist (
                                               id uuid primary key default gen_random_uuid(),
    email text not null unique,
    created_at timestamptz not null default now()
    );

-- Index for fast email lookups
create index if not exists waitlist_email_idx
    on public.waitlist (email);

-- Enable Row Level Security
alter table public.waitlist enable row level security;

-- Allow anyone to insert into waitlist
create policy "allow public insert"
on public.waitlist
for insert
with check (true);

-- Prevent public reads
create policy "deny public select"
on public.waitlist
for select
                      using (false);

-- Prevent public updates
create policy "deny public update"
on public.waitlist
for update
               using (false);

-- Prevent public deletes
create policy "deny public delete"
on public.waitlist
for delete
using (false);