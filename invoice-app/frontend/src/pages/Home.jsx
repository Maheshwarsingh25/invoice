import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/invoices");
      setInvoices(res.data);
    } catch (error) {
      console.error("Error fetching invoices:", error.response?.data || error);
    }
  };

  const deleteInvoice = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/invoices/${id}`);
      fetchInvoices();
    } catch (error) {
      console.error("Error deleting invoice:", error.response?.data || error);
    }
  };

  return (
    <div className="card">
      <h2>Dashboard</h2>
      <p>Total Invoices: {invoices.length}</p>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Client</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>{invoice.clientName}</td>
              <td>₹ {invoice.amount}</td>
              <td>
                <Link to={`/invoice/${invoice.id}`}>
                  <button className="secondary">View</button>
                </Link>
                <button
                  className="danger"
                  onClick={() => deleteInvoice(invoice.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
