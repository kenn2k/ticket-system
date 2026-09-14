import { Router } from "express";
import {
  createTicket,
  deleteTicket,
  getTicketById,
  getTickets,
  updateTicket,
} from "../service/ticketsService";
import { createComment } from "../service/commentService";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const tickets = await getTickets();

    res.json(tickets);
  } catch (error) {
    res.status(500).json({
      error: "Failed to get tickets",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const ticket = await getTicketById(id);

    if (!ticket) {
      return res.status(404).json({
        error: "Ticket not found",
      });
    }

    res.json(ticket);
  } catch (error) {
    res.status(500).json({
      error: "Failed to get ticket",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;

    if (!title || !description || !status || !priority) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    const ticket = await createTicket({
      title,
      description,
      status,
      priority,
    });

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({
      error: "Failed to create ticket",
    });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const { title, description, status, priority } = req.body;

    const ticket = await updateTicket(id, {
      title,
      description,
      status,
      priority,
    });

    res.json(ticket);
  } catch (error) {
    res.status(500).json({
      error: "Failed to update ticket",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await deleteTicket(id);

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete ticket",
    });
  }
});

router.post("/:ticketId/comments", async (req, res) => {
  try {
    const ticketId = Number(req.params.ticketId);

    const { message } = req.body;

    const comment = await createComment(ticketId, message.trim());

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete ticket",
    });
  }
});

export default router;
