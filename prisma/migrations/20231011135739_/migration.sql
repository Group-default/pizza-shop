/*
  Warnings:

  - You are about to drop the column `productId` on the `ImageProduct` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ImageProduct" DROP CONSTRAINT "ImageProduct_productId_fkey";

-- AlterTable
ALTER TABLE "ImageProduct" DROP COLUMN "productId";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "imageUrl" TEXT NOT NULL;
