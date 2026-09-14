export type Tickets = {
  id: number;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: Date;
};

export type Comment = {
  id: number;
  ticketId: number;
  message: string;
  createdAt: Date;
};

export type TicketStatus = "open" | "in_progress" | "resolved";
export type TicketPriority = "low" | "medium" | "high";
