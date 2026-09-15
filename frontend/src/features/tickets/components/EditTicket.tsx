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
    <form className="mt-4 border-t border-slate-200 pt-4" onSubmit={handleSubmit}>
      <div className="grid gap-3 md:grid-cols-[1fr_1.4fr_150px_150px_auto]">
        <input
          className="h-10 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-slate-500"
          name="title"
          defaultValue={title}
          required
        />

        <textarea
          className="min-h-10 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          name="description"
          defaultValue={description}
          required
        />

        <select
          className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-slate-500"
          name="status"
          defaultValue={status}
        >
          <option value="open">Open</option>
          <option value="in_progress">In progress</option>
          <option value="resolved">Resolved</option>
        </select>

        <select
          className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-slate-500"
          name="priority"
          defaultValue={priority}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button
          className="h-10 rounded-md bg-slate-900 px-4 text-sm font-medium text-white"
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  );
};
