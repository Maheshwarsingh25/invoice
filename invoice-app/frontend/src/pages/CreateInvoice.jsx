import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateInvoice() {
  const [clientName, setClientName] = useState("");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/invoices", 
 {
      clientName,
      amount: Number(amount),
    });

    navigate("/");
  };

 return (
  <div className="card">
    <h2>Create Invoice</h2>

    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <div style={{ marginBottom: "15px" }}>
        <label>Client Name</label><br />
        <input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          required
          style={{ padding: "8px", width: "300px" }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Amount</label><br />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          style={{ padding: "8px", width: "300px" }}
        />
      </div>

      <button type="submit" className="primary">
        Create Invoice
      </button>
    </form>
  </div>
);

}

export default CreateInvoice;
