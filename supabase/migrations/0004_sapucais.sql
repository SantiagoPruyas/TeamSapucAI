create type public.postura as enum ('a_favor', 'en_contra', 'neutro');
create type public.estado_procesamiento as enum ('pendiente', 'listo', 'error');

create table if not exists public.sapucais (
  id uuid primary key default gen_random_uuid(),
  proposal_id uuid not null references public.proposals(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  audio_url text,
  transcripcion text,
  postura public.postura,
  moderacion_ok boolean,
  moderacion_motivo text,
  estado_procesamiento public.estado_procesamiento not null default 'pendiente',
  created_at timestamptz not null default now(),
  -- una persona, una voz por propuesta (regla de negocio de S4D, garantizada también en la DB)
  unique (proposal_id, user_id)
);

create index if not exists sapucais_proposal_id_idx on public.sapucais(proposal_id);
create index if not exists sapucais_user_id_idx on public.sapucais(user_id);
