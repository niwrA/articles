const citationPattern = /^\d+(?:(?:\s*[–-]\s*|\s*,\s*)\d+)*$/

function expandReferences(value) {
  const references = []
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

function plainText(node) {
  if (node.type === 'text') return node.value
  return Array.isArray(node.children) ? node.children.map(plainText).join('') : ''
}

export default function rehypeCitations() {
  return (tree) => {
    const referencesHeadingIndex = tree.children.findIndex((node) =>
      node.type === 'element' && /^h[1-6]$/.test(node.tagName) && /^(referenties|references)$/i.test(plainText(node).trim())
    )
    if (referencesHeadingIndex < 0) return

    const isDutch = /^referenties$/i.test(plainText(tree.children[referencesHeadingIndex]).trim())
    const labels = isDutch
      ? { reference: 'Ga naar referentie', back: 'Terug naar tekst', backTitle: 'Terug naar de vindplaats in de tekst', occurrence: 'vindplaats' }
      : { reference: 'Go to reference', back: 'Back to text', backTitle: 'Back to the citation in the text', occurrence: 'occurrence' }
    const occurrences = new Map()

    function citationNode(value) {
      const references = expandReferences(value)
      const children = []
      references.forEach((reference, index) => {
        const links = occurrences.get(reference) || []
        const occurrence = links.length + 1
        const citationId = `cite-${reference}-${occurrence}`
        links.push(citationId)
        occurrences.set(reference, links)
        children.push({
          type: 'element', tagName: 'a',
          properties: { id: citationId, href: `#ref-${reference}`, className: ['citation-link'], title: `${labels.reference} ${reference}` },
          children: [{ type: 'text', value: String(reference) }]
        })
        if (index < references.length - 1) children.push({ type: 'text', value: '\u202f' })
      })
      return { type: 'element', tagName: 'sup', properties: { className: ['citation'] }, children }
    }

    function walk(node) {
      if (!Array.isArray(node.children)) return
      for (let index = 0; index < node.children.length; index += 1) {
        const child = node.children[index]
        if (child.type !== 'element') continue
        const value = plainText(child).trim()
        if (child.tagName === 'span' && citationPattern.test(value)) node.children.splice(index, 1, citationNode(value))
        else if (!['a', 'code', 'pre'].includes(child.tagName)) walk(child)
      }
    }

    tree.children.slice(0, referencesHeadingIndex).forEach(walk)
    const referenceList = tree.children.slice(referencesHeadingIndex + 1).find((node) => node.type === 'element' && node.tagName === 'ol')
    if (!referenceList) return

    referenceList.children.filter((node) => node.type === 'element' && node.tagName === 'li').forEach((item, index) => {
      const reference = index + 1
      item.properties ||= {}
      item.properties.id = `ref-${reference}`
      item.properties.className = ['reference-entry']
      const backlinks = occurrences.get(reference) || []
      if (!backlinks.length) return
      item.children.push({ type: 'text', value: ' ' })
      backlinks.forEach((citationId, backlinkIndex) => {
        item.children.push({
          type: 'element', tagName: 'a',
          properties: {
            href: `#${citationId}`, className: ['citation-backlink'], title: labels.backTitle,
            ariaLabel: `${labels.back}: ${labels.occurrence} ${backlinkIndex + 1}, ${labels.reference.toLowerCase()} ${reference}`
          },
          children: [{ type: 'text', value: backlinkIndex ? '↩' : `${labels.back} ↩` }]
        })
        if (backlinkIndex < backlinks.length - 1) item.children.push({ type: 'text', value: ' ' })
      })
    })
  }
}
