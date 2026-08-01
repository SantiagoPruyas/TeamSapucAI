/**
 * lib/mock/api.citizen.ts — Lara
 *
 * Contrato mock del carril ciudadano.
 * NUNCA se importan los datos directamente de data.ts desde la UI.
 * Toda función: await delay() → quizasFallar() → devolver dato.
 * TODO: cuando llegue el backend, reemplazar el cuerpo de cada función.
 */

import { delay, quizasFallar, vacio } from './delay'
import type { Interes, Departamento, Perfil, Propuesta, Respuesta, Notificacion } from '../types'
import { propuestas, intereses, departamentos } from './data'

/* ---- API functions ----
 * El catálogo de intereses y departamentos sale SIEMPRE de lib/mock/data.ts
 * (ids i01..i10 / d1..d25) — es el mismo que usan propuestas[].intereses,
 * sapucais y api.backoffice.ts. Antes había acá un catálogo duplicado con
 * ids tipo 'salud'/'bella-vista' que nunca podía matchear con data.ts,
 * así que el feed quedaba vacío sin importar qué elegía el usuario.
 */

export async function getIntereses(): Promise<Interes[]> {
  await delay()
  quizasFallar()
  return vacio(intereses)
}

export async function getDepartamentos(): Promise<Departamento[]> {
  await delay(200)
  quizasFallar()
  return vacio(departamentos)
}

export async function guardarPerfil(perfil: Omit<Perfil, 'id'>): Promise<Perfil> {
  await delay(600)
  quizasFallar()
  const perfilCompleto = { ...perfil, id: `perfil-mock-${Date.now()}` }
  if (typeof window !== 'undefined') {
    localStorage.setItem('sapucai_perfil', JSON.stringify(perfilCompleto))
  }
  return perfilCompleto
}

export async function getFeed(interesesDelUsuario: string[]): Promise<Propuesta[]> {
  await delay(800)
  quizasFallar()
  
  // Filtramos las propuestas por los intereses del usuario
  // Si no hay intereses (caso de onboarding saltado), o el usuario no tiene intereses, tal vez queramos mostrar todo o nada.
  // El requerimiento dice: "El feed está filtrado por los intereses del usuario y eso se dice explícitamente".
  let filtradas = propuestas.filter(p => p.estado === 'publicada' || p.estado === 'cerrada' || p.estado === 'procesando')
  
  // Sin intereses elegidos ("Entrar sin filtros" en el onboarding) mostramos
  // todo sin filtrar — es lo que promete esa pantalla, no un estado vacío forzado.
  if (interesesDelUsuario.length > 0) {
    filtradas = filtradas.filter(p => p.intereses.some(i => interesesDelUsuario.includes(i)))
  }

  // Orden simulado: las más recientes arriba (asumimos que 'p1' es más viejo que 'p2' pero mockearemos revirtiendo)
  // Como es mock, simplemente revertimos la lista para que las últimas estén primeras
  const resultado = [...filtradas].reverse().map(p => ({
    ...p,
    interesesDetalle: p.intereses.map(id => intereses.find(i => i.id === id)).filter(Boolean) as Interes[]
  }))

  return vacio(resultado as unknown as Propuesta[]) // Hacemos un cast para evitar cambiar el contrato principal
}

/* ---- Detalle, respuesta del diputado y notificaciones — Santiago ---- */

export async function getPropuesta(id: string): Promise<(Propuesta & { interesesDetalle: Interes[] }) | null> {
  await delay()
  quizasFallar()

  const p = propuestas.find(pr => pr.id === id)
  if (!p) return null

  return {
    ...p,
    interesesDetalle: p.intereses.map(iid => intereses.find(i => i.id === iid)).filter(Boolean) as Interes[]
  }
}

// Solo mockeamos respuesta para las propuestas que tienen tieneRespuesta: true
const RESPUESTAS: Record<string, Respuesta> = {
  p02: {
    id: 'r-p02',
    propuestaId: 'p02',
    diputado: { id: 'dip02', nombre: 'María S.', bloque: 'Eco + Vamos' },
    texto: 'Muchas gracias por sus opiniones. Coincidimos en la importancia de modernizar los hospitales departamentales y vamos a incorporar varias de las sugerencias recibidas antes del tratamiento en comisión.',
    audioUrl: null,
    createdAt: '2026-07-26T10:00:00Z',
  },
  p04: {
    id: 'r-p04',
    propuestaId: 'p04',
    diputado: { id: 'dip01', nombre: 'Juan G.', bloque: 'Unión por Corrientes' },
    texto: 'El nuevo régimen tarifario ya fue aprobado y entra en vigencia el próximo ciclo lectivo. Gracias por acompañar el proceso con sus sapucais.',
    audioUrl: null,
    createdAt: '2026-06-20T09:00:00Z',
  },
  p10: {
    id: 'r-p10',
    propuestaId: 'p10',
    diputado: { id: 'dip05', nombre: 'Ana P.', bloque: 'Bloque Libre' },
    texto: 'Tomamos nota de los reclamos y vamos a revisar el proyecto antes de la próxima sesión.',
    audioUrl: null,
    createdAt: '2026-07-28T09:00:00Z',
  },
  p15: {
    id: 'r-p15',
    propuestaId: 'p15',
    diputado: { id: 'dip05', nombre: 'Ana P.', bloque: 'Bloque Libre' },
    texto: 'Gracias por participar. Vamos a incorporar el feedback en la próxima versión del proyecto.',
    audioUrl: null,
    createdAt: '2026-07-29T09:00:00Z',
  },
  p20: {
    id: 'r-p20',
    propuestaId: 'p20',
    diputado: { id: 'dip05', nombre: 'Ana P.', bloque: 'Bloque Libre' },
    texto: 'Este proyecto sigue en comisión, pero ya tenemos en cuenta los aportes de la ciudadanía.',
    audioUrl: null,
    createdAt: '2026-07-30T09:00:00Z',
  },
}

export async function getRespuesta(propuestaId: string): Promise<Respuesta | null> {
  await delay()
  quizasFallar()

  return RESPUESTAS[propuestaId] || null
}

const NOTIFICACIONES: Notificacion[] = [
  {
    id: 'n1',
    tipo: 'respuesta_diputado',
    propuestaId: 'p02',
    propuestaTitulo: propuestas.find(p => p.id === 'p02')?.titulo || '',
    leida: false,
    createdAt: '2026-07-26T10:00:00Z',
  },
  {
    id: 'n2',
    tipo: 'nueva_propuesta',
    propuestaId: 'p05',
    propuestaTitulo: propuestas.find(p => p.id === 'p05')?.titulo || '',
    leida: false,
    createdAt: '2026-07-30T11:00:00Z',
  },
  {
    id: 'n3',
    tipo: 'respuesta_diputado',
    propuestaId: 'p04',
    propuestaTitulo: propuestas.find(p => p.id === 'p04')?.titulo || '',
    leida: true,
    createdAt: '2026-06-20T09:00:00Z',
  },
  {
    id: 'n4',
    tipo: 'nueva_propuesta',
    propuestaId: 'p03',
    propuestaTitulo: propuestas.find(p => p.id === 'p03')?.titulo || '',
    leida: true,
    createdAt: '2026-07-22T14:30:00Z',
  },
]

export async function getNotificaciones(): Promise<Notificacion[]> {
  await delay()
  quizasFallar()

  return vacio(NOTIFICACIONES)
}

export async function contarNoLeidas(): Promise<number> {
  await delay(200)
  quizasFallar()

  return NOTIFICACIONES.filter(n => !n.leida).length
}

