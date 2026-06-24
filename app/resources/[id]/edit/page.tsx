import Link from "next/link";
import { prisma } from "../../../../lib/prisma";
import { getCurrentUser } from "../../../../lib/auth";

type ResourceWithHorarios = {
  id: string;
  name: string;
  description: string;
  location: string;
  createdAt: Date;
  horarios: Array<{ id: string; day: string; startTime: Date; endTime: Date }>;
};

export default async function EditResource({ params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  const resource = (await prisma.resource.findUnique({ where: { id: params.id }, include: { horarios: true } })) as ResourceWithHorarios | null;

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

        <div className="rounded-2xl border border-slate-700 bg-slate-950 p-6">
          <div className="text-sm font-semibold text-slate-200 mb-4">Horarios del recurso</div>
          <div className="grid gap-4">
            {resource.horarios?.map((horario, index) => (
              <div key={horario.id} className="grid grid-cols-3 gap-4">
                <label className="block">
                  <span className="text-sm text-slate-300">Día</span>
                  <select
                    name="day[]"
                    defaultValue={horario.day}
                    className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
                  >
                    <option value="">Selecciona</option>
                    <option value="Lunes">Lunes</option>
                    <option value="Martes">Martes</option>
                    <option value="Miércoles">Miércoles</option>
                    <option value="Jueves">Jueves</option>
                    <option value="Viernes">Viernes</option>
                    <option value="Sábado">Sábado</option>
                    <option value="Domingo">Domingo</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-sm text-slate-300">Inicio</span>
                  <input
                    name="startTime[]"
                    type="time"
                    defaultValue={new Date(horario.startTime).toISOString().slice(11, 16)}
                    className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-slate-300">Fin</span>
                  <input
                    name="endTime[]"
                    type="time"
                    defaultValue={new Date(horario.endTime).toISOString().slice(11, 16)}
                    className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
                  />
                </label>
              </div>
            ))}
            {[...Array(Math.max(0, 3 - (resource.horarios?.length ?? 0)))].map((_, index) => (
              <div key={`empty-${index}`} className="grid grid-cols-3 gap-4">
                <label className="block">
                  <span className="text-sm text-slate-300">Día</span>
                  <select name="day[]" className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white">
                    <option value="">Selecciona</option>
                    <option value="Lunes">Lunes</option>
                    <option value="Martes">Martes</option>
                    <option value="Miércoles">Miércoles</option>
                    <option value="Jueves">Jueves</option>
                    <option value="Viernes">Viernes</option>
                    <option value="Sábado">Sábado</option>
                    <option value="Domingo">Domingo</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-sm text-slate-300">Inicio</span>
                  <input name="startTime[]" type="time" className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white" />
                </label>
                <label className="block">
                  <span className="text-sm text-slate-300">Fin</span>
                  <input name="endTime[]" type="time" className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white" />
                </label>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-3">Puedes completar hasta 3 horarios. Deja vacíos los campos que no quieras guardar.</p>
        </div>

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
