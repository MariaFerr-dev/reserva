import { prisma } from "../../lib/prisma";
import { getCurrentUser } from "../../lib/auth";
import Link from "next/link";
import { format } from "date-fns";

export default async function MyReservationsPage() {
  const user = await getCurrentUser();
  if (!user) {
    return <div className="max-w-3xl mx-auto px-6 py-12">Necesitas iniciar sesión.</div>;
  }

  const reservations = await prisma.reservation.findMany({
    where: { userId: user.id },
    include: { resource: true },
    orderBy: { date: "desc" },
  });

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 space-y-6">
      <h1 className="text-3xl font-bold">Mis reservas</h1>
      <div className="space-y-4">
        {reservations.length === 0 ? (
          <div className="rounded-2xl border border-slate-700 bg-slate-950 p-6 text-slate-300">
            No tienes reservas activas.
          </div>
        ) : (
          reservations.map((reservation) => (
            <div key={reservation.id} className="rounded-2xl border border-slate-700 bg-slate-950 p-6">
              <div className="text-lg font-semibold">{reservation.resource.name}</div>
              <div className="text-sm text-slate-400">
                Inicio: {format(new Date(reservation.date), "dd/MM/yyyy HH:mm")}
              </div>
              <div className="text-sm text-slate-400">
                Fin: {format(new Date(reservation.endTime), "dd/MM/yyyy HH:mm")}
              </div>
              <div className="mt-3 flex gap-3">
                <form action={`/reservations/${reservation.id}/delete`} method="post">
                  <button className="btn-secondary">Cancelar reserva</button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
      <Link href="/reservations/new" className="btn-primary">
        Crear nueva reserva
      </Link>
    </main>
  );
}
