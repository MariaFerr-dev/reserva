import { prisma } from "../../../lib/prisma";
import { getCurrentUser } from "../../../lib/auth";
import Link from "next/link";
import { format } from "date-fns";

interface ReservationDetailsProps {
  params: { id: string };
}

export default async function ReservationDetailsPage({ params }: ReservationDetailsProps) {
  const reservation = await prisma.reservation.findUnique({
    where: { id: params.id },
    include: { user: true, resource: true },
  });

  if (!reservation) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="rounded-2xl border border-slate-700 bg-slate-950 p-6 text-slate-300">
          Reserva no encontrada.
        </div>
        <Link href="/calendar" className="btn-primary mt-6 inline-block">
          Volver al calendario
        </Link>
      </main>
    );
  }

  const user = await getCurrentUser();
  const canDelete = user && (user.id === reservation.userId || user.role === "ADMIN");

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 space-y-6">
      <div className="rounded-2xl border border-slate-700 bg-slate-950 p-6 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Reserva #{reservation.id}</h1>
            <p className="text-sm text-slate-400">Recurso: {reservation.resource.name}</p>
          </div>
          <div className="text-right text-sm text-slate-400">
            <div>Creada por: {reservation.user.name}</div>
            <div>{reservation.user.email}</div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <div className="text-sm uppercase tracking-wide text-slate-500">Inicio</div>
            <div className="mt-2 text-lg font-semibold">
              {format(new Date(reservation.date), "dd/MM/yyyy HH:mm")}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <div className="text-sm uppercase tracking-wide text-slate-500">Fin</div>
            <div className="mt-2 text-lg font-semibold">
              {format(new Date(reservation.endTime), "dd/MM/yyyy HH:mm")}
            </div>
          </div>
        </div>

        <div className="text-slate-300">
          <p>Descripción del recurso:</p>
          <p className="mt-2 text-sm text-slate-400">{reservation.resource.description || "No hay descripción disponible."}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/calendar" className="btn-secondary">
            Volver al calendario
          </Link>
          {canDelete ? (
            <form action={`/reservations/${reservation.id}/delete`} method="post" className="inline">
              <button type="submit" className="btn-danger">
                Cancelar reserva
              </button>
            </form>
          ) : null}
        </div>
      </div>
    </main>
  );
}
