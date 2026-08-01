-- Seed de desarrollo: 25 departamentos reales de Corrientes, 10 intereses del catálogo cerrado,
-- 20 propuestas ficticias, usuarios de prueba y ~40 sapucais.
-- Todos los nombres de personas son inventados: nombre de pila + inicial. Ningún diputado real.

-- ==========================================================================
-- Departamentos (los 25 de la provincia de Corrientes)
-- ==========================================================================
insert into public.departamentos (nombre) values
  ('Capital'), ('Bella Vista'), ('Berón de Astrada'), ('Concepción'), ('Curuzú Cuatiá'),
  ('Empedrado'), ('Esquina'), ('General Alvear'), ('General Paz'), ('Goya'),
  ('Itatí'), ('Ituzaingó'), ('Lavalle'), ('Mburucuyá'), ('Mercedes'),
  ('Monte Caseros'), ('Paso de los Libres'), ('Saladas'), ('San Cosme'), ('San Luis del Palmar'),
  ('San Martín'), ('San Miguel'), ('San Roque'), ('Santo Tomé'), ('Sauce')
on conflict (nombre) do nothing;

-- ==========================================================================
-- Intereses (catálogo cerrado, 10 categorías — la IA solo elige de acá)
-- ==========================================================================
insert into public.interests (slug, nombre, icono) values
  ('salud', 'Salud', 'heart-pulse'),
  ('educacion', 'Educación', 'graduation-cap'),
  ('seguridad', 'Seguridad', 'shield'),
  ('trabajo', 'Trabajo', 'briefcase'),
  ('obras-publicas', 'Obras públicas', 'hard-hat'),
  ('campo-y-produccion', 'Campo y producción', 'wheat'),
  ('ambiente', 'Ambiente', 'leaf'),
  ('transporte', 'Transporte', 'bus'),
  ('cultura', 'Cultura', 'palette'),
  ('ninez-y-familia', 'Niñez y familia', 'baby')
on conflict (slug) do nothing;

-- ==========================================================================
-- Usuarios de prueba (auth.users → dispara handle_new_user → profiles)
-- Dos ciudadanos (A y B, para poder probar RLS entre pares en S2D), un equipo
-- de cámara y un diputado. Contraseña de los cuatro: "sapucai123" (solo dev).
-- ==========================================================================
do $$
declare
  v_ciudadano_a uuid := '11111111-1111-1111-1111-111111111111';
  v_ciudadano_b uuid := '22222222-2222-2222-2222-222222222222';
  v_equipo      uuid := '33333333-3333-3333-3333-333333333333';
  v_diputado    uuid := '44444444-4444-4444-4444-444444444444';
  v_dpto_capital uuid;
  v_dpto_goya    uuid;
  v_dpto_mercedes uuid;
  v_nombres_pool text[] := array[
    'Lucía R.', 'Fabián T.', 'Noelia S.', 'Ezequiel M.', 'Carina P.', 'Gastón V.',
    'Yamila C.', 'Rodrigo A.', 'Sabrina L.', 'Nahuel B.', 'Ayelén Q.', 'Braian H.'
  ];
  v_pool uuid[];
  v_ids uuid[];
  v_prop_id uuid;
  v_titulo text;
  v_texto text;
  v_estado public.estado_propuesta;
  v_resumen text;
  i int;
  j int;
  v_dpto_id uuid;
  v_user_id uuid;
  v_postura public.postura;
  v_moderacion boolean;
begin
  select id into v_dpto_capital from public.departamentos where nombre = 'Capital';
  select id into v_dpto_goya from public.departamentos where nombre = 'Goya';
  select id into v_dpto_mercedes from public.departamentos where nombre = 'Mercedes';

  insert into auth.users (
    id, instance_id, aud, role, email, encrypted_password,
    email_confirmed_at, created_at, updated_at,
    raw_app_meta_data, raw_user_meta_data, confirmation_token, recovery_token,
    email_change_token_new, email_change
  ) values
    (v_ciudadano_a, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
     'ciudadano.a@sapucai.test', crypt('sapucai123', gen_salt('bf')),
     now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}', '', '', '', ''),
    (v_ciudadano_b, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
     'ciudadano.b@sapucai.test', crypt('sapucai123', gen_salt('bf')),
     now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}', '', '', '', ''),
    (v_equipo, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
     'equipo.camara@sapucai.test', crypt('sapucai123', gen_salt('bf')),
     now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}', '', '', '', ''),
    (v_diputado, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
     'diputado@sapucai.test', crypt('sapucai123', gen_salt('bf')),
     now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}', '', '', '', '')
  on conflict (id) do nothing;

  -- El trigger ya insertó los profiles con rol='ciudadano' y nombre=''. Completamos.
  update public.profiles set rol = 'ciudadano', nombre = 'Marisa G.', dni = '30111222',
    departamento_id = v_dpto_capital where id = v_ciudadano_a;
  update public.profiles set rol = 'ciudadano', nombre = 'Ramón D.', dni = '28444555',
    departamento_id = v_dpto_goya where id = v_ciudadano_b;
  update public.profiles set rol = 'equipo_camara', nombre = 'Equipo de Cámara', dni = null,
    departamento_id = v_dpto_capital where id = v_equipo;
  update public.profiles set rol = 'diputado', nombre = 'Elena F.', dni = null,
    departamento_id = v_dpto_mercedes where id = v_diputado;

  -- A y B siguen todos los intereses, para que el feed y el matcheo tengan datos.
  insert into public.user_interests (user_id, interest_id)
  select v_ciudadano_a, id from public.interests
  union all
  select v_ciudadano_b, id from public.interests
  on conflict do nothing;

  -- ========================================================================
  -- Pool de ciudadanos de relleno (12 más, además de A y B): sin esto, la
  -- restricción unique(proposal_id, user_id) de sapucais no deja simular más
  -- de dos opiniones por propuesta. Repartidos por distintos departamentos.
  -- ========================================================================
  v_pool := array[]::uuid[];
  for j in 1..array_length(v_nombres_pool, 1) loop
    v_user_id := ('55555555-5555-5555-5555-5555555555' || lpad(j::text, 2, '0'))::uuid;
    insert into auth.users (
      id, instance_id, aud, role, email, encrypted_password,
      email_confirmed_at, created_at, updated_at,
      raw_app_meta_data, raw_user_meta_data, confirmation_token, recovery_token,
      email_change_token_new, email_change
    ) values (
      v_user_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
      'ciudadano' || j || '@sapucai.test', crypt('sapucai123', gen_salt('bf')),
      now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}', '', '', '', ''
    )
    on conflict (id) do nothing;

    select id into v_dpto_id from public.departamentos offset (j % 25) limit 1;
    update public.profiles set rol = 'ciudadano', nombre = v_nombres_pool[j],
      dni = (20000000 + j * 137)::text, departamento_id = v_dpto_id where id = v_user_id;

    insert into public.user_interests (user_id, interest_id)
    select v_user_id, id from public.interests order by nombre offset (j % 10) limit 3
    on conflict do nothing;

    v_pool := array_append(v_pool, v_user_id);
  end loop;
  -- A y B también entran al pool para que puedan opinar en cualquier propuesta.
  v_pool := array_prepend(v_ciudadano_b, array_prepend(v_ciudadano_a, v_pool));

  -- ========================================================================
  -- 20 propuestas ficticias, con los casos límite que el front espera:
  --  · una con título de 140 caracteres exactos
  --  · una publicada con 0 sapucais
  --  · una con termómetro 96/2/2 (el fixture del redondeo)
  --  · una en 'procesando' con resumen_ia = null (la IA "todavía no corrió")
  -- ========================================================================
  for i in 1..20 loop
    v_estado := 'publicada';
    v_resumen := null;

    case i
      when 1 then
        v_titulo := 'Acceso al agua potable en parajes rurales sin red de distribución en los veinticinco departamentos de la provincia de Corrientes, plan';
        -- exactamente 140 caracteres
        v_titulo := left(v_titulo, 140);
        v_texto := 'El proyecto crea un fondo provincial para perforar pozos y tender redes de agua potable en parajes rurales que hoy dependen de camiones cisterna. Prioriza los departamentos con mayor dispersión poblacional y establece un plazo de tres años para cubrir el 80% de los parajes relevados por el Ente Provincial de Agua.';
        v_resumen := 'Este proyecto busca que las familias del campo tengan agua potable en su casa, sin depender del camión cisterna. Va a haber pozos y redes nuevas en tres años.';
      when 2 then
        v_titulo := 'Boleto educativo gratuito para estudiantes secundarios y terciarios en todo el territorio provincial';
        v_texto := 'Establece el boleto gratuito de transporte público para estudiantes de nivel secundario, terciario y universitario domiciliados en la provincia, financiado con un fondo específico dentro del presupuesto de transporte. Las empresas concesionarias son compensadas mensualmente por el Estado provincial según los pasajes efectivamente utilizados.';
      when 3 then
        v_titulo := 'Propuesta con cero opiniones todavía — proyecto recién publicado de arbolado urbano nativo';
        v_texto := 'Obliga a los municipios a reemplazar, en cada obra de repavimentación, al menos un árbol nativo por cada árbol removido, priorizando especies del monte correntino como el lapacho y el ceibo. Crea un vivero provincial gratuito para los municipios que se adhieran.';
      when 4 then
        v_titulo := 'Programa de huertas comunitarias urbanas y periurbanas con apoyo técnico del INTA';
        v_texto := 'Crea un programa de huertas comunitarias en terrenos fiscales ociosos de las ciudades, con capacitación técnica gratuita y provisión de semillas para las primeras dos cosechas. El objetivo declarado es la seguridad alimentaria de los barrios populares.';
      when 5 then
        v_titulo := 'Registro provincial de agresores por violencia de género con acceso para la Justicia y las fuerzas de seguridad';
        v_texto := 'Crea un registro único, reservado, con las condenas y las medidas de restricción vigentes por violencia de género, de acceso inmediato para jueces, fiscales y comisarías de toda la provincia, para evitar que una persona con antecedentes cambie de departamento sin que se sepa.';
      when 6 then
        v_titulo := 'Recuperación del transporte fluvial de pasajeros entre las ciudades ribereñas del Paraná';
        v_texto := 'Financia el estudio de factibilidad y la primera línea piloto de transporte fluvial de pasajeros entre Goya, Esquina y Bella Vista, como alternativa al transporte terrestre en épocas de corte de rutas por obras o inundación.';
      when 7 then
        v_titulo := 'Promoción industrial para la cadena yerbatera correntina con beneficios fiscales a la agregación de valor en origen';
        v_texto := 'Otorga exenciones de ingresos brutos por diez años a los secaderos y molinos yerbateros que agreguen valor dentro de la provincia, en lugar de exportar la materia prima a otras jurisdicciones. Busca retener el empleo industrial en los departamentos productores.';
      when 8 then
        v_titulo := 'Termómetro parejo: proyecto de conectividad rural con fibra óptica en escuelas y postas sanitarias';
        v_texto := 'Extiende la fibra óptica provincial a las escuelas rurales y postas sanitarias que hoy no tienen conexión estable, priorizando las zonas donde la telemedicina y la educación a distancia son la única alternativa real durante las inundaciones.';
      when 9 then
        v_titulo := 'Gestión de residuos electrónicos y puntos limpios municipales obligatorios';
        v_texto := 'Obliga a los municipios de más de veinte mil habitantes a instalar al menos un punto limpio para residuos electrónicos y pilas, y prohíbe su disposición en los rellenos sanitarios comunes por el riesgo de contaminación de napas.';
      when 10 then
        v_titulo := 'Acompañamiento de salud mental en escuelas secundarias con equipos interdisciplinarios itinerantes';
        v_texto := 'Crea equipos interdisciplinarios itinerantes de salud mental para escuelas secundarias, con al menos una visita mensual por establecimiento, financiados por el Ministerio de Salud provincial en articulación con Educación.';
      when 11 then
        v_titulo := 'Becas provinciales para tecnicaturas agropecuarias en institutos terciarios del interior';
        v_texto := 'Financia becas completas para estudiantes de tecnicaturas agropecuarias, agroindustriales y forestales dictadas en institutos del interior provincial, con el compromiso de trabajar al menos dos años en la provincia al recibirse.';
      when 12 then
        v_titulo := 'Extensión de la cobertura de ART a trabajadores rurales temporarios de la cosecha citrícola y yerbatera';
        v_texto := 'Obliga a los empleadores del sector citrícola y yerbatero a contratar ART también para los trabajadores temporarios de cosecha, cerrando un vacío que hoy deja sin cobertura a miles de tareferos durante los meses de zafra.';
      when 13 then
        v_titulo := 'Banco de tierras fiscales ociosas para producción familiar y agroecológica';
        v_texto := 'Releva las tierras fiscales provinciales sin uso productivo y crea un régimen de cesión en comodato a productores familiares y proyectos agroecológicos, con evaluación de continuidad cada tres años.';
      when 14 then
        v_titulo := 'Protocolo unificado de emergencias climáticas para inundaciones del río Paraná y del río Uruguay';
        v_texto := 'Unifica los protocolos municipales de evacuación y asistencia ante crecidas, hoy dispersos y desiguales entre departamentos, y crea un sistema único de alerta temprana con Defensa Civil provincial como coordinador.';
      when 15 then
        v_titulo := 'Promoción de la pesca artesanal y cupos diferenciados frente a la pesca comercial de gran escala';
        v_texto := 'Establece cupos y zonas exclusivas para la pesca artesanal de subsistencia frente a la actividad comercial de gran escala en el río Paraná, y crea un registro provincial de pescadores artesanales con beneficios previsionales.';
      when 16 then
        v_titulo := 'Código de convivencia urbana unificado para los veinticinco municipios cabecera de departamento';
        v_texto := 'Propone un código de convivencia urbana modelo, de adhesión voluntaria por ordenanza municipal, para unificar las faltas y sanciones básicas entre municipios y facilitar la cooperación policial interdepartamental.';
      when 17 then
        v_titulo := 'Plan de vivienda social con prioridad para familias monoparentales y personas con discapacidad';
        v_texto := 'Crea un cupo del veinte por ciento en todos los planes de vivienda social provinciales para familias monoparentales y personas con discapacidad certificada, con criterios de puntaje verificables y públicos.';
      when 18 then
        v_titulo := 'Ferias de economía popular permanentes en las plazas principales de cada departamento';
        v_texto := 'Habilita ferias permanentes de economía popular, con puestos rotativos gratuitos para emprendedores registrados, en la plaza principal de cada ciudad cabecera de departamento, los fines de semana.';
      when 19 then
        v_titulo := 'Todavía en revisión: régimen de compre correntino para las compras del Estado provincial';
        v_estado := 'procesando';
        v_texto := 'Establece un margen de preferencia del cinco por ciento a favor de proveedores con planta productiva en la provincia en las licitaciones del Estado, siempre que la diferencia de precio no supere ese margen.';
      when 20 then
        v_titulo := 'Extensión del horario de atención de los centros de salud de barrio en zonas de alta demanda';
        v_texto := 'Extiende el horario de atención de los centros de salud de barrio con mayor demanda hasta las veintidós horas, en un turno rotativo, para descomprimir las guardias hospitalarias de casos que no son urgencias.';
    end case;

    if v_estado = 'publicada' and v_resumen is null then
      v_resumen := left(v_texto, 180);
    end if;

    insert into public.proposals (titulo, texto_original, resumen_ia, estado, autor_diputado_id, publicada_at)
    values (
      v_titulo, v_texto,
      case when v_estado = 'publicada' then v_resumen else null end,
      v_estado, v_diputado,
      case when v_estado = 'publicada' then now() - (i || ' days')::interval else null end
    )
    returning id into v_prop_id;

    -- 1 a 3 intereses por propuesta, elegidos de forma determinística por índice
    select array_agg(id) into v_ids from (
      select id from public.interests order by nombre offset (i % 10) limit 2
    ) s;
    insert into public.proposal_interests (proposal_id, interest_id)
    select v_prop_id, unnest(v_ids)
    on conflict do nothing;

    -- Sapucais: la propuesta 3 queda con cero a propósito (recién publicada, sin opiniones
    -- todavía) y la 19 está 'procesando' (no se opina sobre lo que no está publicado).
    -- Cada usuario del pool opina como máximo una vez por propuesta (unique(proposal_id, user_id)),
    -- así que la cantidad de opiniones está acotada por el tamaño del pool (14).
    if i = 3 or v_estado != 'publicada' then
      continue;
    end if;

    declare
      n_opiniones int := case when i = 8 then 12 when i in (1, 10, 15) then 6 else 1 + (i % 4) end;
      v_pool_size int := array_length(v_pool, 1);
    begin
      for j in 1..least(n_opiniones, v_pool_size) loop
        v_user_id := v_pool[1 + ((i * 3 + j) % v_pool_size)];
        v_postura := (array['a_favor', 'en_contra', 'neutro'])[1 + ((i + j) % 3)]::public.postura;
        -- 1 de cada 6 queda sin moderar todavía, para poblar la cola de moderación humana.
        v_moderacion := case when (i + j) % 6 = 0 then null else true end;

        insert into public.sapucais (
          proposal_id, user_id, transcripcion, postura, moderacion_ok, estado_procesamiento
        ) values (
          v_prop_id, v_user_id,
          (array[
            'Me parece un tema importante para mi departamento, ojalá se implemente pronto.',
            'No estoy tan seguro de que esto se pueda cumplir con el presupuesto actual.',
            'Hace años que hace falta algo así, espero que esta vez no quede en la nada.',
            'Habría que consultar más a la gente del interior antes de aprobar esto.'
          ])[1 + (j % 4)],
          v_postura, v_moderacion, 'listo'
        )
        on conflict (proposal_id, user_id) do nothing;
      end loop;
    end;
  end loop;

  -- Respuesta pública del diputado sobre la propuesta 1, para probar el ⭐ cierre del ciclo.
  insert into public.responses (proposal_id, diputado_id, texto)
  select id, v_diputado,
    'Gracias por sus sapucais. Vamos a incorporar sus aportes antes del tratamiento en comisión.'
  from public.proposals where estado = 'publicada' order by created_at limit 1;
end $$;
