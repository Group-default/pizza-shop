/*
  Warnings:

  - The `type` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `size` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterEnum
ALTER TYPE "STATUS" ADD VALUE 'AWAITING_WITHDRAWAL';

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "withdrawalName" TEXT;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "type",
ADD COLUMN     "type" TEXT,
DROP COLUMN "size",
ADD COLUMN     "size" TEXT;

-- DropEnum
DROP TYPE "SIZE";

-- DropEnum
DROP TYPE "TYPEPIZZA";
