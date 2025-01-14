-- AlterTable
ALTER TABLE "LinkformTrash" ADD COLUMN     "trashFolderID" INTEGER,
ALTER COLUMN "secret_Id" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "TrashFolder" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "secretKey" TEXT NOT NULL,
    "userID" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "restoredAt" TIMESTAMP(3),

    CONSTRAINT "TrashFolder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TrashFolder_userID_idx" ON "TrashFolder"("userID");

-- AddForeignKey
ALTER TABLE "TrashFolder" ADD CONSTRAINT "TrashFolder_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkformTrash" ADD CONSTRAINT "LinkformTrash_trashFolderID_fkey" FOREIGN KEY ("trashFolderID") REFERENCES "TrashFolder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
