-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "messageid" VARCHAR(255) NOT NULL,
    "fromuser" VARCHAR(50) NOT NULL,
    "content" VARCHAR(255) NOT NULL,
    "createdat" VARCHAR(255),

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50),
    "avatar" VARCHAR(100),
    "socketid" VARCHAR(100),
    "room" VARCHAR(100),
    "geolocation" point,
    "prefereddistance" INTEGER,
    "userid" VARCHAR(50),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_socketid_key" ON "User"("socketid");

-- CreateIndex
CREATE UNIQUE INDEX "User_userid_key" ON "User"("userid");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_fromuser_fkey" FOREIGN KEY ("fromuser") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
