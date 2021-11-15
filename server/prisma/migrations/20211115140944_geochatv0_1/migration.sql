/*
  Warnings:

  - You are about to drop the column `messageid` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `prefereddistance` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `socketid` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userid` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `geolocation` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Unsupported("point")` to `Text`.
  - A unique constraint covering the columns `[socketID]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userID]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `messageID` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_socketid_key";

-- DropIndex
DROP INDEX "User_userid_key";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "messageid",
ADD COLUMN     "messageID" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "prefereddistance",
DROP COLUMN "socketid",
DROP COLUMN "userid",
ADD COLUMN     "preferedDistance" INTEGER,
ADD COLUMN     "socketID" VARCHAR(100),
ADD COLUMN     "userID" VARCHAR(50),
ALTER COLUMN "geolocation" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_socketID_key" ON "User"("socketID");

-- CreateIndex
CREATE UNIQUE INDEX "User_userID_key" ON "User"("userID");
