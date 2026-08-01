import { NavLateral } from '@/components/backoffice/NavLateral';

export default function BackofficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-lienzo">
      <div className="grid grid-cols-1 md:grid-cols-12 max-w-[1280px] mx-auto">
        <div className="md:col-span-3">
          <NavLateral />
        </div>
        <div className="md:col-span-9 min-h-screen">
          {children}
        </div>
      </div>
    </div>
  );
}
