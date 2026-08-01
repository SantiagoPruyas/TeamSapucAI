-- Las tres funciones security definer que sostienen la privacidad del proyecto.
-- Un ciudadano nunca lee la tabla sapucais de otro directamente: solo lee estos agregados.

create function public.propuesta_stats(p_id uuid)
returns table (a_favor int, en_contra int, neutro int, pendientes int)
language sql stable security definer set search_path = public as $$
  select
    count(*) filter (where moderacion_ok = true and postura = 'a_favor')::int,
    count(*) filter (where moderacion_ok = true and postura = 'en_contra')::int,
    count(*) filter (where moderacion_ok = true and postura = 'neutro')::int,
    count(*) filter (where moderacion_ok is null)::int
  from public.sapucais
  where proposal_id = p_id
$$;

-- Agrupado por departamento. Con menos de 3 personas el departamento se funde en "Otros"
-- para que un agregado no identifique a una persona.
create function public.propuesta_stats_por_depto(p_id uuid)
returns table (departamento text, a_favor int, en_contra int, neutro int)
language sql stable security definer set search_path = public as $$
  with por_depto as (
    select
      d.nombre as departamento,
      count(*) filter (where s.postura = 'a_favor')::int as a_favor,
      count(*) filter (where s.postura = 'en_contra')::int as en_contra,
      count(*) filter (where s.postura = 'neutro')::int as neutro,
      count(*)::int as total
    from public.sapucais s
    join public.profiles p on p.id = s.user_id
    left join public.departamentos d on d.id = p.departamento_id
    where s.proposal_id = p_id and s.moderacion_ok = true
    group by d.nombre
  )
  select
    case when total < 3 or departamento is null then 'Otros' else departamento end as departamento,
    sum(a_favor)::int, sum(en_contra)::int, sum(neutro)::int
  from por_depto
  group by 1
$$;

-- El único punto de inserción en notifications. Nadie más escribe ahí desde el cliente.
create function public.fanout_notificaciones(p_id uuid, p_tipo text)
returns void
language plpgsql security definer set search_path = public as $$
begin
  if p_tipo = 'nueva_propuesta' then
    insert into public.notifications (user_id, tipo, proposal_id)
    select distinct ui.user_id, 'nueva_propuesta'::public.tipo_notificacion, p_id
    from public.user_interests ui
    join public.proposal_interests pi on pi.interest_id = ui.interest_id
    where pi.proposal_id = p_id
    on conflict (user_id, tipo, proposal_id) do nothing;

  elsif p_tipo = 'respuesta_diputado' then
    insert into public.notifications (user_id, tipo, proposal_id)
    select distinct s.user_id, 'respuesta_diputado'::public.tipo_notificacion, p_id
    from public.sapucais s
    join public.proposals pr on pr.id = s.proposal_id
    where s.proposal_id = p_id
      and s.moderacion_ok = true
      and s.user_id is distinct from pr.autor_diputado_id
    on conflict (user_id, tipo, proposal_id) do nothing;
  end if;
end $$;
