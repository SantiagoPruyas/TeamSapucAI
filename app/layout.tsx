import type { Metadata, Viewport } from "next";
import { fontDisplay, fontBody } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sapucái",
  description: "El estandarte cívico correntino",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR">
      <body
        className={`${fontDisplay.variable} ${fontBody.variable} antialiased`}
        style={{ backgroundColor: "#0D1730" }}
      >
        {children}
      </body>
    </html>
  );
}
