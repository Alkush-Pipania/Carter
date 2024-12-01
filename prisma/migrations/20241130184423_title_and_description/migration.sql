/*
  Warnings:

  - Made the column `title` on table `Linkform` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Linkform` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Linkform" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL;
