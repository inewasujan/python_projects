/*
  Warnings:

  - You are about to drop the column `img` on the `Services` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Services` table. All the data in the column will be lost.
  - You are about to drop the `media` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `image_url` to the `Services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Services` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "media" DROP CONSTRAINT "media_serviceId_fkey";

-- AlterTable
ALTER TABLE "Services" DROP COLUMN "img",
DROP COLUMN "name",
ADD COLUMN     "image_url" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- DropTable
DROP TABLE "media";
