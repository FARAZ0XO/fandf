import { useEffect, useState } from 'react';
import { Navbar, type PageId } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ListingsPage } from './pages/ListingsPage';
import { AboutPage } from './pages/AboutPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { ContactPage } from './pages/ContactPage';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { AppointmentModal } from './components/AppointmentModal';
import { suggestBudgetForProperty, type Property } from './utils/listings';
import type { AppointmentRecord, ServiceType } from './utils/appointment';

const VALID_PAGES: PageId[] = ['home', 'listings', 'about', 'testimonials', 'contact'];

function getInitialPageFromHash(): PageId {
  if (typeof window === 'undefined') return 'home';
  const raw = window.location.hash.replace(/^#\/?/, '').toLowerCase() as PageId;
  return VALID_PAGES.includes(raw) ? raw : 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPageFromHash);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [appointmentPrefill, setAppointmentPrefill] = useState<{
    property?: string;
    budget?: string;
    service?: ServiceType;
  }>({});
  const [recentAppointments, setRecentAppointments] = useState<AppointmentRecord[]>([]);

  useEffect(() => {
    const onHashChange = () => {
      setCurrentPage(getInitialPageFromHash());
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo(0, 0);
  };

  const handleOpenGeneralAppointment = () => {
    setAppointmentPrefill({});
    setAppointmentModalOpen(true);
  };

  const handleScheduleViewing = (property: Property) => {
    const service: ServiceType =
      property.transactionType === 'rent'
        ? 'Renting'
        : property.transactionType === 'development'
          ? 'Residential Development'
          : 'Buying';

    setSelectedProperty(null);
    setAppointmentPrefill({
      property: `${property.title} (${property.block})`,
      budget: suggestBudgetForProperty(property),
      service,
    });
    setAppointmentModalOpen(true);
  };

  const handleAppointmentCreated = (record: AppointmentRecord) => {
    setRecentAppointments((prev) => [record, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F6F0] text-[#0F1D35]">
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onBookAppointment={handleOpenGeneralAppointment}
      />

      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectProperty={setSelectedProperty}
            onOpenAppointment={handleOpenGeneralAppointment}
            onAppointmentCreated={handleAppointmentCreated}
          />
        )}

        {currentPage === 'listings' && (
          <ListingsPage
            onSelectProperty={setSelectedProperty}
            onOpenAppointment={handleOpenGeneralAppointment}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenAppointment={handleOpenGeneralAppointment}
          />
        )}

        {currentPage === 'testimonials' && (
          <TestimonialsPage onOpenAppointment={handleOpenGeneralAppointment} />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            recentAppointments={recentAppointments}
            onAppointmentCreated={handleAppointmentCreated}
          />
        )}
      </main>

      <Footer
        onNavigate={handleNavigate}
        onBookAppointment={handleOpenGeneralAppointment}
      />

      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onScheduleViewing={handleScheduleViewing}
      />

      <AppointmentModal
        isOpen={appointmentModalOpen}
        onClose={() => setAppointmentModalOpen(false)}
        initialProperty={appointmentPrefill.property}
        initialBudget={appointmentPrefill.budget}
        initialService={appointmentPrefill.service}
        onAppointmentCreated={handleAppointmentCreated}
      />
    </div>
  );
}
