import Link from 'next/link'
import { FileText, MessageSquare, Map, Settings } from 'lucide-react'

export function NavLateral() {
  return (
    <aside className="w-64 h-screen fixed left-0 top-0 bg-[#0D1730] border-r border-[#17264A] flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold font-display uppercase tracking-wider text-[#FBFAF7]">
          SapucAI <span className="text-[#C89A3C]">Gov</span>
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        <Link
          href="/backoffice/cargar"
          className="flex items-center gap-3 px-3 py-2 rounded text-[#FBFAF7] hover:bg-[#17264A] transition-colors"
        >
          <FileText size={18} className="text-[#D6CFC0]" />
          <span className="font-body text-sm font-semibold">Cargar Propuesta</span>
        </Link>
        <Link
          href="/backoffice/moderacion"
          className="flex items-center gap-3 px-3 py-2 rounded text-[#5A6472] hover:bg-[#17264A] hover:text-[#FBFAF7] transition-colors"
        >
          <MessageSquare size={18} />
          <span className="font-body text-sm font-semibold">Moderación</span>
        </Link>
        <Link
          href="/backoffice/mapa"
          className="flex items-center gap-3 px-3 py-2 rounded text-[#5A6472] hover:bg-[#17264A] hover:text-[#FBFAF7] transition-colors"
        >
          <Map size={18} />
          <span className="font-body text-sm font-semibold">Territorio</span>
        </Link>
      </nav>

      <div className="p-4 border-t border-[#17264A]">
        <button className="flex items-center gap-3 px-3 py-2 w-full text-left rounded text-[#5A6472] hover:bg-[#17264A] hover:text-[#FBFAF7] transition-colors">
          <Settings size={18} />
          <span className="font-body text-sm font-semibold">Ajustes</span>
        </button>
      </div>
    </aside>
  )
}
