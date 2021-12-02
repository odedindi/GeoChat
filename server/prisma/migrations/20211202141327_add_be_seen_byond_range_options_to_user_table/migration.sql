/*
  Warnings:

  - Made the column `room` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "beSeenBeyondRange" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "room" SET NOT NULL;
