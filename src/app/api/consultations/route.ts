/**
 * Consultation Booking API Route
 *
 * POST /api/consultations - Create new consultation request
 *
 * Public endpoint
 */

export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  sendConsultationConfirmationEmail,
  sendConsultationNotificationToAdmin,
} from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.fullName || !body.email || !body.phone || !body.preferredDate || !body.preferredTime) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create consultation
    const consultation = await prisma.consultation.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        preferredLanguage: body.preferredLanguage || "English",
        consultationType: body.consultationType || "TOUR_INQUIRY",
        tourInterest: body.tourInterest || null,
        preferredDate: new Date(body.preferredDate),
        preferredTime: body.preferredTime,
        timezone: body.timezone || "Europe/Berlin",
        message: body.message || null,
        numberOfTravelers: body.numberOfTravelers ? parseInt(body.numberOfTravelers) : null,
        status: "PENDING",
      },
    });

    // Send confirmation email to customer
    if (process.env.RESEND_API_KEY) {
      try {
        await sendConsultationConfirmationEmail({
          to: consultation.email,
          customerName: consultation.fullName,
          consultationId: consultation.id,
          preferredDate: consultation.preferredDate,
          preferredTime: consultation.preferredTime,
          timezone: consultation.timezone,
          consultationType: consultation.consultationType,
          message: consultation.message || undefined,
        });
      } catch (error) {
        console.error("Failed to send confirmation email:", error);
        // Don't fail the request if email fails
      }

      // Send notification email to admin
      try {
        await sendConsultationNotificationToAdmin({
          customerName: consultation.fullName,
          email: consultation.email,
          phone: consultation.phone,
          consultationId: consultation.id,
          preferredDate: consultation.preferredDate,
          preferredTime: consultation.preferredTime,
          timezone: consultation.timezone,
          consultationType: consultation.consultationType,
          numberOfTravelers: consultation.numberOfTravelers || undefined,
          message: consultation.message || undefined,
        });
      } catch (error) {
        console.error("Failed to send admin notification:", error);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json(
      {
        success: true,
        consultation: {
          id: consultation.id,
          preferredDate: consultation.preferredDate.toISOString(),
          preferredTime: consultation.preferredTime,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating consultation:", error);
    return NextResponse.json(
      { error: "Failed to create consultation" },
      { status: 500 }
    );
  }
}
