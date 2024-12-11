-- AlterTable
ALTER TABLE "Linkform" ADD COLUMN     "folderID" INTEGER;

-- CreateTable
CREATE TABLE "Folder" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "secretKey" TEXT NOT NULL,
    "userID" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Folder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Folder_secretKey_key" ON "Folder"("secretKey");

-- CreateIndex
CREATE INDEX "Folder_userID_idx" ON "Folder"("userID");

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Linkform" ADD CONSTRAINT "Linkform_folderID_fkey" FOREIGN KEY ("folderID") REFERENCES "Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
