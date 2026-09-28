// Génère public/sitemap.xml à partir des routes de pages/[lang]/ (fr, en, ar + hreflang).
// Lancé automatiquement avant `nuxt build` / `nuxt generate` (voir package.json).
import { readdirSync, writeFileSync } from 'node:fs'

const SITE = 'https://carthage.benmacha.tn'
const LOCALES = ['fr', 'en', 'ar']
const PRIORITY = { index: '1.0', tunisie: '0.9', hannibal: '0.9', carte: '0.9', credits: '0.3' }
const today = new Date().toISOString().slice(0, 10)

const pages = readdirSync(new URL('../pages/[lang]/', import.meta.url))
  .filter(f => f.endsWith('.vue'))
  .map(f => f.slice(0, -4))
  .sort((a, b) => (a === 'index' ? -1 : b === 'index' ? 1 : a.localeCompare(b)))

const urls = pages.flatMap(page => {
  const path = page === 'index' ? '' : `/${page}`
  const alternates = [
    ...LOCALES.map(l => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE}/${l}${path}"/>`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}/fr${path}"/>`
  ].join('\n')
  return LOCALES.map(l => `  <url>
    <loc>${SITE}/${l}${path}</loc>
${alternates}
    <lastmod>${today}</lastmod>
    <changefreq>${page === 'index' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${PRIORITY[page] ?? '0.8'}</priority>
  </url>`)
})

writeFileSync(new URL('../public/sitemap.xml', import.meta.url), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`)
console.log(`sitemap.xml : ${urls.length} URL (${pages.length} pages × ${LOCALES.length} langues)`)
