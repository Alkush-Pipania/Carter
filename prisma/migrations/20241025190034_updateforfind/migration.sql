/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Linkform" DROP CONSTRAINT "Linkform_userID_fkey";

-- DropForeignKey
ALTER TABLE "LinkformTrash" DROP CONSTRAINT "LinkformTrash_userID_fkey";

-- AlterTable
ALTER TABLE "Linkform" ADD COLUMN     "tobefind" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "userID" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "LinkformTrash" ALTER COLUMN "userID" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "Linkform" ADD CONSTRAINT "Linkform_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkformTrash" ADD CONSTRAINT "LinkformTrash_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
