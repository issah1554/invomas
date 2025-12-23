// utils/validators.ts
export const isRequired = (value: string) => value.trim() !== '';

export const isEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const minLength = (value: string, length: number) => value.length >= length;
export const maxLength = (value: string, length: number) => value.length <= length;

export const isNumeric = (value: string) => /^\d+$/.test(value);
export const inRange = (value: number, min: number, max: number) =>
    value >= min && value <= max;

export const isStrongPassword = (value: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);

export const isURL = (value: string) =>
    /^(https?:\/\/)?([\w-]+)+([\w.-]*)+[\w-]+(\.[a-z]{2,})+([\/?].*)?$/.test(value);

export const isPhoneNumber = (value: string) =>
    /^\+?\d{10,15}$/.test(value);

export const matchesPattern = (value: string, pattern: RegExp) =>
    pattern.test(value);

export const isChecked = (value: boolean) => value === true;

export const isValidDate = (value: string) => !isNaN(Date.parse(value));

// Example: combining utilities for business rules
export const validateRegistration = (data: { email: string; password: string }) => {
    if (!isRequired(data.email)) return "Email is required";
    if (!isEmail(data.email)) return "Email is invalid";
    if (!isStrongPassword(data.password)) return "Password is weak";
    return null;
};
