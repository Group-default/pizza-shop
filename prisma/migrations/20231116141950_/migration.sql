-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('CUSTOMER', 'ADMIN');

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "role" "ROLE" NOT NULL DEFAULT 'CUSTOMER';
