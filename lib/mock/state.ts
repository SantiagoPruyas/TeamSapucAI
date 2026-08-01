export type ModoMock = 'ok' | 'vacio' | 'lento' | 'error'

export function getModoMock(): ModoMock {
  if (typeof window === 'undefined') return 'ok'
  const mode = localStorage.getItem('sapucai:mock') as ModoMock | null
  return mode || 'ok'
}

export function setModoMock(modo: ModoMock) {
  if (typeof window === 'undefined') return
  localStorage.setItem('sapucai:mock', modo)
}
