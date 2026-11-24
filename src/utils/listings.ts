export type TransactionType = 'sale' | 'rent' | 'development';
export type TransactionFilter = 'all' | TransactionType;
export type PropertyCategory = 'House' | 'Portion' | 'Apartment';
export type CategoryFilter = 'All' | PropertyCategory;
export type SortOption = 'featured' | 'price-asc' | 'price-desc';

export interface Property {
  id: string;
  title: string;
  block: string;
  area: string;
  transactionType: TransactionType;
  category: PropertyCategory;
  pricePKR: number;
  areaSize: string;
  areaSqYds: number;
  bedrooms: number;
  bathrooms: number;
  statusLabel: string;
  image: string;
  highlights: string[];
  description: string;
  builtYear: string;
  featured?: boolean;
}

export interface ListingFilterCriteria {
  transactionType: TransactionFilter;
  category: CategoryFilter;
  minPricePKR: number | null;
  maxPricePKR: number | null;
  priceScope?: 'sale' | 'rent';
  minBedrooms: number;
  searchQuery: string;
  sortBy: SortOption;
}

export interface PriceBracket {
  id: string;
  label: string;
  minPricePKR: number | null;
  maxPricePKR: number | null;
  scope: 'sale' | 'rent' | 'all';
}

export const SALE_PRICE_BRACKETS: PriceBracket[] = [
  { id: 'all-sale', label: 'All Prices', minPricePKR: null, maxPricePKR: null, scope: 'sale' },
  { id: 'under-3cr', label: 'Under 3 Cr', minPricePKR: null, maxPricePKR: 30_000_000, scope: 'sale' },
  { id: '3cr-5cr', label: '3 Cr – 5 Cr', minPricePKR: 30_000_000, maxPricePKR: 50_000_000, scope: 'sale' },
  { id: '5cr-8cr', label: '5 Cr – 8 Cr', minPricePKR: 50_000_000, maxPricePKR: 80_000_000, scope: 'sale' },
  { id: 'above-8cr', label: '8 Cr+', minPricePKR: 80_000_000, maxPricePKR: null, scope: 'sale' },
];

export const RENT_PRICE_BRACKETS: PriceBracket[] = [
  { id: 'all-rent', label: 'All Monthly Rents', minPricePKR: null, maxPricePKR: null, scope: 'rent' },
  { id: 'under-120k', label: 'Under 1.2 Lac/mo', minPricePKR: null, maxPricePKR: 120_000, scope: 'rent' },
  { id: '120k-200k', label: '1.2 – 2 Lac/mo', minPricePKR: 120_000, maxPricePKR: 200_000, scope: 'rent' },
  { id: 'above-200k', label: '2 Lac+/mo', minPricePKR: 200_000, maxPricePKR: null, scope: 'rent' },
];

export function formatPKR(amount: number, isMonthly = false): string {
  if (!Number.isFinite(amount) || amount <= 0) {
    return 'Price on Request';
  }

  let formatted: string;
  if (amount >= 10_000_000) {
    const crores = amount / 10_000_000;
    const value = Number.isInteger(crores)
      ? crores.toString()
      : crores.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');
    formatted = `PKR ${value} Cr`;
  } else if (amount >= 100_000) {
    const lacs = amount / 100_000;
    const value = Number.isInteger(lacs)
      ? lacs.toString()
      : lacs.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');
    formatted = `PKR ${value} Lac`;
  } else {
    formatted = `PKR ${Math.round(amount).toLocaleString('en-US')}`;
  }

  return isMonthly ? `${formatted} / mo` : formatted;
}

export function filterListings(
  properties: readonly Property[],
  criteria: ListingFilterCriteria
): Property[] {
  const normalizedQuery = criteria.searchQuery.trim().toLowerCase();
  const hasPriceBound = criteria.minPricePKR !== null || criteria.maxPricePKR !== null;

  const filtered = properties.filter((item) => {
    if (criteria.transactionType !== 'all' && item.transactionType !== criteria.transactionType) {
      return false;
    }

    if (
      criteria.transactionType === 'all' &&
      hasPriceBound &&
      criteria.priceScope === 'sale' &&
      item.transactionType === 'rent'
    ) {
      return false;
    }

    if (criteria.category !== 'All' && item.category !== criteria.category) {
      return false;
    }

    if (criteria.minPricePKR !== null && item.pricePKR < criteria.minPricePKR) {
      return false;
    }

    if (criteria.maxPricePKR !== null && item.pricePKR > criteria.maxPricePKR) {
      return false;
    }

    if (criteria.minBedrooms > 0 && item.bedrooms < criteria.minBedrooms) {
      return false;
    }

    if (normalizedQuery.length > 0) {
      const searchable = `${item.title} ${item.block} ${item.area} ${item.category} ${item.statusLabel}`.toLowerCase();
      if (!searchable.includes(normalizedQuery)) {
        return false;
      }
    }

    return true;
  });

  if (criteria.sortBy === 'price-asc') {
    return [...filtered].sort((a, b) => a.pricePKR - b.pricePKR);
  }
  if (criteria.sortBy === 'price-desc') {
    return [...filtered].sort((a, b) => b.pricePKR - a.pricePKR);
  }

  return [...filtered].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
}

export function suggestBudgetForProperty(property: Property): string {
  if (property.transactionType === 'rent') {
    if (property.pricePKR < 120_000) return 'Rent: PKR 75K – 1.2 Lac/mo';
    if (property.pricePKR <= 200_000) return 'Rent: PKR 1.2 – 2 Lac/mo';
    return 'Rent: PKR 2 Lac+/mo';
  }

  if (property.pricePKR < 30_000_000) return 'PKR 1.5 Cr – 3 Cr';
  if (property.pricePKR <= 50_000_000) return 'PKR 3 Cr – 5 Cr';
  if (property.pricePKR <= 80_000_000) return 'PKR 5 Cr – 8 Cr';
  return 'PKR 8 Cr+';
}
