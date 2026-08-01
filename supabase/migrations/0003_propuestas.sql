create type public.estado_propuesta as enum ('borrador', 'procesando', 'publicada', 'cerrada');

create table if not exists public.proposals (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  texto_original text not null,
  resumen_ia text,
  estado public.estado_propuesta not null default 'borrador',
  autor_diputado_id uuid references public.profiles(id),
  publicada_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists proposals_estado_publicada_at_idx
  on public.proposals(estado, publicada_at desc);
create index if not exists proposals_autor_diputado_id_idx on public.proposals(autor_diputado_id);

create table if not exists public.proposal_interests (
  proposal_id uuid not null references public.proposals(id) on delete cascade,
  interest_id uuid not null references public.interests(id) on delete cascade,
  primary key (proposal_id, interest_id)
);

create index if not exists proposal_interests_interest_id_idx on public.proposal_interests(interest_id);
