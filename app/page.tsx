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
    <main>
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Reservaa</h1>
            <p className="text-slate-600 mt-1">CRUD fácil para recursos y reservas con base de datos Neon.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/resources/new" className="px-3 py-2 rounded-md bg-indigo-600 text-white">Crear recurso</Link>
            <Link href="/users/new" className="px-3 py-2 rounded-md bg-emerald-600 text-white">Crear usuario</Link>
            <Link href="/reservations/new" className="px-3 py-2 rounded-md bg-amber-500 text-white">Crear reserva</Link>
          </div>
        </div>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">Usuarios</h2>
          <div className="overflow-x-auto mt-4">
            <table className="w-full table-auto">
              <thead className="text-sm text-slate-500">
                <tr>
                  <th className="text-left pb-2">Nombre</th>
                  <th className="text-left pb-2">Email</th>
                  <th className="text-left pb-2">Rol</th>
                  <th className="text-left pb-2">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {users.map((user: UserRow) => (
                  <tr key={user.id} className="py-2">
                    <td className="py-3">{user.name}</td>
                    <td className="py-3">{user.email}</td>
                    <td className="py-3">{user.role}</td>
                    <td className="py-3">
                      <form action={`/users/${user.id}/delete`} method="post" className="inline">
                        <button type="submit" className="text-sm text-red-600">Eliminar</button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">Recursos</h2>
          <div className="overflow-x-auto mt-4">
            <table className="w-full table-auto">
              <thead className="text-sm text-slate-500">
                <tr>
                  <th className="text-left pb-2">Nombre</th>
                  <th className="text-left pb-2">Ubicación</th>
                  <th className="text-left pb-2">Reservas</th>
                  <th className="text-left pb-2">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {resources.map((resource: ResourceRow) => (
                  <tr key={resource.id} className="py-2">
                    <td className="py-3">{resource.name}</td>
                    <td className="py-3">{resource.location}</td>
                    <td className="py-3">{resource.reservations.length}</td>
                    <td className="py-3">
                      <Link href={`/resources/${resource.id}/edit`} className="mr-3 text-slate-600">Editar</Link>
                      <form action={`/resources/${resource.id}/delete`} method="post" className="inline">
                        <button type="submit" className="text-sm text-red-600">Eliminar</button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">Reservas recientes</h2>
          <div className="overflow-x-auto mt-4">
            <table className="w-full table-auto">
              <thead className="text-sm text-slate-500">
                <tr>
                  <th className="text-left pb-2">Usuario</th>
                  <th className="text-left pb-2">Recurso</th>
                  <th className="text-left pb-2">Fecha</th>
                  <th className="text-left pb-2">Hora final</th>
                  <th className="text-left pb-2">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {reservations.map((reservation: ReservationRow) => (
                  <tr key={reservation.id} className="py-2">
                    <td className="py-3">{reservation.user.name}</td>
                    <td className="py-3">{reservation.resource.name}</td>
                    <td className="py-3">{format(new Date(reservation.date), "dd/MM/yyyy HH:mm")}</td>
                    <td className="py-3">{format(new Date(reservation.endTime), "dd/MM/yyyy HH:mm")}</td>
                    <td className="py-3">
                      <form action={`/reservations/${reservation.id}/delete`} method="post" className="inline">
                        <button type="submit" className="text-sm text-red-600">Cancelar</button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
