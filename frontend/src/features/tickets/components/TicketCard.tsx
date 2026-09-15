import { useState } from "react";

import { EditTicket } from "./EditTicket";
import type { Tickets } from "../types";
import { TicketDetails } from "./TicketDetails";

type Props = Tickets & {
  onDelete: (id: number) => void;
  onUpdated: () => void;
};

const statusStyles = {
  open: "bg-blue-50 text-blue-700 ring-blue-200",
  in_progress: "bg-amber-50 text-amber-700 ring-amber-200",
  resolved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

const priorityStyles = {
  low: "bg-slate-50 text-slate-600 ring-slate-200",
  medium: "bg-violet-50 text-violet-700 ring-violet-200",
  high: "bg-rose-50 text-rose-700 ring-rose-200",
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
    <article className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            {description}
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ring-1 ${statusStyles[status]}`}
          >
            {status.replace("_", " ")}
          </span>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ring-1 ${priorityStyles[priority]}`}
          >
            {priority}
          </span>
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-500">
        Created: {new Date(createdAt).toLocaleString()}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700"
          onClick={() => setEditing((prev) => !prev)}
        >
          Edit
        </button>

        <button
          className="rounded-md border border-rose-200 px-3 py-2 text-sm font-medium text-rose-700"
          onClick={() => onDelete(id)}
        >
          Delete
        </button>

        <button
          className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700"
          onClick={() => setShowDetails((prev) => !prev)}
        >
          Comments
        </button>
      </div>

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
    </article>
  );
};
