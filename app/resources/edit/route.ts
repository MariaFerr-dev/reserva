import { prisma } from "../../../lib/prisma";

export async function POST(request: Request) {
  const form = await request.formData();
  const id = form.get("id");
  const name = form.get("name");
  const description = form.get("description");
  const location = form.get("location");

  if (typeof id !== "string" || typeof name !== "string" || typeof description !== "string" || typeof location !== "string") {
    return new Response("Datos inválidos", { status: 400 });
  }

  await prisma.resource.update({
    where: { id },
    data: { name, description, location },
  });

  return new Response(null, { status: 303, headers: { Location: "/" } });
}
