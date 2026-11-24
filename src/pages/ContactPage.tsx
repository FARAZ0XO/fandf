import { MapPin, Phone, Clock } from 'lucide-react';
import { BUSINESS_INFO } from '../data/properties';
import { AppointmentForm } from '../components/AppointmentForm';
import type { AppointmentRecord } from '../utils/appointment';

interface ContactPageProps {
  recentAppointments: AppointmentRecord[];
  onAppointmentCreated: (record: AppointmentRecord) => void;
}

export function ContactPage({ recentAppointments, onAppointmentCreated }: ContactPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      {/* Header */}
      <div className="pb-8 border-b border-[#0F1D35]/12 space-y-2 max-w-2xl">
        <p className="text-xs font-medium tracking-wider uppercase text-[#0F1D35]/60">
          Office &amp; Appointments
        </p>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#0F1D35]">
          Visit or Schedule a Consultation
        </h1>
        <p className="text-sm sm:text-base text-[#0F1D35]/75">
          Visit our Sadaf Terrace office in Naseerabad Block 7 or reserve an appointment online
          with your preferred date, service, and budget.
        </p>
      </div>

      {/* Main Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Office Contact Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0F1D35] text-[#F9F6F0] rounded-sm p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wider text-[#F9F6F0]/60 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Office Address</span>
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-[#F9F6F0]/90">
                {BUSINESS_INFO.address}
              </p>
            </div>

            <div className="pt-5 border-t border-[#F9F6F0]/15 space-y-2.5">
              <p className="text-xs font-medium uppercase tracking-wider text-[#F9F6F0]/60 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Direct Telephone</span>
              </p>
              <div className="space-y-1.5 text-sm sm:text-base tabular-nums">
                <p>
                  <span className="text-[#F9F6F0]/65">Office Line: </span>
                  <a
                    href={BUSINESS_INFO.phonePrimaryHref}
                    className="font-medium text-[#F9F6F0] hover:underline"
                  >
                    {BUSINESS_INFO.phonePrimary}
                  </a>
                </p>
                <p>
                  <span className="text-[#F9F6F0]/65">{BUSINESS_INFO.advisorName}: </span>
                  <a
                    href={BUSINESS_INFO.advisorPhoneHref}
                    className="font-medium text-[#F9F6F0] hover:underline"
                  >
                    {BUSINESS_INFO.advisorPhone}
                  </a>
                </p>
              </div>
            </div>

            <div className="pt-5 border-t border-[#F9F6F0]/15 space-y-2">
              <p className="text-xs font-medium uppercase tracking-wider text-[#F9F6F0]/60 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Consultation Hours</span>
              </p>
              <div className="space-y-1 text-sm tabular-nums text-[#F9F6F0]/85">
                <p>{BUSINESS_INFO.hoursWeekday}</p>
                <p>{BUSINESS_INFO.hoursFriday}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#FDFBF7] border border-[#0F1D35]/12 rounded-sm p-6 space-y-2">
            <h2 className="font-serif text-xl font-semibold text-[#0F1D35]">
              Landmark Directions
            </h2>
            <p className="text-sm text-[#0F1D35]/75 leading-relaxed">
              Located on Block 7th Street inside Sadaf Terrace, directly near K.K.F General
              Hospital in Federal B Area Naseerabad Block 7, Gulberg Town, Karachi (75950).
            </p>
          </div>

          {recentAppointments.length > 0 && (
            <div className="bg-[#FDFBF7] border border-[#0F1D35]/12 rounded-sm p-6 space-y-3">
              <h2 className="font-serif text-xl font-semibold text-[#0F1D35]">
                Your Requested Appointments ({recentAppointments.length})
              </h2>
              <ul className="space-y-2.5 text-xs text-[#0F1D35]/80">
                {recentAppointments.map((item) => (
                  <li
                    key={item.referenceId}
                    className="pb-2.5 border-b border-[#0F1D35]/10 last:border-b-0 last:pb-0"
                  >
                    <p className="font-medium text-[#0F1D35] tabular-nums">
                      {item.referenceId} · {item.serviceType} · {item.resolvedBudget}
                    </p>
                    <p className="tabular-nums mt-0.5">
                      {item.preferredDate} ({item.preferredTime})
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Appointment Booking Form */}
        <div className="lg:col-span-7 bg-[#FDFBF7] border border-[#0F1D35]/12 rounded-sm p-6 sm:p-8">
          <div className="space-y-1.5 pb-6 mb-6 border-b border-[#0F1D35]/10">
            <p className="text-xs font-medium tracking-wider uppercase text-[#0F1D35]/60">
              Appointment Form
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#0F1D35]">
              Book Your Visit &amp; Budget Consultation
            </h2>
            <p className="text-sm text-[#0F1D35]/70">
              Provide your contact details, service interest, and budget range so our advisors can
              prepare tailored property options in advance.
            </p>
          </div>

          <AppointmentForm onSuccess={onAppointmentCreated} />
        </div>
      </div>
    </div>
  );
}
