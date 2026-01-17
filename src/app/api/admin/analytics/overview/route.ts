/**
 * Admin Analytics Overview API Route
 *
 * GET /api/admin/analytics/overview - Get dashboard overview stats
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

    // Get date ranges
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    // Total bookings
    const totalBookings = await prisma.booking.count();

    // Bookings this month
    const bookingsThisMonth = await prisma.booking.count({
      where: {
        createdAt: {
          gte: startOfMonth,
        },
      },
    });

    // Pending bookings
    const pendingBookings = await prisma.booking.count({
      where: {
        status: "PENDING",
      },
    });

    // Total customers
    const totalCustomers = await prisma.customer.count();

    // Revenue calculations
    const allBookings = await prisma.booking.findMany({
      select: {
        totalAmount: true,
        createdAt: true,
        status: true,
      },
    });

    const totalRevenue = allBookings.reduce(
      (sum, booking) => sum.plus(booking.totalAmount),
      new Decimal(0)
    );

    const revenueThisMonth = allBookings
      .filter((b) => b.createdAt >= startOfMonth)
      .reduce((sum, booking) => sum.plus(booking.totalAmount), new Decimal(0));

    const revenueLastMonth = allBookings
      .filter((b) => b.createdAt >= startOfLastMonth && b.createdAt <= endOfLastMonth)
      .reduce((sum, booking) => sum.plus(booking.totalAmount), new Decimal(0));

    // Calculate growth
    const revenueGrowth = revenueLastMonth.toNumber() > 0
      ? ((revenueThisMonth.toNumber() - revenueLastMonth.toNumber()) / revenueLastMonth.toNumber()) * 100
      : 0;

    // Top tours
    const topTours = await prisma.booking.groupBy({
      by: ["tourSlug", "tourTitle"],
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: "desc",
        },
      },
      take: 5,
    });

    // Recent bookings
    const recentBookings = await prisma.booking.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        customer: {
          select: {
            email: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      stats: {
        totalBookings,
        bookingsThisMonth,
        pendingBookings,
        totalCustomers,
        totalRevenue: totalRevenue.toString(),
        revenueThisMonth: revenueThisMonth.toString(),
        revenueGrowth: revenueGrowth.toFixed(1),
      },
      topTours: topTours.map((tour) => ({
        tourSlug: tour.tourSlug,
        tourTitle: tour.tourTitle,
        bookingsCount: tour._count.id,
      })),
      recentBookings: recentBookings.map((booking) => ({
        id: booking.id,
        bookingRef: booking.bookingRef,
        tourTitle: booking.tourTitle,
        customerEmail: booking.customer.email,
        totalAmount: booking.totalAmount.toString(),
        status: booking.status,
        createdAt: booking.createdAt,
      })),
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
