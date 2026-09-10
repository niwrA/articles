<script setup lang="ts">
defineProps<{
  src: string
  alt: string
  caption?: string
  source?: string
  sourceUrl?: string
}>()
</script>

<template>
  <figure class="article-figure">
    <a :href="src" target="_blank" rel="noopener" aria-label="Open figuur op volledige grootte">
      <img :src="src" :alt="alt" loading="lazy" decoding="async">
    </a>
    <figcaption v-if="caption || source">
      <span v-if="caption">{{ caption }}</span>
      <span v-if="source" class="figure-source">Bron: <a v-if="sourceUrl" :href="sourceUrl">{{ source }}</a><template v-else>{{ source }}</template></span>
    </figcaption>
  </figure>
</template>
