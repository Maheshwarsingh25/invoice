const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * GET Invoice Details
 */
exports.getInvoiceDetails = async (req, res) => {
  const id = parseInt(req.params.id);

  const invoice = await prisma.invoice.findUnique({
    where: { id },
    include: {
      lines: true,
      payments: true,
    },
  });

  if (!invoice) {
    return res.status(404).json({ message: "Invoice not found" });
  }

  // Overdue Logic
  const isOverdue =
    invoice.status !== "PAID" &&
    new Date(invoice.dueDate) < new Date();

  res.json({
    ...invoice,
    isOverdue,
  });
};


exports.addPayment = async (req, res) => {
  const id = parseInt(req.params.id);
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Amount must be greater than 0" });
  }

  const invoice = await prisma.invoice.findUnique({
    where: { id },
  });

  if (!invoice) {
    return res.status(404).json({ message: "Invoice not found" });
  }

  if (amount > invoice.balanceDue) {
    return res.status(400).json({ message: "Overpayment not allowed" });
  }

  await prisma.payment.create({
    data: {
      invoiceId: id,
      amount,
    },
  });

  const newAmountPaid = invoice.amountPaid + amount;
  const newBalance = invoice.total - newAmountPaid;

  await prisma.invoice.update({
    where: { id },
    data: {
      amountPaid: newAmountPaid,
      balanceDue: newBalance,
      status: newBalance === 0 ? "PAID" : "DRAFT",
    },
  });

  res.json({ message: "Payment added successfully" });
};


exports.archiveInvoice = async (req, res) => {
  const id = parseInt(req.params.id);

  await prisma.invoice.update({
    where: { id },
    data: { isArchived: true },
  });

  res.json({ message: "Invoice archived" });
};

exports.restoreInvoice = async (req, res) => {
  const id = parseInt(req.params.id);

  await prisma.invoice.update({
    where: { id },
    data: { isArchived: false },
  });

  res.json({ message: "Invoice restored" });
};
