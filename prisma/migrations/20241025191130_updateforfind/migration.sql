/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `userID` on the `Linkform` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userID` on the `LinkformTrash` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - The required column `secretkey` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Linkform" DROP CONSTRAINT "Linkform_userID_fkey";

-- DropForeignKey
ALTER TABLE "LinkformTrash" DROP CONSTRAINT "LinkformTrash_userID_fkey";

-- AlterTable
ALTER TABLE "Linkform" DROP COLUMN "userID",
ADD COLUMN     "userID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "LinkformTrash" DROP COLUMN "userID",
ADD COLUMN     "userID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "secretkey" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "Linkform_userID_idx" ON "Linkform"("userID");

-- CreateIndex
CREATE INDEX "LinkformTrash_userID_idx" ON "LinkformTrash"("userID");

-- AddForeignKey
ALTER TABLE "Linkform" ADD CONSTRAINT "Linkform_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkformTrash" ADD CONSTRAINT "LinkformTrash_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
