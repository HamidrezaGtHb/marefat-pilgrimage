"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormField } from "@/components/forms/FormField";
import { Button } from "@/components/ui/Button";

export default function BookConsultationPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredLanguage: "English",
    consultationType: "TOUR_INQUIRY",
    tourInterest: "",
    preferredDate: "",
    preferredTime: "",
    timezone: "Europe/Berlin",
    message: "",
    numberOfTravelers: "",
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.preferredDate) newErrors.preferredDate = "Preferred date is required";
    if (!formData.preferredTime) newErrors.preferredTime = "Preferred time is required";

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Validate date is in the future
    if (formData.preferredDate) {
      const selectedDate = new Date(formData.preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.preferredDate = "Please select a future date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Redirect to success page
        router.push(`/consultation/success?id=${data.consultation.id}` as any);
      } else {
        alert(data.error || "Failed to book consultation");
      }
    } catch (error) {
      console.error("Error booking consultation:", error);
      alert("Failed to book consultation");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate time slots (9 AM to 6 PM)
  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
    "05:30 PM",
    "06:00 PM",
  ];

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <header className="border-b border-charcoal/5 bg-white">
        <div className="mx-auto max-w-3xl px-6 py-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Book a Consultation
            </p>
            <h1 className="mt-2 font-display text-3xl text-charcoal sm:text-4xl">
              Speak with a Marefat Advisor
            </h1>
            <p className="mt-3 text-sm text-charcoal/70">
              Share your preferred dates, destinations, and any special needs.
              We'll propose a tailored program within 24–48 hours.
            </p>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="mx-auto max-w-3xl px-6 py-10">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="rounded-2xl border border-charcoal/10 bg-white p-6">
            <h2 className="mb-4 font-display text-lg text-charcoal">Personal Information</h2>
            <div className="space-y-4">
              <FormField
                label="Full Name"
                fieldType="text"
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                error={errors.fullName}
                placeholder="e.g., John Doe"
                required
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  label="Email Address"
                  fieldType="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  error={errors.email}
                  placeholder="john@example.com"
                  required
                />

                <FormField
                  label="Phone Number"
                  fieldType="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  error={errors.phone}
                  placeholder="+49 123 456 7890"
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-charcoal">
                  Preferred Language
                </label>
                <select
                  value={formData.preferredLanguage}
                  onChange={(e) => handleChange("preferredLanguage", e.target.value)}
                  className="w-full rounded-xl border border-charcoal/10 bg-white px-4 py-3 text-sm text-charcoal transition focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/20"
                >
                  <option value="English">English</option>
                  <option value="Farsi">Farsi / Persian</option>
                  <option value="Arabic">Arabic</option>
                  <option value="German">German</option>
                </select>
              </div>
            </div>
          </div>

          {/* Consultation Details */}
          <div className="rounded-2xl border border-charcoal/10 bg-white p-6">
            <h2 className="mb-4 font-display text-lg text-charcoal">Consultation Details</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-charcoal">
                  What can we help you with?
                </label>
                <select
                  value={formData.consultationType}
                  onChange={(e) => handleChange("consultationType", e.target.value)}
                  className="w-full rounded-xl border border-charcoal/10 bg-white px-4 py-3 text-sm text-charcoal transition focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/20"
                >
                  <option value="TOUR_INQUIRY">General Tour Inquiry</option>
                  <option value="CUSTOM_PACKAGE">Custom Package Request</option>
                  <option value="GROUP_BOOKING">Group Booking</option>
                  <option value="PAYMENT_QUESTION">Payment Question</option>
                  <option value="GENERAL">General Consultation</option>
                </select>
              </div>

              <FormField
                label="Number of Travelers (Optional)"
                fieldType="text"
                type="number"
                value={formData.numberOfTravelers}
                onChange={(e) => handleChange("numberOfTravelers", e.target.value)}
                placeholder="e.g., 2"
              />

              <div>
                <label className="mb-1.5 block text-sm font-medium text-charcoal">
                  Message (Optional)
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  rows={4}
                  className="w-full rounded-xl border border-charcoal/10 bg-white px-4 py-3 text-sm text-charcoal transition focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/20"
                  placeholder="Tell us about your travel plans, special requirements, or any questions you have..."
                />
              </div>
            </div>
          </div>

          {/* Preferred Time */}
          <div className="rounded-2xl border border-charcoal/10 bg-white p-6">
            <h2 className="mb-4 font-display text-lg text-charcoal">
              Preferred Consultation Time
            </h2>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  label="Preferred Date"
                  fieldType="date"
                  value={formData.preferredDate}
                  onChange={(e) => handleChange("preferredDate", e.target.value)}
                  error={errors.preferredDate}
                  required
                />

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-charcoal">
                    Preferred Time *
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => handleChange("preferredTime", e.target.value)}
                    className={`w-full rounded-xl border ${errors.preferredTime ? "border-red-500" : "border-charcoal/10"} bg-white px-4 py-3 text-sm text-charcoal transition focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/20`}
                  >
                    <option value="">Select a time</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  {errors.preferredTime && (
                    <p className="mt-1.5 text-xs text-red-600">{errors.preferredTime}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-charcoal">
                  Your Timezone
                </label>
                <select
                  value={formData.timezone}
                  onChange={(e) => handleChange("timezone", e.target.value)}
                  className="w-full rounded-xl border border-charcoal/10 bg-white px-4 py-3 text-sm text-charcoal transition focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/20"
                >
                  <option value="Europe/Berlin">Central European Time (CET)</option>
                  <option value="Europe/London">British Time (GMT)</option>
                  <option value="America/New_York">Eastern Time (EST)</option>
                  <option value="Asia/Dubai">Gulf Standard Time (GST)</option>
                  <option value="Asia/Tehran">Iran Time (IRST)</option>
                </select>
              </div>

              <div className="rounded-xl bg-gold/5 p-4">
                <p className="text-xs text-charcoal/70">
                  <strong>Note:</strong> This is your preferred time. Our team will confirm the
                  exact consultation time via email within 24 hours. You'll receive a calendar
                  invitation that you can add to your calendar.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Booking..." : "Book Consultation"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
