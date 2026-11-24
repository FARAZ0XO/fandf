import { useEffect } from 'react';
import { X } from 'lucide-react';
import { AppointmentForm } from './AppointmentForm';
import type { AppointmentRecord, ServiceType } from '../utils/appointment';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProperty?: string;
  initialBudget?: string;
  initialService?: ServiceType;
  onAppointmentCreated?: (record: AppointmentRecord) => void;
}

export function AppointmentModal({
  isOpen,
  onClose,
  initialProperty,
  initialBudget,
  initialService,
  onAppointmentCreated,
}: AppointmentModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="appointment-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0F1D35]/60 backdrop-blur-[2px] overflow-y-auto"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-2xl bg-[#F9F6F0] border border-[#0F1D35]/15 rounded-sm p-6 sm:p-8 shadow-xl my-auto max-h-[92vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-4 pb-5 mb-6 border-b border-[#0F1D35]/10">
          <div className="space-y-1">
            <p className="text-xs font-medium tracking-wider uppercase text-[#0F1D35]/60">
              Private Consultation · Block 7, Federal B Area
            </p>
            <h2
              id="appointment-modal-title"
              className="font-serif text-2xl sm:text-3xl font-semibold text-[#0F1D35]"
            >
              Book an Appointment
            </h2>
          </div>
          <button
            type="button"
            aria-label="Close appointment dialog"
            onClick={onClose}
            className="inline-flex items-center justify-center w-10 h-10 text-[#0F1D35]/70 hover:text-[#0F1D35] hover:bg-[#F1ECE1] rounded-sm transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <AppointmentForm
          compact
          initialProperty={initialProperty}
          initialBudget={initialBudget}
          initialService={initialService}
          onSuccess={onAppointmentCreated}
        />
      </div>
    </div>
  );
}
