import fs from 'node:fs'
import path from 'node:path'
import { parse } from 'yaml'

const roots = [
  { directory: 'content/articles', locale: 'nl' },
  { directory: 'content/articles-en', locale: 'en' }
]
const errors = []
const warnings = []
const articles = []

function report(collection, file, message) {
  collection.push(`${file}: ${message}`)
}

function frontmatter(source, file) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n/)
  if (!match) {
    report(errors, file, 'frontmatter ontbreekt of is ongeldig begrensd')
    return null
  }
  try {
    return { data: parse(match[1]), body: source.slice(match[0].length) }
  } catch (error) {
    report(errors, file, `frontmatter kan niet worden gelezen: ${error.message}`)
    return null
  }
}

function expandCitation(value) {
  const numbers = []
  for (const part of value.split(',')) {
    const range = part.trim().match(/^(\d+)\s*[–-]\s*(\d+)$/)
    if (range) {
      const start = Number(range[1]); const end = Number(range[2])
      for (let number = Math.min(start, end); number <= Math.max(start, end); number += 1) numbers.push(number)
    } else numbers.push(Number(part.trim()))
  }
  return numbers.filter(Number.isFinite)
}

for (const { directory, locale } of roots) {
  for (const name of fs.readdirSync(directory).filter((entry) => entry.endsWith('.md') && entry !== 'README.md')) {
    const file = path.join(directory, name)
    const source = fs.readFileSync(file, 'utf8')
    const parsed = frontmatter(source, file)
    if (!parsed) continue
    const { data, body } = parsed
    articles.push({ file, locale, data })
    if (data.draft === true) continue

    for (const field of ['title', 'description', 'date', 'translationKey', 'featuredImage', 'featuredImageAlt', 'summary']) {
      if (typeof data[field] !== 'string' || !data[field].trim()) report(errors, file, `verplicht veld '${field}' ontbreekt`)
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(data.date))) report(errors, file, 'date moet YYYY-MM-DD gebruiken')
    if (data.updated && !/^\d{4}-\d{2}-\d{2}$/.test(String(data.updated))) report(errors, file, 'updated moet YYYY-MM-DD gebruiken')
    if (!Array.isArray(data.tags) || data.tags.length < 1) report(errors, file, 'minimaal één tag is verplicht')
    if (!Array.isArray(data.keyPoints) || data.keyPoints.length < 3) report(errors, file, 'minimaal drie keyPoints zijn verplicht')

    const plain = data.plainLanguage
    if (!plain || !plain.title || !plain.intro || !plain.takeaway || !Array.isArray(plain.sections) || plain.sections.length < 3) {
      report(errors, file, 'plainLanguage vereist titel, intro, takeaway en minimaal drie secties')
    } else if (plain.sections.some((section) => !section.heading || !Array.isArray(section.paragraphs) || !section.paragraphs.length)) {
      report(errors, file, 'iedere plainLanguage-sectie vereist een kop en minimaal één alinea')
    }
    if (data.modelComponent && (!Array.isArray(data.modelLimitations) || !data.modelLimitations.length)) {
      report(errors, file, 'een modelComponent vereist modelLimitations')
    }

    const nonCanonical = body.match(/^#{2,3} (Bronnen|Sources|Bronnen en verdere lectuur|Sources and further reading)$/m)
    if (nonCanonical) report(errors, file, `niet-canonieke referentiekop '${nonCanonical[1]}'`)
    const heading = locale === 'nl' ? '## Referenties' : '## References'
    const otherHeading = locale === 'nl' ? /^## References$/m : /^## Referenties$/m
    if (otherHeading.test(body)) report(errors, file, 'referentiekop gebruikt de verkeerde taal')
    const headingIndex = body.indexOf(heading)
    const citationArea = headingIndex >= 0 ? body.slice(0, headingIndex) : body
    const citations = new Set()
    for (const match of citationArea.matchAll(/\[(\d+(?:(?:\s*[–-]\s*|\s*,\s*)\d+)*)\](?!\()/g)) {
      expandCitation(match[1]).forEach((number) => citations.add(number))
    }

    if (headingIndex < 0) {
      if (citations.size) report(errors, file, 'genummerde tekstverwijzingen bestaan zonder canonieke referentielijst')
      continue
    }
    const referenceArea = body.slice(headingIndex + heading.length)
    if (/^(?:[-*]\s+|\*{0,2}\[\d+\]\s+)/m.test(referenceArea)) report(errors, file, 'referenties moeten één genummerde Markdown-lijst gebruiken')
    const references = [...referenceArea.matchAll(/^(\d+)\.\s+/gm)].map((match) => Number(match[1]))
    if (!references.length) report(errors, file, 'referentiesectie bevat geen genummerde lijst')
    references.forEach((number, index) => {
      if (number !== index + 1) report(errors, file, `referentienummering is niet opeenvolgend bij ${number}`)
    })
    const referenceSet = new Set(references)
    for (const citation of citations) if (!referenceSet.has(citation)) report(errors, file, `tekstverwijzing [${citation}] heeft geen referentie`)
    const unused = references.filter((number) => !citations.has(number))
    if (unused.length) report(warnings, file, `niet vanuit de tekst aangehaalde referenties: ${unused.join(', ')}`)
  }
}

for (const article of articles.filter((entry) => entry.data.draft !== true)) {
  const matches = articles.filter((entry) => entry.data.draft !== true && entry.data.translationKey === article.data.translationKey)
  const duplicateLocale = matches.filter((entry) => entry.locale === article.locale)
  if (duplicateLocale.length > 1) report(errors, article.file, `translationKey '${article.data.translationKey}' komt meermaals voor in dezelfde taal`)
}

for (const warning of warnings) console.warn(`WARN ${warning}`)
if (errors.length) {
  for (const error of errors) console.error(`ERROR ${error}`)
  console.error(`\n${errors.length} contentfout(en); build afgebroken.`)
  process.exit(1)
}
console.log(`Contentcontrole geslaagd voor ${articles.filter((entry) => entry.data.draft !== true).length} gepubliceerde artikelen${warnings.length ? ` met ${warnings.length} waarschuwing(en)` : ''}.`)
