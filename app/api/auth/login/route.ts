import { prisma } from "../../../../lib/prisma";
import { verifyPassword, generateSessionToken, setSessionCookie } from "../../../../lib/auth";

export async function POST(request: Request) {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return new Response("Datos inválidos", { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.passwordHash) {
    return new Response("Credenciales inválidas", { status: 401 });
  }

  const passwordMatches = await verifyPassword(password, user.passwordHash);
  if (!passwordMatches) {
    return new Response("Credenciales inválidas", { status: 401 });
  }

  const token = await generateSessionToken(user.id);
  setSessionCookie(token);
  return new Response(null, { status: 303, headers: { Location: "/my-reservations" } });
}
