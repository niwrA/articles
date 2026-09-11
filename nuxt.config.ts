export default defineNuxtConfig({
  compatibilityDate: '2026-09-01',
  modules: ['@nuxt/content'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: { siteUrl: process.env.NUXT_PUBLIC_SITE_URL || '' }
  },
  app: {
    head: {
      htmlAttrs: { lang: 'nl' },
      titleTemplate: '%s · Arwin van Arum',
      meta: [
        { name: 'description', content: 'Artikelen en modellen van Arwin van Arum over technologie, maatschappij en systemen.' },
        { name: 'theme-color', content: '#12251f' }
      ],
      script: [
        {
          src: 'https://cloud.umami.is/script.js',
          defer: true,
          'data-website-id': '631b0ef4-e228-4aff-8709-cfdc96c57c6e',
          'data-domains': 'interactive-thought.nl',
          'data-exclude-search': 'true',
          'data-exclude-hash': 'true',
          'data-do-not-track': 'true'
        }
      ]
    }
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/artikelen', '/artikelen/de-woningmarkt', '/over']
    }
  }
})
