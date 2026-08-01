/**
 * lib/mock/state.ts — Malen (S1M pendiente, stub creado por Lara para desbloquear S2L)
 */

export type ModoMock = 'ok' | 'vacio' | 'lento' | 'error'

export function getModoMock(): ModoMock {
  if (typeof window === 'undefined') return 'ok'
  const stored = localStorage.getItem('sapucai:mock')
  const validModes: ModoMock[] = ['ok', 'vacio', 'lento', 'error']
  return validModes.includes(stored as ModoMock) ? (stored as ModoMock) : 'ok'
}

export function setModoMock(modo: ModoMock): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('sapucai:mock', modo)
}
