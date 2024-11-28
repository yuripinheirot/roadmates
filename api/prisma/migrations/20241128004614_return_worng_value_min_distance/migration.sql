/*
  Warnings:

  - Added the required column `value` to the `drivers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "drivers" ADD COLUMN     "value" INTEGER NOT NULL;
