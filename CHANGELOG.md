# Changelog

Todas as mudancas notaveis neste projeto.

O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/),
e este projeto segue [Semantic Versioning](https://semver.org/spec/v2.0.0.html) (informal).

## [Unreleased] - 2026-06-27

### Adicionado

- **Servidores MCP (Model Context Protocol)**: 462 servidores (457 únicos) gratuitos / open source agregados de [mcpservers.org](https://mcpservers.org), distribuidos em 16 categorias:
  - Servidores MCP - Desenvolvimento (50)
  - Servidores MCP - Pesquisa (44)
  - Servidores MCP - Banco de Dados (40)
  - Servidores MCP - Produtividade (37)
  - Servidores MCP - Outros (33)
  - Servidores MCP - Web Scraping (30)
  - Servidores MCP - Sistema de Arquivos (30)
  - Servidores MCP - Controle de Versão (30)
  - Servidores MCP - Memoria (29)
  - Servidores MCP - Marketing (28)
  - Servidores MCP - Comunicacao (27)
  - Servidores MCP - Finanças (26)
  - Servidores MCP - Servico de Nuvem (23)
  - Servidores MCP - Armazenamento em Nuvem (22)
  - Servidores MCP - Design (11)
  - Servidores MCP - Governo Brasileiro (2)
- **Traducoes PT-BR/EN/ES** para todas as 462 entradas (marcadas com `[EN-AUTO]`/`[ES-AUTO]` para revisao)
- **16 novos links no sidebar** com emojis proprios
- **Script `inject-mcp-servers.py`** (Python, idempotente, com `--replace` para re-execução)

### Mudado

- **Total de APIs**: 3.743 -> 4.205 (+462)
- **Categorias**: 111 -> 127 (+16)
- **Fontes**: 8 -> 9 (adicionado mcpservers.org)
- **Tamanho HTML**: 5.1 MB -> ~6.2 MB
- **page.title** atualizado de "3743" para "4205" em todos os contadores
- **index.html (landing page)**: contadores 3.864 -> 4.205, categorias 112 -> 127, fontes 15 -> 16, tamanho 5.0 MB -> 5.9 MB, adicionado mcpservers.org em hero + secao Fontes + footer (PT/EN/ES)
- **i18n landing page**: traducoes EN e ES adicionadas para source8 ("mcpservers.org")

---

## [Unreleased] - 2026-06-16

### Adicionado

- **Multi-source merge**: 562 APIs integradas de 15 fontes curadas (TonnyL, marcelscruz, dl0312/open-apis-korea, yybmion, juanbrujo, llf007, Hameds, jaegeral, Rolstenhouse, cyberboysumanjay, tools-collection, foss42, cporter202, cporter202-social-media)
- **Secao IoT** nova (9 APIs: Automatic, LIFX, LightwaveRF, Mojio, microBees, Homey, Neurio, Yeelight)
- **Apify** e **RapidAPI Hub** como entradas agregadoras (substituem 2.398 scrapers individuais)
- **Filtro "Limite Gratuito"** com 11 categorias smart (Varia conforme plano, Com limite, Tier gratuito, etc)
- **Filtro "Requer Chave?"** com 3 checkboxes (Sim, Nao, Desconhecido)
- **Botao "Limpar filtros"** com contadores de filtros ativos por grupo
- **Author badge** com foto do autor e link pro Instagram (@lpdigital.me), avatar com borda gradient estilo Instagram Stories
- **Favicon** com foto do autor (PNG 32x32 + apple-touch-icon 180x180 inline em base64)
- **Sidebar link** para secao Governo Brasileiro com bandeira BR
- **i18n keys** para filtros (`filter.limit.*`, `filter.key.*`, `filter.clear`) em 3 idiomas
- **Aria-label** e **title** em todos os links do sidebar

### Mudado

- **Total de APIs**: 3.194 -> 3.743 (+549 em 2 batches de merge, -113 dedup de slug/URL)
- **Categorias**: 111 -> 111 (3 orfas removidas: Fontes Complementares BR, Fontes Complementares Globais, Governo BR)
- **Tamanho HTML**: 2.6 MB -> 5.2 MB
- **page.title** em PT-BR atualizado de "3194" para "3743"
- **badge.source** agora indica "15 listas curadas (ver README)" em vez de só 2 fontes
- **i18n selector** corrigido: `[data-i18n]` expandido para `[data-i18n], [data-i18n-html]` (fix de bug que ignorava tags HTML em traducoes)

### Traducoes

- 3.624 observacoes de APIs traduzidas para PT-BR e ES via Google Translate publico (deep-translator)
- 115 descricoes de APIs traduzidas (KO/ZH/IR/ES -> EN) via MyMemory + Lingva
- Hero text em 3 idiomas atualizado para mencionar 15 fontes

### Corrigido

- **README.md** reescrito do zero (estava corrompido com texto nao-Markdown)
- **Contadores do sidebar** no `index.html` corrigidos (15 de 17 estavam errados)
- **41 colisoes de slug** removidas (mesmo `data-api-key` em 2+ linhas)
- **72 URLs duplicadas** removidas (mesma URL com nomes diferentes)
- **3 categorias orfas** removidas do `CATEGORIES_TRANSLATIONS` e `categories.json`

## [1.0.0] - 2026-06-13

### Adicionado

- Catalogo inicial: 3.194 APIs em 111 categorias
- 182 APIs do Governo Brasileiro (BrasilAPI + Conecta gov.br + bases publicas)
- 211 APIs complementares (n0shake, marcelomaia, Complementares)
- 3 idiomas (PT-BR, EN, ES) com i18n completo
- Light + Dark mode com toggle 3-vias (Auto/Light/Dark)
- Busca em tempo real com atalho `/`
- Sidebar sticky com auto-highlight via IntersectionObserver
- 109 APIs do n0shake/Public-APIs integradas (categorias: redes-sociais, analise-de-texto, musica, financas, compras, etc)

### Tecnico

- HTML5 semantico com ARIA
- CSS3 com custom properties (light/dark)
- JavaScript vanilla ES6+, zero framework
- GitHub Pages com branch `gh-pages`
- `git --separate-git-dir` para Drive sync

---

## Tipos de mudanca

- **Adicionado** - novas funcionalidades
- **Mudado** - mudancas em funcionalidades existentes
- **Descontinuado** - funcionalidades que vao ser removidas em breve
- **Removido** - funcionalidades removidas
- **Corrigido** - bugfixes
- **Seguranca** - correcoes de vulnerabilidade

## Fontes de dados (atual)

### Principais (8)
- public-apis/public-apis (1.563)
- ripienaar/free-for-dev (1.238)
- BrasilAPI (43)
- Catalogo Conecta gov.br (90+)
- n0shake/Public-APIs (109)
- marcelomaia/awesome-apis (~250)
- Apify (agregador)
- RapidAPI Hub (agregador)

### Especializadas (7)
- TonnyL/Awesome_APIs (China)
- dl0312/open-apis-korea (Coreia)
- yybmion/public-apis-4Kr (Coreia)
- llf007/public-apis-cn (China)
- juanbrujo/listado-apis-publicas-en-chile (Chile)
- Hameds/APIs-made-in-Iran (Ira)
- jaegeral/security-apis (Seguranca/CTI)

### Excluidas
- OAI/OpenAPI-Specification (spec, nao lista)
- Byron/google-apis-rs (codigo auto-gerado)
- cporter202/scraping-apis-for-devs (scrapers agregados via Apify)
- cporter202/social-media-scraping-apis (scrapers agregados via Apify)
