type ContentNode = {
  type?: string
  value?: unknown
  children?: unknown[]
}

const collectText = (value: unknown): string => {
  if (typeof value === 'string') return value
  if (!value) return ''

  // Nuxt Content 3 represents parsed Markdown as a compact "minimark"
  // tree. Element nodes look like [tagName, props, ...children], while the
  // root is simply an array of nodes. Skip tag names and props, but retain
  // the textual children.
  if (Array.isArray(value)) {
    const children = typeof value[0] === 'string' ? value.slice(2) : value
    return children.map(collectText).join(' ')
  }

  if (typeof value !== 'object') return ''

  const node = value as ContentNode
  const ownText = node.type === 'text' && typeof node.value === 'string' ? node.value : ''
  const minimarkText = node.type === 'minimark' ? collectText(node.value) : ''
  const childText = Array.isArray(node.children) ? node.children.map(collectText).join(' ') : ''

  return `${ownText} ${minimarkText} ${childText}`
}

export const getReadingTimeRange = (body: unknown) => {
  const words = collectText(body).match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu)?.length || 0

  return {
    words,
    fastMinutes: Math.max(1, Math.ceil(words / 250)),
    slowMinutes: Math.max(1, Math.ceil(words / 150))
  }
}

export const formatReadingTime = (body: unknown, locale: 'nl-NL' | 'en-GB' = 'nl-NL') => {
  const { fastMinutes, slowMinutes } = getReadingTimeRange(body)
  const range = fastMinutes === slowMinutes ? `${fastMinutes}` : `${fastMinutes}–${slowMinutes}`

  return locale === 'en-GB'
    ? `Estimated reading time: ${range} min`
    : `Geschatte leestijd: ${range} min`
}
