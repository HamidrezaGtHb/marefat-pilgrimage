/**
 * Bookings API Route
 *
 * POST /api/bookings - Create a new booking
 *
 * Public endpoint - called from the booking form
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma, generateUniqueBookingRef } from "@/lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";

interface TravelerData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
  passportExpiry: string;
}

interface BookingRequest {
  // Tour info
  tourSlug: string;
  tourTitle: string;
  tourPrice: number;

  // Customer info
  customerEmail: string;
  customerPhone: string;

  // Travelers
  travelers: TravelerData[];

  // Booking options
  hasInsurance: boolean;
  hasFlightBooking: boolean;
  insuranceCost?: number;
  flightCost?: number;

  // Payment
  paymentMethod: "BANK_TRANSFER" | "ONLINE_PAYMENT";
}

export async function POST(request: NextRequest) {
  try {
    const body: BookingRequest = await request.json();

    // Validate required fields
    if (!body.tourSlug || !body.tourTitle || !body.customerEmail || !body.travelers || body.travelers.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Calculate pricing
    const basePrice = new Decimal(body.tourPrice);
    const insuranceCost = body.hasInsurance ? new Decimal(body.insuranceCost || 0) : new Decimal(0);
    const flightCost = body.hasFlightBooking ? new Decimal(body.flightCost || 0) : new Decimal(0);
    const totalAmount = basePrice.plus(insuranceCost).plus(flightCost);
    const depositAmount = totalAmount.mul(0.3); // 30% deposit

    // Generate unique booking reference
    const bookingRef = await generateUniqueBookingRef();

    // Create or find customer
    let customer = await prisma.customer.findUnique({
      where: { email: body.customerEmail },
    });

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          email: body.customerEmail,
          phone: body.customerPhone,
        },
      });
    }

    // Create booking with travelers
    const booking = await prisma.booking.create({
      data: {
        bookingRef,
        tourSlug: body.tourSlug,
        tourTitle: body.tourTitle,
        customerId: customer.id,
        numberOfTravelers: body.travelers.length,
        hasInsurance: body.hasInsurance,
        hasFlightBooking: body.hasFlightBooking,
        basePrice,
        insuranceCost,
        flightCost,
        totalAmount,
        depositAmount,
        paymentMethod: body.paymentMethod,
        travelers: {
          create: body.travelers.map((traveler) => ({
            firstName: traveler.firstName,
            lastName: traveler.lastName,
            email: traveler.email,
            phone: traveler.phone,
            dateOfBirth: new Date(traveler.dateOfBirth),
            nationality: traveler.nationality,
            passportNumber: traveler.passportNumber.toUpperCase(),
            passportExpiry: new Date(traveler.passportExpiry),
            customerId: customer.id,
          })),
        },
        payments: {
          create: {
            amount: depositAmount,
            paymentType: "DEPOSIT",
            paymentMethod: body.paymentMethod,
            status: "PENDING",
          },
        },
      },
      include: {
        customer: true,
        travelers: true,
        payments: true,
      },
    });

    // TODO: Send confirmation email here
    // await sendBookingConfirmationEmail(booking);

    return NextResponse.json(
      {
        success: true,
        bookingRef: booking.bookingRef,
        booking: {
          id: booking.id,
          bookingRef: booking.bookingRef,
          totalAmount: booking.totalAmount.toString(),
          depositAmount: booking.depositAmount.toString(),
          paymentMethod: booking.paymentMethod,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
