-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "username" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "password" TEXT NOT NULL,
    "secretkey" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "varified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Folder" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "secretKey" TEXT NOT NULL,
    "userID" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Folder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Linkform" (
    "secret_Id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "links" TEXT NOT NULL,
    "tobefind" BOOLEAN NOT NULL DEFAULT false,
    "userID" INTEGER NOT NULL,
    "folderID" INTEGER,
    "deletedAt" TIMESTAMP(3),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "body" TEXT,
    "imgurl" TEXT,

    CONSTRAINT "Linkform_pkey" PRIMARY KEY ("secret_Id")
);

-- CreateTable
CREATE TABLE "Verification" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ForgotPassword" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ForgotPassword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fallbackImage" (
    "id" SERIAL NOT NULL,
    "imgurl" TEXT NOT NULL,

    CONSTRAINT "fallbackImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_secretkey_key" ON "User"("secretkey");

-- CreateIndex
CREATE UNIQUE INDEX "Folder_id_key" ON "Folder"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Folder_secretKey_key" ON "Folder"("secretKey");

-- CreateIndex
CREATE INDEX "Folder_userID_idx" ON "Folder"("userID");

-- CreateIndex
CREATE INDEX "Linkform_userID_idx" ON "Linkform"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "Verification_email_token_key" ON "Verification"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "ForgotPassword_email_token_key" ON "ForgotPassword"("email", "token");

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Linkform" ADD CONSTRAINT "Linkform_folderID_fkey" FOREIGN KEY ("folderID") REFERENCES "Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Linkform" ADD CONSTRAINT "Linkform_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
