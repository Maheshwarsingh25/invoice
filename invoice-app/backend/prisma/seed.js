const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const invoice = await prisma.invoice.create({
    data: {
      invoiceNumber: "INV-1001",
      customerName: "John Doe",
      issueDate: new Date(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      lines: {
        create: [
          {
            description: "Website Design",
            quantity: 2,
            unitPrice: 500,
            lineTotal: 1000,
          },
          {
            description: "Hosting",
            quantity: 1,
            unitPrice: 200,
            lineTotal: 200,
          },
        ],
      },
      total: 1200,
      balanceDue: 1200,
    },
  });

  console.log("Seeded:", invoice);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
