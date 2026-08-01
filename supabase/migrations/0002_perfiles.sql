create type public.rol as enum ('ciudadano', 'equipo_camara', 'diputado');

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  rol public.rol not null default 'ciudadano',
  nombre text not null default '',
  dni text,
  departamento_id uuid references public.departamentos(id),
  created_at timestamptz not null default now()
);

create index if not exists profiles_departamento_id_idx on public.profiles(departamento_id);

create table if not exists public.user_interests (
  user_id uuid not null references public.profiles(id) on delete cascade,
  interest_id uuid not null references public.interests(id) on delete cascade,
  primary key (user_id, interest_id)
);

create index if not exists user_interests_interest_id_idx on public.user_interests(interest_id);

-- El perfil se crea solo al registrarse. El rol por defecto es 'ciudadano';
-- el backoffice y el diputado se promueven a mano (fuera de la app, vía Studio/SQL).
create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, rol, nombre) values (new.id, 'ciudadano', '');
  return new;
end $$;

create trigger on_auth_user_created
  after insert on auth.users for each row execute function public.handle_new_user();
