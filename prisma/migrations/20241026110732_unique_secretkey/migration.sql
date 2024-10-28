/*
  Warnings:

  - A unique constraint covering the columns `[secretkey]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_secretkey_key" ON "User"("secretkey");
