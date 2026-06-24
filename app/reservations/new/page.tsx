import Link from "next/link";
import { prisma } from "../../../lib/prisma";
import { getCurrentUser } from "../../../lib/auth";

export default async function NewReservation() {
  const user = await getCurrentUser();
  const resources = await prisma.resource.findMany({ orderBy: { name: "asc" } });

  if (!user) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="rounded-2xl border border-slate-700 bg-slate-950 p-6 text-slate-300">
          Debes iniciar sesión para crear una reserva.
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Crear reserva</h1>
      <form action="/api/reservations/new" method="post" className="space-y-4">
        <input type="hidden" name="userId" value={user.id} />
        <label className="block">
          <span className="text-sm font-medium">Recurso</span>
          <select name="resourceId" required className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white">
            <option value="">Selecciona un recurso</option>
            {resources.map((resource: { id: string; name: string }) => (
              <option key={resource.id} value={resource.id}>{resource.name}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium">Fecha y hora inicio</span>
          <input name="date" type="datetime-local" required className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white" />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Fecha y hora fin</span>
          <input name="endTime" type="datetime-local" required className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white" />
        </label>
        <div className="flex gap-4 mt-4">
          <button type="submit" className="btn-primary py-3 px-6">
            Guardar reserva
          </button>
          <Link href="/" className="btn-secondary py-3 px-6">
            Cancelar
          </Link>
        </div>
      </form>
    </main>
  );
}

export const dynamic = "force-dynamic";
