import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterListings,
  formatPKR,
  suggestBudgetForProperty,
  type ListingFilterCriteria,
  type Property,
} from './listings';

const SAMPLE_PROPERTIES: Property[] = [
  {
    id: 'p1',
    title: '400 Sq. Yds Corner Bungalow',
    block: 'Block 7, Naseerabad',
    area: 'Federal B Area, Gulberg Town',
    transactionType: 'sale',
    category: 'House',
    pricePKR: 72_500_000,
    areaSize: '400 Sq. Yds',
    areaSqYds: 400,
    bedrooms: 5,
    bathrooms: 6,
    statusLabel: 'For Sale',
    image: '/sample1.jpg',
    highlights: ['Corner Plot'],
    description: 'Spacious family bungalow.',
    builtYear: '2022',
    featured: true,
  },
  {
    id: 'p2',
    title: '240 Sq. Yds Newly Built Residence',
    block: 'Block 14',
    area: 'Federal B Area, Gulberg Town',
    transactionType: 'development',
    category: 'House',
    pricePKR: 46_000_000,
    areaSize: '240 Sq. Yds',
    areaSqYds: 240,
    bedrooms: 4,
    bathrooms: 4,
    statusLabel: 'New Development',
    image: '/sample2.jpg',
    highlights: ['Turnkey Handover'],
    description: 'Newly developed modern house.',
    builtYear: '2026',
    featured: true,
  },
  {
    id: 'p3',
    title: 'Upper Portion Near K.K.F Hospital',
    block: 'Block 7, Naseerabad',
    area: 'Federal B Area, Gulberg Town',
    transactionType: 'rent',
    category: 'Portion',
    pricePKR: 135_000,
    areaSize: '240 Sq. Yds',
    areaSqYds: 240,
    bedrooms: 3,
    bathrooms: 3,
    statusLabel: 'For Rent',
    image: '/sample3.jpg',
    highlights: ['Separate Entrance'],
    description: 'Clean upper portion.',
    builtYear: '2021',
    featured: false,
  },
];

const DEFAULT_CRITERIA: ListingFilterCriteria = {
  transactionType: 'all',
  category: 'All',
  minPricePKR: null,
  maxPricePKR: null,
  minBedrooms: 0,
  searchQuery: '',
  sortBy: 'featured',
};

test('formatPKR formats Crores, Lacs, and monthly rent cleanly', () => {
  assert.equal(formatPKR(72_500_000), 'PKR 7.25 Cr');
  assert.equal(formatPKR(30_000_000), 'PKR 3 Cr');
  assert.equal(formatPKR(135_000, true), 'PKR 1.35 Lac / mo');
  assert.equal(formatPKR(85_000, true), 'PKR 85,000 / mo');
});

test('filterListings filters accurately by price range and transaction type', () => {
  const saleRange = filterListings(SAMPLE_PROPERTIES, {
    ...DEFAULT_CRITERIA,
    minPricePKR: 40_000_000,
    maxPricePKR: 60_000_000,
  });
  assert.equal(saleRange.length, 1);
  assert.equal(saleRange[0].id, 'p2');

  const rentOnly = filterListings(SAMPLE_PROPERTIES, {
    ...DEFAULT_CRITERIA,
    transactionType: 'rent',
    minPricePKR: 100_000,
    maxPricePKR: 200_000,
  });
  assert.equal(rentOnly.length, 1);
  assert.equal(rentOnly[0].id, 'p3');

  const under5CrExcludingRent = filterListings(SAMPLE_PROPERTIES, {
    ...DEFAULT_CRITERIA,
    transactionType: 'all',
    maxPricePKR: 50_000_000,
    priceScope: 'sale',
  });
  assert.deepEqual(
    under5CrExcludingRent.map((p) => p.id),
    ['p2']
  );
});

test('filterListings sorts by price ascending and descending', () => {
  const asc = filterListings(SAMPLE_PROPERTIES, {
    ...DEFAULT_CRITERIA,
    sortBy: 'price-asc',
  });
  assert.deepEqual(
    asc.map((p) => p.id),
    ['p3', 'p2', 'p1']
  );

  const desc = filterListings(SAMPLE_PROPERTIES, {
    ...DEFAULT_CRITERIA,
    sortBy: 'price-desc',
  });
  assert.deepEqual(
    desc.map((p) => p.id),
    ['p1', 'p2', 'p3']
  );
});

test('suggestBudgetForProperty maps properties to matching appointment budget brackets', () => {
  assert.equal(suggestBudgetForProperty(SAMPLE_PROPERTIES[0]), 'PKR 5 Cr – 8 Cr');
  assert.equal(suggestBudgetForProperty(SAMPLE_PROPERTIES[1]), 'PKR 3 Cr – 5 Cr');
  assert.equal(suggestBudgetForProperty(SAMPLE_PROPERTIES[2]), 'Rent: PKR 1.2 – 2 Lac/mo');
});
