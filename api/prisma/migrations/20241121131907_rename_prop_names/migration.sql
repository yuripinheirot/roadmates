/*
  Warnings:

  - You are about to drop the column `customerId` on the `rides` table. All the data in the column will be lost.
  - You are about to drop the column `driverId` on the `rides` table. All the data in the column will be lost.
  - Added the required column `customer_id` to the `rides` table without a default value. This is not possible if the table is not empty.
  - Added the required column `driver_id` to the `rides` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "rides" DROP CONSTRAINT "rides_customerId_fkey";

-- DropForeignKey
ALTER TABLE "rides" DROP CONSTRAINT "rides_driverId_fkey";

-- AlterTable
ALTER TABLE "rides" DROP COLUMN "customerId",
DROP COLUMN "driverId",
ADD COLUMN     "customer_id" TEXT NOT NULL,
ADD COLUMN     "driver_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "rides" ADD CONSTRAINT "rides_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rides" ADD CONSTRAINT "rides_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
