#!/usr/bin/env node
/**
 * fix-columns.js
 *
 * O QUE FAZ:
 *  Aplica 5 corrections de qualidade no inventario-apis.html:
 *   1. Recalcula <strong>N</strong> nos tfoot de cada secao com o numero
 *      REAL de <tr data-hay=...> no body. Antes 15 secoes mentiam.
 *   2. Remove "FREE: " do inicio de todos os <div class="free-badge">.
 *      O badge ja e verde, prefixo era redundante e inconsistente.
 *   3. Limpa markdown literal `**texto**` em <td class="obs"> (vira texto puro).
 *   4. Normaliza HTML entities em <td class="name">: &#x27; -> ', &amp; -> &.
 *   5. URLs com {placeholder} (ex: /cnpj/v1/{cnpj}): mantem o texto visível
 *      mas troca href pra raiz do dominio (clicável sem dar 404).
 *
 * COMO USAR:
 *  cd projetos/inventario-apis-gratuitas
 *  node fix-columns.js          # aplica
 *  DRY_RUN=1 node fix-columns.js # so imprime contadores
 *
 * GOTCHAS:
 *  - Backup automatico em .bak
 *  - Idempotente: rodar de novo nao quebra (zero matches na 2a passada)
 */
'use strict';

const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'inventario-apis.html');
const DRY = process.env.DRY_RUN === '1';

let html = fs.readFileSync(SRC, 'utf8');
if (!DRY) fs.writeFileSync(SRC + '.bak', html);

const stats = {};

// --- 1. Recalcula tfoot ---
// padrao do tfoot: <tfoot><tr><td colspan="6">Total desta categoria: <strong>N</strong></td></tr></tfoot>
// Para cada secao, conta <tr data-hay= no body e atualiza.
let tfootFixed = 0;
const sectionRe = /(<section class="section"[^>]*>)([\s\S]*?)(<\/section>)/g;
html = html.replace(sectionRe, (full, open, body, close) => {
  const trCount = (body.match(/<tr data-hay=/g) || []).length;
  const newBody = body.replace(
    /(Total desta categoria: <strong>)(\d+)(<\/strong>)/g,
    (_, p, oldN, s) => {
      if (parseInt(oldN) !== trCount) tfootFixed++;
      return p + trCount + s;
    }
  );
  return open + newBody + close;
});
stats.tfootFixed = tfootFixed;

// --- 2. Remove "FREE: " prefix de todas as free-badges ---
let freeRemoved = 0;
html = html.replace(
  /(<div class="free-badge"[^>]*>)FREE:\s*/g,
  (_, p) => { freeRemoved++; return p; }
);
stats.freePrefixRemoved = freeRemoved;

// --- 3. Markdown literal em obs ---
// Pattern: dentro de <td class="obs"...>...</td>, trocar **X** por X
let mdCleaned = 0;
html = html.replace(
  /(<td class="obs"[^>]*>)([^<]*)(<\/td>)/g,
  (_, open, txt, close) => {
    if (txt.includes('**')) {
      mdCleaned++;
      // remove os ** mantendo o texto interno
      txt = txt.replace(/\*\*([^*]+)\*\*/g, '$1');
    }
    return open + txt + close;
  }
);
stats.markdownCleaned = mdCleaned;

// --- 4. HTML entities em nomes ---
let entitiesFixed = 0;
html = html.replace(
  /(<td class="name">)([^<]*)(<\/td>)/g,
  (_, open, txt, close) => {
    const orig = txt;
    txt = txt
      .replace(/&#x27;/g, "'")
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"');
    if (txt !== orig) entitiesFixed++;
    return open + txt + close;
  }
);
stats.entitiesFixed = entitiesFixed;

// --- 5. URLs com {placeholder}: href -> raiz, texto preservado ---
// Match: <a href="https://host.com/path/{x}/..." ...>texto</a>
let placeholdersFixed = 0;
html = html.replace(
  /(<td class="url"><a href=")(https?:\/\/[^"]+)("[^>]*>)([^<]+)(<\/a><\/td>)/g,
  (full, p1, href, midAttrs, text, p5) => {
    if (!/[{}]/.test(href)) return full;
    // extrai dominio raiz
    const m = href.match(/^(https?:\/\/[^/]+)\//);
    if (!m) return full;
    placeholdersFixed++;
    return p1 + m[1] + '/' + midAttrs + text + p5;
  }
);
stats.placeholdersFixed = placeholdersFixed;

console.log('Stats:');
console.table(stats);

if (DRY) {
  console.log('[DRY_RUN] nada escrito.');
} else {
  fs.writeFileSync(SRC, html);
  console.log('Gravado. Backup em', SRC + '.bak');
}
