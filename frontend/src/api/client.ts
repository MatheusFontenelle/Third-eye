import { Product, SearchResult, SearchFilters, SortOption } from '@/types';
import * as mockApi from './mockApi';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || `HTTP ${response.status}`);
  }

  return response.json() as Promise<T>;
}

function buildQueryString(
  q: string,
  filters: SearchFilters,
  sort: SortOption,
  page = 1,
  pageSize = 20
): string {
  const params = new URLSearchParams();

  if (q.trim()) params.set('q', q.trim());
  if (filters.minPrice !== undefined) params.set('minPrice', String(filters.minPrice));
  if (filters.maxPrice !== undefined) params.set('maxPrice', String(filters.maxPrice));
  if (filters.stores.length > 0) params.set('stores', filters.stores.join(','));
  if (filters.conditions.length > 0) params.set('conditions', filters.conditions.join(','));
  if (filters.maxShippingDays !== undefined) params.set('maxShippingDays', String(filters.maxShippingDays));
  if (filters.freeShippingOnly) params.set('freeShippingOnly', 'true');
  if (filters.brands.length > 0) {
    // Backend atual nao suporta brands; enviamos mesmo assim para quando suportar
    params.set('brands', filters.brands.join(','));
  }

  params.set('sort', sort);
  params.set('page', String(page));
  params.set('pageSize', String(pageSize));

  return params.toString();
}

export async function searchProducts(
  q: string,
  filters: SearchFilters,
  sort: SortOption,
  page = 1,
  pageSize = 20
): Promise<SearchResult> {
  if (USE_MOCK) {
    return mockApi.searchProducts(q, filters, sort);
  }

  const qs = buildQueryString(q, filters, sort, page, pageSize);
  const url = `${API_URL}/api/v1/products/search?${qs}`;
  try {
    return await fetchJson<SearchResult>(url);
  } catch {
    // Fallback para mock se API estiver indisponível
    return mockApi.searchProducts(q, filters, sort);
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  if (USE_MOCK) {
    return mockApi.getProduct(id);
  }

  const url = `${API_URL}/api/v1/products/${id}`;
  try {
    return await fetchJson<Product>(url);
  } catch (err: any) {
    if (err.message?.includes('404') || err.message?.includes('NOT_FOUND')) {
      return null;
    }
    // Fallback para mock se API estiver indisponível
    return mockApi.getProduct(id);
  }
}

export async function checkHealth(): Promise<{ status: string }> {
  const url = `${API_URL}/api/v1/health`;
  try {
    return await fetchJson<{ status: string }>(url);
  } catch {
    return { status: 'unavailable' };
  }
}

