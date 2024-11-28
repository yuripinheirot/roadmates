/*
  Warnings:

  - The primary key for the `drivers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `value` on the `drivers` table. All the data in the column will be lost.
  - The `id` column on the `drivers` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `driver_id` on the `rides` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "rides" DROP CONSTRAINT "rides_driver_id_fkey";

-- AlterTable
ALTER TABLE "drivers" DROP CONSTRAINT "drivers_pkey",
DROP COLUMN "value",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "drivers_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "rides" DROP COLUMN "driver_id",
ADD COLUMN     "driver_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "rides" ADD CONSTRAINT "rides_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
