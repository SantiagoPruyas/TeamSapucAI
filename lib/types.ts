/**
 * lib/types.ts — Malen (S1M pendiente, stub creado por Lara para desbloquear S2L)
 * TODO: Malen copia los tipos exactos de §4 del PLAN-FRONT.md en S1M.
 */

export type Rol = 'ciudadano' | 'equipo_camara' | 'diputado'
export type Postura = 'a_favor' | 'en_contra' | 'neutro'
export type EstadoPropuesta = 'borrador' | 'procesando' | 'publicada' | 'cerrada'
export type EstadoProcesamiento = 'pendiente' | 'listo' | 'error'
export type TipoNotificacion = 'nueva_propuesta' | 'respuesta_diputado'

export type Interes = { id: string; slug: string; nombre: string; icono: string }
export type Departamento = { id: string; nombre: string }

export type Perfil = {
  id: string; rol: Rol; nombre: string; dni: string
  departamentoId: string; intereses: string[]
}

export type Propuesta = {
  id: string; titulo: string; textoOriginal: string
  resumenIa: string | null
  estado: EstadoPropuesta
  autorDiputado: { id: string; nombre: string; bloque: string }
  intereses: string[]
  publicadaAt: string | null
  totalSapucais: number
  termometro: { aFavor: number; enContra: number; neutro: number }
  tieneRespuesta: boolean
}

export type Sapucai = {
  id: string; propuestaId: string
  autor: { nombre: string; departamento: string }
  audioUrl: string | null
  duracionSeg: number | null
  transcripcion: string | null
  postura: Postura | null
  moderacionOk: boolean | null
  moderacionMotivo: string | null
  estadoProcesamiento: EstadoProcesamiento
  createdAt: string
}

export type Argumento = { texto: string; personas: number; postura: Postura }

export type Respuesta = {
  id: string; propuestaId: string
  diputado: { id: string; nombre: string; bloque: string }
  texto: string; audioUrl: string | null; createdAt: string
}

export type Notificacion = {
  id: string; tipo: TipoNotificacion
  propuestaId: string; propuestaTitulo: string
  leida: boolean; createdAt: string
}
