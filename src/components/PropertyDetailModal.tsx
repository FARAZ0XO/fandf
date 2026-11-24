import { useEffect } from 'react';
import { X, Check, MapPin } from 'lucide-react';
import { formatPKR, type Property } from '../utils/listings';
import { SafeImage } from './SafeImage';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  onScheduleViewing: (property: Property) => void;
}

export function PropertyDetailModal({
  property,
  onClose,
  onScheduleViewing,
}: PropertyDetailModalProps) {
  useEffect(() => {
    if (!property) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [property, onClose]);

  if (!property) return null;

  const isRent = property.transactionType === 'rent';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="property-detail-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0F1D35]/60 backdrop-blur-[2px] overflow-y-auto"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-3xl bg-[#F9F6F0] border border-[#0F1D35]/15 rounded-sm overflow-hidden shadow-xl my-auto max-h-[92vh] overflow-y-auto">
        <button
          type="button"
          aria-label="Close property details"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 inline-flex items-center justify-center w-10 h-10 bg-[#F9F6F0]/95 text-[#0F1D35] hover:bg-[#0F1D35] hover:text-[#F9F6F0] rounded-sm transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="aspect-[16/9] w-full bg-[#F1ECE1]">
          <SafeImage
            src={property.image}
            alt={property.title}
            fallbackTitle={property.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#0F1D35]/10 pb-5">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#0F1D35]/65">
                <span className="font-medium text-[#0F1D35]">{property.statusLabel}</span>
                <span aria-hidden="true">·</span>
                <span>{property.category}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">Built {property.builtYear}</span>
              </div>
              <h2
                id="property-detail-title"
                className="font-serif text-2xl sm:text-3xl font-semibold text-[#0F1D35]"
              >
                {property.title}
              </h2>
              <p className="text-sm text-[#0F1D35]/70 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>
                  {property.block}, {property.area}
                </span>
              </p>
            </div>

            <div className="sm:text-right shrink-0">
              <p className="text-xs text-[#0F1D35]/60">Asking Price</p>
              <p className="text-2xl font-semibold text-[#0F1D35] tabular-nums">
                {formatPKR(property.pricePKR, isRent)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 py-3 border-b border-[#0F1D35]/10 text-sm">
            <div>
              <p className="text-xs text-[#0F1D35]/55">Dimensions</p>
              <p className="font-medium text-[#0F1D35] tabular-nums mt-0.5">{property.areaSize}</p>
            </div>
            <div>
              <p className="text-xs text-[#0F1D35]/55">Bedrooms</p>
              <p className="font-medium text-[#0F1D35] tabular-nums mt-0.5">
                {property.bedrooms} Bedrooms
              </p>
            </div>
            <div>
              <p className="text-xs text-[#0F1D35]/55">Bathrooms</p>
              <p className="font-medium text-[#0F1D35] tabular-nums mt-0.5">
                {property.bathrooms} Bathrooms
              </p>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#0F1D35]/80 leading-relaxed">
            {property.description}
          </p>

          <div className="space-y-2.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0F1D35]/60 font-sans">
              Key Specifications
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {property.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-2 text-sm text-[#0F1D35]/85"
                >
                  <Check className="w-4 h-4 text-[#0F1D35] shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-[#0F1D35]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-xs text-[#0F1D35]/65">
              Arrange an escorted property inspection with Fahad Iqbal or our Block 7 advisory desk.
            </p>
            <button
              type="button"
              onClick={() => onScheduleViewing(property)}
              className="px-6 py-3 text-sm font-medium bg-[#0F1D35] text-[#F9F6F0] hover:bg-[#172B4D] transition-colors rounded-sm whitespace-nowrap shrink-0 cursor-pointer"
            >
              Schedule Viewing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
