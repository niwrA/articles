type MiniMarkNode = string | [string, Record<string, unknown>, ...MiniMarkNode[]]

const citationPattern = /^\d+(?:(?:\s*[–-]\s*|\s*,\s*)\d+)*$/

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

  const headingIndex = root.findIndex((node) =>
    Array.isArray(node) && /^h[1-6]$/.test(node[0]) && /^(referenties|references)$/i.test(nodeText(node).trim())
  )
  if (headingIndex < 0) return result

  const labels = locale === 'nl'
    ? { reference: 'Ga naar referentie', back: 'Terug naar tekst', backTitle: 'Terug naar de vindplaats in de tekst', occurrence: 'vindplaats' }
    : { reference: 'Go to reference', back: 'Back to text', backTitle: 'Back to the citation in the text', occurrence: 'occurrence' }
  const occurrences = new Map<number, string[]>()

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
        title: `${labels.reference} ${reference}`
      }, String(reference)])
      if (index < references.length - 1) children.push('\u202f')
    })
    return ['sup', { class: 'citation' }, ...children]
  }

  function walk(node: MiniMarkNode) {
    if (!Array.isArray(node)) return
    for (let index = 2; index < node.length; index += 1) {
      const child = node[index]
      if (!Array.isArray(child)) continue
      const value = nodeText(child).trim()
      if (child[0] === 'span' && citationPattern.test(value)) node[index] = citationNode(value)
      else if (!['a', 'code', 'pre'].includes(child[0])) walk(child)
    }
  }

  root.slice(0, headingIndex).forEach(walk)
  const referenceList = root.slice(headingIndex + 1).find((node) => Array.isArray(node) && node[0] === 'ol')
  if (!Array.isArray(referenceList)) return result

  referenceList.slice(2).filter((node): node is [string, Record<string, unknown>, ...MiniMarkNode[]] => Array.isArray(node) && node[0] === 'li').forEach((item, index) => {
    const reference = index + 1
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
