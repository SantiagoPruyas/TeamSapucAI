import React from 'react'
import Campanita from './Campanita'

export function CabeceraCiudadano() {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center border-b border-hilo">
      <div className="flex items-center gap-2">
        <span className="font-display font-bold uppercase tracking-widest text-lg">
          <span className="text-indigo-campo">Sapuc</span><span className="text-oro-filete">AI</span>
        </span>
      </div>
      <div>
        <Campanita />
      </div>
    </header>
  )
}
