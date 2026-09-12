<script setup lang="ts">
const route = useRoute()
const { data: article } = await useAsyncData(`article-${route.path}`, () => queryCollection('articles').path(route.path).first())
if (!article.value) throw createError({ statusCode: 404, statusMessage: 'Artikel niet gevonden' })
const { data: translation } = await useAsyncData(`translation-${route.path}`, () => queryCollection('articlesEn').where('translationKey', '=', article.value!.translationKey).where('draft', '=', false).first())
const config = useRuntimeConfig()
const absolute = (path: string) => config.public.siteUrl ? new URL(path, config.public.siteUrl).toString() : path
const canonicalUrl = absolute(route.path)
const socialImage = article.value.featuredImage ? absolute(article.value.featuredImage) : undefined
useSeoMeta({
  title: article.value.title, description: article.value.description,
  ogTitle: article.value.title, ogDescription: article.value.description,
  ogType: 'article', ogUrl: canonicalUrl, ogImage: socialImage,
  ogImageAlt: article.value.featuredImageAlt, ogLocale: 'nl_NL',
  articlePublishedTime: new Date(article.value.date).toISOString(),
  twitterCard: 'summary_large_image', twitterTitle: article.value.title,
  twitterDescription: article.value.description, twitterImage: socialImage,
  twitterImageAlt: article.value.featuredImageAlt
})
useHead({ htmlAttrs: { lang: 'nl' }, link: [
  { rel: 'canonical', href: canonicalUrl },
  { rel: 'alternate', hreflang: 'nl', href: absolute(route.path) },
  ...(translation.value ? [{ rel: 'alternate', hreflang: 'en', href: absolute(translation.value.path) }] : []),
  { rel: 'alternate', hreflang: 'x-default', href: absolute(route.path) }
] })
const date = (value: string) => new Intl.DateTimeFormat('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value))
const renderedArticle = computed(() => withCitations(article.value!, 'nl'))
</script>

<template>
  <article v-if="article" class="article-page">
    <header class="article-hero wrap">
      <NuxtLink to="/artikelen" class="back-link">← Alle artikelen</NuxtLink>
      <p class="eyebrow">{{ article.tags?.join(' · ') }}</p>
      <h1>{{ article.title }}</h1>
      <p class="lead">{{ article.description }}</p>
      <div class="byline"><span>Door Arwin van Arum</span><time :datetime="article.date">{{ date(article.date) }}</time><span>{{ formatReadingTime(article.body) }}</span></div>
      <NuxtLink v-if="translation" :to="translation.path" hreflang="en" class="article-language">Read this article in English →</NuxtLink>
      <ArticleShare :title="article.title" :description="article.description" :url="canonicalUrl" :article-key="article.translationKey" locale="nl" />
    </header>
    <figure v-if="article.featuredImage" class="article-cover wrap">
      <img :src="article.featuredImage" :alt="article.featuredImageAlt || ''" width="1800" height="1024">
    </figure>
    <div id="article-content" class="prose wrap"><ContentRenderer :value="renderedArticle" /></div>
    <ArticleEngagement :article-key="article.translationKey" language="nl" :version="article.updated || article.date" content-id="article-content" />
    <div class="wrap"><ArticleShare :title="article.title" :description="article.description" :url="canonicalUrl" :article-key="article.translationKey" locale="nl" closing /></div>
  </article>
</template>
