import Link from "next/link";
import { prisma } from "../../../../lib/prisma";
import { getCurrentUser } from "../../../../lib/auth";

export default async function EditResource({ params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  const resource = await prisma.resource.findUnique({ where: { id: params.id } });

  if (!user || user.role !== "ADMIN") {
    return (
      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="rounded-2xl border border-slate-700 bg-slate-950 p-6 text-slate-300">
          No tienes permiso para editar recursos.
        </div>
      </main>
    );
  }

  if (!resource) {
    return <main className="max-w-3xl mx-auto px-6 py-12">Recurso no encontrado.</main>;
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Editar recurso</h1>
      <form action="/resources/edit" method="post" className="space-y-4">
        <input type="hidden" name="id" value={resource.id} />
        <label className="block">
          <span className="text-sm font-medium">Nombre</span>
          <input
            name="name"
            defaultValue={resource.name}
            required
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Descripción</span>
          <textarea
            name="description"
            defaultValue={resource.description}
            required
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Ubicación</span>
          <input
            name="location"
            defaultValue={resource.location}
            required
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
          />
        </label>
        <div className="flex gap-4 mt-4">
          <button type="submit" className="btn-primary py-3 px-6">
            Actualizar
          </button>
          <Link href="/" className="btn-secondary py-3 px-6">
            Cancelar
          </Link>
        </div>
      </form>
    </main>
  );
}
