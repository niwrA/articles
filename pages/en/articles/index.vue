<script setup lang="ts">
const { data: articles } = await useAsyncData('all-articles-en', () => queryCollection('articlesEn').where('draft', '=', false).order('date', 'DESC').all())
useSeoMeta({ title: 'Articles', description: 'Long-form analysis and interactive models by Arwin van Arum on science, society, music and more.' })
useHead({ htmlAttrs: { lang: 'en' } })
</script>

<template>
  <div class="wrap page-top">
    <p class="eyebrow">Archive</p>
    <h1>Articles</h1>
    <p class="lead narrow">Long-form analysis with a shorter reading route alongside it. Where a conclusion depends on variables, assumptions or change over time, an interactive model lets you investigate them yourself. Where interaction adds little, the article remains text.</p>
    <ArticleList v-if="articles?.length" :articles="articles" locale="en-GB" />
    <p v-else class="empty-copy">No English editions have been published yet.</p>
  </div>
</template>
