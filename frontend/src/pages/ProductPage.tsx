import { useParams, Link } from 'react-router-dom';
import { TrendingUp, ArrowLeft, Truck, Clock, ExternalLink, Package, Star, TrendingDown } from 'lucide-react';
import { useProduct } from '@/hooks/useProduct';
import { safeUrl } from '@/utils/validateUrl';
import RatingBadge from '@/components/RatingBadge';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import { useState, useMemo } from 'react';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useProduct(id || '');
  const [selectedImage, setSelectedImage] = useState(0);

  if (loading) return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <LoadingState message="Carregando produto..." count={2} />
      </div>
    </div>
  );
  if (error || !product) return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ErrorState message={error || 'Produto não encontrado.'} />
      </div>
    </div>
  );

  const images = useMemo(() => {
    const raw = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
    return raw.map((url) => safeUrl(url, '')).filter(Boolean);
  }, [product.gallery, product.image]);
  const bestOffer = product.offers.reduce((best, o) => (o.price < best.price ? o : best), product.offers[0]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="bg-primary-600 rounded-lg p-1.5">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
<span className="text-xl font-bold text-gray-900 tracking-tight hidden sm:inline">Third Eye</span>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          to={`/search?q=${encodeURIComponent(product.name)}`}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary-700 mb-5 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para resultados
        </Link>

        {/* Product header */}
        <Card padding="none" className="overflow-hidden mb-6">
          <div className="p-5 sm:p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Gallery */}
              <div className="w-full lg:w-[420px] shrink-0">
                <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden mb-4 border border-gray-100">
                  <img
                    src={images[selectedImage] || ''}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {images.length > 1 && (
                  <div className="flex gap-2.5 overflow-x-auto pb-1">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={[
                          'w-18 h-18 rounded-xl overflow-hidden border-2 shrink-0 transition-all',
                          selectedImage === idx ? 'border-primary-500 ring-2 ring-primary-500/20' : 'border-gray-200 hover:border-gray-300',
                        ].join(' ')}
                      >
                        <img src={safeUrl(img, '')} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <Badge variant="price" size="sm" className="mb-3">
                      {product.category}
                    </Badge>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3 tracking-tight leading-tight">
                      {product.name}
                    </h1>
                    <div className="flex items-center gap-4 flex-wrap">
                      <RatingBadge rating={product.rating} reviewsCount={product.reviewsCount} size="md" />
                      <span className="text-sm font-medium text-gray-400">{product.brand}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-500 leading-relaxed mb-6">{product.description}</p>

                {/* Best offer highlight */}
                {bestOffer && (
                  <div className="bg-gradient-to-br from-primary-50 to-emerald-50/50 border border-primary-100 rounded-2xl p-5 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingDown className="w-4 h-4 text-primary-600" />
                      <p className="text-xs font-bold text-primary-700 uppercase tracking-wider">Melhor preço encontrado</p>
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <p className="text-3xl font-extrabold text-primary-700 tracking-tight">
                          R$ {bestOffer.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
                          <span className="flex items-center gap-1.5 font-medium">
                            <Truck className="w-3.5 h-3.5 text-gray-400" />
                            {bestOffer.freeShipping ? (
                              <span className="text-emerald-600">Frete grátis</span>
                            ) : (
                              `Frete R$ ${bestOffer.shipping.toFixed(2)}`
                            )}
                          </span>
                          <span className="flex items-center gap-1.5 font-medium">
                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                            {bestOffer.shippingTimeDays} dia{bestOffer.shippingTimeDays > 1 ? 's' : ''}
                          </span>
                          <span className="flex items-center gap-1.5 font-medium">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            {bestOffer.store}
                          </span>
                        </div>
                      </div>
                      <Button
                        size="lg"
                        rightIcon={<ExternalLink className="w-4 h-4" />}
                        onClick={() => {
                          const url = safeUrl(bestOffer.url, '');
                          if (url) window.open(url, '_blank', 'noopener,noreferrer');
                        }}
                      >
                        Ver oferta
                      </Button>
                    </div>
                  </div>
                )}

                {/* Specs */}
                <div>
                  <h2 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Especificações principais</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between bg-gray-50 rounded-xl px-4 py-2.5 border border-gray-100">
                        <span className="text-xs font-medium text-gray-400">{key}</span>
                        <span className="text-xs font-semibold text-gray-900 text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Price history */}
        {product.priceHistory.length > 0 && (
          <Card className="mb-6" padding="lg">
            <h2 className="text-base font-bold text-gray-900 mb-5 uppercase tracking-wider">Histórico de preço</h2>
            <div className="flex items-end gap-3 h-44">
              {product.priceHistory.map((point, idx) => {
                const min = Math.min(...product.priceHistory.map((p) => p.price));
                const max = Math.max(...product.priceHistory.map((p) => p.price));
                const range = max - min || 1;
                const heightPercent = ((point.price - min) / range) * 50 + 25;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-[11px] font-semibold text-gray-700">
                      R$ {point.price.toLocaleString('pt-BR')}
                    </span>
                    <div
                      className="w-full max-w-[48px] bg-primary-400 rounded-t-lg relative group cursor-pointer"
                      style={{ height: `${heightPercent}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        R$ {point.price.toLocaleString('pt-BR')}
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium">
                      {new Date(point.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {/* Offers table */}
        <Card padding="none" className="overflow-hidden">
          <div className="px-5 sm:px-8 py-5 border-b border-gray-100">
            <h2 className="text-base font-bold text-gray-900 uppercase tracking-wider">Tabela de ofertas</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50/80 text-gray-500">
                <tr>
                  <th className="text-left font-semibold text-xs uppercase tracking-wider px-5 sm:px-8 py-3.5">Loja</th>
                  <th className="text-left font-semibold text-xs uppercase tracking-wider px-5 sm:px-8 py-3.5">Condição</th>
                  <th className="text-left font-semibold text-xs uppercase tracking-wider px-5 sm:px-8 py-3.5">Frete</th>
                  <th className="text-left font-semibold text-xs uppercase tracking-wider px-5 sm:px-8 py-3.5">Prazo</th>
                  <th className="text-left font-semibold text-xs uppercase tracking-wider px-5 sm:px-8 py-3.5">Avaliação</th>
                  <th className="text-right font-semibold text-xs uppercase tracking-wider px-5 sm:px-8 py-3.5">Preço</th>
                  <th className="px-5 sm:px-8 py-3.5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {product.offers.map((offer) => (
                  <tr key={offer.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-5 sm:px-8 py-3.5 font-semibold text-gray-900">{offer.store}</td>
                    <td className="px-5 sm:px-8 py-3.5">
                      <Badge
                        variant={
                          offer.condition === 'new'
                            ? 'success'
                            : offer.condition === 'used'
                            ? 'warning'
                            : 'neutral'
                        }
                        size="sm"
                      >
                        <Package className="w-3 h-3" />
                        {offer.condition === 'new' ? 'Novo' : offer.condition === 'used' ? 'Usado' : 'Recondicionado'}
                      </Badge>
                    </td>
                    <td className="px-5 sm:px-8 py-3.5">
                      {offer.freeShipping ? (
                        <span className="text-emerald-600 font-semibold text-xs">Grátis</span>
                      ) : (
                        <span className="text-gray-700 font-medium text-xs">R$ {offer.shipping.toFixed(2)}</span>
                      )}
                    </td>
                    <td className="px-5 sm:px-8 py-3.5 text-gray-600 font-medium text-xs">{offer.shippingTimeDays} dias</td>
                    <td className="px-5 sm:px-8 py-3.5">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-gray-900 font-semibold text-xs">{offer.storeRating}</span>
                      </div>
                    </td>
                    <td className="px-5 sm:px-8 py-3.5 text-right">
                      <span className="font-bold text-gray-900">
                        R$ {offer.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </td>
                    <td className="px-5 sm:px-8 py-3.5">
                      <Button
                        variant="ghost"
                        size="sm"
                        rightIcon={<ExternalLink className="w-3 h-3" />}
                        onClick={() => {
                          const url = safeUrl(offer.url, '');
                          if (url) window.open(url, '_blank', 'noopener,noreferrer');
                        }}
                      >
                        Ver
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
}

