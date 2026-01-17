/**
 * Tour Detail API Route (Public)
 *
 * GET /api/tours/[slug] - Get tour by slug
 *
 * Public endpoint - used by the website
 */

export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const tour = await prisma.tour.findUnique({
      where: { slug, isActive: true },
    });

    if (!tour) {
      return NextResponse.json(
        { error: "Tour not found" },
        { status: 404 }
      );
    }

    // Format response
    const formattedTour = {
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
      itinerary: JSON.parse(tour.itinerary),
      hotelStars: tour.hotelStars,
      mealsIncluded: tour.mealsIncluded,
      flightIncluded: tour.flightIncluded,
      visaIncluded: tour.visaIncluded,
      insuranceOption: tour.insuranceOption,
      earlyBirdEnabled: tour.earlyBirdEnabled,
      earlyBirdDeadline: tour.earlyBirdDeadline?.toISOString(),
      earlyBirdDiscountAmount: tour.earlyBirdDiscountAmount?.toString(),
      metaTitle: tour.metaTitle,
      metaDescription: tour.metaDescription,
    };

    return NextResponse.json({
      success: true,
      tour: formattedTour,
    });
  } catch (error) {
    console.error("Error fetching tour:", error);
    return NextResponse.json(
      { error: "Failed to fetch tour" },
      { status: 500 }
    );
  }
}
