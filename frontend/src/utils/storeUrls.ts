/**
 * Gera URLs de busca reais para cada loja com o nome do produto.
 * Como os dados são mockados, redirecionamos para a busca real da loja.
 */

export function generateProductUrl(store: string, _productId: string, productName: string): string {
  const query = encodeURIComponent(productName);

  switch (store) {
    case 'Kabum':
      return `https://www.kabum.com.br/busca?q=${query}`;
    case 'Pichau':
      return `https://www.pichau.com.br/search?q=${query}`;
    case 'Terabyte Shop':
      return `https://www.terabyteshop.com.br/busca?busca=${query}`;
    case 'Mercado Livre':
      return `https://www.mercadolivre.com.br/busca?q=${query}`;
    case 'AliExpress':
      return `https://pt.aliexpress.com/wholesale?SearchText=${query}`;
    case 'Amazon':
      return `https://www.amazon.com.br/s?k=${query}`;
    default:
      return `https://www.google.com/search?q=${query}`;
  }
}

