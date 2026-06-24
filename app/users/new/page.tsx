import Link from "next/link";
import { getCurrentUser } from "../../../lib/auth";

export default async function NewUser() {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    return (
      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="rounded-2xl border border-slate-700 bg-slate-950 p-6 text-slate-300">
          No tienes permiso para crear usuarios.
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Crear usuario</h1>
      <form action="/api/users/new" method="post" className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium">Nombre</span>
          <input name="name" required className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white" />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Correo electrónico</span>
          <input name="email" type="email" required className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white" />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Contraseña</span>
          <input name="password" type="password" required className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white" />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Rol</span>
          <select name="role" className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white">
            <option value="USER">Usuario</option>
            <option value="ADMIN">Administrador</option>
          </select>
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
