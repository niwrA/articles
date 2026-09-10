<script setup lang="ts">
const props = withDefaults(defineProps<{ articles: any[], locale?: 'nl-NL' | 'en-GB' }>(), { locale: 'nl-NL' })
const date = (value: string) => new Intl.DateTimeFormat(props.locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value))
</script>

<template>
  <div class="article-list">
    <article v-for="article in articles" :key="article.path" class="article-row">
      <div class="article-meta"><time :datetime="article.date">{{ date(article.date) }}</time><span v-if="article.tags?.[0]">{{ article.tags[0] }}</span></div>
      <div><h3><NuxtLink :to="article.path">{{ article.title }}</NuxtLink></h3><p>{{ article.description }}</p></div>
      <NuxtLink :to="article.path" class="row-arrow" :aria-label="`${locale === 'en-GB' ? 'Read' : 'Lees'} ${article.title}`">↗</NuxtLink>
    </article>
  </div>
</template>
