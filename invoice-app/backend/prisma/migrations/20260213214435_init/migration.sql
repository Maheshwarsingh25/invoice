/*
  Warnings:

  - You are about to drop the column `amountPaid` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `balanceDue` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `customerName` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `dueDate` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `isArchived` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `issueDate` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the `InvoiceLine` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `amount` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientName` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "InvoiceLine" DROP CONSTRAINT "InvoiceLine_invoiceId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_invoiceId_fkey";

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "amountPaid",
DROP COLUMN "balanceDue",
DROP COLUMN "customerName",
DROP COLUMN "dueDate",
DROP COLUMN "isArchived",
DROP COLUMN "issueDate",
DROP COLUMN "status",
DROP COLUMN "total",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "clientName" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "InvoiceLine";

-- DropTable
DROP TABLE "Payment";

-- DropEnum
DROP TYPE "InvoiceStatus";
