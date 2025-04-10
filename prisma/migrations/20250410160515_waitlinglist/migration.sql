/*
  Warnings:

  - You are about to drop the `Folder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ForgotPassword` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Linkform` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LinkformTrash` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TrashFolder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fallbackImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_userID_fkey";

-- DropForeignKey
ALTER TABLE "Linkform" DROP CONSTRAINT "Linkform_folderID_fkey";

-- DropForeignKey
ALTER TABLE "Linkform" DROP CONSTRAINT "Linkform_userID_fkey";

-- DropForeignKey
ALTER TABLE "LinkformTrash" DROP CONSTRAINT "LinkformTrash_trashFolderID_fkey";

-- DropForeignKey
ALTER TABLE "LinkformTrash" DROP CONSTRAINT "LinkformTrash_userID_fkey";

-- DropForeignKey
ALTER TABLE "TrashFolder" DROP CONSTRAINT "TrashFolder_userID_fkey";

-- DropTable
DROP TABLE "Folder";

-- DropTable
DROP TABLE "ForgotPassword";

-- DropTable
DROP TABLE "Linkform";

-- DropTable
DROP TABLE "LinkformTrash";

-- DropTable
DROP TABLE "TrashFolder";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "fallbackImage";
