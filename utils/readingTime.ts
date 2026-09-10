type ContentNode = {
  type?: string
  value?: unknown
  children?: unknown[]
}

const collectText = (value: unknown): string => {
  if (!value || typeof value !== 'object') return ''

  const node = value as ContentNode
  const ownText = node.type === 'text' && typeof node.value === 'string' ? node.value : ''
  const childText = Array.isArray(node.children) ? node.children.map(collectText).join(' ') : ''

  return `${ownText} ${childText}`
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
