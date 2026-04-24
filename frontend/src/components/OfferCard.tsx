import { Offer } from '@/types';
import { safeUrl } from '@/utils/validateUrl';
import RatingBadge from './RatingBadge';
import Badge from './ui/Badge';
import Button from './ui/Button';
import Card from './ui/Card';
import { Link } from 'react-router-dom';
import { Truck, Clock, ExternalLink, Package, Tag } from 'lucide-react';

interface OfferCardProps {
  offer: Offer;
  productName: string;
  productImage: string;
  productId: string;
}

export default function OfferCard({ offer, productName, productImage, productId }: OfferCardProps) {
  const discount = offer.originalPrice
    ? Math.round(((offer.originalPrice - offer.price) / offer.originalPrice) * 100)
    : 0;

  return (
    <Card hover className="flex flex-col sm:flex-row gap-4">
      {/* Image */}
      <div className="shrink-0 mx-auto sm:mx-0">
        <Link to={`/product/${productId}`} className="block relative">
          <img
            src={safeUrl(productImage, '')}
            alt={productName}
            className="w-32 h-32 sm:w-36 sm:h-36 object-cover rounded-xl bg-gray-100"
            loading="lazy"
          />
          {discount > 0 && (
            <Badge variant="success" size="sm" className="absolute -top-2 -left-2 shadow-sm">
              <Tag className="w-3 h-3" />
              -{discount}%
            </Badge>
          )}
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <Link to={`/product/${productId}`}>
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2 leading-snug hover:text-primary-700 transition-colors">
            {productName}
          </h3>
        </Link>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs sm:text-sm font-medium text-gray-700">{offer.store}</span>
          <RatingBadge rating={offer.storeRating} reviewsCount={offer.storeReviewsCount} />
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-1">
          {offer.freeShipping ? (
            <Badge variant="success">
              <Truck className="w-3 h-3" />
              Frete grátis
            </Badge>
          ) : (
            <Badge variant="neutral">
              <Truck className="w-3 h-3" />
              Frete R$ {offer.shipping.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </Badge>
          )}
          <Badge variant="info">
            <Clock className="w-3 h-3" />
            {offer.shippingTimeDays} dia{offer.shippingTimeDays > 1 ? 's' : ''}
          </Badge>
          <Badge variant={offer.condition === 'new' ? 'success' : offer.condition === 'used' ? 'warning' : 'neutral'}>
            <Package className="w-3 h-3" />
            {offer.condition === 'new' ? 'Novo' : offer.condition === 'used' ? 'Usado' : 'Recondicionado'}
          </Badge>
        </div>

        <div className="flex items-end justify-between mt-auto pt-3">
          <div className="flex flex-col">
            {discount > 0 && (
              <span className="text-xs text-gray-400 line-through">
                R$ {offer.originalPrice!.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            )}
            <span className="text-2xl font-extrabold text-primary-700 tracking-tight">
              R$ {offer.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
            {discount > 0 && (
              <span className="text-xs font-medium text-emerald-600">Economia de R$ {(offer.originalPrice! - offer.price).toLocaleString('pt-BR')}</span>
            )}
          </div>

          <Button
            size="md"
            rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
            onClick={() => {
              const url = safeUrl(offer.url, '');
              if (url) window.open(url, '_blank', 'noopener,noreferrer');
            }}
          >
            Ver oferta
          </Button>
        </div>
      </div>
    </Card>
  );
}
