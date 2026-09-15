import { useState } from "react";
import type { SubmitEventHandler } from "react";

import { createComment } from "../api/ticketsApi";
import type { Comment } from "../types";

type Props = {
  ticketId: number;
};

export const TicketDetails = ({ ticketId }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const newComment = await createComment(ticketId, formData);

      setComments((prev) => [...prev, newComment]);

      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-4 border-t border-slate-200 pt-4">
      <h3 className="text-sm font-semibold text-slate-800">Comments</h3>

      <div className="mt-3 space-y-2">
        {comments.length === 0 ? (
          <p className="text-sm text-slate-500">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <p
              className="rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-700"
              key={comment.id}
            >
              {comment.message}
            </p>
          ))
        )}
      </div>

      <form className="mt-3 flex flex-col gap-2 sm:flex-row" onSubmit={handleSubmit}>
        <input
          className="h-10 flex-1 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-slate-500"
          name="message"
          placeholder="Message"
          required
        />

        <button
          className="h-10 rounded-md bg-slate-900 px-4 text-sm font-medium text-white"
          type="submit"
        >
          Add comment
        </button>
      </form>
    </div>
  );
};
