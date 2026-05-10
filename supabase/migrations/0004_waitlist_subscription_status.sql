alter table public.waitlist
  add column if not exists is_subscribed      boolean not null default true,
  add column if not exists unsubscribe_reason text;
