-- Catálogo cerrado de intereses y departamentos. Nadie inserta desde el cliente.
create table if not exists public.interests (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  nombre text not null,
  icono text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.departamentos (
  id uuid primary key default gen_random_uuid(),
  nombre text not null unique,
  created_at timestamptz not null default now()
);
