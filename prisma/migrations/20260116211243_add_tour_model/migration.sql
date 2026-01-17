-- CreateEnum
CREATE TYPE "TourCategory" AS ENUM ('UMRAH', 'HAJJ', 'ZIYARAT', 'COMBINED');

-- CreateTable
CREATE TABLE "tours" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "TourCategory" NOT NULL DEFAULT 'UMRAH',
    "basePrice" DECIMAL(65,30) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'EUR',
    "durationDays" INTEGER NOT NULL,
    "durationNights" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "totalSeats" INTEGER NOT NULL,
    "availableSeats" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "images" TEXT NOT NULL,
    "highlights" TEXT NOT NULL,
    "itinerary" TEXT NOT NULL,
    "hotelStars" INTEGER,
    "mealsIncluded" TEXT,
    "flightIncluded" BOOLEAN NOT NULL DEFAULT false,
    "visaIncluded" BOOLEAN NOT NULL DEFAULT false,
    "insuranceOption" BOOLEAN NOT NULL DEFAULT true,
    "earlyBirdEnabled" BOOLEAN NOT NULL DEFAULT false,
    "earlyBirdDeadline" TIMESTAMP(3),
    "earlyBirdDiscountAmount" DECIMAL(65,30),
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tours_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tours_slug_key" ON "tours"("slug");
