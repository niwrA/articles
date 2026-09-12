<script setup lang="ts">
const props = defineProps<{ title: string; description: string; url: string; articleKey: string; locale: 'nl' | 'en'; closing?: boolean }>()
const showFallback = ref(false)
const copied = ref(false)
const labels = computed(() => props.locale === 'nl'
  ? { prompt: 'Vond je dit interessant?', share: 'Deel dit artikel', linkedin: 'LinkedIn', copy: 'Kopieer link', copied: 'Link gekopieerd', email: 'E-mail' }
  : { prompt: 'Did you find this interesting?', share: 'Share this article', linkedin: 'LinkedIn', copy: 'Copy link', copied: 'Link copied', email: 'Email' })
const linkedInUrl = computed(() => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(props.url)}`)
const emailUrl = computed(() => `mailto:?subject=${encodeURIComponent(props.title)}&body=${encodeURIComponent(`${props.description}\n\n${props.url}`)}`)

const track = (method: string) => trackAnalytics('article-share', { article: props.articleKey, language: props.locale, method })

async function share() {
  if (navigator.share) {
    try {
      await navigator.share({ title: props.title, text: props.description, url: props.url })
      track('native')
      return
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return
    }
  }
  showFallback.value = !showFallback.value
}

async function copyLink() {
  await navigator.clipboard.writeText(props.url)
  copied.value = true
  track('copy')
  window.setTimeout(() => { copied.value = false }, 2400)
}
</script>

<template>
  <aside class="article-share" :class="{ 'article-share-closing': closing }">
    <span v-if="closing" class="share-prompt">{{ labels.prompt }}</span>
    <button type="button" class="share-primary" :aria-expanded="showFallback" @click="share">{{ labels.share }} <span aria-hidden="true">↗</span></button>
    <div v-if="showFallback" class="share-options">
      <a :href="linkedInUrl" target="_blank" rel="noopener noreferrer" @click="track('linkedin')">{{ labels.linkedin }}</a>
      <button type="button" @click="copyLink">{{ copied ? labels.copied : labels.copy }}</button>
      <a :href="emailUrl" @click="track('email')">{{ labels.email }}</a>
    </div>
  </aside>
</template>
