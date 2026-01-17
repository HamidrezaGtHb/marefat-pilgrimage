/**
 * Admin Booking Details API Route
 *
 * GET /api/admin/bookings/[id] - Get booking details
 * PATCH /api/admin/bookings/[id] - Update booking status
 * DELETE /api/admin/bookings/[id] - Cancel booking
 *
 * Protected endpoint - requires authentication
 */

export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const booking = await prisma.booking.findUnique({
      where: { id: params.id },
      include: {
        customer: true,
        travelers: true,
        payments: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      booking: {
        ...booking,
        basePrice: booking.basePrice.toString(),
        insuranceCost: booking.insuranceCost.toString(),
        flightCost: booking.flightCost.toString(),
        totalAmount: booking.totalAmount.toString(),
        depositAmount: booking.depositAmount.toString(),
        payments: booking.payments.map((p) => ({
          ...p,
          amount: p.amount.toString(),
        })),
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

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { status, paymentStatus, depositPaid, fullPaid } = body;

    const updatedBooking = await prisma.booking.update({
      where: { id: params.id },
      data: {
        ...(status && { status }),
        ...(paymentStatus && { paymentStatus }),
        ...(typeof depositPaid === "boolean" && {
          depositPaid,
          depositPaidAt: depositPaid ? new Date() : null,
        }),
        ...(typeof fullPaid === "boolean" && {
          fullPaid,
          fullPaidAt: fullPaid ? new Date() : null,
        }),
      },
    });

    return NextResponse.json({
      success: true,
      booking: {
        ...updatedBooking,
        basePrice: updatedBooking.basePrice.toString(),
        insuranceCost: updatedBooking.insuranceCost.toString(),
        flightCost: updatedBooking.flightCost.toString(),
        totalAmount: updatedBooking.totalAmount.toString(),
        depositAmount: updatedBooking.depositAmount.toString(),
      },
    });
  } catch (error) {
    console.error("Error updating booking:", error);
    return NextResponse.json(
      { error: "Failed to update booking" },
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

    await prisma.booking.update({
      where: { id: params.id },
      data: { status: "CANCELLED" },
    });

    return NextResponse.json({
      success: true,
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    return NextResponse.json(
      { error: "Failed to cancel booking" },
      { status: 500 }
    );
  }
}
