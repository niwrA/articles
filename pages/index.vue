<script setup lang="ts">
const { data: articles } = await useAsyncData('home-articles', async () => {
  const entries = await queryCollection('articles').where('draft', '=', false).order('date', 'DESC').all()
  return entries.map(({ body, ...article }) => ({ ...article, readingTime: formatReadingTime(body, 'nl-NL'), searchText: getContentText(body).replace(/\s+/g, ' ').trim() }))
})
useSeoMeta({ title: 'Artikelen en modellen', description: 'Onderbouwde essays over technologie, maatschappij en de systemen daarachter.' })
</script>

<template>
  <div>
    <section class="hero home-hero wrap">
      <p class="eyebrow">Artikelen & modellen</p>
      <h1>Lees de gedachte. Onderzoek de aannames.</h1>
      <p class="lead">Lange essays voor de volledige redenering, korte samenvattingen voor het overzicht en interactieve modellen waarmee je zelf kunt onderzoeken wanneer een conclusie verandert.</p>
    </section>
    <CompactArticleIndex id="artikelen" class="wrap" :articles="articles || []" locale="nl-NL" />
  </div>
</template>

<style scoped>
.home-hero{padding-top:64px;padding-bottom:36px}.home-hero h1{font-size:clamp(3rem,6.5vw,6rem)}.home-hero .lead{margin:24px 0 0}#artikelen{scroll-margin-top:24px}@media(max-width:750px){.home-hero{padding-top:45px;padding-bottom:20px}}
</style>
