"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

interface Consultation {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  preferredLanguage: string;
  consultationType: string;
  tourInterest: string | null;
  preferredDate: string;
  preferredTime: string;
  timezone: string;
  message: string | null;
  numberOfTravelers: number | null;
  status: string;
  scheduledAt: string | null;
  completedAt: string | null;
  notes: string | null;
  createdAt: string;
}

export default function AdminConsultationsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchConsultations();
    }
  }, [status, filter]);

  const fetchConsultations = async () => {
    try {
      const url =
        filter === "all"
          ? "/api/admin/consultations"
          : `/api/admin/consultations?status=${filter}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setConsultations(data.consultations);
      }
    } catch (error) {
      console.error("Error fetching consultations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ivory">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-charcoal/20 border-t-charcoal"></div>
          <p className="text-sm text-charcoal/60">Loading consultations...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "SCHEDULED":
        return "bg-blue-100 text-blue-700";
      case "COMPLETED":
        return "bg-green-100 text-green-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      case "NO_SHOW":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getConsultationTypeLabel = (type: string) => {
    switch (type) {
      case "TOUR_INQUIRY":
        return "Tour Inquiry";
      case "CUSTOM_PACKAGE":
        return "Custom Package";
      case "GROUP_BOOKING":
        return "Group Booking";
      case "PAYMENT_QUESTION":
        return "Payment Question";
      case "GENERAL":
        return "General";
      default:
        return type;
    }
  };

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <header className="border-b border-charcoal/5 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl text-charcoal">
                Consultation Requests
              </h1>
              <p className="mt-1 text-sm text-charcoal/60">
                Manage consultation bookings from customers
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Filters */}
        <div className="mb-6 flex gap-3">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-full px-4 py-2 text-sm transition ${
              filter === "all"
                ? "bg-charcoal text-ivory"
                : "bg-white text-charcoal hover:bg-charcoal/5"
            }`}
          >
            All ({consultations.length})
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`rounded-full px-4 py-2 text-sm transition ${
              filter === "pending"
                ? "bg-charcoal text-ivory"
                : "bg-white text-charcoal hover:bg-charcoal/5"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter("scheduled")}
            className={`rounded-full px-4 py-2 text-sm transition ${
              filter === "scheduled"
                ? "bg-charcoal text-ivory"
                : "bg-white text-charcoal hover:bg-charcoal/5"
            }`}
          >
            Scheduled
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`rounded-full px-4 py-2 text-sm transition ${
              filter === "completed"
                ? "bg-charcoal text-ivory"
                : "bg-white text-charcoal hover:bg-charcoal/5"
            }`}
          >
            Completed
          </button>
        </div>

        {/* Consultations List */}
        {consultations.length === 0 ? (
          <div className="rounded-2xl border border-charcoal/10 bg-white p-12 text-center">
            <p className="text-charcoal/60">No consultations found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {consultations.map((consultation) => (
              <div
                key={consultation.id}
                className="rounded-2xl border border-charcoal/10 bg-white p-6 transition hover:border-charcoal/20"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-display text-xl text-charcoal">
                        {consultation.fullName}
                      </h3>
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${getStatusColor(
                          consultation.status
                        )}`}
                      >
                        {consultation.status}
                      </span>
                      <span className="rounded-full bg-gold/10 px-3 py-1 text-xs text-gold-dark">
                        {getConsultationTypeLabel(consultation.consultationType)}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-4 text-sm text-charcoal/60">
                      <span>📧 {consultation.email}</span>
                      <span>📞 {consultation.phone}</span>
                      <span>🌍 {consultation.preferredLanguage}</span>
                      {consultation.numberOfTravelers && (
                        <span>👥 {consultation.numberOfTravelers} travelers</span>
                      )}
                    </div>

                    <div className="mt-3 flex flex-wrap gap-4 text-sm">
                      <span className="text-charcoal">
                        <strong>Preferred:</strong> {formatDate(consultation.preferredDate)} at{" "}
                        {consultation.preferredTime} ({consultation.timezone})
                      </span>
                    </div>

                    {consultation.message && (
                      <div className="mt-3 rounded-xl bg-ivory p-3">
                        <p className="text-sm text-charcoal/70">
                          <strong>Message:</strong> {consultation.message}
                        </p>
                      </div>
                    )}

                    <div className="mt-3 text-xs text-charcoal/50">
                      Requested on {formatDate(consultation.createdAt)} at{" "}
                      {formatTime(consultation.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
