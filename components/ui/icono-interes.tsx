import { Heart, Book, Shield, Briefcase, Hammer, Tractor, Leaf, Bus, Palette, Users, Tag, type LucideProps } from 'lucide-react'

/**
 * lib/mock/data.ts guarda `icono` como nombre de ícono de lucide-react
 * ("heart", "book", ...), no como emoji — este es el único punto de mapeo
 * a componente real. `Tag` es el fallback si aparece un nombre no mapeado.
 */
const ICONOS: Record<string, React.ComponentType<LucideProps>> = {
  heart: Heart,
  book: Book,
  shield: Shield,
  briefcase: Briefcase,
  hammer: Hammer,
  tractor: Tractor,
  leaf: Leaf,
  bus: Bus,
  palette: Palette,
  users: Users,
}

export function IconoInteres({ nombre, ...props }: { nombre: string } & LucideProps) {
  const Icono = ICONOS[nombre] ?? Tag
  return <Icono {...props} />
}
