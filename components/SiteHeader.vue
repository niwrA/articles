<script setup lang="ts">
const route = useRoute()
const isEnglish = computed(() => route.path === '/en' || route.path.startsWith('/en/'))
const isAbout = computed(() => route.path === '/over' || route.path === '/en/about')
</script>

<template>
  <header class="site-header">
    <nav class="header-nav" :aria-label="isEnglish ? 'Main navigation' : 'Hoofdnavigatie'">
      <NuxtLink v-if="isAbout" :to="isEnglish ? '/en' : '/'" class="overview-link">← {{ isEnglish ? 'Overview' : 'Overzicht' }}</NuxtLink>
      <NuxtLink :to="isEnglish ? '/en/about' : '/over'">{{ isEnglish ? 'About' : 'Over' }}</NuxtLink>
      <NuxtLink :to="isEnglish ? '/' : '/en'" :hreflang="isEnglish ? 'nl' : 'en'">{{ isEnglish ? 'NL' : 'EN' }}</NuxtLink>
    </nav>
  </header>
</template>
