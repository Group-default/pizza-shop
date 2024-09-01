/*
  Warnings:

  - The `type` column on the `Pizza` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TYPEPIZZA" AS ENUM ('TRADITIONAL', 'SPECIAL');

-- AlterTable
ALTER TABLE "Pizza" DROP COLUMN "type",
ADD COLUMN     "type" "TYPEPIZZA" NOT NULL DEFAULT 'TRADITIONAL';
