import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function DisenoPage() {
  return (
    <div className="container mx-auto p-8 space-y-12">
      <div className="space-y-4">
        <h1 className="font-display text-4xl font-bold tracking-tight text-primary">Guía de Diseño SapucAI</h1>
        <p className="text-muted-foreground text-lg">Galería de tokens, tipografías y componentes.</p>
      </div>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold border-b border-border pb-2">Colores</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="space-y-2">
            <div className="h-24 rounded-md bg-indigo-nocturno border border-border"></div>
            <p className="text-sm font-medium">Índigo Nocturno</p>
          </div>
          <div className="space-y-2">
            <div className="h-24 rounded-md bg-azul-yaguarete border border-border"></div>
            <p className="text-sm font-medium">Azul Yaguareté</p>
          </div>
          <div className="space-y-2">
            <div className="h-24 rounded-md bg-celeste-parana border border-border"></div>
            <p className="text-sm font-medium text-indigo-nocturno">Celeste Paraná</p>
          </div>
          <div className="space-y-2">
            <div className="h-24 rounded-md bg-tierra-colorada border border-border"></div>
            <p className="text-sm font-medium">Tierra Colorada</p>
          </div>
          <div className="space-y-2">
            <div className="h-24 rounded-md bg-dorado-lapacho border border-border"></div>
            <p className="text-sm font-medium">Dorado Lapacho</p>
          </div>
          <div className="space-y-2">
            <div className="h-24 rounded-md bg-blanco-niveo border border-border"></div>
            <p className="text-sm font-medium text-indigo-nocturno">Blanco Níveo</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold border-b border-border pb-2">Tipografía</h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-display text-6xl">Archivo (Display)</h3>
            <p className="text-muted-foreground">Usada para títulos y cabeceras. (font-display)</p>
          </div>
          <div className="space-y-2">
            <p className="font-sans text-xl">Libre Franklin (Body)</p>
            <p className="font-sans text-base">Usada para párrafos, botones, inputs y cuerpo de texto general. (font-sans)</p>
            <p className="text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold border-b border-border pb-2">Botones (Button)</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold border-b border-border pb-2">Badges</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold border-b border-border pb-2">Inputs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Email</label>
            <Input type="email" placeholder="ciudadano@corrientes.gob.ar" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Password</label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none">Disabled</label>
            <Input disabled placeholder="No disponible" />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold border-b border-border pb-2">Tarjetas (Card)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Título de Tarjeta</CardTitle>
              <CardDescription>Descripción de la tarjeta con información secundaria.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Contenido principal de la tarjeta. Aquí van los datos relevantes o formularios.</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost">Cancelar</Button>
              <Button>Aceptar</Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
}
