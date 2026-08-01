import { getModoMock } from './state'

export async function delay(ms = 450): Promise<void> {
  const modo = getModoMock()
  
  // Base jitter: +/- 150ms
  const jitter = Math.floor(Math.random() * 300) - 150
  let finalMs = ms + jitter
  
  if (modo === 'lento') {
    finalMs *= 6
  }

  return new Promise((resolve) => setTimeout(resolve, Math.max(0, finalMs)))
}

export function quizasFallar() {
  const modo = getModoMock()
  if (modo === 'error') {
    throw new Error('mock: falló la red')
  }
}

export function vacio<T>(v: T[]): T[] {
  const modo = getModoMock()
  if (modo === 'vacio') {
    return []
  }
  return v
}
