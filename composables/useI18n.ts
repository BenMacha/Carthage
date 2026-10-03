import { fr } from '~/i18n/fr'
import { en } from '~/i18n/en'
import { ar } from '~/i18n/ar'
import LOCALES from '~/i18n/locales.json'

type Strings = typeof fr

import { applyFlat } from '~/utils/i18n-flat'

// Chaînes globales (nom du site, pied de page) des langues ajoutées :
// table plate i18n/locales/<code>/global.json appliquée sur le français.
const extra = import.meta.glob('/i18n/locales/*/global.json', { eager: true, import: 'default' }) as Record<string, Record<string, string>>

const strings: Record<string, Strings> = { fr, en, ar }
for (const loc of LOCALES) {
  if (strings[loc.code]) continue
  strings[loc.code] = { ...applyFlat(fr, extra[`/i18n/locales/${loc.code}/global.json`]), lang: loc.code, dir: loc.dir } as Strings
}

export const LOCALE_CODES = LOCALES.map(l => l.code)
export const isRtlLocale = (code: string) => LOCALES.find(l => l.code === code)?.dir === 'rtl'

// Langue lue dans l'URL (/fr, /it, /aeb…). `lang` et `dir` sur <html> sont posés par le layout (useHead).
export const useI18n = () => {
  const route = useRoute()

  const locale = computed(() => {
    const lang = route.params.lang as string
    return strings[lang] ? lang : 'fr'
  })

  const t = computed(() => strings[locale.value] || fr)
  const isRtl = computed(() => isRtlLocale(locale.value))
  const meta = computed(() => LOCALES.find(l => l.code === locale.value) || LOCALES[0])

  const setLocale = (newLocale: string) => {
    if (!strings[newLocale] || newLocale === locale.value) return
    const rest = route.path.replace(new RegExp(`^/(${LOCALE_CODES.join('|')})(?=/|$)`), '')
    navigateTo({ path: `/${newLocale}${rest}`, hash: route.hash })
  }

  const localePath = (path: string) => (path === '/' ? `/${locale.value}` : `/${locale.value}${path}`)

  const availableLocales = LOCALES.map(l => ({ code: l.code, label: l.name, beta: !!(l as any).beta }))

  return { t, locale, isRtl, meta, setLocale, localePath, availableLocales }
}
