"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormField } from "@/components/forms/FormField";
import { Button } from "@/components/ui/Button";

export default function NewTourPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    destination: "",
    description: "",
    category: "UMRAH",
    basePrice: "",
    durationDays: "1",
    durationNights: "0",
    startDate: "",
    endDate: "",
    totalSeats: "10",
    availableSeats: "10",
    isActive: true,
    isFeatured: false,
    images: "",
    highlights: "",
    itinerary: "",
    hotelStars: "4",
    mealsIncluded: "",
    flightIncluded: false,
    visaIncluded: false,
    insuranceOption: true,
    earlyBirdEnabled: false,
    earlyBirdDeadline: "",
    earlyBirdDiscountAmount: "",
    metaTitle: "",
    metaDescription: "",
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Auto-generate slug from title
    if (field === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.slug) newErrors.slug = "Slug is required";
    if (!formData.basePrice) newErrors.basePrice = "Price is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";

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
      // Parse arrays and JSON
      const tourData = {
        ...formData,
        images: formData.images ? formData.images.split("\n").filter((url) => url.trim()) : [],
        highlights: formData.highlights
          ? formData.highlights.split("\n").filter((h) => h.trim())
          : [],
        itinerary: formData.itinerary
          ? JSON.parse(formData.itinerary)
          : [],
        durationDays: parseInt(formData.durationDays),
        durationNights: parseInt(formData.durationNights),
        totalSeats: parseInt(formData.totalSeats),
        availableSeats: parseInt(formData.availableSeats),
        hotelStars: formData.hotelStars ? parseInt(formData.hotelStars) : null,
      };

      const response = await fetch("/api/admin/tours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tourData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        router.push("/admin/tours" as any);
      } else {
        alert(data.error || "Failed to create tour");
      }
    } catch (error) {
      console.error("Error creating tour:", error);
      alert("Failed to create tour");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <header className="border-b border-charcoal/5 bg-white">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="text-charcoal/60 hover:text-charcoal"
            >
              ← Back
            </button>
            <div>
              <h1 className="font-display text-2xl text-charcoal">Add New Tour</h1>
              <p className="mt-1 text-sm text-charcoal/60">
                Create a new pilgrimage tour
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="mx-auto max-w-4xl px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="rounded-2xl border border-charcoal/10 bg-white p-6">
            <h2 className="mb-4 font-display text-lg text-charcoal">Basic Information</h2>
            <div className="space-y-4">
              <FormField
                label="Tour Title"
                fieldType="text"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                error={errors.title}
                placeholder="e.g., Ramadan Umrah 2024"
                required
              />

              <FormField
                label="Slug (URL)"
                fieldType="text"
                value={formData.slug}
                onChange={(e) => handleChange("slug", e.target.value)}
                error={errors.slug}
                placeholder="e.g., ramadan-umrah-2024"
                helperText="Auto-generated from title, but you can customize it"
                required
              />

              <FormField
                label="Destination"
                fieldType="text"
                value={formData.destination}
                onChange={(e) => handleChange("destination", e.target.value)}
                placeholder="e.g., Mecca & Medina"
              />

              <div>
                <label className="mb-1.5 block text-sm font-medium text-charcoal">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className="w-full rounded-xl border border-charcoal/10 bg-white px-4 py-3 text-sm text-charcoal transition focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/20"
                >
                  <option value="UMRAH">Umrah</option>
                  <option value="HAJJ">Hajj</option>
                  <option value="ZIYARAT">Ziyarat</option>
                  <option value="COMBINED">Combined</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-charcoal">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={4}
                  className="w-full rounded-xl border border-charcoal/10 bg-white px-4 py-3 text-sm text-charcoal transition focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/20"
                  placeholder="Detailed description of the tour..."
                />
              </div>
            </div>
          </div>

          {/* Pricing & Duration */}
          <div className="rounded-2xl border border-charcoal/10 bg-white p-6">
            <h2 className="mb-4 font-display text-lg text-charcoal">Pricing & Duration</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                label="Base Price (EUR)"
                fieldType="text"
                type="number"
                value={formData.basePrice}
                onChange={(e) => handleChange("basePrice", e.target.value)}
                error={errors.basePrice}
                placeholder="2499"
                required
              />

              <FormField
                label="Duration (Days)"
                fieldType="text"
                type="number"
                value={formData.durationDays}
                onChange={(e) => handleChange("durationDays", e.target.value)}
                placeholder="10"
                required
              />

              <FormField
                label="Duration (Nights)"
                fieldType="text"
                type="number"
                value={formData.durationNights}
                onChange={(e) => handleChange("durationNights", e.target.value)}
                placeholder="9"
              />

              <FormField
                label="Hotel Stars"
                fieldType="text"
                type="number"
                value={formData.hotelStars}
                onChange={(e) => handleChange("hotelStars", e.target.value)}
                placeholder="4"
              />
            </div>
          </div>

          {/* Dates & Availability */}
          <div className="rounded-2xl border border-charcoal/10 bg-white p-6">
            <h2 className="mb-4 font-display text-lg text-charcoal">Dates & Availability</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                label="Start Date"
                fieldType="date"
                value={formData.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
                error={errors.startDate}
                required
              />

              <FormField
                label="End Date"
                fieldType="date"
                value={formData.endDate}
                onChange={(e) => handleChange("endDate", e.target.value)}
                error={errors.endDate}
                required
              />

              <FormField
                label="Total Seats"
                fieldType="text"
                type="number"
                value={formData.totalSeats}
                onChange={(e) => handleChange("totalSeats", e.target.value)}
                placeholder="10"
              />

              <FormField
                label="Available Seats"
                fieldType="text"
                type="number"
                value={formData.availableSeats}
                onChange={(e) => handleChange("availableSeats", e.target.value)}
                placeholder="10"
              />
            </div>
          </div>

          {/* Images */}
          <div className="rounded-2xl border border-charcoal/10 bg-white p-6">
            <h2 className="mb-4 font-display text-lg text-charcoal">Images</h2>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-charcoal">
                Image URLs (one per line)
              </label>
              <textarea
                value={formData.images}
                onChange={(e) => handleChange("images", e.target.value)}
                rows={5}
                className="w-full rounded-xl border border-charcoal/10 bg-white px-4 py-3 text-sm text-charcoal transition focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/20"
                placeholder={"https://example.com/image1.jpg\nhttps://example.com/image2.jpg"}
              />
              <p className="mt-1.5 text-xs text-charcoal/60">
                Enter one image URL per line. Use services like ImgBB, Cloudinary, or your own hosting.
              </p>
            </div>
          </div>

          {/* Highlights */}
          <div className="rounded-2xl border border-charcoal/10 bg-white p-6">
            <h2 className="mb-4 font-display text-lg text-charcoal">Highlights</h2>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-charcoal">
                Tour Highlights (one per line)
              </label>
              <textarea
                value={formData.highlights}
                onChange={(e) => handleChange("highlights", e.target.value)}
                rows={6}
                className="w-full rounded-xl border border-charcoal/10 bg-white px-4 py-3 text-sm text-charcoal transition focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/20"
                placeholder={"5-star hotel near Haram\nGuided Ziyarat tours\nAll meals included"}
              />
            </div>
          </div>

          {/* Package Details */}
          <div className="rounded-2xl border border-charcoal/10 bg-white p-6">
            <h2 className="mb-4 font-display text-lg text-charcoal">Package Details</h2>
            <div className="space-y-4">
              <FormField
                label="Meals Included"
                fieldType="text"
                value={formData.mealsIncluded}
                onChange={(e) => handleChange("mealsIncluded", e.target.value)}
                placeholder="e.g., Breakfast & Dinner"
              />

              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.flightIncluded}
                    onChange={(e) => handleChange("flightIncluded", e.target.checked)}
                    className="h-5 w-5 rounded border-charcoal/20 text-gold focus:ring-gold/20"
                  />
                  <span className="text-sm text-charcoal">Flight Included</span>
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.visaIncluded}
                    onChange={(e) => handleChange("visaIncluded", e.target.checked)}
                    className="h-5 w-5 rounded border-charcoal/20 text-gold focus:ring-gold/20"
                  />
                  <span className="text-sm text-charcoal">Visa Included</span>
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.insuranceOption}
                    onChange={(e) => handleChange("insuranceOption", e.target.checked)}
                    className="h-5 w-5 rounded border-charcoal/20 text-gold focus:ring-gold/20"
                  />
                  <span className="text-sm text-charcoal">Insurance Option Available</span>
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => handleChange("isActive", e.target.checked)}
                    className="h-5 w-5 rounded border-charcoal/20 text-gold focus:ring-gold/20"
                  />
                  <span className="text-sm text-charcoal">Make Tour Active (visible on website)</span>
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => handleChange("isFeatured", e.target.checked)}
                    className="h-5 w-5 rounded border-charcoal/20 text-gold focus:ring-gold/20"
                  />
                  <span className="text-sm text-charcoal">Featured on Homepage (max 3 tours)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3">
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
              {isSubmitting ? "Creating Tour..." : "Create Tour"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
