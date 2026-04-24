import { useSearchParams, Link } from 'react-router-dom';
import { TrendingUp, SlidersHorizontal } from 'lucide-react';
import { useSearch } from '@/hooks/useSearch';
import SearchBar from '@/components/SearchBar';
import Filters from '@/components/Filters';
import SortSelect from '@/components/SortSelect';
import OfferCard from '@/components/OfferCard';
import LoadingState from '@/components/LoadingState';
import EmptyState from '@/components/EmptyState';
import ErrorState from '@/components/ErrorState';
import Badge from '@/components/ui/Badge';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const { results, loading, error, filters, sort, setFilters, setSort, refetch } = useSearch(query);

  const totalOffers = results?.products.reduce((sum, p) => sum + p.offers.length, 0) ?? 0;

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
          <div className="flex-1 max-w-xl">
            <SearchBar initialValue={query} />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">
              {query ? `Resultados para "${query}"` : 'Todas as ofertas'}
            </h1>
            {!loading && results && (
              <p className="text-sm text-gray-400 mt-0.5">
                <span className="font-semibold text-gray-600">{results.total}</span> produto{results.total !== 1 ? 's' : ''} ·{' '}
                <span className="font-semibold text-gray-600">{totalOffers}</span> oferta{totalOffers !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {!loading && results && results.products.length > 0 && (
              <Badge variant="success" size="sm">
                <SlidersHorizontal className="w-3 h-3" />
                {totalOffers} oferta{totalOffers !== 1 ? 's' : ''} encontrada{totalOffers !== 1 ? 's' : ''}
              </Badge>
            )}
            <SortSelect value={sort} onChange={setSort} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters */}
          <Filters filters={filters} onChange={setFilters} />

          {/* Results */}
          <div className="flex-1 min-w-0">
            {loading && <LoadingState />}
            {error && <ErrorState message={error} onRetry={refetch} />}
            {!loading && !error && results && results.products.length === 0 && (
              <EmptyState />
            )}
            {!loading && !error && results && results.products.length > 0 && (
              <div className="space-y-4">
                {results.products.map((product) =>
                  product.offers.map((offer) => (
                    <OfferCard
                      key={offer.id}
                      offer={offer}
                      productName={product.name}
                      productImage={product.image}
                      productId={product.id}
                    />
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

