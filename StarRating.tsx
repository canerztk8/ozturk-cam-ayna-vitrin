import React from "react";
import { cn } from "./utils";

// lucide-react "Star" ikonunun birebir aynı şekli (dolu + 2px yuvarlak kontur), CSS maskesi olarak.
// 5 ayrı <svg> yerine tek bir <span> çizilir → DOM küçülür, görünüm aynı kalır.
const STAR_MASK = `url("data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>'
)}")`;

interface StarRatingProps {
  /** Gösterilecek yıldız sayısı (tam sayı) */
  rating: number;
  /** Tek yıldızın boyutu (rem). lucide w-3.5 = 0.875, w-4 = 1 */
  sizeRem?: number;
  /** Renk: text-* sınıfı (yıldızlar currentColor ile boyanır) */
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, sizeRem = 0.875, className }) => {
  const count = Math.max(0, Math.min(5, Math.round(rating)));
  const size = `${sizeRem}rem`;
  return (
    <span
      role="img"
      aria-label={`5 üzerinden ${count} yıldız`}
      className={cn("inline-block flex-shrink-0 bg-current", className)}
      style={{
        width: `${count * sizeRem}rem`,
        height: size,
        WebkitMaskImage: STAR_MASK,
        maskImage: STAR_MASK,
        WebkitMaskSize: `${size} ${size}`,
        maskSize: `${size} ${size}`,
        WebkitMaskRepeat: "repeat-x",
        maskRepeat: "repeat-x",
      }}
    />
  );
};

