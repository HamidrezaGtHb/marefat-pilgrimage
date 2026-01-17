/**
 * Admin Bookings API Route
 *
 * GET /api/admin/bookings - List all bookings (paginated, filtered)
 *
 * Protected endpoint - requires authentication
 */

export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    // Build where clause
    const where: any = {};

    if (status && status !== "all") {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { bookingRef: { contains: search, mode: "insensitive" } },
        { tourTitle: { contains: search, mode: "insensitive" } },
        { customer: { email: { contains: search, mode: "insensitive" } } },
      ];
    }

    // Get total count
    const total = await prisma.booking.count({ where });

    // Get bookings
    const bookings = await prisma.booking.findMany({
      where,
      include: {
        customer: {
          select: {
            email: true,
            phone: true,
          },
        },
        travelers: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    // Format response
    const formattedBookings = bookings.map((booking) => ({
      id: booking.id,
      bookingRef: booking.bookingRef,
      tourTitle: booking.tourTitle,
      tourSlug: booking.tourSlug,
      customerEmail: booking.customer.email,
      customerPhone: booking.customer.phone,
      numberOfTravelers: booking.numberOfTravelers,
      travelers: booking.travelers.map((t) => `${t.firstName} ${t.lastName}`).join(", "),
      totalAmount: booking.totalAmount.toString(),
      depositAmount: booking.depositAmount.toString(),
      status: booking.status,
      paymentStatus: booking.paymentStatus,
      depositPaid: booking.depositPaid,
      fullPaid: booking.fullPaid,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
    }));

    return NextResponse.json({
      success: true,
      bookings: formattedBookings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
