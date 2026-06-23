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
    <main style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Reservaa</h1>
      <p>CRUD fácil para recursos y reservas con base de datos Neon.</p>

      <section style={{ marginTop: 32 }}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Link href="/resources/new" style={{ padding: 12, background: "#0b5fff", color: "white", textDecoration: "none", borderRadius: 8 }}>
            Crear recurso
          </Link>
          <Link href="/users/new" style={{ padding: 12, background: "#0b8500", color: "white", textDecoration: "none", borderRadius: 8 }}>
            Crear usuario
          </Link>
          <Link href="/reservations/new" style={{ padding: 12, background: "#ff7a00", color: "white", textDecoration: "none", borderRadius: 8 }}>
            Crear reserva
          </Link>
        </div>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>Usuarios</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Nombre</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Email</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Rol</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: UserRow) => (
              <tr key={user.id}>
                <td style={{ padding: 8 }}>{user.name}</td>
                <td style={{ padding: 8 }}>{user.email}</td>
                <td style={{ padding: 8 }}>{user.role}</td>
                <td style={{ padding: 8 }}>
                  <form action={`/users/${user.id}/delete`} method="post" style={{ display: "inline" }}>
                    <button type="submit" style={{ color: "#c00", border: "none", background: "transparent", cursor: "pointer" }}>
                      Eliminar
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>Recursos</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Nombre</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Ubicación</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Reservas</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((resource: ResourceRow) => (
              <tr key={resource.id}>
                <td style={{ padding: 8 }}>{resource.name}</td>
                <td style={{ padding: 8 }}>{resource.location}</td>
                <td style={{ padding: 8 }}>{resource.reservations.length}</td>
                <td style={{ padding: 8 }}>
                  <Link href={`/resources/${resource.id}/edit`} style={{ marginRight: 8 }}>
                    Editar
                  </Link>
                  <form action={`/resources/${resource.id}/delete`} method="post" style={{ display: "inline" }}>
                    <button type="submit" style={{ color: "#c00", border: "none", background: "transparent", cursor: "pointer" }}>
                      Eliminar
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>Reservas recientes</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Usuario</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Recurso</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Fecha</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Hora final</th>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: 8 }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation: ReservationRow) => (
              <tr key={reservation.id}>
                <td style={{ padding: 8 }}>{reservation.user.name}</td>
                <td style={{ padding: 8 }}>{reservation.resource.name}</td>
                <td style={{ padding: 8 }}>{format(new Date(reservation.date), "dd/MM/yyyy HH:mm")}</td>
                <td style={{ padding: 8 }}>{format(new Date(reservation.endTime), "dd/MM/yyyy HH:mm")}</td>
                <td style={{ padding: 8 }}>
                  <form action={`/reservations/${reservation.id}/delete`} method="post" style={{ display: "inline" }}>
                    <button type="submit" style={{ color: "#c00", border: "none", background: "transparent", cursor: "pointer" }}>
                      Cancelar
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
