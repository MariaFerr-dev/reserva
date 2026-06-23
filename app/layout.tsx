import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reservaa",
  description: "Aplicación CRUD de reservas con Neon y Vercel",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
