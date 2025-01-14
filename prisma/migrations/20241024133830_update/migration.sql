/*
  Warnings:

  - The primary key for the `Linkform` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `Link` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `links` to the `Linkform` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_LinkformId_fkey";

-- AlterTable
ALTER TABLE "Linkform" DROP CONSTRAINT "Linkform_pkey",
ADD COLUMN     "links" TEXT NOT NULL,
ALTER COLUMN "secret_Id" DROP DEFAULT,
ALTER COLUMN "secret_Id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Linkform_pkey" PRIMARY KEY ("secret_Id");
DROP SEQUENCE "Linkform_secret_Id_seq";

-- DropTable
DROP TABLE "Link";
