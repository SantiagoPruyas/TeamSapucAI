/**
 * lib/mock/delay.ts — Malen (S1M pendiente, stub creado por Lara para desbloquear S2L)
 * Ver §12: Bitácora de choques — Lara necesitó stub de delay.ts para S2L.
 * TODO: Malen reemplaza este archivo en S1M con la implementación completa.
 */

import { getModoMock } from './state'

export async function delay(ms = 450): Promise<void> {
  const modo = getModoMock()
  if (typeof window === 'undefined') return
  const base = modo === 'lento' ? ms * 6 : ms
  const jitter = Math.random() * 300 - 150
  await new Promise(r => setTimeout(r, Math.max(0, base + jitter)))
}

export function quizasFallar(): void {
  const modo = getModoMock()
  if (modo === 'error') {
    throw new Error('mock: falló la red')
  }
}

export function vacio<T>(v: T[]): T[] {
  const modo = getModoMock()
  return modo === 'vacio' ? [] : v
}
