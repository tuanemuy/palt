/*
  Warnings:

  - A unique constraint covering the columns `[customId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_name_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN "customId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_customId_key" ON "User"("customId");
