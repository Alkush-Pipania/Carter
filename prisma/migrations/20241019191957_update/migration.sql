-- AlterTable
ALTER TABLE "LinkformTrash" ADD COLUMN     "restoredAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "resetToken" TEXT,
ADD COLUMN     "resetTokenExpiry" TIMESTAMP(3),
ADD COLUMN     "verificationToken" TEXT;

-- CreateIndex
CREATE INDEX "Link_LinkformId_idx" ON "Link"("LinkformId");

-- CreateIndex
CREATE INDEX "Linkform_userID_idx" ON "Linkform"("userID");

-- CreateIndex
CREATE INDEX "LinkformTrash_userID_idx" ON "LinkformTrash"("userID");
