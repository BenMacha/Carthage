// Vérifie les traductions : i18n/locales/<langue>/<clé>.json face à i18n/source/<clé>.json.
//
// Contrôles : textes manquants, clés inconnues, valeurs vides, balises HTML conservées,
// écriture attendue (arabe, cyrillique, chinois, japonais), textes laissés en français.
//
// Usage : node scripts/i18n/check.mjs            → toutes les langues, résumé
//         node scripts/i18n/check.mjs it         → une langue, détail des problèmes
//         node scripts/i18n/check.mjs it hannibal→ une langue, un fichier
import { readFileSync, readdirSync, existsSync } from 'node:fs'

const root = new URL('../../', import.meta.url)
const LOCALES = JSON.parse(readFileSync(new URL('i18n/locales.json', root), 'utf8'))
const NATIVE = new Set(['fr', 'en', 'ar'])
const SCRIPT = {
  aeb: /\p{Script=Arabic}/u,
  ru: /\p{Script=Cyrillic}/u,
  zh: /\p{Script=Han}/u,
  ja: /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/u
}

const sources = readdirSync(new URL('i18n/source/', root)).filter(f => f.endsWith('.json')).map(f => f.replace('.json', ''))
const tags = s => (s.match(/<\/?[a-z]+[^>]*>/gi) || []).map(t => t.replace(/\s.*>/, '>').toLowerCase()).sort().join('')

export function checkFile (lang, key) {
  const src = JSON.parse(readFileSync(new URL(`i18n/source/${key}.json`, root), 'utf8'))
  const file = new URL(`i18n/locales/${lang}/${key}.json`, root)
  const fr = src.fr
  const total = Object.keys(fr).length
  if (!existsSync(file)) return { total, done: 0, problems: [`fichier absent`] }
  let tr
  try { tr = JSON.parse(readFileSync(file, 'utf8')) } catch (e) { return { total, done: 0, problems: [`JSON invalide : ${e.message}`] } }
  const problems = []
  let done = 0
  let sameAsFr = 0
  for (const [path, frText] of Object.entries(fr)) {
    const t = tr[path]
    if (t == null) { problems.push(`manquant : ${path}`); continue }
    if (typeof t !== 'string' || !t.trim()) { problems.push(`vide : ${path}`); continue }
    done++
    if (tags(t) !== tags(frText)) problems.push(`balises HTML différentes : ${path}`)
    if (t === frText && frText.length > 25) sameAsFr++
    if (SCRIPT[lang] && frText.length > 15 && !SCRIPT[lang].test(t)) problems.push(`écriture inattendue (pas en ${lang}) : ${path}`)
  }
  for (const path of Object.keys(tr)) if (!(path in fr)) problems.push(`clé inconnue : ${path}`)
  if (sameAsFr > Math.max(3, total * 0.2)) problems.push(`${sameAsFr} textes identiques au français (non traduits ?)`)
  return { total, done, problems }
}

const [lang, only] = process.argv.slice(2)
const langs = lang ? [lang] : LOCALES.map(l => l.code).filter(c => !NATIVE.has(c))
let bad = 0
for (const l of langs) {
  let total = 0
  let done = 0
  let issues = 0
  const detail = []
  for (const key of sources) {
    if (only && key !== only) continue
    const r = checkFile(l, key)
    total += r.total
    done += r.done
    issues += r.problems.length
    if (r.problems.length) detail.push(`  ${key} : ${r.problems.length} problème(s)\n` + r.problems.slice(0, 8).map(p => `    - ${p}`).join('\n'))
  }
  const pct = total ? Math.round((done / total) * 100) : 0
  console.log(`${l.padEnd(4)} ${String(pct).padStart(3)} %  (${done}/${total} textes)  ${issues ? `${issues} problème(s)` : 'OK'}`)
  if (lang && detail.length) console.log(detail.join('\n'))
  if (issues) bad++
}
process.exitCode = bad && lang ? 1 : 0
