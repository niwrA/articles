<script setup lang="ts">
withDefaults(defineProps<{
  label: string
  heading: string
  detail?: string
  diagram?: 'arbitration'
  locale?: 'en' | 'nl'
  anchor?: string
  href?: string
}>(), { locale: 'nl' })
</script>

<template>
  <div class="article-margin-pair">
    <div :id="anchor" class="article-margin-passage"><slot /></div>
    <aside class="article-margin-note" role="note" :aria-label="label" :class="{ 'has-diagram': diagram }">
      <span class="article-margin-label" aria-hidden="true">{{ label }}</span>
      <strong class="article-margin-heading">{{ heading }}</strong>
      <div v-if="detail" class="article-margin-detail">{{ detail }}</div>
      <figure v-if="diagram === 'arbitration'" class="article-margin-fork">
        <div class="article-margin-inputs">
          <div>{{ locale === 'en' ? 'Fear' : 'Angst' }}<strong>{{ locale === 'en' ? 'Pull away' : 'Trek terug' }}</strong></div>
          <div>{{ locale === 'en' ? 'Memory' : 'Geheugen' }}<strong>{{ locale === 'en' ? 'It’s harmless' : 'Ongevaarlijk' }}</strong></div>
        </div>
        <div class="article-margin-join" aria-hidden="true"></div>
        <figcaption>{{ locale === 'en' ? 'Weigh both signals' : 'Weeg beide signalen' }}</figcaption>
      </figure>
      <a v-if="href" class="article-margin-back" :href="href">
        {{ locale === 'en' ? '↶ Back to 01: automatic processing' : '↶ Terug naar 01: automatische verwerking' }}
      </a>
    </aside>
  </div>
</template>

<style scoped>
.article-margin-pair {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  min-inline-size: 0;
  margin-block: 1.25em;
}
.article-margin-passage { min-inline-size: 0; scroll-margin-block-start: 5rem; }
.article-margin-passage :deep(> :first-child) { margin-block-start: 0; }
.article-margin-passage :deep(> :last-child) { margin-block-end: 0; }
.article-margin-note {
  box-sizing: border-box;
  align-self: start;
  min-inline-size: 0;
  max-inline-size: 32rem;
  margin-block-start: .7rem;
  padding: .32rem 0 .42rem .85rem;
  border-inline-start: 1px solid var(--line);
  color: var(--muted);
  font: .82rem/1.45 var(--font-sans);
  overflow-wrap: anywhere;
}
.article-margin-label {
  display: block;
  margin-block-end: .25rem;
  font-size: .68rem;
  font-weight: 600;
  letter-spacing: .07em;
  text-transform: uppercase;
}
.article-margin-heading { display: block; color: var(--ink); font-weight: 650; }
.article-margin-detail { margin-block-start: .25rem; }
.has-diagram .article-margin-label, .article-margin-back { color: var(--accent); }
.article-margin-back { display: inline-block; margin-block-start: .4rem; }
.article-margin-fork { max-inline-size: 14rem; margin: .55rem 0 0; text-align: center; font-size: .73rem; }
.article-margin-inputs { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .28rem; }
.article-margin-inputs > div { background: color-mix(in srgb, var(--line) 46%, transparent); padding: .18rem; }
.article-margin-inputs strong { display: block; color: var(--ink); }
.article-margin-join { inline-size: 50%; block-size: .48rem; margin-inline: auto; border: 1px solid var(--line); border-block-start: 0; }
.article-margin-fork figcaption {
  padding: .18rem;
  background: color-mix(in srgb, var(--accent) 9%, var(--paper));
  color: var(--ink);
  font-weight: 600;
}
@media (min-width: 768px) {
  .article-margin-pair {
    grid-template-columns: minmax(0, 1fr) var(--margin-note-width, 184px);
    column-gap: var(--margin-note-gap, 24px);
    margin-inline-end: calc(0px - var(--margin-note-width, 184px) - var(--margin-note-gap, 24px));
  }
  .article-margin-note { position: relative; margin-block-start: 0; }
  .article-margin-note::before {
    content: '';
    position: absolute;
    inset-block-start: .54rem;
    inset-inline-start: -.24rem;
    inline-size: .4rem;
    block-size: .4rem;
    border: 1px solid var(--muted);
    border-radius: 50%;
    background: var(--paper);
  }
  .has-diagram::before { border-color: var(--accent); background: var(--accent); }
}
</style>

<style>
@media (min-width: 768px) and (max-width: 1239.99px) {
  .article-page > .prose:has(.article-margin-pair) {
    --margin-note-width: clamp(156px, 17vw, 184px);
    --margin-note-gap: clamp(16px, 2vw, 24px);
    --reading-layout-width: min(988px, calc(100vw - 64px));
    --reading-prose-width: min(780px, calc(var(--reading-layout-width) - var(--margin-note-width) - var(--margin-note-gap)));
    width: var(--reading-prose-width);
    margin-inline-start: min(calc((100% - var(--reading-prose-width)) / 2), calc(100% - var(--reading-layout-width) - 24px));
    margin-inline-end: auto;
  }

  .prose:has(.article-margin-pair) :is(.experiment-matrix, .consciousness-model) {
    width: var(--reading-layout-width);
    margin-inline: 0;
  }
}

@media (min-width: 768px) and (max-width: 849.99px) {
  .prose:has(.article-margin-pair) .consciousness-model .model-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
