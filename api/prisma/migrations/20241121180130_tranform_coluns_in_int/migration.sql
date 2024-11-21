/*
  Warnings:

  - You are about to alter the column `value` on the `drivers` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `value` on the `rides` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "drivers" ALTER COLUMN "value" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "rides" ALTER COLUMN "value" SET DATA TYPE INTEGER;
