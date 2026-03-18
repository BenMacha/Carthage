import { fr } from '~/i18n/fr'
import { en } from '~/i18n/en'
import { ar } from '~/i18n/ar'

const locales: Record<string, typeof fr> = { fr, en, ar }

export const useI18n = () => {
  const route = useRoute()

  const locale = computed(() => {
    const lang = route.params.lang as string
    return locales[lang] ? lang : 'fr'
  })

  const t = computed(() => locales[locale.value] || fr)

  const setLocale = (newLocale: string) => {
    if (locales[newLocale]) {
      const currentPath = route.path
      const currentLang = locale.value
      const newPath = currentPath.replace(`/${currentLang}`, `/${newLocale}`)
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('dir', locales[newLocale].dir)
        document.documentElement.setAttribute('lang', locales[newLocale].lang)
      }
      navigateTo(newPath)
    }
  }

  // Set dir/lang on mount
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('dir', t.value.dir)
    document.documentElement.setAttribute('lang', t.value.lang)
  }

  const localePath = (path: string) => `/${locale.value}${path}`

  const availableLocales = [
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ar', label: 'العربية', flag: '🇹🇳' },
  ]

  return { t, locale, setLocale, localePath, availableLocales }
}
