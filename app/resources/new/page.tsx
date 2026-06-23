import Link from "next/link";

export default async function NewResource() {
  return (
    <main style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Crear recurso</h1>
      <form action="/api/resources/new" method="post" style={{ display: "grid", gap: 12, maxWidth: 420 }}>
        <label>
          Nombre
          <input name="name" required style={{ width: "100%", padding: 8, marginTop: 4 }} />
        </label>
        <label>
          Descripción
          <textarea name="description" required style={{ width: "100%", padding: 8, marginTop: 4 }} />
        </label>
        <label>
          Ubicación
          <input name="location" required style={{ width: "100%", padding: 8, marginTop: 4 }} />
        </label>
        <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
          <button type="submit" style={{ padding: 10, background: "#0b5fff", color: "white", border: "none", borderRadius: 6 }}>
            Guardar
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
