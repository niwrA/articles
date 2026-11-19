<script setup lang="ts">
const props=defineProps<{article:any;locale:'en'|'nl'}>()
const nl=computed(()=>props.locale==='nl')
const outline=computed(()=>buildArticleOutline(props.article,props.locale))
const compact=ref(false), chosen=ref(false), reader=ref<HTMLElement>()
const folding=computed(()=>compact.value && chosen.value)
let media:MediaQueryList|undefined
function size(){compact.value=!!media?.matches}
function reveal(){
  if(!folding.value || !location.hash) return
  let id:string
  try{id=decodeURIComponent(location.hash.slice(1))}catch{return}
  const target=document.getElementById(id)
  if(!target || !reader.value?.contains(target))return
  const group=target.closest<HTMLDetailsElement>('details.reading-point')
  if(group && !group.open){group.open=true; nextTick(()=>target.scrollIntoView())}
}
function anchorClick(e:MouseEvent){
  if((e.target as Element)?.closest('a[href^="#"]')) requestAnimationFrame(reveal)
}
onMounted(()=>{media=matchMedia('(max-width: 767px)');size();media.addEventListener('change',size);window.addEventListener('hashchange',reveal)})
onBeforeUnmount(()=>{media?.removeEventListener('change',size);window.removeEventListener('hashchange',reveal)})
watch(folding,()=>nextTick(reveal))
const part=(blocks:any[])=>({...props.article,body:{...props.article.body,value:blocks}})
</script>
<template>
  <div id="article-content" ref="reader" class="prose wrap" @click="anchorClick">
    <button v-if="compact" class="reading-switch" type="button" :aria-pressed="folding" @click="chosen=!chosen">
      {{ nl?'In de marge':'In the margin' }} · {{ folding?(nl?'volledige tekst tonen':'show full text'):(nl?'lees als overzicht':'read as outline') }}
    </button>
    <ContentRenderer v-if="!folding" :value="outline.full" />
    <div v-else class="reading-outline">
      <details v-for="(s,i) in outline.sections" :key="i" class="reading-point">
        <summary>
          <span class="point-label">{{ s.point.label }}</span>
          <strong>{{ s.point.heading }}</strong>
          <span v-if="s.point.detail" class="point-detail">{{ s.point.detail }}</span>
          <ArticleMarginVisual v-if="s.point.diagram" :diagram="s.point.diagram" :locale="locale" />
        </summary>
        <ContentRenderer :value="part(s.blocks)" />
        <a v-if="s.point.href" :href="s.point.href">{{ nl?'Terug naar het vertrekpunt':'Back to the starting point' }}</a>
      </details>
    </div>
  </div>
</template>
<style scoped>
.reading-switch{background:var(--white);color:var(--ink);border:1px solid var(--line);padding:.65rem .85rem;min-height:44px;font:inherit;font-size:.85rem;margin-bottom:1rem}
.reading-point{border-top:1px solid var(--line);padding:.35rem 0}
.reading-point>summary{position:relative;cursor:pointer;list-style:none;min-height:44px;padding:.6rem 2rem .6rem .85rem;border-left:2px solid var(--line)}
.reading-point>summary::-webkit-details-marker{display:none}
.reading-point>summary::after{content:'+';position:absolute;right:.5rem;top:.55rem;color:var(--accent)}
.reading-point[open]>summary{border-color:var(--accent)}
.reading-point[open]>summary::after{content:'−'}
.point-label,.point-detail,.reading-point>summary>strong{display:block}
.point-label{font-size:.7rem;text-transform:uppercase;letter-spacing:.08em;color:var(--muted)}
.point-detail{font-size:.88rem;color:var(--muted);margin-top:.25rem}
.reading-outline :deep(.reading-breakout > *), .reading-outline :deep(.model-content > *) { max-width:100%;margin-inline:0; }
@media print{.reading-switch{display:none}}
</style>
