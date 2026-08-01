/**
 * lib/mock/api.citizen.ts — Lara
 *
 * Contrato mock del carril ciudadano.
 * NUNCA se importan los datos directamente de data.ts desde la UI.
 * Toda función: await delay() → quizasFallar() → devolver dato.
 * TODO: cuando llegue el backend, reemplazar el cuerpo de cada función.
 */

import { delay, quizasFallar, vacio } from './delay'
import type { Interes, Departamento, Perfil, Propuesta } from '../types'
import { propuestas, intereses } from './data'

/* ---- Intereses del catálogo cerrado ---- */
const INTERESES: Interes[] = [
  { id: 'salud',       slug: 'salud',       nombre: 'Salud',             icono: '🏥' },
  { id: 'educacion',   slug: 'educacion',   nombre: 'Educación',         icono: '📚' },
  { id: 'seguridad',   slug: 'seguridad',   nombre: 'Seguridad',         icono: '🛡️' },
  { id: 'trabajo',     slug: 'trabajo',     nombre: 'Trabajo',           icono: '🔧' },
  { id: 'obras',       slug: 'obras',       nombre: 'Obras Públicas',    icono: '🏗️' },
  { id: 'campo',       slug: 'campo',       nombre: 'Campo y Producción',icono: '🌾' },
  { id: 'ambiente',    slug: 'ambiente',    nombre: 'Ambiente',          icono: '🌿' },
  { id: 'transporte',  slug: 'transporte',  nombre: 'Transporte',        icono: '🚌' },
  { id: 'cultura',     slug: 'cultura',     nombre: 'Cultura',           icono: '🎭' },
  { id: 'ninez',       slug: 'ninez',       nombre: 'Niñez y Familia',   icono: '👨‍👩‍👧' },
]

/* ---- 25 departamentos reales de Corrientes ---- */
const DEPARTAMENTOS: Departamento[] = [
  { id: 'bella-vista',         nombre: 'Bella Vista' },
  { id: 'beron-astrada',       nombre: 'Berón de Astrada' },
  { id: 'capital',             nombre: 'Capital' },
  { id: 'concepcion',          nombre: 'Concepción' },
  { id: 'curuzucuatia',        nombre: 'Curuzú Cuatiá' },
  { id: 'empedrado',           nombre: 'Empedrado' },
  { id: 'esquina',             nombre: 'Esquina' },
  { id: 'gal-alvear',          nombre: 'General Alvear' },
  { id: 'gral-paz',            nombre: 'General Paz' },
  { id: 'goya',                nombre: 'Goya' },
  { id: 'itati',               nombre: 'Itatí' },
  { id: 'ituzaingo',           nombre: 'Ituzaingó' },
  { id: 'lavalle',             nombre: 'Lavalle' },
  { id: 'mburucuya',           nombre: 'Mburucuyá' },
  { id: 'mercedes',            nombre: 'Mercedes' },
  { id: 'monte-caseros',       nombre: 'Monte Caseros' },
  { id: 'paso-libres',         nombre: 'Paso de los Libres' },
  { id: 'saladas',             nombre: 'Saladas' },
  { id: 'san-cosme',           nombre: 'San Cosme' },
  { id: 'san-luis-palmar',     nombre: 'San Luis del Palmar' },
  { id: 'san-martin',          nombre: 'San Martín' },
  { id: 'san-miguel',          nombre: 'San Miguel' },
  { id: 'san-roque',           nombre: 'San Roque' },
  { id: 'santo-tome',          nombre: 'Santo Tomé' },
  { id: 'sauce',               nombre: 'Sauce' },
]

/* ---- API functions ---- */

export async function getIntereses(): Promise<Interes[]> {
  await delay()
  quizasFallar()
  return vacio(INTERESES)
}

export async function getDepartamentos(): Promise<Departamento[]> {
  await delay(200)
  quizasFallar()
  return vacio(DEPARTAMENTOS)
}

export async function guardarPerfil(perfil: Omit<Perfil, 'id'>): Promise<Perfil> {
  await delay(600)
  quizasFallar()
  return { ...perfil, id: `perfil-mock-${Date.now()}` }
}

export async function getFeed(interesesDelUsuario: string[]): Promise<Propuesta[]> {
  await delay(800)
  quizasFallar()
  
  // Filtramos las propuestas por los intereses del usuario
  // Si no hay intereses (caso de onboarding saltado), o el usuario no tiene intereses, tal vez queramos mostrar todo o nada.
  // El requerimiento dice: "El feed está filtrado por los intereses del usuario y eso se dice explícitamente".
  let filtradas = propuestas.filter(p => p.estado === 'publicada' || p.estado === 'cerrada' || p.estado === 'procesando')
  
  if (interesesDelUsuario.length > 0) {
    filtradas = filtradas.filter(p => p.intereses.some(i => interesesDelUsuario.includes(i)))
  } else {
    // Si no tiene intereses elegidos, forzamos array vacío para el estado vacío
    filtradas = []
  }

  // Orden simulado: las más recientes arriba (asumimos que 'p1' es más viejo que 'p2' pero mockearemos revirtiendo)
  // Como es mock, simplemente revertimos la lista para que las últimas estén primeras
  const resultado = [...filtradas].reverse().map(p => ({
    ...p,
    interesesDetalle: p.intereses.map(id => intereses.find(i => i.id === id)).filter(Boolean) as Interes[]
  }))
  
  return vacio(resultado as unknown as Propuesta[]) // Hacemos un cast para evitar cambiar el contrato principal
}

