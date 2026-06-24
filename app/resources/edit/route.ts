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
  const name = form.get("name");
  const description = form.get("description");
  const location = form.get("location");
  const days = form.getAll("day[]") as string[];
  const startTimes = form.getAll("startTime[]") as string[];
  const endTimes = form.getAll("endTime[]") as string[];

  if (typeof id !== "string" || typeof name !== "string" || typeof description !== "string" || typeof location !== "string") {
    return new Response("Datos inválidos", { status: 400 });
  }

  const horarios = days
    .map((day, index) => {
      const startTime = startTimes[index];
      const endTime = endTimes[index];
      if (!day || !startTime || !endTime) return null;
      const startDate = new Date(`1970-01-01T${startTime}:00`);
      const endDate = new Date(`1970-01-01T${endTime}:00`);
      if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) return null;
      return { day, startTime: startDate, endTime: endDate };
    })
    .filter(Boolean) as Array<{ day: string; startTime: Date; endTime: Date }>;

  await prisma.resource.update({
    where: { id },
    data: {
      name,
      description,
      location,
      horarios: {
        deleteMany: {},
        create: horarios,
      },
    },
  });

  return new Response(null, { status: 303, headers: { Location: "/" } });
}
