import Link from "next/link";
import type { Metadata } from "next";

// Simple placeholder tour data – in real app, fetch from DB by slug
const TOURS = [
  {
    slug: "signature-ramadan-umrah",
    title: "Signature Ramadan Umrah",
    destination: "Makkah & Madinah",
    type: "Umrah",
    durationDays: 10,
    startDate: "2026-03-15",
    description:
      "A thoughtfully paced Ramadan Umrah with premium hotels close to the Haramain, guided rituals, and quiet time for personal worship.",
    highlights: [
      "5★ stays within a few minutes’ walk to the Haramain",
      "Small, calm groups with scholar guidance in multiple languages",
      "Arrival assistance and private airport transfers available",
      "Flexible pre/post extensions in Madinah or Jeddah",
    ],
    itinerary: [
      "Arrival in Jeddah, transfer to Makkah, check‑in to hotel",
      "Umrah rites with scholar guidance and group orientation",
      "Free day for individual worship in Masjid al‑Haram",
      "Optional ziyarat around Makkah (Thawr, Hira – exterior view)",
      "Transfer to Madinah, check‑in near Masjid an‑Nabawi",
      "Guided ziyarat in Madinah; visit historical sites",
      "Free day in Madinah for prayers and reflection",
      "Return to Makkah for final days of ibadah",
      "Closing gathering and personal dua",
      "Departure and assisted airport transfers",
    ],
    hotelInfo:
      "5★ properties within a few minutes’ walk to the Haramain, daily breakfast included. Late check‑out where available.",
    flightsInfo:
      "Return economy flights from major EU hubs can be arranged on request with flexible routing.",
    included: [
      "Visa processing assistance",
      "Airport transfers",
      "Daily breakfast",
      "Guided group Umrah",
      "Scholarly support in group",
    ],
    excluded: [
      "International flights (optional add‑on)",
      "Personal expenses and shopping",
      "Travel insurance",
    ],
    documentsNeeded: [
      "Passport valid for at least 6 months",
      "Passport‑sized photos",
      "Vaccination records (as per latest regulations)",
      "Completed visa application forms",
    ],
    packages: [
      {
        name: "Economy",
        price: "€2,650",
        description: "Quality 4★ hotels with shared transfers.",
      },
      {
        name: "Standard",
        price: "€3,250",
        description: "5★ hotels with small group transfers.",
      },
      {
        name: "VIP",
        price: "On request",
        description: "Suite options, private transfers, and custom dates.",
      },
    ],
  },
  // Other tours could be added here...
];

type Props = {
  params: { slug: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const tour = TOURS.find((t) => t.slug === params.slug);
  if (!tour) {
    return {
      title: "Tour not found – Marefat Pilgrimage",
    };
  }
  return {
    title: `${tour.title} – Marefat Pilgrimage`,
    description: tour.description,
  };
}

export default function TourDetailPage({ params }: Props) {
  const tour = TOURS.find((t) => t.slug === params.slug);

  if (!tour) {
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

  return (
    <main className="bg-ivory">
      <section className="border-b border-charcoal/5 bg-ivory/90">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:px-8 lg:px-12 lg:flex-row">
          <div className="flex-1 space-y-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-charcoal/60">
              {tour.type} • {tour.destination}
            </p>
            <h1 className="text-2xl font-semibold text-charcoal sm:text-3xl">
              {tour.title}
            </h1>
            <p className="text-sm text-charcoal/70">{tour.description}</p>
            <p className="text-xs text-charcoal/60">
              {tour.durationDays} days •{" "}
              {new Date(tour.startDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] text-charcoal/70">
              <span className="rounded-full border border-charcoal/10 bg-ivory/80 px-3 py-1">
                5★ hotels
              </span>
              <span className="rounded-full border border-charcoal/10 bg-ivory/80 px-3 py-1">
                Scholar-led
              </span>
              <span className="rounded-full border border-charcoal/10 bg-ivory/80 px-3 py-1">
                Concierge support
              </span>
              <span className="rounded-full border border-charcoal/10 bg-ivory/80 px-3 py-1">
                Flexible flights
              </span>
            </div>
          </div>
          <div className="flex w-full flex-col gap-3 rounded-2xl border border-gold/40 bg-gradient-to-br from-gold-soft/25 via-ivory to-gold/10 p-5 shadow-soft lg:w-80">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-charcoal/70">
              Reserve your place
            </p>
            <p className="text-sm text-charcoal/80">
              Secure your preferred package and dates with a Marefat advisor.
            </p>
            <div className="mt-1 space-y-2 text-xs text-charcoal/75">
              <p>• Step‑by‑step online form</p>
              <p>• Option to pay online or via bank transfer</p>
              <p>• Confirmation email with full summary</p>
            </div>
            <a
              href={`/booking?tour=${encodeURIComponent(tour.slug)}`}
              className="mt-3 inline-flex items-center justify-center rounded-full bg-charcoal px-6 py-2.5 text-xs font-medium text-ivory shadow-soft transition hover:bg-charcoal/90"
            >
              Book this tour
            </a>
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
        <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
          <div className="h-64 rounded-2xl bg-gradient-to-br from-charcoal/70 via-charcoal/35 to-gold-soft/50 shadow-soft" />
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
            <div className="h-32 rounded-2xl bg-gradient-to-br from-charcoal/60 via-charcoal/30 to-gold/40 shadow-sm shadow-charcoal/5" />
            <div className="h-32 rounded-2xl bg-gradient-to-br from-charcoal/60 via-charcoal/30 to-gold/40 shadow-sm shadow-charcoal/5" />
          </div>
        </div>
        <p className="mt-3 text-xs text-charcoal/60">
          Premium photography placeholders — replace with real hotel and Haram
          imagery.
        </p>
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
            <div>
              <h2 className="text-lg font-semibold text-charcoal">
                Highlights
              </h2>
              <ul className="mt-3 grid gap-2 text-sm text-charcoal/80 md:grid-cols-2">
                {tour.highlights?.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 rounded-xl border border-charcoal/5 bg-ivory/90 px-3 py-2"
                  >
                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-gold" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-charcoal">
                Itinerary overview
              </h2>
              <ol className="mt-4 space-y-3 border-l border-charcoal/10 pl-4 text-sm text-charcoal/80">
                {tour.itinerary.map((item, index) => (
                  <li key={item} className="relative">
                    <span className="absolute -left-[19px] mt-[4px] h-2.5 w-2.5 rounded-full border border-gold/60 bg-ivory" />
                    <span className="mr-2 text-[11px] font-medium text-charcoal/60">
                      Day {index + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-charcoal/5 bg-ivory p-4 text-sm text-charcoal/75 shadow-sm shadow-charcoal/5">
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-charcoal/60">
                  Hotels
                </h3>
                <p className="mt-2">{tour.hotelInfo}</p>
              </div>
              <div className="rounded-2xl border border-charcoal/5 bg-ivory p-4 text-sm text-charcoal/75 shadow-sm shadow-charcoal/5">
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-charcoal/60">
                  Flights
                </h3>
                <p className="mt-2">{tour.flightsInfo}</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold text-charcoal">
                  What&apos;s included
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-charcoal/75">
                  {tour.included.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-gold" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-charcoal">
                  Not included
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-charcoal/75">
                  {tour.excluded.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-charcoal/20" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-charcoal">
                Documents required
              </h3>
              <ul className="mt-3 grid gap-2 text-sm text-charcoal/75 md:grid-cols-2">
                {tour.documentsNeeded.map((doc) => (
                  <li key={doc} className="rounded-xl border border-charcoal/5 bg-ivory/90 px-3 py-2">
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Packages + map placeholder */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-charcoal/5 bg-ivory p-5 shadow-sm shadow-charcoal/5">
              <h2 className="text-sm font-semibold text-charcoal">
                Pricing packages
              </h2>
              <div className="mt-3 space-y-3 text-sm text-charcoal/80">
                {tour.packages.map((pkg) => (
                  <div
                    key={pkg.name}
                    className="flex items-center justify-between rounded-xl border border-charcoal/7 bg-ivory/90 px-3 py-3"
                  >
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-charcoal/70">
                        {pkg.name}
                      </p>
                      <p className="mt-1 text-xs text-charcoal/70">
                        {pkg.description}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-charcoal">
                      {pkg.price}
                    </p>
                  </div>
                ))}
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


