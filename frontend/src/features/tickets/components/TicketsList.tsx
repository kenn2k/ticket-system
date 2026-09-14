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
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Tickets</h1>

      <TicketForm onCreated={loadTickets} />

      {tickets.map((ticket) => (
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
      ))}
    </div>
  );
};
