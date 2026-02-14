import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function InvoiceDetails() {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    fetchInvoice();
  }, []);

  const fetchInvoice = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/invoices/${id}`);
      setInvoice(res.data);
    } catch (error) {
      console.error("Error fetching invoice:", error.response?.data || error);
    }
  };

  if (!invoice) return <p>Loading...</p>;

  return (
    <div className="card">
      <h2>Invoice Details</h2>
      <p><strong>ID:</strong> {invoice.id}</p>
      <p><strong>Client:</strong> {invoice.clientName}</p>
      <p><strong>Amount:</strong> ₹ {invoice.amount}</p>
      <p><strong>Invoice Number:</strong> {invoice.invoiceNumber}</p>
    </div>
  );
}

export default InvoiceDetails;
