/**
 * Tours API Route (Public)
 *
 * GET /api/tours - Get all active tours
 *
 * Public endpoint - used by the website
 */

export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");

    // Build where clause
    const where: any = {
      isActive: true,
    };

    if (category && category !== "all") {
      where.category = category.toUpperCase();
    }

    if (featured === "true") {
      where.isFeatured = true;
    }

    // Get active tours
    const tours = await prisma.tour.findMany({
      where,
      orderBy: {
        startDate: "asc",
      },
    });

    // Format response
    const formattedTours = tours.map((tour) => ({
      id: tour.id,
      title: tour.title,
      slug: tour.slug,
      destination: tour.destination,
      description: tour.description,
      category: tour.category,
      basePrice: tour.basePrice.toString(),
      currency: tour.currency,
      durationDays: tour.durationDays,
      durationNights: tour.durationNights,
      startDate: tour.startDate.toISOString(),
      endDate: tour.endDate.toISOString(),
      totalSeats: tour.totalSeats,
      availableSeats: tour.availableSeats,
      images: JSON.parse(tour.images),
      highlights: JSON.parse(tour.highlights),
      hotelStars: tour.hotelStars,
      mealsIncluded: tour.mealsIncluded,
      flightIncluded: tour.flightIncluded,
      earlyBirdEnabled: tour.earlyBirdEnabled,
      earlyBirdDeadline: tour.earlyBirdDeadline?.toISOString(),
      earlyBirdDiscountAmount: tour.earlyBirdDiscountAmount?.toString(),
    }));

    return NextResponse.json({
      success: true,
      tours: formattedTours,
    });
  } catch (error) {
    console.error("Error fetching tours:", error);
    return NextResponse.json(
      { error: "Failed to fetch tours" },
      { status: 500 }
    );
  }
}
