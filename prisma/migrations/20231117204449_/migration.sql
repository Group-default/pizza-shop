/*
  Warnings:

  - You are about to drop the column `chave` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `horario` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `valor` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `key` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "chave",
DROP COLUMN "horario",
DROP COLUMN "valor",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "key" TEXT NOT NULL,
ADD COLUMN     "time" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "value" TEXT NOT NULL;
