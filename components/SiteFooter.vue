<script setup lang="ts">
const route = useRoute()
const isEnglish = computed(() => route.path === '/en' || route.path.startsWith('/en/'))
</script>

<template>
  <footer class="site-footer">
    <div class="footer-copy">
      <span>© {{ new Date().getFullYear() }} Arwin van Arum</span>
      <span>{{ isEnglish ? 'Careful, independent analysis. The only profit that matters here is the benefit to society as a whole.' : 'Zorgvuldige, onafhankelijke analyses. De enige winst die hier telt, is winst voor de samenleving als geheel.' }}</span>
    </div>
  </footer>
</template>
