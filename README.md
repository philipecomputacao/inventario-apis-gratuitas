# Inventario de APIs Gratuitas

Catalogo massivo e curado de **2.801+ APIs e servicos gratuitos**, com limites conhecidos, organizado por 108 categorias.

> **Live:** https://philipecomputacao.github.io/inventario-apis-gratuitas/
>
> Mantido por [@lpdigital.me](https://www.instagram.com/lpdigital.me/) &mdash; siga no Instagram para mais dicas de APIs, automacoes e IA.

## Sobre o projeto

Este projeto reune, em um unico HTML autocontido, o maior inventario possivel de APIs e servicos com plano gratuito real. A ideia e servir como **referencia pratica** para desenvolvedores, freelancers e times de produto que precisam escolher integracoes sem estourar budget.

## Numeros

- **2.801+** APIs e servicos catalogados
- **108** categorias
- **~270** APIs com limite gratuito documentado
- **1.9 MB** de HTML unico (zero build, zero dependencia)
- **100% offline-friendly** depois do primeiro carregamento

## Fontes

- [public-apis/public-apis](https://github.com/public-apis/public-apis) &mdash; 1.563 APIs (CC0)
- [ripienaar/free-for-dev](https://github.com/ripienaar/free-for-dev) &mdash; 1.238 servicos (CC-BY-SA)
- [n0shake/Public-APIs](https://github.com/n0shake/Public-APIs) &mdash; lista complementar
- [marcelomaia/awesome-apis](https://github.com/marcelomaia/awesome-apis) &mdash; lista em portugues
- [RapidAPI Hub](https://rapidapi.com/hub) &mdash; free tier APIs
- [ProgrammableWeb](https://www.programmableweb.com/) &mdash; diretorio historico
- [Google Cloud Free Tier](https://cloud.google.com/free) &mdash; Maps, Translate, Gemini, etc.

## Estrutura do repo

```text
.
+- index.html              # Landing page (GitHub Pages entrypoint)
+- inventario-apis.html    # Catalogo completo (2.801+ APIs, ~1.9 MB)
+- README.md               # Este arquivo
+- .gitignore              # Exclui arquivos do OS / editores
```

`index.html` e a porta de entrada com overview, contadores, bloca de "como usar" e CTA para o catalogo.
`inventario-apis.html` e o catalogo massivo em si: dark mode, busca em tempo real, filtro por categoria, sticky nav.

## Como rodar localmente

Nao precisa de build, install ou servidor. Tem 3 jeitos:

### 1. Abrir direto

```bash
open index.html
# no Linux: xdg-open index.html
# no Windows: start index.html
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

## Como contribuir

Contribuicoes sao bem-vindas! Mas como o catalogo e um **snapshot** das fontes oficiais, o fluxo recomendado e:

1. **Atualize as fontes originais** (public-apis ou free-for-dev) com PR la &mdash; elas tem governanca e revisao.
2. **Abra issue aqui** apontando a API/servico novo ou alterado, com link pra fonte.
3. Re-rodamos o script de extracao e publicamos nova versao.

### Rodar a extracao localmente

```bash
# Arquivos de origem estao em /var/folders/.../opencode (gerados por IA)
# Para regerar, basta apontar o build_html.py pros JSONs atualizados
python3 build_html.py
```

## Como o catalogo foi construido

1. Extracao automatizada do README de `public-apis/public-apis` (markdown com 1500+ APIs em 51 categorias).
2. Extracao automatizada do README de `ripienaar/free-for-dev` (markdown com 1200+ servicos em 57 categorias).
3. Mapeamento de categoria EN -> PT-BR com emoji representativo.
4. Mapeamento de `auth` (apiKey/OAuth/No) -> "Requer chave? Sim/Nao".
5. Mapeamento de `https` (Yes/No) -> "HTTPS Sim/Nao".
6. Cross-reference com `known_free_tiers.json` (~270 APIs com limite exato conhecido).
7. Geracao do HTML unico com CSS+JS inline, sidebar nav, busca por nome/categoria/descricao, e selos FREE destacados.

## Features

- [x] **2.983+ APIs** em 109 categorias
- [x] **Light + Dark mode** com toggle 3-vias (Auto / Light / Dark)
- [x] **Busca em tempo real** (atalho `/`)
- [x] **Filtro por categoria** com chips/links
- [x] **100% responsivo** (mobile-first)
- [x] **Sticky sidebar** com auto-highlight do link ativo
- [x] **Collapsible** por categoria + botao "expandir tudo"
- [x] **Zero dependencia externa** (sem React, Bootstrap, jQuery)
- [x] **Offline-friendly** depois do primeiro carregamento
- [x] **Acessibilidade**: atalhos de teclado, semantica HTML5, aria-labels, prefers-reduced-motion, print-friendly

## Temas (Light / Dark)

Ambos os arquivos (`index.html` e `inventario-apis.html`) suportam 3 modos:

- **Auto** (default): segue o `prefers-color-scheme` do sistema operacional
- **Light**: tema claro otimizado para leitura diurna (verde `#00875a`)
- **Dark**: tema escuro original (verde neon `#00d9a3`)

A escolha persiste em `localStorage["theme"]` e e sincronizada entre landing e catalogo. O resolver no `<head>` evita "flash of wrong theme" (FOWT) aplicando o tema certo antes do body renderizar. Acessibilidade: respeita `prefers-reduced-motion` e gera saida limpa em impressao (forca tema claro).

## Roadmap

- [ ] Adicionar filtro por "requer chave: sim/nao"
- [ ] Adicionar filtro por HTTPS only
- [ ] Internacionalizacao (EN/PT/ES)
- [ ] Versionado: snapshot de cada fonte com data
- [ ] PWA com service worker pra cache offline
- [ ] Comando CLI pra buscar API direto do terminal

## Licenca

- Codigo deste repo: **MIT**
- Conteudo das APIs: pertence aos respectivos donos e mantido pelas fontes originais
- Dados: **CC0** (public-apis) e **CC-BY-SA** (free-for-dev)

## Contato

- **Instagram:** [@lpdigital.me](https://www.instagram.com/lpdigital.me/)
- **GitHub:** [@philipecomputacao](https://github.com/philipecomputacao)

---

> _Construido com <3 por [LP Digital](https://www.instagram.com/lpdigital.me/)._
> _Use livre, contribua, e me marque se publicar algo derivado._
