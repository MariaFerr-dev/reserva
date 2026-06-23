import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reservaa",
  description: "Aplicación CRUD de reservas con Neon y Vercel",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <header className="border-b border-slate-200 bg-white/60 backdrop-blur sticky top-0 z-40">
          <div className="container flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 py-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-white font-bold">R</div>
              <div>
                <div className="text-lg font-semibold">Reservaa</div>
                <div className="text-sm text-slate-500">Gestor de recursos y reservas</div>
              </div>
            </Link>
            <nav className="flex items-center gap-3">
              <Link href="/resources/new" className="text-sm px-3 py-2 bg-indigo-600 text-white rounded-md">Nuevo Recurso</Link>
              <Link href="/reservations/new" className="text-sm px-3 py-2 bg-amber-500 text-white rounded-md">Nueva Reserva</Link>
            </nav>
          </div>
        </header>

        <main className="container py-8">{children}</main>

        <footer className="mt-12 py-8 text-center text-sm text-slate-500">
          Hecho con ❤️ — Reservaa
        </footer>
      </body>
    </html>
  );
}
