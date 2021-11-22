/*
  Warnings:

  - You are about to drop the column `geolocation_lat` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `geolocation_lng` on the `User` table. All the data in the column will be lost.
  - Added the required column `geolocation_lat` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `geolocation_lng` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "geolocation_lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "geolocation_lng" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "geolocation_lat",
DROP COLUMN "geolocation_lng";
