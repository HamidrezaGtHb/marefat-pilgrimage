"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

type Props = {
  params: { slug: string };
};

type Tour = {
  slug: string;
  title: string;
  destination: string;
  category: string;
  durationDays: number;
  durationNights: number;
  startDate: string;
  endDate: string;
  description: string;
  basePrice: string;
  currency: string;
  highlights: string[];
  itinerary: any[];
  images: string[];
  hotelStars?: number;
  mealsIncluded?: string;
  flightIncluded: boolean;
  visaIncluded: boolean;
  insuranceOption: boolean;
  earlyBirdEnabled: boolean;
  earlyBirdDeadline?: string;
  earlyBirdDiscountAmount?: string;
};

export default function TourDetailPage({ params }: Props) {
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTour() {
      try {
        setLoading(true);
        const response = await fetch(`/api/tours/${params.slug}`);
        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || "Tour not found");
        }

        setTour(data.tour);
        setError(null);
      } catch (err) {
        console.error("Error fetching tour:", err);
        setError(err instanceof Error ? err.message : "Failed to load tour");
      } finally {
        setLoading(false);
      }
    }

    fetchTour();
  }, [params.slug]);

  if (loading) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-16 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-charcoal/20 border-t-gold"></div>
          <p className="mt-4 text-sm text-charcoal/60">Loading tour details...</p>
        </div>
      </main>
    );
  }

  if (error || !tour) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-16 sm:px-8 lg:px-12">
        <p className="text-sm text-charcoal/70">
          The requested tour could not be found. You can{" "}
          <Link
            href="/tours"
            className="font-medium text-charcoal underline-offset-4 hover:underline"
          >
            browse all tours
          </Link>{" "}
          or{" "}
          <Link
            href="/contact"
            className="font-medium text-charcoal underline-offset-4 hover:underline"
          >
            contact our team
          </Link>
          .
        </p>
      </main>
    );
  }

  // Helper to map category
  const tourType = tour.category === "UMRAH" ? "Umrah" :
                   tour.category === "HAJJ" ? "Hajj" :
                   tour.category === "ZIYARAT" ? "Ziyarat" :
                   tour.category === "COMBINED" ? "Combo" : tour.category;

  return (
    <main className="bg-ivory">
      <section className="border-b border-charcoal/5 bg-ivory/90">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:px-8 lg:px-12 lg:flex-row">
          <div className="flex-1 space-y-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-charcoal/60">
              {tourType} • {tour.destination}
            </p>
            <h1 className="text-2xl font-semibold text-charcoal sm:text-3xl">
              {tour.title}
            </h1>
            <p className="text-sm text-charcoal/70">{tour.description}</p>
            <p className="text-xs text-charcoal/60">
              {tour.durationDays} days, {tour.durationNights} nights •{" "}
              {new Date(tour.startDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] text-charcoal/70">
              {tour.hotelStars && (
                <span className="rounded-full border border-charcoal/10 bg-ivory/80 px-3 py-1">
                  {tour.hotelStars}★ hotels
                </span>
              )}
              {tour.flightIncluded && (
                <span className="rounded-full border border-charcoal/10 bg-ivory/80 px-3 py-1">
                  Flight included
                </span>
              )}
              {tour.visaIncluded && (
                <span className="rounded-full border border-charcoal/10 bg-ivory/80 px-3 py-1">
                  Visa included
                </span>
              )}
              {tour.mealsIncluded && (
                <span className="rounded-full border border-charcoal/10 bg-ivory/80 px-3 py-1">
                  {tour.mealsIncluded}
                </span>
              )}
            </div>
          </div>
          <div className="flex w-full flex-col gap-3 rounded-2xl border border-gold/40 bg-gradient-to-br from-gold-soft/25 via-ivory to-gold/10 p-5 shadow-soft lg:w-80">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-charcoal/70">
              Reserve your place
            </p>

            {/* Pricing */}
            {tour.earlyBirdEnabled && tour.earlyBirdDeadline && tour.earlyBirdDiscountAmount &&
             new Date() <= new Date(tour.earlyBirdDeadline) ? (
              <div className="rounded-xl border border-gold/30 bg-gold/5 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-gold">
                  Early Bird Offer
                </p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-xs text-charcoal/50 line-through">
                    {tour.currency}{parseFloat(tour.basePrice).toLocaleString()}
                  </span>
                  <span className="text-lg font-bold text-charcoal">
                    {tour.currency}{(parseFloat(tour.basePrice) - parseFloat(tour.earlyBirdDiscountAmount)).toLocaleString()}
                  </span>
                </div>
                <p className="mt-1 text-[10px] text-charcoal/60">
                  Valid until {new Date(tour.earlyBirdDeadline).toLocaleDateString("en-GB")}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-xs text-charcoal/60">From</p>
                <p className="text-2xl font-semibold text-charcoal">
                  {tour.currency}{parseFloat(tour.basePrice).toLocaleString()}
                </p>
              </div>
            )}

            <p className="text-sm text-charcoal/80">
              Secure your preferred package and dates with a Marefat advisor.
            </p>
            <div className="mt-1 space-y-2 text-xs text-charcoal/75">
              <p>• Step‑by‑step online form</p>
              <p>• Option to pay online or via bank transfer</p>
              <p>• Confirmation email with full summary</p>
            </div>
            <Link
              href={`/tours/${tour.slug}/book`}
              className="mt-3 inline-flex items-center justify-center rounded-full bg-charcoal px-6 py-2.5 text-xs font-medium text-ivory shadow-soft transition hover:bg-charcoal/90"
            >
              Book this tour
            </Link>
            <a
              href="https://wa.me/0000000000"
              className="inline-flex items-center justify-center rounded-full border border-charcoal/15 bg-ivory/80 px-6 py-2.5 text-xs font-medium text-charcoal shadow-sm shadow-charcoal/5 transition hover:border-gold"
            >
              WhatsApp our team
            </a>
            <p className="pt-1 text-[11px] text-charcoal/55">
              No payment will be taken until your details are reviewed and
              availability is confirmed.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-6xl px-6 pt-10 sm:px-8 lg:px-12">
        {tour.images && tour.images.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
            <div
              className="h-64 rounded-2xl bg-cover bg-center shadow-soft"
              style={{
                backgroundImage: tour.images[0] ? `url(${tour.images[0]})` : "none",
                backgroundColor: !tour.images[0] ? "#f5f5f0" : undefined,
              }}
            />
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
              {tour.images[1] && (
                <div
                  className="h-32 rounded-2xl bg-cover bg-center shadow-sm shadow-charcoal/5"
                  style={{ backgroundImage: `url(${tour.images[1]})` }}
                />
              )}
              {tour.images[2] && (
                <div
                  className="h-32 rounded-2xl bg-cover bg-center shadow-sm shadow-charcoal/5"
                  style={{ backgroundImage: `url(${tour.images[2]})` }}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
            <div className="h-64 rounded-2xl bg-gradient-to-br from-charcoal/70 via-charcoal/35 to-gold-soft/50 shadow-soft" />
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
              <div className="h-32 rounded-2xl bg-gradient-to-br from-charcoal/60 via-charcoal/30 to-gold/40 shadow-sm shadow-charcoal/5" />
              <div className="h-32 rounded-2xl bg-gradient-to-br from-charcoal/60 via-charcoal/30 to-gold/40 shadow-sm shadow-charcoal/5" />
            </div>
          </div>
        )}
      </section>

      {/* Sticky CTA on mobile */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-charcoal/10 bg-ivory/95 px-6 py-3 shadow-[0_-8px_30px_rgba(15,15,15,0.12)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <div className="flex-1 text-xs text-charcoal/70">
            <p className="font-medium text-charcoal">Ready to reserve?</p>
            <p>Complete your details in a few guided steps.</p>
          </div>
          <Link
            href={`/tours/${tour.slug}/book`}
            className="inline-flex items-center justify-center rounded-full bg-charcoal px-4 py-2 text-xs font-medium text-ivory shadow-soft"
          >
            Book now
          </Link>
        </div>
      </div>

      {/* Content sections */}
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-10 sm:px-8 lg:px-12 lg:pb-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.8fr)_minmax(0,1.2fr)]">
          {/* Itinerary */}
          <div className="space-y-8">
            {tour.highlights && tour.highlights.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-charcoal">
                  Highlights
                </h2>
                <ul className="mt-3 grid gap-2 text-sm text-charcoal/80 md:grid-cols-2">
                  {tour.highlights.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 rounded-xl border border-charcoal/5 bg-ivory/90 px-3 py-2"
                    >
                      <span className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tour.itinerary && tour.itinerary.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-charcoal">
                  Itinerary overview
                </h2>
                <ol className="mt-4 space-y-3 border-l border-charcoal/10 pl-4 text-sm text-charcoal/80">
                  {tour.itinerary.map((item: any, index: number) => (
                    <li key={index} className="relative">
                      <span className="absolute -left-[19px] mt-[4px] h-2.5 w-2.5 rounded-full border border-gold/60 bg-ivory" />
                      <span className="mr-2 text-[11px] font-medium text-charcoal/60">
                        Day {item.day || index + 1}
                      </span>
                      {item.title && <span className="font-medium">{item.title}: </span>}
                      {item.description || item}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-charcoal/5 bg-ivory p-4 text-sm text-charcoal/75 shadow-sm shadow-charcoal/5">
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-charcoal/60">
                  Hotels
                </h3>
                <p className="mt-2">
                  {tour.hotelStars ? `${tour.hotelStars}★ accommodation` : "Quality hotels"} within walking distance to the Haramain.
                  {tour.mealsIncluded && ` ${tour.mealsIncluded} included.`}
                </p>
              </div>
              <div className="rounded-2xl border border-charcoal/5 bg-ivory p-4 text-sm text-charcoal/75 shadow-sm shadow-charcoal/5">
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-charcoal/60">
                  Flights
                </h3>
                <p className="mt-2">
                  {tour.flightIncluded
                    ? "Return economy flights from major EU hubs included."
                    : "Flights can be arranged on request with flexible routing."}
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold text-charcoal">
                  What&apos;s included
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-charcoal/75">
                  {tour.visaIncluded && (
                    <li className="flex items-start gap-2">
                      <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-gold" />
                      <span>Visa processing assistance</span>
                    </li>
                  )}
                  <li className="flex items-start gap-2">
                    <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-gold" />
                    <span>Airport transfers</span>
                  </li>
                  {tour.mealsIncluded && (
                    <li className="flex items-start gap-2">
                      <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-gold" />
                      <span>{tour.mealsIncluded}</span>
                    </li>
                  )}
                  {tour.flightIncluded && (
                    <li className="flex items-start gap-2">
                      <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-gold" />
                      <span>Return flights</span>
                    </li>
                  )}
                  <li className="flex items-start gap-2">
                    <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-gold" />
                    <span>Guided group activities</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-charcoal">
                  Not included
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-charcoal/75">
                  {!tour.flightIncluded && (
                    <li className="flex items-start gap-2">
                      <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-charcoal/20" />
                      <span>International flights (optional add-on)</span>
                    </li>
                  )}
                  <li className="flex items-start gap-2">
                    <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-charcoal/20" />
                    <span>Personal expenses and shopping</span>
                  </li>
                  {!tour.insuranceOption && (
                    <li className="flex items-start gap-2">
                      <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-charcoal/20" />
                      <span>Travel insurance</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-charcoal">
                Documents required
              </h3>
              <ul className="mt-3 grid gap-2 text-sm text-charcoal/75 md:grid-cols-2">
                <li className="rounded-xl border border-charcoal/5 bg-ivory/90 px-3 py-2">
                  Passport valid for at least 6 months
                </li>
                <li className="rounded-xl border border-charcoal/5 bg-ivory/90 px-3 py-2">
                  Passport-sized photos
                </li>
                <li className="rounded-xl border border-charcoal/5 bg-ivory/90 px-3 py-2">
                  Vaccination records (as per latest regulations)
                </li>
                <li className="rounded-xl border border-charcoal/5 bg-ivory/90 px-3 py-2">
                  Completed visa application forms
                </li>
              </ul>
            </div>
          </div>

          {/* Packages + map placeholder */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-charcoal/5 bg-ivory p-5 shadow-sm shadow-charcoal/5">
              <h2 className="text-sm font-semibold text-charcoal">
                Pricing
              </h2>
              <div className="mt-3 space-y-3 text-sm text-charcoal/80">
                <div className="flex items-center justify-between rounded-xl border border-charcoal/7 bg-ivory/90 px-3 py-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-charcoal/70">
                      Standard Package
                    </p>
                    <p className="mt-1 text-xs text-charcoal/70">
                      {tour.hotelStars}★ hotels with group transfers
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-charcoal">
                    {tour.currency}{parseFloat(tour.basePrice).toLocaleString()}
                  </p>
                </div>

                {tour.earlyBirdEnabled && tour.earlyBirdDeadline && tour.earlyBirdDiscountAmount &&
                 new Date() <= new Date(tour.earlyBirdDeadline) && (
                  <div className="rounded-xl border border-gold/30 bg-gold/5 px-3 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-gold">
                      Early Bird Special
                    </p>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-xs text-charcoal/50 line-through">
                        {tour.currency}{parseFloat(tour.basePrice).toLocaleString()}
                      </span>
                      <span className="text-sm font-bold text-charcoal">
                        {tour.currency}{(parseFloat(tour.basePrice) - parseFloat(tour.earlyBirdDiscountAmount)).toLocaleString()}
                      </span>
                    </div>
                    <p className="mt-1 text-[10px] text-charcoal/60">
                      Book by {new Date(tour.earlyBirdDeadline).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                )}

                <p className="pt-2 text-xs text-charcoal/60">
                  Contact our team for custom packages and private arrangements.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-charcoal/5 bg-ivory p-5 text-sm text-charcoal/75 shadow-sm shadow-charcoal/5">
              <h2 className="text-sm font-semibold text-charcoal">
                Map & proximity
              </h2>
              <p className="mt-2 text-xs text-charcoal/65">
                In the full version, an interactive map will show hotel and
                Haram locations. For now, your advisor will confirm exact
                walking times and access details.
              </p>
              <div className="mt-4 h-40 rounded-xl bg-gradient-to-br from-charcoal/10 via-charcoal/5 to-gold-soft/30" />
            </div>

            <div className="rounded-2xl border border-charcoal/5 bg-ivory p-5 text-sm text-charcoal/75 shadow-sm shadow-charcoal/5">
              <h2 className="text-sm font-semibold text-charcoal">Reviews</h2>
              <p className="mt-2 text-xs text-charcoal/70">
                Sample reviews will appear here. For now, you can review our
                general testimonials on the homepage.
              </p>
            </div>

            <div className="rounded-2xl border border-charcoal/5 bg-ivory p-5 text-sm text-charcoal/75 shadow-sm shadow-charcoal/5">
              <h2 className="text-sm font-semibold text-charcoal">
                Support &amp; assurance
              </h2>
              <ul className="mt-3 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-gold" />
                  24/7 concierge via WhatsApp and phone
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-gold" />
                  Licensed partners and vetted transport providers
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-gold" />
                  Clear refund and change policies before payment
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}


