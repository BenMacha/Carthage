<template>
  <div class="app-layout">
    <a class="skip-link" href="#contenu">{{ skipLabel }}</a>
    <AppNavbar />
    <main id="contenu" tabindex="-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import SITE_MAP from '~/assets/data/site-map.json'

const SITE = 'https://carthage.benmacha.tn'
const LOCALES = ['fr', 'en', 'ar']
const OG_LOCALE = { fr: 'fr_FR', en: 'en_GB', ar: 'ar_TN' }

const route = useRoute()
const { t, locale } = useI18n()

// Chemin sans préfixe de langue : /fr/hannibal → /hannibal
const rest = computed(() => route.path.replace(/^\/(fr|en|ar)(?=\/|$)/, '').replace(/\/$/, ''))
const urlFor = (l) => `${SITE}/${l}${rest.value}`

// Fiche de la page courante dans le plan du site (libellé, description, image, rubrique)
const entry = computed(() => {
  const slug = rest.value.replace(/^\//, '')
  for (const g of SITE_MAP.groups) {
    const p = g.pages.find(x => x.slug === slug)
    if (p) return { ...p, group: g }
  }
  return null
})

const skipLabel = computed(() => ({ fr: 'Aller au contenu', en: 'Skip to content', ar: 'انتقل إلى المحتوى' })[locale.value] || 'Aller au contenu')

const tr = (o) => (o ? o[locale.value] || o.fr : '')
const brand = computed(() => (locale.value === 'ar' ? 'قرطاج' : 'Carthage'))
const image = computed(() => `${SITE}/img/${entry.value?.image || 'ruins.jpg'}`)

// Données structurées schema.org (JSON-LD) : site, fil d'Ariane, page (ou personnage)
const jsonLd = computed(() => {
  const e = entry.value
  const home = `${SITE}/${locale.value}`
  const graph = [
    { '@type': 'WebSite', '@id': `${SITE}/#website`, url: SITE, name: 'Carthage — Qart-Ḥadasht', inLanguage: LOCALES }
  ]
  if (e) {
    const crumbs = [{ '@type': 'ListItem', position: 1, name: brand.value, item: home }]
    if (e.slug) {
      crumbs.push({ '@type': 'ListItem', position: 2, name: tr(e.group.label), item: `${home}/plan-du-site#${e.group.key}` })
      crumbs.push({ '@type': 'ListItem', position: 3, name: tr(e.label), item: urlFor(locale.value) })
    }
    graph.push({ '@type': 'BreadcrumbList', itemListElement: crumbs })
    const page = {
      '@type': 'WebPage',
      url: urlFor(locale.value),
      name: tr(e.label),
      description: tr(e.desc),
      inLanguage: locale.value,
      image: image.value,
      isPartOf: { '@id': `${SITE}/#website` }
    }
    if (e.type === 'person') page.about = { '@type': 'Person', name: tr(e.label) }
    graph.push(page)
  }
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
})

useHead(() => ({
  htmlAttrs: { lang: t.value.lang, dir: t.value.dir },
  // Suffixe « — Carthage » seulement si le titre ne nomme pas déjà Carthage
  titleTemplate: (title) => {
    if (!title) return `${brand.value} — Qart-Ḥadasht`
    return /Carthag|قرطاج/.test(title) ? title : `${title} — ${brand.value}`
  },
  link: [
    { rel: 'canonical', href: urlFor(locale.value) },
    ...LOCALES.map(l => ({ rel: 'alternate', hreflang: l, href: urlFor(l) })),
    { rel: 'alternate', hreflang: 'x-default', href: urlFor('fr') }
  ],
  meta: [
    { property: 'og:site_name', content: 'Carthage' },
    { property: 'og:type', content: entry.value?.type === 'person' ? 'profile' : 'website' },
    { property: 'og:url', content: urlFor(locale.value) },
    { property: 'og:locale', content: OG_LOCALE[locale.value] },
    ...LOCALES.filter(l => l !== locale.value).map(l => ({ property: 'og:locale:alternate', content: OG_LOCALE[l] })),
    { property: 'og:title', content: entry.value ? `${tr(entry.value.label)} — ${brand.value}` : `${brand.value} — Qart-Ḥadasht` },
    { property: 'og:description', content: entry.value ? tr(entry.value.desc) : '' },
    { property: 'og:image', content: image.value },
    { property: 'og:image:alt', content: entry.value ? tr(entry.value.label) : brand.value },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:image', content: image.value }
  ],
  script: [{ type: 'application/ld+json', key: 'ld-json', innerHTML: jsonLd.value }]
}))
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

main:focus { outline: none; }

/* Lien d'évitement : visible seulement au focus clavier */
.skip-link {
  position: fixed;
  top: 12px;
  inset-inline-start: 12px;
  z-index: 3000;
  background: var(--ink);
  color: var(--white);
  padding: 12px 18px;
  border-radius: 999px;
  font: 600 14px/1 var(--font-body);
  transform: translateY(-200%);
  transition: transform 0.15s;
}

.skip-link:focus {
  transform: none;
  color: var(--white);
}
</style>
