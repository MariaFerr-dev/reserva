import Link from "next/link";
import { prisma } from "../../../../lib/prisma";

export default async function EditResource({ params }: { params: { id: string } }) {
  const resource = await prisma.resource.findUnique({ where: { id: params.id } });

  if (!resource) {
    return <main style={{ padding: 24 }}>Recurso no encontrado.</main>;
  }

  return (
    <main style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Editar recurso</h1>
      <form action="/resources/edit" style={{ display: "grid", gap: 12, maxWidth: 420 }}>
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
