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
    <div>
      <h3>Comments</h3>

      {comments.map((comment) => (
        <p key={comment.id}>{comment.message}</p>
      ))}

      <form onSubmit={handleSubmit}>
        <input name="message" placeholder="Message" required />

        <button type="submit">Add comment</button>
      </form>
    </div>
  );
};
