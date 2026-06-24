import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ReservasApp",
  description: "Aplicación CRUD de reservas con Neon y Vercel",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <header className="border-b border-slate-700 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 backdrop-blur-xl sticky top-0 z-40 shadow-2xl">
          <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-glow transition-all">✨</div>
              <div>
                <div className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">ReservasApp</div>
                <div className="text-xs text-slate-400">Gestor inteligente</div>
              </div>
            </Link>
            <nav className="flex items-center gap-3">
              <Link href="/resources/new" className="btn-primary text-sm">
                ➕ Nuevo Recurso
              </Link>
              <Link href="/reservations/new" className="btn-accent text-sm">
                📅 Nueva Reserva
              </Link>
            </nav>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 py-12">{children}</main>

        <footer className="mt-16 py-8 text-center text-sm text-slate-500 border-t border-slate-700">
          <div className="max-w-6xl mx-auto">Maria Fernanda Rojas 🚀💜— ReservasApp</div>
        </footer>
      </body>
    </html>
  );
}
