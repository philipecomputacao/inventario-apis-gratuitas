#!/usr/bin/env python3
"""
fix-translations.py

Resolve 3 problemas detectados na auditoria de tradução:
  1. Deduplica slugs colididos em API_TRANSLATIONS (18 casos: acentos colidem
     na normalização — ex: "améthyste" e "amethyste" viram a mesma chave).
     Mantém a entrada com mais conteúdo distinto entre pt/en/es.
  2. Re-traduz obs.en quando obs.pt == obs.en (não traduziu) usando deep-translator
     com source='auto'.
  3. Idem pra obs.es.

Pula nomes próprios curtos (sem espaço, capitalizado) — Twilio, Schiphol, etc.

Uso: _venv/bin/python fix-translations.py  (em-place, com .bak)
"""
import json
import re
import sys
import time
from pathlib import Path

from deep_translator import GoogleTranslator

ROOT = Path(__file__).parent
HTML = ROOT / "inventario-apis.html"
BACKUP = ROOT / "inventario-apis.html.bak"

html = HTML.read_text()
BACKUP.write_text(html)
print(f"Backup: {BACKUP}")

# === 1. Extrai bloco API_TRANSLATIONS ===
START_TOKEN = "const API_TRANSLATIONS = "
start = html.find(START_TOKEN)
if start < 0:
    sys.exit("não achei API_TRANSLATIONS")

# acha fim do objeto via brace balance
i = html.find("{", start)
obj_start = i
depth = 0
while i < len(html):
    c = html[i]
    if c == "{":
        depth += 1
    elif c == "}":
        depth -= 1
        if depth == 0:
            i += 1
            break
    i += 1
obj_end = i
obj_str = html[obj_start:obj_end]

# === 2. Parse com tracking de duplicatas ===
# Não dá pra usar json.loads simples — quero detectar duplicatas.
# Estratégia: substitui hook com object_pairs_hook
duplicates = {}


def track_dupes(pairs):
    seen = {}
    for k, v in pairs:
        if k in seen:
            duplicates.setdefault(k, []).append(seen[k])
            duplicates[k].append(v)
        seen[k] = v
    return seen


data = json.loads(obj_str, object_pairs_hook=track_dupes)
print(f"Total slugs: {len(data)}")
print(f"Slugs duplicados: {len(duplicates)}")
for slug in list(duplicates.keys())[:5]:
    print(f"  - {slug} (x{len(duplicates[slug])})")


# === 3. Resolve duplicatas ===
# Pra cada slug duplicado, escolhe a versão com maior "distintividade" entre pt/en/es
def distinct_score(entry):
    """Soma de tamanhos de strings distintas. Quanto maior, mais 'traduzido'."""
    if not entry or "obs" not in entry:
        return 0
    obs = entry["obs"]
    pt, en, es = obs.get("pt", ""), obs.get("en", ""), obs.get("es", "")
    score = len(pt)
    if en != pt:
        score += len(en)
    if es != pt:
        score += len(es)
    return score


dedup_fixed = 0
for slug, versions in duplicates.items():
    # versions = [v1, v2, ...] (a última também está em data[slug])
    versions.append(data[slug])
    best = max(versions, key=distinct_score)
    data[slug] = best
    dedup_fixed += 1
print(f"Duplicatas resolvidas: {dedup_fixed} (mantendo a versão com mais tradução)")


# === 4. Identifica os que precisam re-traduzir ===
def looks_like_proper_noun(s):
    """Heurística: nome próprio curto, capitalizado, sem espaço ou com 1 palavra."""
    if len(s) <= 2:
        return True
    words = s.split()
    if len(words) <= 2 and all(w[0].isupper() if w else False for w in words):
        return True
    return False


to_translate_en = []
to_translate_es = []
for slug, entry in data.items():
    if "obs" not in entry:
        continue
    obs = entry["obs"]
    pt = obs.get("pt", "")
    en = obs.get("en", "")
    es = obs.get("es", "")
    if pt and en == pt and not looks_like_proper_noun(pt):
        to_translate_en.append(slug)
    if pt and es == pt and not looks_like_proper_noun(pt):
        to_translate_es.append(slug)

print(f"\nA re-traduzir EN: {len(to_translate_en)}")
print(f"A re-traduzir ES: {len(to_translate_es)}")

# === 5. Traduz via Google Translate ===
en_translator = GoogleTranslator(source="auto", target="en")
es_translator = GoogleTranslator(source="auto", target="es")


def safe_translate(translator, text, retries=2):
    for attempt in range(retries + 1):
        try:
            time.sleep(0.05)
            return translator.translate(text) or text
        except Exception as e:
            if attempt == retries:
                print(f"  ⚠ falhou: {text[:50]} ({e})")
                return text
            time.sleep(1.0)


en_done, es_done = 0, 0
for i, slug in enumerate(to_translate_en):
    pt = data[slug]["obs"]["pt"]
    new_en = safe_translate(en_translator, pt)
    data[slug]["obs"]["en"] = new_en
    en_done += 1
    if (i + 1) % 25 == 0:
        print(f"  EN progress: {i+1}/{len(to_translate_en)}")
print(f"EN traduzido: {en_done}")

for i, slug in enumerate(to_translate_es):
    pt = data[slug]["obs"]["pt"]
    new_es = safe_translate(es_translator, pt)
    data[slug]["obs"]["es"] = new_es
    es_done += 1
    if (i + 1) % 25 == 0:
        print(f"  ES progress: {i+1}/{len(to_translate_es)}")
print(f"ES traduzido: {es_done}")

# === 6. Serializa de volta e injeta no HTML ===
new_obj = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
new_html = html[:obj_start] + new_obj + html[obj_end:]
HTML.write_text(new_html)

print("\n✅ Done. HTML regravado.")
print(f"   Tamanho: {len(html)} -> {len(new_html)} bytes ({len(new_html)-len(html):+d})")
