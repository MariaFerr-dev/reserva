import { prisma } from "../../../lib/prisma";

export async function POST(request: Request) {
  const form = await request.formData();
  const id = form.get("id");

  if (typeof id !== "string") {
    return new Response("ID inválido", { status: 400 });
  }

  await prisma.resource.delete({ where: { id } });

  return new Response(null, { status: 303, headers: { Location: "/" } });
}
