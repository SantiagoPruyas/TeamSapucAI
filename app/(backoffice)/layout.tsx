import { NavLateral } from '@/components/backoffice/NavLateral';

export default function BackofficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#0D1730] min-h-screen text-[#FBFAF7] grid grid-cols-1 md:grid-cols-12 max-w-[1280px] mx-auto">
      <div className="md:col-span-2 relative">
        <NavLateral />
      </div>
      <div className="md:col-span-10 p-8 min-h-screen">
        {children}
      </div>
    </div>
  );
}
