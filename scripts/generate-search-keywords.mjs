// Génère l'index de recherche par mots-clés : public/search/{fr,en,ar}.json.
// Fonctionne sans serveur (compatible build statique Cloudflare) : lit directement le texte
// des pages (objet `C` de chaque pages/[lang]/*.vue), le plan du site et le glossaire.
// Lancé automatiquement avant chaque build (voir package.json, « prebuild »).
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs'
import { parse as parseSfc } from '@vue/compiler-sfc'
import { parse as parseJs } from '@babel/parser'

const root = new URL('../', import.meta.url)
const LOCALES = ['fr', 'en', 'ar']
// Tous les mots distincts de la page (≈ 170 Ko par langue, ≈ 65 Ko compressé) :
// chaque mot du site est trouvable. Baisser cette valeur pour alléger l'index.
const MAX_KEYWORDS = Infinity

const siteMap = JSON.parse(readFileSync(new URL('assets/data/site-map.json', root), 'utf8'))
const glossary = JSON.parse(readFileSync(new URL('assets/data/glossaire.json', root), 'utf8'))

// Minuscules, sans accents latins ni voyelles/tatweel arabes, alif unifié
// (même normalisation que components/SiteSearch.vue)
export const norm = s => (s || '')
  .toLowerCase()
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[ً-ٰٟـ]/g, '')
  .replace(/[إأآ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه')
  .replace(/[’'`ʿʾ]/g, '')

const STOP = new Set(`
au aux avec ce ces cette dans de des du elle elles en et est été être il ils la le les leur leurs lui mais même ne ni nos notre nous on ou où par pas plus pour qu que qui sa sans se ses si son sont sous sur ta te tes toi ton tous tout toute toutes très tu un une vers vos votre vous ont aussi comme dont entre après avant alors ainsi selon puis encore déjà fait faire peut était avait sera seul seule deux trois celle celui ceux cela ceci
the and for with from this that these those into over under about after before their there they them then than was were been being are its his her who whom which what when where while also such only other more most some many much very can could would should will shall has have had not but all any each both between during through upon against within without
في من على إلى عن مع هذا هذه ذلك تلك التي الذي الذين ثم أو أن إن كان كانت كما لم لا ما هو هي قد بعد قبل بين حتى عند كل غير بعض أي نحو لكن فقد وقد وفي ومن وهو وهي
`.split(/\s+/).filter(Boolean).map(norm))

// Valeurs techniques à ignorer (chemins, classes CSS, couleurs, identifiants)
const TECH = /^(\/|#|https?:|tile--|chip|s-\d|cols|[a-z0-9-]+\.(jpg|png|svg)$|[a-z]+(-[a-z0-9]+)+$|[a-z0-9_]+$)/

function stringsOf (node, out) {
  if (!node || typeof node !== 'object') return
  if (node.type === 'StringLiteral') { out.push(node.value); return }
  if (node.type === 'TemplateLiteral') { node.quasis.forEach(q => out.push(q.value.cooked || '')); return }
  for (const key of Object.keys(node)) {
    if (key === 'loc' || key === 'start' || key === 'end' || key === 'extra') continue
    const v = node[key]
    if (Array.isArray(v)) v.forEach(n => stringsOf(n, out))
    else if (v && typeof v === 'object' && v.type) stringsOf(v, out)
  }
}

// Texte de la page par langue, lu dans `const C = { fr: {...}, en: {...}, ar: {...} }`
function pageTexts (file) {
  const { descriptor } = parseSfc(readFileSync(file, 'utf8'))
  const code = (descriptor.scriptSetup || descriptor.script)?.content || ''
  const ast = parseJs(code, { sourceType: 'module', plugins: ['typescript'], errorRecovery: true })
  const texts = { fr: [], en: [], ar: [] }
  for (const stmt of ast.program.body) {
    if (stmt.type !== 'VariableDeclaration') continue
    for (const d of stmt.declarations) {
      if (d.id?.name !== 'C' || d.init?.type !== 'ObjectExpression') continue
      for (const prop of d.init.properties) {
        const lang = prop.key?.name || prop.key?.value
        if (!texts[lang]) continue
        const out = []
        stringsOf(prop.value, out)
        texts[lang] = out
          .map(s => s.replace(/<[^>]+>/g, ' ').trim())
          .filter(s => s && !TECH.test(s))
      }
    }
  }
  return texts
}

function keywords (strings) {
  const freq = new Map()
  for (const s of strings) {
    for (const raw of s.split(/[^\p{L}\p{N}]+/u)) {
      const w = norm(raw)
      // Garde les dates (218, 1979) mais pas « 000 » ni les chiffres romains des références
      if (w.length < 3 || STOP.has(w) || /^0+$/.test(w) || /^[ivxlc]+$/.test(w)) continue
      // Les noms propres (majuscule initiale) comptent double
      const bonus = /^\p{Lu}/u.test(raw) ? 2 : 1
      freq.set(w, (freq.get(w) || 0) + bonus)
    }
  }
  return [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, MAX_KEYWORDS).map(([w]) => w)
}

const pagesDir = new URL('pages/[lang]/', root)
const files = new Set(readdirSync(pagesDir).filter(f => f.endsWith('.vue')))
const cache = {}
const textsFor = slug => {
  const f = `${slug || 'index'}.vue`
  if (!files.has(f)) return { fr: [], en: [], ar: [] }
  return (cache[f] ||= pageTexts(new URL(f, pagesDir)))
}

mkdirSync(new URL('public/search/', root), { recursive: true })
const glossGroup = siteMap.groups.find(g => g.key === 'site')?.pages.find(p => p.slug === 'glossaire')?.label

for (const lang of LOCALES) {
  const index = []
  for (const g of siteMap.groups) {
    for (const p of g.pages) {
      const texts = textsFor(p.slug)[lang]
      const label = p.label[lang] || p.label.fr
      const desc = p.desc[lang] || p.desc.fr
      index.push({
        path: `/${lang}${p.slug ? `/${p.slug}` : ''}`,
        group: g.label[lang] || g.label.fr,
        label,
        desc,
        k: keywords([label, label, desc, ...texts]).join(' ')
      })
    }
  }
  // Chaque terme du glossaire devient une entrée qui mène à sa définition
  for (const t of glossary.terms || glossary.entries || []) {
    const def = (t.def?.[lang] || t.def?.fr || '').replace(/\s+/g, ' ')
    index.push({
      path: `/${lang}/glossaire#${t.id}`,
      group: glossGroup?.[lang] || 'Glossaire',
      label: t.term?.[lang] || t.term?.fr,
      desc: def.length > 170 ? def.slice(0, 167) + '…' : def,
      k: [...new Set([t.term?.fr, t.term?.en, t.term?.ar, ...(t.alias || [])].filter(Boolean).map(norm))].join(' ')
    })
  }
  const json = JSON.stringify(index)
  writeFileSync(new URL(`public/search/${lang}.json`, root), json)
  console.log(`search/${lang}.json : ${index.length} entrées, ${(json.length / 1024).toFixed(0)} Ko`)
}
