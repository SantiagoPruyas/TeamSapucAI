import { delay, quizasFallar } from './delay'
import { Propuesta, Interes, Argumento, Sapucai, Respuesta } from '../types'
import { propuestas, intereses, sapucais } from './data'

let idCounter = 100

// Simulamos una "base de datos" en memoria local
const dbPropuestas: Propuesta[] = [...propuestas]

function fallbackSugerencia(texto: string) {
  // Fallback local razonable si /api/ia/resumen no responde (red caída, servidor no levantó).
  const sugeridos = intereses.slice(0, Math.floor(Math.random() * 3) + 1).map(i => i.id)
  return {
    resumenIa: 'Esta es una síntesis generada por la IA que resume el proyecto de ley para facilitar su comprensión al ciudadano.',
    interesesSugeridos: sugeridos
  }
}

export async function pedirSugerenciaIA(texto: string): Promise<{ resumenIa: string; interesesSugeridos: string[] }> {
  try {
    const res = await fetch('/api/ia/resumen', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texto })
    })
    if (!res.ok) throw new Error(`/api/ia/resumen respondió ${res.status}`)
    const data = await res.json()
    // 'fuente' puede ser 'gemini' o 'mock' — la UI se comporta igual en ambos casos, no se distingue.
    return { resumenIa: data.resumenIa, interesesSugeridos: data.interesesSugeridos }
  } catch (e) {
    console.error('pedirSugerenciaIA: fallback local', e)
    return fallbackSugerencia(texto)
  }
}

export async function crearPropuesta(titulo: string, textoOriginal: string): Promise<Propuesta> {
  await delay()
  quizasFallar()
  
  const nuevaPropuesta: Propuesta = {
    id: `p${idCounter++}`,
    titulo: titulo || "Propuesta en carga",
    textoOriginal,
    resumenIa: null,
    estado: 'procesando',
    autorDiputado: { id: 'dip01', nombre: 'Juan G.', bloque: 'Unión por Corrientes' },
    intereses: [],
    publicadaAt: null,
    totalSapucais: 0,
    termometro: { aFavor: 0, enContra: 0, neutro: 0 },
    tieneRespuesta: false
  }

  dbPropuestas.push(nuevaPropuesta)
  return nuevaPropuesta
}

export async function publicarPropuesta(propuestaId: string, resumen: string, interesesSeleccionados: string[]): Promise<Propuesta> {
  await delay()
  quizasFallar()

  const pIndex = dbPropuestas.findIndex(p => p.id === propuestaId)
  if (pIndex === -1) throw new Error("Propuesta no encontrada")

  dbPropuestas[pIndex] = {
    ...dbPropuestas[pIndex],
    estado: 'publicada',
    resumenIa: resumen,
    intereses: interesesSeleccionados,
    publicadaAt: new Date().toISOString()
  }

  return dbPropuestas[pIndex]
}

export async function getPanel(propuestaId: string) {
  await delay()
  quizasFallar()

  const p = dbPropuestas.find(p => p.id === propuestaId)
  if (!p) throw new Error("Propuesta no encontrada")

  // Mockear datos extras de la propuesta como depto/participacion
  return {
    ...p,
    interesesDetalle: p.intereses.map(id => intereses.find(i => i.id === id)).filter(Boolean) as Interes[],
    participacionPorcentaje: 14.5,
    sapucaisPendientesAnalisis: 12
  }
}

// Simulamos que para algunas propuestas los argumentos ya están procesados y para otras no.
const dbArgumentos: Record<string, Argumento[]> = {
  'p01': [
    { texto: 'Fomenta el desarrollo tecnológico en toda la provincia', personas: 45, postura: 'a_favor' },
    { texto: 'El presupuesto asignado no está claro en el artículo 4', personas: 23, postura: 'en_contra' },
    { texto: 'Mejora las oportunidades para los jóvenes del interior', personas: 15, postura: 'a_favor' }
  ],
  'p02': [
    { texto: 'Es urgente proteger las reservas naturales de los incendios', personas: 120, postura: 'a_favor' },
    { texto: 'Falta especificar sanciones para los infractores', personas: 30, postura: 'en_contra' },
    { texto: 'Afecta la producción agrícola de pequeña escala', personas: 15, postura: 'en_contra' },
    { texto: 'Necesitamos más información técnica', personas: 8, postura: 'neutro' }
  ]
}

export async function getArgumentos(propuestaId: string): Promise<Argumento[]> {
  await delay()
  quizasFallar()

  return dbArgumentos[propuestaId] || null
}

function fallbackArgumentos(): Argumento[] {
  return [
    { texto: 'Este proyecto es vital para nuestra comunidad', personas: 10, postura: 'a_favor' },
    { texto: 'Necesita más revisiones de presupuesto', personas: 4, postura: 'en_contra' },
    { texto: 'Podría beneficiar a algunos, pero perjudicar a otros', personas: 2, postura: 'neutro' }
  ]
}

export async function generarArgumentos(propuestaId: string): Promise<Argumento[]> {
  const transcripciones = sapucais
    .filter(s => s.propuestaId === propuestaId && s.transcripcion !== null)
    .map(s => s.transcripcion as string)

  try {
    const res = await fetch('/api/ia/argumentos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transcripciones })
    })
    if (!res.ok) throw new Error(`/api/ia/argumentos respondió ${res.status}`)
    const data = await res.json()
    // 'fuente' puede ser 'gemini' o 'mock' — indistinguible a propósito en la UI.
    dbArgumentos[propuestaId] = data.argumentos
    return data.argumentos
  } catch (e) {
    console.error('generarArgumentos: fallback local', e)
    const nuevosArgumentos = fallbackArgumentos()
    dbArgumentos[propuestaId] = nuevosArgumentos
    return nuevosArgumentos
  }
}

export async function getSapucais(propuestaId: string): Promise<Sapucai[]> {
  await delay()
  quizasFallar()

  return sapucais.filter(s => s.propuestaId === propuestaId)
}

const dbRespuestas: Record<string, Respuesta> = {}

export async function publicarRespuesta(propuestaId: string, texto: string): Promise<Respuesta> {
  await delay()
  quizasFallar()

  const pIndex = dbPropuestas.findIndex(p => p.id === propuestaId)
  const diputado = pIndex !== -1
    ? dbPropuestas[pIndex].autorDiputado
    : { id: 'dip01', nombre: 'Juan G.', bloque: 'Unión por Corrientes' }

  const respuesta: Respuesta = {
    id: `r${idCounter++}`,
    propuestaId,
    diputado,
    texto,
    audioUrl: null,
    createdAt: new Date().toISOString()
  }

  dbRespuestas[propuestaId] = respuesta

  if (pIndex !== -1) {
    dbPropuestas[pIndex] = { ...dbPropuestas[pIndex], tieneRespuesta: true }
  }

  // Puente entre el carril del diputado y el carril ciudadano: la campanita del
  // ciudadano hace poll de esta clave cada 2s para enterarse de la respuesta nueva.
  if (typeof window !== 'undefined') {
    localStorage.setItem(
      'sapucai:respuesta-publicada',
      JSON.stringify({ propuestaId, texto, publicadaAt: respuesta.createdAt })
    )
  }

  return respuesta
}
