/**
 * Email Service using Resend
 *
 * Helper functions for sending emails
 */

import { Resend } from "resend";

// Initialize Resend (API key from environment variable)
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Generate .ics calendar file content
 */
export function generateCalendarEvent(data: {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  attendeeEmail: string;
  attendeeName: string;
}) {
  const formatDate = (date: Date) => {
    return date
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");
  };

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Marefat Pilgrimage//Consultation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@marefat-pilgrimage.com`,
    `DTSTAMP:${formatDate(new Date())}`,
    `DTSTART:${formatDate(data.startDate)}`,
    `DTEND:${formatDate(data.endDate)}`,
    `SUMMARY:${data.title}`,
    `DESCRIPTION:${data.description.replace(/\n/g, "\\n")}`,
    data.location ? `LOCATION:${data.location}` : "",
    `ATTENDEE;CN=${data.attendeeName};RSVP=TRUE:mailto:${data.attendeeEmail}`,
    `ORGANIZER;CN=Marefat Pilgrimage:mailto:info@marefat-pilgrimage.com`,
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "BEGIN:VALARM",
    "TRIGGER:-PT24H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Reminder: Consultation with Marefat Pilgrimage in 24 hours",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");

  return icsContent;
}

/**
 * Send consultation confirmation email to customer
 */
export async function sendConsultationConfirmationEmail(data: {
  to: string;
  customerName: string;
  consultationId: string;
  preferredDate: Date;
  preferredTime: string;
  timezone: string;
  consultationType: string;
  message?: string;
}) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Generate calendar event
  const startDate = new Date(data.preferredDate);
  const [hours, minutes, period] = data.preferredTime.match(/(\d+):(\d+)\s*(AM|PM)/i)?.slice(1) || [];
  if (hours && period) {
    let hour = parseInt(hours);
    if (period.toUpperCase() === "PM" && hour !== 12) hour += 12;
    if (period.toUpperCase() === "AM" && hour === 12) hour = 0;
    startDate.setHours(hour, parseInt(minutes || "0"), 0, 0);
  }

  const endDate = new Date(startDate);
  endDate.setHours(endDate.getHours() + 1); // 1 hour consultation

  const calendarEvent = generateCalendarEvent({
    title: "Consultation with Marefat Pilgrimage",
    description: `Consultation Type: ${data.consultationType}\n\nWe look forward to discussing your travel plans.\n\nReference ID: ${data.consultationId}`,
    startDate,
    endDate,
    location: "Online (Link will be shared 1 day before)",
    attendeeEmail: data.to,
    attendeeName: data.customerName,
  });

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Consultation Confirmed</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #2C2C2C; max-width: 600px; margin: 0 auto; padding: 20px;">

  <!-- Header -->
  <div style="text-align: center; padding: 30px 0; border-bottom: 2px solid #C7A56A;">
    <h1 style="color: #C7A56A; margin: 0; font-size: 28px; font-weight: 600;">Marefat Pilgrimage</h1>
    <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">Your Journey, Our Care</p>
  </div>

  <!-- Main Content -->
  <div style="padding: 40px 0;">
    <h2 style="color: #2C2C2C; font-size: 24px; margin-bottom: 20px;">Consultation Request Received</h2>

    <p style="font-size: 16px; color: #2C2C2C;">Dear ${data.customerName},</p>

    <p style="font-size: 16px; color: #2C2C2C;">Thank you for booking a consultation with Marefat Pilgrimage. We have received your request and are excited to help you plan your spiritual journey.</p>

    <!-- Details Box -->
    <div style="background-color: #F5F5F0; border-left: 4px solid #C7A56A; padding: 20px; margin: 30px 0; border-radius: 4px;">
      <h3 style="margin: 0 0 15px 0; color: #2C2C2C; font-size: 18px;">Consultation Details</h3>
      <table style="width: 100%; font-size: 15px;">
        <tr>
          <td style="padding: 8px 0; color: #666; width: 40%;"><strong>Reference ID:</strong></td>
          <td style="padding: 8px 0; color: #2C2C2C;">${data.consultationId}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;"><strong>Type:</strong></td>
          <td style="padding: 8px 0; color: #2C2C2C;">${data.consultationType.replace(/_/g, " ")}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;"><strong>Preferred Date:</strong></td>
          <td style="padding: 8px 0; color: #2C2C2C;">${formatDate(data.preferredDate)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;"><strong>Preferred Time:</strong></td>
          <td style="padding: 8px 0; color: #2C2C2C;">${data.preferredTime} (${data.timezone})</td>
        </tr>
      </table>
    </div>

    <!-- Next Steps -->
    <div style="margin: 30px 0;">
      <h3 style="color: #2C2C2C; font-size: 18px; margin-bottom: 15px;">What Happens Next?</h3>
      <ol style="color: #2C2C2C; font-size: 15px; line-height: 1.8; padding-left: 20px;">
        <li>Our team will review your preferred time and confirm availability</li>
        <li>Within 24 hours, you'll receive a confirmation email with the exact consultation time</li>
        <li>A calendar invitation will be attached for easy scheduling</li>
        <li>One day before the consultation, we'll send you the meeting link</li>
      </ol>
    </div>

    <!-- Important Note -->
    <div style="background-color: #FFF8E7; border: 1px solid #C7A56A; padding: 15px; border-radius: 4px; margin: 20px 0;">
      <p style="margin: 0; font-size: 14px; color: #2C2C2C;"><strong>📌 Important:</strong> Please keep this email for your records. If you need to reschedule or have any questions, reply to this email or contact us at <a href="mailto:info@marefat-pilgrimage.com" style="color: #C7A56A; text-decoration: none;">info@marefat-pilgrimage.com</a></p>
    </div>

    ${data.message ? `
    <div style="margin: 20px 0;">
      <h4 style="color: #2C2C2C; font-size: 16px; margin-bottom: 10px;">Your Message:</h4>
      <p style="color: #666; font-size: 15px; font-style: italic; border-left: 3px solid #C7A56A; padding-left: 15px;">${data.message}</p>
    </div>
    ` : ""}
  </div>

  <!-- Footer -->
  <div style="border-top: 1px solid #E5E5E5; padding-top: 30px; margin-top: 40px; text-align: center;">
    <p style="color: #666; font-size: 14px; margin: 10px 0;">
      Marefat Pilgrimage<br>
      <a href="mailto:info@marefat-pilgrimage.com" style="color: #C7A56A; text-decoration: none;">info@marefat-pilgrimage.com</a><br>
      <a href="https://marefat-pilgrimage.com" style="color: #C7A56A; text-decoration: none;">www.marefat-pilgrimage.com</a>
    </p>
    <p style="color: #999; font-size: 12px; margin-top: 20px;">
      This email was sent because you requested a consultation through our website.
    </p>
  </div>

</body>
</html>
  `;

  try {
    await resend.emails.send({
      from: "Marefat Pilgrimage <noreply@marefat-pilgrimage.com>",
      to: data.to,
      subject: `Consultation Request Confirmed - ${data.consultationId}`,
      html: htmlContent,
      attachments: [
        {
          filename: "consultation.ics",
          content: Buffer.from(calendarEvent).toString("base64"),
        },
      ],
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    return { success: false, error };
  }
}

/**
 * Send notification email to admin
 */
export async function sendConsultationNotificationToAdmin(data: {
  customerName: string;
  email: string;
  phone: string;
  consultationId: string;
  preferredDate: Date;
  preferredTime: string;
  timezone: string;
  consultationType: string;
  numberOfTravelers?: number;
  message?: string;
}) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Consultation Request</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #2C2C2C; max-width: 600px; margin: 0 auto; padding: 20px;">

  <!-- Header -->
  <div style="background-color: #C7A56A; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="margin: 0; font-size: 24px;">🔔 New Consultation Request</h1>
  </div>

  <!-- Main Content -->
  <div style="background-color: #F5F5F0; padding: 30px; border-radius: 0 0 8px 8px;">

    <p style="font-size: 16px; color: #2C2C2C; margin-bottom: 25px;">A new consultation request has been submitted through the website.</p>

    <!-- Customer Details -->
    <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <h2 style="color: #2C2C2C; font-size: 18px; margin: 0 0 15px 0; border-bottom: 2px solid #C7A56A; padding-bottom: 10px;">Customer Information</h2>
      <table style="width: 100%; font-size: 15px;">
        <tr>
          <td style="padding: 8px 0; color: #666; width: 40%;"><strong>Name:</strong></td>
          <td style="padding: 8px 0; color: #2C2C2C;">${data.customerName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td>
          <td style="padding: 8px 0; color: #2C2C2C;"><a href="mailto:${data.email}" style="color: #C7A56A; text-decoration: none;">${data.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;"><strong>Phone:</strong></td>
          <td style="padding: 8px 0; color: #2C2C2C;"><a href="tel:${data.phone}" style="color: #C7A56A; text-decoration: none;">${data.phone}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;"><strong>Reference ID:</strong></td>
          <td style="padding: 8px 0; color: #2C2C2C; font-family: monospace;">${data.consultationId}</td>
        </tr>
      </table>
    </div>

    <!-- Consultation Details -->
    <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <h2 style="color: #2C2C2C; font-size: 18px; margin: 0 0 15px 0; border-bottom: 2px solid #C7A56A; padding-bottom: 10px;">Consultation Details</h2>
      <table style="width: 100%; font-size: 15px;">
        <tr>
          <td style="padding: 8px 0; color: #666; width: 40%;"><strong>Type:</strong></td>
          <td style="padding: 8px 0; color: #2C2C2C;">${data.consultationType.replace(/_/g, " ")}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;"><strong>Preferred Date:</strong></td>
          <td style="padding: 8px 0; color: #2C2C2C;">${formatDate(data.preferredDate)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;"><strong>Preferred Time:</strong></td>
          <td style="padding: 8px 0; color: #2C2C2C;">${data.preferredTime} (${data.timezone})</td>
        </tr>
        ${data.numberOfTravelers ? `
        <tr>
          <td style="padding: 8px 0; color: #666;"><strong>Number of Travelers:</strong></td>
          <td style="padding: 8px 0; color: #2C2C2C;">${data.numberOfTravelers}</td>
        </tr>
        ` : ""}
      </table>
    </div>

    ${data.message ? `
    <!-- Customer Message -->
    <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <h2 style="color: #2C2C2C; font-size: 18px; margin: 0 0 15px 0; border-bottom: 2px solid #C7A56A; padding-bottom: 10px;">Customer Message</h2>
      <p style="color: #2C2C2C; font-size: 15px; line-height: 1.6; margin: 0;">${data.message}</p>
    </div>
    ` : ""}

    <!-- Action Required -->
    <div style="background-color: #FFF8E7; border-left: 4px solid #C7A56A; padding: 15px; border-radius: 4px;">
      <p style="margin: 0; font-size: 15px; color: #2C2C2C;"><strong>⚡ Action Required:</strong> Please review this request and confirm the consultation time with the customer within 24 hours.</p>
    </div>

    <!-- Admin Link -->
    <div style="text-align: center; margin-top: 30px;">
      <a href="https://marefat-pilgrimage.com/admin/consultations" style="display: inline-block; background-color: #C7A56A; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">View in Admin Panel</a>
    </div>

  </div>

</body>
</html>
  `;

  try {
    await resend.emails.send({
      from: "Marefat System <system@marefat-pilgrimage.com>",
      to: process.env.ADMIN_EMAIL || "info@marefat-pilgrimage.com",
      subject: `🔔 New Consultation Request - ${data.customerName}`,
      html: htmlContent,
      replyTo: data.email,
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending admin notification:", error);
    return { success: false, error };
  }
}
