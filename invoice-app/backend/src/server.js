const express = require("express");
const cors = require("cors");
const invoiceRoutes = require("./routes/invoice.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/invoices", invoiceRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
