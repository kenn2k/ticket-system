import type { SubmitEventHandler } from "react";
import { updateTicket } from "../api/ticketsApi";
import type { TicketPriority, TicketStatus } from "../types";

type Props = {
  id: number;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  onUpdated: () => void;
};

export const EditTicket = ({
  id,
  title,
  description,
  status,
  priority,
  onUpdated,
}: Props) => {
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      await updateTicket(id, formData);

      onUpdated();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" defaultValue={title} required />

      <textarea name="description" defaultValue={description} required />

      <select name="status" defaultValue={status}>
        <option value="open">Open</option>
        <option value="in_progress">In progress</option>
        <option value="resolved">Resolved</option>
      </select>

      <select name="priority" defaultValue={priority}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button type="submit">Save</button>
    </form>
  );
};
