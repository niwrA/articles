type MiniMarkNode = string | [string, Record<string, unknown>, ...MiniMarkNode[]]

const citationPattern = /^\d+(?:(?:\s*[–-]\s*|\s*,\s*)\d+)*$/
const referencesHeadingPattern = /^(referenties|references)$/i

function nodeText(node: MiniMarkNode): string {
  if (typeof node === 'string') return node
  return node.slice(2).map(nodeText).join('')
}

function expandReferences(value: string) {
  const references: number[] = []
  for (const part of value.split(',')) {
    const range = part.trim().match(/^(\d+)\s*[–-]\s*(\d+)$/)
    if (range) {
      const start = Number(range[1])
      const end = Number(range[2])
      const direction = start <= end ? 1 : -1
      for (let reference = start; reference !== end + direction; reference += direction) references.push(reference)
    } else references.push(Number(part.trim()))
  }
  return [...new Set(references.filter(Number.isFinite))]
}

export function withCitations<T extends { body?: { value?: MiniMarkNode[] } }>(article: T, locale: 'nl' | 'en'): T {
  const result = JSON.parse(JSON.stringify(article)) as T
  const root = result.body?.value
  if (!Array.isArray(root)) return result

  function findReferenceSection(nodes: MiniMarkNode[]): { nodes: MiniMarkNode[], headingIndex: number } | undefined {
    const headingIndex = nodes.findIndex((node) =>
      Array.isArray(node) && /^h[1-6]$/.test(node[0]) && referencesHeadingPattern.test(nodeText(node).trim())
    )
    if (headingIndex >= 0) return { nodes, headingIndex }
    for (const node of nodes) {
      if (!Array.isArray(node)) continue
      const nested = findReferenceSection(node.slice(2))
      if (nested) return nested
    }
  }
  const section = findReferenceSection(root)
  if (!section) return result

  const labels = locale === 'nl'
    ? { reference: 'Ga naar referentie', back: 'Terug naar tekst', backTitle: 'Terug naar de vindplaats in de tekst', occurrence: 'vindplaats' }
    : { reference: 'Go to reference', back: 'Back to text', backTitle: 'Back to the citation in the text', occurrence: 'occurrence' }
  const occurrences = new Map<number, string[]>()
  const referenceList = section.nodes.slice(section.headingIndex + 1).find((node) => Array.isArray(node) && node[0] === 'ol')
  if (!Array.isArray(referenceList)) return result
  referenceList[1] = { ...referenceList[1], class: 'references-list' }
  const referenceEntries = referenceList.slice(2)
    .filter((node): node is [string, Record<string, unknown>, ...MiniMarkNode[]] => Array.isArray(node) && node[0] === 'li')
    .map((item, index) => ({ reference: index + 1, item }))
  const referencePreviews = new Map(referenceEntries.map(({ reference, item }) => {
    const text = nodeText(item).replace(/\s+/g, ' ').trim()
    return [reference, text.length > 220 ? `${text.slice(0, 217)}…` : text]
  }))

  function citationNode(value: string): MiniMarkNode {
    const children: MiniMarkNode[] = []
    expandReferences(value).forEach((reference, index, references) => {
      const links = occurrences.get(reference) || []
      const citationId = `cite-${reference}-${links.length + 1}`
      links.push(citationId)
      occurrences.set(reference, links)
      children.push(['a', {
        id: citationId,
        href: `#ref-${reference}`,
        class: 'citation-link',
        title: `${labels.reference} ${reference}: ${referencePreviews.get(reference) || ''}`.trim()
      }, String(reference)])
      if (index < references.length - 1) children.push('\u202f')
    })
    return ['sup', { class: 'citation' }, ...children]
  }

  function walk(node: MiniMarkNode) {
    if (!Array.isArray(node) || node === referenceList) return
    for (let index = 2; index < node.length; index += 1) {
      const child = node[index]
      if (!Array.isArray(child)) continue
      const value = nodeText(child).trim()
      if (child[0] === 'span' && citationPattern.test(value)) node[index] = citationNode(value)
      else if (!['a', 'code', 'pre'].includes(child[0])) walk(child)
    }
  }

  root.forEach(walk)

  referenceEntries.forEach(({ reference, item }) => {
    item[1] = { ...item[1], id: `ref-${reference}`, class: 'reference-entry' }
    const backlinks = occurrences.get(reference) || []
    if (!backlinks.length) return
    item.push(' ')
    backlinks.forEach((citationId, backlinkIndex) => {
      item.push(['a', {
        href: `#${citationId}`,
        class: 'citation-backlink',
        title: labels.backTitle,
        'aria-label': `${labels.back}: ${labels.occurrence} ${backlinkIndex + 1}, ${labels.reference.toLowerCase()} ${reference}`
      }, backlinkIndex ? '↩' : `${labels.back} ↩`])
      if (backlinkIndex < backlinks.length - 1) item.push(' ')
    })
  })

  return result
}
