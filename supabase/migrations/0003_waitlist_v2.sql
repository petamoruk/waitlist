-- Add source, ip, email_sent columns
alter table public.waitlist
  add column if not exists source text,
  add column if not exists ip    inet,
  add column if not exists email_sent boolean not null default false;

-- Replace plain unique constraint with case-insensitive unique index
alter table public.waitlist drop constraint if exists waitlist_email_key;
drop index if exists waitlist_email_idx;
create unique index if not exists waitlist_email_lower_idx on public.waitlist (lower(email));

-- Remove public insert policy — service role bypasses RLS; no public access needed
drop policy if exists "allow public insert" on public.waitlist;