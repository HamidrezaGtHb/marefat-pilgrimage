# راهنمای تنظیم سیستم ایمیل اتوماتیک

## نصب کامل شد ✅

سیستم ایمیل اتوماتیک برای Consultation Booking پیاده‌سازی شده است.

## مراحل تنظیم Resend

### 1. ساخت حساب Resend

1. به [resend.com](https://resend.com) بروید
2. حساب کاربری بسازید (رایگان تا 100 ایمیل در روز)
3. ایمیل خود را تأیید کنید

### 2. دریافت API Key

1. وارد Dashboard شوید
2. به بخش **API Keys** بروید
3. روی **Create API Key** کلیک کنید
4. نام: `Marefat Pilgrimage`
5. Permission: **Full Access**
6. کلید را کپی کنید

### 3. اضافه کردن API Key به پروژه

فایل `.env` را باز کنید و مقدار `RESEND_API_KEY` را با کلید دریافتی جایگزین کنید:

```env
RESEND_API_KEY="re_123456789_YourActualKeyHere"
ADMIN_EMAIL="info@marefat-pilgrimage.com"
```

### 4. تنظیم Domain (اختیاری - برای Production)

**برای Development:**
- از آدرس ایمیل پیش‌فرض Resend استفاده می‌شود
- ایمیل‌ها فقط به آدرس‌های تأیید شده ارسال می‌شوند

**برای Production:**
1. دامنه خود را در Resend تأیید کنید
2. رکوردهای DNS را اضافه کنید
3. در فایل `src/lib/email.ts` آدرس `from` را تغییر دهید:
```typescript
from: "Marefat Pilgrimage <noreply@your-domain.com>"
```

### 5. تست ایمیل

1. سرور را Restart کنید:
```bash
npm run dev
```

2. به صفحه Consultation بروید:
```
http://localhost:3000/consultation
```

3. فرم را پر کنید و ارسال کنید

4. چک کنید:
   - ✉️ ایمیل تأییدیه به مشتری ارسال شود (با فایل calendar.ics)
   - ✉️ ایمیل اطلاع‌رسانی به ادمین ارسال شود

---

## محتوای ایمیل‌ها

### 1. ایمیل تأییدیه به مشتری

**موضوع:** `Consultation Request Confirmed - {ID}`

**محتوا:**
- اطلاعات consultation (تاریخ، ساعت، نوع)
- شماره Reference برای پیگیری
- مراحل بعدی
- نکات مهم
- پیام مشتری (اگر وارد کرده باشد)

**ضمیمه:**
- فایل `consultation.ics` برای اضافه کردن به تقویم

### 2. ایمیل به ادمین

**موضوع:** `🔔 New Consultation Request - {نام مشتری}`

**محتوا:**
- اطلاعات کامل مشتری (نام، ایمیل، تلفن)
- جزئیات consultation
- پیام مشتری
- لینک به Admin Panel

---

## تنظیمات اضافی (اختیاری)

### 1. تغییر ایمیل ادمین

در فایل `.env`:
```env
ADMIN_EMAIL="your-admin-email@domain.com"
```

### 2. تنظیم چندین ایمیل ادمین

فایل `src/lib/email.ts` را ویرایش کنید:
```typescript
to: ["admin1@domain.com", "admin2@domain.com"]
```

### 3. افزودن CC/BCC

در تابع `sendConsultationNotificationToAdmin`:
```typescript
await resend.emails.send({
  from: "...",
  to: process.env.ADMIN_EMAIL,
  cc: ["manager@domain.com"],
  bcc: ["archive@domain.com"],
  // ...
});
```

---

## عیب‌یابی

### ایمیل ارسال نمی‌شود

1. **چک کنید API Key صحیح است:**
```bash
echo $RESEND_API_KEY
```

2. **چک کنید سرور Restart شده:**
```bash
# Ctrl+C to stop
npm run dev
```

3. **چک کنید لاگ‌های Console:**
```
Error sending confirmation email: ...
Error sending admin notification: ...
```

### ایمیل به Spam می‌رود

- در Development: طبیعی است
- در Production: باید دامنه خود را verify کنید و SPF/DKIM/DMARC تنظیم کنید

### فایل Calendar کار نمی‌کند

- مطمئن شوید تاریخ و ساعت صحیح است
- Timezone را چک کنید
- فرمت .ics را با ابزارهای آنلاین تست کنید

---

## API Keys امن نگه دارید

⚠️ **هرگز API Keys را commit نکنید!**

- فایل `.env` در `.gitignore` است ✅
- برای Production از Environment Variables سرور استفاده کنید

---

## مراجع

- [Resend Documentation](https://resend.com/docs)
- [React Email Components](https://react.email/docs/introduction)
- [Calendar .ics Format](https://icalendar.org/)

---

## آینده (TODO)

### Google Calendar Integration

برای اتوماتیک ساختن کامل:
1. Google Calendar API را فعال کنید
2. Service Account بسازید
3. در `src/lib/email.ts` تابع `createGoogleCalendarEvent` اضافه کنید
4. Event را در Calendar ادمین ایجاد کنید
5. لینک Meet/Zoom اتوماتیک بفرستید

### SMS Notification (اختیاری)

برای اطلاع‌رسانی سریع‌تر:
- از Twilio یا Kavenegar استفاده کنید
- SMS تأییدیه به مشتری
- SMS یادآوری 24 ساعت قبل

---

**✅ سیستم آماده است! فقط API Key را تنظیم کنید و تست کنید.**
