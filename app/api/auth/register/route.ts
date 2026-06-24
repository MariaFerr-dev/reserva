import { prisma } from "../../../../lib/prisma";
import { hashPassword, generateSessionToken, setSessionCookie } from "../../../../lib/auth";

export async function POST(request: Request) {
  const form = await request.formData();
  const name = form.get("name");
  const email = form.get("email");
  const password = form.get("password");
  const role = form.get("role");

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    (role !== "USER" && role !== "ADMIN")
  ) {
    return new Response("Datos inválidos", { status: 400 });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return new Response("Email ya registrado", { status: 409 });
  }

  const passwordHash = await hashPassword(password);

  const user = await prisma.user.create({
    data: { name, email, passwordHash, role },
  });

  const token = await generateSessionToken(user.id);
  setSessionCookie(token);

  return new Response(null, { status: 303, headers: { Location: "/my-reservations" } });
}
