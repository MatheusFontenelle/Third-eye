# Guia Completo de Deploy — Third-eye

> **Objetivo:** Deploy do monorepo Third-eye com Frontend na **Vercel** e Backend (NestJS + PostgreSQL) na **Railway** (alternativa Render).

---

## A) Análise do Monorepo

### A.1) Comandos de Build/Run

| Projeto | Build | Start (dev) | Start (prod) |
|---------|-------|-------------|--------------|
| `frontend/` | `npm run build` → `tsc -b && vite build` | `npm run dev` | `npm run preview` |
| `backend/` | `npm run build` → `nest build` | `npm run start:dev` | `npm run start:prod` → `node dist/main` |

### A.2) Variáveis de Ambiente Existentes vs. Faltantes

**Backend (`backend/src/main.ts`)**
- `PORT` → já lido via `process.env.PORT`
- `CORS_ORIGIN` → já lido via `process.env.CORS_ORIGIN`
- `DATABASE_URL` → usado pelo Prisma (via `prisma/schema.prisma`)
- `NODE_ENV` → recomendado definir como `production`

**Frontend (`frontend/src/api/client.ts`)**
- `VITE_API_URL` → já lido via `import.meta.env.VITE_API_URL`

**Faltavam:** arquivos `.env.example` (criados), migration inicial do Prisma (criada), `postinstall` no `package.json` do backend (adicionado).

### A.3) Rotas Principais do Backend

| Rota | Método | Descrição |
|------|--------|-----------|
| `/api/v1/health` | `GET` | Health check |
| `/api/v1/products/search` | `GET` | Busca com filtros e paginação |
| `/api/v1/products/:id` | `GET` | Detalhes do produto |
| `/api/docs` | `GET` | Swagger UI (OpenAPI) |

---

## B) Deploy do FRONTEND na Vercel

### B.1) Configuração do Projeto na Vercel

1. Acesse [https://vercel.com](https://vercel.com) e faça login.
2. Clique em **"Add New..." → "Project"**.
3. Importe o repositório `MatheusFontenelle/Third-eye`.
4. Na tela de configuração, configure **exatamente**:

| Campo | Valor |
|-------|-------|
| **Framework Preset** | `Vite` |
| **Root Directory** | `frontend` |
| **Build Command** | `npm run build` (ou deixe o default do Vite) |
| **Output Directory** | `dist` |

5. Clique em **"Deploy"**.

### B.2) Variáveis de Ambiente no Vercel

1. No dashboard do projeto, vá em **"Settings" → "Environment Variables"**.
2. Adicione:

```
Key:    VITE_API_URL
Value:  https://<sua-url-do-backend>.up.railway.app
```

> Substitua pelo domínio público do backend após o deploy do Railway.

3. Clique **"Save"** e faça **redeploy** (ou commit/push novo).

### B.3) Como o Vite Usa `VITE_API_URL`

No código, já está configurado (`frontend/src/api/client.ts`):

```ts
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
```

O Vite expõe automaticamente variáveis com prefixo `VITE_` para o código. Nenhuma alteração adicional é necessária.

### B.4) Verificar se o Frontend Não Usa Mock

Os hooks já importam da API real:
- `frontend/src/hooks/useSearch.ts` → `import { searchProducts } from '@/api/client'`
- `frontend/src/hooks/useProduct.ts` → `import { getProduct } from '@/api/client'`

O arquivo `mockApi.ts` existe mas **não está sendo usado**. Nenhuma troca é necessária.

---

## C) Deploy do BACKEND na Railway (Preferencial)

### C.1) Criar Projeto e Conectar Repo

1. Acesse [https://railway.app](https://railway.app) e faça login.
2. Clique em **"New Project"**.
3. Selecione **"Deploy from GitHub repo"**.
4. Escolha `MatheusFontenelle/Third-eye`.

### C.2) Configurar Serviço do Backend

1. Dentro do projeto, clique em **"Add a Service" → "GitHub Repo"**.
2. Selecione o repo novamente (ou se já aparecer, clique nele).
3. Clique no serviço criado e vá em **"Settings"**.
4. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `npx prisma generate && npm run build`
   - **Start Command:** `npx prisma migrate deploy && npm run start:prod`

> Alternativamente, o `railway.json` já existe no repo e pode ser usado. Se quiser usar o JSON, vá em **"Settings" → "Deploy"** e certifique-se de que o Railway está lendo o `railway.json`.

### C.3) Criar Banco PostgreSQL

1. No projeto Railway, clique em **"New" → "Database" → "Add PostgreSQL"**.
2. Aguarde a criação (status verde).
3. Clique no banco criado → aba **"Connect"**.
4. Copie a variável `DATABASE_URL` (formato: `postgresql://postgres:...`).

### C.4) Configurar Variáveis de Ambiente

1. Clique no serviço do backend → **"Variables"**.
2. Clique em **"New Variable"** e adicione:

| Variável | Valor | Origem |
|----------|-------|--------|
| `DATABASE_URL` | Cole a URL do PostgreSQL | Railway gera automaticamente se você linkar o banco |
| `NODE_ENV` | `production` | Manual |
| `CORS_ORIGIN` | `https://<seu-front>.vercel.app` | Manual (URL do frontend na Vercel) |
| `PORT` | Railway injeta automaticamente | Automático (Railway) |

> **Dica:** Para linkar automaticamente, clique em **"New Variable" → "Add Reference"** e selecione o banco PostgreSQL → `DATABASE_URL`.

### C.5) Comandos de Deploy (Resumo)

```bash
# Instalação
npm ci

# Build (inclui geração do Prisma Client)
npx prisma generate && npm run build

# Start (aplica migrations e sobe o servidor)
npx prisma migrate deploy && npm run start:prod
```

O `railway.json` já configurado:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npx prisma generate && npm run build"
  },
  "deploy": {
    "startCommand": "npx prisma migrate deploy && npm run start:prod",
    "healthcheckPath": "/api/v1/health",
    "healthcheckTimeout": 30,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 3
  }
}
```

### C.6) Prisma em Produção

Ao fazer deploy, o Railway executa automaticamente:
1. `npx prisma generate` — gera o client Prisma
2. `npm run build` — build do NestJS
3. `npx prisma migrate deploy` — aplica migrations pendentes
4. `npm run start:prod` — sobe o servidor

**Seed (opcional):**
- O seed popula o banco com 60 produtos e 8 lojas.
- Para rodar manualmente após o primeiro deploy:
  1. No Railway, vá no serviço do backend → **"Deployments"**.
  2. Clique nos **três pontos** da última deploy → **"Shell"**.
  3. Execute: `npx prisma db seed`
- **Quando usar:** execute apenas uma vez após a primeira migração para ter dados de exemplo.
- **Nota:** `ts-node` foi adicionado às `dependencies` do `backend/package.json` para garantir que o seed funcione no shell de produção da Railway/Render.

### C.7) Arquivos Existentes (não precisa criar novos)

- `backend/railway.json` ✅
- `backend/Procfile` ✅ (fallback se usar Heroku-style, mas Railway prioriza `railway.json`)

---

## D) Alternativa: Deploy no Render

Se a Railway não funcionar, use o Render.

### D.1) Criar Web Service (Backend)

1. Acesse [https://render.com](https://render.com) e faça login.
2. No Dashboard, clique em **"New" → "Web Service"**.
3. Conecte o repo `MatheusFontenelle/Third-eye`.
4. Configure:

| Campo | Valor |
|-------|-------|
| **Name** | `third-eye-api` |
| **Root Directory** | `backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm ci && npx prisma generate && npm run build` |
| **Start Command** | `npx prisma migrate deploy && npm run start:prod` |
| **Plan** | Free (ou Starter) |

5. Clique **"Create Web Service"**.

### D.2) Criar Banco PostgreSQL

1. Dashboard → **"New" → "PostgreSQL"**.
2. Nome: `third-eye-db`.
3. Plano: Free (ou Starter).
4. Clique **"Create Database"**.
5. Após criar, copie o **"Internal Database URL"** ou **"External Database URL"**.

### D.3) Variáveis de Ambiente no Render

1. No Web Service, vá em **"Environment"**.
2. Adicione:

```
DATABASE_URL    → postgresql://... (URL do banco Render)
NODE_ENV        → production
CORS_ORIGIN     → https://<seu-front>.vercel.app
```

> O Render injeta `PORT` automaticamente.

### D.4) Migrations no Render

O comando de start já inclui `npx prisma migrate deploy`. Para rodar seed manualmente:
1. Web Service → **"Shell"** (aba no topo).
2. Execute: `npx prisma db seed`

---

## E) Checklist Final + Troubleshooting

### E.1) Checklist de Deploy

- [ ] Migration inicial criada em `backend/prisma/migrations/`
- [ ] `postinstall` adicionado ao `backend/package.json`
- [ ] `.env.example` criado em `backend/` e `frontend/`
- [ ] Frontend deployado na Vercel com `VITE_API_URL` configurada
- [ ] Backend deployado na Railway/Render com `DATABASE_URL`
- [ ] `CORS_ORIGIN` apontando para a URL exata do frontend (sem `/` no final)
- [ ] Banco PostgreSQL criado e conectado
- [ ] Seed executado (se quiser dados de exemplo)

### E.2) Testes via curl

Substitua `https://<backend-url>` pela URL pública do backend.

**1. Health Check:**
```bash
curl https://<backend-url>/api/v1/health
# Esperado: {"status":"ok"}
```

**2. Busca de Produtos:**
```bash
curl "https://<backend-url>/api/v1/products/search?q=iphone&sort=price_asc&page=1&pageSize=20"
# Esperado: JSON com { products, total, query, page, pageSize }
```

**3. Detalhes do Produto:**
```bash
# Pegue um ID do resultado acima e substitua
curl https://<backend-url>/api/v1/products/<ID_AQUI>
# Esperado: JSON do produto com offers e priceHistory
```

### E.3) Troubleshooting

#### ❌ CORS errado (erro no console do browser)
- **Sintoma:** `Access-Control-Allow-Origin` missing ou URL diferente.
- **Causa:** `CORS_ORIGIN` no backend não bate com a URL do frontend.
- **Correção:**
  1. Vá nas variáveis de ambiente do backend.
  2. Ajuste `CORS_ORIGIN=https://<seu-front>.vercel.app` (exato, sem `/` no final).
  3. Redeploy o backend.
  4. Se quiser testar rapidamente, pode usar `*` (não recomendado para produção).

#### ❌ 404 em `/api/v1/...`
- **Sintoma:** `Cannot GET /api/v1/health`.
- **Causa:** O Nest está configurado com `app.setGlobalPrefix('api/v1')`, mas algum proxy pode estar removendo o prefixo.
- **Correção:** Verifique se a URL chamada inclui `/api/v1`. Teste direto pelo curl.

#### ❌ Prisma não conecta
- **Sintoma:** Erro `P1001` (can't reach database) ou `P1003` (database does not exist).
- **Causa:** `DATABASE_URL` incorreta ou banco não está acessível.
- **Correção:**
  1. Verifique se a URL está completa (inclui usuário, senha, host, porta, database).
  2. No Railway/Render, use a variável de referência do banco, não copie manualmente.
  3. Certifique-se de que o banco está no mesmo projeto/region que o backend.

#### ❌ Migração não rodou
- **Sintoma:** Tabelas não existem (erro 500 em rotas que consultam o banco).
- **Causa:** `prisma migrate deploy` não executou ou falhou.
- **Correção:**
  1. Railway: acesse o **Shell** do serviço e rode manualmente:
     ```bash
     npx prisma migrate deploy
     ```
  2. Render: abra o **Shell** do Web Service e rode o mesmo comando.
  3. Verifique se a pasta `prisma/migrations/` existe no repo e foi commitada.

#### ❌ Variável `VITE_API_URL` não aplicada
- **Sintoma:** Frontend ainda chama `localhost:3000`.
- **Causa:** Vite incorpora as variáveis no momento do build.
- **Correção:**
  1. Vercel → Settings → Environment Variables → confirme que `VITE_API_URL` está lá.
  2. Faça **Redeploy** (o Vite precisa rebuildar para pegar a nova variável).
  3. No frontend, nunca use `process.env` — sempre `import.meta.env.VITE_API_URL`.

#### ❌ Seed falha no deploy
- **Sintoma:** Banco vazio, nenhum produto retornado.
- **Causa:** Seed não foi executado (não roda automaticamente no `railway.json`).
- **Correção:** Execute manualmente via shell:
  ```bash
  npx prisma db seed
  ```

---

## F) Resumo dos Ajustes no Código

### F.1) `backend/package.json` (adicionado `postinstall`)
```json
{
  "scripts": {
    "postinstall": "prisma generate",
    "build": "nest build",
    ...
  }
}
```

### F.2) `backend/prisma/migrations/` (criada migration inicial)
- Pasta criada: `backend/prisma/migrations/20250116120000_init/`
- Arquivo: `migration.sql` (com DDL completo das tabelas, índices e FKs)
- Arquivo: `backend/prisma/migrations/migration_lock.toml`

### F.3) `.env.example` criados
- `backend/.env.example`
- `frontend/.env.example`

---

## H) Correções de Segurança Aplicadas

### H.1) Backend
1. **Helmet** (`helmet`) — headers de segurança HTTP adicionados (`X-Content-Type-Options`, `X-Frame-Options`, etc.)
2. **Rate Limiting** (`@nestjs/throttler`) — limite de 100 requisições/minuto por IP
3. **CORS restritivo** — em produção, CORS só é habilitado se `CORS_ORIGIN` estiver definido; `*` nunca é usado em `NODE_ENV=production`
4. **Swagger desabilitado em produção** — docs expostos apenas em desenvolvimento
5. **Filtro global de exceções** (`AllExceptionsFilter`) — captura erros não-HTTP e evita vazamento de stack traces em produção
6. **Validação de query** — `@MaxLength(100)` no parâmetro `q` de busca para prevenir DoS

### H.2) Frontend
1. **Validação de URLs** (`frontend/src/utils/validateUrl.ts`) — rejeita `javascript:`, `data:`, `vbscript:` e outras URIs perigosas
2. **Imagens sanitizadas** — todas as URLs de imagem passam por `safeUrl()` antes de serem renderizadas
3. **Links externos protegidos** — todos os `window.open` usam `safeUrl()` + `'noopener,noreferrer'`

---

## G) Próximos Passos Recomendados

1. **Commit e push** de todas as alterações (migrations, `.env.example`, `package.json`).
2. **Deploy o backend primeiro** na Railway para obter a URL pública.
3. **Configure `VITE_API_URL`** no Vercel com a URL do backend.
4. **Deploy o frontend** na Vercel.
5. **Rode o seed** manualmente no Railway (shell) para popular o banco.
6. **Teste** com os comandos curl listados acima.

