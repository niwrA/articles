<script setup lang="ts">
const { data: articles } = await useAsyncData('home-articles', () => queryCollection('articles').where('draft', '=', false).order('date', 'DESC').limit(3).all())
useSeoMeta({ title: 'Artikelen en modellen', description: 'Onderbouwde essays over technologie, maatschappij en de systemen daarachter.' })
</script>

<template>
  <div>
    <section class="hero wrap">
      <p class="eyebrow">Artikelen & modellen</p>
      <h1>De werkelijkheid is zelden zo eenvoudig als de discussie.</h1>
      <p class="lead">Ik schrijf over technologie, maatschappij en systemen. Niet om het laatste woord te hebben, maar om aannames zichtbaar en ideeën toetsbaar te maken.</p>
      <NuxtLink to="/artikelen" class="text-link">Lees alle artikelen <span aria-hidden="true">→</span></NuxtLink>
    </section>

    <section class="latest wrap" aria-labelledby="latest-title">
      <div class="section-heading"><h2 id="latest-title">Recent</h2><span>{{ articles?.length === 1 ? '1 artikel' : `${articles?.length || 0} artikelen` }}</span></div>
      <ArticleList :articles="articles || []" />
    </section>

    <section class="demo-band">
      <div class="wrap"><HousingSpaceModel /></div>
    </section>
  </div>
</template>
