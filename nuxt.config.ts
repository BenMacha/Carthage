export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Carthage — Qart-Ḥadasht',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'theme-color', content: '#F4EEE3' },
        { name: 'description', content: "Carthage, de la fondation d'Élissa (814 av. J.-C.) à 146 av. J.-C. : Hannibal, les guerres puniques, la religion, l'économie et l'héritage punique en Tunisie. En français, anglais et arabe." }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=Instrument+Sans:wght@400;500;600;700&family=Noto+Sans+Phoenician&family=Noto+Naskh+Arabic:wght@400;700&display=swap' }
      ]
    }
  },
  css: ['~/assets/css/main.css'],
  routeRules: {
    '/': { redirect: { to: '/fr', statusCode: 302 } }
  }
})
