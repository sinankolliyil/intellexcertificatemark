create table if not exists public.student_data (
  id text primary key check (id = 'students'),
  students jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.student_data enable row level security;
revoke all on table public.student_data from anon, authenticated;
grant select, insert, update on table public.student_data to service_role;
