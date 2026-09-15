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
    <form
      className="rounded-md border border-slate-200 bg-white p-4 shadow-sm"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-3 md:grid-cols-[1fr_1.4fr_160px_160px_auto] md:items-start">
        <input
          className="h-10 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-slate-500"
          name="title"
          placeholder="Title"
          required
        />

        <textarea
          className="min-h-10 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
          name="description"
          placeholder="Description"
          required
        />

        <select
          className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-slate-500"
          name="status"
          defaultValue="open"
        >
          <option value="open">Open</option>
          <option value="in_progress">In progress</option>
          <option value="resolved">Resolved</option>
        </select>

        <select
          className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-slate-500"
          name="priority"
          defaultValue="medium"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button
          className="h-10 rounded-md bg-slate-900 px-4 text-sm font-medium text-white"
          type="submit"
        >
          Create
        </button>
      </div>
    </form>
  );
};
