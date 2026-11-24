import { BUSINESS_INFO } from '../data/properties';
import type { PageId } from './Navbar';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onBookAppointment: () => void;
}

export function Footer({ onNavigate, onBookAppointment }: FooterProps) {
  return (
    <footer className="bg-[#0F1D35] text-[#F9F6F0] border-t border-[#F9F6F0]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          <div className="md:col-span-5 space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-[#F9F6F0]">
              {BUSINESS_INFO.name}
            </h2>
            <p className="text-sm leading-relaxed text-[#F9F6F0]/75 max-w-md">
              Trusted residential property advisory, buying, selling, renting, and turnkey home
              development serving families across Federal B Area, Gulberg Town, Karachi.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onBookAppointment}
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium bg-[#F9F6F0] text-[#0F1D35] hover:bg-[#F1ECE1] transition-colors rounded-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F9F6F0]"
              >
                Schedule an Office Visit
              </button>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-[#F9F6F0]/55 font-sans">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              {(
                [
                  ['home', 'Home'],
                  ['listings', 'Property Listings'],
                  ['about', 'About Us'],
                  ['testimonials', 'Client Testimonials'],
                  ['contact', 'Contact & Appointments'],
                ] as [PageId, string][]
              ).map(([id, label]) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(id)}
                    className="text-[#F9F6F0]/80 hover:text-[#F9F6F0] transition-colors cursor-pointer"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3 text-sm text-[#F9F6F0]/80">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-[#F9F6F0]/55 font-sans">
              Office &amp; Hours
            </h3>
            <p className="leading-relaxed">{BUSINESS_INFO.address}</p>
            <div className="space-y-1 tabular-nums pt-1">
              <p>
                Office:{' '}
                <a
                  href={BUSINESS_INFO.phonePrimaryHref}
                  className="text-[#F9F6F0] hover:underline"
                >
                  {BUSINESS_INFO.phonePrimary}
                </a>
              </p>
              <p>
                {BUSINESS_INFO.advisorName}:{' '}
                <a
                  href={BUSINESS_INFO.advisorPhoneHref}
                  className="text-[#F9F6F0] hover:underline"
                >
                  {BUSINESS_INFO.advisorPhone}
                </a>
              </p>
            </div>
            <div className="space-y-1 tabular-nums pt-1 text-[#F9F6F0]/70">
              <p>{BUSINESS_INFO.hoursWeekday}</p>
              <p>{BUSINESS_INFO.hoursFriday}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#F9F6F0]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#F9F6F0]/60">
          <p>&copy; {new Date().getFullYear()} F&amp;F Real Estate. Federal B Area, Karachi.</p>
          <p className="tabular-nums">5.0 / 5 Client Rating · Sadaf Terrace, Block 7</p>
        </div>
      </div>
    </footer>
  );
}
