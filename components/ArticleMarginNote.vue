<script setup lang="ts">
withDefaults(defineProps<{
  label: string
  heading: string
  detail?: string
  diagram?: 'arbitration' | 'learning' | 'self'
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
      <figure v-else-if="diagram === 'learning'" class="article-margin-sequence">
        <ol>
          <li>{{ locale === 'en' ? 'A new situation' : 'Een nieuwe situatie' }}</li>
          <li>{{ locale === 'en' ? 'Weigh the options' : 'Weeg de mogelijkheden' }}</li>
          <li>{{ locale === 'en' ? 'Learn what works' : 'Leer wat werkt' }}</li>
          <li>{{ locale === 'en' ? 'Build a routine' : 'Bouw een routine op' }}</li>
        </ol>
        <figcaption>{{ locale === 'en' ? 'If the routine fails, weigh the options again.' : 'Werkt de routine niet meer, weeg de mogelijkheden dan opnieuw af.' }}</figcaption>
      </figure>
      <figure v-else-if="diagram === 'self'" class="article-margin-sequence">
        <ol>
          <li>{{ locale === 'en' ? 'Body: what am I sensing?' : 'Lichaam: wat voel ik?' }}</li>
          <li>{{ locale === 'en' ? 'Agency: what can I do?' : 'Handelen: wat kan ik doen?' }}</li>
          <li>{{ locale === 'en' ? 'History: what have I learned?' : 'Verleden: wat heb ik geleerd?' }}</li>
        </ol>
        <figcaption>{{ locale === 'en' ? 'Examples of layers in the essay’s self-model' : 'Voorbeelden van lagen in het zelfmodel uit het essay' }}</figcaption>
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
.article-margin-sequence { max-inline-size: 16rem; margin: .55rem 0 0; font-size: .75rem; }
.article-margin-sequence ol {
  display: grid;
  gap: 3px;
  margin: 0;
  padding: 0;
  list-style-position: inside;
}
.article-margin-sequence li {
  padding: .22rem .45rem;
  background: color-mix(in srgb, var(--line) 40%, transparent);
  color: var(--ink);
}
.article-margin-sequence li::marker { color: var(--accent); font-weight: 600; }
.article-margin-sequence figcaption { margin-block-start: .3rem; }
@media (min-width: 768px) {
  .article-margin-pair {
    grid-template-columns: var(--margin-note-width, 184px) minmax(0, 1fr);
    column-gap: var(--margin-note-gap, 24px);
    margin-inline-start: calc(0px - var(--margin-note-width, 184px) - var(--margin-note-gap, 24px));
  }
  .article-margin-passage { grid-area: 1 / 2; }
  .article-margin-note { grid-area: 1 / 1; position: relative; margin-block-start: 0; border-inline-start: 0; }
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
