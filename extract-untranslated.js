#!/usr/bin/env node
/**
 * extract-untranslated.js
 *
 * O QUE FAZ:
 *  Le inventario-apis.html, encontra as 210 linhas <tr> cujas celulas
 *  <td class="obs"> / <td class="cat"> / .free-badge NAO tem data-api-key,
 *  e exporta um JSON com {slug, name, url, cat, tier, obs} pronto pra traduzir.
 *
 * COMO USAR:
 *  1) cd projetos/inventario-apis-gratuitas
 *  2) node extract-untranslated.js
 *  3) Vai gerar untranslated.json (PT-only) e untranslated-categories.json
 *  4) Voce traduz manualmente / via DeepL / GPT, mantendo as chaves intactas
 *  5) Depois rode inject-translations.js (script separado) pra patchar o HTML
 *
 * VARIAVEIS DE CONFIG:
 *  - SRC: arquivo HTML de entrada (default: inventario-apis.html)
 *  - OUT_ROWS: JSON com as 210 linhas
 *  - OUT_CATS: JSON com as categorias unicas
 *
 * GOTCHAS:
 *  - Regex-based (nao usa DOM parser). Funciona porque o HTML do projeto
 *    tem cada <tr> numa unica linha. Se quebrar, troca por jsdom.
 *  - Slug = mesma logica usada nas linhas ja migradas: name+url normalizados.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'inventario-apis.html');
const OUT_ROWS = path.join(__dirname, 'untranslated.json');
const OUT_CATS = path.join(__dirname, 'untranslated-categories.json');

function slugify(s) {
  return s
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function makeSlug(name, url) {
  const namePart = slugify(name);
  // pega o host + path, remove pontos/barras, pega so 1as palavras pra nao explodir
  const urlPart = slugify(url.replace(/^https?:\/\//, '').replace(/[.\/?#&=]/g, ''))
    .slice(0, 32);
  return `${namePart}-${urlPart}`.replace(/--+/g, '-');
}

const html = fs.readFileSync(SRC, 'utf8');

// Regex pega <tr ...> ate </tr> em uma linha so. Filtra os que tem <td class="obs">
// (sem data-api-key). Captura: name, cat, tier (texto do free-badge OU texto direto), obs, url.
const rowRe = /<tr[^>]*>(?:(?!<\/tr>).)*?<td class="name">([^<]+)<\/td><td class="cat">([^<]+)<\/td><td class="url"><a href="([^"]+)"[^>]*>[^<]*<\/a><\/td><td class="tier">(?:<div class="free-badge">([^<]+)<\/div>|([^<]+))<\/td><td class="key">[\s\S]*?<\/td><td class="obs">([^<]+)<\/td>\s*<\/tr>/g;

const rows = [];
const cats = new Set();
let m;
while ((m = rowRe.exec(html)) !== null) {
  const [, name, cat, url, tierBadge, tierPlain, obs] = m;
  const tier = (tierBadge || tierPlain || '').trim();
  const slug = makeSlug(name.trim(), url.trim());
  rows.push({
    slug,
    name: name.trim(),
    url: url.trim(),
    cat: { pt: cat.trim(), en: '', es: '' },
    tier: { pt: tier, en: '', es: '' },
    obs: { pt: obs.trim(), en: '', es: '' },
  });
  cats.add(cat.trim());
}

fs.writeFileSync(OUT_ROWS, JSON.stringify(rows, null, 2));
fs.writeFileSync(OUT_CATS, JSON.stringify([...cats].sort(), null, 2));

console.log(`Extraidas ${rows.length} linhas -> ${OUT_ROWS}`);
console.log(`Categorias unicas: ${cats.size} -> ${OUT_CATS}`);
console.log('\nProximo passo: traduza os campos en/es nos JSONs e rode inject-translations.js');
