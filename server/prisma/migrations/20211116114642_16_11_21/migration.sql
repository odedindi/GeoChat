/*
  Warnings:

  - The `createdat` column on the `Message` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `username` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `avatar` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `room` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `socketID` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userID` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `geolocation_lat` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `geolocation_lng` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "createdat",
ADD COLUMN     "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "username" SET NOT NULL,
ALTER COLUMN "avatar" SET NOT NULL,
ALTER COLUMN "room" SET NOT NULL,
ALTER COLUMN "socketID" SET NOT NULL,
ALTER COLUMN "userID" SET NOT NULL,
ALTER COLUMN "geolocation_lat" SET NOT NULL,
ALTER COLUMN "geolocation_lng" SET NOT NULL;
