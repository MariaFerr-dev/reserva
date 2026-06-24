import { prisma } from "../../../../lib/prisma";
import { getCurrentUser } from "../../../../lib/auth";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  if (!user) {
    return new Response("No autorizado", { status: 401 });
  }

  const { id } = params;
  const reservation = await prisma.reservation.findUnique({ where: { id } });

  // Solo el propietario o admin pueden eliminar
  if (!reservation || (reservation.userId !== user.id && user.role !== "ADMIN")) {
    return new Response("No autorizado", { status: 403 });
  }

  await prisma.reservation.delete({ where: { id } });
  return new Response(null, { status: 303, headers: { Location: "/my-reservations" } });
}
