-- Ensure the Verification table exists
CREATE TABLE IF NOT EXISTS "Verification" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Verification_pkey" PRIMARY KEY ("id")
);

-- Ensure the Waitlist table exists  
CREATE TABLE IF NOT EXISTS "Waitlist" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Waitlist_pkey" PRIMARY KEY ("id")
);

-- Ensure unique constraints
ALTER TABLE "Verification" DROP CONSTRAINT IF EXISTS "Verification_email_token_key";
ALTER TABLE "Verification" ADD CONSTRAINT "Verification_email_token_key" UNIQUE ("email", "token");

ALTER TABLE "Waitlist" DROP CONSTRAINT IF EXISTS "Waitlist_email_key";
ALTER TABLE "Waitlist" ADD CONSTRAINT "Waitlist_email_key" UNIQUE ("email"); 