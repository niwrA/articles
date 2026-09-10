import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const articleSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  updated: z.string().optional(),
  tags: z.array(z.string()).default([]),
  translationKey: z.string(),
  featuredImage: z.string().optional(),
  featuredImageAlt: z.string().optional(),
  originalUrl: z.string().url().optional(),
  draft: z.boolean().default(false)
})

export default defineContentConfig({
  collections: {
    articles: defineCollection({
      type: 'page',
      source: { include: 'articles/**/*.md', prefix: '/artikelen' },
      schema: articleSchema
    }),
    articlesEn: defineCollection({
      type: 'page',
      source: { include: 'articles-en/**/*.md', prefix: '/en/articles' },
      schema: articleSchema
    })
  }
})
