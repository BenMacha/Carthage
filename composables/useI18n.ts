import { fr } from '~/i18n/fr'
import { en } from '~/i18n/en'
import { ar } from '~/i18n/ar'

const locales: Record<string, typeof fr> = { fr, en, ar }

// Langue lue dans l'URL (/fr, /en, /ar). `lang` et `dir` sur <html> sont posés par le layout (useHead).
export const useI18n = () => {
  const route = useRoute()

  const locale = computed(() => {
    const lang = route.params.lang as string
    return locales[lang] ? lang : 'fr'
  })

  const t = computed(() => locales[locale.value] || fr)

  const setLocale = (newLocale: string) => {
    if (!locales[newLocale] || newLocale === locale.value) return
    const rest = route.path.replace(/^\/(fr|en|ar)(?=\/|$)/, '')
    navigateTo({ path: `/${newLocale}${rest}`, hash: route.hash })
  }

  const localePath = (path: string) => (path === '/' ? `/${locale.value}` : `/${locale.value}${path}`)

  const availableLocales = [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'العربية' }
  ]

  return { t, locale, setLocale, localePath, availableLocales }
}
