import { prisma } from "../../../lib/prisma";
import { requireAdmin } from "../../../lib/auth";

export async function POST(request: Request) {
  try {
    await requireAdmin();
  } catch (error) {
    const status = error instanceof Error && error.message === "Forbidden" ? 403 : 401;
    return new Response("No autorizado", { status });
  }

  const form = await request.formData();
  const id = form.get("id");

  if (typeof id !== "string") {
    return new Response("ID inválido", { status: 400 });
  }

  await prisma.resource.delete({ where: { id } });

  return new Response(null, { status: 303, headers: { Location: "/" } });
}
