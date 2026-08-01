export default function CitizenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full sm:w-[420px] min-h-screen relative">
      {children}
    </div>
  );
}
