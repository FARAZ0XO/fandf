import { ArrowRight, Star } from 'lucide-react';
import { BUSINESS_INFO, HERO_IMAGE, PROPERTIES, VERIFIED_REVIEWS } from '../data/properties';
import type { Property } from '../utils/listings';
import type { PageId } from '../components/Navbar';
import { SafeImage } from '../components/SafeImage';
import { PropertyCard } from '../components/PropertyCard';
import { AppointmentForm } from '../components/AppointmentForm';
import type { AppointmentRecord } from '../utils/appointment';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onSelectProperty: (property: Property) => void;
  onOpenAppointment: () => void;
  onAppointmentCreated: (record: AppointmentRecord) => void;
}

const SERVICES = [
  {
    number: '01.',
    title: 'Buying & Acquisition',
    description:
      'Guided home searches across Blocks 6 through 16 of Federal B Area with full title, lease, and street-level due diligence.',
  },
  {
    number: '02.',
    title: 'Property Sales & Valuation',
    description:
      'Realistic market pricing, qualified family buyer screenings, and transparent transfer coordination from offer to registration.',
  },
  {
    number: '03.',
    title: 'Residential Rentals',
    description:
      'Verified independent houses, upper and ground portions, and boutique apartments matched to reliable tenants and landlords.',
  },
  {
    number: '04.',
    title: 'Residential Home Development',
    description:
      'End-to-end residential construction in Federal B Area delivering modern elevations, durable engineering, and turnkey handover.',
  },
];

export function HomePage({
  onNavigate,
  onSelectProperty,
  onOpenAppointment,
  onAppointmentCreated,
}: HomePageProps) {
  const featuredProperties = PROPERTIES.filter((p) => p.featured).slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 lg:pt-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-between gap-8 py-2">
            <div className="space-y-5">
              <p className="text-xs font-medium tracking-wider uppercase text-[#0F1D35]/65">
                Federal B Area Naseerabad Block 7 · Karachi
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold leading-[1.08] tracking-tight text-[#0F1D35]">
                Quiet Confidence in Karachi Residential Real Estate
              </h1>
              <p className="text-base sm:text-lg text-[#0F1D35]/75 leading-relaxed max-w-xl">
                F&amp;F Real Estate advises families on buying, selling, renting, and building
                lasting homes across Federal B Area with verified documentation and straightforward
                counsel.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('listings')}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-medium bg-[#0F1D35] text-[#F9F6F0] hover:bg-[#172B4D] transition-colors rounded-sm whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F1D35] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9F6F0]"
              >
                <span>Explore Listings</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenAppointment}
                className="text-sm font-medium text-[#0F1D35] underline underline-offset-4 decoration-[#0F1D35]/40 hover:decoration-[#0F1D35] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Schedule Consultation
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="h-full min-h-[280px] sm:min-h-[380px] lg:min-h-[440px] rounded-sm overflow-hidden border border-[#0F1D35]/10 bg-[#F1ECE1]">
              <SafeImage
                src={HERO_IMAGE}
                alt="Minimalist limestone and navy residential home represented by F&F Real Estate"
                fallbackTitle="F&F Real Estate Residences"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Full-Width Key Facts Strip */}
        <div className="mt-12 lg:mt-16 border-y border-[#0F1D35]/12 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div>
            <p className="text-xs text-[#0F1D35]/60">Client Rating</p>
            <p className="text-lg sm:text-xl font-semibold text-[#0F1D35] tabular-nums mt-1 flex items-center gap-1.5">
              <span>5.0 / 5.0</span>
              <Star className="w-4 h-4 fill-[#9A7B3E] text-[#9A7B3E]" aria-hidden="true" />
            </p>
          </div>
          <div>
            <p className="text-xs text-[#0F1D35]/60">Office Location</p>
            <p className="text-lg sm:text-xl font-semibold text-[#0F1D35] mt-1">
              Sadaf Terrace, Block 7
            </p>
          </div>
          <div>
            <p className="text-xs text-[#0F1D35]/60">Direct Advisor</p>
            <p className="text-lg sm:text-xl font-semibold text-[#0F1D35] tabular-nums mt-1">
              {BUSINESS_INFO.advisorName} · {BUSINESS_INFO.advisorPhone}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#0F1D35]/60">Evening Consultation</p>
            <p className="text-lg sm:text-xl font-semibold text-[#0F1D35] tabular-nums mt-1">
              Open Daily Until 12:00 AM
            </p>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[#0F1D35]/12">
          <div className="space-y-1.5">
            <p className="text-xs font-medium tracking-wider uppercase text-[#0F1D35]/60">
              Curated Portfolio
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#0F1D35]">
              Featured Federal B Area Residences
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('listings')}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#0F1D35] hover:opacity-75 transition-opacity whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>View All {PROPERTIES.length} Properties</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onSelect={onSelectProperty}
            />
          ))}
        </div>
      </section>

      {/* Services Band (Deep Navy) */}
      <section className="bg-[#0F1D35] text-[#F9F6F0] py-16 lg:py-20 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-[#F9F6F0]/15">
            <div className="lg:col-span-5 space-y-2">
              <p className="text-xs font-medium tracking-wider uppercase text-[#F9F6F0]/60">
                Practice Areas
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#F9F6F0]">
                Four Pillars of Residential Advisory
              </h2>
            </div>
            <div className="lg:col-span-7 flex items-end">
              <p className="text-sm sm:text-base text-[#F9F6F0]/75 leading-relaxed max-w-2xl">
                Whether acquiring a family bungalow, listing a home in Block 7, leasing a portion,
                or developing a new residential plot, every engagement is handled personally from
                our Gulberg Town office.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 pt-10">
            {SERVICES.map((service) => (
              <div
                key={service.number}
                className="pb-8 border-b border-[#F9F6F0]/12 space-y-2.5"
              >
                <p className="text-xs font-medium tabular-nums text-[#F9F6F0]/55">
                  {service.number}
                </p>
                <h3 className="font-serif text-2xl font-semibold text-[#F9F6F0]">
                  {service.title}
                </h3>
                <p className="text-sm text-[#F9F6F0]/75 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Adjacent Proof + Direct Appointment Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Proof Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-medium tracking-wider uppercase text-[#0F1D35]/60">
                Client Verification
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#0F1D35]">
                Rated 5.0 / 5 for Reliability in Federal B Area
              </h2>
            </div>

            <div className="space-y-6 pt-2">
              {VERIFIED_REVIEWS.map((review) => (
                <blockquote
                  key={review.id}
                  className="bg-[#FDFBF7] border border-[#0F1D35]/12 rounded-sm p-6 space-y-3"
                >
                  <div className="flex items-center justify-between text-xs text-[#0F1D35]/65">
                    <span>{review.serviceTag}</span>
                    <span className="tabular-nums font-medium text-[#0F1D35]">5.0 / 5.0</span>
                  </div>
                  <p className="text-sm sm:text-base text-[#0F1D35]/85 leading-relaxed">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                  <footer className="text-xs text-[#0F1D35]/60 pt-1">
                    {review.reviewerName} · {review.context}
                  </footer>
                </blockquote>
              ))}
            </div>

            <button
              type="button"
              onClick={() => onNavigate('testimonials')}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#0F1D35] underline underline-offset-4 decoration-[#0F1D35]/40 hover:decoration-[#0F1D35] cursor-pointer"
            >
              <span>Read All Client Feedback</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Embedded Appointment Form Column */}
          <div className="lg:col-span-7 bg-[#F1ECE1]/60 border border-[#0F1D35]/12 rounded-sm p-6 sm:p-8">
            <div className="space-y-1.5 pb-6 mb-6 border-b border-[#0F1D35]/10">
              <p className="text-xs font-medium tracking-wider uppercase text-[#0F1D35]/60">
                Direct Booking
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#0F1D35]">
                Schedule an Appointment with Your Budget
              </h2>
              <p className="text-sm text-[#0F1D35]/70">
                Share your preferred date, service requirement, and estimated budget so we can
                prepare matching properties before you visit Sadaf Terrace.
              </p>
            </div>

            <AppointmentForm onSuccess={onAppointmentCreated} />
          </div>
        </div>
      </section>
    </div>
  );
}
