import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export type PageId = 'home' | 'listings' | 'about' | 'testimonials' | 'contact';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onBookAppointment: () => void;
}

const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'listings', label: 'Listings' },
  { id: 'about', label: 'About Us' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar({ currentPage, onNavigate, onBookAppointment }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F9F6F0]/95 backdrop-blur-sm border-b border-[#0F1D35]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-[#0F1D35] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F1D35] rounded-sm cursor-pointer"
        >
          F&amp;F Real Estate
        </button>

        {/* Zone 2: 5 concise single-line text nav links */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-current={isActive ? 'page' : undefined}
                onClick={() => handleNavClick(item.id)}
                className={`relative py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F1D35] rounded-sm ${
                  isActive
                    ? 'text-[#0F1D35]'
                    : 'text-[#0F1D35]/65 hover:text-[#0F1D35]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 bottom-0 h-[1.5px] bg-[#0F1D35] transition-opacity duration-150 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onBookAppointment}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium bg-[#0F1D35] text-[#F9F6F0] hover:bg-[#172B4D] transition-colors duration-150 whitespace-nowrap shrink-0 rounded-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F1D35] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9F6F0]"
          >
            Book Appointment
          </button>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 text-[#0F1D35] hover:bg-[#F1ECE1] rounded-sm transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F1D35]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#0F1D35]/10 bg-[#F9F6F0] px-4 py-4">
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-3 py-3 text-base font-medium rounded-sm transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#0F1D35] text-[#F9F6F0]'
                      : 'text-[#0F1D35] hover:bg-[#F1ECE1]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <div className="pt-3 border-t border-[#0F1D35]/10 mt-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookAppointment();
                }}
                className="w-full py-3 px-4 text-sm font-medium bg-[#0F1D35] text-[#F9F6F0] hover:bg-[#172B4D] rounded-sm transition-colors cursor-pointer"
              >
                Book Appointment
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
