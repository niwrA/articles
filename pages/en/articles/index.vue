<script setup lang="ts">
const { data: articles } = await useAsyncData('all-articles-en', () => queryCollection('articlesEn').where('draft', '=', false).order('date', 'DESC').all())
useSeoMeta({ title: 'Articles', description: 'All English-language articles by Arwin van Arum.' })
useHead({ htmlAttrs: { lang: 'en' } })
</script>

<template>
  <div class="wrap page-top">
    <p class="eyebrow">Archive</p>
    <h1>Articles</h1>
    <p class="lead narrow">Long-form analysis, sometimes accompanied by an interactive model.</p>
    <ArticleList v-if="articles?.length" :articles="articles" locale="en-GB" />
    <p v-else class="empty-copy">No English editions have been published yet.</p>
  </div>
</template>
