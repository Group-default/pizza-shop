/*
  Warnings:

  - You are about to drop the column `rate` on the `Neighborhood` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Neighborhood` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tax` to the `Neighborhood` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Neighborhood" DROP COLUMN "rate",
ADD COLUMN     "tax" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Neighborhood_name_key" ON "Neighborhood"("name");
