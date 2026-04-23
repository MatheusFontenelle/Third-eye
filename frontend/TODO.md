# Polimento UI/UX — TODO

## Phase 1: Design System & Config
- [x] tailwind.config.js — trocar primary para verde (#059669), adicionar fontFamily Inter
- [x] src/index.css — importar Google Fonts Inter, custom utilities

## Phase 2: Componentes Base UI
- [x] src/components/ui/Button.tsx — variants: primary, secondary, ghost
- [x] src/components/ui/Input.tsx — focus ring verde, ícone opcional
- [x] src/components/ui/Card.tsx — wrapper com sombra, borda, padding
- [x] src/components/ui/Badge.tsx — variants: success, info, warning, neutral, price

## Phase 3: Refatorar Componentes Existentes
- [x] src/components/SearchBar.tsx — usar Input, ajustar sombra hero
- [x] src/components/OfferCard.tsx — usar Card, Badge, Button; melhorar preço
- [x] src/components/Filters.tsx — usar Card, checkbox modernos
- [x] src/components/LoadingState.tsx — skeleton cards
- [x] src/components/EmptyState.tsx — sugestões + CTA
- [x] src/components/ErrorState.tsx — tom amigável
- [x] src/components/RatingBadge.tsx — estrelas mais visuais
- [x] src/components/PriceRange.tsx — usar Input
- [x] src/components/SortSelect.tsx — select mais limpo

## Phase 4: Refatorar Pages
- [x] src/pages/HomePage.tsx — hero com headline forte, "Por que usar?", social proof
- [x] src/pages/SearchPage.tsx — header refinado, contador visível
- [x] src/pages/ProductPage.tsx — galeria refinada, specs, melhor oferta

## Phase 5: Build & Test
- [x] npm run build — verificar erros
- [x] npm run dev — reiniciar servidor

