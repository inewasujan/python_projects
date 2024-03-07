-- AlterTable
ALTER TABLE "Services" ALTER COLUMN "image_url" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Testimony" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "testimony" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "Testimony_pkey" PRIMARY KEY ("id")
);
