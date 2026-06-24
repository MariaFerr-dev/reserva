import { prisma } from "../../../../lib/prisma";
import { hashPassword, requireAdmin } from "../../../../lib/auth";

export async function POST(request: Request) {
  try {
    await requireAdmin();
  } catch (error) {
    const status = error instanceof Error && error.message === "Forbidden" ? 403 : 401;
    return new Response("No autorizado", { status });
  }

  const form = await request.formData();
  const name = form.get("name");
  const email = form.get("email");
  const password = form.get("password");
  const rawRole = form.get("role");
  const role = typeof rawRole === "string" ? rawRole : "USER";

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    (role !== "USER" && role !== "ADMIN")
  ) {
    return new Response("Datos inválidos", { status: 400 });
  }

  const passwordHash = await hashPassword(password);

  await prisma.user.create({ data: { name, email, passwordHash, role } });
  return new Response(null, { status: 303, headers: { Location: "/" } });
}
