# Inventário de APIs Gratuitas

> Catálogo curado de **3.743 APIs e serviços com tier gratuito real**, organizadas em **111 categorias**, com busca instantânea, filtros inteligentes e tradução dinâmica entre **PT-BR, EN e ES**. HTML 100% autocontido — zero build, zero dependência, zero framework.

🌐 **[Abrir o catálogo](https://philipecomputacao.github.io/inventario-apis-gratuitas/inventario-apis.html)** &nbsp;·&nbsp; 🇺🇸 [English](https://philipecomputacao.github.io/inventario-apis-gratuitas/inventario-apis.html?lang=en) &nbsp;·&nbsp; 🇪🇸 [Español](https://philipecomputacao.github.io/inventario-apis-gratuitas/inventario-apis.html?lang=es)

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/deploy-GitHub%20Pages-blue.svg)](https://philipecomputacao.github.io/inventario-apis-gratuitas/)
[![i18n](https://img.shields.io/badge/i18n-PT--BR%20%7C%20EN%20%7C%20ES-orange.svg)](#-internacionalização)
[![APIs](https://img.shields.io/badge/APIs-3.743-brightgreen.svg)](#-números)
[![Gov BR](https://img.shields.io/badge/Gov%20BR-dedicado-yellow.svg)](#-apis-do-governo-brasileiro)
[![Maintained by @lpdigital.me](https://img.shields.io/badge/maintained%20by-%40lpdigital.me-E4405F.svg)](https://www.instagram.com/lpdigital.me/)

---

<table>
<tr>
<td width="120" align="center" valign="top">
<img src="./assets/perfil-300.jpg" width="100" height="100" alt="@lpdigital.me" style="border-radius: 50%;" />
</td>
<td valign="top">

**Curadoria e desenvolvimento por [@lpdigital.me](https://www.instagram.com/lpdigital.me/)** &mdash; Philipe compartilha APIs, automações e IA toda semana no Instagram. Manda um follow se o catálogo te ajudou.

</td>
</tr>
</table>

---

## ✨ Destaques

- 📚 **3.743 APIs** em 111 categorias — referência open-source em PT-BR
- 🇧🇷 **Seção dedicada de APIs do Governo Brasileiro** (BrasilAPI, Conecta gov.br, IBGE, BCB, CVM, IPEA, etc.)
- 🌍 **3 idiomas** (PT-BR, EN, ES) com switcher + URL param + auto-detect via navegador
- 🌗 **Light + Dark mode** com toggle 3-vias (Auto, Claro, Escuro), sem FOWT
- 🔍 **Busca em tempo real** com atalho `/`
- 🎯 **Filtros**: "Limite Gratuito" (11 categorias smart) + "Requer Chave?" (3 opções), com contadores
- 📦 **HTML 100% autocontido** em 5,1 MB — sem CDN, sem React, sem build
- 🌙 Funciona **offline** depois do primeiro carregamento
- 🖨️ Print-friendly (força tema claro, esconde controles)
- ♿ Acessível (ARIA, semântica HTML5, `prefers-reduced-motion`, `prefers-color-scheme`)

---

## 📊 Números

| Métrica | Valor |
|---|---|
| **APIs e serviços** | 3.743 |
| **Categorias** | 111 |
| **Fontes mineradas** | 8 principais |
| **Idiomas** | 3 (PT-BR, EN, ES) |
| **Tamanho HTML** | 5,1 MB |
| **Dependências externas** | 0 |
| **Build step** | 0 |

### Top 10 categorias por volume

| # | Categoria | APIs |
|---|---|---|
| 1 | Diversos | 421 |
| 2 | Desenvolvimento | 141 |
| 3 | 🇧🇷 Governo Brasileiro | 140 |
| 4 | Fontes Complementares Globais | 137 |
| 5 | APIs, Data and ML | 121 |
| 6 | Geolocalização | 99 |
| 7 | Jogos e HQs | 97 |
| 8 | Governo | 95 |
| 9 | Transporte | 83 |
| 10 | Provedores Cloud (Limites Gratis) | 76 |

---

## 🚀 Links rápidos

- 🌐 **Landing:** https://philipecomputacao.github.io/inventario-apis-gratuitas/
- 📂 **Catálogo direto:** https://philipecomputacao.github.io/inventario-apis-gratuitas/inventario-apis.html
- 🇺🇸 **English:** https://philipecomputacao.github.io/inventario-apis-gratuitas/inventario-apis.html?lang=en
- 🇪🇸 **Español:** https://philipecomputacao.github.io/inventario-apis-gratuitas/inventario-apis.html?lang=es
- 🐙 **GitHub:** https://github.com/philipecomputacao/inventario-apis-gratuitas

---

## 🇧🇷 APIs do Governo Brasileiro

Seção dedicada com APIs governamentais agrupadas por origem:

- **BrasilAPI** — endpoints abertos sem autenticação (CEP, CNPJ, CPF, IBGE, FIPE, B3, CVM, Câmbio, PIX, Feriados, DDD, ISBN, NCM, clima CPTEC)
- **Conecta gov.br** — Catálogo de APIs gov-a-gov (atenção: destinadas a órgãos públicos)
- **Dados Públicos** — IBGE, BCB, CVM, IPEA, ANATEL, ANP, CADE, TCU, CGU, DATASUS

> ⚠️ APIs do Conecta gov.br marcadas como **"Gov-a-Gov"** são para integração entre órgãos públicos. Para uso cidadão/dev/empresa, foque na **BrasilAPI**, **IBGE** e **BCB**.

---

## Como usar

1. Abra `inventario-apis.html` no navegador (ou acesse o link acima).
2. Use a barra de busca para filtrar por nome, categoria ou URL.
3. Pressione `/` para focar a busca rapidamente.
4. Clique no cabeçalho de uma categoria para expandir/recolher.
5. Use o seletor de idioma (canto superior) para alternar PT/EN/ES.
6. Use o seletor de tema para alternar claro/escuro/sistema.

---

## Estrutura do projeto

```
.
├── index.html                  # Landing page (cards + sidebar)
├── inventario-apis.html        # Catálogo principal (5,1 MB, autocontido)
├── README.md                   # Este arquivo
├── CHANGELOG.md                # Histórico de versões (Keep a Changelog)
├── LICENSE                     # MIT
├── categories.json             # Metadados de tradução das categorias
├── untranslated.json           # Status de tradução das APIs BR
├── .github/workflows/          # Sync automático main → gh-pages
├── assets/                     # Foto de perfil, ícones
├── extract-categories.js       # Script: extrai categorias do HTML
├── extract-untranslated.js     # Script: encontra APIs sem tradução
├── fix-columns.js              # Script: corrige formato das colunas
├── inject-categories.js        # Script: injeta categorias no HTML
├── inject-translations.js      # Script: injeta traduções no HTML
└── translate-untranslated.js   # Script: traduz APIs pendentes
```

---

## Manutenção

Scripts Node para regerar partes do catálogo:

```bash
# Extrair lista de categorias do HTML
node extract-categories.js

# Encontrar APIs sem tradução
node extract-untranslated.js

# Corrigir formato de colunas
node fix-columns.js

# Injetar categorias no HTML
node inject-categories.js

# Injetar traduções no HTML
node inject-translations.js

# Traduzir APIs pendentes (revise o dicionário antes)
node translate-untranslated.js
```

> 💡 Os scripts esperam o HTML em formato **minificado** (uma `<tr>` por linha). Pretty-print quebra os parsers por regex.

---

## 🚢 Deploy automático

O GitHub Pages serve da branch `gh-pages`, mas o desenvolvimento acontece em `main`. Um GitHub Action ([`.github/workflows/sync-gh-pages.yml`](.github/workflows/sync-gh-pages.yml)) faz fast-forward de `gh-pages` para `main` em cada push:

```
git push origin main → Action dispara → fast-forward gh-pages → site atualiza em ~30s
```

Se o sync falhar (`gh-pages` divergiu), basta rodar localmente:

```bash
git checkout gh-pages && git merge --ff-only main && git push origin gh-pages && git checkout main
```

---

## Tecnologias

- **HTML5** semântico
- **CSS3** com variáveis CSS (3 temas: claro, escuro, automático)
- **JavaScript** vanilla (ES2020+), sem frameworks
- **i18n** customizado em 3 idiomas, com fallback PT-BR
- **GitHub Actions** para sync `main` → `gh-pages`

---

## Fontes de dados

O catálogo agrega APIs de **8 fontes principais**:

- [public-apis/public-apis](https://github.com/public-apis/public-apis) — ~1.400 APIs (MIT)
- [n0shake/Public-APIs](https://github.com/n0shake/Public-APIs) — ~900 APIs
- [marcelscruz/public-apis](https://github.com/marcelscruz/public-apis) — fork mantido
- [TonnyL/Awesome_APIs](https://github.com/TonnyL/Awesome_APIs) — APIs awesome curadas
- [BrasilAPI/BrasilAPI](https://brasilapi.com.br/docs) — endpoints abertos BR
- [gov.br Catálogo Conecta](https://www.gov.br/conecta) — APIs gov-a-gov
- [free-for-dev](https://github.com/ripienaar/free-for-dev) — SaaS com free tier
- Fontes especializadas (KO/CN/IR/CL, Awesome ML APIs, etc.)

Veja `CHANGELOG.md` para o histórico de merges e contagens.

---

## Licença

MIT — veja [LICENSE](LICENSE).

Curadoria e desenvolvimento por **[@lpdigital.me](https://www.instagram.com/lpdigital.me/)**.
