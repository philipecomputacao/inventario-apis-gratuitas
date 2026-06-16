#!/usr/bin/env node
/**
 * inject-translations.js
 *
 * O QUE FAZ:
 *  Le untranslated.json (ja traduzido por voce), e patcha inventario-apis.html:
 *   1) Adiciona data-api-key + data-i18n-field nas 210 celulas obs/cat/tier
 *      que ainda estao "soltas".
 *   2) Insere as novas chaves dentro do objeto API_TRANSLATIONS existente.
 *
 * COMO USAR:
 *  1) Edite untranslated.json preenchendo os campos en/es (mantenha pt!)
 *  2) cd projetos/inventario-apis-gratuitas
 *  3) node inject-translations.js
 *  4) Gera inventario-apis.html.bak antes de qualquer mudanca
 *  5) Faz dois passes: HTML attrs + injecao no API_TRANSLATIONS
 *
 * VARIAVEIS DE CONFIG:
 *  - SRC: arquivo HTML alvo (default: inventario-apis.html)
 *  - JSON_ROWS: arquivo de tradutores (default: untranslated.json)
 *  - DRY_RUN: se true, so imprime o que faria (sem escrever)
 *
 * GOTCHAS:
 *  - Idempotente: se rodar 2x e os attrs ja existem, nao duplica.
 *  - A insercao no API_TRANSLATIONS usa string-replace simples no fechamento `}`
 *    do objeto. Se voce editou o formato do objeto manualmente, revise.
 *  - Sempre cria .bak antes (sobrescreve o .bak anterior).
 */
'use strict';

const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'inventario-apis.html');
const JSON_ROWS = path.join(__dirname, 'untranslated.json');
const DRY_RUN = process.env.DRY_RUN === '1';

if (!fs.existsSync(SRC)) {
  console.error(`Nao achei ${SRC}`);
  process.exit(1);
}
if (!fs.existsSync(JSON_ROWS)) {
  console.error(`Nao achei ${JSON_ROWS}. Rode extract-untranslated.js primeiro.`);
  process.exit(1);
}

const rows = JSON.parse(fs.readFileSync(JSON_ROWS, 'utf8'));
let html = fs.readFileSync(SRC, 'utf8');

// Backup
if (!DRY_RUN) {
  fs.writeFileSync(SRC + '.bak', html);
  console.log(`Backup: ${SRC}.bak`);
}

let attrPatches = 0;
let skippedAlreadyTagged = 0;
const newTranslations = {};

for (const row of rows) {
  const { slug, name, url, cat, tier, obs } = row;

  // Detecta se faltou traduzir
  const missing = [];
  ['cat', 'tier', 'obs'].forEach(f => {
    if (!row[f].en) missing.push(`${f}.en`);
    if (!row[f].es) missing.push(`${f}.es`);
  });
  if (missing.length) {
    console.warn(`[AVISO] slug=${slug} sem tradução: ${missing.join(', ')} (vai cair em pt no front)`);
  }

  // Pattern do <tr> antigo (mesma regex do extract, simplificada)
  const escName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const escUrl  = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // Re tolera tier badge ou plano
  const re = new RegExp(
    `(<td class="name">${escName}</td>)` +
    `<td class="cat">([^<]+)</td>` +
    `(<td class="url"><a href="${escUrl}"[^>]*>[^<]*</a></td>)` +
    `<td class="tier">(?:<div class="free-badge">([^<]+)</div>|([^<]+))</td>` +
    `(<td class="key">[\\s\\S]*?</td>)` +
    `<td class="obs">([^<]+)</td>`
  );

  const before = html;
  html = html.replace(re, (full, nameTd, catTxt, urlTd, tierBadgeTxt, tierPlainTxt, keyTd, obsTxt) => {
    const tierIsBadge = !!tierBadgeTxt;
    const tierTxt = tierBadgeTxt || tierPlainTxt;
    const tierCell = tierIsBadge
      ? `<td class="tier"><div class="free-badge" data-api-key="${slug}" data-i18n-field="tier">${tierTxt}</div></td>`
      : `<td class="tier"><div class="free-badge" data-api-key="${slug}" data-i18n-field="tier">${tierTxt}</div></td>`;
    return (
      nameTd +
      `<td class="cat" data-api-key="${slug}" data-i18n-field="cat">${catTxt}</td>` +
      urlTd +
      tierCell +
      keyTd +
      `<td class="obs" data-api-key="${slug}" data-i18n-field="obs">${obsTxt}</td>`
    );
  });

  if (html === before) {
    // Pode ser que ja estava tagged (rodou antes), ou regex falhou
    const tagged = html.includes(`data-api-key="${slug}"`);
    if (tagged) {
      skippedAlreadyTagged++;
    } else {
      console.warn(`[AVISO] nao consegui patchar HTML do slug=${slug} (nome=${name}). Revise manualmente.`);
    }
  } else {
    attrPatches++;
  }

  // Monta objeto novo no formato esperado em API_TRANSLATIONS
  newTranslations[slug] = {
    obs: { pt: obs.pt, en: obs.en || obs.pt, es: obs.es || obs.pt },
    cat: { pt: cat.pt, en: cat.en || cat.pt, es: cat.es || cat.pt },
    tier: { pt: tier.pt, en: tier.en || tier.pt, es: tier.es || tier.pt },
  };
}

// 2) Injeta as 210 novas entradas dentro do objeto API_TRANSLATIONS existente.
//    Estrategia: acha o `const API_TRANSLATIONS = {` e o fechamento `};` que
//    bate (e que e seguido de quebra de linha + outra declaracao).
const startIdx = html.indexOf('const API_TRANSLATIONS = {');
if (startIdx < 0) {
  console.error('Nao achei `const API_TRANSLATIONS = {` no HTML. Abortando.');
  process.exit(1);
}

// Acha o fim do objeto fazendo brace-balance a partir do `{`
let i = html.indexOf('{', startIdx);
let depth = 0;
let endIdx = -1;
for (; i < html.length; i++) {
  const c = html[i];
  if (c === '{') depth++;
  else if (c === '}') {
    depth--;
    if (depth === 0) { endIdx = i; break; }
  }
}
if (endIdx < 0) {
  console.error('Nao achei o fechamento do objeto API_TRANSLATIONS.');
  process.exit(1);
}

// Constroi as novas entradas como string JS (sem chaves de abertura/fechamento)
const entriesStr = Object.entries(newTranslations)
  .map(([slug, val]) => `${JSON.stringify(slug)}:${JSON.stringify(val)}`)
  .join(',');

// Insere antes do `}` final. Verifica se o objeto ja termina com `}` puro (ok)
// ou se ja tem virgula trailing
const before = html.slice(0, endIdx);
const after  = html.slice(endIdx);
const needsComma = !before.trimEnd().endsWith('{') && !before.trimEnd().endsWith(',');
const patchedObj = before + (needsComma ? ',' : '') + entriesStr + after;

if (!DRY_RUN) {
  fs.writeFileSync(SRC, patchedObj);
}

console.log(`HTML attrs patched: ${attrPatches}`);
console.log(`Ja estavam tagged (skip): ${skippedAlreadyTagged}`);
console.log(`Entradas injetadas em API_TRANSLATIONS: ${Object.keys(newTranslations).length}`);
console.log(DRY_RUN ? '[DRY_RUN] nada escrito.' : 'OK gravado.');
