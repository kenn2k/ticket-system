import { prisma } from "../lib/prisma";

export async function createComment(ticketId: number, message: string) {
  return prisma.comment.create({
    data: { ticketId, message },
  });
}
