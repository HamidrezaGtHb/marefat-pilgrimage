"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const bookingRef = searchParams.get("ref") || "MAR-XXXXX";

  return (
    <main className="min-h-screen bg-ivory">
      <section className="mx-auto max-w-3xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="rounded-2xl border border-charcoal/5 bg-ivory p-8 text-center shadow-soft sm:p-12">
          {/* Success Icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gold/20 to-gold-soft/30">
            <svg
              className="h-10 w-10 text-gold-dark"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="font-display text-3xl font-semibold tracking-tight text-charcoal sm:text-4xl">
            Booking Confirmed!
          </h1>
          <p className="mt-4 text-base leading-relaxed text-charcoal/75">
            Thank you for choosing Marefat Pilgrimage. Your sacred journey awaits.
          </p>

          {/* Booking Reference */}
          <div className="mx-auto mt-8 max-w-md rounded-xl bg-ivory/90 p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-charcoal/60">
              Booking Reference
            </p>
            <p className="mt-2 font-display text-2xl font-bold tracking-wide text-charcoal">
              {bookingRef}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-charcoal/70">
              Please save this reference number for future correspondence. We've sent a detailed confirmation to your email.
            </p>
          </div>

          {/* Next Steps */}
          <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">
            <div className="rounded-xl border border-charcoal/5 bg-ivory/90 p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gold/10">
                <svg className="h-5 w-5 text-gold-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-charcoal">
                Confirmation Email
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-charcoal/70">
                Sent to your inbox with full booking details
              </p>
            </div>

            <div className="rounded-xl border border-charcoal/5 bg-ivory/90 p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gold/10">
                <svg className="h-5 w-5 text-gold-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-charcoal">
                Next Steps
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-charcoal/70">
                Check your email for payment and document instructions
              </p>
            </div>

            <div className="rounded-xl border border-charcoal/5 bg-ivory/90 p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gold/10">
                <svg className="h-5 w-5 text-gold-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-charcoal">
                Documents
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-charcoal/70">
                Pre-departure guide and documents arriving soon
              </p>
            </div>
          </div>

          {/* Support */}
          <div className="mt-10 rounded-xl bg-gold/10 p-6">
            <p className="text-sm font-medium text-charcoal">
              Questions? We're here to help.
            </p>
            <p className="mt-2 text-xs text-charcoal/70">
              Contact us at{" "}
              <a
                href="mailto:support@marefat-pilgrimage.com"
                className="font-medium text-gold-dark transition hover:underline"
              >
                support@marefat-pilgrimage.com
              </a>
              {" "}or call{" "}
              <a
                href="tel:+491234567890"
                className="font-medium text-gold-dark transition hover:underline"
              >
                +49 123 456 789
              </a>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-charcoal/15 bg-ivory px-8 py-3 text-sm font-medium text-charcoal shadow-sm transition hover:border-charcoal/30 hover:shadow-md"
            >
              Return Home
            </Link>
            <Link
              href="/tours"
              className="inline-flex items-center justify-center rounded-full bg-charcoal px-8 py-3 text-sm font-medium text-ivory shadow-soft transition hover:bg-charcoal/90"
            >
              Explore More Tours
            </Link>
          </div>
        </div>

        {/* Additional info */}
        <p className="mt-8 text-center text-xs text-charcoal/60">
          You will receive a confirmation email within the next few minutes. If you don't see it, please check your spam folder.
        </p>
      </section>
    </main>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-ivory">
          <section className="mx-auto max-w-3xl px-6 py-16 sm:px-8 lg:px-12">
            <div className="rounded-2xl border border-charcoal/5 bg-ivory p-12 text-center shadow-soft">
              <p className="text-sm text-charcoal/70">Loading confirmation...</p>
            </div>
          </section>
        </main>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
