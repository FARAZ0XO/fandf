export type ServiceType =
  | 'Buying'
  | 'Selling'
  | 'Renting'
  | 'Residential Development';

export const SERVICE_TYPES: ServiceType[] = [
  'Buying',
  'Selling',
  'Renting',
  'Residential Development',
];

export const BUDGET_OPTIONS: string[] = [
  'PKR 1.5 Cr – 3 Cr',
  'PKR 3 Cr – 5 Cr',
  'PKR 5 Cr – 8 Cr',
  'PKR 8 Cr+',
  'Rent: PKR 75K – 1.2 Lac/mo',
  'Rent: PKR 1.2 – 2 Lac/mo',
  'Rent: PKR 2 Lac+/mo',
  'Custom Budget',
];

export const TIME_SLOTS: string[] = [
  '12:30 PM – 2:00 PM (Mon–Thu, Sat–Sun)',
  '3:30 PM – 5:30 PM',
  '6:00 PM – 8:30 PM',
  '9:00 PM – 11:30 PM',
];

export interface AppointmentFormData {
  fullName: string;
  phone: string;
  email: string;
  serviceType: ServiceType;
  budgetRange: string;
  customBudget: string;
  preferredDate: string;
  preferredTime: string;
  propertyInterest: string;
  notes: string;
}

export interface AppointmentRecord {
  referenceId: string;
  fullName: string;
  phone: string;
  email: string;
  serviceType: ServiceType;
  resolvedBudget: string;
  preferredDate: string;
  preferredTime: string;
  propertyInterest: string;
  notes: string;
  submittedAt: string;
}

export type AppointmentValidationErrors = Partial<
  Record<keyof AppointmentFormData, string>
>;

export function validatePhoneNumber(rawPhone: string): boolean {
  const digits = rawPhone.replace(/[\s\-()]/g, '');
  return /^(\+92|0)?3\d{9}$/.test(digits) || /^\+?\d{10,14}$/.test(digits);
}

export function validateAppointmentForm(
  data: AppointmentFormData
): { isValid: boolean; errors: AppointmentValidationErrors } {
  const errors: AppointmentValidationErrors = {};

  if (data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name.';
  }

  if (!data.phone.trim()) {
    errors.phone = 'Please enter a valid contact number.';
  } else if (!validatePhoneNumber(data.phone.trim())) {
    errors.phone = 'Enter a valid Pakistani mobile number (e.g. 0333 3362140 or +92 334 1360110).';
  }

  if (data.email.trim().length > 0) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
  }

  if (!data.budgetRange.trim()) {
    errors.budgetRange = 'Please select your estimated budget range.';
  }

  if (data.budgetRange === 'Custom Budget' && data.customBudget.trim().length < 2) {
    errors.customBudget = 'Please specify your custom budget (e.g. PKR 4.2 Cr).';
  }

  if (!data.preferredDate.trim()) {
    errors.preferredDate = 'Please select a preferred appointment date.';
  }

  if (!data.preferredTime.trim()) {
    errors.preferredTime = 'Please select an available time slot.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function resolveBudgetDisplay(data: Pick<AppointmentFormData, 'budgetRange' | 'customBudget'>): string {
  if (data.budgetRange === 'Custom Budget') {
    return data.customBudget.trim();
  }
  return data.budgetRange.trim();
}

export function createAppointmentRecord(
  data: AppointmentFormData,
  seedNumber?: number
): AppointmentRecord {
  const numericSuffix =
    typeof seedNumber === 'number'
      ? String(seedNumber).padStart(4, '0')
      : String(Math.floor(1000 + Math.random() * 9000));

  return {
    referenceId: `FF-${numericSuffix}`,
    fullName: data.fullName.trim(),
    phone: data.phone.trim(),
    email: data.email.trim(),
    serviceType: data.serviceType,
    resolvedBudget: resolveBudgetDisplay(data),
    preferredDate: data.preferredDate,
    preferredTime: data.preferredTime,
    propertyInterest: data.propertyInterest.trim(),
    notes: data.notes.trim(),
    submittedAt: new Date().toISOString(),
  };
}
