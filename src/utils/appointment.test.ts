import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createAppointmentRecord,
  validateAppointmentForm,
  validatePhoneNumber,
  type AppointmentFormData,
} from './appointment';

const VALID_DATA: AppointmentFormData = {
  fullName: 'Tariq Mahmood',
  phone: '0333 3362140',
  email: 'tariq@example.com',
  serviceType: 'Buying',
  budgetRange: 'PKR 3 Cr – 5 Cr',
  customBudget: '',
  preferredDate: '2026-12-01',
  preferredTime: '3:30 PM – 5:30 PM',
  propertyInterest: '240 Sq. Yds Newly Built Residence',
  notes: 'Looking in Block 7 or Block 14.',
};

test('validatePhoneNumber accepts Pakistani mobile formats and rejects malformed input', () => {
  assert.equal(validatePhoneNumber('0333 3362140'), true);
  assert.equal(validatePhoneNumber('+92 334 1360110'), true);
  assert.equal(validatePhoneNumber('123'), false);
});

test('validateAppointmentForm catches missing required fields including budget', () => {
  const result = validateAppointmentForm({
    ...VALID_DATA,
    fullName: '',
    phone: '',
    budgetRange: '',
    preferredDate: '',
  });
  assert.equal(result.isValid, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.phone);
  assert.ok(result.errors.budgetRange);
  assert.ok(result.errors.preferredDate);
});

test('validateAppointmentForm enforces customBudget when Custom Budget is selected', () => {
  const missingCustom = validateAppointmentForm({
    ...VALID_DATA,
    budgetRange: 'Custom Budget',
    customBudget: '',
  });
  assert.equal(missingCustom.isValid, false);
  assert.ok(missingCustom.errors.customBudget);

  const validCustom = validateAppointmentForm({
    ...VALID_DATA,
    budgetRange: 'Custom Budget',
    customBudget: 'PKR 4.25 Cr',
  });
  assert.equal(validCustom.isValid, true);
});

test('createAppointmentRecord formats booking confirmation with resolved budget', () => {
  const record = createAppointmentRecord(
    {
      ...VALID_DATA,
      budgetRange: 'Custom Budget',
      customBudget: 'PKR 6.5 Cr',
    },
    42
  );
  assert.equal(record.referenceId, 'FF-0042');
  assert.equal(record.resolvedBudget, 'PKR 6.5 Cr');
  assert.equal(record.fullName, 'Tariq Mahmood');
});
