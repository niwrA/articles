<script setup lang="ts">
const route = useRoute()
const { data: article } = await useAsyncData(`article-${route.path}`, () => queryCollection('articles').path(route.path).first())
if (!article.value) throw createError({ statusCode: 404, statusMessage: 'Artikel niet gevonden' })
const { data: translation } = await useAsyncData(`translation-${route.path}`, () => queryCollection('articlesEn').where('translationKey', '=', article.value!.translationKey).where('draft', '=', false).first())
useSeoMeta({ title: article.value.title, description: article.value.description, ogTitle: article.value.title, ogDescription: article.value.description })
const config = useRuntimeConfig()
const absolute = (path: string) => config.public.siteUrl ? new URL(path, config.public.siteUrl).toString() : path
useHead({ htmlAttrs: { lang: 'nl' }, link: [
  { rel: 'alternate', hreflang: 'nl', href: absolute(route.path) },
  ...(translation.value ? [{ rel: 'alternate', hreflang: 'en', href: absolute(translation.value.path) }] : []),
  { rel: 'alternate', hreflang: 'x-default', href: absolute(route.path) }
] })
const date = (value: string) => new Intl.DateTimeFormat('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value))
</script>

<template>
  <article v-if="article" class="article-page">
    <header class="article-hero wrap">
      <NuxtLink to="/artikelen" class="back-link">← Alle artikelen</NuxtLink>
      <p class="eyebrow">{{ article.tags?.join(' · ') }}</p>
      <h1>{{ article.title }}</h1>
      <p class="lead">{{ article.description }}</p>
      <div class="byline"><span>Door Arwin van Arum</span><time :datetime="article.date">{{ date(article.date) }}</time></div>
      <NuxtLink v-if="translation" :to="translation.path" hreflang="en" class="article-language">Read this article in English →</NuxtLink>
    </header>
    <figure v-if="article.featuredImage" class="article-cover wrap">
      <img :src="article.featuredImage" :alt="article.featuredImageAlt || ''" width="1800" height="1024">
    </figure>
    <div class="prose wrap"><ContentRenderer :value="article" /></div>
  </article>
</template>
