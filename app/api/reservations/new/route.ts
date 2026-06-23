import { prisma } from "../../../../lib/prisma";

export async function POST(request: Request) {
  const form = await request.formData();
  const userId = form.get("userId");
  const resourceId = form.get("resourceId");
  const date = form.get("date");
  const endTime = form.get("endTime");

  if (typeof userId !== "string" || typeof resourceId !== "string" || typeof date !== "string" || typeof endTime !== "string") {
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
      userId,
      resourceId,
      date: dateStart,
      endTime: dateEnd,
    },
  });

  return new Response(null, { status: 303, headers: { Location: "/" } });
}
