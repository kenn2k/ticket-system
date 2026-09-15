import { useEffect, useState } from "react";
import type { Tickets } from "../types";
import { deleteTicket, getTickets } from "../api/ticketsApi";
import { TicketForm } from "./TicketForm";
import { TicketCard } from "./TicketCard";

export const TicketList = () => {
  const [tickets, setTickets] = useState<Tickets[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTickets = async () => {
    try {
      const data = await getTickets();
      setTickets(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const initialLoad = async () => {
      try {
        const data = await getTickets();
        setTickets(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    void initialLoad();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteTicket(id);

      setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <p className="mx-auto max-w-5xl rounded-md bg-white p-6 text-slate-600 shadow-sm">
        Loading...
      </p>
    );
  }

  return (
    <section className="mx-auto max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
          Tickets
        </h1>
      </div>

      <TicketForm onCreated={loadTickets} />

      <div className="mt-6 space-y-4">
        {tickets.length === 0 ? (
          <div className="rounded-md border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
            No tickets yet.
          </div>
        ) : (
          tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              id={ticket.id}
              title={ticket.title}
              description={ticket.description}
              status={ticket.status}
              priority={ticket.priority}
              createdAt={ticket.createdAt}
              onDelete={handleDelete}
              onUpdated={loadTickets}
            />
          ))
        )}
      </div>
    </section>
  );
};
