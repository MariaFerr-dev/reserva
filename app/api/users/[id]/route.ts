import { prisma } from "../../../../lib/prisma";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  await prisma.user.delete({ where: { id } });
  return new Response(null, { status: 204 });
}
