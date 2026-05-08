-- Enable UUID generation
create extension if not exists pgcrypto;

-- Create contact messages table
create table if not exists public.contact_messages (
    id uuid primary key default gen_random_uuid(),
    name text,
    email text not null,
    subject text,
    message text,
    created_at timestamptz not null default now()
    );

-- Optional indexes
create index if not exists contact_messages_email_idx
    on public.contact_messages (email);

create index if not exists contact_messages_created_at_idx
    on public.contact_messages (created_at desc);

-- Enable Row Level Security
alter table public.contact_messages enable row level security;

-- Allow public inserts from contact form
create policy "allow public insert"
on public.contact_messages
for insert
with check (true);

-- Deny public reads
create policy "deny public select"
on public.contact_messages
for select
using (false);

-- Deny public updates
create policy "deny public update"
on public.contact_messages
for update
using (false);

-- Deny public deletes
create policy "deny public delete"
on public.contact_messages
for delete
using (false);