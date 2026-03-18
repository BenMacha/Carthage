import { fr } from '~/i18n/fr'
import { en } from '~/i18n/en'
import { ar } from '~/i18n/ar'

const currentLocale = ref<string>('fr')

const locales = { fr, en, ar }

export const useI18n = () => {
  const t = computed(() => locales[currentLocale.value as keyof typeof locales] || fr)

  const setLocale = (locale: string) => {
    if (locales[locale as keyof typeof locales]) {
      currentLocale.value = locale
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('dir', t.value.dir)
        document.documentElement.setAttribute('lang', t.value.lang)
      }
    }
  }

  const locale = computed(() => currentLocale.value)

  const availableLocales = [
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ar', label: 'العربية', flag: '🇹🇳' },
  ]

  return { t, locale, setLocale, availableLocales }
}
