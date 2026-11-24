import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { PROPERTIES } from '../data/properties';
import {
  RENT_PRICE_BRACKETS,
  SALE_PRICE_BRACKETS,
  filterListings,
  formatPKR,
  type CategoryFilter,
  type Property,
  type SortOption,
  type TransactionFilter,
} from '../utils/listings';
import { PropertyCard } from '../components/PropertyCard';

interface ListingsPageProps {
  onSelectProperty: (property: Property) => void;
  onOpenAppointment: () => void;
}

const TRANSACTION_TABS: { id: TransactionFilter; label: string }[] = [
  { id: 'all', label: 'All Properties' },
  { id: 'sale', label: 'For Sale' },
  { id: 'development', label: 'New Developments' },
  { id: 'rent', label: 'For Rent' },
];

const CATEGORIES: CategoryFilter[] = ['All', 'House', 'Portion', 'Apartment'];

export function ListingsPage({ onSelectProperty, onOpenAppointment }: ListingsPageProps) {
  const [transactionType, setTransactionType] = useState<TransactionFilter>('all');
  const [category, setCategory] = useState<CategoryFilter>('All');
  const [minPriceInput, setMinPriceInput] = useState<string>('');
  const [maxPriceInput, setMaxPriceInput] = useState<string>('');
  const [activeBracketId, setActiveBracketId] = useState<string>('all-sale');
  const [minBedrooms, setMinBedrooms] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const isRentMode = transactionType === 'rent';
  const activeBrackets = isRentMode ? RENT_PRICE_BRACKETS : SALE_PRICE_BRACKETS;

  // Convert user input (Crores in sale/all mode, Lacs/month in rent mode) to exact PKR
  const parsedMinPKR = useMemo(() => {
    const num = Number(minPriceInput);
    if (!minPriceInput.trim() || !Number.isFinite(num) || num <= 0) return null;
    return isRentMode ? num * 100_000 : num * 10_000_000;
  }, [minPriceInput, isRentMode]);

  const parsedMaxPKR = useMemo(() => {
    const num = Number(maxPriceInput);
    if (!maxPriceInput.trim() || !Number.isFinite(num) || num <= 0) return null;
    return isRentMode ? num * 100_000 : num * 10_000_000;
  }, [maxPriceInput, isRentMode]);

  const filteredProperties = useMemo(
    () =>
      filterListings(PROPERTIES, {
        transactionType,
        category,
        minPricePKR: parsedMinPKR,
        maxPricePKR: parsedMaxPKR,
        priceScope: isRentMode ? 'rent' : 'sale',
        minBedrooms,
        searchQuery,
        sortBy,
      }),
    [transactionType, category, parsedMinPKR, parsedMaxPKR, isRentMode, minBedrooms, searchQuery, sortBy]
  );

  const handleTransactionChange = (nextType: TransactionFilter) => {
    setTransactionType(nextType);
    // Reset price bounds cleanly when switching between sale Crore scale and monthly Lac rent scale
    setMinPriceInput('');
    setMaxPriceInput('');
    setActiveBracketId(nextType === 'rent' ? 'all-rent' : 'all-sale');
  };

  const handleBracketSelect = (bracketId: string) => {
    setActiveBracketId(bracketId);
    const bracket = activeBrackets.find((b) => b.id === bracketId);
    if (!bracket) return;

    if (bracket.minPricePKR === null) {
      setMinPriceInput('');
    } else {
      const value = isRentMode
        ? bracket.minPricePKR / 100_000
        : bracket.minPricePKR / 10_000_000;
      setMinPriceInput(String(value));
    }

    if (bracket.maxPricePKR === null) {
      setMaxPriceInput('');
    } else {
      const value = isRentMode
        ? bracket.maxPricePKR / 100_000
        : bracket.maxPricePKR / 10_000_000;
      setMaxPriceInput(String(value));
    }
  };

  const handleResetFilters = () => {
    setTransactionType('all');
    setCategory('All');
    setMinPriceInput('');
    setMaxPriceInput('');
    setActiveBracketId('all-sale');
    setMinBedrooms(0);
    setSearchQuery('');
    setSortBy('featured');
  };

  const activeRangeSummary = useMemo(() => {
    if (parsedMinPKR === null && parsedMaxPKR === null) {
      return isRentMode ? 'Any monthly rent' : 'Any price range';
    }
    if (parsedMinPKR !== null && parsedMaxPKR !== null) {
      return `${formatPKR(parsedMinPKR, isRentMode)} – ${formatPKR(parsedMaxPKR, isRentMode)}`;
    }
    if (parsedMinPKR !== null) {
      return `From ${formatPKR(parsedMinPKR, isRentMode)}`;
    }
    return `Up to ${formatPKR(parsedMaxPKR!, isRentMode)}`;
  }, [parsedMinPKR, parsedMaxPKR, isRentMode]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#0F1D35]/12">
        <div className="space-y-2 max-w-2xl">
          <p className="text-xs font-medium tracking-wider uppercase text-[#0F1D35]/60">
            Federal B Area Portfolio
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#0F1D35]">
            Residential Listings
          </h1>
          <p className="text-sm sm:text-base text-[#0F1D35]/75">
            Explore verified houses, upper and ground portions, apartments, and newly built homes
            across Blocks 6, 7, 10, 14, 15, and 16.
          </p>
        </div>

        <div className="text-sm text-[#0F1D35]/70 tabular-nums shrink-0">
          Showing <strong className="text-[#0F1D35]">{filteredProperties.length}</strong> of{' '}
          {PROPERTIES.length} properties
        </div>
      </div>

      {/* Filter Toolbar */}
      <section
        aria-label="Property Filters"
        className="bg-[#FDFBF7] border border-[#0F1D35]/12 rounded-sm p-5 sm:p-6 space-y-6"
      >
        {/* Row 1: Transaction Segmented Tabs & Search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div
            role="tablist"
            aria-label="Transaction type"
            className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F1ECE1] rounded-sm w-fit"
          >
            {TRANSACTION_TABS.map((tab) => {
              const active = transactionType === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  onClick={() => handleTransactionChange(tab.id)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#0F1D35] text-[#F9F6F0]'
                      : 'text-[#0F1D35]/75 hover:text-[#0F1D35]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-80">
            <label htmlFor="listing-search" className="sr-only">
              Search by block or property title
            </label>
            <Search
              className="w-4 h-4 text-[#0F1D35]/45 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="listing-search"
              type="search"
              placeholder="Search block (e.g. Block 7, Corner)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F9F6F0] border border-[#0F1D35]/20 rounded-sm pl-10 pr-3.5 py-2.5 text-sm text-[#0F1D35] placeholder:text-[#0F1D35]/45 focus:outline-none focus:border-[#0F1D35] focus:ring-1 focus:ring-[#0F1D35]"
            />
          </div>
        </div>

        {/* Row 2: Dedicated Price Range Filter + Category / Bedrooms / Sort */}
        <div className="pt-5 border-t border-[#0F1D35]/10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          {/* Price Range Controls */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0F1D35]/70 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
                <span>
                  Price Range Filter ({isRentMode ? 'Monthly PKR in Lacs' : 'PKR in Crores'})
                </span>
              </span>
              <span
                data-testid="active-price-range"
                className="text-xs font-medium text-[#0F1D35] tabular-nums"
              >
                {activeRangeSummary}
              </span>
            </div>

            {/* Quick Price Bracket Buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              {activeBrackets.map((bracket) => {
                const isSelected = activeBracketId === bracket.id;
                return (
                  <button
                    key={bracket.id}
                    type="button"
                    onClick={() => handleBracketSelect(bracket.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-sm border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-[#0F1D35] text-[#F9F6F0] border-[#0F1D35]'
                        : 'bg-[#F9F6F0] text-[#0F1D35]/80 border-[#0F1D35]/20 hover:border-[#0F1D35]'
                    }`}
                  >
                    {bracket.label}
                  </button>
                );
              })}
            </div>

            {/* Custom Min / Max Numeric Inputs */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label
                  htmlFor="filter-min-price"
                  className="block text-xs text-[#0F1D35]/65 mb-1"
                >
                  Min Price ({isRentMode ? 'Lac/mo' : 'Crore'})
                </label>
                <input
                  id="filter-min-price"
                  type="number"
                  min={0}
                  step={isRentMode ? '0.1' : '0.25'}
                  placeholder={isRentMode ? 'e.g. 1.0' : 'e.g. 2.5'}
                  value={minPriceInput}
                  onChange={(e) => {
                    setMinPriceInput(e.target.value);
                    setActiveBracketId('custom');
                  }}
                  className="w-full bg-[#F9F6F0] border border-[#0F1D35]/20 rounded-sm px-3 py-2 text-sm text-[#0F1D35] tabular-nums focus:outline-none focus:border-[#0F1D35]"
                />
              </div>
              <div>
                <label
                  htmlFor="filter-max-price"
                  className="block text-xs text-[#0F1D35]/65 mb-1"
                >
                  Max Price ({isRentMode ? 'Lac/mo' : 'Crore'})
                </label>
                <input
                  id="filter-max-price"
                  type="number"
                  min={0}
                  step={isRentMode ? '0.1' : '0.25'}
                  placeholder={isRentMode ? 'e.g. 2.5' : 'e.g. 6.0'}
                  value={maxPriceInput}
                  onChange={(e) => {
                    setMaxPriceInput(e.target.value);
                    setActiveBracketId('custom');
                  }}
                  className="w-full bg-[#F9F6F0] border border-[#0F1D35]/20 rounded-sm px-3 py-2 text-sm text-[#0F1D35] tabular-nums focus:outline-none focus:border-[#0F1D35]"
                />
              </div>
            </div>
          </div>

          {/* Secondary Filters: Category, Bedrooms, Sort */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label htmlFor="filter-category" className="block text-xs text-[#0F1D35]/65 mb-1">
                Property Type
              </label>
              <select
                id="filter-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryFilter)}
                className="w-full bg-[#F9F6F0] border border-[#0F1D35]/20 rounded-sm px-3 py-2 text-sm text-[#0F1D35] focus:outline-none focus:border-[#0F1D35]"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'All' ? 'All Types' : cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="filter-bedrooms" className="block text-xs text-[#0F1D35]/65 mb-1">
                Bedrooms
              </label>
              <select
                id="filter-bedrooms"
                value={minBedrooms}
                onChange={(e) => setMinBedrooms(Number(e.target.value))}
                className="w-full bg-[#F9F6F0] border border-[#0F1D35]/20 rounded-sm px-3 py-2 text-sm text-[#0F1D35] tabular-nums focus:outline-none focus:border-[#0F1D35]"
              >
                <option value={0}>Any Beds</option>
                <option value={2}>2+ Beds</option>
                <option value={3}>3+ Beds</option>
                <option value={4}>4+ Beds</option>
                <option value={5}>5+ Beds</option>
              </select>
            </div>

            <div>
              <label htmlFor="filter-sort" className="block text-xs text-[#0F1D35]/65 mb-1">
                Sort By
              </label>
              <select
                id="filter-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full bg-[#F9F6F0] border border-[#0F1D35]/20 rounded-sm px-3 py-2 text-sm text-[#0F1D35] focus:outline-none focus:border-[#0F1D35]"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Results Grid or Empty State */}
      {filteredProperties.length > 0 ? (
        <div
          data-testid="listings-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onSelect={onSelectProperty}
            />
          ))}
        </div>
      ) : (
        <div className="bg-[#FDFBF7] border border-[#0F1D35]/12 rounded-sm p-10 sm:p-14 text-center space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#0F1D35]">
            No residences match this exact price range
          </h2>
          <p className="text-sm text-[#0F1D35]/70 max-w-md mx-auto">
            Try widening your PKR price range or resetting the filters. We also maintain off-market
            inventory in Federal B Area upon consultation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-[#0F1D35] text-[#F9F6F0] hover:bg-[#172B4D] rounded-sm transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset All Filters</span>
            </button>
            <button
              type="button"
              onClick={onOpenAppointment}
              className="px-5 py-2.5 text-sm font-medium border border-[#0F1D35]/30 text-[#0F1D35] hover:border-[#0F1D35] rounded-sm transition-colors cursor-pointer"
            >
              Request Off-Market Options
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
