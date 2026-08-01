export default function BackofficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 max-w-[1280px] mx-auto min-h-screen">
      {children}
    </div>
  );
}
