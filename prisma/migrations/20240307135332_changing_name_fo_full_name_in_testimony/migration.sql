/*
  Warnings:

  - You are about to drop the column `name` on the `Testimony` table. All the data in the column will be lost.
  - Added the required column `full_name` to the `Testimony` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Testimony" DROP COLUMN "name",
ADD COLUMN     "full_name" TEXT NOT NULL;
