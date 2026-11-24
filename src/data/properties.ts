import type { Property } from '../utils/listings';

export const BUSINESS_INFO = {
  name: 'F&F Real Estate',
  shortLocation: 'Federal B Area, Karachi',
  address:
    'Shop # 7, Sadaf Terrace, Block 7th St, near K.K.F General Hospital, Federal B Area Naseerabad Block 7, Gulberg Town, Karachi, 75950',
  phonePrimary: '+92 334 1360110',
  phonePrimaryHref: 'tel:+923341360110',
  advisorName: 'Fahad Iqbal',
  advisorPhone: '0333 3362140',
  advisorPhoneHref: 'tel:03333362140',
  hoursWeekday: 'Mon–Thu, Sat–Sun: 12:00 PM – 12:00 AM',
  hoursFriday: 'Fri: 3:00 PM – 12:00 AM',
  ratingValue: '5.0',
  reviewCount: 2,
};

export const HERO_IMAGE = '/src/assets/images/hero_residence_1795516285148.jpg';
export const OFFICE_IMAGE = '/src/assets/images/about_office_studio_1795516286716.jpg';

export const PROPERTIES: Property[] = [
  {
    id: 'ff-block7-corner-bungalow',
    title: 'Sadaf Avenue Corner Residence',
    block: 'Block 7, Naseerabad',
    area: 'Federal B Area, Gulberg Town',
    transactionType: 'sale',
    category: 'House',
    pricePKR: 74_000_000,
    areaSize: '400 Sq. Yds',
    areaSqYds: 400,
    bedrooms: 5,
    bathrooms: 6,
    statusLabel: 'For Sale',
    image: '/src/assets/images/listing_villa_block7_1795516285065.jpg',
    highlights: [
      'West-open corner plot near K.K.F General Hospital',
      'Dual kitchen layout with solid teak woodwork',
      'Covered parking for 3 vehicles & servant quarter',
      'Verified clear lease and Cantonment/KMC record',
    ],
    description:
      'A well-proportioned 400 square yard two-story residence positioned on a quiet residential lane in Block 7, Naseerabad. Designed for multi-generational living with generous drawing, dining, and upper-level family lounge.',
    builtYear: '2023',
    featured: true,
  },
  {
    id: 'ff-block14-new-build',
    title: 'Al-Noor Modern Turnkey House',
    block: 'Block 14',
    area: 'Federal B Area, Gulberg Town',
    transactionType: 'development',
    category: 'House',
    pricePKR: 48_500_000,
    areaSize: '240 Sq. Yds',
    areaSqYds: 240,
    bedrooms: 4,
    bathrooms: 5,
    statusLabel: 'New Development',
    image: '/src/assets/images/listing_courtyard_duplex_1795516286980.jpg',
    highlights: [
      'Developed directly by F&F Residential Projects',
      'A-grade steel structure & imported Grohe sanitaryware',
      'Full concealed solar-ready wiring & backup provision',
      'Ready for immediate possession with 1-year structural warranty',
    ],
    description:
      'Newly developed 240 square yard home combining crisp cream limestone finishes with deep navy architectural louvers. Built under F&F supervision with transparent material specifications from foundation to handover.',
    builtYear: '2026',
    featured: true,
  },
  {
    id: 'ff-block10-living-residence',
    title: 'Gulberg Park-Facing Home',
    block: 'Block 10',
    area: 'Federal B Area, Gulberg Town',
    transactionType: 'sale',
    category: 'House',
    pricePKR: 36_500_000,
    areaSize: '200 Sq. Yds',
    areaSqYds: 200,
    bedrooms: 4,
    bathrooms: 4,
    statusLabel: 'For Sale',
    image: '/src/assets/images/listing_interior_living_1795516284989.jpg',
    highlights: [
      'Facing landscaped neighborhood family park',
      'Bright honed travertine flooring throughout ground floor',
      'Separate utility and laundry terrace',
      'Walking distance to main Shahrah-e-Pakistan transit',
    ],
    description:
      'Sunlit 200 square yard residential house offering peaceful park views and effortless access to schools, mosques, and medical clinics across Federal B Area.',
    builtYear: '2022',
    featured: true,
  },
  {
    id: 'ff-block7-sadaf-apartment',
    title: 'Sadaf Terrace Executive Flat',
    block: 'Block 7, Naseerabad',
    area: 'Federal B Area, Gulberg Town',
    transactionType: 'sale',
    category: 'Apartment',
    pricePKR: 18_500_000,
    areaSize: '1,650 Sq. Ft',
    areaSqYds: 183,
    bedrooms: 3,
    bathrooms: 3,
    statusLabel: 'For Sale',
    image: '/src/assets/images/listing_apartment_terrace_1795516286201.jpg',
    highlights: [
      '3rd floor west-open terrace balcony',
      'Dedicated elevator & standby generator backup',
      'Reserved basement car parking bay',
      'Immediate proximity to Block 7th St & K.K.F Hospital',
    ],
    description:
      'Refined three-bedroom apartment in the heart of Block 7, Naseerabad. Ideal for small families seeking secure building management, natural cross-ventilation, and clean title transfer.',
    builtYear: '2024',
    featured: false,
  },
  {
    id: 'ff-block16-development-villa',
    title: 'Block 16 Signature Courtyard Villa',
    block: 'Block 16',
    area: 'Federal B Area, Gulberg Town',
    transactionType: 'development',
    category: 'House',
    pricePKR: 92_000_000,
    areaSize: '400 Sq. Yds',
    areaSqYds: 400,
    bedrooms: 6,
    bathrooms: 7,
    statusLabel: 'New Development',
    image: '/src/assets/images/hero_residence_1795516285148.jpg',
    highlights: [
      'Double-height entrance foyer with architectural staircase',
      'Ground + 1 + rooftop pergola terrace',
      'Custom walnut cabinetry & double-glazed aluminum windows',
      'Clean sub-lease documentation ready for transfer',
    ],
    description:
      'Flagship 400 square yard custom residence developed in Block 16. Proportioned for discerning Karachi families seeking understated architectural quality in an established neighborhood.',
    builtYear: '2026',
    featured: false,
  },
  {
    id: 'ff-block7-upper-portion-rent',
    title: 'Naseerabad Independent Upper Portion',
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
    image: '/src/assets/images/listing_interior_living_1795516284989.jpg',
    highlights: [
      'Completely independent entrance & separate utility meters',
      'Sweet water line + dedicated overhead tank',
      'Wide terrace overlooking quiet Block 7 street',
      'Preference for small family tenants',
    ],
    description:
      'Well-maintained 240 square yard upper portion near K.K.F General Hospital. Features an airy lounge, three bedrooms with attached baths, and separate electricity and gas meters.',
    builtYear: '2021',
    featured: false,
  },
  {
    id: 'ff-block6-ground-portion-rent',
    title: 'Block 6 Renovated Ground Floor Portion',
    block: 'Block 6',
    area: 'Federal B Area, Gulberg Town',
    transactionType: 'rent',
    category: 'Portion',
    pricePKR: 175_000,
    areaSize: '300 Sq. Yds',
    areaSqYds: 300,
    bedrooms: 4,
    bathrooms: 4,
    statusLabel: 'For Rent',
    image: '/src/assets/images/listing_villa_block7_1795516285065.jpg',
    highlights: [
      'Freshly renovated kitchen and tilework',
      'Dedicated indoor car porch for 2 cars',
      'Step-free ground floor access for senior family members',
      '2-minute drive from Water Pump & Ayesha Manzil',
    ],
    description:
      'Generous ground floor rental residence in Block 6 featuring a private porch, formal drawing room, and four bedrooms.',
    builtYear: '2020',
    featured: false,
  },
  {
    id: 'ff-block15-apartment-rent',
    title: 'Block 15 Family Terrace Apartment',
    block: 'Block 15',
    area: 'Federal B Area, Gulberg Town',
    transactionType: 'rent',
    category: 'Apartment',
    pricePKR: 95_000,
    areaSize: '1,350 Sq. Ft',
    areaSqYds: 150,
    bedrooms: 2,
    bathrooms: 2,
    statusLabel: 'For Rent',
    image: '/src/assets/images/listing_apartment_terrace_1795516286201.jpg',
    highlights: [
      '24/7 security gate & CCTV lobby',
      'Bright corner apartment with cross-breeze',
      'Low monthly maintenance charges',
      'Close to local supermarkets and clinics',
    ],
    description:
      'Clean and quiet two-bedroom apartment available for immediate lease in Federal B Area Block 15.',
    builtYear: '2023',
    featured: false,
  },
];

export interface TestimonialItem {
  id: string;
  reviewerName: string;
  context: string;
  rating: number;
  dateLabel: string;
  quote: string;
  serviceTag: string;
}

export const VERIFIED_REVIEWS: TestimonialItem[] = [
  {
    id: 'review-1',
    reviewerName: 'Verified Google Client',
    context: 'Home Buyer · Federal B Area, Karachi',
    rating: 5,
    dateLabel: '5.0 / 5.0 Verified Review',
    quote:
      'Highly reliable agency for buying a home in Federal B Area. Every paper and property history was shared openly before we committed, making the entire family purchase straightforward and stress-free.',
    serviceTag: 'Residential Buying',
  },
  {
    id: 'review-2',
    reviewerName: 'Verified Google Client',
    context: 'Home Seller · Federal B Area, Karachi',
    rating: 5,
    dateLabel: '5.0 / 5.0 Verified Review',
    quote:
      'If you are looking to buy or sell a home in Federal B Area, F&F Real Estate is dependable from valuation through final transfer. Fahad Iqbal handled viewings professionally and kept us updated at every step.',
    serviceTag: 'Property Sales',
  },
];
