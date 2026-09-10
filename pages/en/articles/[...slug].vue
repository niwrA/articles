<script setup lang="ts">
const route = useRoute()
const { data: article } = await useAsyncData(`article-en-${route.path}`, () => queryCollection('articlesEn').path(route.path).where('draft', '=', false).first())
if (!article.value) throw createError({ statusCode: 404, statusMessage: 'Article not found' })
const { data: translation } = await useAsyncData(`translation-en-${route.path}`, () => queryCollection('articles').where('translationKey', '=', article.value!.translationKey).where('draft', '=', false).first())
useSeoMeta({ title: article.value.title, description: article.value.description, ogTitle: article.value.title, ogDescription: article.value.description })
const config = useRuntimeConfig()
const absolute = (path: string) => config.public.siteUrl ? new URL(path, config.public.siteUrl).toString() : path
useHead({ htmlAttrs: { lang: 'en' }, link: [
  { rel: 'alternate', hreflang: 'en', href: absolute(route.path) },
  ...(translation.value ? [{ rel: 'alternate', hreflang: 'nl', href: absolute(translation.value.path) }] : []),
  { rel: 'alternate', hreflang: 'x-default', href: absolute(translation.value?.path || route.path) }
] })
const date = (value: string) => new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value))
</script>

<template>
  <article v-if="article" class="article-page">
    <header class="article-hero wrap">
      <NuxtLink to="/en/articles" class="back-link">← All articles</NuxtLink>
      <p class="eyebrow">{{ article.tags?.join(' · ') }}</p>
      <h1>{{ article.title }}</h1>
      <p class="lead">{{ article.description }}</p>
      <div class="byline"><span>By Arwin van Arum</span><time :datetime="article.date">{{ date(article.date) }}</time></div>
      <NuxtLink v-if="translation" :to="translation.path" hreflang="nl" class="article-language">Lees dit artikel in het Nederlands →</NuxtLink>
    </header>
    <figure v-if="article.featuredImage" class="article-cover wrap">
      <img :src="article.featuredImage" :alt="article.featuredImageAlt || ''" width="1800" height="1024">
    </figure>
    <div class="prose wrap"><ContentRenderer :value="article" /></div>
  </article>
</template>
