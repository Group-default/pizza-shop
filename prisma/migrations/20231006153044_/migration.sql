/*
  Warnings:

  - The `type` column on the `Address` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `street` on the `Address` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "type",
ADD COLUMN     "type" "TYPEADDRESS" NOT NULL DEFAULT 'HOME',
DROP COLUMN "street",
ADD COLUMN     "street" TEXT NOT NULL;
