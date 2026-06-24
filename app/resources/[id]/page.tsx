import Link from "next/link";
import { prisma } from "../../../lib/prisma";

export const dynamic = "force-dynamic";

export default async function EditResource({ params }: { params: { id: string } }) {
  const resource = await prisma.resource.findUnique({ where: { id: params.id }, include: { horarios: true } });

  if (!resource) {
    return <main style={{ padding: 24 }}>Recurso no encontrado.</main>;
  }

  return (
    <main style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Editar recurso</h1>
      <form action="/resources/edit" method="post" style={{ display: "grid", gap: 12, maxWidth: 420 }}>
        <input type="hidden" name="id" value={resource.id} />
        <label>
          Nombre
          <input name="name" defaultValue={resource.name} required style={{ width: "100%", padding: 8, marginTop: 4 }} />
        </label>
        <label>
          Descripción
          <textarea name="description" defaultValue={resource.description} required style={{ width: "100%", padding: 8, marginTop: 4 }} />
        </label>
        <label>
          Ubicación
          <input name="location" defaultValue={resource.location} required style={{ width: "100%", padding: 8, marginTop: 4 }} />
        </label>
        <fieldset style={{ border: "1px solid #334155", padding: 16, borderRadius: 12, marginTop: 16 }}>
          <legend style={{ padding: "0 8px", color: "#cbd5e1" }}>Horarios</legend>
          {resource.horarios.length === 0 ? (
            <p style={{ color: "#94a3b8", marginBottom: 12 }}>No se han registrado horarios todavía.</p>
          ) : (
            <div style={{ display: "grid", gap: 12 }}>
              {resource.horarios.map((horario, index) => (
                <div key={horario.id} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                  <label style={{ display: "block" }}>
                    Día
                    <select
                      name="day[]"
                      defaultValue={horario.day}
                      style={{ width: "100%", padding: 8, marginTop: 4 }}
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
                  <label style={{ display: "block" }}>
                    Inicio
                    <input
                      type="time"
                      name="startTime[]"
                      defaultValue={new Date(horario.startTime).toISOString().slice(11, 16)}
                      style={{ width: "100%", padding: 8, marginTop: 4 }}
                    />
                  </label>
                  <label style={{ display: "block" }}>
                    Fin
                    <input
                      type="time"
                      name="endTime[]"
                      defaultValue={new Date(horario.endTime).toISOString().slice(11, 16)}
                      style={{ width: "100%", padding: 8, marginTop: 4 }}
                    />
                  </label>
                </div>
              ))}
            </div>
          )}
          {[...Array(3 - resource.horarios.length)].map((_, index) => (
            <div key={`empty-${index}`} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              <label style={{ display: "block" }}>
                Día
                <select name="day[]" style={{ width: "100%", padding: 8, marginTop: 4 }}>
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
              <label style={{ display: "block" }}>
                Inicio
                <input type="time" name="startTime[]" style={{ width: "100%", padding: 8, marginTop: 4 }} />
              </label>
              <label style={{ display: "block" }}>
                Fin
                <input type="time" name="endTime[]" style={{ width: "100%", padding: 8, marginTop: 4 }} />
              </label>
            </div>
          ))}
        </fieldset>
        <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
          <button type="submit" style={{ padding: 10, background: "#0b5fff", color: "white", border: "none", borderRadius: 6 }}>
            Actualizar
          </button>
          <Link href="/" style={{ padding: 10, border: "1px solid #ccc", borderRadius: 6, textDecoration: "none" }}>
            Cancelar
          </Link>
        </div>
      </form>
    </main>
  );
}
