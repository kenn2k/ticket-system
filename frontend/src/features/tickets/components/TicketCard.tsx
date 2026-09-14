import { useState } from "react";

import { EditTicket } from "./EditTicket";
import type { Tickets } from "../types";
import { TicketDetails } from "./TicketDetails";

type Props = Tickets & {
  onDelete: (id: number) => void;
  onUpdated: () => void;
};

export const TicketCard = ({
  title,
  id,
  description,
  status,
  priority,
  createdAt,
  onDelete,
  onUpdated,
}: Props) => {
  const [editing, setEditing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div>
      <h2>{title}</h2>

      <p>{description}</p>

      <p>Status: {status}</p>
      <p>Priority: {priority}</p>

      <p>Created: {new Date(createdAt).toLocaleString()}</p>

      <button onClick={() => setEditing((prev) => !prev)}>Edit</button>

      <button onClick={() => onDelete(id)}>Delete</button>

      <button onClick={() => setShowDetails((prev) => !prev)}>Comments</button>

      {editing && (
        <EditTicket
          id={id}
          title={title}
          description={description}
          status={status}
          priority={priority}
          onUpdated={() => {
            setEditing(false);
            onUpdated();
          }}
        />
      )}

      {showDetails && <TicketDetails ticketId={id} />}
    </div>
  );
};
