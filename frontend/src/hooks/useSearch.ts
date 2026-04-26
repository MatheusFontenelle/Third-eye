import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchResult, SearchFilters, SortOption } from '@/types';
import { searchProducts } from '@/api/client';

interface UseSearchReturn {
  results: SearchResult | null;
  loading: boolean;
  error: string | null;
  filters: SearchFilters;
  sort: SortOption;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  setSort: React.Dispatch<React.SetStateAction<SortOption>>;
  refetch: () => void;
}

function parseFiltersFromParams(params: URLSearchParams): SearchFilters {
  return {
    brands: params.get('brands')?.split(',').filter(Boolean) || [],
    stores: params.get('stores')?.split(',').filter(Boolean) || [],
    conditions: (params.get('conditions')?.split(',').filter(Boolean) as SearchFilters['conditions']) || [],
    freeShippingOnly: params.get('freeShippingOnly') === 'true',
    minPrice: params.get('minPrice') ? Number(params.get('minPrice')) : undefined,
    maxPrice: params.get('maxPrice') ? Number(params.get('maxPrice')) : undefined,
    maxShippingDays: params.get('maxShippingDays') ? Number(params.get('maxShippingDays')) : undefined,
  };
}

function buildParamsFromFilters(params: URLSearchParams, filters: SearchFilters): URLSearchParams {
  const next = new URLSearchParams(params);

  if (filters.brands.length > 0) next.set('brands', filters.brands.join(','));
  else next.delete('brands');

  if (filters.stores.length > 0) next.set('stores', filters.stores.join(','));
  else next.delete('stores');

  if (filters.conditions.length > 0) next.set('conditions', filters.conditions.join(','));
  else next.delete('conditions');

  if (filters.freeShippingOnly) next.set('freeShippingOnly', 'true');
  else next.delete('freeShippingOnly');

  if (filters.minPrice !== undefined) next.set('minPrice', String(filters.minPrice));
  else next.delete('minPrice');

  if (filters.maxPrice !== undefined) next.set('maxPrice', String(filters.maxPrice));
  else next.delete('maxPrice');

  if (filters.maxShippingDays !== undefined) next.set('maxShippingDays', String(filters.maxShippingDays));
  else next.delete('maxShippingDays');

  return next;
}

export function useSearch(query: string): UseSearchReturn {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => parseFiltersFromParams(searchParams), [searchParams]);
  const sort = useMemo(() => (searchParams.get('sort') as SortOption) || 'price_asc', [searchParams]);

  const [results, setResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setFilters = useCallback(
    (value: React.SetStateAction<SearchFilters>) => {
      const newFilters = typeof value === 'function' ? value(filters) : value;
      setSearchParams((prev) => buildParamsFromFilters(prev, newFilters));
    },
    [filters, setSearchParams]
  );

  const setSort = useCallback(
    (value: React.SetStateAction<SortOption>) => {
      const newSort = typeof value === 'function' ? value(sort) : value;
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (newSort && newSort !== 'price_asc') next.set('sort', newSort);
        else next.delete('sort');
        return next;
      });
    },
    [sort, setSearchParams]
  );

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchProducts(query, filters, sort);
      setResults(data);
    } catch (err) {
      setError('Erro ao buscar produtos. Tente novamente.');
      setResults(null);
    } finally {
      setLoading(false);
    }
  }, [query, filters, sort]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    results,
    loading,
    error,
    filters,
    sort,
    setFilters,
    setSort,
    refetch: fetchData,
  };
}

