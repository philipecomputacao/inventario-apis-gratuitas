# Inventario de APIs Gratuitas

> Catalogo massivo e curado de **3.864+ APIs e servicos gratuitos** em **112 categorias** &mdash; incluindo 182 APIs do Governo Brasileiro, 3 idiomas, dark mode, busca em tempo real, filtros por categoria e por chave, e HTML 100% autocontido (zero build, zero dependencia, zero framework).

🌐 **Live:** https://philipecomputacao.github.io/inventario-apis-gratuitas/

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/deploy-GitHub%20Pages-blue.svg)](https://pages.github.com/)
[![i18n](https://img.shields.io/badge/i18n-PT--BR%20%7C%20EN%20%7C%20ES-orange.svg)](#-internacionalizacao)
[![APIs](https://img.shields.io/badge/APIs-3%2C864%2B-brightgreen.svg)](#-numeros)
[![Gov BR](https://img.shields.io/badge/Gov%20BR-182%20APIs-yellow.svg)](#-apis-do-governo-brasileiro)
[![Maintained by @lpdigital.me](https://img.shields.io/badge/maintained%20by-%40lpdigital.me-E4405F.svg)](https://www.instagram.com/lpdigital.me/)

---

<table>
<tr>
<td width="120" align="center" valign="top">
<img src="./assets/perfil-300.jpg" width="100" height="100" alt="@lpdigital.me" style="border-radius: 50%; background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); padding: 3px;" />
</td>
<td valign="top">

**Curadoria e desenvolvimento por [@lpdigital.me](https://www.instagram.com/lpdigital.me/)** &mdash; Philipe compartilha APIs, automacoes e IA toda semana no Instagram. Manda um follow se o catalogo te ajudou.

</td>
</tr>
</table>

## ✨ Destaques

- 📚 **3.864+ APIs** em 112 categorias &mdash; a maior referencia open-source em PT-BR
- 🇧🇷 **182 APIs do Governo Brasileiro** (BrasilAPI, Conecta gov.br, IBGE, BCB, CVM, IPEA, ANATEL, ANP, TCU, CGU, DATASUS, Comprasnet, Camara, Senado)
- 🌍 **3 idiomas** (PT-BR, EN, ES) com switcher pill group + URL param + localStorage + auto-detect
- 🌗 **Light + Dark mode** com toggle 3-vias (Auto, Light, Dark) e resolucao no `<head>` (sem FOWT)
- 🔍 **Busca em tempo real** com atalho `/`
- 🎯 **Filtros inteligentes**: "Limite Gratuito" (11 categorias smart) + "Requer Chave?" (3 checkboxes), com contadores e combinacao AND
- 📦 **HTML 100% autocontido** &mdash; zero build, zero dependencia, zero framework, **4.4 MB em 1 arquivo**
- 🌙 Funciona **offline** depois do primeiro carregamento
- 🖨️ Print-friendly (forca tema claro, esconde controles)
- ♿ Acessivel (ARIA, semantica HTML5, `prefers-reduced-motion`, `prefers-color-scheme`)

---

## 📊 Numeros

| Metrica | Valor | Detalhes |
|---|---|---|
| **APIs e servicos** | 3.864+ | Em 112 categorias |
| **Fontes mineradas** | 15 | 8 principais + 7 especializacoes (BR/KR/CN/CL/IR/IA/Seguranca) |
| **APIs do Governo Brasileiro** | 182 | Em 11 subcategorias, secao dedicada |
| **Idiomas** | 3 | PT-BR (default), EN, ES |
| **Strings traduzidas** | 43 chaves | x 3 idiomas = 129 traducoes |
| **Tamanho HTML** | 4.4 MB | Self-contained |
| **Dependencias externas** | 0 | Sem React, Bootstrap, jQuery |
| **Build step** | 0 | HTML+CSS+JS puros |

### Top 10 categorias por volume

| # | Categoria | APIs |
|---|---|---|
| 1 | 🇧🇷 Governo Brasileiro | 182 |
| 2 | Fontes Complementares Globais (RapidAPI/ProgrammableWeb) | 141 |
| 3 | APIs, Data and ML | 138 |
| 4 | Desenvolvimento | 132 |
| 5 | Jogos e HQs | 97 |
| 6 | Governo (public-apis) | 95 |
| 7 | Geolocalizacao | 94 |
| 8 | Provedores Cloud (Limites Gratis) | 76 |
| 9 | Times e Colaboracao | 75 |
| 10 | Transporte | 74 |

---

## 🚀 Links Rapidos

- 🌐 **Landing page:** https://philipecomputacao.github.io/inventario-apis-gratuitas/
- 📂 **Catalogo direto:** https://philipecomputacao.github.io/inventario-apis-gratuitas/inventario-apis.html
- 🇺🇸 **English version:** https://philipecomputacao.github.io/inventario-apis-gratuitas/?lang=en
- 🇪🇸 **Version Espanol:** https://philipecomputacao.github.io/inventario-apis-gratuitas/?lang=es
- 🐙 **Codigo fonte:** https://github.com/philipecomputacao/inventario-apis-gratuitas
- 📷 **Instagram:** https://www.instagram.com/lpdigital.me/

### Atalhos de teclado

| Atalho | Acao |
|---|---|
| `/` | Foca a barra de busca |
| `Esc` | Limpa a busca e tira o foco |
| `Ctrl+Shift+L` | Switch rapido PT-BR / EN / ES |

---

## 🏗️ Estrutura do Repositorio

```text
.
+- index.html              # Landing page (GitHub Pages entrypoint, 90 KB)
+- inventario-apis.html    # Catalogo massivo (3.864+ APIs, 4.4 MB)
+- assets/                 # Foto de perfil, favicons (PNG inline no HTML)
|   +- lpfotoperfil.jpg    # Original 460x460
|   +- perfil-300.jpg      # Resize para 300x300
|   +- perfil-1200.jpg     # Resize para 1200x1200
+- README.md               # Este arquivo
+- LICENSE                 # MIT
+- .gitignore              # Ignora node_modules, .DS_Store
+- .git -> ~/.git-repos/   # git --separate-git-dir para Drive sync
```

> **Por que `node_modules` esta no repo?** &mdash; **Nao esta**. Existe localmente para o `sips` (teste de favicon) mas `.gitignore` exclui. O repo e 100% HTML/CSS/JS puro.

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

## 🎯 Filtros

O catalogo tem **2 filtros combinados** com busca textual. Ambos ficam logo abaixo da barra de busca.

### Filtro "Limite Gratuito"

11 categorias smart extraidas automaticamente dos dados:

| Categoria | Descricao | APIs |
|---|---|---|
| Varia conforme plano | Tier gratuito depende do servico | 1.568 |
| Com limite (req/min, X/mes) | Rate limit explicito | 1.138 |
| Tier gratuito | Plano free de servico pago | 193 |
| Open-source | Codigo aberto | 108 |
| Publico | Acesso publico, sem auth | 78 |
| Ilimitado | FREE: Ilimitado | 75 |
| Gov-a-Gov | Apenas orgaos publicos | 73 |
| Sandbox | Modo teste/demo | 41 |
| Credito gratis | $5 free, etc. | 15 |
| Trial | Periodo de teste | 7 |
| Outros | Categoria especial | 6 |

### Filtro "Requer Chave?"

| Categoria | APIs |
|---|---|
| Sim (requer API key) | 1.223 |
| Nao (publico) | 2.058 |
| Nao / Desconhecido | 21 |

### Combinacao

- **Dentro do mesmo grupo**: OR (marca "Ilimitado" + "Open-source" mostra ambos)
- **Entre grupos**: AND (marca "Ilimitado" + "Sim" mostra apenas Ilimitado E Sim)
- **Combinado com busca textual**: AND com o texto digitado
- **Botao "Limpar filtros"**: reseta todos os checkboxes

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
- **43 chaves de traducao** x 3 idiomas = 129 strings traduzidas
- `data-i18n` (text), `data-i18n-html` (HTML preservado), `data-i18n-attr` (atributos)

### Como funciona

| Atributo | Uso | Comportamento |
|---|---|---|
| `data-i18n="key"` | Texto puro | `el.textContent = TRANSLATIONS[lang][key]` |
| `data-i18n-html="key"` | HTML valido | `el.innerHTML = TRANSLATIONS[lang][key]` (preserva `<span>`, `<strong>`) |
| `data-i18n-attr="alt|aria-label"` | Atributos HTML | `el.setAttribute(attr, TRANSLATIONS[lang][key])` |

> **Limitacao conhecida:** as 3.864 APIs individuais nao sao traduzidas automaticamente &mdash; apenas o chrome (titulos, labels, filtros) e os nomes das categorias passam por i18n. As descricoes das APIs aparecem no idioma original (EN na maioria, algumas em PT-BR/KO/ZH/ES).

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

## 📚 Fontes dos dados

### Fontes principais (8)

| Fonte | APIs | Licenca | Notas |
|---|---|---|---|
| [public-apis/public-apis](https://github.com/public-apis/public-apis) | 1.563 | CC0 | Lista canonica, atualizada semanalmente |
| [ripienaar/free-for-dev](https://github.com/ripienaar/free-for-dev) | 1.238 | CC-BY-SA | SaaS com tier gratuito real |
| [n0shake/Public-APIs](https://github.com/n0shake/Public-APIs) | 109 | MIT | Complementar, categorias legadas |
| [marcelomaia/awesome-apis](https://github.com/marcelomaia/awesome-apis) | ~250 | MIT | Lista em portugues com curadoria |
| [BrasilAPI](https://brasilapi.com.br) | 43 | MIT | Open-source, 43 endpoints brasileiros |
| [Catalogo Conecta gov.br](https://www.gov.br/conecta/catalogo/) | 90+ | CC0 | APIs governamentais Gov-a-Gov |
| [RapidAPI Hub](https://rapidapi.com/hub) | 1 entrada agregadora | &mdash; | Representa 40.000+ APIs |
| [Apify](https://apify.com/) | 1 entrada agregadora | &mdash; | Marketplace de scrapers |

### Fontes especializadas (7)

| Fonte | Foco | Pais/Regiao |
|---|---|---|
| [TonnyL/Awesome_APIs](https://github.com/TonnyL/Awesome_APIs) | Lista geral curada | China |
| [dl0312/open-apis-korea](https://github.com/dl0312/open-apis-korea) | APIs coreanas | Coreia do Sul |
| [yybmion/public-apis-4Kr](https://github.com/yybmion/public-apis-4Kr) | APIs governamentais KR | Coreia do Sul |
| [llf007/public-apis-cn](https://github.com/llf007/public-apis-cn) | APIs chinesas | China |
| [juanbrujo/listado-apis-publicas-en-chile](https://github.com/juanbrujo/listado-apis-publicas-en-chile) | APIs chilenas | Chile |
| [Hameds/APIs-made-in-Iran](https://github.com/Hameds/APIs-made-in-Iran) | APIs iranianas | Ira |
| [jaegeral/security-apis](https://github.com/jaegeral/security-apis) | APIs de seguranca/CTI | Global |

### Fontes descontinuadas (excluidas)

| Fonte | Motivo |
|---|---|
| [OAI/OpenAPI-Specification](https://github.com/OAI/OpenAPI-Specification) | Spec, nao lista de APIs |
| [Byron/google-apis-rs](https://github.com/Byron/google-apis-rs) | Codigo Rust auto-gerado, nao curado |
| [cporter202/scraping-apis-for-devs](https://github.com/cporter202/scraping-apis-for-devs) | 1.821 scrapers do Apify &mdash; redundantes (agregados via Apify entry) |
| [cporter202/social-media-scraping-apis](https://github.com/cporter202/social-media-scraping-apis) | 805 scrapers do Apify &mdash; redundantes (agregados via Apify entry) |

---

## 🛠️ Como rodar localmente

Nao precisa de build, install ou servidor. Ha 3 jeitos:

### 1. Abrir direto no navegador

```bash
open index.html
# Linux: xdg-open index.html
# Windows: start index.html
```

### 2. Servir via Python (recomendado pra testar links relativos e i18n)

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

O catalogo e um **snapshot** das fontes oficiais. O fluxo recomendado:

### Atualizar dados de uma API existente

1. Atualize a fonte original (public-apis, free-for-dev, etc) com PR la &mdash; elas tem governanca e revisao
2. Abra [issue](../../issues) aqui apontando a API alterada
3. Re-rodamos o pipeline de extracao e publicamos nova versao

### Adicionar nova fonte / dataset

Se voce conhece uma fonte confiavel de APIs gratuitas (lista awesome-list, diretorio oficial, etc):

1. Abra uma [issue](../../issues/new?template=feature_request.md) com link pra fonte e justificativa
2. Esperamos validacao (HEAD check, desduplicacao, categorizacao)
3. Adicionamos via script de merge

### Reportar bug

Abra uma [issue](../../issues/new?template=bug_report.md) com:

- URL da pagina afetada
- Browser e OS
- Passos pra reproduzir
- Screenshot/console error (se aplicavel)

### Traducoes

Traducoes em EN/ES sao bem-vindas. Abra issue com:

- Lista de strings a corrigir/melhorar (no `CATALOG_TRANSLATIONS` em `inventario-apis.html` linhas 4700+)
- Proposta de traducao
- Contexto (formal/informal, BR/EU variante, etc)

---

## 🏛️ Arquitetura

### Stack

- **HTML5** semantico com ARIA
- **CSS3** com custom properties (`:root` + `[data-theme="dark"]`)
- **JavaScript vanilla** (ES6+), zero framework
- **GitHub Pages** para hospedagem (branch `gh-pages`)
- **git --separate-git-dir** para working tree no Drive sync (`~/.git-repos/inventario-apis-gratuitas`)

### Estrutura do codigo (inventario-apis.html)

```html
<head>
  <link rel="icon">          <!-- Favicon inline base64 (foto do GitHub) -->
  <link rel="alternate">     <!-- hreflang PT-BR/EN/ES -->
  <script>                   <!-- no-flash theme + lang resolver -->
  <style>                    <!-- 2 paletas (light/dark) + i18n + components -->
  <script>                   <!-- theme controller + i18n controller -->
</head>
<body>
  <div class="app">
    <div class="header">     <!-- logo, badge, theme toggle, lang switcher -->
    <nav class="sidebar">    <!-- 112 links de categoria com auto-highlight -->
    <main>
      <a class="author-badge"> <!-- link pro Instagram do autor -->
      <div class="toolbar">    <!-- search + counts + filters -->
      <section>                <!-- 112 sections de tabela -->
        <thead>
        <tbody>                <!-- 3.864 tr com data-hay -->
    </main>
  </div>
  <noscript>                  <!-- fallback PT-BR -->
  <script>                     <!-- IFFE: filter logic + applyFilter() + categorizer -->
  <script>                     <!-- IntersectionObserver p/ active sidebar -->
  <script>                     <!-- theme controller -->
  <script>                     <!-- i18n controller -->
</body>
```

### Como a busca funciona

1. Cada `<tr>` tem um atributo `data-hay` (lowercase blob com nome, categoria, URL, descricao)
2. O JS pega `search.value`, lowercases, e faz `hay.indexOf(q) !== -1` em cada row
3. Rows que nao dao match recebem `class="hidden"`
4. Sections sem nenhum row visivel tambem ficam hidden
5. Contador `visibleCount` atualiza em tempo real

### Como o filtro categoriza

O JS aplica regexes em lowercase no `td.tier` (fallback `td[3]`) de cada row:

- `varia conforme plano` -> varia
- `ilimitad` (cobre "Ilimitado", "Ilimitado (gratuito)", "FREE: Ilimitado") -> ilimitado
- `tier gratuito`/`tier free`/`free tier`/`mau free` -> tier
- `gov-a-gov` -> gov-gov
- `sandbox` -> sandbox
- `open source`/`open-source` -> opensource
- `trial` -> trial
- `monetario` ($/€/R$/free) -> monetario
- `rate-limit` (numeros + req/min/dia/mes) -> rate-limit
- tudo mais -> outros

A normalizacao de "Requer Chave?" mapeia "Sim" -> sim, "Nao" -> nao, "Não" -> desc (desconhecido).

### Como o i18n funciona

1. `<html lang="...">` e setado no `<head>` antes do body renderizar
2. `<script>` IIFE no `<head>` resolve o lang (URL > localStorage > navigator.language > PT-BR)
3. Data tables de traducao (`CATALOG_TRANSLATIONS`) tem 43 chaves x 3 idiomas
4. Elementos com `data-i18n` sao traduzidos no DOMContentLoaded
5. Botao de lang switcher atualiza o DOM + localStorage + URL (replaceState)

---

## ✨ Features completas

### Conteudo

- [x] **3.864+ APIs** em 112 categorias
- [x] **182 APIs do Governo Brasileiro** em secao dedicada
- [x] **15 fontes** curadas mineradas
- [x] **112 categorias** PA (52) + FFD (57) + Gov BR (1) + IoT (1) + Complements (1)

### UI

- [x] **3 idiomas** (PT-BR, EN, ES) com i18n completo
- [x] **Light + Dark mode** com toggle 3-vias (Auto / Light / Dark)
- [x] **Busca em tempo real** com atalho `/`
- [x] **Filtro por Limite Gratuito** (11 categorias smart)
- [x] **Filtro por Requer Chave?** (3 checkboxes)
- [x] **Botao "Limpar filtros"** + contadores de ativos
- [x] **Sticky sidebar** com auto-highlight do link ativo
- [x] **Collapsible** por categoria + botao "expandir/recolher tudo"
- [x] **Author badge** com link pro Instagram

### Tecnico

- [x] **100% responsivo** (mobile-first)
- [x] **Zero dependencia externa** (sem CDN, sem fonts externos)
- [x] **Offline-friendly** depois do primeiro carregamento
- [x] **Acessibilidade**: atalhos de teclado, ARIA, semantica HTML5, `prefers-reduced-motion`, `prefers-color-scheme`
- [x] **Print-friendly** (forca tema claro, esconde controles)
- [x] **SEO**: `hreflang` multilingual, Open Graph, Twitter Cards
- [x] **Performance**: sem assets externos, sem requests, sem CDN
- [x] **Favicon inline** (foto do autor em base64)

---

## 🗺️ Roadmap

### Curto prazo

- [ ] Adicionar filtro por "HTTPS only" / "CORS habilitado"
- [ ] Adicionar filtro por "API type": REST / GraphQL / SOAP / gRPC
- [ ] Marcar APIs deprecadas/descontinuadas com badge visual

### Medio prazo

- [ ] Versao offline-first PWA com service worker
- [ ] CLI pra buscar API direto do terminal (Node)
- [ ] Snapshots versionados com data (v1.0-public-apis-2026-06, etc)
- [ ] API de busca serverless (Cloudflare Worker)

### Longo prazo

- [ ] Compara limites lado-a-lado entre 2+ APIs
- [ ] Filtro por "stack": Node, Python, Go, etc
- [ ] Exportar catalogo como CSV/JSON
- [ ] Internacionalizar APIs individuais (alem de PT-BR/EN/ES, adicionar JA/DE/FR)

Veja as [issues abertas](../../issues) para ideias e contribuicoes em andamento.

---

## 📜 Licenca

- **Codigo deste repositorio:** [MIT](LICENSE)
- **Dados das APIs:** pertencem aos respectivos donos e mantidos pelas fontes originais
- **public-apis:** CC0
- **free-for-dev:** CC-BY-SA
- **BrasilAPI/Conecta gov.br:** dados publicos governamentais
- **Outras fontes:** verifique a licenca individual no repo de origem

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
