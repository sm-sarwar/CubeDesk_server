/*
  Warnings:

  - You are about to drop the column `division` on the `customers` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "customers_division_idx";

-- AlterTable
ALTER TABLE "customers" DROP COLUMN "division",
ADD COLUMN     "district" VARCHAR(30);

-- CreateIndex
CREATE INDEX "customers_district_idx" ON "customers"("district");
