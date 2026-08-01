'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { FileText, Gavel, ShieldCheck } from 'lucide-react'

const NAV_ITEMS = [
  { href: '/cargar', label: 'Cargar propuesta', icon: FileText },
  { href: '/panel', label: 'Panel del diputado', icon: Gavel },
  { href: '/moderacion', label: 'Moderación', icon: ShieldCheck },
]

export function NavLateral() {
  const pathname = usePathname()

  return (
    <aside className="w-full h-screen sticky top-0 bg-lienzo-hueso border-r border-hilo flex flex-col">
      <div className="flex items-center gap-3 px-5 py-6 border-b border-hilo">
        <Image
          src="/logo-hcdc2.png"
          alt="Honorable Cámara de Diputados de Corrientes"
          width={513}
          height={242}
          className="h-9 w-auto shrink-0"
          priority
        />
        <div className="flex flex-col leading-none min-w-0">
          <span className="t-label text-tinta-tenue whitespace-nowrap">Cámara de Corrientes</span>
          <span className="font-display font-bold uppercase tracking-widest text-base leading-tight mt-1">
            <span className="text-indigo-campo">Sapuc</span><span className="text-oro-filete">AI</span>
          </span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1.5">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const activo = pathname === href || pathname?.startsWith(`${href}/`)
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-full t-label transition-colors focus-visible:ring-oro ${
                activo
                  ? 'bg-indigo-campo text-blanco-cosido sombra-boton'
                  : 'text-tinta-tenue hover:bg-lienzo hover:text-tinta'
              }`}
            >
              <Icon size={17} className="shrink-0" aria-hidden />
              <span className="truncate">{label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="px-5 py-4 border-t border-hilo">
        <p className="t-label text-tinta-tenue leading-relaxed">Equipo de Cámara</p>
        <p className="t-label text-gris-pizarra leading-relaxed">datos de demostración</p>
      </div>
    </aside>
  )
}
