import { delay, quizasFallar } from './delay'
import { Propuesta, Interes, Argumento } from '../types'
import { propuestas, intereses } from './data'

let idCounter = 100

// Simulamos una "base de datos" en memoria local
const dbPropuestas: Propuesta[] = [...propuestas]

export async function pedirSugerenciaIA(texto: string) {
  // Simulamos la latencia de la red (se multiplicará x6 si el DevSwitcher está en modo "lento")
  await delay(1000)
  
  // Simulamos fallo si el DevSwitcher está en modo "error"
  quizasFallar()

  // Respuesta "IA" simulada
  // Devolvemos 1 a 3 intereses al azar del catálogo
  const sugeridos = intereses.slice(0, Math.floor(Math.random() * 3) + 1).map(i => i.id)

  return {
    resumenIa: "Esta es una síntesis generada por la IA que resume el proyecto de ley para facilitar su comprensión al ciudadano.",
    interesesSugeridos: sugeridos
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
  'p1': [
    { texto: 'Fomenta el desarrollo tecnológico en toda la provincia', personas: 45, postura: 'a_favor' },
    { texto: 'El presupuesto asignado no está claro en el artículo 4', personas: 23, postura: 'en_contra' },
    { texto: 'Mejora las oportunidades para los jóvenes del interior', personas: 15, postura: 'a_favor' }
  ],
  'p2': [
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

export async function generarArgumentos(propuestaId: string): Promise<Argumento[]> {
  // Simulamos un delay largo para el modo AI (se multiplica en modo lento)
  await delay(2000)
  quizasFallar()

  const nuevosArgumentos: Argumento[] = [
    { texto: 'Este proyecto es vital para nuestra comunidad', personas: 10, postura: 'a_favor' },
    { texto: 'Necesita más revisiones de presupuesto', personas: 4, postura: 'en_contra' },
    { texto: 'Podría beneficiar a algunos, pero perjudicar a otros', personas: 2, postura: 'neutro' }
  ]
  dbArgumentos[propuestaId] = nuevosArgumentos
  return nuevosArgumentos
}
