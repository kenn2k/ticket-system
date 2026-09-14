import express from "express";
import ticketsRouter from "./routes/ticketRoute";
import cors from "cors";

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
};
const PORT = 4000;
app.use(cors(corsOptions));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ ok: true });
});

app.use("/tickets", ticketsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
