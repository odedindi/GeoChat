/*
  Warnings:

  - You are about to drop the column `geolocation` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "geolocation",
ADD COLUMN     "geolocation_lat" TEXT,
ADD COLUMN     "geolocation_lng" TEXT;
