<template>
  <div class="app-layout">
    <AppNavbar />
    <main>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
const SITE = 'https://carthage.benmacha.tn'
const LOCALES = ['fr', 'en', 'ar']
const OG_LOCALE = { fr: 'fr_FR', en: 'en_GB', ar: 'ar_TN' }

const route = useRoute()
const { t, locale } = useI18n()

// Chemin sans préfixe de langue : /fr/hannibal → /hannibal
const rest = computed(() => route.path.replace(/^\/(fr|en|ar)(?=\/|$)/, '').replace(/\/$/, ''))
const urlFor = (l) => `${SITE}/${l}${rest.value}`

useHead(() => ({
  htmlAttrs: { lang: t.value.lang, dir: t.value.dir },
  // Suffixe « — Carthage » seulement si le titre ne nomme pas déjà Carthage
  titleTemplate: (title) => {
    if (!title) return 'Carthage — Qart-Ḥadasht'
    return /Carthag|قرطاج/.test(title) ? title : `${title} — Carthage`
  },
  link: [
    { rel: 'canonical', href: urlFor(locale.value) },
    ...LOCALES.map(l => ({ rel: 'alternate', hreflang: l, href: urlFor(l) })),
    { rel: 'alternate', hreflang: 'x-default', href: urlFor('fr') }
  ],
  meta: [
    { property: 'og:site_name', content: 'Carthage' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: urlFor(locale.value) },
    { property: 'og:locale', content: OG_LOCALE[locale.value] },
    { property: 'og:image', content: `${SITE}/img/ruins.jpg` },
    { name: 'twitter:card', content: 'summary_large_image' }
  ]
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
</style>
