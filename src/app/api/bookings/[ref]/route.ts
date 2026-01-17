/**
 * Booking Details API Route
 *
 * GET /api/bookings/[ref] - Get booking by reference number
 *
 * Public endpoint - allows customers to look up their booking
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { ref: string } }
) {
  try {
    const { ref } = params;

    if (!ref) {
      return NextResponse.json(
        { error: "Booking reference is required" },
        { status: 400 }
      );
    }

    // Find booking with all related data
    const booking = await prisma.booking.findUnique({
      where: { bookingRef: ref },
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
            email: true,
            dateOfBirth: true,
            nationality: true,
          },
        },
        payments: {
          select: {
            id: true,
            amount: true,
            paymentType: true,
            status: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    // Format response
    return NextResponse.json({
      success: true,
      booking: {
        bookingRef: booking.bookingRef,
        tourTitle: booking.tourTitle,
        tourSlug: booking.tourSlug,
        numberOfTravelers: booking.numberOfTravelers,
        travelDate: booking.travelDate,
        status: booking.status,
        hasInsurance: booking.hasInsurance,
        hasFlightBooking: booking.hasFlightBooking,
        pricing: {
          basePrice: booking.basePrice.toString(),
          insuranceCost: booking.insuranceCost.toString(),
          flightCost: booking.flightCost.toString(),
          totalAmount: booking.totalAmount.toString(),
          depositAmount: booking.depositAmount.toString(),
        },
        payment: {
          method: booking.paymentMethod,
          status: booking.paymentStatus,
          depositPaid: booking.depositPaid,
          fullPaid: booking.fullPaid,
        },
        customer: booking.customer,
        travelers: booking.travelers,
        payments: booking.payments.map((payment) => ({
          ...payment,
          amount: payment.amount.toString(),
        })),
        createdAt: booking.createdAt,
      },
    });
  } catch (error) {
    console.error("Error fetching booking:", error);
    return NextResponse.json(
      { error: "Failed to fetch booking" },
      { status: 500 }
    );
  }
}
