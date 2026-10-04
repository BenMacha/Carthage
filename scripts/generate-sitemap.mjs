// Génère public/sitemap.xml (toutes les langues de i18n/locales.json + hreflang) et son habillage public/sitemap.xsl
// à partir de assets/data/site-map.json. Vérifie que chaque page de pages/[lang]/ y figure.
// Lancé automatiquement avant `nuxt build` / `nuxt generate` (voir package.json).
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'

const SITE = 'https://carthage.benmacha.tn'
const LOCALES = JSON.parse(readFileSync(new URL('../i18n/locales.json', import.meta.url), 'utf8'))
const CODES = LOCALES.map(l => l.code)
const PRIORITY = { '': '1.0', tunisie: '0.9', hannibal: '0.9', carte: '0.9', credits: '0.3', 'plan-du-site': '0.3' }
const TONES = { purple: ['#6E1E47', '#FFFFFF'], terra: ['#B8492A', '#FFFFFF'], ink: ['#16130F', '#FFFFFF'], gold: ['#D6A23E', '#16130F'], navy: ['#1D3F66', '#FFFFFF'], sand: ['#E6DED1', '#16130F'] }

const root = new URL('../', import.meta.url)
const today = new Date().toISOString().slice(0, 10)
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const { groups } = JSON.parse(readFileSync(new URL('assets/data/site-map.json', root), 'utf8'))
const listed = groups.flatMap(g => g.pages.map(p => p.slug))
const files = readdirSync(new URL('pages/[lang]/', root))
  .filter(f => f.endsWith('.vue'))
  .map(f => (f === 'index.vue' ? '' : f.slice(0, -4)))

const missing = files.filter(s => !listed.includes(s))
const orphans = listed.filter(s => !files.includes(s))
if (missing.length || orphans.length) {
  console.error(`site-map.json désynchronisé — pages absentes : [${missing.join(', ')}] ; entrées sans page : [${orphans.join(', ')}]`)
  process.exit(1)
}

const pathOf = slug => (slug ? `/${slug}` : '')

/* ---------- sitemap.xml ---------- */
const urls = listed.flatMap(slug => {
  const path = pathOf(slug)
  const alternates = [
    ...LOCALES.map(l => `    <xhtml:link rel="alternate" hreflang="${l.hreflang}" href="${SITE}/${l.code}${path}"/>`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}/fr${path}"/>`
  ].join('\n')
  return CODES.map(l => `  <url>
    <loc>${SITE}/${l}${path}</loc>
${alternates}
    <lastmod>${today}</lastmod>
    <changefreq>${slug === '' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${PRIORITY[slug] ?? '0.8'}</priority>
  </url>`)
})

writeFileSync(new URL('public/sitemap.xml', root), `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`)

/* ---------- sitemap.xsl (affichage lisible dans le navigateur) ---------- */
// La structure (rubriques, libellés) vient de site-map.json ; les données (dates, priorités) du XML.
const groupBlocks = groups.map(g => {
  const [bg, fg] = TONES[g.tone] || TONES.sand
  const rows = g.pages.map(p => {
    const loc = `${SITE}/fr${pathOf(p.slug)}`
    return `
          <xsl:for-each select="s:urlset/s:url[s:loc='${loc}']">
            <li class="row">
              <div class="row-main">
                <a class="row-title" href="{s:loc}">${esc(p.label.fr)}</a>
                <span class="row-sub">${esc(p.label.en)} · <span dir="rtl" lang="ar">${esc(p.label.ar)}</span></span>
              </div>
              <div class="row-langs">
                <xsl:for-each select="xhtml:link[@hreflang!='x-default']">
                  <a class="lang" href="{@href}"><xsl:value-of select="translate(substring-before(concat(@hreflang, '-'), '-'), 'abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ')"/></a>
                </xsl:for-each>
              </div>
              <span class="row-meta"><xsl:value-of select="s:priority"/></span>
            </li>
          </xsl:for-each>`
  }).join('')
  return `
      <section class="group">
        <header class="group-head" style="background:${bg};color:${fg}">
          <span class="count">${g.pages.length} page${g.pages.length > 1 ? 's' : ''}</span>
          <h2>${esc(g.label.fr)}</h2>
          <span class="alt">${esc(g.label.en)} · <span dir="rtl" lang="ar">${esc(g.label.ar)}</span></span>
        </header>
        <ul class="rows">${rows}
        </ul>
      </section>`
}).join('')

writeFileSync(new URL('public/sitemap.xsl', root), `<?xml version="1.0" encoding="UTF-8"?>
<!-- Généré par scripts/generate-sitemap.mjs — ne pas modifier à la main. -->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  exclude-result-prefixes="s xhtml">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="fr">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="robots" content="noindex"/>
        <title>Sitemap — Carthage</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,700..900&amp;family=Instrument+Sans:wght@400;500;600&amp;family=Noto+Sans+Phoenician&amp;family=Noto+Naskh+Arabic:wght@400;700&amp;display=swap"/>
        <style>
          *{box-sizing:border-box;margin:0;padding:0}
          body{background:#F4EEE3;color:#16130F;font:400 15px/1.5 'Instrument Sans',system-ui,sans-serif;-webkit-font-smoothing:antialiased}
          a{color:inherit;text-decoration:none}
          [lang=ar]{font-family:'Noto Naskh Arabic',serif}
          .wrap{max-width:1200px;margin:0 auto;padding:clamp(12px,2vw,24px)}
          .top{display:flex;justify-content:space-between;align-items:center;background:#fff;border-radius:999px;padding:8px 8px 8px 22px}
          .brand{display:flex;align-items:center;gap:10px;font:800 19px/1 'Archivo',sans-serif;font-stretch:112%}
          .tanit{display:flex;flex-direction:column;align-items:center;gap:2px}
          .tanit i{display:block;background:#6E1E47}
          .tanit i:nth-child(1){width:11px;height:11px;border-radius:50%}
          .tanit i:nth-child(2){width:20px;height:3px;border-radius:2px}
          .tanit i:nth-child(3){width:16px;height:12px;clip-path:polygon(50% 0,100% 100%,0 100%)}
          .top-link{background:#16130F;color:#fff;border-radius:999px;padding:12px 18px;font-weight:600;font-size:14px}
          .hero{display:grid;grid-template-columns:minmax(0,2fr) minmax(0,1fr);gap:12px;margin-top:12px}
          .hero-main{position:relative;overflow:hidden;background:#16130F;color:#fff;border-radius:32px;padding:clamp(24px,4vw,48px);min-height:280px;display:flex;flex-direction:column;justify-content:space-between;gap:24px}
          .wm{position:absolute;inset-inline-end:-8px;bottom:-24px;font:400 clamp(80px,12vw,160px)/1 'Noto Sans Phoenician',sans-serif;color:rgba(255,255,255,.06);white-space:nowrap}
          .chip{align-self:flex-start;position:relative;background:rgba(255,255,255,.14);border-radius:999px;padding:8px 12px;font-weight:600;font-size:13px}
          h1{position:relative;font:900 clamp(44px,7vw,88px)/.9 'Archivo',sans-serif;letter-spacing:-.04em}
          .lede{position:relative;margin-top:14px;color:#C9C0B3;max-width:560px;font-size:clamp(15px,1.3vw,18px)}
          .hero-side{background:#fff;border-radius:32px;padding:clamp(22px,3vw,36px);display:flex;flex-direction:column;justify-content:center;gap:10px}
          .stat{display:flex;align-items:baseline;gap:14px;padding:10px 0;border-top:1px solid rgba(22,19,15,.1)}
          .stat:first-child{border-top:0}
          .stat b{font:900 clamp(34px,4vw,48px)/1 'Archivo',sans-serif;color:#6E1E47;min-width:84px}
          .stat span{color:#6B6258}
          .group{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,3fr);gap:12px;margin-top:12px}
          .group-head{border-radius:28px;padding:26px;display:flex;flex-direction:column;justify-content:flex-end;gap:6px;min-height:150px}
          .group-head h2{font:800 clamp(26px,3vw,38px)/.98 'Archivo',sans-serif;letter-spacing:-.03em}
          .count{font-weight:700;font-size:13px;opacity:.8;margin-bottom:auto}
          .alt{font-size:13px;opacity:.75}
          .rows{list-style:none;display:flex;flex-direction:column;gap:6px}
          .row{display:grid;grid-template-columns:minmax(0,1fr) auto 48px;align-items:center;gap:16px;background:#fff;border-radius:18px;padding:12px 12px 12px 20px}
          .row-title{display:block;font:800 18px/1.2 'Archivo',sans-serif}
          .row-title:hover{color:#6E1E47}
          .row-sub{display:block;color:#6B6258;font-size:13px;margin-top:2px}
          .row-langs{display:flex;flex-wrap:wrap;gap:4px;max-width:440px;justify-content:flex-end}
          .lang{display:grid;place-items:center;min-width:38px;height:30px;padding:0 6px;border-radius:999px;background:#F4EEE3;font-weight:600;font-size:11px}
          .lang:hover{background:#16130F;color:#fff}
          .row-meta{justify-self:end;font-size:12px;color:#A9A094;font-variant-numeric:tabular-nums}
          .foot{margin-top:12px;background:#16130F;color:#A9A094;border-radius:28px;padding:22px 26px;display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px;font-size:13px}
          .foot a{color:#E7B75A}
          @media (max-width:860px){.hero,.group{grid-template-columns:minmax(0,1fr)}.group-head{min-height:0}}
          .row-langs{} @media (max-width:560px){.row{grid-template-columns:minmax(0,1fr);gap:10px}.row-langs{justify-content:flex-start;max-width:none}.row-meta{display:none}.top-link{padding:11px 14px}}
        </style>
      </head>
      <body>
        <div class="wrap">
          <header class="top">
            <a class="brand" href="/fr"><span class="tanit"><i></i><i></i><i></i></span>Carthage</a>
            <a class="top-link" href="/fr/plan-du-site">Plan du site →</a>
          </header>
          <section class="hero">
            <div class="hero-main">
              <span class="wm" aria-hidden="true">𐤒𐤓𐤕𐤇𐤃𐤔𐤕</span>
              <span class="chip">sitemap.xml</span>
              <div>
                <h1>Sitemap</h1>
                <p class="lede">Fichier destiné aux moteurs de recherche : chaque page, ses versions linguistiques (hreflang) et sa priorité.</p>
              </div>
            </div>
            <div class="hero-side">
              <div class="stat"><b><xsl:value-of select="count(s:urlset/s:url)"/></b><span>adresses</span></div>
              <div class="stat"><b><xsl:value-of select="count(s:urlset/s:url) div ${CODES.length}"/></b><span>pages</span></div>
              <div class="stat"><b>${CODES.length}</b><span>langues</span></div>
            </div>
          </section>
${groupBlocks}
          <footer class="foot">
            <span>Mis à jour le <xsl:value-of select="s:urlset/s:url[1]/s:lastmod"/></span>
            <span><a href="/llms.txt">llms.txt</a> · <a href="/robots.txt">robots.txt</a> · <a href="/fr/credits">Crédits</a></span>
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
`)

console.log(`sitemap.xml : ${urls.length} URL (${listed.length} pages × ${LOCALES.length} langues) + sitemap.xsl`)
