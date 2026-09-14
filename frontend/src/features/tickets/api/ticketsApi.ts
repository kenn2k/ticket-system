import type { Comment, Tickets } from "../types";

const API_URL = "http://localhost:4000/tickets";

// GET
export async function getTickets(): Promise<Tickets[]> {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch tickets");
  }

  return res.json();
}

// POST
export async function createTicket(formData: FormData): Promise<Tickets> {
  const data = Object.fromEntries(formData.entries());

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create tickets");
  }

  return res.json();
}

//PATCH
export async function updateTicket(
  id: number,
  formData: FormData
): Promise<Tickets> {
  const data = Object.fromEntries(formData.entries());
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to upadate ticket");
  }

  return res.json();
}

//DELETE
export async function deleteTicket(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete ticket");
  }
}

export async function createComment(
  ticketId: number,
  formData: FormData
): Promise<Comment> {
  const data = Object.fromEntries(formData.entries());
  const res = await fetch(`${API_URL}/${ticketId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create comment");
  }

  return res.json();
}
