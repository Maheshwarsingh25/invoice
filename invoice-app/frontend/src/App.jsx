import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreateInvoice from "./pages/CreateInvoice";
import InvoiceDetails from "./pages/InvoiceDetails";
import "./App.css";

function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <h2>InvoicePro</h2>
        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/create">Create Invoice</Link>
        </nav>
      </aside>

      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateInvoice />} />
          <Route path="/invoice/:id" element={<InvoiceDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
