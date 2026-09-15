import "./App.css";
import { TicketList } from "./features/tickets/components/TicketsList";

function App() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900">
      <TicketList />
    </main>
  );
}

export default App;
