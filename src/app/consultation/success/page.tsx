"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const consultationId = searchParams.get("id");

  return (
    <div className="min-h-screen bg-ivory">
      <main className="mx-auto max-w-2xl px-6 py-16">
        <div className="rounded-2xl border border-gold/20 bg-white p-8 text-center shadow-soft">
          {/* Success Icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl text-charcoal">
            Consultation Request Received!
          </h1>

          {/* Message */}
          <div className="mt-6 space-y-4 text-charcoal/70">
            <p>
              Thank you for booking a consultation with Marefat Pilgrimage. We have received
              your request successfully.
            </p>

            {consultationId && (
              <div className="rounded-xl bg-ivory p-4">
                <p className="text-sm">
                  <strong>Reference ID:</strong>
                  <br />
                  <span className="font-mono text-charcoal">{consultationId}</span>
                </p>
              </div>
            )}

            <div className="space-y-2 text-left text-sm">
              <p><strong>What happens next?</strong></p>
              <ol className="ml-6 list-decimal space-y-1">
                <li>You will receive a confirmation email within the next few minutes</li>
                <li>Our team will review your preferred time and confirm availability</li>
                <li>Within 24 hours, you'll receive a calendar invitation for the consultation</li>
                <li>You can add this directly to your calendar (Google, Outlook, Apple Calendar)</li>
              </ol>
            </div>

            <div className="rounded-xl border border-gold/20 bg-gold/5 p-4 text-left">
              <p className="text-sm">
                <strong>Important:</strong> Please check your email inbox (and spam folder)
                for our confirmation. If you don't receive an email within 30 minutes, please
                contact us at{" "}
                <a href="mailto:info@marefat-pilgrimage.com" className="text-gold-dark underline">
                  info@marefat-pilgrimage.com
                </a>
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-charcoal px-6 py-3 text-sm font-medium text-ivory shadow-soft transition hover:bg-charcoal/90"
            >
              Return to Homepage
            </Link>
            <Link
              href="/tours"
              className="inline-flex items-center justify-center rounded-full border border-charcoal/15 bg-ivory px-6 py-3 text-sm font-medium text-charcoal shadow-sm shadow-charcoal/5 transition hover:border-gold"
            >
              Browse Tours
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ConsultationSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ivory" />}>
      <SuccessContent />
    </Suspense>
  );
}
