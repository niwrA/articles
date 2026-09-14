<script setup lang="ts">
const { data: articles } = await useAsyncData('home-articles-en', async () => {
  const entries = await queryCollection('articlesEn').where('draft', '=', false).order('date', 'DESC').all()
  return entries.map(({ body, ...article }) => ({ ...article, readingTime: formatReadingTime(body, 'en-GB'), searchText: getContentText(body).replace(/\s+/g, ' ').trim() }))
})
useSeoMeta({ title: 'Articles and models', description: 'Evidence-based essays on technology, society and the systems behind them.' })
useHead({ htmlAttrs: { lang: 'en' } })
</script>

<template>
  <div>
    <section class="hero home-hero wrap">
      <p class="eyebrow">Articles &amp; models</p>
      <h1>Read the argument. Explore the assumptions.</h1>
      <p class="lead">Long-form essays for the complete reasoning, concise summaries for orientation, and interactive models for exploring when a conclusion changes.</p>
    </section>
    <CompactArticleIndex id="articles" class="wrap" :articles="articles || []" locale="en-GB" />
  </div>
</template>

<style scoped>
.home-hero{padding-top:64px;padding-bottom:36px}.home-hero h1{font-size:clamp(3rem,6.5vw,6rem)}.home-hero .lead{margin:24px 0 0}#articles{scroll-margin-top:24px}@media(max-width:750px){.home-hero{padding-top:45px;padding-bottom:20px}}
</style>
