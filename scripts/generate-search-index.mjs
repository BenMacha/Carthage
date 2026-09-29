// Génère l'index de recherche du site (public/search/{fr,en,ar}.json) en parcourant
// le rendu serveur de chaque page listée dans assets/data/site-map.json.
// Lancé après `nuxt build` (voir package.json, « postbuild ») : démarre .output/server,
// lit chaque page, extrait titre, description, intertitres et texte, puis écrit l'index
// dans public/search/ (versionné). Nitro fige la liste des fichiers statiques au build :
// si l'index a changé, le script relance donc `nuxt build` une fois pour qu'il soit servi.
import { spawn } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { createServer } from 'node:net'

const root = new URL('../', import.meta.url)
const LOCALES = ['fr', 'en', 'ar']
const BODY_MAX = 5000

const { groups } = JSON.parse(readFileSync(new URL('assets/data/site-map.json', root), 'utf8'))
const pages = groups.flatMap(g => g.pages.map(p => ({ ...p, group: g.label })))

const freePort = () => new Promise(resolve => {
  const srv = createServer().listen(0, () => { const { port } = srv.address(); srv.close(() => resolve(port)) })
})

const decode = s => s
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'").replace(/&#x2F;/g, '/')
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
  .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))

const strip = html => decode(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim()

function extract (html) {
  const title = strip((html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '')
  const desc = decode((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '')
  const main = (html.match(/<main[^>]*>([\s\S]*?)<\/main>/) || [])[1] || ''
  const clean = main.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<svg[\s\S]*?<\/svg>/g, ' ')
  const headings = [...clean.matchAll(/<h([1-3])[^>]*>([\s\S]*?)<\/h\1>/g)].map(m => strip(m[2])).filter(Boolean)
  const body = strip(clean).slice(0, BODY_MAX)
  return { title, desc, headings: [...new Set(headings)].slice(0, 40), body }
}

async function main () {
  if (!existsSync(new URL('.output/server/index.mjs', root))) {
    console.error('search : .output absent — lancer `nuxt build` d\'abord')
    process.exit(1)
  }
  const port = await freePort()
  const server = spawn(process.execPath, ['.output/server/index.mjs'], {
    cwd: root, env: { ...process.env, PORT: String(port), HOST: '127.0.0.1', NITRO_PORT: String(port), NITRO_HOST: '127.0.0.1' }, stdio: 'ignore'
  })
  const base = `http://127.0.0.1:${port}`
  let changed = false
  try {
    for (let i = 0; i < 60; i++) {
      try { await fetch(`${base}/fr`); break } catch { await new Promise(r => setTimeout(r, 250)) }
    }
    for (const lang of LOCALES) {
      const index = []
      for (const p of pages) {
        const path = `/${lang}${p.slug ? `/${p.slug}` : ''}`
        const res = await fetch(base + path)
        if (!res.ok) { console.warn(`search : ${path} → ${res.status}`); continue }
        const data = extract(await res.text())
        index.push({ path, group: p.group[lang] || p.group.fr, label: p.label[lang] || p.label.fr, ...data })
      }
      const json = JSON.stringify(index)
      const file = new URL(`public/search/${lang}.json`, root)
      const served = new URL(`.output/public/search/${lang}.json`, root)
      if (!existsSync(served) || readFileSync(served, 'utf8') !== json) changed = true
      mkdirSync(new URL('public/search/', root), { recursive: true })
      writeFileSync(file, json)
      console.log(`search/${lang}.json : ${index.length} pages, ${(json.length / 1024).toFixed(0)} Ko`)
    }
  } finally {
    server.kill()
  }
  if (changed && !process.env.SEARCH_INDEX_REBUILD) {
    console.log('search : index modifié, nouveau build pour le servir…')
    const rebuild = spawn('npx', ['nuxt', 'build'], { cwd: root, stdio: 'inherit', env: { ...process.env, SEARCH_INDEX_REBUILD: '1' } })
    await new Promise((resolve, reject) => rebuild.on('exit', code => (code === 0 ? resolve() : reject(new Error(`nuxt build : ${code}`)))))
  }
}

main().catch(err => { console.error(err); process.exit(1) })
