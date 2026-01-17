"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface DashboardStats {
  totalBookings: number;
  bookingsThisMonth: number;
  pendingBookings: number;
  totalCustomers: number;
  totalRevenue: string;
  revenueThisMonth: string;
  revenueGrowth: string;
}

interface TopTour {
  tourSlug: string;
  tourTitle: string;
  bookingsCount: number;
}

interface RecentBooking {
  id: string;
  bookingRef: string;
  tourTitle: string;
  customerEmail: string;
  totalAmount: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [topTours, setTopTours] = useState<TopTour[]>([]);
  const [recentBookings, setRecentBookings] = useState<RecentBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchAnalytics();
    }
  }, [status]);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch("/api/admin/analytics/overview");
      const data = await response.json();

      if (data.success) {
        setStats(data.stats);
        setTopTours(data.topTours);
        setRecentBookings(data.recentBookings);
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ivory">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-charcoal/20 border-t-charcoal"></div>
          <p className="text-sm text-charcoal/60">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(parseFloat(amount));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED": return "bg-green-100 text-green-700";
      case "DEPOSIT_PAID": return "bg-blue-100 text-blue-700";
      case "PENDING": return "bg-yellow-100 text-yellow-700";
      case "CANCELLED": return "bg-red-100 text-red-700";
      case "COMPLETED": return "bg-gray-100 text-gray-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <header className="border-b border-charcoal/5 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl text-charcoal">Dashboard</h1>
              <p className="mt-1 text-sm text-charcoal/60">
                Welcome back, {session?.user?.name || session?.user?.email}
              </p>
            </div>
            <button
              onClick={() => router.push("/admin/bookings" as any)}
              className="rounded-full bg-charcoal px-5 py-2.5 text-sm font-medium text-ivory transition hover:bg-charcoal/90"
            >
              View All Bookings
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="rounded-2xl border border-charcoal/10 bg-white p-6">
            <p className="text-sm text-charcoal/60">Total Bookings</p>
            <p className="mt-2 font-display text-3xl text-charcoal">{stats?.totalBookings || 0}</p>
          </div>

          <div className="rounded-2xl border border-charcoal/10 bg-white p-6">
            <p className="text-sm text-charcoal/60">Pending Bookings</p>
            <p className="mt-2 font-display text-3xl text-charcoal">{stats?.pendingBookings || 0}</p>
          </div>

          <div className="rounded-2xl border border-charcoal/10 bg-white p-6">
            <p className="text-sm text-charcoal/60">Revenue This Month</p>
            <p className="mt-2 font-display text-3xl text-charcoal">
              {stats ? formatCurrency(stats.revenueThisMonth) : "€0"}
            </p>
            {stats && parseFloat(stats.revenueGrowth) !== 0 && (
              <p className={`mt-1 text-xs ${parseFloat(stats.revenueGrowth) > 0 ? "text-green-600" : "text-red-600"}`}>
                {parseFloat(stats.revenueGrowth) > 0 ? "+" : ""}{stats.revenueGrowth}% from last month
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-charcoal/10 bg-white p-6">
            <p className="text-sm text-charcoal/60">Total Customers</p>
            <p className="mt-2 font-display text-3xl text-charcoal">{stats?.totalCustomers || 0}</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Top Tours */}
          <div className="rounded-2xl border border-charcoal/10 bg-white p-6">
            <h2 className="font-display text-xl text-charcoal mb-4">Top Tours</h2>
            <div className="space-y-3">
              {topTours.map((tour, index) => (
                <div key={tour.tourSlug} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/10 text-sm font-medium text-gold-dark">
                      {index + 1}
                    </span>
                    <span className="text-sm text-charcoal">{tour.tourTitle}</span>
                  </div>
                  <span className="text-sm font-medium text-charcoal/60">{tour.bookingsCount} bookings</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="rounded-2xl border border-charcoal/10 bg-white p-6">
            <h2 className="font-display text-xl text-charcoal mb-4">Recent Bookings</h2>
            <div className="space-y-3">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="rounded-lg border border-charcoal/5 p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-charcoal">{booking.bookingRef}</p>
                      <p className="mt-0.5 text-xs text-charcoal/60">{booking.tourTitle}</p>
                      <p className="mt-0.5 text-xs text-charcoal/50">{booking.customerEmail}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-charcoal">
                        {formatCurrency(booking.totalAmount)}
                      </p>
                      <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-charcoal/40">{formatDate(booking.createdAt)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
