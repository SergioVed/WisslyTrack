/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Portfolio` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Portfolio" ADD COLUMN     "cvPath" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_userId_key" ON "Portfolio"("userId");
