/**
 * Seed script to add sample tours to the database
 * Run with: npx tsx prisma/seed-tours.ts
 */

import { PrismaClient } from "@/generated/prisma";
import { Decimal } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

const sampleTours = [
  {
    title: "Signature Ramadan Umrah",
    slug: "signature-ramadan-umrah",
    destination: "Makkah & Madinah",
    description: "Experience the blessed month of Ramadan in the holy cities of Makkah and Madinah. This premium package includes 5-star accommodation near the Haram, guided spiritual sessions, and comprehensive support throughout your journey.",
    category: "UMRAH",
    basePrice: new Decimal(3250),
    currency: "EUR",
    durationDays: 10,
    durationNights: 9,
    startDate: new Date("2026-03-15"),
    endDate: new Date("2026-03-25"),
    totalSeats: 30,
    availableSeats: 30,
    isActive: true,
    isFeatured: true,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800",
      "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=800",
      "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800",
    ]),
    highlights: JSON.stringify([
      "5-star hotel near Haram in Makkah and Madinah",
      "Iftar and Suhoor meals included",
      "Guided Ziyarat tours to historical sites",
      "Experienced spiritual guide accompanying the group",
      "VIP airport transfers and transportation",
      "24/7 on-ground support team",
      "Group size limited to 30 pilgrims for personalized care",
    ]),
    itinerary: JSON.stringify([
      {
        day: 1,
        title: "Arrival in Madinah",
        description: "Arrival at Madinah airport, transfer to 5-star hotel near Masjid Nabawi. Welcome orientation and group introduction.",
      },
      {
        day: 2,
        title: "Madinah Ziyarat",
        description: "Visit to Masjid Quba, Masjid Qiblatain, and other sacred sites. Evening prayers at Masjid Nabawi.",
      },
      {
        day: 3,
        title: "Madinah - Spiritual Day",
        description: "Full day for personal ibadah at Masjid Nabawi. Optional guided session on the history of Madinah.",
      },
      {
        day: 4,
        title: "Travel to Makkah",
        description: "Morning departure to Makkah. Check-in to 5-star hotel near Haram. Evening Umrah guidance session.",
      },
      {
        day: 5,
        title: "First Umrah",
        description: "Perform your first Umrah with group guidance. Spiritual counseling available.",
      },
      {
        day: 6,
        title: "Makkah - Ramadan Ibadah",
        description: "Full day for personal worship. Iftar at the hotel, Taraweeh prayers at Haram.",
      },
      {
        day: 7,
        title: "Makkah - Spiritual Sessions",
        description: "Morning guided session on Hajj rituals preparation. Afternoon free for shopping or rest.",
      },
      {
        day: 8,
        title: "Additional Umrah",
        description: "Optional second Umrah. Visit to historical sites around Makkah.",
      },
      {
        day: 9,
        title: "Farewell Day",
        description: "Final prayers at Haram. Farewell dinner and group reflection session.",
      },
      {
        day: 10,
        title: "Departure",
        description: "Transfer to Jeddah airport for return flight.",
      },
    ]),
    hotelStars: 5,
    mealsIncluded: "Breakfast, Iftar & Suhoor",
    flightIncluded: true,
    visaIncluded: true,
    insuranceOption: true,
    earlyBirdEnabled: false,
    metaTitle: "Signature Ramadan Umrah 2026 | Premium Package | Marefat Pilgrimage",
    metaDescription: "Join our exclusive Ramadan Umrah program with 5-star hotels, guided tours, and spiritual support throughout your blessed journey.",
  },
  {
    title: "Executive Hajj Program",
    slug: "executive-hajj-program",
    destination: "Makkah, Mina, Arafat & Muzdalifah",
    description: "Our most premium Hajj offering designed for executives and families seeking comfort during this sacred pilgrimage. Limited to 20 pilgrims for exceptional personal care and attention throughout all rituals.",
    category: "HAJJ",
    basePrice: new Decimal(7500),
    currency: "EUR",
    durationDays: 18,
    durationNights: 17,
    startDate: new Date("2026-06-01"),
    endDate: new Date("2026-06-19"),
    totalSeats: 20,
    availableSeats: 20,
    isActive: true,
    isFeatured: true,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800",
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800",
      "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=800",
    ]),
    highlights: JSON.stringify([
      "Ultra-premium 5-star accommodation in Makkah and Madinah",
      "VIP tents in Mina with air conditioning and private facilities",
      "Exclusive small group size (maximum 20 pilgrims)",
      "Dedicated scholar and spiritual guide",
      "All meals prepared to high standards",
      "Private transportation throughout",
      "Pre-Hajj intensive training sessions",
      "24/7 medical support and emergency assistance",
      "Porter services for luggage during Hajj days",
    ]),
    itinerary: JSON.stringify([
      {
        day: 1,
        title: "Arrival in Madinah",
        description: "VIP airport reception and transfer to 5-star hotel near Masjid Nabawi.",
      },
      {
        day: 2,
        title: "Madinah - Spiritual Preparation",
        description: "Visit to sacred sites. Hajj preparation session with scholar.",
      },
      {
        day: 3,
        title: "Madinah - Day of Worship",
        description: "Full day for personal ibadah at Masjid Nabawi.",
      },
      {
        day: 4,
        title: "Travel to Makkah",
        description: "Private coach to Makkah. Check-in to 5-star hotel near Haram.",
      },
      {
        day: 5,
        title: "Umrah and Acclimatization",
        description: "Perform Umrah. Rest and prepare for Hajj.",
      },
      {
        day: 6,
        title: "Hajj Training Day 1",
        description: "Intensive Hajj rituals training with visual aids and Q&A.",
      },
      {
        day: 7,
        title: "Hajj Training Day 2",
        description: "Practical walk-through of Tawaf and Sa'i. Medical check and final preparations.",
      },
      {
        day: 8,
        title: "Day of Tarwiyah (8th Dhul Hijjah)",
        description: "Enter Ihram. Travel to VIP tents in Mina. Evening prayers and rest.",
      },
      {
        day: 9,
        title: "Day of Arafah (9th Dhul Hijjah)",
        description: "Depart for Arafat at dawn. Stand at Arafat with group. Evening to Muzdalifah.",
      },
      {
        day: 10,
        title: "Eid Day (10th Dhul Hijjah)",
        description: "Rami Jamarat, sacrifice, Tawaf al-Ifadah, and Sa'i. Return to Mina.",
      },
      {
        day: 11,
        title: "Days of Tashreeq - Day 1 (11th Dhul Hijjah)",
        description: "Stone three Jamarat. Rest at VIP tents in Mina.",
      },
      {
        day: 12,
        title: "Days of Tashreeq - Day 2 (12th Dhul Hijjah)",
        description: "Stone three Jamarat. Prepare to leave Mina.",
      },
      {
        day: 13,
        title: "Farewell Tawaf",
        description: "Return to Makkah hotel. Perform Tawaf al-Wada.",
      },
      {
        day: 14,
        title: "Rest in Makkah",
        description: "Free day for rest, shopping, or additional worship.",
      },
      {
        day: 15,
        title: "Makkah - Personal Time",
        description: "Personal time for ibadah or visiting historical sites.",
      },
      {
        day: 16,
        title: "Travel to Madinah",
        description: "Return to Madinah for final days of spiritual reflection.",
      },
      {
        day: 17,
        title: "Madinah - Final Day",
        description: "Last prayers at Masjid Nabawi. Farewell gathering.",
      },
      {
        day: 18,
        title: "Departure",
        description: "Transfer to Madinah airport for return journey.",
      },
    ]),
    hotelStars: 5,
    mealsIncluded: "Full Board (All meals included)",
    flightIncluded: true,
    visaIncluded: true,
    insuranceOption: true,
    earlyBirdEnabled: false,
    metaTitle: "Executive Hajj Program 2026 | VIP Package | Marefat Pilgrimage",
    metaDescription: "Experience Hajj with ultimate comfort and care. Small group, VIP tents, 5-star hotels, and dedicated scholarly support.",
  },
  {
    title: "Karbala & Najaf Retreat",
    slug: "karbala-najaf-retreat",
    destination: "Karbala & Najaf, Iraq",
    description: "A spiritual journey to the sacred cities of Karbala and Najaf. Visit the shrines of Imam Hussein (AS) and Imam Ali (AS), and experience the profound spiritual atmosphere of these holy sites.",
    category: "ZIYARAT",
    basePrice: new Decimal(1650),
    currency: "EUR",
    durationDays: 7,
    durationNights: 6,
    startDate: new Date("2026-02-10"),
    endDate: new Date("2026-02-17"),
    totalSeats: 40,
    availableSeats: 40,
    isActive: true,
    isFeatured: true,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800",
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=800",
      "https://images.unsplash.com/photo-1583948920962-c673a044e9a0?w=800",
    ]),
    highlights: JSON.stringify([
      "4-star hotel accommodation near the holy shrines",
      "Daily Ziyarat programs with knowledgeable guide",
      "Visit to Imam Hussein (AS) shrine in Karbala",
      "Visit to Imam Ali (AS) shrine in Najaf",
      "Transportation between cities and to Ziyarat sites",
      "Traditional Iraqi meals at local restaurants",
      "Group size of maximum 40 for comfortable travel",
    ]),
    itinerary: JSON.stringify([
      {
        day: 1,
        title: "Arrival in Najaf",
        description: "Arrival at Najaf International Airport. Transfer to 4-star hotel. Evening Ziyarat at Imam Ali (AS) shrine.",
      },
      {
        day: 2,
        title: "Najaf Exploration",
        description: "Full day Ziyarat in Najaf. Visit Wadi al-Salam cemetery, Masjid Kufa, and house of Imam Ali (AS).",
      },
      {
        day: 3,
        title: "Travel to Karbala",
        description: "Morning check-out and travel to Karbala. Check-in to hotel. Afternoon Ziyarat at Imam Hussein (AS) shrine.",
      },
      {
        day: 4,
        title: "Karbala - Day of Reflection",
        description: "Full day at the shrines of Imam Hussein (AS) and Hazrat Abbas (AS). Attend mourning ceremonies.",
      },
      {
        day: 5,
        title: "Karbala Historical Sites",
        description: "Visit historical sites related to the Battle of Karbala. Evening prayers at the shrine.",
      },
      {
        day: 6,
        title: "Final Ziyarat Day",
        description: "Last opportunity for personal prayers and Ziyarat. Farewell gathering in the evening.",
      },
      {
        day: 7,
        title: "Departure",
        description: "Transfer to Najaf airport for return flight.",
      },
    ]),
    hotelStars: 4,
    mealsIncluded: "Breakfast only",
    flightIncluded: false,
    visaIncluded: true,
    insuranceOption: true,
    earlyBirdEnabled: true,
    earlyBirdDeadline: new Date("2026-01-25"),
    earlyBirdDiscountAmount: new Decimal(200),
    metaTitle: "Karbala & Najaf Ziyarat 2026 | 7-Day Spiritual Retreat | Marefat Pilgrimage",
    metaDescription: "Join our spiritual journey to Karbala and Najaf. Visit the holy shrines and experience the profound spirituality of these sacred sites.",
  },
  {
    title: "Essential Umrah Package",
    slug: "essential-umrah-package",
    destination: "Makkah & Madinah",
    description: "An affordable yet comfortable Umrah package designed for those seeking a meaningful pilgrimage experience. Includes quality 3-star accommodation and essential services for a blessed journey.",
    category: "UMRAH",
    basePrice: new Decimal(1899),
    currency: "EUR",
    durationDays: 10,
    durationNights: 9,
    startDate: new Date("2026-04-05"),
    endDate: new Date("2026-04-15"),
    totalSeats: 50,
    availableSeats: 50,
    isActive: true,
    isFeatured: false,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800",
      "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?w=800",
    ]),
    highlights: JSON.stringify([
      "Comfortable 3-star hotels near Haram",
      "Daily breakfast included",
      "Group Umrah guidance",
      "Basic Ziyarat tours",
      "Airport transfers",
      "Experienced tour leader",
    ]),
    itinerary: JSON.stringify([
      {
        day: 1,
        title: "Arrival in Madinah",
        description: "Airport pickup and transfer to hotel. Rest and orientation.",
      },
      {
        day: 2,
        title: "Madinah Ziyarat",
        description: "Visit to Masjid Nabawi and surrounding sites.",
      },
      {
        day: 3,
        title: "Madinah to Makkah",
        description: "Travel to Makkah and check-in to hotel.",
      },
      {
        day: 4,
        title: "First Umrah",
        description: "Perform Umrah with group guidance.",
      },
      {
        day: 5,
        title: "Personal Worship Day",
        description: "Free day for personal ibadah.",
      },
      {
        day: 6,
        title: "Makkah Ziyarat",
        description: "Visit historical sites around Makkah.",
      },
      {
        day: 7,
        title: "Additional Umrah",
        description: "Optional second Umrah.",
      },
      {
        day: 8,
        title: "Shopping Day",
        description: "Free day for shopping or rest.",
      },
      {
        day: 9,
        title: "Farewell",
        description: "Final prayers and preparation for departure.",
      },
      {
        day: 10,
        title: "Departure",
        description: "Transfer to airport.",
      },
    ]),
    hotelStars: 3,
    mealsIncluded: "Breakfast only",
    flightIncluded: true,
    visaIncluded: true,
    insuranceOption: true,
    earlyBirdEnabled: true,
    earlyBirdDeadline: new Date("2026-03-05"),
    earlyBirdDiscountAmount: new Decimal(150),
    metaTitle: "Essential Umrah Package 2026 | Affordable Umrah | Marefat Pilgrimage",
    metaDescription: "Affordable Umrah package with comfortable accommodation and essential services for a blessed pilgrimage experience.",
  },
  {
    title: "Mashhad Sacred Journey",
    slug: "mashhad-sacred-journey",
    destination: "Mashhad, Iran",
    description: "A spiritual pilgrimage to the holy shrine of Imam Reza (AS) in Mashhad. Experience the unique Persian hospitality and deep spiritual atmosphere of this sacred city.",
    category: "ZIYARAT",
    basePrice: new Decimal(1250),
    currency: "EUR",
    durationDays: 5,
    durationNights: 4,
    startDate: new Date("2026-03-20"),
    endDate: new Date("2026-03-25"),
    totalSeats: 35,
    availableSeats: 35,
    isActive: true,
    isFeatured: false,
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800",
      "https://images.unsplash.com/photo-1583948920962-c673a044e9a0?w=800",
    ]),
    highlights: JSON.stringify([
      "4-star hotel near Imam Reza (AS) shrine",
      "Daily Ziyarat programs",
      "Visit to historical and cultural sites of Mashhad",
      "Traditional Persian meals",
      "Cultural experiences and local bazaar tours",
      "Knowledgeable Persian-speaking guide",
    ]),
    itinerary: JSON.stringify([
      {
        day: 1,
        title: "Arrival in Mashhad",
        description: "Airport pickup and hotel check-in. Evening Ziyarat at Imam Reza (AS) shrine.",
      },
      {
        day: 2,
        title: "Full Day Ziyarat",
        description: "Morning and evening Ziyarat. Attend religious lectures if available.",
      },
      {
        day: 3,
        title: "Cultural Exploration",
        description: "Visit to Nader Shah tomb, Goharshad Mosque, and local museums.",
      },
      {
        day: 4,
        title: "Spiritual & Shopping Day",
        description: "Morning Ziyarat. Afternoon visit to traditional bazaars.",
      },
      {
        day: 5,
        title: "Departure",
        description: "Final Ziyarat and transfer to airport.",
      },
    ]),
    hotelStars: 4,
    mealsIncluded: "Breakfast & Dinner",
    flightIncluded: false,
    visaIncluded: true,
    insuranceOption: true,
    earlyBirdEnabled: false,
    metaTitle: "Mashhad Ziyarat 2026 | Imam Reza Shrine Pilgrimage | Marefat Pilgrimage",
    metaDescription: "Experience the spiritual journey to Imam Reza (AS) shrine in Mashhad with comfortable accommodation and guided tours.",
  },
];

async function main() {
  console.log("🌱 Starting to seed tours...\n");

  for (const tourData of sampleTours) {
    try {
      // Check if tour already exists
      const existing = await prisma.tour.findUnique({
        where: { slug: tourData.slug },
      });

      if (existing) {
        console.log(`⏭️  Tour "${tourData.title}" already exists, skipping...`);
        continue;
      }

      // Create the tour
      const tour = await prisma.tour.create({
        data: tourData,
      });

      console.log(`✅ Created tour: ${tour.title} (${tour.slug})`);
    } catch (error) {
      console.error(`❌ Error creating tour "${tourData.title}":`, error);
    }
  }

  console.log("\n✨ Seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
