#!/usr/bin/env python3
"""
inject-mcp-servers.py

O QUE FAZ:
  Le mcp-servers.json e injeta as 150+ entradas como um novo bloco de
  categorias no inventario-apis.html, no formato exato usado pelas APIs
  existentes (data-hay + 6 <td> + free-badge + chip-yes/no/unknown).

  - Cria 16 secoes novas, uma por categoria MCP (sidebar-friendly)
  - Cada secao tem: header, thead, tbody com as linhas, tfoot com total
  - Adiciona links no sidebar (antes do </nav>)
  - Adiciona entradas no objeto API_TRANSLATIONS existente
  - Atualiza contadores: badge "N APIs" do header, page.title, hero text

COMO USAR:
  1) cd projetos/inventario-apis-gratuitas
  2) python3 inject-mcp-servers.py [--dry-run]
  # Para re-executar (ja foi rodado): o script detecta secoes existentes pelo emoji no header e re-injeta via .bak se necessario
  3) git diff inventario-apis.html
  4) Se ok: git add . && git commit && git push

VARIAVEIS DE CONFIG:
  - JSON_FILE: arquivo de entrada (default: mcp-servers.json)
  - SRC: HTML alvo (default: inventario-apis.html)
  - DRY_RUN: imprime mudancas sem gravar

GOTCHAS:
  - SEMPRE cria .bak antes (idempotente no .bak)
  - Formato data-hay e 9 campos: slug, name, cat_pt, url, descricao, tier_pt, oauth, cors, auth
  - Para evitar conflito com virgulas na descricao, slug e gerado unico
  - Categorias MCP vao para sidebar com emoji proprio (MCP para root, sub-emojis por categoria)
"""

import json
import re
import shutil
import sys
from collections import OrderedDict
from pathlib import Path

ROOT = Path(__file__).parent
JSON_FILE = ROOT / "mcp-servers.json"
SRC = ROOT / "inventario-apis.html"
DRY_RUN = "--dry-run" in sys.argv

# Emoji por categoria MCP
CATEGORY_EMOJI = {
    "Servidores MCP - Memoria": "🧠",
    "Servidores MCP - Pesquisa": "🔍",
    "Servidores MCP - Banco de Dados": "🗄️",
    "Servidores MCP - Web Scraping": "🌐",
    "Servidores MCP - Comunicacao": "💬",
    "Servidores MCP - Produtividade": "⚡",
    "Servidores MCP - Desenvolvimento": "🛠️",
    "Servidores MCP - Governo Brasileiro": "🇧🇷",
    "Servidores MCP - Marketing": "📣",
    "Servidores MCP - Design": "🎨",
    "Servidores MCP - Financas": "💰",
    "Servidores MCP - Controle de Versao": "🔀",
    "Servidores MCP - Sistema de Arquivos": "📁",
    "Servidores MCP - Servico de Nuvem": "☁️",
    "Servidores MCP - Armazenamento em Nuvem": "💾",
    "Servidores MCP - Outros": "🧰",
}

# Ordem de exibicao das categorias MCP no sidebar (importancia)
CATEGORY_ORDER = [
    "Servidores MCP - Memoria",
    "Servidores MCP - Pesquisa",
    "Servidores MCP - Banco de Dados",
    "Servidores MCP - Web Scraping",
    "Servidores MCP - Comunicacao",
    "Servidores MCP - Produtividade",
    "Servidores MCP - Desenvolvimento",
    "Servidores MCP - Governo Brasileiro",
    "Servidores MCP - Marketing",
    "Servidores MCP - Design",
    "Servidores MCP - Financas",
    "Servidores MCP - Controle de Versao",
    "Servidores MCP - Sistema de Arquivos",
    "Servidores MCP - Servico de Nuvem",
    "Servidores MCP - Armazenamento em Nuvem",
    "Servidores MCP - Outros",
]


def load_data():
    """Carrega JSON e agrupa por categoria"""
    with open(JSON_FILE, "r", encoding="utf-8") as f:
        rows = json.load(f, object_pairs_hook=OrderedDict)
    grouped = OrderedDict()
    for row in rows:
        cat_pt = row["cat"]["pt"]
        grouped.setdefault(cat_pt, []).append(row)
    return grouped


def slugify(name):
    """Slug simples: lowercase + hifens + remover caracteres problematicos"""
    s = name.lower()
    s = re.sub(r"[^a-z0-9-]+", "-", s)
    s = re.sub(r"-+", "-", s).strip("-")
    return s


def build_data_hay(slug, name, cat_pt, url, descricao, tier_pt):
    """Constroi o atributo data-hay com 9 campos separados por espaco"""
    # Campos fixos para MCPs (a maioria self-hosted/free, sem OAuth/CORS/Auth)
    return f"{slug} {name} {cat_pt} {url} {descricao} {tier_pt} nao nao nao"


def build_row(row):
    """Constroi um <tr>...</tr> completo"""
    slug = row["slug"]
    name = row["name"]
    cat_pt = row["cat"]["pt"]
    url = row["url"]
    descricao = row["obs"]["pt"]
    tier_pt = row["tier"]["pt"]

    data_hay = build_data_hay(slug, name, cat_pt, url, descricao, tier_pt)

    return (
        f'<tr data-hay="{data_hay}">'
        f'<td class="name">{name}</td>'
        f'<td class="cat" data-api-key="{slug}" data-i18n-field="cat">{cat_pt}</td>'
        f'<td class="url"><a href="{url}" target="_blank" rel="noopener noreferrer">{url}</a></td>'
        f'<td class="tier"><div class="free-badge" data-api-key="{slug}" data-i18n-field="tier">{tier_pt}</div></td>'
        f'<td class="key"><span class="chip-no">Nao</span></td>'
        f'<td class="obs" data-api-key="{slug}" data-i18n-field="obs">{descricao}</td>'
        f'</tr>'
    )


def build_section(cat_pt, rows):
    """Constroi um <section>...</section> completo para uma categoria"""
    emoji = CATEGORY_EMOJI.get(cat_pt, "📦")
    body_rows = "".join(build_row(r) for r in rows)
    return (
        f'<section class="section">'
        f'<div class="section-header">'
        f'<h2><span class="emoji">{emoji}</span><span>{cat_pt}</span></h2>'
        f'<span class="cat-count">{len(rows)} MCPs</span>'
        f'<span class="src-tag">MCP</span>'
        f'<span class="toggle">▼</span>'
        f'</div>'
        f'<div class="section-body"><div class="table-wrap"><table>'
        f'<thead><tr><th>Nome</th><th>Categoria</th><th>URL</th><th>Limite Gratuito</th><th>Requer Chave?</th><th>Observacoes</th></tr></thead>'
        f'<tbody>{body_rows}</tbody>'
        f'<tfoot><tr><td colspan="6">Total desta categoria: <strong>{len(rows)}</strong></td></tr></tfoot>'
        f'</table></div></div>'
        f'</section>'
    )


def build_sidebar_link(cat_pt):
    """Constroi um link do sidebar para uma categoria MCP"""
    emoji = CATEGORY_EMOJI.get(cat_pt, "📦")
    return (
        f'<a href="#{slugify(cat_pt)}" data-cat="{slugify(cat_pt)}">'
        f'<span>{emoji}</span>'
        f'<span data-pt="{cat_pt}">{cat_pt}</span>'
        f'</a>'
    )


def build_translation_entry(row):
    """Constroi uma entrada no API_TRANSLATIONS no formato usado no HTML"""
    slug = row["slug"]
    return {
        "obs": {
            "pt": row["obs"]["pt"],
            "en": row["obs"]["en"],
            "es": row["obs"]["es"],
        },
        "cat": {
            "pt": row["cat"]["pt"],
            "en": row["cat"]["en"],
            "es": row["cat"]["es"],
        },
        "tier": {
            "pt": row["tier"]["pt"],
            "en": row["tier"]["en"],
            "es": row["tier"]["es"],
        },
    }


def inject(html, grouped):
    """Aplica todas as injecoes no HTML e retorna o HTML modificado"""
    # 1) Constroi todas as secoes novas
    sections = []
    for cat_pt in CATEGORY_ORDER:
        if cat_pt in grouped:
            sections.append(build_section(cat_pt, grouped[cat_pt]))

    sections_html = "".join(sections)

    # 2) Insere as secoes antes do </main>
    if "</main>" not in html:
        raise RuntimeError("Nao achei </main> no HTML")
    html = html.replace("</main>", sections_html + "</main>", 1)
    print(f"[OK] {len(sections)} secoes injetadas antes do </main>")

    # 3) Adiciona links no sidebar antes do </nav>
    nav_links = "".join(build_sidebar_link(cat) for cat in CATEGORY_ORDER if cat in grouped)
    if "</nav>" not in html:
        raise RuntimeError("Nao achei </nav> no HTML")
    html = html.replace("</nav>", nav_links + "</nav>", 1)
    print(f"[OK] {len(CATEGORY_ORDER)} links adicionados ao sidebar")

    # 4) Injeta entradas no objeto API_TRANSLATIONS existente
    new_translations = OrderedDict()
    for cat_pt in CATEGORY_ORDER:
        if cat_pt in grouped:
            for row in grouped[cat_pt]:
                new_translations[row["slug"]] = build_translation_entry(row)

    # Encontra o objeto API_TRANSLATIONS e injeta antes do } final
    start_marker = "const API_TRANSLATIONS = {"
    start_idx = html.find(start_marker)
    if start_idx < 0:
        print("[WARN] Nao achei API_TRANSLATIONS - pulando injecao de traducoes (mas rodaveis via inject-translations.js depois)")
    else:
        # Acha o } final do objeto com brace-balance
        i = html.find("{", start_idx)
        depth = 0
        end_idx = -1
        for j in range(i, len(html)):
            c = html[j]
            if c == "{":
                depth += 1
            elif c == "}":
                depth -= 1
                if depth == 0:
                    end_idx = j
                    break
        if end_idx < 0:
            raise RuntimeError("Nao achei o } do API_TRANSLATIONS")

        entries_str = ",".join(
            json.dumps(slug, ensure_ascii=False) + ":" + json.dumps(val, ensure_ascii=False)
            for slug, val in new_translations.items()
        )
        before = html[:end_idx]
        after = html[end_idx:]
        needs_comma = not before.rstrip().endswith("{") and not before.rstrip().endswith(",")
        html = before + ("," if needs_comma else "") + entries_str + after
        print(f"[OK] {len(new_translations)} entradas injetadas no API_TRANSLATIONS")

    # 5) Atualiza contadores principais. Detecta valor atual dinamicamente
    #    para suportar rodadas incrementais (3743 -> 3788 -> 3809 -> ...)
    total_new = sum(len(v) for v in grouped.values())
    # Detecta o numero atual procurando dentro dos spans
    detect_re = re.compile(r'<(?:span class="lang-count"|span id="visibleCount")>(\d{3,5})</span>')
    matches = detect_re.findall(html)
    current_total = int(matches[0]) if matches else 3743
    new_total = current_total + total_new
    patches = 0
    for pattern in [r'(<span class="lang-count">)\d{3,5}(</span>)',
                    r'(<span id="visibleCount">)\d{3,5}(</span>)']:
        new_html, n = re.subn(pattern, rf'\g<1>{new_total}\g<2>', html)
        if n > 0:
            html = new_html
            patches += n
    if patches:
        print(f"[OK] {patches} contadores atualizados {current_total} -> {new_total}")
    else:
        print(f"[WARN] Nenhum contador encontrado - revise manualmente")

    return html


def main():
    if not JSON_FILE.exists():
        print(f"[ERRO] {JSON_FILE} nao existe. Rode extract-mcp-servers.py primeiro (ou crie manualmente).")
        sys.exit(1)
    if not SRC.exists():
        print(f"[ERRO] {SRC} nao existe.")
        sys.exit(1)

    print(f"Carregando {JSON_FILE.name}...")
    grouped = load_data()
    total = sum(len(v) for v in grouped.values())
    print(f"[OK] {total} MCPs em {len(grouped)} categorias")
    for cat, rows in grouped.items():
        print(f"  - {cat}: {len(rows)}")

    print(f"\nLendo {SRC.name}...")
    with open(SRC, "r", encoding="utf-8") as f:
        html = f.read()
    print(f"[OK] HTML lido: {len(html):,} caracteres")

    # Idempotency: detecta secoes MCP ja injetadas (pelo emoji + nome da categoria no header)
    already_injected = []
    for cat_pt in CATEGORY_ORDER:
        if cat_pt in grouped:
            # O emoji é único da categoria
            emoji = CATEGORY_EMOJI.get(cat_pt, "")
            # Procura o header com emoji + nome da categoria
            pattern = f'<h2><span class="emoji">{re.escape(emoji)}</span><span>{re.escape(cat_pt)}</span></h2>'
            if pattern in html:
                already_injected.append(cat_pt)
    # Modo --replace: remove secoes MCP existentes antes de injetar
    REPLACE = "--replace" in sys.argv
    if already_injected:
        if REPLACE:
            print(f"[INFO] --replace: removendo {len(already_injected)} secoes MCP existentes")
            # Remove cada secao MCP (cada emoji unico)
            for cat_pt in already_injected:
                emoji = CATEGORY_EMOJI.get(cat_pt, "")
                # Match <section>...</section> que contenha o emoji e a categoria
                # Usa .+? no lugar de . pra suportar emojis compostos (2+ codepoints)
                pat = re.compile(
                    r'<section class="section">(?:(?!</section>).)*?'
                    r'<span class="emoji">.+?</span>'
                    r'<span>' + re.escape(cat_pt) + r'</span>(?:(?!</section>).)*?</section>',
                    re.DOTALL
                )
                matches = list(pat.finditer(html))
                if matches:
                    first = matches[0]
                    html = html[:first.start()] + html[first.end():]
                    print(f"       removida: {emoji} {cat_pt}")
                # Tambem remove links no sidebar (primeira ocorrencia)
                slug = slugify(cat_pt)
                nav_pat = re.compile(
                    r'<a\s+href="#' + re.escape(slug) + r'"\s+data-cat="[^"]+">\s*<span>[^<]+</span>\s*<span[^>]*>' + re.escape(cat_pt) + r'</span>\s*</a>'
                )
                nav_matches = list(nav_pat.finditer(html))
                if nav_matches:
                    first_nav = nav_matches[0]
                    html = html[:first_nav.start()] + html[first_nav.end():]
        else:
            print(f"[WARN] Secoes MCP ja injetadas detectadas: {already_injected}")
            print("       Use --replace para substituir, ou delete manualmente")
            if not DRY_RUN:
                print("       Abortando para evitar duplicacao.")
                sys.exit(2)

    if not DRY_RUN:
        backup = SRC.with_suffix(".html.bak")
        shutil.copy2(SRC, backup)
        print(f"[OK] Backup criado: {backup.name}")

    print(f"\nInjetando...")
    new_html = inject(html, grouped)

    if DRY_RUN:
        print("\n[DRY_RUN] nada gravado. Mostrando preview:")
        # Mostra um sample da primeira secao gerada
        sample = build_section(CATEGORY_ORDER[0], grouped[CATEGORY_ORDER[0]][:2])
        print(sample[:1500])
    else:
        with open(SRC, "w", encoding="utf-8") as f:
            f.write(new_html)
        delta = len(new_html) - len(html)
        print(f"\n[OK] Gravado. Delta: +{delta:,} chars ({len(new_html):,} total).")
        print(f"\nProximos passos:")
        print(f"  1. git diff inventario-apis.html | head -200")
        print(f"  2. Se ok: git add . && git commit -m 'feat: add 45 free MCP servers from mcpservers.org'")
        print(f"  3. Atualizar README.md (fontes: 8 -> 9, total: 3.743 -> {3743 + total})")
        print(f"  4. Atualizar CHANGELOG.md (Unreleased)")
        print(f"  5. git push (gh-pages atualiza via Action)")


if __name__ == "__main__":
    main()
