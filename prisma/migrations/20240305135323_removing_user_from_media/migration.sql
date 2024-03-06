/*
  Warnings:

  - You are about to drop the column `userId` on the `media` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "media" DROP CONSTRAINT "media_userId_fkey";

-- AlterTable
ALTER TABLE "media" DROP COLUMN "userId";
