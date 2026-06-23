import Link from "next/link";
import { prisma } from "../lib/prisma";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

type UserRow = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type ResourceRow = {
  id: string;
  name: string;
  location: string;
  reservations: Array<unknown>;
};

type ReservationRow = {
  id: string;
  user: { name: string };
  resource: { name: string };
  date: string | Date;
  endTime: string | Date;
};

async function getData() {
  const users = await prisma.user.findMany({ orderBy: { name: "asc" } });
  const resources = await prisma.resource.findMany({
    include: { reservations: true },
    orderBy: { createdAt: "desc" },
  });
  const reservations = await prisma.reservation.findMany({
    include: { user: true, resource: true },
    orderBy: { date: "desc" },
  });
  return { users, resources, reservations };
}

export default async function Home() {
  const { users, resources, reservations } = await getData();

  return (
    <main className="space-y-8">
      {/* Hero Section */}
      <div className="card">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              Gestiona tus Recursos
            </h1>
            <p className="text-lg text-slate-400">Plataforma inteligente para control de reservas y recursos</p>
          </div>
          <div className="text-6xl opacity-20">📊</div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8">
          <Link
            href="/resources/new"
            className="btn-primary flex items-center justify-center gap-2 h-20 text-lg group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-700 group-hover:scale-105 transition-transform duration-300" />
            <span className="relative">⚙️ Crear Recurso</span>
          </Link>
          <Link
            href="/users/new"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:shadow-glow transition-all hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 h-20 text-lg group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700 group-hover:scale-105 transition-transform duration-300" />
            <span className="relative">👤 Crear Usuario</span>
          </Link>
          <Link
            href="/reservations/new"
            className="btn-accent flex items-center justify-center gap-2 h-20 text-lg group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 group-hover:scale-105 transition-transform duration-300" />
            <span className="relative">📅 Crear Reserva</span>
          </Link>
        </div>
      </div>

      {/* Stats */}
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

      {/* Users Section */}
      <div className="card">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          👥 Usuarios ({users.length})
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="text-left py-4 px-4 text-slate-300 font-semibold">Nombre</th>
                <th className="text-left py-4 px-4 text-slate-300 font-semibold">Email</th>
                <th className="text-left py-4 px-4 text-slate-300 font-semibold">Rol</th>
                <th className="text-left py-4 px-4 text-slate-300 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: UserRow) => (
                <tr
                  key={user.id}
                  className="border-b border-slate-700/30 hover:bg-slate-700/30 transition-colors"
                >
                  <td className="py-4 px-4">{user.name}</td>
                  <td className="py-4 px-4 text-slate-400">{user.email}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === "ADMIN"
                          ? "bg-red-500/20 text-red-300"
                          : "bg-blue-500/20 text-blue-300"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <form action={`/users/${user.id}/delete`} method="post" className="inline">
                      <button
                        type="submit"
                        className="text-red-400 hover:text-red-300 transition-colors text-sm font-semibold"
                      >
                        🗑️ Eliminar
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resources Section */}
      <div className="card">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          ⚙️ Recursos ({resources.length})
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="text-left py-4 px-4 text-slate-300 font-semibold">Nombre</th>
                <th className="text-left py-4 px-4 text-slate-300 font-semibold">Ubicación</th>
                <th className="text-left py-4 px-4 text-slate-300 font-semibold">Reservas</th>
                <th className="text-left py-4 px-4 text-slate-300 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((resource: ResourceRow) => (
                <tr
                  key={resource.id}
                  className="border-b border-slate-700/30 hover:bg-slate-700/30 transition-colors"
                >
                  <td className="py-4 px-4 font-semibold">{resource.name}</td>
                  <td className="py-4 px-4 text-slate-400">{resource.location}</td>
                  <td className="py-4 px-4">
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 rounded-full text-sm font-bold">
                      {resource.reservations.length}
                    </span>
                  </td>
                  <td className="py-4 px-4 space-x-3">
                    <Link
                      href={`/resources/${resource.id}/edit`}
                      className="text-indigo-400 hover:text-indigo-300 transition-colors text-sm font-semibold"
                    >
                      ✏️ Editar
                    </Link>
                    <form action={`/resources/${resource.id}/delete`} method="post" className="inline">
                      <button
                        type="submit"
                        className="text-red-400 hover:text-red-300 transition-colors text-sm font-semibold"
                      >
                        🗑️ Eliminar
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reservations Section */}
      <div className="card">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          📅 Reservas Recientes ({reservations.length})
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="text-left py-4 px-4 text-slate-300 font-semibold">Usuario</th>
                <th className="text-left py-4 px-4 text-slate-300 font-semibold">Recurso</th>
                <th className="text-left py-4 px-4 text-slate-300 font-semibold">Fecha Inicio</th>
                <th className="text-left py-4 px-4 text-slate-300 font-semibold">Fecha Fin</th>
                <th className="text-left py-4 px-4 text-slate-300 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation: ReservationRow) => (
                <tr
                  key={reservation.id}
                  className="border-b border-slate-700/30 hover:bg-slate-700/30 transition-colors"
                >
                  <td className="py-4 px-4">{reservation.user.name}</td>
                  <td className="py-4 px-4 font-semibold">{reservation.resource.name}</td>
                  <td className="py-4 px-4 text-slate-400 text-sm">
                    {format(new Date(reservation.date), "dd/MM/yyyy HH:mm")}
                  </td>
                  <td className="py-4 px-4 text-slate-400 text-sm">
                    {format(new Date(reservation.endTime), "dd/MM/yyyy HH:mm")}
                  </td>
                  <td className="py-4 px-4">
                    <form action={`/reservations/${reservation.id}/delete`} method="post" className="inline">
                      <button
                        type="submit"
                        className="text-red-400 hover:text-red-300 transition-colors text-sm font-semibold"
                      >
                        ❌ Cancelar
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
