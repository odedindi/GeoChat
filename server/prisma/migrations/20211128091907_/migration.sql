-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "messageID" VARCHAR(255) NOT NULL,
    "fromuser" VARCHAR(50) NOT NULL,
    "content" VARCHAR(255) NOT NULL,
    "createdat" TEXT NOT NULL,
    "geolocation_lat" DOUBLE PRECISION NOT NULL,
    "geolocation_lng" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "avatar" VARCHAR(100) NOT NULL,
    "socketID" VARCHAR(100) NOT NULL,
    "preferedDistance" INTEGER NOT NULL,
    "userID" VARCHAR(50) NOT NULL,
    "room" VARCHAR(100),
    "geolocation_lat" DOUBLE PRECISION NOT NULL,
    "geolocation_lng" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_socketID_key" ON "User"("socketID");

-- CreateIndex
CREATE UNIQUE INDEX "User_userID_key" ON "User"("userID");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_fromuser_fkey" FOREIGN KEY ("fromuser") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Enable PostGIS (as of 3.0 contains just geometry/geography)
CREATE EXTENSION postgis;

-- enable raster support (for 3+)
CREATE EXTENSION postgis_raster;

-- Enable Topology
CREATE EXTENSION postgis_topology;

-- Enable PostGIS Advanced 3D
-- and other geoprocessing algorithms
-- sfcgal not available with all distributions
CREATE EXTENSION postgis_sfcgal;

-- fuzzy matching needed for Tiger
CREATE EXTENSION fuzzystrmatch;

-- rule based standardizer
CREATE EXTENSION address_standardizer;

-- Enable US Tiger Geocoder
CREATE EXTENSION postgis_tiger_geocoder;