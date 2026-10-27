import { readdirSync, readFileSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'

function articleRoutes(directory: string, prefix: string) {
  const root = resolve(directory)
  const routes: string[] = []

  function visit(current: string) {
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const path = join(current, entry.name)
      if (entry.isDirectory()) {
        visit(path)
        continue
      }
      if (!entry.isFile() || !entry.name.endsWith('.md') || entry.name.toLowerCase() === 'readme.md') continue

      const markdown = readFileSync(path, 'utf8')
      const frontmatter = markdown.match(/^---\s*\n([\s\S]*?)\n---/)?.[1] || ''
      if (/^draft:\s*true\s*$/m.test(frontmatter)) continue

      const slug = relative(root, path).replace(/\\/g, '/').replace(/\.md$/, '')
      routes.push(`${prefix}/${slug}`)
    }
  }

  visit(root)
  return routes
}

const prerenderArticleRoutes = [
  ...articleRoutes('content/articles', '/artikelen'),
  ...articleRoutes('content/articles-en', '/en/articles')
]

export default defineNuxtConfig({
  compatibilityDate: '2026-09-01',
  modules: ['@nuxt/content'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: { siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.interactive-thought.nl' }
  },
  app: {
    head: {
      htmlAttrs: { lang: 'nl' },
      titleTemplate: '%s · Arwin van Arum',
      meta: [
        { name: 'description', content: 'Artikelen en modellen van Arwin van Arum over technologie, maatschappij en systemen.' },
        { name: 'theme-color', content: '#12251f' },
        { name: 'google-site-verification', content: 'uzol073pNgTCikNj6yf5BAEDgHlUcJFlPG15-JNaSOE' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ],
      script: [
        {
          src: 'https://cloud.umami.is/script.js',
          defer: true,
          'data-website-id': '631b0ef4-e228-4aff-8709-cfdc96c57c6e',
          'data-domains': 'www.interactive-thought.nl',
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
      routes: ['/', '/en', '/artikelen', '/en/articles', '/artikelen/de-woningmarkt', '/over', '/en/about', ...prerenderArticleRoutes]
    }
  }
})
