import { prisma } from "../../../../lib/prisma";
import { requireUser } from "../../../../lib/auth";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  let user;
  try {
    user = await requireUser();
  } catch (error) {
    const status = error instanceof Error && error.message === "Forbidden" ? 403 : 401;
    return new Response("No autorizado", { status });
  }

  const { id } = params;
  const reservation = await prisma.reservation.findUnique({ where: { id } });
  if (!reservation || reservation.userId !== user.id) {
    return new Response("No autorizado", { status: 403 });
  }

  await prisma.reservation.delete({ where: { id } });
  return new Response(null, { status: 303, headers: { Location: "/my-reservations" } });
}
