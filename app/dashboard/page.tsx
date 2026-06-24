import Link from "next/link";
import { prisma } from "../../lib/prisma";
import { format } from "date-fns";

export default async function DashboardPage() {
  const users = await prisma.user.findMany({ orderBy: { name: "asc" } });
  const resources = await prisma.resource.findMany({ orderBy: { createdAt: "desc" } });
  const reservations = await prisma.reservation.findMany({
    include: { user: true, resource: true },
    orderBy: { date: "desc" },
  });

  return (
    <main className="space-y-8">
      <div className="card">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              Panel de administración
            </h1>
            <p className="text-lg text-slate-400">Consulta recursos, usuarios y reservas en un solo lugar.</p>
          </div>
          <div className="text-6xl opacity-20">📊</div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-8">
          <Link href="/resources/new" className="btn-primary flex items-center justify-center gap-2 h-20 text-lg">
            Crear Recurso
          </Link>
          <Link href="/users/new" className="btn-secondary flex items-center justify-center gap-2 h-20 text-lg">
            Crear Usuario
          </Link>
          <Link href="/reservations/new" className="btn-accent flex items-center justify-center gap-2 h-20 text-lg">
            Crear Reserva
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="card text-center">
          <div className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            {users.length}
          </div>
          <div className="text-sm text-slate-400 mt-2">Usuarios registrados</div>
        </div>
        <div className="card text-center">
          <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {resources.length}
          </div>
          <div className="text-sm text-slate-400 mt-2">Recursos disponibles</div>
        </div>
        <div className="card text-center">
          <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
            {reservations.length}
          </div>
          <div className="text-sm text-slate-400 mt-2">Reservas activas</div>
        </div>
      </div>
    </main>
  );
}
