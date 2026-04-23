import { useState, useEffect } from 'react';
import { Product } from '@/types';
import { getProduct } from '@/api/mockApi';

interface UseProductReturn {
  product: Product | null;
  loading: boolean;
  error: string | null;
}

export function useProduct(id: string): UseProductReturn {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchProduct() {
      setLoading(true);
      setError(null);
      try {
        const data = await getProduct(id);
        if (!cancelled) {
          if (data) {
            setProduct(data);
          } else {
            setError('Produto não encontrado.');
            setProduct(null);
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError('Erro ao carregar o produto. Tente novamente.');
          setProduct(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchProduct();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { product, loading, error };
}

