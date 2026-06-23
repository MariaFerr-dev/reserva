import Link from "next/link";
import { prisma } from "../../../lib/prisma";

export default async function NewReservation() {
  const users = await prisma.user.findMany({ orderBy: { name: "asc" } });
  const resources = await prisma.resource.findMany({ orderBy: { name: "asc" } });

  return (
    <main style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Crear reserva</h1>
      <form action="/api/reservations/new" method="post" style={{ display: "grid", gap: 12, maxWidth: 420 }}>
        <label>
          Usuario
          <select name="userId" required style={{ width: "100%", padding: 8, marginTop: 4 }}>
            <option value="">Selecciona un usuario</option>
            {users.map((user: { id: string; name: string }) => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
        <label>
          Recurso
          <select name="resourceId" required style={{ width: "100%", padding: 8, marginTop: 4 }}>
            <option value="">Selecciona un recurso</option>
            {resources.map((resource: { id: string; name: string }) => (
              <option key={resource.id} value={resource.id}>{resource.name}</option>
            ))}
          </select>
        </label>
        <label>
          Fecha y hora inicio
          <input name="date" type="datetime-local" required style={{ width: "100%", padding: 8, marginTop: 4 }} />
        </label>
        <label>
          Fecha y hora fin
          <input name="endTime" type="datetime-local" required style={{ width: "100%", padding: 8, marginTop: 4 }} />
        </label>
        <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
          <button type="submit" style={{ padding: 10, background: "#0b5fff", color: "white", border: "none", borderRadius: 6 }}>
            Guardar reserva
          </button>
          <Link href="/" style={{ padding: 10, border: "1px solid #ccc", borderRadius: 6, textDecoration: "none" }}>
            Cancelar
          </Link>
        </div>
      </form>
    </main>
  );
}

export const dynamic = "force-dynamic";
