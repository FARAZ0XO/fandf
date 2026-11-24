import { useState } from 'react';
import { Building2 } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function SafeImage({
  src,
  alt,
  className = '',
  fallbackTitle = 'F&F Real Estate',
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F1ECE1] to-[#E4DDD0] text-[#0F1D35] p-6 text-center ${className}`}
      >
        <Building2 className="w-8 h-8 mb-2 opacity-60" strokeWidth={1.5} />
        <span className="font-serif text-base font-medium opacity-80">{fallbackTitle}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
