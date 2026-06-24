import { prisma } from "../../lib/prisma";
import { format } from "date-fns";
import Link from "next/link";

export default async function CalendarPage() {
  const reservations = await prisma.reservation.findMany({
    include: { user: true, resource: true },
    orderBy: { date: "asc" },
  });

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 space-y-6">
      <h1 className="text-3xl font-bold">Calendario de disponibilidad</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="rounded-2xl border border-slate-700 bg-slate-950 p-6">
            <div className="text-lg font-semibold">{reservation.resource.name}</div>
            <div className="text-sm text-slate-400">Usuario: {reservation.user.name}</div>
            <div className="mt-2 text-sm text-slate-300">
              <div>Inicio: {format(new Date(reservation.date), "dd/MM/yyyy HH:mm")}</div>
              <div>Fin: {format(new Date(reservation.endTime), "dd/MM/yyyy HH:mm")}</div>
            </div>
            <Link href={`/reservations/${reservation.id}`} className="mt-4 inline-block text-xs text-slate-400 hover:text-white">
              Ver reserva
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
