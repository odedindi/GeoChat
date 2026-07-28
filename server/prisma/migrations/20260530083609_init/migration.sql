-- Enable PostGIS for ST_DWithin / geography
CREATE EXTENSION IF NOT EXISTS postgis;

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "messageID" VARCHAR(255) NOT NULL,
    "fromuser" VARCHAR(50) NOT NULL,
    "content" VARCHAR(500) NOT NULL,
    "createdat" TEXT NOT NULL,
    "geolocation_lat" DOUBLE PRECISION NOT NULL,
    "geolocation_lng" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(160),
    "passwordHash" VARCHAR(120),
    "avatar" VARCHAR(255) NOT NULL,
    "socketID" VARCHAR(100) NOT NULL,
    "userID" VARCHAR(50) NOT NULL,
    "preferedDistance" INTEGER NOT NULL,
    "room" VARCHAR(100) NOT NULL,
    "geolocation_lat" DOUBLE PRECISION NOT NULL,
    "geolocation_lng" DOUBLE PRECISION NOT NULL,
    "beSeenBeyondRange" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Message_messageID_key" ON "Message"("messageID");

-- CreateIndex
CREATE INDEX "Message_fromuser_idx" ON "Message"("fromuser");

-- CreateIndex
CREATE INDEX "Message_createdat_idx" ON "Message"("createdat");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_socketID_key" ON "User"("socketID");

-- CreateIndex
CREATE UNIQUE INDEX "User_userID_key" ON "User"("userID");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_fromuser_fkey" FOREIGN KEY ("fromuser") REFERENCES "User"("username") ON DELETE SET NULL ON UPDATE CASCADE;
