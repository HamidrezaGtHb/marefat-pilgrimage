"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type TravelerInfo = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  passportNumber: string;
  nationality: string;
  passportExpiry: string;
  dateOfBirth: string;
};

type Step = 1 | 2 | 3 | 4;

// Tour data - in production, fetch from API/database
const getTourData = (slug: string) => {
  const tours: Record<string, any> = {
    "signature-ramadan-umrah": {
      title: "Signature Ramadan Umrah",
      destination: "Makkah & Madinah",
      duration: "10 days",
      basePrice: 3250,
      image: "/api/placeholder/400/300",
    },
    "karbala-najaf-retreat": {
      title: "Karbala & Najaf Retreat",
      destination: "Karbala & Najaf",
      duration: "7 days",
      basePrice: 1650,
      image: "/api/placeholder/400/300",
    },
    "mashhad-spiritual-weekend": {
      title: "Mashhad Spiritual Weekend",
      destination: "Mashhad, Iran",
      duration: "4 days",
      basePrice: 890,
      image: "/api/placeholder/400/300",
    },
  };
  
  return tours[slug] || {
    title: "Premium Pilgrimage Tour",
    destination: "Sacred Sites",
    duration: "Multiple days",
    basePrice: 2500,
    image: "/api/placeholder/400/300",
  };
};

type Props = {
  params: { slug: string };
};

export default function TourBookingPage({ params }: Props) {
  const router = useRouter();
  const tour = getTourData(params.slug);
  
  const [step, setStep] = useState<Step>(1);
  const [numberOfTravelers, setNumberOfTravelers] = useState<number>(1);
  const [travelDate, setTravelDate] = useState("");
  const [travelers, setTravelers] = useState<TravelerInfo[]>([]);
  
  const [addons, setAddons] = useState({
    insurance: false,
    extraNights: 0,
    privateTransfer: false,
  });
  
  const [paymentMethod, setPaymentMethod] = useState<"bank">("bank");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize travelers array when number changes
  const handleTravelerCountChange = (count: number) => {
    setNumberOfTravelers(count);
    const newTravelers: TravelerInfo[] = [];
    for (let i = 0; i < count; i++) {
      newTravelers.push({
        id: `traveler-${i + 1}`,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        passportNumber: "",
        nationality: "",
        passportExpiry: "",
        dateOfBirth: "",
      });
    }
    setTravelers(newTravelers);
  };

  // Update individual traveler data
  const updateTraveler = (index: number, field: keyof TravelerInfo, value: string) => {
    const updated = [...travelers];
    updated[index] = { ...updated[index], [field]: value };
    setTravelers(updated);
  };

  // Validation
  const validateStep = (currentStep: Step): boolean => {
    if (currentStep === 1) {
      return !!travelDate && numberOfTravelers > 0;
    }
    if (currentStep === 2) {
      return travelers.every(t => 
        t.firstName &&
        t.lastName &&
        t.email &&
        t.phone &&
        t.passportNumber &&
        t.nationality &&
        t.passportExpiry &&
        t.dateOfBirth
      );
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(4, s + 1) as Step);
  };

  const handleBack = () => {
    setStep((s) => Math.max(1, s - 1) as Step);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep(step)) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Generate booking reference
    const bookingRef = `MAR-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    
    // Redirect to success page with booking reference
    router.push(`/tours/${params.slug}/book/success?ref=${bookingRef}`);
  };

  // Calculate totals
  const baseTotal = tour.basePrice * numberOfTravelers;
  const insuranceCost = addons.insurance ? 99 * numberOfTravelers : 0;
  const extraNightsCost = addons.extraNights * 150 * numberOfTravelers;
  const transferCost = addons.privateTransfer ? 75 * numberOfTravelers : 0;
  const grandTotal = baseTotal + insuranceCost + extraNightsCost + transferCost;
  const depositAmount = Math.floor(grandTotal * 0.3);

  return (
    <main className="min-h-screen bg-ivory">
      {/* Header */}
      <section className="border-b border-charcoal/5 bg-ivory/90">
        <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
          <Link
            href={`/tours/${params.slug}`}
            className="inline-flex items-center text-xs text-charcoal/60 transition hover:text-charcoal"
          >
            <svg className="mr-1.5 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to tour details
          </Link>
          <h1 className="mt-3 font-display text-2xl tracking-tight text-charcoal sm:text-3xl">
            Book Your Journey
          </h1>
          <p className="mt-2 text-sm text-charcoal/70">
            {tour.title} • {tour.destination}
          </p>
        </div>
      </section>

      {/* Two-column layout */}
      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Left: Form */}
          <div className="space-y-6">
            {/* Progress Steps */}
            <div className="flex items-center justify-between rounded-2xl border border-charcoal/5 bg-ivory/90 p-6">
              {["Date & Travelers", "Traveler Info", "Add-ons", "Payment"].map((label, idx) => {
                const stepNum = (idx + 1) as Step;
                const isActive = step === stepNum;
                const isDone = step > stepNum;
                return (
                  <div key={label} className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition ${
                        isDone
                          ? "bg-charcoal text-ivory"
                          : isActive
                          ? "bg-gold text-charcoal"
                          : "bg-charcoal/5 text-charcoal/40"
                      }`}
                    >
                      {isDone ? "✓" : stepNum}
                    </div>
                    <span
                      className={`hidden text-xs sm:inline ${
                        isActive || isDone ? "font-medium text-charcoal" : "text-charcoal/50"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Date & Number of Travelers */}
              {step === 1 && (
                <div className="space-y-6 rounded-2xl border border-charcoal/5 bg-ivory p-6 shadow-sm">
                  <h2 className="font-display text-lg font-semibold text-charcoal">
                    Select Date & Number of Travelers
                  </h2>
                  
                  <div>
                    <label className="mb-2 block text-sm font-medium text-charcoal">
                      Preferred Travel Date
                    </label>
                    <input
                      type="date"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      required
                      className="w-full rounded-xl border border-charcoal/10 bg-ivory px-4 py-3 text-sm text-charcoal transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                    />
                    <p className="mt-2 text-xs text-charcoal/60">
                      Your advisor will confirm exact dates and availability.
                    </p>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-charcoal">
                      How many travelers?
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={numberOfTravelers}
                      onChange={(e) => handleTravelerCountChange(parseInt(e.target.value) || 1)}
                      required
                      className="w-full rounded-xl border border-charcoal/10 bg-ivory px-4 py-3 text-sm text-charcoal transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                    />
                    <p className="mt-2 text-xs text-charcoal/60">
                      Maximum 10 travelers per booking. For larger groups, please contact us.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 2: Traveler Information (Dynamic) */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="font-display text-lg font-semibold text-charcoal">
                    Traveler Information
                  </h2>
                  
                  {travelers.map((traveler, index) => (
                    <div
                      key={traveler.id}
                      className="space-y-4 rounded-2xl border border-charcoal/5 bg-ivory p-6 shadow-sm"
                    >
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-charcoal/70">
                        Traveler {index + 1}
                      </h3>
                      
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-1.5 block text-xs font-medium text-charcoal">
                            First Name *
                          </label>
                          <input
                            type="text"
                            value={traveler.firstName}
                            onChange={(e) => updateTraveler(index, "firstName", e.target.value)}
                            required
                            className="w-full rounded-xl border border-charcoal/10 bg-ivory px-3 py-2.5 text-sm text-charcoal transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-xs font-medium text-charcoal">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            value={traveler.lastName}
                            onChange={(e) => updateTraveler(index, "lastName", e.target.value)}
                            required
                            className="w-full rounded-xl border border-charcoal/10 bg-ivory px-3 py-2.5 text-sm text-charcoal transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-1.5 block text-xs font-medium text-charcoal">
                            Email *
                          </label>
                          <input
                            type="email"
                            value={traveler.email}
                            onChange={(e) => updateTraveler(index, "email", e.target.value)}
                            required
                            className="w-full rounded-xl border border-charcoal/10 bg-ivory px-3 py-2.5 text-sm text-charcoal transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-xs font-medium text-charcoal">
                            Phone (with country code) *
                          </label>
                          <input
                            type="tel"
                            value={traveler.phone}
                            onChange={(e) => updateTraveler(index, "phone", e.target.value)}
                            required
                            placeholder="+49 123 456 789"
                            className="w-full rounded-xl border border-charcoal/10 bg-ivory px-3 py-2.5 text-sm text-charcoal transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-3">
                        <div>
                          <label className="mb-1.5 block text-xs font-medium text-charcoal">
                            Passport Number *
                          </label>
                          <input
                            type="text"
                            value={traveler.passportNumber}
                            onChange={(e) => updateTraveler(index, "passportNumber", e.target.value)}
                            required
                            className="w-full rounded-xl border border-charcoal/10 bg-ivory px-3 py-2.5 text-sm text-charcoal transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-xs font-medium text-charcoal">
                            Nationality *
                          </label>
                          <input
                            type="text"
                            value={traveler.nationality}
                            onChange={(e) => updateTraveler(index, "nationality", e.target.value)}
                            required
                            className="w-full rounded-xl border border-charcoal/10 bg-ivory px-3 py-2.5 text-sm text-charcoal transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-xs font-medium text-charcoal">
                            Date of Birth *
                          </label>
                          <input
                            type="date"
                            value={traveler.dateOfBirth}
                            onChange={(e) => updateTraveler(index, "dateOfBirth", e.target.value)}
                            required
                            className="w-full rounded-xl border border-charcoal/10 bg-ivory px-3 py-2.5 text-sm text-charcoal transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-1.5 block text-xs font-medium text-charcoal">
                          Passport Expiry Date *
                        </label>
                        <input
                          type="date"
                          value={traveler.passportExpiry}
                          onChange={(e) => updateTraveler(index, "passportExpiry", e.target.value)}
                          required
                          className="w-full rounded-xl border border-charcoal/10 bg-ivory px-3 py-2.5 text-sm text-charcoal transition focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                        />
                        <p className="mt-1.5 text-xs text-charcoal/60">
                          Must be valid for at least 6 months from travel date
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 3: Add-ons */}
              {step === 3 && (
                <div className="space-y-6 rounded-2xl border border-charcoal/5 bg-ivory p-6 shadow-sm">
                  <h2 className="font-display text-lg font-semibold text-charcoal">
                    Enhance Your Journey
                  </h2>
                  
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 rounded-xl border border-charcoal/7 bg-ivory/90 p-4 transition hover:border-charcoal/15 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={addons.insurance}
                        onChange={(e) => setAddons({ ...addons, insurance: e.target.checked })}
                        className="mt-0.5 h-4 w-4 rounded border-charcoal/30 text-charcoal transition focus:ring-2 focus:ring-gold/70"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-charcoal">
                          Travel Insurance
                        </p>
                        <p className="text-xs text-charcoal/60">
                          Comprehensive coverage for peace of mind • €99 per traveler
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-charcoal">€99</span>
                    </label>

                    <label className="flex items-start gap-3 rounded-xl border border-charcoal/7 bg-ivory/90 p-4 transition hover:border-charcoal/15 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={addons.privateTransfer}
                        onChange={(e) => setAddons({ ...addons, privateTransfer: e.target.checked })}
                        className="mt-0.5 h-4 w-4 rounded border-charcoal/30 text-charcoal transition focus:ring-2 focus:ring-gold/70"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-charcoal">
                          Private Airport Transfer
                        </p>
                        <p className="text-xs text-charcoal/60">
                          Exclusive vehicle for airport pickup and drop-off • €75 per traveler
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-charcoal">€75</span>
                    </label>

                    <div className="rounded-xl border border-charcoal/7 bg-ivory/90 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-charcoal">
                            Extra Hotel Nights
                          </p>
                          <p className="text-xs text-charcoal/60">
                            Extend your stay before or after • €150 per night per traveler
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setAddons({ ...addons, extraNights: Math.max(0, addons.extraNights - 1) })}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-charcoal/15 bg-ivory text-charcoal transition hover:bg-charcoal/5"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-sm font-semibold text-charcoal">
                            {addons.extraNights}
                          </span>
                          <button
                            type="button"
                            onClick={() => setAddons({ ...addons, extraNights: Math.min(7, addons.extraNights + 1) })}
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-charcoal transition hover:bg-gold-dark"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Payment Method */}
              {step === 4 && (
                <div className="space-y-6 rounded-2xl border border-charcoal/5 bg-ivory p-6 shadow-sm">
                  <h2 className="font-display text-lg font-semibold text-charcoal">
                    Payment Method
                  </h2>
                  
                  <div className="space-y-3">
                    <button
                      type="button"
                      disabled
                      className="flex w-full items-start gap-3 rounded-xl border border-charcoal/7 bg-charcoal/3 p-4 opacity-40 cursor-not-allowed"
                    >
                      <input
                        type="radio"
                        disabled
                        className="mt-0.5"
                      />
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium text-charcoal">
                          Credit / Debit Card
                        </p>
                        <p className="text-xs text-charcoal/60">
                          Secure payment via Stripe • Coming soon
                        </p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("bank")}
                      className={`flex w-full items-start gap-3 rounded-xl border p-4 transition ${
                        paymentMethod === "bank"
                          ? "border-gold bg-gold/5"
                          : "border-charcoal/7 bg-ivory/90 hover:border-charcoal/15"
                      }`}
                    >
                      <input
                        type="radio"
                        checked={paymentMethod === "bank"}
                        readOnly
                        className="mt-0.5"
                      />
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium text-charcoal">
                          Bank Transfer
                        </p>
                        <p className="text-xs text-charcoal/60">
                          Transfer to our business account • Invoice and details provided after confirmation
                        </p>
                      </div>
                    </button>
                  </div>

                  <div className="rounded-xl bg-gold/10 p-4">
                    <p className="text-xs leading-relaxed text-charcoal/75">
                      <strong className="font-semibold text-charcoal">Payment Terms:</strong> A 30% deposit 
                      (€{depositAmount.toLocaleString()}) is due now to confirm your booking. The remaining balance 
                      is due 30 days before departure. Full payment details and invoice will be sent to your email.
                    </p>
                  </div>

                  <div className="flex items-start gap-2 rounded-xl bg-ivory/80 p-4">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-charcoal/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <p className="text-xs text-charcoal/70">
                      Your payment information is secure and encrypted
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={step === 1}
                  className="text-sm font-medium text-charcoal/70 transition hover:text-charcoal disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ← Back
                </button>

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!validateStep(step)}
                    className="rounded-full bg-charcoal px-8 py-3 text-sm font-medium text-ivory shadow-soft transition hover:bg-charcoal/90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-full bg-gold px-8 py-3 text-sm font-semibold text-charcoal shadow-soft transition hover:bg-gold-dark disabled:cursor-wait disabled:opacity-70"
                  >
                    {isSubmitting ? "Processing..." : "Confirm Booking"}
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Right: Order Summary (Sticky) */}
          <div className="lg:sticky lg:top-6 lg:self-start">
            <div className="space-y-6 rounded-2xl border border-charcoal/5 bg-ivory p-6 shadow-soft">
              <h2 className="font-display text-lg font-semibold text-charcoal">
                Order Summary
              </h2>

              {/* Tour image */}
              <div className="h-40 w-full overflow-hidden rounded-xl bg-gradient-to-tr from-charcoal/80 via-charcoal/40 to-gold-soft/70" />

              <div>
                <h3 className="text-sm font-semibold text-charcoal">
                  {tour.title}
                </h3>
                <p className="mt-1 text-xs text-charcoal/60">
                  {tour.destination} • {tour.duration}
                </p>
                {travelDate && (
                  <p className="mt-1 text-xs text-charcoal/60">
                    Departure: {new Date(travelDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                )}
              </div>

              <div className="space-y-3 border-t border-charcoal/5 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal/70">
                    Base Price × {numberOfTravelers} {numberOfTravelers === 1 ? "traveler" : "travelers"}
                  </span>
                  <span className="font-medium text-charcoal">
                    €{baseTotal.toLocaleString()}
                  </span>
                </div>

                {addons.insurance && (
                  <div className="flex justify-between text-sm">
                    <span className="text-charcoal/70">Travel Insurance</span>
                    <span className="font-medium text-charcoal">
                      €{insuranceCost}
                    </span>
                  </div>
                )}

                {addons.extraNights > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-charcoal/70">
                      Extra Nights ({addons.extraNights})
                    </span>
                    <span className="font-medium text-charcoal">
                      €{extraNightsCost}
                    </span>
                  </div>
                )}

                {addons.privateTransfer && (
                  <div className="flex justify-between text-sm">
                    <span className="text-charcoal/70">Private Transfer</span>
                    <span className="font-medium text-charcoal">
                      €{transferCost}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-2 border-t border-charcoal/5 pt-4">
                <div className="flex justify-between">
                  <span className="font-display text-base font-semibold text-charcoal">
                    Total
                  </span>
                  <span className="font-display text-lg font-bold text-charcoal">
                    €{grandTotal.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-charcoal/60">
                  30% deposit (€{depositAmount.toLocaleString()}) due now
                </p>
              </div>
            </div>

            {/* Help section */}
            <div className="mt-4 rounded-xl bg-ivory/90 p-4 text-center">
              <p className="text-xs text-charcoal/70">
                Need assistance?
              </p>
              <Link
                href="/contact"
                className="mt-2 inline-flex items-center text-xs font-medium text-charcoal transition hover:text-gold"
              >
                Contact our team →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
