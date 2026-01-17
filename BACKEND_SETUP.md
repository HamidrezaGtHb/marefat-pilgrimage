# Backend Setup Guide - Marefat Pilgrimage

This document provides step-by-step instructions for setting up and running the backend system.

## 📋 Overview

The backend architecture includes:
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with credentials provider
- **API Routes**: Next.js API Routes (App Router)
- **Admin Dashboard**: React-based admin panel

---

## 🚀 Quick Start

### 1. Install Dependencies

All dependencies are already installed, but if needed:

```bash
npm install
```

### 2. Set Up Database

#### Option A: Use Local Prisma Postgres (Easiest for Development)

```bash
# Start local Prisma Postgres instance
npx prisma dev
```

This will:
- Start a local PostgreSQL database
- Automatically configure the DATABASE_URL in .env
- Apply all migrations

#### Option B: Use Existing PostgreSQL Database

Update the `.env` file with your database connection string:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

Then run migrations:

```bash
npx prisma migrate dev
```

### 3. Generate Prisma Client

```bash
npx prisma generate
```

### 4. Seed Database with Admin User

```bash
npx ts-node prisma/seed.ts
```

This creates an admin user with:
- **Email**: `admin@marefat-pilgrimage.com`
- **Password**: `Admin@123`

⚠️ **IMPORTANT**: Change this password after first login!

### 5. Set Up Environment Variables

Copy `.env.example` to `.env` and fill in the required values:

```bash
cp .env.example .env
```

Minimum required variables:
```env
DATABASE_URL="your-database-url"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
```

Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

### 6. Run Development Server

```bash
npm run dev
```

---

## 🔐 Admin Access

### Login Page
Navigate to: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

Default credentials:
- Email: `admin@marefat-pilgrimage.com`
- Password: `Admin@123`

### Admin Dashboard
After login, you'll be redirected to: [http://localhost:3000/admin](http://localhost:3000/admin)

Features:
- Dashboard overview with statistics
- Bookings management
- Customer management
- Analytics and reporting

---

## 📊 Database Schema

### Core Models

#### User (Admin Users)
```prisma
model User {
  id           String   @id @default(cuid())
  email        String   @unique
  name         String?
  role         Role     @default(ADMIN)  // ADMIN or MANAGER
  passwordHash String
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

#### Customer
```prisma
model Customer {
  id        String   @id @default(cuid())
  email     String   @unique
  phone     String?
  bookings  Booking[]
  travelers Traveler[]
}
```

#### Booking
```prisma
model Booking {
  id                String   @id @default(cuid())
  bookingRef        String   @unique  // MAR-XXXXX
  tourSlug          String
  tourTitle         String
  customerId        String
  numberOfTravelers Int
  travelDate        DateTime?
  hasInsurance      Boolean
  hasFlightBooking  Boolean
  basePrice         Decimal
  insuranceCost     Decimal
  flightCost        Decimal
  totalAmount       Decimal
  depositAmount     Decimal
  paymentMethod     PaymentMethod
  paymentStatus     PaymentStatus
  status            BookingStatus
  travelers         Traveler[]
  payments          Payment[]
}
```

#### Traveler
```prisma
model Traveler {
  id             String   @id @default(cuid())
  firstName      String
  lastName       String
  email          String
  phone          String
  dateOfBirth    DateTime
  nationality    String
  passportNumber String
  passportExpiry DateTime
  bookingId      String
  customerId     String
}
```

#### Payment
```prisma
model Payment {
  id            String   @id @default(cuid())
  bookingId     String
  amount        Decimal
  paymentType   PaymentType    // DEPOSIT or FULL
  paymentMethod PaymentMethod  // BANK_TRANSFER or ONLINE_PAYMENT
  status        PaymentStatus  // PENDING, VERIFIED, REJECTED
  transferRef   String?
  transferDate  DateTime?
  verifiedAt    DateTime?
  verifiedBy    String?
}
```

---

## 🛣️ API Routes

### Public API Routes

#### Bookings
```
POST   /api/bookings           - Create new booking
GET    /api/bookings/[ref]     - Get booking by reference
```

Example request to create booking:
```typescript
POST /api/bookings
Content-Type: application/json

{
  "tourSlug": "ramadan-umrah-2024",
  "tourTitle": "Ramadan Umrah 2024",
  "tourPrice": 2499,
  "customerEmail": "customer@example.com",
  "customerPhone": "+49123456789",
  "travelers": [
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "+49123456789",
      "dateOfBirth": "1990-01-15",
      "nationality": "German",
      "passportNumber": "AB123456",
      "passportExpiry": "2028-01-15"
    }
  ],
  "hasInsurance": false,
  "hasFlightBooking": false,
  "paymentMethod": "BANK_TRANSFER"
}
```

Response:
```json
{
  "success": true,
  "bookingRef": "MAR-ABC12",
  "booking": {
    "id": "clxxx...",
    "bookingRef": "MAR-ABC12",
    "totalAmount": "2499.00",
    "depositAmount": "749.70",
    "paymentMethod": "BANK_TRANSFER"
  }
}
```

### Admin API Routes (Protected)

All admin routes require authentication via NextAuth.js session.

#### Analytics
```
GET    /api/admin/analytics/overview  - Dashboard statistics
```

#### Bookings Management
```
GET    /api/admin/bookings             - List all bookings (paginated)
GET    /api/admin/bookings/[id]        - Get booking details
PATCH  /api/admin/bookings/[id]        - Update booking status
DELETE /api/admin/bookings/[id]        - Cancel booking
```

Query parameters for listing bookings:
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `status` - Filter by status (PENDING, DEPOSIT_PAID, CONFIRMED, etc.)
- `search` - Search by booking ref, tour title, or customer email
- `sortBy` - Sort field (default: createdAt)
- `sortOrder` - Sort order (asc or desc, default: desc)

Example:
```
GET /api/admin/bookings?page=1&limit=20&status=PENDING&search=MAR
```

---

## 🔧 Useful Commands

### Prisma Commands

```bash
# Generate Prisma Client
npx prisma generate

# Create and apply migration
npx prisma migrate dev --name description_of_changes

# Apply migrations in production
npx prisma migrate deploy

# Open Prisma Studio (database GUI)
npx prisma studio

# Reset database (⚠️ Deletes all data!)
npx prisma migrate reset

# Seed database
npx ts-node prisma/seed.ts
```

### Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type check
npx tsc --noEmit

# Lint
npm run lint
```

---

## 🎯 Next Steps

### Immediate Tasks

1. **Change Default Admin Password**
   - Log in to admin dashboard
   - (Password change feature to be implemented)

2. **Configure Environment Variables**
   - Set up NEXTAUTH_SECRET
   - Configure production DATABASE_URL
   - Add other required environment variables

3. **Set Up Sanity.io CMS** (Optional)
   - Create Sanity project
   - Configure tour and blog schemas
   - Integrate with Next.js

4. **Set Up Email Service** (Optional)
   - Configure Resend or SendGrid
   - Implement booking confirmation emails
   - Implement payment confirmation emails

### Future Enhancements

1. **Customer Portal**
   - Allow customers to view their bookings
   - Upload documents
   - Download confirmations

2. **Online Payment Integration**
   - Stripe or PayPal integration
   - Automated payment verification

3. **Email Notifications**
   - Booking confirmations
   - Payment reminders
   - Pre-departure information

4. **Advanced Analytics**
   - Revenue reports
   - Customer demographics
   - Tour performance metrics

---

## 🐛 Troubleshooting

### Common Issues

#### Prisma Client not generating
```bash
# Delete generated folder and regenerate
rm -rf src/generated
npx prisma generate
```

#### Database connection errors
- Check DATABASE_URL in .env
- Ensure PostgreSQL is running
- Verify credentials and host

#### NextAuth errors
- Ensure NEXTAUTH_URL matches your app URL
- Generate new NEXTAUTH_SECRET if needed
- Check that admin user exists in database

#### Build errors
- Clear Next.js cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Regenerate Prisma Client: `npx prisma generate`

---

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

## 🤝 Support

For questions or issues, please check:
1. This documentation
2. The main DESIGN_SYSTEM.md file
3. Backend architecture plan at `.claude/plans/fancy-swinging-aho.md`

---

**Backend Status**: ✅ Ready for Development Use

Last Updated: 2026-01-16
