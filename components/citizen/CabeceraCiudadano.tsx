import React from 'react'

export function CabeceraCiudadano() {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center border-b border-[#14181F]/10">
      <div className="flex items-center gap-2">
        <span className="text-[#FBFAF7] font-display font-bold uppercase tracking-widest text-lg">
          SapucAI
        </span>
      </div>
      <div>
        {/* Espacio para icono de perfil, notificaciones, etc. en el futuro */}
      </div>
    </header>
  )
}
