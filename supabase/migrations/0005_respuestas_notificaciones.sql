create type public.tipo_notificacion as enum ('nueva_propuesta', 'respuesta_diputado');

create table if not exists public.responses (
  id uuid primary key default gen_random_uuid(),
  proposal_id uuid not null references public.proposals(id) on delete cascade,
  diputado_id uuid not null references public.profiles(id),
  texto text not null,
  audio_url text,
  created_at timestamptz not null default now()
);

create index if not exists responses_proposal_id_idx on public.responses(proposal_id);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  tipo public.tipo_notificacion not null,
  proposal_id uuid references public.proposals(id) on delete cascade,
  leida boolean not null default false,
  created_at timestamptz not null default now(),
  -- nadie recibe la misma notificación dos veces (lo usa fanout_notificaciones con on conflict)
  unique (user_id, tipo, proposal_id)
);

create index if not exists notifications_user_id_leida_idx on public.notifications(user_id, leida);
