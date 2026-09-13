<script setup lang="ts">
const { data: articles } = await useAsyncData('all-articles', () => queryCollection('articles').where('draft', '=', false).order('date', 'DESC').all())
useSeoMeta({ title: 'Artikelen', description: 'Lange analyses en interactieve modellen van Arwin van Arum over wetenschap, maatschappij, muziek en meer.' })
</script>

<template>
  <div class="wrap page-top">
    <p class="eyebrow">Archief</p>
    <h1>Artikelen</h1>
    <p class="lead narrow">Lange analyses met daarnaast een korte leesroute. Waar een conclusie afhangt van variabelen, aannames of ontwikkelingen in de tijd, kun je die in een interactief model zelf onderzoeken. Waar dat niets toevoegt, blijft het bij tekst. Oorspronkelijke publicaties blijven herkenbaar vermeld.</p>
    <ArticleList :articles="articles || []" />
  </div>
</template>
