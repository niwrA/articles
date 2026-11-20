<script setup lang="ts">
withDefaults(defineProps<{
  label: string
  heading: string
  detail?: string
  diagram?: 'arbitration' | 'learning' | 'self'
  locale?: 'en' | 'nl'
  anchor?: string
  foldable?: boolean
  href?: string
}>(), { locale: 'nl' })
const closed=ref(false)
const passageId=useId()
const toggle=ref<HTMLButtonElement>()
function reopen(){closed.value=false;nextTick(()=>toggle.value?.focus({preventScroll:true}))}
</script>

<template>
  <div class="article-margin-pair" :class="{'is-folded':foldable && closed}">
    <aside class="article-margin-note" role="note" :aria-label="label" :class="{ 'has-diagram': diagram }">
      <span class="article-margin-label" aria-hidden="true">{{ label }}</span>
      <button v-if="foldable" ref="toggle" type="button" class="margin-toggle" :aria-expanded="!closed" :aria-controls="passageId" @click="closed=!closed"><span aria-hidden="true">{{ closed ? '▸' : '▾' }}</span> {{ heading }}</button>
      <strong v-else class="article-margin-heading">{{ heading }}</strong>
      <div v-if="detail && !closed" class="article-margin-detail">{{ detail }}</div>
      <ArticleMarginVisual v-if="diagram && !closed" :diagram="diagram" :locale="locale" />
      <a v-if="href && !closed" class="article-margin-back" :href="href">
        {{ locale === 'en' ? '↶ Back to 01: automatic processing' : '↶ Terug naar 01: automatische verwerking' }}
      </a>
    </aside>
    <button v-if="foldable && closed" class="restore-passage" type="button" :aria-controls="passageId" @click="reopen"><span>{{ locale==='en'?'Passage collapsed':'Passage ingeklapt' }}</span><strong>{{ locale==='en'?'Show passage':'Toon passage' }} ＋</strong></button>
    <div v-show="!closed" :id="foldable ? passageId : anchor" class="article-margin-passage"><slot /></div>
  </div>
</template>

<style scoped>
.margin-toggle{display:block;text-align:start;padding:.35rem 0;background:transparent;border:0;color:var(--ink);font:inherit;font-weight:650;cursor:pointer}
.margin-toggle>span{color:var(--accent)}
.restore-passage{display:flex;align-items:center;justify-content:space-between;gap:1rem;width:100%;min-height:44px;padding:.55rem .85rem;border:1px dashed var(--muted);background:var(--paper);color:var(--muted);font:inherit;font-size:.85rem;cursor:pointer}
.restore-passage strong{color:var(--accent)}
.article-margin-pair.is-folded{clear:left}
.article-margin-pair {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  min-inline-size: 0;
  margin-block: 1.25em;
}
.article-margin-passage { grid-row: 1; min-inline-size: 0; scroll-margin-block-start: 5rem; }
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
@media (min-width: 768px) {
  .article-margin-pair { display: block; }
  .article-margin-note {
    position: relative;
    float: left;
    clear: left;
    width: var(--margin-note-width);
    margin: 0 var(--margin-note-gap) .75rem calc(0px - var(--margin-note-width) - var(--margin-note-gap));
    border-inline-start: 0;
  }
  :global(.article-margin-track) { display: flow-root; }
  :global(.article-margin-track .experiment-matrix),
  :global(.article-margin-track .model-disclosure[open]) { clear: left; }
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
