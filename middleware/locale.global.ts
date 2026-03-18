export default defineNuxtRouteMiddleware((to) => {
  const validLocales = ['fr', 'en', 'ar']
  const lang = to.params.lang as string

  if (lang && !validLocales.includes(lang)) {
    return navigateTo('/fr', { redirectCode: 302 })
  }
})
