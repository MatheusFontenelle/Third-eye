import { useState, useEffect, useCallback } from 'react';
import { SearchResult, SearchFilters, SortOption } from '@/types';
import { searchProducts } from '@/api/mockApi';

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

export function useSearch(query: string): UseSearchReturn {
  const [results, setResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    brands: [],
    stores: [],
    conditions: [],
    freeShippingOnly: false,
  });
  const [sort, setSort] = useState<SortOption>('price_asc');

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

