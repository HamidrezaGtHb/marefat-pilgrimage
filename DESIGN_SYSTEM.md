# Design System - Marefat Pilgrimage

This document outlines the design system components and utilities used throughout the Marefat Pilgrimage website. All UI components follow consistent styling, validation, and interaction patterns.

## Core Principles

1. **Consistency**: All components use the same design tokens (colors, spacing, typography)
2. **Reusability**: Components are built to be used across the entire application
3. **Accessibility**: All components follow WCAG guidelines
4. **Type Safety**: Full TypeScript support with proper prop types
5. **Validation**: Centralized validation logic for forms

## Color Palette

```
Primary Colors:
- charcoal: Main text and primary actions
- ivory: Background and light surfaces
- gold: Accent color for highlights and CTAs
- gold-dark: Darker shade for hover states
- gold-soft: Lighter shade for backgrounds

Semantic Colors:
- red-500/red-600: Error states
- gold/gold-dark: Success and suggestions
```

## Components

### 1. FloatingWhatsApp

Modern floating action button for WhatsApp contact.

**Location**: `src/components/ui/FloatingWhatsApp.tsx`

**Usage**:

```tsx
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";

<FloatingWhatsApp
  phoneNumber="4901234567890"
  message="Hello! I'm interested in your tours."
  position="right"
  showTooltip={true}
  tooltipText="Chat with us!"
/>
```

**Props**:
```typescript
{
  phoneNumber: string;           // WhatsApp number with country code (no + or spaces)
  message?: string;              // Pre-filled message (default: greeting)
  position?: "left" | "right";   // Position on screen (default: "right")
  showTooltip?: boolean;         // Show hover tooltip (default: true)
  tooltipText?: string;          // Tooltip text (default: "Chat with us")
}
```

**Features**:
- ✅ Sticky position (always visible)
- ✅ Smooth animations (pulse, hover, scroll)
- ✅ Responsive sizing (smaller on scroll)
- ✅ Green badge indicator (online status)
- ✅ Accessible (ARIA labels, keyboard support)
- ✅ Mobile optimized (proper spacing from bottom nav)
- ✅ Opens WhatsApp in new tab with pre-filled message

**Design Details**:
- Color: WhatsApp Green (#25D366)
- Size: 70px × 70px (desktop), 60px × 60px (mobile)
- Shadow: Soft glow with brand color
- Animation: Gentle pulse + hover scale
- Position: 32px from bottom, 32px from side

**Behavior**:
1. Appears after 1 second (smooth fade in)
2. Smaller size when user scrolls down
3. Tooltip shows on hover (desktop only)
4. Click opens WhatsApp Web/App with pre-filled message
5. Green online badge with pulse animation

---

### 2. FormField

Smart form input with built-in validation and suggestions.

**Location**: `src/components/forms/FormField.tsx`

**Usage**:

```tsx
import { FormField } from "@/components/forms/FormField";

<FormField
  label="Email"
  fieldType="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={errors.email}
  required
/>
```

**Field Types**:
- `text`: Standard text input
- `email`: Email with validation and domain suggestions
- `tel`: Phone number with country code validation
- `date`: Date picker
- `passport`: Passport number (6-9 alphanumeric, auto-uppercase)
- `passportExpiry`: Passport expiry with 6-month validation

**Props**:
```typescript
{
  label: string;
  fieldType?: FieldType;
  error?: string;
  helperText?: string;
  onValidate?: (value: string) => ValidationResult;
  travelDate?: Date;
  required?: boolean;
  // ... all standard input props
}
```

**Features**:
- ✅ Auto-validation on blur
- ✅ Email domain suggestions (gmail.con → gmail.com)
- ✅ Phone number format validation (+XX format)
- ✅ Passport number auto-uppercase
- ✅ Error display with red border
- ✅ Helper text support
- ✅ Mobile-optimized keyboard (tel, email types)

---

### 2. Input

Base input component (used internally by FormField).

**Location**: `src/components/ui/Input.tsx`

**Usage**:

```tsx
import { Input } from "@/components/ui/Input";

<Input
  label="Username"
  error="Username is required"
  helperText="Choose a unique username"
  suggestion="user@gmail.com"
  onSuggestionClick={() => handleSuggestion()}
/>
```

**Props**:
```typescript
{
  label?: string;
  error?: string;
  helperText?: string;
  suggestion?: string;
  onSuggestionClick?: () => void;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  required?: boolean;
}
```

---

### 3. Button

Flexible button component with multiple variants and states.

**Location**: `src/components/ui/Button.tsx`

**Usage**:

```tsx
import { Button } from "@/components/ui/Button";

<Button
  variant="primary"
  size="lg"
  isLoading={loading}
  onClick={handleSubmit}
>
  Submit
</Button>
```

**Variants**:
- `primary`: Dark background (charcoal) with light text
- `secondary`: Gold background for accents
- `outline`: Transparent with border
- `ghost`: Transparent without border

**Sizes**:
- `xs`: Extra small (px-3 py-1.5 text-xs)
- `sm`: Small (px-4 py-2 text-xs)
- `md`: Medium (px-6 py-2.5 text-sm) - default
- `lg`: Large (px-8 py-3 text-base)

**Props**:
```typescript
{
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "xs" | "sm" | "md" | "lg";
  fullWidth?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
}
```

**Features**:
- ✅ Loading spinner state
- ✅ Disabled state styling
- ✅ Smooth transitions
- ✅ Focus ring for accessibility

---

## Validation Utilities

**Location**: `src/utils/validation.ts`

All validation functions return a `ValidationResult`:

```typescript
interface ValidationResult {
  isValid: boolean;
  error?: string;
  suggestion?: string;
}
```

### Available Validators

#### 1. validateEmail(email: string)
```typescript
const result = validateEmail("user@gmial.com");
// { isValid: false, error: "Please enter a valid email", suggestion: "user@gmail.com" }
```

**Features**:
- Email format validation
- Domain typo suggestions
- Common domains: gmail, yahoo, hotmail, outlook, icloud, gmx, web, t-online

---

#### 2. validatePhone(phone: string)
```typescript
const result = validatePhone("+49123456789");
// { isValid: true }

const result = validatePhone("123456789");
// { isValid: false, error: "Phone must include country code (e.g., +49)" }
```

**Validation Rules**:
- Must start with `+`
- 10-15 digits after country code
- Only digits allowed after `+`

---

#### 3. validatePassportNumber(passportNumber: string)
```typescript
const result = validatePassportNumber("AB123456");
// { isValid: true }
```

**Validation Rules**:
- 6-9 characters
- Alphanumeric only (A-Z, 0-9)
- Auto-converts to uppercase

---

#### 4. validatePassportExpiry(expiryDate: string, travelDate?: Date)
```typescript
const result = validatePassportExpiry("2025-03-15");
// { isValid: false, error: "Passport must be valid for at least 6 months from travel date" }
```

**Validation Rules**:
- Not expired
- Valid for 6+ months from travel date
- If no travel date provided, assumes 60 days from now

---

#### 5. validateRequired(value: string, fieldName: string)
```typescript
const result = validateRequired("", "First Name");
// { isValid: false, error: "First Name is required" }
```

---

#### 6. validateDate(date: string, fieldName: string)
```typescript
const result = validateDate("2024-01-15", "Date of Birth");
// { isValid: true }
```

---

#### 7. formatFieldName(fieldName: string)
```typescript
formatFieldName("firstName");
// "First Name"

formatFieldName("passportExpiry");
// "Passport Expiry"
```

---

## Typography

```
Font Families:
- font-display: Used for headings (DM Serif Display or similar)
- font-sans: Used for body text (Inter or similar)

Font Sizes:
- text-xs: 0.75rem
- text-sm: 0.875rem
- text-base: 1rem
- text-lg: 1.125rem
- text-xl: 1.25rem
- text-2xl: 1.5rem
- text-3xl: 1.875rem
```

---

## Spacing

```
Padding/Margin:
- p-1: 0.25rem
- p-2: 0.5rem
- p-3: 0.75rem
- p-4: 1rem
- p-5: 1.25rem
- p-6: 1.5rem
- p-8: 2rem
- p-12: 3rem

Gap:
- gap-2: 0.5rem
- gap-3: 0.75rem
- gap-4: 1rem
- gap-6: 1.5rem
- gap-8: 2rem
```

---

## Border Radius

```
- rounded-lg: 0.5rem
- rounded-xl: 0.75rem
- rounded-2xl: 1rem
- rounded-full: 9999px (circular)
```

---

## Shadows

```
- shadow-sm: Small shadow
- shadow-soft: Medium soft shadow
- shadow-md: Medium shadow
```

---

## Usage Examples

### Complete Form Example

```tsx
import { FormField } from "@/components/forms/FormField";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

function BookingForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    passportNumber: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation happens automatically in FormField
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField
        label="First Name"
        fieldType="text"
        value={formData.firstName}
        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
        error={errors.firstName}
        required
      />

      <FormField
        label="Email"
        fieldType="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={errors.email}
        required
      />

      <FormField
        label="Phone"
        fieldType="tel"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        error={errors.phone}
        placeholder="+49 123 456 789"
        required
      />

      <FormField
        label="Passport Number"
        fieldType="passport"
        value={formData.passportNumber}
        onChange={(e) => setFormData({ ...formData, passportNumber: e.target.value })}
        error={errors.passportNumber}
        required
      />

      <div className="flex gap-3">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit" variant="primary" size="lg">
          Submit
        </Button>
      </div>
    </form>
  );
}
```

---

### Button Variations

```tsx
// Primary action
<Button variant="primary" size="lg">
  Book Now
</Button>

// Secondary action
<Button variant="secondary">
  Learn More
</Button>

// Outlined button
<Button variant="outline">
  Cancel
</Button>

// Ghost button (for subtle actions)
<Button variant="ghost" size="xs">
  Edit
</Button>

// Loading state
<Button variant="primary" isLoading={isSubmitting}>
  {isSubmitting ? "Processing..." : "Submit"}
</Button>

// Disabled
<Button variant="primary" disabled>
  Not Available
</Button>

// Full width
<Button variant="primary" fullWidth>
  Continue
</Button>
```

---

## Best Practices

### 1. Always Use Components
❌ **Don't** create custom inputs:
```tsx
<input className="w-full rounded border px-3 py-2..." />
```

✅ **Do** use FormField:
```tsx
<FormField label="Email" fieldType="email" ... />
```

---

### 2. Leverage Built-in Validation
❌ **Don't** write custom validation:
```tsx
if (!email.includes("@")) {
  setError("Invalid email");
}
```

✅ **Do** use validation utilities:
```tsx
const result = validateEmail(email);
if (!result.isValid) {
  setError(result.error);
}
```

---

### 3. Use Semantic Field Types
❌ **Don't** use generic text type for everything:
```tsx
<FormField fieldType="text" label="Email" />
```

✅ **Do** use specific field types:
```tsx
<FormField fieldType="email" label="Email" />
<FormField fieldType="tel" label="Phone" />
<FormField fieldType="passport" label="Passport" />
```

---

### 4. Consistent Button Usage
❌ **Don't** create custom button styles:
```tsx
<button className="bg-gold px-8 py-3...">Submit</button>
```

✅ **Do** use Button component:
```tsx
<Button variant="secondary" size="lg">Submit</Button>
```

---

## Adding New Components

When adding new components to the design system:

1. **Create in appropriate directory**:
   - UI components: `src/components/ui/`
   - Form components: `src/components/forms/`
   - Layout components: `src/components/layout/`

2. **Follow naming conventions**:
   - PascalCase for component files
   - Descriptive, single-purpose names

3. **Include TypeScript types**:
   ```tsx
   export interface ComponentNameProps {
     // Props definition
   }
   ```

4. **Use design tokens**:
   - Use existing Tailwind classes
   - Reference colors: `text-charcoal`, `bg-ivory`, `border-gold`
   - Reference spacing: `p-4`, `gap-3`, `mt-6`

5. **Add to this documentation**

---

## Migration Guide

To migrate existing code to use the design system:

1. **Replace form inputs**:
   ```tsx
   // Before
   <input type="email" ... />

   // After
   <FormField fieldType="email" ... />
   ```

2. **Replace buttons**:
   ```tsx
   // Before
   <button className="...">Click</button>

   // After
   <Button variant="primary">Click</Button>
   ```

3. **Import validation**:
   ```tsx
   import { validateEmail, validatePhone } from "@/utils/validation";
   ```

4. **Remove custom validation logic**: Use built-in validators

---

## Maintenance

- Update design tokens in `tailwind.config.js`
- All component updates should maintain backward compatibility
- Test changes across all pages before deploying
- Document any breaking changes

---

For questions or suggestions, please contact the development team.
