# Inventario de APIs Gratuitas

> Catalogo massivo e curado de **2.983+ APIs e servicos gratuitos** em **109 categorias** &mdash; incluindo 182 APIs do Governo Brasileiro, 3 idiomas, dark mode, busca em tempo real, e HTML 100% autocontido.

🌐 **Live:** https://philipecomputacao.github.io/inventario-apis-gratuitas/

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/deploy-GitHub%20Pages-blue.svg)](https://pages.github.com/)
[![i18n](https://img.shields.io/badge/i18n-PT--BR%20%7C%20EN%20%7C%20ES-orange.svg)](#-internacionalizacao)
[![APIs](https://img.shields.io/badge/APIs-2%2C983%2B-brightgreen.svg)](#-numeros)
[![Gov BR](https://img.shields.io/badge/Gov%20BR-182%20APIs-yellow.svg)](#-apis-do-governo-brasileiro)
[![Maintained by @lpdigital.me](https://img.shields.io/badge/maintained%20by-%40lpdigital.me-E4405F.svg)](https://www.instagram.com/lpdigital.me/)

---

## ✨ Destaques

- 📚 **2.983+ APIs** em 109 categorias &mdash; a maior referencia open-source em PT-BR
- 🇧🇷 **182 APIs do Governo Brasileiro** (BrasilAPI, Conecta gov.br, IBGE, BCB, CVM, IPEA, ANATEL, ANP, TCU, CGU, DATASUS, Comprasnet, Camara, Senado)
- 🌍 **3 idiomas** com switcher pill group (PT-BR, EN, ES) &mdash; URL param, localStorage, auto-detect
- 🌗 **Light + Dark mode** com toggle 3-vias (Auto, Light, Dark)
- 🔍 **Busca em tempo real** com atalho `/`
- 📦 **HTML 100% autocontido** &mdash; zero build, zero dependencia, zero framework
- 🌙 Funciona **offline** depois do primeiro carregamento
- 🖨️ Print-friendly (forca tema claro)
- ♿ Acessivel (ARIA, semantica, prefers-reduced-motion)

---

## 📊 Numeros

| | Quantidade | Detalhes |
|---|---|---|
| **APIs e servicos** | 2.983+ | Em 109 categorias |
| **APIs do Governo Brasileiro** | 182 | 11 subcategorias |
| **Limites gratuitos conhecidos** | ~270 | Exatos (ex: 50 req/h, 5 GB, 1k req/dia) |
| **Idiomas** | 3 | PT-BR (default), EN, ES |
| **Tamanho HTML** | 2.0 MB | Self-contained |
| **Dependencias externas** | 0 | Sem React, Bootstrap, jQuery |
| **Build step** | 0 | HTML+CSS+JS puros |

---

## 🚀 Links Rapidos

- 🌐 **Site:** https://philipecomputacao.github.io/inventario-apis-gratuitas/
- 📂 **Catalogo direto:** https://philipecomputacao.github.io/inventario-apis-gratuitas/inventario-apis.html
- 🇺🇸 **English version:** https://philipecomputacao.github.io/inventario-apis-gratuitas/?lang=en
- 🇪🇸 **Version Espanol:** https://philipecomputacao.github.io/inventario-apis-gratuitas/?lang=es
- 🐙 **Codigo fonte:** https://github.com/philipecomputacao/inventario-apis-gratuitas
- 📷 **Instagram:** https://www.instagram.com/lpdigital.me/

---

## 🏗️ Estrutura do Repositorio

```text
.
+- index.html              # Landing page (GitHub Pages entrypoint)
+- inventario-apis.html    # Catalogo massivo (2.983+ APIs, ~2.0 MB)
+- assets/                 # Foto de perfil e favicons
+- README.md               # Este arquivo
+- LICENSE                 # MIT
+- CHANGELOG.md            # Historico de versoes
+- .gitignore
+- .github/
   +- ISSUE_TEMPLATE/      # Templates de issue (bug, feature)
   +- PULL_REQUEST_TEMPLATE.md
   +- FUNDING.yml          # Apoie via @lpdigital.me
```

---

## 🇧🇷 APIs do Governo Brasileiro

A secao `#governo-brasileiro` do catalogo reune **182 APIs governamentais** em 11 subcategorias:

| Subcategoria | APIs em destaque |
|---|---|
| **BrasilAPI** | 43 endpoints: CEP, CNPJ, CPF, IBGE, FIPE, B3, CVM, Cambio, Taxas, PIX, Feriados, DDD, ISBN, NCM, TUSS, clima CPTEC. **Sem autenticacao** |
| **Identidade Digital** | Login Unico gov.br, gov.br ID, Cadastro CPF, CadUnico, BPC, ID Jovem, PCD, INSS |
| **Empresas & Negocios** | CNPJ, CADASTUR, CND, CADE |
| **Saude** | CNS/CADSUS, RNDS, TUSS, COVID |
| **Agricultura/Ambiental** | INCRA (SIGEF/SIPRA), SICAR/CAR, CAF, PRONAF, ANEEL |
| **Financas/Tesouro** | BCB, SIAFI, SIOP, CADIN, PagTesouro, SADIPEM, SICONFI |
| **Controle & Transparencia** | CGU, TCU, Fala.BR, Portal Transparencia, e-Aud |
| **Servidores/Servicos** | SIAPE, SIORG, DOU, Portal Servicos gov.br |
| **Veiculos** | SENATRAN/DENATRAN, FIPE |
| **Bancos Publicos** | IBGE SIDRA, CVM, IPEA, ANATEL, ANP, ANEEL, DATASUS, Comprasnet, Camara, Senado, TCU, Brasil.io, Base dos Dados, Querido Diario |

> **Nota importante:** APIs do **Conecta gov.br** marcadas como "Gov-a-Gov" sao para integracao entre orgaos publicos. Para uso cidadao/dev/empresa, foque na **BrasilAPI**, **IBGE**, **BCB** e demais bancos de dados abertos.

---

## 🌍 Internacionalizacao (i18n)

Ambos os arquivos suportam 3 idiomas com sistema de i18n completo:

- 🇧🇷 **PT-BR** (default) | 🇺🇸 **EN** | 🇪🇸 **ES**
- Switcher pill group com bandeirinhas emoji no header
- Resolver de idioma: **URL param** (`?lang=en`) > `localStorage` > `navigator.language` > PT-BR
- Persistencia em `localStorage["lang"]` &mdash; sincroniza landing e catalogo
- Script no `<head>` evita "flash of wrong content" (FOWT)
- `<html lang>` dinamico para acessibilidade e SEO
- `hreflang` tags para SEO multilingual
- `<noscript>` fallback amigavel
- 150+ strings traduzidas em 3 idiomas
- `data-i18n` (text) e `data-i18n-html` (HTML preservado)
- `data-i18n-attr` para traducao de atributos (alt, aria-label, title, content)

### Como funciona

| Atributo | Uso | Comportamento |
|---|---|---|
| `data-i18n="key"` | Texto puro | `el.textContent = TRANSLATIONS[lang][key]` |
| `data-i18n-html="key"` | HTML valido | `el.innerHTML = TRANSLATIONS[lang][key]` (preserva `<span>`, `<strong>`, etc) |
| `data-i18n-attr="alt|aria-label"` | Atributos HTML | `el.setAttribute(attr, TRANSLATIONS[lang][key])` |

### URLs

```
/                                    -> PT-BR
/?lang=en                            -> English
/?lang=es                            -> Espanol
```

---

## 🌗 Temas (Light + Dark)

Ambos os arquivos suportam 3 modos:

- **Auto** (default): segue o `prefers-color-scheme` do sistema operacional
- **Light**: tema claro otimizado para leitura diurna (verde `#00875a`, estilo GitHub Primer)
- **Dark**: tema escuro original (verde neon `#00d9a3`)

A escolha persiste em `localStorage["theme"]` e e sincronizada entre landing e catalogo. O resolver no `<head>` evita "flash of wrong theme" (FOWT) aplicando o tema certo antes do body renderizar. Respeita `prefers-reduced-motion` e gera saida limpa em impressao (forca tema claro).

---

## 🛠️ Como rodar localmente

Nao precisa de build, install ou servidor. Ha 3 jeitos:

### 1. Abrir direto no navegador

```bash
open index.html
# Linux: xdg-open index.html
# Windows: start index.html
```

### 2. Servir via Python (recomendado pra testar links relativos)

```bash
python3 -m http.server 8000
# abre http://localhost:8000
```

### 3. Servir via Node

```bash
npx http-server -p 8000
```

---

## 🤝 Como contribuir

Contribuicoes sao bem-vindas! Mas como o catalogo e um **snapshot** das fontes oficiais, o fluxo recomendado e:

1. **Atualize as fontes originais** (public-apis ou free-for-dev) com PR la &mdash; elas tem governanca e revisao.
2. **Abra issue aqui** apontando a API/servico novo ou alterado, com link pra fonte.
3. Re-rodamos o script de extracao e publicamos nova versao.

### Adicionar nova fonte / dataset

Se voce conhece uma fonte confiavel de APIs gratuitas (lista awesome-list, diretorio oficial, etc):

1. Abra uma [issue](../../issues/new?template=feature_request.md) com link pra fonte e justificativa
2. Esperamos o PR da fonte original (quando aplicavel) ser mergeado
3. Atualizamos o snapshot via `build_html.py`

### Reportar bug

Abra uma [issue](../../issues/new?template=bug_report.md) com:

- URL da pagina afetada
- Browser e OS
- Passos pra reproduzir
- Screenshot/console error (se aplicavel)

### Traducoes

Traducoes em EN/ES sao bem-vindas. Abra issue com:

- Lista de strings a corrigir/melhorar
- Proposta de traducao
- Contexto (formal/informal, BR/EU variante, etc)

---

## 🏛️ Arquitetura

### Como o catalogo foi construido

1. Extracao automatizada do README de `public-apis/public-apis` (markdown com 1500+ APIs em 51 categorias)
2. Extracao automatizada do README de `ripienaar/free-for-dev` (markdown com 1200+ servicos em 57 categorias)
3. Extracao manual das APIs do BrasilAPI (~43 endpoints via OpenAPI spec)
4. Extracao manual do Catalogo Conecta gov.br (~90 APIs em 13 subcategorias)
5. Extracao de outras bases publicas brasileiras (IBGE, BCB, CVM, IPEA, etc)
6. Mapeamento de categoria EN -> PT-BR com emoji representativo
7. Mapeamento de `auth` (apiKey/OAuth/No) -> "Requer chave? Sim/Nao"
8. Mapeamento de `https` (Yes/No) -> "HTTPS Sim/Nao"
9. Cross-reference com `known_free_tiers.json` (~270 APIs com limite exato conhecido)
10. Geracao do HTML unico com CSS+JS inline, sidebar nav, busca por nome/categoria/descricao, e selos FREE destacados

### Stack

- **HTML5** semantico com ARIA
- **CSS3** com custom properties (`:root` + `[data-theme="dark"]`)
- **JavaScript vanilla** (ES6+), zero framework
- **GitHub Pages** para hospedagem
- **git --separate-git-dir** para working tree no Drive sync (`~/.git-repos/inventario-apis-gratuitas`)

### Estrutura do codigo

```
<head>
  <script>no-flash theme + lang resolver</script>
  <style>2 paletas (light/dark) + i18n + components</style>
  <script>theme controller + i18n controller</script>
</head>
<body>
  ...HTML com data-i18n em todos os elementos traduziveis...
  <noscript>fallback PT-BR</noscript>
  <script>i18n controller (apply lang, swap content)</script>
</body>
```

---

## 📚 Fontes dos dados

- [public-apis/public-apis](https://github.com/public-apis/public-apis) &mdash; 1.563 APIs (CC0)
- [ripienaar/free-for-dev](https://github.com/ripienaar/free-for-dev) &mdash; 1.238 servicos (CC-BY-SA)
- [n0shake/Public-APIs](https://github.com/n0shake/Public-APIs) &mdash; lista complementar
- [marcelomaia/awesome-apis](https://github.com/marcelomaia/awesome-apis) &mdash; lista em portugues
- [BrasilAPI](https://brasilapi.com.br) &mdash; 43 endpoints open-source
- [Catalogo Conecta gov.br](https://www.gov.br/conecta/catalogo/) &mdash; 90+ APIs
- [RapidAPI Hub](https://rapidapi.com/hub) &mdash; free tier APIs
- [ProgrammableWeb](https://www.programmableweb.com/) &mdash; diretorio historico
- [Google Cloud Free Tier](https://cloud.google.com/free) &mdash; Maps, Translate, Gemini, etc.

---

## ✨ Features completas

- [x] **2.983+ APIs** em 109 categorias
- [x] **182 APIs do Governo Brasileiro** em secao dedicada
- [x] **3 idiomas** (PT-BR, EN, ES) com i18n completo
- [x] **Light + Dark mode** com toggle 3-vias (Auto / Light / Dark)
- [x] **Busca em tempo real** (atalho `/`)
- [x] **Filtro por categoria** com sticky nav
- [x] **100% responsivo** (mobile-first)
- [x] **Sticky sidebar** com auto-highlight do link ativo
- [x] **Collapsible** por categoria + botao "expandir tudo"
- [x] **Zero dependencia externa**
- [x] **Offline-friendly** depois do primeiro carregamento
- [x] **Acessibilidade**: atalhos de teclado, ARIA, semantica HTML5, `prefers-reduced-motion`, `prefers-color-scheme`
- [x] **Print-friendly** (forca tema claro, esconde controles)
- [x] **SEO**: `hreflang` multilingual, Open Graph, Twitter Cards
- [x] **Performance**: sem assets externos, sem requests, sem CDN

---

## 🗺️ Roadmap

- [ ] Adicionar filtro por "requer chave: sim/nao"
- [ ] Adicionar filtro por HTTPS only
- [ ] Versao offline-first PWA com service worker
- [ ] CLI pra buscar API direto do terminal
- [ ] Snapshots versionados com data (v1.0-public-apis-2026-06, etc)
- [ ] API de busca serverless (Cloudflare Worker)
- [ ] Compara limites lado-a-lado entre 2+ APIs
- [ ] Filtro por "stack": Node, Python, Go, etc
- [ ] Exportar catalogo como CSV/JSON

Veja as [issues abertas](../../issues) para ideias e contribuicoes em andamento.

---

## 📜 Licenca

- **Codigo deste repositorio:** [MIT](LICENSE)
- **Dados das APIs:** pertencem aos respectivos donos e mantidos pelas fontes originais
- **public-apis:** CC0
- **free-for-dev:** CC-BY-SA
- **BrasilAPI/Conecta gov.br:** dados publicos governamentais

---

## 💬 Contato

- 📷 **Instagram:** [@lpdigital.me](https://www.instagram.com/lpdigital.me/)
- 🐙 **GitHub:** [@philipecomputacao](https://github.com/philipecomputacao)
- 🐙 **Repo:** [philipecomputacao/inventario-apis-gratuitas](https://github.com/philipecomputacao/inventario-apis-gratuitas)
- 🐛 **Issues:** [abrir issue](../../issues/new/choose)

---

## ⭐ Apoie

Se este projeto te ajudou:

- ⭐ **Deixe uma star** no [repositorio](https://github.com/philipecomputacao/inventario-apis-gratuitas)
- 📷 **Siga no Instagram:** [@lpdigital.me](https://www.instagram.com/lpdigital.me/)
- 🐦 **Compartilhe** com outros devs brasileiros
- 🐛 **Reporte bugs** ou sugira novas fontes

---

> _Construido com <3 por [LP Digital](https://www.instagram.com/lpdigital.me/)._
> _Use livre, contribua, e me marque se publicar algo derivado._
