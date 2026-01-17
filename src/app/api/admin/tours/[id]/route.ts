/**
 * Admin Tour Detail API Route
 *
 * GET /api/admin/tours/[id] - Get tour details
 * PUT /api/admin/tours/[id] - Update tour
 * DELETE /api/admin/tours/[id] - Delete tour
 *
 * Protected endpoint - requires authentication
 */

export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tour = await prisma.tour.findUnique({
      where: { id: params.id },
    });

    if (!tour) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 });
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
      isActive: tour.isActive,
      isFeatured: tour.isFeatured,
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
      createdAt: tour.createdAt.toISOString(),
      updatedAt: tour.updatedAt.toISOString(),
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Check if tour exists
    const existingTour = await prisma.tour.findUnique({
      where: { id: params.id },
    });

    if (!existingTour) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 });
    }

    // If slug is being changed, check if new slug is available
    if (body.slug && body.slug !== existingTour.slug) {
      const slugExists = await prisma.tour.findUnique({
        where: { slug: body.slug },
      });

      if (slugExists) {
        return NextResponse.json(
          { error: "Tour with this slug already exists" },
          { status: 400 }
        );
      }
    }

    // If trying to mark as featured (and wasn't featured before), check the limit
    if (body.isFeatured === true && !existingTour.isFeatured) {
      const featuredCount = await prisma.tour.count({
        where: { isFeatured: true },
      });

      if (featuredCount >= 3) {
        return NextResponse.json(
          { error: "Maximum 3 tours can be featured. Please unmark another tour first." },
          { status: 400 }
        );
      }
    }

    // Update tour
    const tour = await prisma.tour.update({
      where: { id: params.id },
      data: {
        ...(body.title && { title: body.title }),
        ...(body.slug && { slug: body.slug }),
        ...(body.destination !== undefined && { destination: body.destination }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.category && { category: body.category }),
        ...(body.basePrice && { basePrice: new Decimal(body.basePrice) }),
        ...(body.currency && { currency: body.currency }),
        ...(body.durationDays && { durationDays: body.durationDays }),
        ...(body.durationNights !== undefined && { durationNights: body.durationNights }),
        ...(body.startDate && { startDate: new Date(body.startDate) }),
        ...(body.endDate && { endDate: new Date(body.endDate) }),
        ...(body.totalSeats !== undefined && { totalSeats: body.totalSeats }),
        ...(body.availableSeats !== undefined && { availableSeats: body.availableSeats }),
        ...(body.isActive !== undefined && { isActive: body.isActive }),
        ...(body.isFeatured !== undefined && { isFeatured: body.isFeatured }),
        ...(body.images && { images: JSON.stringify(body.images) }),
        ...(body.highlights && { highlights: JSON.stringify(body.highlights) }),
        ...(body.itinerary && { itinerary: JSON.stringify(body.itinerary) }),
        ...(body.hotelStars !== undefined && { hotelStars: body.hotelStars }),
        ...(body.mealsIncluded !== undefined && { mealsIncluded: body.mealsIncluded }),
        ...(body.flightIncluded !== undefined && { flightIncluded: body.flightIncluded }),
        ...(body.visaIncluded !== undefined && { visaIncluded: body.visaIncluded }),
        ...(body.insuranceOption !== undefined && { insuranceOption: body.insuranceOption }),
        ...(body.earlyBirdEnabled !== undefined && { earlyBirdEnabled: body.earlyBirdEnabled }),
        ...(body.earlyBirdDeadline !== undefined && {
          earlyBirdDeadline: body.earlyBirdDeadline ? new Date(body.earlyBirdDeadline) : null,
        }),
        ...(body.earlyBirdDiscountAmount !== undefined && {
          earlyBirdDiscountAmount: body.earlyBirdDiscountAmount ? new Decimal(body.earlyBirdDiscountAmount) : null,
        }),
        ...(body.metaTitle !== undefined && { metaTitle: body.metaTitle }),
        ...(body.metaDescription !== undefined && { metaDescription: body.metaDescription }),
      },
    });

    return NextResponse.json({
      success: true,
      tour: {
        id: tour.id,
        slug: tour.slug,
      },
    });
  } catch (error) {
    console.error("Error updating tour:", error);
    return NextResponse.json(
      { error: "Failed to update tour" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.tour.delete({
      where: { id: params.id },
    });

    return NextResponse.json({
      success: true,
      message: "Tour deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting tour:", error);
    return NextResponse.json(
      { error: "Failed to delete tour" },
      { status: 500 }
    );
  }
}
