const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

// ✅ GET ALL INVOICES
router.get("/", async (req, res) => {
  try {
    const invoices = await prisma.invoice.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(invoices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching invoices" });
  }
});

// ✅ GET SINGLE INVOICE
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await prisma.invoice.findUnique({
      where: { id: Number(id) },
    });
    if (!invoice) return res.status(404).json({ error: "Invoice not found" });
    res.json(invoice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching invoice" });
  }
});

// ✅ CREATE INVOICE
router.post("/", async (req, res) => {
  try {
    const { clientName, amount } = req.body;
    const newInvoice = await prisma.invoice.create({
      data: {
        invoiceNumber: "INV-" + Date.now(), // auto generate
        clientName,
        amount: parseFloat(amount),
      },
    });
    res.status(201).json(newInvoice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating invoice" });
  }
});

// ✅ DELETE INVOICE
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedInvoice = await prisma.invoice.delete({
      where: { id: Number(id) },
    });
    res.json(deletedInvoice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting invoice" });
  }
});
// GET Invoice with all relations and calculations
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const invoice = await prisma.invoice.findUnique({
    where: { id: Number(id) },
    include: { lineItems: true, payments: true },
  });

  if (!invoice) return res.status(404).json({ error: "Not found" });

  // Calculate Totals
  const total = invoice.lineItems.reduce((sum, item) => sum + item.lineTotal, 0);
  const amountPaid = invoice.payments.reduce((sum, p) => sum + p.amount, 0);
  const balanceDue = total - amountPaid;

  res.json({ ...invoice, total, amountPaid, balanceDue });
});

// POST Add Payment
router.post("/:id/payments", async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;

  const invoice = await prisma.invoice.findUnique({
    where: { id: Number(id) },
    include: { lineItems: true, payments: true },
  });

  const total = invoice.lineItems.reduce((sum, item) => sum + item.lineTotal, 0);
  const amountPaid = invoice.payments.reduce((sum, p) => sum + p.amount, 0);
  const balanceDue = total - amountPaid;

  if (amount <= 0 || amount > balanceDue) {
    return res.status(400).json({ error: "Invalid payment amount" });
  }

  const payment = await prisma.payment.create({
    data: { invoiceId: Number(id), amount: parseFloat(amount) },
  });

  // Check if fully paid
  if (balanceDue - amount === 0) {
    await prisma.invoice.update({
      where: { id: Number(id) },
      data: { status: "PAID" },
    });
  }

  res.json(payment);
});

module.exports = router;
