/**
 * Admin Tours API Route
 *
 * GET /api/admin/tours - List all tours
 * POST /api/admin/tours - Create new tour
 *
 * Protected endpoint - requires authentication
 */

export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status");

    // Build where clause
    const where: any = {};

    if (status === "active") {
      where.isActive = true;
    } else if (status === "inactive") {
      where.isActive = false;
    }

    // Get all tours
    const tours = await prisma.tour.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    // Format response
    const formattedTours = tours.map((tour) => ({
      id: tour.id,
      title: tour.title,
      slug: tour.slug,
      destination: tour.destination,
      description: tour.description.substring(0, 150) + "...",
      category: tour.category,
      basePrice: tour.basePrice.toString(),
      durationDays: tour.durationDays,
      startDate: tour.startDate.toISOString(),
      endDate: tour.endDate.toISOString(),
      totalSeats: tour.totalSeats,
      availableSeats: tour.availableSeats,
      isActive: tour.isActive,
      createdAt: tour.createdAt.toISOString(),
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

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.slug || !body.basePrice || !body.startDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingTour = await prisma.tour.findUnique({
      where: { slug: body.slug },
    });

    if (existingTour) {
      return NextResponse.json(
        { error: "Tour with this slug already exists" },
        { status: 400 }
      );
    }

    // If trying to mark as featured, check if we already have 3 featured tours
    if (body.isFeatured) {
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

    // Create tour
    const tour = await prisma.tour.create({
      data: {
        title: body.title,
        slug: body.slug,
        destination: body.destination || "",
        description: body.description || "",
        category: body.category || "UMRAH",
        basePrice: new Decimal(body.basePrice),
        currency: body.currency || "EUR",
        durationDays: body.durationDays || 1,
        durationNights: body.durationNights || 0,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        totalSeats: body.totalSeats || 10,
        availableSeats: body.availableSeats || 10,
        isActive: body.isActive !== undefined ? body.isActive : true,
        isFeatured: body.isFeatured || false,
        images: JSON.stringify(body.images || []),
        highlights: JSON.stringify(body.highlights || []),
        itinerary: JSON.stringify(body.itinerary || []),
        hotelStars: body.hotelStars,
        mealsIncluded: body.mealsIncluded,
        flightIncluded: body.flightIncluded || false,
        visaIncluded: body.visaIncluded || false,
        insuranceOption: body.insuranceOption !== undefined ? body.insuranceOption : true,
        earlyBirdEnabled: body.earlyBirdEnabled || false,
        earlyBirdDeadline: body.earlyBirdDeadline ? new Date(body.earlyBirdDeadline) : null,
        earlyBirdDiscountAmount: body.earlyBirdDiscountAmount ? new Decimal(body.earlyBirdDiscountAmount) : null,
        metaTitle: body.metaTitle,
        metaDescription: body.metaDescription,
      },
    });

    return NextResponse.json(
      {
        success: true,
        tour: {
          id: tour.id,
          slug: tour.slug,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating tour:", error);
    return NextResponse.json(
      { error: "Failed to create tour" },
      { status: 500 }
    );
  }
}
