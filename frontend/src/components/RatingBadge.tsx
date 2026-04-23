import { Star } from 'lucide-react';

interface RatingBadgeProps {
  rating: number;
  reviewsCount?: number;
  size?: 'sm' | 'md';
}

export default function RatingBadge({ rating, reviewsCount, size = 'sm' }: RatingBadgeProps) {
  const isSm = size === 'sm';
  const starSize = isSm ? 'w-3.5 h-3.5' : 'w-4 h-4';
  const textSize = isSm ? 'text-xs' : 'text-sm';

  return (
    <div className={`inline-flex items-center gap-1 ${textSize}`}>
      <Star className={`${starSize} fill-amber-400 text-amber-400`} />
      <span className="font-semibold text-gray-800">{rating.toFixed(1)}</span>
      {reviewsCount !== undefined && (
        <span className="text-gray-400 font-normal">({reviewsCount.toLocaleString('pt-BR')})</span>
      )}
    </div>
  );
}

