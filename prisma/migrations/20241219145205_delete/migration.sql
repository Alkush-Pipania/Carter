/*
  Warnings:

  - You are about to drop the `Linkform` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LinkformTrash` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Verification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Linkform" DROP CONSTRAINT "Linkform_userID_fkey";

-- DropForeignKey
ALTER TABLE "LinkformTrash" DROP CONSTRAINT "LinkformTrash_userID_fkey";

-- DropTable
DROP TABLE "Linkform";

-- DropTable
DROP TABLE "LinkformTrash";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "Verification";
