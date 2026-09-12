<script setup lang="ts">
const props = defineProps<{
  articleKey: string
  language: 'nl' | 'en'
  version: string
  contentId: string
}>()

interface StoredState { sent: string[] }

let cleanup: (() => void) | undefined

onMounted(() => {
  const content = document.getElementById(props.contentId)
  if (!content) return

  const storageKey = `article-analytics:${props.articleKey}:${props.language}:${props.version}`
  let stored: StoredState = { sent: [] }
  try {
    stored = JSON.parse(sessionStorage.getItem(storageKey) || '{"sent":[]}')
    if (!Array.isArray(stored.sent)) stored.sent = []
  } catch { stored = { sent: [] } }
  const sent = new Set(stored.sent)
  let entered = false
  let activeSeconds = 0
  let lastActivity = Date.now()
  let intervalId = 0

  const save = () => {
    try { sessionStorage.setItem(storageKey, JSON.stringify({ sent: [...sent] })) } catch { /* Storage can be disabled. */ }
  }
  const sendOnce = (key: string, event: string, data: AnalyticsData = {}) => {
    if (sent.has(key)) return
    sent.add(key)
    save()
    trackAnalytics(event, { article: props.articleKey, language: props.language, ...data })
  }
  const substantiveEnd = () => {
    const boundary = [...content.querySelectorAll<HTMLElement>('h2')].find((heading) =>
      /^(noten|notes|referenties|references)$/.test((heading.id || heading.textContent || '').trim().toLowerCase())
    )
    return boundary ? boundary.getBoundingClientRect().top + window.scrollY : content.getBoundingClientRect().bottom + window.scrollY
  }
  const depth = () => {
    const rect = content.getBoundingClientRect()
    const start = rect.top + window.scrollY
    const end = substantiveEnd()
    const readingLine = window.scrollY + window.innerHeight * 0.75
    return Math.max(0, Math.min(100, ((readingLine - start) / Math.max(1, end - start)) * 100))
  }
  const recordProgress = () => {
    const rect = content.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.75 && rect.bottom > 0) entered = true
    if (activeSeconds < 10 || !entered) return
    sendOnce('start', 'article-start')
    const currentDepth = depth()
    for (const milestone of [25, 50, 75]) {
      if (currentDepth >= milestone) sendOnce(`depth-${milestone}`, 'article-depth', { depth: milestone })
    }
    if (currentDepth >= 98) sendOnce('complete', 'article-complete')
  }
  const currentTimeBucket = () => {
    if (activeSeconds >= 900) return '15m+'
    if (activeSeconds >= 300) return '5-15m'
    if (activeSeconds >= 120) return '2-5m'
    if (activeSeconds >= 30) return '30s-2m'
    return '<30s'
  }
  const recordTime = () => {
    if (activeSeconds < 10 || !entered) return
    const bucket = currentTimeBucket()
    sendOnce(`time-${bucket}`, 'article-time', { bucket })
  }
  const noteActivity = () => { lastActivity = Date.now(); recordProgress() }
  const modelName = (target: EventTarget | null) =>
    target instanceof Element ? target.closest<HTMLElement>('[data-analytics-model]')?.dataset.analyticsModel : undefined
  const onPointerDown = (event: Event) => {
    noteActivity()
    const model = modelName(event.target)
    if (model) sendOnce(`model-started-${model}`, 'model-started', { model })
  }
  const onInteraction = (event: Event) => {
    noteActivity()
    const model = modelName(event.target)
    if (model) sendOnce(`model-adjusted-${model}`, 'model-adjusted', { model })
  }
  const onClick = (event: Event) => {
    noteActivity()
    const target = event.target instanceof Element ? event.target : null
    const reference = target?.closest<HTMLAnchorElement>('a[href^="#ref-"]')?.getAttribute('href')?.replace('#ref-', '')
    if (reference) sendOnce(`reference-${reference}`, 'reference-opened', { reference })
    if (target?.closest('button')) onInteraction(event)
  }
  const onVisibility = () => {
    if (document.visibilityState === 'hidden') recordTime()
    else lastActivity = Date.now()
  }

  window.addEventListener('scroll', recordProgress, { passive: true })
  window.addEventListener('resize', recordProgress, { passive: true })
  content.addEventListener('pointerdown', onPointerDown, { passive: true })
  content.addEventListener('keydown', noteActivity)
  content.addEventListener('input', onInteraction)
  content.addEventListener('change', onInteraction)
  content.addEventListener('click', onClick)
  document.addEventListener('visibilitychange', onVisibility)
  window.addEventListener('pagehide', recordTime)
  intervalId = window.setInterval(() => {
    if (entered && document.visibilityState === 'visible' && Date.now() - lastActivity < 60_000) activeSeconds += 1
    recordProgress()
    if ([30, 120, 300, 900].includes(activeSeconds)) recordTime()
  }, 1000)
  recordProgress()

  cleanup = () => {
    recordTime()
    window.clearInterval(intervalId)
    window.removeEventListener('scroll', recordProgress)
    window.removeEventListener('resize', recordProgress)
    content.removeEventListener('pointerdown', onPointerDown)
    content.removeEventListener('keydown', noteActivity)
    content.removeEventListener('input', onInteraction)
    content.removeEventListener('change', onInteraction)
    content.removeEventListener('click', onClick)
    document.removeEventListener('visibilitychange', onVisibility)
    window.removeEventListener('pagehide', recordTime)
  }
})

onBeforeUnmount(() => cleanup?.())
</script>

<template><span class="article-analytics" aria-hidden="true" /></template>
