import { ArrowRight, Phone } from 'lucide-react';
import { BUSINESS_INFO, OFFICE_IMAGE } from '../data/properties';
import type { PageId } from '../components/Navbar';
import { SafeImage } from '../components/SafeImage';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onOpenAppointment: () => void;
}

const METHODOLOGY = [
  {
    step: '01.',
    title: 'Neighborhood Valuation & Advisory',
    body: 'Every block in Federal B Area carries distinct street widths, utility access, and resale liquidity. We benchmark recent closed transactions before advising buyers or sellers on price.',
  },
  {
    step: '02.',
    title: 'Transparent Title & Lease Verification',
    body: 'Before an earnest deposit is exchanged, we coordinate full document scrutiny—covering KMC/SBCA records, sub-lease chains, and utility clearance—so families proceed without surprises.',
  },
  {
    step: '03.',
    title: 'Residential Home Development',
    body: 'For clients seeking newly constructed residences, our development practice oversees architectural planning, structural steel and concrete quality, and turnkey finishing in Federal B Area.',
  },
];

export function AboutPage({ onNavigate, onOpenAppointment }: AboutPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-16">
      {/* Intro Split */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        <div className="lg:col-span-6 flex flex-col justify-between gap-8">
          <div className="space-y-5">
            <p className="text-xs font-medium tracking-wider uppercase text-[#0F1D35]/60">
              About F&amp;F Real Estate
            </p>
            <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#0F1D35] leading-[1.1]">
              Dedicated to Federal B Area Homes Since Day One
            </h1>
            <p className="text-base text-[#0F1D35]/80 leading-relaxed">
              Located at Sadaf Terrace in Naseerabad Block 7, Gulberg Town, F&amp;F Real Estate
              was built on a straightforward premise: Karachi families deserve clear property
              records, honest market valuations, and unhurried personal guidance.
            </p>
            <p className="text-base text-[#0F1D35]/75 leading-relaxed">
              Rather than spreading thinly across distant schemes, our team focuses deeply on
              Federal B Area—advising buyers, sellers, landlords, tenants, and residential
              build-out clients across Blocks 6 through 16.
            </p>
          </div>

          <div className="pt-6 border-t border-[#0F1D35]/12 flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={onOpenAppointment}
              className="px-6 py-3 text-sm font-medium bg-[#0F1D35] text-[#F9F6F0] hover:bg-[#172B4D] transition-colors rounded-sm whitespace-nowrap shrink-0 cursor-pointer"
            >
              Book an Office Consultation
            </button>
            <button
              type="button"
              onClick={() => onNavigate('listings')}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#0F1D35] hover:opacity-75 transition-opacity whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Browse Active Listings</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="h-full min-h-[300px] sm:min-h-[380px] rounded-sm overflow-hidden border border-[#0F1D35]/12 bg-[#F1ECE1]">
            <SafeImage
              src={OFFICE_IMAGE}
              alt="F&F Real Estate consultation room with architectural plans"
              fallbackTitle="F&F Real Estate Office"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Principal Advisory Card */}
      <section className="bg-[#0F1D35] text-[#F9F6F0] rounded-sm p-8 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-3">
          <p className="text-xs font-medium tracking-wider uppercase text-[#F9F6F0]/60">
            Direct Leadership
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#F9F6F0]">
            Personal Oversight by {BUSINESS_INFO.advisorName}
          </h2>
          <p className="text-sm sm:text-base text-[#F9F6F0]/75 leading-relaxed max-w-2xl">
            Every property inspection, price negotiation, and residential construction handover is
            supervised directly to protect our clients&apos; capital and timeline. Our doors remain
            open until midnight seven days a week to accommodate working families.
          </p>
        </div>

        <div className="lg:col-span-5 lg:border-l lg:border-[#F9F6F0]/15 lg:pl-10 space-y-4">
          <div>
            <p className="text-xs text-[#F9F6F0]/55">Office Desk</p>
            <a
              href={BUSINESS_INFO.phonePrimaryHref}
              className="inline-flex items-center gap-2 text-lg font-medium text-[#F9F6F0] tabular-nums hover:underline mt-0.5"
            >
              <Phone className="w-4 h-4" />
              <span>{BUSINESS_INFO.phonePrimary}</span>
            </a>
          </div>
          <div>
            <p className="text-xs text-[#F9F6F0]/55">
              Direct Line ({BUSINESS_INFO.advisorName})
            </p>
            <a
              href={BUSINESS_INFO.advisorPhoneHref}
              className="inline-flex items-center gap-2 text-lg font-medium text-[#F9F6F0] tabular-nums hover:underline mt-0.5"
            >
              <Phone className="w-4 h-4" />
              <span>{BUSINESS_INFO.advisorPhone}</span>
            </a>
          </div>
          <p className="text-xs text-[#F9F6F0]/65 tabular-nums pt-1">
            {BUSINESS_INFO.hoursWeekday} · {BUSINESS_INFO.hoursFriday}
          </p>
        </div>
      </section>

      {/* Three-Step Methodology */}
      <section className="space-y-8">
        <div className="pb-6 border-b border-[#0F1D35]/12 space-y-1.5">
          <p className="text-xs font-medium tracking-wider uppercase text-[#0F1D35]/60">
            How We Work
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#0F1D35]">
            Built Around Clarity &amp; Follow-Through
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {METHODOLOGY.map((item) => (
            <div
              key={item.step}
              className="bg-[#FDFBF7] border border-[#0F1D35]/12 rounded-sm p-6 space-y-3"
            >
              <p className="text-xs font-medium tabular-nums text-[#0F1D35]/55">{item.step}</p>
              <h3 className="font-serif text-2xl font-semibold text-[#0F1D35]">{item.title}</h3>
              <p className="text-sm text-[#0F1D35]/75 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
