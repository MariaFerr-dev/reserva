import { prisma } from "../../../../lib/prisma";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  await prisma.reservation.delete({ where: { id } });
  return new Response(null, { status: 303, headers: { Location: "/" } });
}
