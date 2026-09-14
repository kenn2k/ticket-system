import type { SubmitEventHandler } from "react";
import { createTicket } from "../api/ticketsApi";

type Props = {
  onCreated: () => void;
};

export const TicketForm = ({ onCreated }: Props) => {
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      await createTicket(formData);

      form.reset();

      onCreated();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" required />

      <textarea name="description" placeholder="Description" required />

      <select name="status" defaultValue="open">
        <option value="open">Open</option>
        <option value="in_progress">In progress</option>
        <option value="resolved">Resolved</option>
      </select>

      <select name="priority" defaultValue="medium">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button type="submit">Create ticket</button>
    </form>
  );
};
