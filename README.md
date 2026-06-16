# Inventário de APIs Gratuitas

Catálogo curado de **3.815 APIs públicas** organizadas em **112 categorias**, com busca instantânea, filtros e tradução dinâmica entre **PT-BR, EN e ES**.

🌐 **[Abrir o catálogo](https://philipecomputacao.github.io/inventario-apis-gratuitas/inventario-apis.html)**

## Estatísticas

- **3.815 APIs** catalogadas (junho/2026)
- **112 categorias** organizadas (IA/ML, Finanças, Governo, etc.)
- **100% offline** — HTML autocontido (5,2 MB)
- **3 idiomas**: PT-BR, EN, ES
- **0 dependências externas** (zero CDN, zero build)

## Como usar

1. Abra `inventario-apis.html` no navegador (ou acesse o link acima).
2. Use a barra de busca para filtrar por nome, categoria ou URL.
3. Pressione `/` para focar a busca rapidamente.
4. Clique no cabeçalho de uma categoria para expandir/recolher.
5. Use o seletor de idioma (canto superior) para alternar PT/EN/ES.
6. Use o seletor de tema para alternar claro/escuro/sistema.

## Estrutura do projeto

```
.
├── index.html                  # Landing page (cards + sidebar)
├── inventario-apis.html        # Catálogo principal (5,2 MB, autocontido)
├── README.md                   # Este arquivo
├── CHANGELOG.md                # Histórico de versões (Keep a Changelog)
├── LICENSE                     # MIT
├── categories.json             # Metadados das categorias
├── untranslated.json           # Status de tradução das APIs
├── .github/workflows/          # Sync automático para GitHub Pages
├── assets/                     # Ícones, screenshots
├── extract-categories.js       # Script: extrai categorias do HTML
├── extract-untranslated.js     # Script: encontra APIs sem tradução
├── fix-columns.js              # Script: corrige formato das colunas
├── inject-categories.js        # Script: injeta categorias no JSON
├── inject-translations.js      # Script: injeta traduções no HTML
└── translate-untranslated.js   # Script: traduz APIs pendentes
```

## Fontes de dados

O catálogo agrega APIs de **8 fontes principais**:

- [public-apis/public-apis](https://github.com/public-apis/public-apis) (~1.400 APIs)
- [n0shake/Public-APIs](https://github.com/n0shake/Public-APIs) (~900 APIs)
- [APIs.io](https://apis.io/)
- [API List](https://apilist.fun/)
- [ProgrammableWeb](https://www.programmableweb.com/)
- [RapidAPI Hub](https://rapidapi.com/hub)
- Governo Brasileiro (dados.gov.br, IBGE, BCB, etc.)
- Fontes especializadas (Awesome APIs, etc.)

Veja `CHANGELOG.md` para a lista completa e histórico de merges.

## Manutenção

Para regerar partes do catálogo a partir dos scripts Node:

```bash
# Extrair lista de categorias do HTML
node extract-categories.js

# Encontrar APIs sem tradução
node extract-untranslated.js

# Corrigir formato de colunas
node fix-columns.js

# Injetar categorias no JSON
node inject-categories.js

# Injetar traduções no HTML
node inject-translations.js

# Traduzir APIs pendentes (requer revisão manual do dicionário)
node translate-untranslated.js
```

> Os scripts esperam o HTML em formato **minificado** (uma `<tr>` por linha). Pretty-print quebra os parsers por regex.

## Tecnologias

- **HTML5** semântico
- **CSS3** com variáveis (3 temas: claro, escuro, automático)
- **JavaScript** vanilla (ES2020+), sem frameworks
- **i18n** customizado em 3 idiomas
- **GitHub Actions** para deploy automático em `gh-pages`

## Licença

MIT — veja [LICENSE](LICENSE).
