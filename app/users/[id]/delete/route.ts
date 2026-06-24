import { prisma } from "../../../../lib/prisma";
import { requireAdmin } from "../../../../lib/auth";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();
  } catch (error) {
    const status = error instanceof Error && error.message === "Forbidden" ? 403 : 401;
    return new Response("No autorizado", { status });
  }

  const { id } = params;
  await prisma.user.delete({ where: { id } });
  return new Response(null, { status: 303, headers: { Location: "/" } });
}
