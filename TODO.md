# TODO - Correções Críticas Third-eye

## Concluídas ✅
- [x] 1. Fix performance/pagination em `products.service.ts` — Server-side pagination com `take`/`skip`, `Promise.all` com count, limite de 5 offers e 30 priceHistory
- [x] 2. Fix CORS inseguro em `main.ts` — `origin: '*'` removido, agora usa `['http://localhost:5173', 'http://localhost:3000']` em dev
- [x] 3. Fix rate limiting em `app.module.ts` — Split em `short` (10 req/s) e `long` (200 req/min)
- [x] 4. Fix console.log em prod em `logging.interceptor.ts` — Agora só loga em ambiente não-prod

## Pendentes
- [ ] 5. Add CSP meta tag no `index.html`
- [ ] 6. Brands filter no backend (já existe no DTO mas precisa testar)
- [ ] 7. Testar build do backend (`npm run build`)
- [ ] 8. Testar build do frontend (`npm run build`)
