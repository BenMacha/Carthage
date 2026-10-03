// Traduction locale avec Ollama : complète i18n/locales/<langue>/<clé>.json à partir de
// i18n/source/<clé>.json, uniquement pour les textes manquants (reprise possible à tout moment).
//
// Usage : node scripts/i18n/translate-ollama.mjs <langue> [clé…] [--model qwen3:14b] [--batch 12]
// Ex.   : node scripts/i18n/translate-ollama.mjs es
//         node scripts/i18n/translate-ollama.mjs it glossaire-data quiz --model qwen3:14b
// Puis  : node scripts/i18n/check.mjs <langue>
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs'

const root = new URL('../../', import.meta.url)
const args = process.argv.slice(2)
const opt = (name, def) => { const i = args.indexOf(`--${name}`); if (i < 0) return def; const v = args[i + 1]; args.splice(i, 2); return v }
const MODEL = opt('model', 'qwen3:14b')
const BATCH = Number(opt('batch', 12))
const HOST = opt('host', 'http://localhost:11434')
const [lang, ...only] = args
if (!lang) { console.error('Usage : node scripts/i18n/translate-ollama.mjs <langue> [clé…] [--model qwen3]'); process.exit(1) }

const LANG = {
  it: ['Italian', 'Cartagine, Annibale, Amilcare Barca, Asdrubale, Magone, Annone, Didone/Elissa, Sofonisba, Massinissa, Scipione, Canne, Trasimeno, Zama; "a.C."'],
  es: ['Spanish', 'Cartago, Aníbal, Amílcar Barca, Asdrúbal, Magón, Hannón, Dido/Elisa, Sofonisba, Masinisa, Escipión, Cannas; "a. C."'],
  de: ['German (use "Sie" in the interface)', 'Karthago, Hannibal, Hamilkar Barkas, Hasdrubal, Mago, Hanno, Dido/Elissa, Sophonisbe, Massinissa, Scipio, Cannae; "v. Chr."'],
  pt: ['European Portuguese', 'Cartago, Aníbal, Amílcar Barca, Asdrúbal, Magão, Hanão, Dido/Elissa, Sofonisba, Massinissa, Cipião, Canas; "a.C."'],
  nl: ['Dutch', 'Carthago, Hannibal, Hamilcar Barkas, Hasdrubal, Mago, Hanno, Dido/Elissa, Sophonisbe, Massinissa, Scipio, Cannae; "v.Chr."'],
  mt: ['Maltese (standard orthography with ħ ż ġ ċ)', 'Kartaġni, Annibale, Ħamilkar, Ħasdrubal, Magun, Annun, Didun, Sofonisba; "QK"'],
  tr: ['Turkish', 'Kartaca, Hannibal, Hamilkar Barka, Hasdrubal, Magon, Hanno, Dido/Elissa, Sofonisba, Massinissa, Scipio, Cannae; "MÖ"'],
  ru: ['Russian', 'Карфаген, Ганнибал, Гамилькар Барка, Гасдрубал, Магон, Ганнон, Дидона/Элисса, Софонисба, Масинисса, Сципион, Канны, Тразименское озеро, Зама; "до н. э."'],
  zh: ['Simplified Chinese (full-width punctuation ，。：「」)', '迦太基, 汉尼拔, 哈米尔卡·巴卡, 哈斯德鲁巴, 马戈, 汉诺, 狄多/埃莉莎, 索芙妮斯芭, 马西尼萨, 西庇阿, 坎尼, 特拉西梅诺湖, 扎马; "公元前"'],
  ja: ['Japanese (encyclopedic である style for prose, です/ます for buttons)', 'カルタゴ, ハンニバル, ハミルカル・バルカ, ハスドルバル, マゴ, ハンノ, ディド/エリッサ, ソフォニスバ, マシニッサ, スキピオ, カンナエ, トラシメヌス湖, ザマ; "紀元前"'],
  aeb: ['Tunisian Arabic (Derja) written in Arabic script, natural Tunisian wording (برشا، باش، متاع، كيفاش، هاذي). Use the Arabic reference for historical terms. Never Latin letters', 'قرطاج، حنبعل، حملقار، صدربعل، البونيقي'],
  ber: ['Tamazight (standard Latin Amazigh alphabet with ɣ ɛ ḥ ṣ ṭ ḍ ẓ č ǧ, Kabyle/North-African usage, simple and clear)', 'Qarṭaǧ; keep proper names']
}
if (!LANG[lang]) { console.error(`Langue inconnue : ${lang}`); process.exit(1) }
const [langName, names] = LANG[lang]

const SYSTEM = `You are a professional translator of an educational website about ancient Carthage, from French into ${langName}.
Rules: keep every HTML tag (<b>, <i>, <br>, <span ...>) and numbers unchanged; translate "av. J.-C." into the target-language form; keep Latin/Greek quotations in the original but translate their French gloss; modern book titles stay in their original title; short texts are UI labels (menus, buttons): keep them short; no translator notes; similar length.
Proper names: ${names}.`

const tags = s => (s.match(/<\/?[a-z]+[^>]*>/gi) || []).map(t => t.replace(/\s.*>/, '>').toLowerCase()).sort().join('')

// Le modèle reçoit le français à traduire et l'anglais (ou l'arabe) en simple référence ;
// un schéma JSON impose { "0": "traduction", … } (sinon qwen3 recopie l'entrée).
async function ask (entries, src, strict = true) {
  const fr = {}
  const ref = {}
  entries.forEach(([path, text], i) => {
    fr[i] = text
    ref[i] = (lang === 'aeb' ? src.ar?.[path] : null) || src.en?.[path] || text
  })
  const refName = lang === 'aeb' ? 'ARABIC' : 'ENGLISH'
  const user = `Translate each French text into ${langName}.\n\nFRENCH (to translate):\n${JSON.stringify(fr, null, 1)}\n\n${refName} (reference only):\n${JSON.stringify(ref, null, 1)}\n\nAnswer: JSON object, same ids, each value = the translation.`
  const ids = Object.keys(fr)
  const res = await fetch(`${HOST}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      stream: false,
      think: false,
      format: { type: 'object', properties: Object.fromEntries(ids.map(i => [i, { type: 'string' }])), required: ids },
      options: { temperature: 0.2, num_ctx: 8192 },
      messages: [{ role: 'system', content: SYSTEM }, { role: 'user', content: user }]
    })
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  const out = JSON.parse(data.message.content)
  const ok = {}
  entries.forEach(([path, text], i) => {
    const t = out[i]
    if (typeof t === 'string' && t.trim() && tags(t) === tags(text) && (!strict || t !== text || text.length < 25)) ok[path] = t.trim()
  })
  return ok
}

const sources = readdirSync(new URL('i18n/source/', root)).filter(f => f.endsWith('.json')).map(f => f.replace('.json', ''))
const keys = only.length ? only : sources
mkdirSync(new URL(`i18n/locales/${lang}/`, root), { recursive: true })

for (const key of keys) {
  const src = JSON.parse(readFileSync(new URL(`i18n/source/${key}.json`, root), 'utf8'))
  const file = new URL(`i18n/locales/${lang}/${key}.json`, root)
  let tr = {}
  if (existsSync(file)) try { tr = JSON.parse(readFileSync(file, 'utf8')) } catch { tr = {} }
  // Ne garde que des chemins connus, dans l'ordre de la source.
  const save = () => {
    const ordered = {}
    for (const p of Object.keys(src.fr)) if (tr[p]) ordered[p] = tr[p]
    writeFileSync(file, JSON.stringify(ordered, null, 1) + '\n')
  }
  const missing = Object.entries(src.fr).filter(([p]) => !tr[p])
  if (!missing.length) { console.log(`${key} : complet`); continue }
  console.log(`${key} : ${missing.length} texte(s) à traduire`)
  for (let i = 0; i < missing.length; i += BATCH) {
    let todo = missing.slice(i, i + BATCH)
    for (let attempt = 1; attempt <= 3 && todo.length; attempt++) {
      try {
        Object.assign(tr, await ask(todo, src))
      } catch (e) {
        console.warn(`  essai ${attempt} : ${e.message}`)
      }
      todo = todo.filter(([p]) => !tr[p])
      // Après un échec en lot, réessaie texte par texte (en acceptant un texte identique : références, titres d'œuvres).
      if (todo.length && attempt === 2) {
        for (const one of todo) { try { Object.assign(tr, await ask([one], src, false)) } catch {} }
        todo = todo.filter(([p]) => !tr[p])
      }
    }
    if (todo.length) console.warn(`  ${todo.length} texte(s) non traduit(s) : ${todo.map(([p]) => p).join(', ')}`)
    save()
    process.stdout.write(`  ${Math.min(i + BATCH, missing.length)}/${missing.length}\r`)
  }
  console.log()
}
console.log(`Terminé. Vérifier : node scripts/i18n/check.mjs ${lang}`)
