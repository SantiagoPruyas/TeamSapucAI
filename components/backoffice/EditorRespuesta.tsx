import React, { useState } from 'react'
import { Bold, Italic, Underline, Link, Paperclip, Check } from 'lucide-react'

export function EditorRespuesta() {
  const [texto, setTexto] = useState('Muchas gracias por sus opiniones. Coincidimos en la importancia de la salud mental en nuestras escuelas y vamos a seguir trabajando para que esta ley sea una realidad...')
  const [enviado, setEnviado] = useState(false)

  const handleEnviar = () => {
    setEnviado(true)
    setTimeout(() => setEnviado(false), 3000)
  }

  return (
    <div className="bg-white p-6 rounded shadow-sm border border-gray-100 flex flex-col h-full">
      <h2 className="text-gray-900 font-bold mb-4">Respuesta del diputado</h2>
      
      <div className="border border-gray-200 rounded flex-1 flex flex-col overflow-hidden mb-4">
        {/* Toolbar */}
        <div className="bg-gray-50 border-b border-gray-200 p-2 flex gap-2 text-gray-500">
          <button className="p-1 hover:bg-gray-200 rounded"><Bold size={16}/></button>
          <button className="p-1 hover:bg-gray-200 rounded"><Italic size={16}/></button>
          <button className="p-1 hover:bg-gray-200 rounded"><Underline size={16}/></button>
          <div className="w-px h-4 bg-gray-300 my-auto mx-1"></div>
          <button className="p-1 hover:bg-gray-200 rounded"><Link size={16}/></button>
          <button className="p-1 hover:bg-gray-200 rounded"><Paperclip size={16}/></button>
        </div>
        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          className="flex-1 w-full p-3 resize-none text-sm text-gray-800 outline-none"
        />
      </div>

      <div className="flex justify-between items-center">
        <button className="px-4 py-2 border border-gray-300 rounded text-sm font-semibold text-gray-700 hover:bg-gray-50">
          Guardar borrador
        </button>
        <button 
          onClick={handleEnviar}
          className={`px-6 py-2 rounded text-sm font-semibold text-white flex items-center gap-2 ${enviado ? 'bg-green-600' : 'bg-[#17264A] hover:bg-blue-900'}`}
        >
          {enviado ? <><Check size={16}/> Publicada</> : 'Publicar respuesta'}
        </button>
      </div>
    </div>
  )
}
