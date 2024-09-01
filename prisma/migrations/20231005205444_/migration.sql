/*
  Warnings:

  - The `street` column on the `Address` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `type` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "TYPEADDRESS" AS ENUM ('HOME', 'WORK', 'OTHER');

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "street",
ADD COLUMN     "street" "TYPEADDRESS" NOT NULL DEFAULT 'HOME';

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "type" SET NOT NULL;
