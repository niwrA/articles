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
  summary: z.string().optional(),
  keyPoints: z.array(z.string()).optional(),
  plainLanguage: z.object({
    title: z.string(),
    intro: z.string(),
    sections: z.array(z.object({ heading: z.string(), paragraphs: z.array(z.string()) })),
    takeaway: z.string()
  }).optional(),
  modelComponent: z.enum(['housing-policy', 'proper-time', 'consciousness', 'tango-movement', 'coffee-cups', 'car-needs', 'sport-dividend', 'pathogen-response']).optional(),
  modelLimitations: z.array(z.string()).optional(),
  aiReviewModel: z.string().optional(),
  aiReviewDate: z.string().optional(),
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
