/*
  Warnings:

  - The `size` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "SIZE" AS ENUM ('ENTIRE', 'HALF');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "size",
ADD COLUMN     "size" "SIZE" NOT NULL DEFAULT 'ENTIRE';
