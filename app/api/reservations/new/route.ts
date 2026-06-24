import { prisma } from "../../../../lib/prisma";
import { requireUser } from "../../../../lib/auth";

export async function POST(request: Request) {
  let user;
  try {
    user = await requireUser();
  } catch (error) {
    const status = error instanceof Error && error.message === "Forbidden" ? 403 : 401;
    return new Response("No autorizado", { status });
  }

  const form = await request.formData();
  const resourceId = form.get("resourceId");
  const date = form.get("date");
  const endTime = form.get("endTime");

  if (typeof resourceId !== "string" || typeof date !== "string" || typeof endTime !== "string") {
    return new Response("Datos inválidos", { status: 400 });
  }

  const dateStart = new Date(date);
  const dateEnd = new Date(endTime);

  if (isNaN(dateStart.getTime()) || isNaN(dateEnd.getTime()) || dateStart >= dateEnd) {
    return new Response("Fecha o intervalo inválido.", { status: 400 });
  }

  const conflict = await prisma.reservation.findFirst({
    where: {
      resourceId,
      OR: [
        { date: { lte: dateStart }, endTime: { gt: dateStart } },
        { date: { gte: dateStart, lt: dateEnd } },
      ],
    },
  });

  if (conflict) {
    return new Response("Conflicto de horario detectado.", { status: 400 });
  }

  await prisma.reservation.create({
    data: {
      userId: user.id,
      resourceId,
      date: dateStart,
      endTime: dateEnd,
    },
  });

  return new Response(null, { status: 303, headers: { Location: "/my-reservations" } });
}
