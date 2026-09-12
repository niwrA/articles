<script setup lang="ts">
const route = useRoute()
const { data: article } = await useAsyncData(`article-en-${route.path}`, () => queryCollection('articlesEn').path(route.path).where('draft', '=', false).first())
if (!article.value) throw createError({ statusCode: 404, statusMessage: 'Article not found' })
const { data: translation } = await useAsyncData(`translation-en-${route.path}`, () => queryCollection('articles').where('translationKey', '=', article.value!.translationKey).where('draft', '=', false).first())
const config = useRuntimeConfig()
const absolute = (path: string) => config.public.siteUrl ? new URL(path, config.public.siteUrl).toString() : path
const canonicalUrl = absolute(route.path)
const socialImage = article.value.featuredImage ? absolute(article.value.featuredImage) : undefined
useSeoMeta({
  title: article.value.title, description: article.value.description,
  ogTitle: article.value.title, ogDescription: article.value.description,
  ogType: 'article', ogUrl: canonicalUrl, ogImage: socialImage,
  ogImageAlt: article.value.featuredImageAlt, ogLocale: 'en_GB',
  articlePublishedTime: new Date(article.value.date).toISOString(),
  twitterCard: 'summary_large_image', twitterTitle: article.value.title,
  twitterDescription: article.value.description, twitterImage: socialImage,
  twitterImageAlt: article.value.featuredImageAlt
})
useHead({ htmlAttrs: { lang: 'en' }, link: [
  { rel: 'canonical', href: canonicalUrl },
  { rel: 'alternate', hreflang: 'en', href: absolute(route.path) },
  ...(translation.value ? [{ rel: 'alternate', hreflang: 'nl', href: absolute(translation.value.path) }] : []),
  { rel: 'alternate', hreflang: 'x-default', href: absolute(translation.value?.path || route.path) }
] })
const date = (value: string) => new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value))
const renderedArticle = computed(() => withCitations(article.value!, 'en'))
</script>

<template>
  <article v-if="article" class="article-page">
    <header class="article-hero wrap">
      <NuxtLink to="/en/articles" class="back-link">← All articles</NuxtLink>
      <p class="eyebrow">{{ article.tags?.join(' · ') }}</p>
      <h1>{{ article.title }}</h1>
      <p class="lead">{{ article.description }}</p>
      <div class="byline"><span>By Arwin van Arum</span><time :datetime="article.date">{{ date(article.date) }}</time><span>{{ formatReadingTime(article.body, 'en-GB') }}</span></div>
      <NuxtLink v-if="translation" :to="translation.path" hreflang="nl" class="article-language">Lees dit artikel in het Nederlands →</NuxtLink>
      <ArticleShare :title="article.title" :description="article.description" :url="canonicalUrl" :article-key="article.translationKey" locale="en" />
    </header>
    <figure v-if="article.featuredImage" class="article-cover wrap">
      <img :src="article.featuredImage" :alt="article.featuredImageAlt || ''" width="1800" height="1024">
    </figure>
    <div id="article-content" class="prose wrap"><ContentRenderer :value="renderedArticle" /></div>
    <ArticleEngagement :article-key="article.translationKey" language="en" :version="article.updated || article.date" content-id="article-content" />
    <div class="wrap"><ArticleShare :title="article.title" :description="article.description" :url="canonicalUrl" :article-key="article.translationKey" locale="en" closing /></div>
  </article>
</template>
