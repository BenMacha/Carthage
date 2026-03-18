export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Carthage & Hannibal - Histoire de la civilisation carthaginoise',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Découvrez l\'histoire fascinante de Carthage, d\'Hannibal Barca, la traversée des Alpes avec les éléphants et l\'économie carthaginoise.' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Lora:ital,wght@0,400;0,600;1,400&display=swap' }
      ]
    }
  },
  css: ['~/assets/css/main.css']
})
