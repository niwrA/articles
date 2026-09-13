<script setup lang="ts">
const { data: articles } = await useAsyncData('home-articles', () => queryCollection('articles').where('draft', '=', false).order('date', 'DESC').limit(3).all())
useSeoMeta({ title: 'Artikelen en modellen', description: 'Onderbouwde essays over technologie, maatschappij en de systemen daarachter.' })
</script>

<template>
  <div>
    <section class="hero wrap">
      <p class="eyebrow">Artikelen & modellen</p>
      <h1>Lees de gedachte. Onderzoek de aannames.</h1>
      <p class="lead">Lange essays voor de volledige redenering, korte samenvattingen voor het overzicht en interactieve modellen waarmee je zelf kunt onderzoeken wanneer een conclusie verandert.</p>
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
