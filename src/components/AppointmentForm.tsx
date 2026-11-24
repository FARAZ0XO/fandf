import { useEffect, useState, type FormEvent } from 'react';
import { CheckCircle2, Calendar, Phone } from 'lucide-react';
import {
  BUDGET_OPTIONS,
  SERVICE_TYPES,
  TIME_SLOTS,
  createAppointmentRecord,
  validateAppointmentForm,
  type AppointmentFormData,
  type AppointmentRecord,
  type AppointmentValidationErrors,
  type ServiceType,
} from '../utils/appointment';
import { BUSINESS_INFO } from '../data/properties';

interface AppointmentFormProps {
  initialProperty?: string;
  initialBudget?: string;
  initialService?: ServiceType;
  onSuccess?: (record: AppointmentRecord) => void;
  compact?: boolean;
}

export function AppointmentForm({
  initialProperty = '',
  initialBudget = '',
  initialService = 'Buying',
  onSuccess,
  compact = false,
}: AppointmentFormProps) {
  const [formData, setFormData] = useState<AppointmentFormData>({
    fullName: '',
    phone: '',
    email: '',
    serviceType: initialService,
    budgetRange: initialBudget,
    customBudget: '',
    preferredDate: '',
    preferredTime: TIME_SLOTS[1],
    propertyInterest: initialProperty,
    notes: '',
  });

  const [errors, setErrors] = useState<AppointmentValidationErrors>({});
  const [submittedRecord, setSubmittedRecord] = useState<AppointmentRecord | null>(null);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      propertyInterest: initialProperty || prev.propertyInterest,
      budgetRange: initialBudget || prev.budgetRange,
      serviceType: initialService || prev.serviceType,
    }));
  }, [initialProperty, initialBudget, initialService]);

  const updateField = <K extends keyof AppointmentFormData>(
    key: K,
    value: AppointmentFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const validation = validateAppointmentForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const record = createAppointmentRecord(formData);
    setSubmittedRecord(record);
    setErrors({});
    onSuccess?.(record);
  };

  const handleReset = () => {
    setSubmittedRecord(null);
    setErrors({});
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      serviceType: 'Buying',
      budgetRange: '',
      customBudget: '',
      preferredDate: '',
      preferredTime: TIME_SLOTS[1],
      propertyInterest: '',
      notes: '',
    });
  };

  if (submittedRecord) {
    return (
      <div
        role="status"
        className="py-2 space-y-6"
      >
        <div className="flex items-start gap-4">
          <CheckCircle2 className="w-7 h-7 text-[#0F1D35] shrink-0 mt-0.5" strokeWidth={1.75} />
          <div className="space-y-1.5">
            <p className="text-xs font-medium tracking-wider uppercase text-[#0F1D35]/60">
              Appointment Confirmed · Ref {submittedRecord.referenceId}
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#0F1D35]">
              We look forward to welcoming you
            </h3>
            <p className="text-sm text-[#0F1D35]/75 leading-relaxed">
              Your consultation request has been logged for our Federal B Area office. Fahad Iqbal
              or an F&amp;F advisor will confirm shortly via phone.
            </p>
          </div>
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#0F1D35]/10 text-sm">
          <div>
            <dt className="text-xs text-[#0F1D35]/55">Client Name</dt>
            <dd className="font-medium text-[#0F1D35] mt-0.5">{submittedRecord.fullName}</dd>
          </div>
          <div>
            <dt className="text-xs text-[#0F1D35]/55">Contact Number</dt>
            <dd className="font-medium text-[#0F1D35] tabular-nums mt-0.5">
              {submittedRecord.phone}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-[#0F1D35]/55">Service &amp; Estimated Budget</dt>
            <dd className="font-medium text-[#0F1D35] tabular-nums mt-0.5">
              {submittedRecord.serviceType} · {submittedRecord.resolvedBudget}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-[#0F1D35]/55">Preferred Schedule</dt>
            <dd className="font-medium text-[#0F1D35] tabular-nums mt-0.5">
              {submittedRecord.preferredDate} · {submittedRecord.preferredTime}
            </dd>
          </div>
          {submittedRecord.propertyInterest && (
            <div className="sm:col-span-2">
              <dt className="text-xs text-[#0F1D35]/55">Property of Interest</dt>
              <dd className="font-medium text-[#0F1D35] mt-0.5">
                {submittedRecord.propertyInterest}
              </dd>
            </div>
          )}
        </dl>

        <div className="pt-4 border-t border-[#0F1D35]/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#0F1D35]/70 tabular-nums">
            <Phone className="w-3.5 h-3.5" />
            <span>
              Direct Line: {BUSINESS_INFO.phonePrimary} ({BUSINESS_INFO.advisorName}:{' '}
              {BUSINESS_INFO.advisorPhone})
            </span>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 text-sm font-medium border border-[#0F1D35] text-[#0F1D35] hover:bg-[#0F1D35] hover:text-[#F9F6F0] transition-colors rounded-sm cursor-pointer"
          >
            Schedule Another Appointment
          </button>
        </div>
      </div>
    );
  }

  const inputBaseClass =
    'w-full bg-[#FDFBF7] border border-[#0F1D35]/20 rounded-sm px-3.5 py-2.5 text-sm text-[#0F1D35] placeholder:text-[#0F1D35]/40 focus:outline-none focus:border-[#0F1D35] focus:ring-1 focus:ring-[#0F1D35] transition-colors';

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className={`grid grid-cols-1 ${compact ? 'sm:grid-cols-2' : 'md:grid-cols-2'} gap-4`}>
        {/* Full Name */}
        <div className="space-y-1.5">
          <label htmlFor="appt-fullName" className="block text-xs font-medium text-[#0F1D35]">
            Full Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="appt-fullName"
            name="fullName"
            type="text"
            required
            placeholder="e.g. Kamran Siddiqui"
            value={formData.fullName}
            onChange={(e) => updateField('fullName', e.target.value)}
            aria-invalid={Boolean(errors.fullName)}
            className={inputBaseClass}
          />
          {errors.fullName && (
            <p role="alert" className="text-xs text-[#9E2A2B]">
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div className="space-y-1.5">
          <label htmlFor="appt-phone" className="block text-xs font-medium text-[#0F1D35]">
            Phone / WhatsApp Number <span aria-hidden="true">*</span>
          </label>
          <input
            id="appt-phone"
            name="phone"
            type="tel"
            required
            placeholder="0333 3362140"
            value={formData.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            className={`${inputBaseClass} tabular-nums`}
          />
          {errors.phone && (
            <p role="alert" className="text-xs text-[#9E2A2B]">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Email (Optional) */}
        <div className="space-y-1.5">
          <label htmlFor="appt-email" className="block text-xs font-medium text-[#0F1D35]">
            Email Address <span className="text-[#0F1D35]/50 font-normal">(Optional)</span>
          </label>
          <input
            id="appt-email"
            name="email"
            type="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            aria-invalid={Boolean(errors.email)}
            className={inputBaseClass}
          />
          {errors.email && (
            <p role="alert" className="text-xs text-[#9E2A2B]">
              {errors.email}
            </p>
          )}
        </div>

        {/* Service Type */}
        <div className="space-y-1.5">
          <label htmlFor="appt-service" className="block text-xs font-medium text-[#0F1D35]">
            Service Needed <span aria-hidden="true">*</span>
          </label>
          <select
            id="appt-service"
            name="serviceType"
            value={formData.serviceType}
            onChange={(e) => updateField('serviceType', e.target.value as ServiceType)}
            className={inputBaseClass}
          >
            {SERVICE_TYPES.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>

        {/* Budget Range */}
        <div className="space-y-1.5">
          <label htmlFor="appt-budget" className="block text-xs font-medium text-[#0F1D35]">
            Estimated Budget (PKR) <span aria-hidden="true">*</span>
          </label>
          <select
            id="appt-budget"
            name="budgetRange"
            required
            value={formData.budgetRange}
            onChange={(e) => updateField('budgetRange', e.target.value)}
            aria-invalid={Boolean(errors.budgetRange)}
            className={`${inputBaseClass} tabular-nums`}
          >
            <option value="">Select your budget range</option>
            {BUDGET_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.budgetRange && (
            <p role="alert" className="text-xs text-[#9E2A2B]">
              {errors.budgetRange}
            </p>
          )}
        </div>

        {/* Custom Budget Input when Custom Budget is chosen */}
        {formData.budgetRange === 'Custom Budget' ? (
          <div className="space-y-1.5">
            <label htmlFor="appt-customBudget" className="block text-xs font-medium text-[#0F1D35]">
              Specify Custom Budget <span aria-hidden="true">*</span>
            </label>
            <input
              id="appt-customBudget"
              name="customBudget"
              type="text"
              placeholder="e.g. PKR 4.25 Cr or PKR 1.1 Lac/mo"
              value={formData.customBudget}
              onChange={(e) => updateField('customBudget', e.target.value)}
              aria-invalid={Boolean(errors.customBudget)}
              className={`${inputBaseClass} tabular-nums`}
            />
            {errors.customBudget && (
              <p role="alert" className="text-xs text-[#9E2A2B]">
                {errors.customBudget}
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-1.5">
            <label htmlFor="appt-property" className="block text-xs font-medium text-[#0F1D35]">
              Property / Block Preference{' '}
              <span className="text-[#0F1D35]/50 font-normal">(Optional)</span>
            </label>
            <input
              id="appt-property"
              name="propertyInterest"
              type="text"
              placeholder="e.g. Block 7, 240 Sq. Yds House"
              value={formData.propertyInterest}
              onChange={(e) => updateField('propertyInterest', e.target.value)}
              className={inputBaseClass}
            />
          </div>
        )}

        {/* Preferred Date */}
        <div className="space-y-1.5">
          <label htmlFor="appt-date" className="block text-xs font-medium text-[#0F1D35]">
            Preferred Date <span aria-hidden="true">*</span>
          </label>
          <input
            id="appt-date"
            name="preferredDate"
            type="date"
            required
            value={formData.preferredDate}
            onChange={(e) => updateField('preferredDate', e.target.value)}
            aria-invalid={Boolean(errors.preferredDate)}
            className={`${inputBaseClass} tabular-nums`}
          />
          {errors.preferredDate && (
            <p role="alert" className="text-xs text-[#9E2A2B]">
              {errors.preferredDate}
            </p>
          )}
        </div>

        {/* Preferred Time */}
        <div className="space-y-1.5">
          <label htmlFor="appt-time" className="block text-xs font-medium text-[#0F1D35]">
            Preferred Time Slot <span aria-hidden="true">*</span>
          </label>
          <select
            id="appt-time"
            name="preferredTime"
            value={formData.preferredTime}
            onChange={(e) => updateField('preferredTime', e.target.value)}
            aria-invalid={Boolean(errors.preferredTime)}
            className={`${inputBaseClass} tabular-nums`}
          >
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          {errors.preferredTime && (
            <p role="alert" className="text-xs text-[#9E2A2B]">
              {errors.preferredTime}
            </p>
          )}
        </div>
      </div>

      {formData.budgetRange === 'Custom Budget' && (
        <div className="space-y-1.5">
          <label htmlFor="appt-property-extra" className="block text-xs font-medium text-[#0F1D35]">
            Property / Block Preference{' '}
            <span className="text-[#0F1D35]/50 font-normal">(Optional)</span>
          </label>
          <input
            id="appt-property-extra"
            name="propertyInterest"
            type="text"
            placeholder="e.g. Block 7, 240 Sq. Yds House"
            value={formData.propertyInterest}
            onChange={(e) => updateField('propertyInterest', e.target.value)}
            className={inputBaseClass}
          />
        </div>
      )}

      {/* Additional Notes */}
      <div className="space-y-1.5">
        <label htmlFor="appt-notes" className="block text-xs font-medium text-[#0F1D35]">
          Requirements or Questions
        </label>
        <textarea
          id="appt-notes"
          name="notes"
          rows={3}
          placeholder="Share preferred Federal B Area block, plot size, or viewing preferences..."
          value={formData.notes}
          onChange={(e) => updateField('notes', e.target.value)}
          className={inputBaseClass}
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <p className="text-xs text-[#0F1D35]/65 tabular-nums flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 shrink-0" />
          <span>Fri hours begin at 3:00 PM · All other days 12:00 PM – 12:00 AM</span>
        </p>
        <button
          type="submit"
          className="px-6 py-3 text-sm font-medium bg-[#0F1D35] text-[#F9F6F0] hover:bg-[#172B4D] transition-colors rounded-sm whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F1D35] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9F6F0]"
        >
          Confirm Appointment
        </button>
      </div>
    </form>
  );
}
