import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { basename, join } from 'node:path'

const siteUrl = (process.env.NUXT_PUBLIC_SITE_URL || 'https://www.interactive-thought.nl').replace(/\/$/, '')
const publicDir = new URL('../public/', import.meta.url)

const escapeXml = value => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;')

function frontmatterValue(markdown, key) {
  const frontmatter = markdown.match(/^---\s*\n([\s\S]*?)\n---/)?.[1] || ''
  const match = frontmatter.match(new RegExp(`^${key}:\\s*(.+?)\\s*$`, 'm'))
  if (!match) return undefined
  return match[1].replace(/^['"]|['"]$/g, '').trim()
}

async function loadArticles(directory, routePrefix, language) {
  const path = new URL(`../content/${directory}/`, import.meta.url)
  const files = (await readdir(path)).filter(file => file.endsWith('.md') && file.toLowerCase() !== 'readme.md')

  const articles = []
  for (const file of files) {
    const markdown = await readFile(new URL(file, path), 'utf8')
    if (frontmatterValue(markdown, 'draft') === 'true') continue

    const slug = basename(file, '.md')
    articles.push({
      language,
      translationKey: frontmatterValue(markdown, 'translationKey'),
      path: `${routePrefix}/${slug}`,
      lastmod: frontmatterValue(markdown, 'updated') || frontmatterValue(markdown, 'date')
    })
  }
  return articles
}

const absolute = path => `${siteUrl}${path === '/' ? '/' : path}`

function alternateLinks(alternates) {
  return alternates.map(({ language, path }) =>
    `    <xhtml:link rel="alternate" hreflang="${escapeXml(language)}" href="${escapeXml(absolute(path))}" />`
  ).join('\n')
}

function sitemapEntry({ path, lastmod, alternates = [] }) {
  const lines = ['  <url>', `    <loc>${escapeXml(absolute(path))}</loc>`]
  if (lastmod) lines.push(`    <lastmod>${escapeXml(lastmod)}</lastmod>`)
  if (alternates.length) lines.push(alternateLinks(alternates))
  lines.push('  </url>')
  return lines.join('\n')
}

const [dutchArticles, englishArticles] = await Promise.all([
  loadArticles('articles', '/artikelen', 'nl'),
  loadArticles('articles-en', '/en/articles', 'en')
])

const byTranslationKey = new Map()
for (const article of [...dutchArticles, ...englishArticles]) {
  if (!article.translationKey) continue
  const translations = byTranslationKey.get(article.translationKey) || {}
  translations[article.language] = article
  byTranslationKey.set(article.translationKey, translations)
}

const staticPages = [
  { path: '/', alternates: [{ language: 'nl', path: '/' }, { language: 'en', path: '/en' }, { language: 'x-default', path: '/' }] },
  { path: '/en', alternates: [{ language: 'nl', path: '/' }, { language: 'en', path: '/en' }, { language: 'x-default', path: '/' }] },
  { path: '/over', alternates: [{ language: 'nl', path: '/over' }, { language: 'en', path: '/en/about' }, { language: 'x-default', path: '/over' }] },
  { path: '/en/about', alternates: [{ language: 'nl', path: '/over' }, { language: 'en', path: '/en/about' }, { language: 'x-default', path: '/over' }] }
]

const articlePages = [...dutchArticles, ...englishArticles]
  .sort((a, b) => a.path.localeCompare(b.path, 'en'))
  .map(article => {
    const translations = article.translationKey ? byTranslationKey.get(article.translationKey) : undefined
    const alternates = translations?.nl && translations?.en
      ? [
          { language: 'nl', path: translations.nl.path },
          { language: 'en', path: translations.en.path },
          { language: 'x-default', path: translations.nl.path }
        ]
      : []
    return { ...article, alternates }
  })

const pages = [...staticPages, ...articlePages]
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...pages.map(sitemapEntry),
  '</urlset>',
  ''
].join('\n')

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`

await mkdir(publicDir, { recursive: true })
await Promise.all([
  writeFile(new URL('sitemap.xml', publicDir), sitemap),
  writeFile(new URL('robots.txt', publicDir), robots)
])

console.log(`Generated sitemap.xml with ${pages.length} URLs and robots.txt for ${siteUrl}`)
