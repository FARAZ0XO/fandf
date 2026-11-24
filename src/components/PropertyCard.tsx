import { ArrowUpRight } from 'lucide-react';
import { formatPKR, type Property } from '../utils/listings';
import { SafeImage } from './SafeImage';

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
}

export function PropertyCard({ property, onSelect }: PropertyCardProps) {
  const isRent = property.transactionType === 'rent';

  return (
    <article className="group bg-[#FDFBF7] border border-[#0F1D35]/12 rounded-sm overflow-hidden flex flex-col transition-colors duration-150 hover:border-[#0F1D35]/35">
      <div className="aspect-[4/3] w-full overflow-hidden bg-[#F1ECE1]">
        <SafeImage
          src={property.image}
          alt={`${property.title} in ${property.block}, Federal B Area`}
          fallbackTitle={property.title}
          className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-5">
        <div className="space-y-2.5">
          {/* Unboxed clean inline metadata */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#0F1D35]/65">
            <span className="font-medium text-[#0F1D35]">{property.statusLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{property.block}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{property.areaSize}</span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#0F1D35] leading-snug">
            {property.title}
          </h3>

          <p className="text-sm text-[#0F1D35]/70 line-clamp-2 leading-relaxed">
            {property.description}
          </p>
        </div>

        <div className="pt-4 border-t border-[#0F1D35]/10 flex items-center justify-between gap-4">
          <div>
            <p className="text-lg font-semibold text-[#0F1D35] tabular-nums">
              {formatPKR(property.pricePKR, isRent)}
            </p>
            <p className="text-xs text-[#0F1D35]/60 tabular-nums mt-0.5">
              {property.bedrooms} Bed · {property.bathrooms} Bath · {property.category}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSelect(property)}
            aria-label={`View details for ${property.title}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium border border-[#0F1D35]/25 text-[#0F1D35] hover:bg-[#0F1D35] hover:text-[#F9F6F0] hover:border-[#0F1D35] transition-colors rounded-sm whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F1D35]"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
}
