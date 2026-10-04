import LOCALES from '~/i18n/locales.json'

const valid = new Set(LOCALES.map(l => l.code))

export default defineNuxtRouteMiddleware((to) => {
  const lang = to.params.lang as string
  if (lang && !valid.has(lang)) {
    return navigateTo('/ar', { redirectCode: 302 })
  }
})
