import { prisma } from "../../../../lib/prisma";

export async function POST(request: Request) {
  const form = await request.formData();
  const name = form.get("name");
  const email = form.get("email");
  const role = form.get("role");

  if (typeof name !== "string" || typeof email !== "string" || (role !== "USER" && role !== "ADMIN")) {
    return new Response("Datos inválidos", { status: 400 });
  }

  await prisma.user.create({ data: { name, email, role } });
  return new Response(null, { status: 303, headers: { Location: "/" } });
}
