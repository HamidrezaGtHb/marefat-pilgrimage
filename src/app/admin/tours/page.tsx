"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

interface Tour {
  id: string;
  title: string;
  slug: string;
  destination: string;
  description: string;
  category: string;
  basePrice: string;
  durationDays: number;
  startDate: string;
  endDate: string;
  totalSeats: number;
  availableSeats: number;
  isActive: boolean;
  createdAt: string;
}

export default function AdminToursPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchTours();
    }
  }, [status, filter]);

  const fetchTours = async () => {
    try {
      const url = filter === "all"
        ? "/api/admin/tours"
        : `/api/admin/tours?status=${filter}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setTours(data.tours);
      }
    } catch (error) {
      console.error("Error fetching tours:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/tours/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchTours();
      }
    } catch (error) {
      console.error("Error deleting tour:", error);
    }
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/tours/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (response.ok) {
        fetchTours();
      }
    } catch (error) {
      console.error("Error updating tour:", error);
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ivory">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-charcoal/20 border-t-charcoal"></div>
          <p className="text-sm text-charcoal/60">Loading tours...</p>
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

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(parseFloat(price));
  };

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <header className="border-b border-charcoal/5 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl text-charcoal">Tours Management</h1>
              <p className="mt-1 text-sm text-charcoal/60">
                Manage your pilgrimage tours
              </p>
            </div>
            <Button
              onClick={() => router.push("/admin/tours/new" as any)}
              variant="primary"
              size="lg"
            >
              Add New Tour
            </Button>
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
            All Tours ({tours.length})
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`rounded-full px-4 py-2 text-sm transition ${
              filter === "active"
                ? "bg-charcoal text-ivory"
                : "bg-white text-charcoal hover:bg-charcoal/5"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("inactive")}
            className={`rounded-full px-4 py-2 text-sm transition ${
              filter === "inactive"
                ? "bg-charcoal text-ivory"
                : "bg-white text-charcoal hover:bg-charcoal/5"
            }`}
          >
            Inactive
          </button>
        </div>

        {/* Tours List */}
        {tours.length === 0 ? (
          <div className="rounded-2xl border border-charcoal/10 bg-white p-12 text-center">
            <p className="text-charcoal/60">No tours found. Create your first tour!</p>
            <Button
              onClick={() => router.push("/admin/tours/new" as any)}
              variant="primary"
              className="mt-4"
            >
              Add New Tour
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {tours.map((tour) => (
              <div
                key={tour.id}
                className="rounded-2xl border border-charcoal/10 bg-white p-6 transition hover:border-charcoal/20"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-display text-xl text-charcoal">{tour.title}</h3>
                      <span className={`rounded-full px-3 py-1 text-xs ${
                        tour.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}>
                        {tour.isActive ? "Active" : "Inactive"}
                      </span>
                      <span className="rounded-full bg-gold/10 px-3 py-1 text-xs text-gold-dark">
                        {tour.category}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-charcoal/60">{tour.description}</p>
                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-charcoal/60">
                      <span>📍 {tour.destination}</span>
                      <span>📅 {formatDate(tour.startDate)} - {formatDate(tour.endDate)}</span>
                      <span>⏱️ {tour.durationDays} days</span>
                      <span>💰 {formatPrice(tour.basePrice)}</span>
                      <span>👥 {tour.availableSeats}/{tour.totalSeats} seats available</span>
                    </div>
                  </div>
                  <div className="ml-6 flex gap-2">
                    <Button
                      onClick={() => router.push(`/admin/tours/${tour.id}/edit` as any)}
                      variant="outline"
                      size="sm"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => toggleStatus(tour.id, tour.isActive)}
                      variant="ghost"
                      size="sm"
                    >
                      {tour.isActive ? "Deactivate" : "Activate"}
                    </Button>
                    <Button
                      onClick={() => handleDelete(tour.id, tour.title)}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </Button>
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
