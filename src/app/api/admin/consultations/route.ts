/**
 * Admin Consultations API Route
 *
 * GET /api/admin/consultations - List all consultations
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
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status");

    // Build where clause
    const where: any = {};

    if (status && status !== "all") {
      where.status = status.toUpperCase();
    }

    // Get all consultations
    const consultations = await prisma.consultation.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    // Format response
    const formattedConsultations = consultations.map((consultation) => ({
      id: consultation.id,
      fullName: consultation.fullName,
      email: consultation.email,
      phone: consultation.phone,
      preferredLanguage: consultation.preferredLanguage,
      consultationType: consultation.consultationType,
      tourInterest: consultation.tourInterest,
      preferredDate: consultation.preferredDate.toISOString(),
      preferredTime: consultation.preferredTime,
      timezone: consultation.timezone,
      message: consultation.message,
      numberOfTravelers: consultation.numberOfTravelers,
      status: consultation.status,
      scheduledAt: consultation.scheduledAt?.toISOString(),
      completedAt: consultation.completedAt?.toISOString(),
      notes: consultation.notes,
      createdAt: consultation.createdAt.toISOString(),
    }));

    return NextResponse.json({
      success: true,
      consultations: formattedConsultations,
    });
  } catch (error) {
    console.error("Error fetching consultations:", error);
    return NextResponse.json(
      { error: "Failed to fetch consultations" },
      { status: 500 }
    );
  }
}
