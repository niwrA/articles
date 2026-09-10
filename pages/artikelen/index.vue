<script setup lang="ts">
const { data: articles } = await useAsyncData('all-articles', () => queryCollection('articles').where('draft', '=', false).order('date', 'DESC').all())
useSeoMeta({ title: 'Artikelen', description: 'Alle artikelen van Arwin van Arum.' })
</script>

<template>
  <div class="wrap page-top">
    <p class="eyebrow">Archief</p>
    <h1>Artikelen</h1>
    <p class="lead narrow">Lange analyses, soms met een interactief model. Oorspronkelijke publicaties blijven herkenbaar vermeld.</p>
    <ArticleList :articles="articles || []" />
  </div>
</template>
