/**
 * Validation utilities for form inputs
 * Centralized validation logic for consistency across the application
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  suggestion?: string;
}

/**
 * Validates email format and provides suggestions for common typos
 */
export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return { isValid: false, error: "Email is required" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    // Check for common typos and suggest corrections
    const commonDomains = [
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "outlook.com",
      "icloud.com",
      "gmx.de",
      "web.de",
      "t-online.de",
    ];

    const emailParts = email.split("@");

    if (emailParts.length === 2) {
      const [localPart, domain] = emailParts;

      // Find similar domain
      const suggestion = commonDomains.find((d) => {
        // Simple similarity check
        if (domain.length > 0 && d.startsWith(domain[0]) && Math.abs(domain.length - d.length) <= 2) {
          return true;
        }
        return false;
      });

      if (suggestion && domain !== suggestion) {
        return {
          isValid: false,
          error: "Please enter a valid email address",
          suggestion: `${localPart}@${suggestion}`,
        };
      }
    }

    return { isValid: false, error: "Please enter a valid email address" };
  }

  return { isValid: true };
};

/**
 * Validates phone number with country code
 */
export const validatePhone = (phone: string): ValidationResult => {
  if (!phone) {
    return { isValid: false, error: "Phone number is required" };
  }

  // Remove spaces and common separators
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");

  // Check if it starts with + and has at least 10 digits
  if (!cleanPhone.startsWith("+")) {
    return {
      isValid: false,
      error: "Phone must include country code (e.g., +49)",
    };
  }

  // Check length (minimum 10 digits after +, maximum 15)
  const digits = cleanPhone.slice(1);

  if (digits.length < 10) {
    return { isValid: false, error: "Phone number is too short" };
  }

  if (digits.length > 15) {
    return { isValid: false, error: "Phone number is too long" };
  }

  // Check if all characters after + are digits
  if (!/^\d+$/.test(digits)) {
    return {
      isValid: false,
      error: "Phone number can only contain digits after country code",
    };
  }

  return { isValid: true };
};

/**
 * Validates passport number (6-9 alphanumeric characters)
 */
export const validatePassportNumber = (passportNumber: string): ValidationResult => {
  if (!passportNumber) {
    return { isValid: false, error: "Passport number is required" };
  }

  // Passport numbers are typically 6-9 characters, alphanumeric
  const cleanPassport = passportNumber.trim().toUpperCase();

  if (cleanPassport.length < 6) {
    return {
      isValid: false,
      error: "Passport number is too short (minimum 6 characters)",
    };
  }

  if (cleanPassport.length > 9) {
    return {
      isValid: false,
      error: "Passport number is too long (maximum 9 characters)",
    };
  }

  // Check if alphanumeric
  if (!/^[A-Z0-9]+$/.test(cleanPassport)) {
    return {
      isValid: false,
      error: "Passport number can only contain letters and numbers",
    };
  }

  return { isValid: true };
};

/**
 * Validates passport expiry date (must be valid for 6 months from travel date)
 */
export const validatePassportExpiry = (
  expiryDate: string,
  travelDate?: Date
): ValidationResult => {
  if (!expiryDate) {
    return { isValid: false, error: "Passport expiry date is required" };
  }

  const expiry = new Date(expiryDate);
  const today = new Date();

  // Check if passport is already expired
  if (expiry < today) {
    return { isValid: false, error: "Passport has already expired" };
  }

  // Get travel date (default to 60 days from now if not provided)
  const effectiveTravelDate = travelDate || new Date(Date.now() + 60 * 24 * 60 * 60 * 1000);

  // Check if passport expires within 6 months of travel
  const sixMonthsAfterTravel = new Date(effectiveTravelDate);
  sixMonthsAfterTravel.setMonth(sixMonthsAfterTravel.getMonth() + 6);

  if (expiry < sixMonthsAfterTravel) {
    return {
      isValid: false,
      error: "Passport must be valid for at least 6 months from travel date",
    };
  }

  return { isValid: true };
};

/**
 * Validates required text field
 */
export const validateRequired = (value: string, fieldName: string): ValidationResult => {
  if (!value || value.trim() === "") {
    return {
      isValid: false,
      error: `${fieldName} is required`,
    };
  }

  return { isValid: true };
};

/**
 * Validates date field
 */
export const validateDate = (date: string, fieldName: string): ValidationResult => {
  if (!date) {
    return {
      isValid: false,
      error: `${fieldName} is required`,
    };
  }

  const dateValue = new Date(date);

  if (isNaN(dateValue.getTime())) {
    return {
      isValid: false,
      error: `Please enter a valid ${fieldName.toLowerCase()}`,
    };
  }

  return { isValid: true };
};

/**
 * Format field name for display (converts camelCase to Title Case with spaces)
 */
export const formatFieldName = (fieldName: string): string => {
  return fieldName
    .replace(/([A-Z])/g, " $1")
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
