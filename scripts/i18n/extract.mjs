// Extrait le texte à traduire de chaque page vers i18n/source/<page>.json.
//
// Chaque page déclare son contenu dans `const C = { fr, en, ar }`. Le script exécute le
// <script setup> de la page dans un bac à sable (fonctions Nuxt/Vue remplacées par des
// substituts inertes) pour obtenir l'objet C évalué, puis produit une table plate
// { "chemin.vers.texte": "texte français" } des seules valeurs à traduire : celles qui
// diffèrent entre FR, EN et AR (les chemins d'images, classes CSS, nombres et citations
// latines, identiques dans les trois langues, ne sont pas à traduire).
// L'anglais est joint comme seconde référence pour les traducteurs.
//
// Usage : node scripts/i18n/extract.mjs [page…]
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs'
import vm from 'node:vm'
import { parse as parseSfc } from '@vue/compiler-sfc'

const root = new URL('../../', import.meta.url)
const pagesDir = new URL('pages/[lang]/', root)

// Substitut universel : appelable, indexable, sans effet
const stub = new Proxy(function () {}, {
  get: (t, k) => (k === Symbol.toPrimitive ? () => '' : k === 'then' ? undefined : stub),
  apply: () => stub,
  construct: () => stub
})

export function evaluatePage (file, varName = 'C') {
  const src = readFileSync(file, 'utf8')
  let code
  if (file.pathname.endsWith('.vue')) {
    const { descriptor } = parseSfc(src)
    code = (descriptor.scriptSetup || descriptor.script).content
  } else {
    code = src.replace(/^export\s+/gm, '')
  }
  // import X from '~/assets/data/x.json'  →  const X = __json('assets/data/x.json')
  code = code.replace(/^\s*import\s+(\w+)\s+from\s+['"]~\/([^'"]+\.json)['"];?/gm, (_, name, p) => `const ${name} = __json(${JSON.stringify(p)});`)
  // await (chargeurs de traductions) → sans effet ici
  code = code.replace(/\bawait\s+/g, '')
  // import.meta.* (client/server) → faux
  code = code.replace(/import\.meta\.\w+/g, 'false')
  // autres imports → substituts
  code = code.replace(/^\s*import\s+\{([^}]+)\}\s+from\s+['"][^'"]+['"];?/gm, (_, names) => `const {${names}} = __stub;`)
  code = code.replace(/^\s*import\s+(\w+)\s+from\s+['"][^'"]+['"];?/gm, (_, name) => `const ${name} = __stub;`)
  const env = new Proxy({}, {
    has: (t, k) => typeof k === 'string' && !(k in globalThis) && ![varName, '__capture'].includes(k),
    get: (t, k) => (k === Symbol.unscopables ? undefined : stub)
  })
  let captured
  const sandbox = {
    __env: env,
    __stub: stub,
    __json: p => JSON.parse(readFileSync(new URL(p, root), 'utf8')),
    __capture: c => { captured = c },
    JSON, Math, Object, Array, String, Number, Set, Map, Date, RegExp, console
  }
  vm.createContext(sandbox)
  vm.runInContext(`(function () { with (__env) { ${code}\n;__capture(${varName}) } })()`, sandbox, { filename: file.pathname })
  if (!captured) throw new Error(`objet ${varName} introuvable dans ${file.pathname}`)
  return JSON.parse(JSON.stringify(captured))
}

// Table plate { chemin: valeur } des chaînes d'un objet
export function flatten (obj, prefix = '', out = {}) {
  if (typeof obj === 'string') { out[prefix] = obj; return out }
  if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) flatten(v, prefix ? `${prefix}.${k}` : k, out)
  }
  return out
}

const isText = s => /\p{L}/u.test(s)

export function translatableLeaves (C) {
  const fr = flatten(C.fr)
  const en = flatten(C.en || {})
  const ar = flatten(C.ar || {})
  const leaves = {}
  const ref = {}
  const refAr = {}
  for (const [path, value] of Object.entries(fr)) {
    if (!isText(value)) continue
    const same = en[path] === value && ar[path] === value
    if (same) continue
    leaves[path] = value
    if (en[path] !== undefined) ref[path] = en[path]
    if (ar[path] !== undefined) refAr[path] = ar[path]
  }
  return { leaves, en: ref, ar: refAr }
}

// Données à nœuds { fr, en, ar } : table plate des textes français à traduire
export function dataLeaves (data) {
  const leaves = {}
  const ref = {}
  const refAr = {}
  const walk = (node, path) => {
    if (!node || typeof node !== 'object') return
    if (!Array.isArray(node) && 'fr' in node && 'en' in node) {
      const fr = flatten(node.fr, path)
      const en = flatten(node.en, path)
      const ar = flatten(node.ar ?? {}, path)
      for (const [p, v] of Object.entries(fr)) {
        if (!isText(v) || (en[p] === v && ar[p] === v)) continue
        leaves[p] = v
        if (en[p] !== undefined) ref[p] = en[p]
        if (ar[p] !== undefined) refAr[p] = ar[p]
      }
      return
    }
    for (const [k, v] of Object.entries(node)) walk(v, path ? `${path}.${k}` : String(k))
  }
  walk(data, '')
  return { leaves, en: ref, ar: refAr }
}

const out = (name, payload) => {
  const chars = Object.values(payload.fr).join('').length
  writeFileSync(new URL(`i18n/source/${name}.json`, root), JSON.stringify({ key: name, ...payload }, null, 1) + '\n')
  return chars
}

const only = process.argv.slice(2)
mkdirSync(new URL('i18n/source/', root), { recursive: true })
let total = 0
const log = (name, n, chars) => console.log(`${name.padEnd(26)} ${String(n).padStart(4)} textes  ${String(chars).padStart(7)} caractères`)

// 1. Pages
const files = readdirSync(pagesDir).filter(f => f.endsWith('.vue') && (!only.length || only.includes(f.replace('.vue', ''))))
for (const f of files) {
  const slug = f.replace('.vue', '')
  const { leaves, en, ar } = translatableLeaves(evaluatePage(new URL(f, pagesDir)))
  const chars = out(slug, { fr: leaves, en, ar })
  total += chars
  log(slug, Object.keys(leaves).length, chars)
}

if (!only.length) {
  // 2. Interface (un fichier ui avec une section par composant)
  const UI = [
    ['navbar', 'components/AppNavbar.vue', 'LABELS'],
    ['footer', 'components/AppFooter.vue', 'FOOT'],
    ['search', 'components/SiteSearch.vue', 'LABELS'],
    ['sources', 'components/PageSources.vue', 'LABELS'],
    ['layout', 'layouts/default.vue', 'UI']
  ]
  const ui = { fr: {}, en: {}, ar: {} }
  for (const [name, file, v] of UI) {
    const r = translatableLeaves(evaluatePage(new URL(file, root), v))
    for (const [p, t] of Object.entries(r.leaves)) ui.fr[`${name}.${p}`] = t
    for (const [p, t] of Object.entries(r.en)) ui.en[`${name}.${p}`] = t
    for (const [p, t] of Object.entries(r.ar)) ui.ar[`${name}.${p}`] = t
  }
  total += out('ui', ui); log('ui', Object.keys(ui.fr).length, Object.values(ui.fr).join('').length)

  // 3. Carte animée
  const map = translatableLeaves(evaluatePage(new URL('components/maps/AnimatedMap.vue', root), 'TXT'))
  total += out('map', { fr: map.leaves, en: map.en, ar: map.ar }); log('map', Object.keys(map.leaves).length, Object.values(map.leaves).join('').length)

  // 4. Chaînes globales (i18n/fr.ts, en.ts, ar.ts)
  const G = { fr: evaluatePage(new URL('i18n/fr.ts', root), 'fr'), en: evaluatePage(new URL('i18n/en.ts', root), 'en'), ar: evaluatePage(new URL('i18n/ar.ts', root), 'ar') }
  const glob = translatableLeaves(G)
  total += out('global', { fr: glob.leaves, en: glob.en, ar: glob.ar }); log('global', Object.keys(glob.leaves).length, Object.values(glob.leaves).join('').length)

  // 5. Données
  for (const [name, file] of [['site-map', 'assets/data/site-map.json'], ['glossaire-data', 'assets/data/glossaire.json'], ['quiz-data', 'assets/data/quiz.json'], ['bibliographie-data', 'assets/data/bibliographie.json']]) {
    const d = dataLeaves(JSON.parse(readFileSync(new URL(file, root), 'utf8')))
    const chars = out(name, { fr: d.leaves, en: d.en, ar: d.ar })
    total += chars
    log(name, Object.keys(d.leaves).length, chars)
  }
}
console.log(`TOTAL : ${total} caractères à traduire par langue`)
