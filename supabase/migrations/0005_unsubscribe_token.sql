alter table public.waitlist
  add column if not exists unsubscribe_token uuid not null default gen_random_uuid();

create unique index if not exists waitlist_unsubscribe_token_idx
  on public.waitlist (unsubscribe_token);
