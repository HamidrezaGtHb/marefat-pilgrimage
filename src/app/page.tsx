const featuredTours = [
  {
    slug: "signature-ramadan-umrah",
    title: "Signature Ramadan Umrah",
    destination: "Makkah & Madinah",
    type: "Umrah",
    duration: "10 days",
    date: "15 March 2026",
    priceFrom: "€3,250",
    availability: "Limited seats",
  },
  {
    slug: "executive-hajj-program",
    title: "Executive Hajj Program",
    destination: "Makkah, Mina, Arafat",
    type: "Hajj",
    duration: "18 days",
    date: "Hajj 1447",
    priceFrom: "On request",
    availability: "By application",
  },
  {
    slug: "karbala-najaf-retreat",
    title: "Karbala & Najaf Retreat",
    destination: "Karbala & Najaf",
    type: "Ziyarat",
    duration: "7 days",
    date: "Monthly departures",
    priceFrom: "€1,650",
    availability: "Available",
  },
];

const testimonials = [
  {
    name: "A. Rahmani",
    location: "Hamburg, Germany",
    quote:
      "Every detail was taken care of quietly. The spiritual focus of our Umrah was never disturbed by logistics.",
  },
  {
    name: "S. Alavi",
    location: "Zurich, Switzerland",
    quote:
      "Hotels, transport, ziyarat schedule – all felt curated. The group size was intimate and respectful.",
  },
  {
    name: "Family Karimi",
    location: "Tehran, Iran",
    quote:
      "For our parents’ first Umrah, Marefat made sure they felt supported and at ease at every step.",
  },
];

const faqsPreview = [
  {
    question: "Are you a licensed and registered agency?",
    answer:
      "Yes. Marefat Pilgrimage operates with full licensing and works only with accredited partners in Saudi Arabia, Iraq, and Iran.",
  },
  {
    question: "Can you assist with visas and documentation?",
    answer:
      "Our team guides you through all required documents, from passports and photos to vaccination and insurance confirmations.",
  },
  {
    question: "Do you offer private or family-only groups?",
    answer:
      "Yes. In addition to scheduled departures, we create fully private itineraries for families, executives, and small closed groups.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-y-0 right-[-20%] w-1/2 bg-[radial-gradient(circle_at_top,_rgba(199,165,106,0.18),_transparent)]" />
        </div>
        <div className="mx-auto flex min-h-[70vh] max-w-6xl flex-col items-start justify-center px-6 py-16 sm:px-8 lg:px-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Marefat Pilgrimage
          </p>
          <h1 className="max-w-3xl text-balance font-display text-4xl tracking-tight text-charcoal sm:text-5xl lg:text-6xl">
            Premium Umrah &amp;{" "}
            <span className="inline bg-gradient-to-r from-gold-soft to-gold bg-clip-text text-transparent">
              Pilgrimage Tours
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-charcoal/70 sm:text-base">
            Curated journeys to Makkah, Madinah, Iraq, and Iran with
            handpicked hotels, guided rituals, and discreet concierge support —
            designed for those who value comfort, calm, and spiritual depth.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/tours"
              className="inline-flex items-center justify-center rounded-full bg-charcoal px-7 py-3 text-sm font-medium text-ivory shadow-soft transition hover:bg-charcoal/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
            >
              View Tours
            </a>
            <a
              href="/booking"
              className="inline-flex items-center justify-center rounded-full border border-charcoal/15 bg-ivory/70 px-7 py-3 text-sm font-medium text-charcoal shadow-sm shadow-charcoal/5 backdrop-blur-sm transition hover:border-gold hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
            >
              Book Consultation
            </a>
          </div>
        </div>
      </section>

      {/* Trust blocks */}
      <section className="border-y border-charcoal/5 bg-ivory/60">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 sm:grid-cols-3 sm:px-8 lg:px-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/60">
              Licensed &amp; experienced
            </p>
            <p className="mt-2 text-sm text-charcoal/80">
              Registered religious travel agency with dedicated scholars and
              on-ground support teams in every destination.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/60">
              Transparent &amp; clear
            </p>
            <p className="mt-2 text-sm text-charcoal/80">
              Clear itineraries, pricing, and inclusions — no last‑minute
              surprises or hidden costs for you or your family.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/60">
              Human support
            </p>
            <p className="mt-2 text-sm text-charcoal/80">
              A dedicated concierge for your file, available via WhatsApp,
              phone, and email before, during, and after your journey.
            </p>
          </div>
        </div>
      </section>

      {/* Featured tours */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8 lg:px-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-charcoal sm:text-2xl">
                Signature itineraries
              </h2>
              <p className="mt-2 text-sm text-charcoal/70">
                A selection of small‑group Umrah, Hajj, and Ziyarat programs
                crafted for comfort and spiritual focus.
              </p>
            </div>
            <a
              href="/tours"
              className="text-sm font-medium text-charcoal/80 underline-offset-4 hover:underline"
            >
              View all tours
            </a>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {featuredTours.map((tour) => (
              <a
                key={tour.slug}
                href={`/tours/${tour.slug}`}
                className="group flex flex-col rounded-2xl border border-charcoal/5 bg-ivory/80 p-5 shadow-sm shadow-charcoal/5 transition hover:-translate-y-1 hover:shadow-soft"
              >
                <div className="mb-4 h-32 rounded-xl bg-gradient-to-tr from-charcoal/70 via-charcoal/40 to-gold-soft/60 opacity-80 transition group-hover:opacity-100" />
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-charcoal/60">
                  {tour.type} • {tour.destination}
                </p>
                <h3 className="mt-2 text-sm font-semibold text-charcoal sm:text-base">
                  {tour.title}
                </h3>
                <p className="mt-2 text-xs text-charcoal/65">
                  {tour.duration} • {tour.date}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="font-medium text-charcoal">
                    From {tour.priceFrom}
                  </span>
                  <span className="text-[11px] text-gold">{tour.availability}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-ivory/80">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8 lg:px-12">
          <h2 className="text-xl font-semibold text-charcoal sm:text-2xl">
            Pilgrims’ words
          </h2>
          <p className="mt-2 text-sm text-charcoal/70">
            Discreet, attentive service for families and individuals who wish
            to focus on ibadah.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="flex flex-col rounded-2xl border border-charcoal/5 bg-ivory p-5 shadow-sm shadow-charcoal/5"
              >
                <p className="text-sm leading-relaxed text-charcoal/80">
                  “{t.quote}”
                </p>
                <div className="mt-4 text-xs text-charcoal/70">
                  <p className="font-medium">{t.name}</p>
                  <p>{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ preview + CTA */}
      <section className="border-y border-charcoal/5 bg-ivory">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:px-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:px-12">
          <div>
            <h2 className="text-xl font-semibold text-charcoal sm:text-2xl">
              Common questions
            </h2>
            <p className="mt-2 text-sm text-charcoal/70">
              A few essentials about safety, visas, and group sizes. For more
              detail, explore the full FAQ.
            </p>
            <div className="mt-6 space-y-4">
              {faqsPreview.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-xl border border-charcoal/5 bg-ivory/80 p-4"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between text-sm text-charcoal">
                    <span>{item.question}</span>
                    <span className="ml-4 text-xs text-charcoal/50 group-open:hidden">
                      +
                    </span>
                    <span className="ml-4 hidden text-xs text-charcoal/50 group-open:inline">
                      –
                    </span>
                  </summary>
                  <p className="mt-3 text-xs leading-relaxed text-charcoal/70">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
            <a
              href="/faq"
              className="mt-5 inline-flex text-sm font-medium text-charcoal/80 underline-offset-4 hover:underline"
            >
              View full FAQ
            </a>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-gold/40 bg-gradient-to-br from-gold-soft/20 via-ivory to-gold/10 p-6 shadow-soft">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/70">
                Private consultation
              </p>
              <h3 className="mt-2 text-lg font-semibold text-charcoal">
                Speak with a Marefat advisor
              </h3>
              <p className="mt-2 text-sm text-charcoal/75">
                Share your preferred dates, destinations, and any special needs.
                We’ll propose a tailored program within 24–48 hours.
              </p>
            </div>
            <div className="mt-5 space-y-3 text-sm">
              <a
                href="/booking"
                className="inline-flex w-full items-center justify-center rounded-full bg-charcoal px-6 py-3 text-sm font-medium text-ivory shadow-soft transition hover:bg-charcoal/90"
              >
                Start online booking
              </a>
              <a
                href="https://wa.me/0000000000"
                className="inline-flex w-full items-center justify-center rounded-full border border-charcoal/15 bg-ivory/80 px-6 py-3 text-sm font-medium text-charcoal shadow-sm shadow-charcoal/5 transition hover:border-gold"
              >
                Message on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / WhatsApp CTA */}
      <section className="bg-ivory/70">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-6 rounded-2xl border border-charcoal/5 bg-ivory p-6 shadow-sm shadow-charcoal/5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base font-semibold text-charcoal sm:text-lg">
                Quiet updates about upcoming groups
              </h3>
              <p className="mt-1 text-xs text-charcoal/70 sm:text-sm">
                Be informed first about new Umrah dates, Hajj allocation, and
                limited Ziyarat departures. No frequent marketing.
              </p>
            </div>
            <form className="flex w-full flex-col gap-3 sm:max-w-md sm:flex-row">
              <input
                type="email"
                placeholder="Your email address"
                className="h-10 flex-1 rounded-full border border-charcoal/15 bg-ivory px-4 text-sm text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-gold/70 focus:ring-offset-2 focus:ring-offset-ivory"
              />
              <button
                type="submit"
                className="h-10 rounded-full bg-charcoal px-6 text-sm font-medium text-ivory shadow-soft transition hover:bg-charcoal/90"
              >
                Join quietly
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}



