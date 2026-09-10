<script setup lang="ts">
const route = useRoute()
const isEnglish = computed(() => route.path === '/en' || route.path.startsWith('/en/'))
</script>

<template>
  <header class="site-header">
    <NuxtLink to="/" class="wordmark" aria-label="Arwin van Arum, home">
      <span class="wordmark-mark">AvA</span>
      <span>Arwin van Arum</span>
    </NuxtLink>
    <nav :aria-label="isEnglish ? 'Main navigation' : 'Hoofdnavigatie'">
      <NuxtLink :to="isEnglish ? '/en/articles' : '/artikelen'">{{ isEnglish ? 'Articles' : 'Artikelen' }}</NuxtLink>
      <NuxtLink :to="isEnglish ? '/en/about' : '/over'">{{ isEnglish ? 'About' : 'Over' }}</NuxtLink>
      <NuxtLink :to="isEnglish ? '/' : '/en'" class="language-link" :hreflang="isEnglish ? 'nl' : 'en'">{{ isEnglish ? 'NL' : 'EN' }}</NuxtLink>
    </nav>
  </header>
</template>
