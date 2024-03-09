/*
  Warnings:

  - Added the required column `subtitle` to the `Services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Services" ADD COLUMN     "subtitle" TEXT  NULL;
