#!/usr/bin/env node
/**
 * extract-categories.js
 *
 * O QUE FAZ:
 *  Le inventario-apis.html e extrai todas as categorias usadas em:
 *   - <section class="section"> ... <h2><span class="emoji">..</span><span>NOME</span>
 *   - <nav class="sidebar"> ... <a><span>EMOJI</span><span data-pt="NOME">NOME</span>
 *  Gera categories.json com {pt, en, es} (en/es vazios pra voce traduzir).
 *
 * COMO USAR:
 *  1) cd projetos/inventario-apis-gratuitas
 *  2) node extract-categories.js
 *  3) Edite categories.json preenchendo en/es
 *  4) Rode inject-categories.js
 *
 * GOTCHAS:
 *  - Deduplica pelo nome PT (case-sensitive). Se houver "Animais" e "animais",
 *    sao tratadas como diferentes (intencional - o lookup em
 *    CATEGORIES_TRANSLATIONS[pt] tambem e case-sensitive).
 *  - Ignora spans vazios e a classe .emoji/.src-tag/.cnt.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'inventario-apis.html');
const OUT = path.join(__dirname, 'categories.json');

const html = fs.readFileSync(SRC, 'utf8');

const cats = new Set();

// 1) Section headers: <h2><span class="emoji">📝</span><span>Analise de Texto</span></h2>
const h2Re = /<section class="section"[^>]*>[\s\S]*?<h2>\s*<span class="emoji">[^<]*<\/span>\s*<span(?:\s[^>]*)?>([^<]+)<\/span>/g;
let m;
while ((m = h2Re.exec(html)) !== null) {
  const name = m[1].trim();
  if (name) cats.add(name);
}

// 2) Sidebar: <a ...><span>EMOJI</span><span data-pt="Nome">Nome</span>
const navRe = /<a[^>]*data-cat="[^"]+"[^>]*>\s*<span>[^<]*<\/span>\s*<span(?:\s+data-pt="([^"]+)")?[^>]*>([^<]+)<\/span>/g;
while ((m = navRe.exec(html)) !== null) {
  const name = (m[1] || m[2] || '').trim();
  if (name) cats.add(name);
}

const sorted = [...cats].sort((a, b) => a.localeCompare(b, 'pt-BR'));
const out = sorted.map(pt => ({ pt, en: '', es: '' }));

fs.writeFileSync(OUT, JSON.stringify(out, null, 2));
console.log(`Extraidas ${out.length} categorias unicas -> ${OUT}`);
console.log('Edite os campos en/es e rode inject-categories.js');
