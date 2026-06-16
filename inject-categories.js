#!/usr/bin/env node
/**
 * inject-categories.js
 *
 * O QUE FAZ:
 *  Le categories.json (ja traduzido) e injeta `const CATEGORIES_TRANSLATIONS = {...};`
 *  no inventario-apis.html, logo antes do `const API_TRANSLATIONS = {`. A funcao
 *  translateTables() ja le essa variavel (com guard `typeof !== 'undefined'`),
 *  entao basta declarar pra ela passar a funcionar.
 *
 * COMO USAR:
 *  1) Edite categories.json preenchendo en/es
 *  2) cd projetos/inventario-apis-gratuitas
 *  3) node inject-categories.js
 *
 * VARIAVEIS DE CONFIG:
 *  - SRC: arquivo HTML alvo
 *  - JSON_CATS: arquivo de categorias traduzidas
 *  - DRY_RUN=1: nao escreve, so imprime
 *
 * GOTCHAS:
 *  - Idempotente: se ja existir `const CATEGORIES_TRANSLATIONS`, substitui
 *    o bloco existente (nao duplica).
 *  - Sempre cria .bak antes (sobrescreve o anterior).
 *  - Se en/es estiver vazio, cai em pt no front (mesmo comportamento de
 *    API_TRANSLATIONS).
 */
'use strict';

const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'inventario-apis.html');
const JSON_CATS = path.join(__dirname, 'categories.json');
const DRY_RUN = process.env.DRY_RUN === '1';

if (!fs.existsSync(SRC)) { console.error(`Nao achei ${SRC}`); process.exit(1); }
if (!fs.existsSync(JSON_CATS)) {
  console.error(`Nao achei ${JSON_CATS}. Rode extract-categories.js primeiro.`);
  process.exit(1);
}

const cats = JSON.parse(fs.readFileSync(JSON_CATS, 'utf8'));
let html = fs.readFileSync(SRC, 'utf8');

if (!DRY_RUN) {
  fs.writeFileSync(SRC + '.bak', html);
  console.log(`Backup: ${SRC}.bak`);
}

// Monta o objeto JS
const obj = {};
let pending = 0;
for (const { pt, en, es } of cats) {
  if (!pt) continue;
  if (!en || !es) pending++;
  obj[pt] = { pt, en: en || pt, es: es || pt };
}

const declaration = `const CATEGORIES_TRANSLATIONS = ${JSON.stringify(obj)};\n        `;

// Se ja existir, substitui. Senao, insere antes de `const API_TRANSLATIONS`.
const existingRe = /const CATEGORIES_TRANSLATIONS\s*=\s*\{[\s\S]*?\};\s*/;
if (existingRe.test(html)) {
  html = html.replace(existingRe, declaration);
  console.log('CATEGORIES_TRANSLATIONS ja existia - substituido.');
} else {
  const anchor = 'const API_TRANSLATIONS = {';
  const idx = html.indexOf(anchor);
  if (idx < 0) {
    console.error(`Nao achei "${anchor}" no HTML. Abortando.`);
    process.exit(1);
  }
  html = html.slice(0, idx) + declaration + html.slice(idx);
  console.log('CATEGORIES_TRANSLATIONS inserido antes de API_TRANSLATIONS.');
}

if (!DRY_RUN) fs.writeFileSync(SRC, html);

console.log(`Categorias injetadas: ${Object.keys(obj).length}`);
if (pending) console.log(`[AVISO] ${pending} categorias com en/es vazios (caem em pt no front).`);
console.log(DRY_RUN ? '[DRY_RUN] nada escrito.' : 'OK gravado.');
