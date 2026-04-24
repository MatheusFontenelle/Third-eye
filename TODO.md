# TODO - Correção de Redirecionamento de Produtos

## Problema
O site não está direcionando para os links certos dos produtos. A página `/product/:id` existe mas não há links acessíveis para ela nos resultados de busca.

## Plano de Correção

### Passos
1. [x] Atualizar `OfferCard.tsx` para receber `productId` e adicionar links para a página do produto
2. [x] Atualizar `SearchPage.tsx` para passar `productId` para cada `OfferCard`
3. [x] Adicionar Amazon Brasil como loja nos dados (backend seed e frontend mock)
4. [x] Adicionar 30 modelos AMD Radeon RX aos dados mock (RX 580 a RX 9070 XT)
5. [ ] Testar navegação clicando no nome/imagem do produto

## Arquivos Editados
- `frontend/src/components/OfferCard.tsx`
- `frontend/src/pages/SearchPage.tsx`
- `backend/prisma/seed.ts`
- `frontend/src/data/mock.ts`

