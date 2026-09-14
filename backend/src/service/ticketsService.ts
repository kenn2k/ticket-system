import { prisma } from "../lib/prisma";

type CreateTicketData = {
  title: string;
  description: string;
  status: string;
  priority: string;
};

type UpdateTicketData = {
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
};

export const getTickets = async () => {
  return prisma.ticket.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      comments: true,
    },
  });
};

export const getTicketById = async (id: number) => {
  return prisma.ticket.findUnique({
    where: { id },
  });
};

export const createTicket = async (data: CreateTicketData) => {
  return prisma.ticket.create({
    data,
  });
};

export const updateTicket = async (id: number, data: UpdateTicketData) => {
  return prisma.ticket.update({
    where: { id },
    data,
  });
};

export const deleteTicket = async (id: number) => {
  return prisma.ticket.delete({
    where: { id },
  });
};
