import Link from "next/link";
import { getCurrentUser } from "../../../lib/auth";

export default async function NewResource() {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    return (
      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="rounded-2xl border border-slate-700 bg-slate-950 p-6 text-slate-300">
          No tienes permiso para registrar nuevos recursos.
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Crear recurso</h1>
      <form action="/api/resources/new" method="post" className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium">Nombre</span>
          <input name="name" required className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white" />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Descripción</span>
          <textarea name="description" required className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white" />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Ubicación</span>
          <input name="location" required className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white" />
        </label>
        <div className="flex gap-4 mt-4">
          <button type="submit" className="btn-primary py-3 px-6">
            Guardar
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
