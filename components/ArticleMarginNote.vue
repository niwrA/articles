<script setup lang="ts">
const props=withDefaults(defineProps<{
  label: string
  heading: string
  detail?: string
  diagram?: 'arbitration' | 'learning' | 'self'
  locale?: 'en' | 'nl'
  anchor?: string
  progressIndex?: number
  foldable?: boolean
  href?: string
}>(), { locale: 'nl' })
const closed=ref(false)
const passageId=useId()
const toggle=ref<HTMLButtonElement>()
function reopen(){closed.value=false;nextTick(()=>toggle.value?.focus({preventScroll:true}))}
const passage=ref<HTMLElement>()
const progress=inject<{visited:Set<number>;markVisited:(i:number)=>void}>('article-reading-progress')
const seen=computed(()=>props.progressIndex!=null && progress?.visited.has(Number(props.progressIndex)))
let observer:IntersectionObserver|undefined
let lastY=0, startedAt=0
function sample(){
  if(closed.value || document.hidden || !passage.value || seen.value || props.progressIndex==null){startedAt=0;return}
  const y=window.scrollY, delta=y-lastY, height=window.innerHeight
  lastY=y
  if(Math.abs(delta)>height*.9) startedAt=0
  const {top,bottom}=passage.value.getBoundingClientRect()
  if(top>=height || bottom<=0){startedAt=0;return}
  if(!startedAt && top>=-40 && top<height*.85) startedAt=performance.now()
  if(startedAt && delta>0 && bottom<=height*.85 && performance.now()-startedAt>=1500){
    progress?.markVisited(Number(props.progressIndex))
  }
}
function stop(){window.removeEventListener('scroll',sample);startedAt=0}
watch(closed,()=>{startedAt=0})
onMounted(()=>{
  if(!props.foldable || !passage.value || !('IntersectionObserver' in window))return
  observer=new IntersectionObserver(([entry])=>{
    if(entry.isIntersecting){lastY=window.scrollY;sample();window.addEventListener('scroll',sample,{passive:true})}
    else stop()
  })
  observer.observe(passage.value)
})
onBeforeUnmount(()=>{observer?.disconnect();stop()})
</script>

<template>
  <div class="article-margin-pair" :class="{'is-folded':foldable && closed}">
    <aside class="article-margin-note" role="note" :aria-label="label" :class="{ 'has-diagram': diagram }">
      <small v-if="foldable && Number(progressIndex)===0" class="margin-hint">{{ locale==='en'?'Tap a margin note to fold or unfold its passage.':'Tik op een kantlijnnotitie om de passage in of uit te klappen.' }}</small>
      <span v-if="seen" class="progress-tick" role="img" :aria-label="locale==='en'?'Previously viewed':'Eerder bekeken'" :title="locale==='en'?'Previously viewed':'Eerder bekeken'">✓</span>
      <span class="article-margin-label" aria-hidden="true">{{ label }}</span>
      <button v-if="foldable" ref="toggle" type="button" class="margin-toggle" :aria-expanded="!closed" :aria-controls="passageId" @click="closed=!closed"><span aria-hidden="true">{{ closed ? '▸' : '▾' }}</span> {{ heading }}</button>
      <strong v-else class="article-margin-heading">{{ heading }}</strong>
      <div v-if="detail && !closed" class="article-margin-detail">{{ detail }}</div>
      <ArticleMarginVisual v-if="diagram && !closed" :diagram="diagram" :locale="locale" />
      <a v-if="href && !closed" class="article-margin-back" :href="href">
        {{ locale === 'en' ? '↶ Back to 01: automatic processing' : '↶ Terug naar 01: automatische verwerking' }}
      </a>
    </aside>
    <button v-if="foldable && closed" class="restore-passage" type="button" :aria-controls="passageId" @click="reopen" aria-expanded="false">
      <span v-if="detail" class="fold-detail">{{ detail }}</span>
      <span class="fold-action"><span aria-hidden="true">＋</span> {{ locale==='en'?'Expand passage':'Passage uitklappen' }}</span>
    </button>
    <div ref="passage" v-show="!closed" :id="foldable ? passageId : anchor" class="article-margin-passage"><slot /></div>
  </div>
</template>

<style scoped>
.margin-hint{display:block;margin-bottom:.65rem;color:var(--muted);font-size:.78rem;font-style:italic;line-height:1.4}
.progress-tick{float:right;color:var(--muted);font-size:.8rem}
@media(hover:hover){.article-margin-note:has(.margin-toggle:hover) .margin-toggle{text-decoration:underline;text-underline-offset:.2em}}
.margin-toggle{display:block;text-align:start;padding:.35rem 0;background:transparent;border:0;color:var(--ink);font:inherit;font-weight:650;cursor:pointer}
/* Stretch the native button over its note; keep the cross-reference above it. */
.article-margin-note:has(.margin-toggle){position:relative;isolation:isolate}
.margin-toggle::after{content:'';position:absolute;inset:0;z-index:1;cursor:pointer}
.margin-toggle:focus-visible::after{outline:2px solid var(--accent);outline-offset:2px}
.article-margin-note:has(.margin-toggle) .article-margin-back{position:relative;z-index:2}
.margin-toggle>span{color:var(--accent)}
.restore-passage{display:grid;align-content:center;justify-items:start;gap:.2rem;width:100%;min-height:44px;padding:.3rem .75rem;border:0;border-inline-start:2px solid var(--line);background:transparent;color:var(--ink);text-align:start;font:inherit;cursor:pointer}
.fold-detail{font-size:.89rem;line-height:1.45}
.fold-action{color:var(--muted);font-size:.76rem;line-height:1.4}
.restore-passage:focus-visible .fold-action{text-decoration:underline}
@media(hover:hover){.restore-passage:hover .fold-action{color:var(--accent);text-decoration:underline}}
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
