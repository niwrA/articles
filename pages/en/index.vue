<script setup lang="ts">
const { data: articles } = await useAsyncData('home-articles-en', () => queryCollection('articlesEn').where('draft', '=', false).order('date', 'DESC').limit(3).all())
useSeoMeta({ title: 'Articles and models', description: 'Evidence-based essays on technology, society and the systems behind them.' })
useHead({ htmlAttrs: { lang: 'en' } })
</script>

<template>
  <div>
    <section class="hero wrap">
      <p class="eyebrow">Articles &amp; models</p>
      <h1>Reality is rarely as simple as the debate.</h1>
      <p class="lead">I write about technology, society and systems—not to have the final word, but to make assumptions visible and ideas testable.</p>
      <NuxtLink to="/en/articles" class="text-link">Browse all articles <span aria-hidden="true">→</span></NuxtLink>
    </section>
    <section class="latest wrap" aria-labelledby="latest-en-title">
      <div class="section-heading"><h2 id="latest-en-title">Latest</h2><span>{{ articles?.length === 1 ? '1 article' : `${articles?.length || 0} articles` }}</span></div>
      <ArticleList v-if="articles?.length" :articles="articles" locale="en-GB" />
      <p v-else class="empty-copy">English editions will appear here as they are published.</p>
    </section>
  </div>
</template>
