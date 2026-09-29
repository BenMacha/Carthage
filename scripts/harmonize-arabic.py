#!/usr/bin/env python3
"""Harmonise les termes arabes du site (formes retenues dans le glossaire).

Usage : python3 scripts/harmonize-arabic.py          # aperçu (compte les remplacements)
        python3 scripts/harmonize-arabic.py --write  # applique

Remplacement mot entier uniquement ; les préfixes collés (و ف ب ك ل، ال، لل) sont conservés.
"""
import glob
import re
import sys

AR = 'ء-ي'  # lettres arabes (hors signes diacritiques)
PRE = r'(?<![' + AR + r'])((?:[وفبكل]?ال|لل|[وفبكل])?)'
END = r'(?![' + AR + r'])'

RULES = [
    # « punique » : بوني → بونيقي (forme des titres et du plan du site)
    ('punique', PRE + r'بوني(ة|ين|ون|ات)?' + END, lambda m: m.group(1) + 'بونيقي' + (m.group(2) or '')),
    # tophet : التوفة / التوفِت → التوفيت
    ('tophet', PRE + r'توف(?:ِت|ة)' + END, lambda m: m.group(1) + 'توفيت'),
    # suffète : شوفيط → شفط
    ('suffete', PRE + r'شوفيط(ين|ان|ون)?' + END, lambda m: m.group(1) + 'شفط' + (m.group(2) or '')),
    # shekel
    ('shekel', PRE + r'شيكل(ات)?' + END, lambda m: m.group(1) + 'شيقل' + (m.group(2) or '')),
    # divinités
    ('eshmoun', PRE + r'إشمون' + END, lambda m: m.group(1) + 'أشمون'),
    ('melqart', PRE + r'ملقارت' + END, lambda m: m.group(1) + 'ملقرت'),
    ('saturne', r'زحل الإفريقي', lambda m: 'ساتورن الإفريقي'),
    # personnes
    ('himilcon', PRE + r'(?:هيملكون|حِملكون)' + END, lambda m: m.group(1) + 'حملكون'),
    ('hannon', PRE + r'حنّون' + END, lambda m: m.group(1) + 'حنون'),
    ('barca', r'آل برقة' + END, lambda m: 'آل برقا'),
    # auteurs antiques
    ('appien', PRE + r'أبيان' + END, lambda m: m.group(1) + 'أبيانوس'),
    ('diodore', PRE + r'ديودور' + END, lambda m: m.group(1) + 'ديودوروس'),
    ('caton', PRE + r'كاتون' + END, lambda m: m.group(1) + 'كاتو'),
    # historiens modernes
    ('sznycer', PRE + r'زنيسر' + END, lambda m: m.group(1) + 'شنيسر'),
    ('decret', PRE + r'دوكريه' + END, lambda m: m.group(1) + 'ديكري'),
]

FILES = sorted(
    glob.glob('pages/[[]lang[]]/*.vue') + glob.glob('components/**/*.vue', recursive=True)
    + glob.glob('assets/data/*.json') + ['i18n/ar.ts']
)


def main():
    write = '--write' in sys.argv
    totals = {name: 0 for name, _, _ in RULES}
    for path in FILES:
        text = open(path, encoding='utf-8').read()
        new = text
        for name, pattern, repl in RULES:
            new, n = re.subn(pattern, repl, new)
            totals[name] += n
        if new != text:
            print(f'{path}: modifié')
            if write:
                open(path, 'w', encoding='utf-8').write(new)
    print({k: v for k, v in totals.items() if v})
    if not write:
        print('(aperçu — relancer avec --write pour appliquer)')


if __name__ == '__main__':
    main()
