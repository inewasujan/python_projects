/*
  Warnings:

  - You are about to drop the column `img` on the `Aboutus` table. All the data in the column will be lost.
  - Added the required column `img` to the `Services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Aboutus" DROP COLUMN "img";

-- AlterTable
ALTER TABLE "Services" ADD COLUMN     "img" TEXT NOT NULL;
