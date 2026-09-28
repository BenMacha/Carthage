// Génère assets/data/credits.json (page /credits) depuis public/img/CREDITS.md.
// Lancé automatiquement avant `nuxt build` (voir package.json).
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'

const root = new URL('../', import.meta.url)
const byFile = new Map()

for (const line of readFileSync(new URL('public/img/CREDITS.md', root), 'utf8').split('\n')) {
  if (!line.startsWith('| ') || line.startsWith('| File')) continue
  const [file, page, author, license] = line.trim().replace(/^\||\|$/g, '').split('|').map(s => s.trim())
  if (!license) continue
  const m = page.match(/\[(?:File:)?(.*?)\]\((.*?)\)/)
  // La dernière ligne d'un fichier l'emporte (image remplacée)
  byFile.set(file, { file, title: m ? m[1] : page, url: m ? m[2] : '', author, license })
}

const images = [...byFile.values()].sort((a, b) => a.file.localeCompare(b.file))
const uncredited = readdirSync(new URL('public/img/', root))
  .filter(f => /\.(jpe?g|png|webp)$/.test(f) && !byFile.has(f))

writeFileSync(new URL('assets/data/credits.json', root), JSON.stringify({ images, uncredited }, null, 1) + '\n')
console.log(`credits.json : ${images.length} images créditées${uncredited.length ? `, SANS crédit : ${uncredited.join(', ')}` : ''}`)
