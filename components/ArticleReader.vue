<script setup lang="ts">
const props=defineProps<{article:any;locale:'en'|'nl'}>()
const nl=computed(()=>props.locale==='nl')
const outline=computed(()=>buildArticleOutline(props.article,props.locale))
const compact=ref(false), chosen=ref(true), reader=ref<HTMLElement>()
const folding=computed(()=>compact.value && chosen.value)
const desktopArticle=computed(()=>{
  const source=outline.value.full
  const value=source.body.value.map((block:any)=>{
    if(!Array.isArray(block) || block[0]!=='article-margin-track') return block
    const sections=buildArticleOutline({...source,body:{...source.body,value:[block]}},props.locale).sections
    return [block[0],block[1],...sections.map((s,index)=>['article-margin-note',{...s.point,anchor:undefined,locale:props.locale,foldable:true,progressIndex:index},...s.blocks])]
  })
  return {...source,body:{...source.body,value}}
})
const visited=reactive(new Set<number>())
const progressKey=()=>['reading-outline',props.article.path,props.article.updatedAt || props.article.date || ''].join(':')
function restoreOpened(){
  try {
    const saved=JSON.parse(localStorage.getItem(progressKey()) || '[]')
    if(Array.isArray(saved)) for(const i of saved) if(Number.isInteger(i) && i>=0 && i<outline.value.sections.length) visited.add(i)
  } catch { /* Storage is optional. */ }
}
function markOpened(event:Event, index:number){
  if((event.currentTarget as HTMLDetailsElement).open) markVisited(index)
}
provide("article-reading-progress",{visited,markVisited})
function markVisited(index:number){
  if(visited.has(index)) return
  visited.add(index)
  try { localStorage.setItem(progressKey(),JSON.stringify([...visited])) } catch { /* Keep the mark for this visit. */ }
}
const plain=computed(()=>part(outline.value.sections.flatMap(s=>s.blocks)))
let media:MediaQueryList|undefined
function size(){compact.value=!!media?.matches}
function reveal(){
  if(!location.hash) return
  let id:string
  try{id=decodeURIComponent(location.hash.slice(1))}catch{return}
  const target=document.getElementById(id)
  if(!target || !reader.value?.contains(target))return
  const collapsed=target.closest('.article-margin-pair.is-folded')
  if(collapsed){
    collapsed.querySelector<HTMLButtonElement>('.margin-toggle')?.click()
    nextTick(()=>target.scrollIntoView())
  }
  const group=target.closest<HTMLDetailsElement>('details.reading-point') ??
    target.closest('.outline-prose-tail')?.parentElement?.querySelector<HTMLDetailsElement>(':scope > details.reading-point')
  if(group && !group.open){group.open=true; nextTick(()=>target.scrollIntoView())}
}
function anchorClick(e:MouseEvent){
  if((e.target as Element)?.closest('a[href^="#"]')) requestAnimationFrame(reveal)
}
onMounted(()=>{restoreOpened();media=matchMedia('(max-width: 767px)');size();media.addEventListener('change',size);window.addEventListener('hashchange',reveal)})
onBeforeUnmount(()=>{media?.removeEventListener('change',size);window.removeEventListener('hashchange',reveal)})
watch(folding,()=>nextTick(reveal))
const part=(blocks:any[])=>({...props.article,body:{...props.article.body,value:blocks}})
function mobileSection(s: ReturnType<typeof buildArticleOutline>['sections'][number]) {
  const text = (node:any):string => typeof node === 'string' ? node : node.slice(2).map(text).join('')
  const normalize = (value:string) => value.replace(/\s+/g,' ').trim()
  const first = s.blocks[0]
  const repeated = Array.isArray(first) && /^h[1-6]$/.test(first[0]) &&
    normalize(text(first)) === normalize(s.point.heading)
  const blocks = repeated ? s.blocks.slice(1) : s.blocks
  const start = blocks[0]
  const repeatsIntro = !!s.point.detail && Array.isArray(start) && start[0]==='p' &&
    normalize(text(start)).startsWith(normalize(s.point.detail))
  type Block=typeof blocks[number]
  function visibleModel(n:Block):Block|null {
    if(!Array.isArray(n)) return null
    if(n[0]==='model-disclosure' && !('notes' in n[1]) && n.slice(2).some(x=>Array.isArray(x) && x[0].includes('-')))
      return [n[0],{...n[1],open:true},...n.slice(2) as Block[]]
    if(n[0]==='housing-space-model') return n
    if(n[0]==='div' && n.length===3){
      const child=visibleModel(n[2])
      if(child) return [n[0],n[1],child]
    }
    return null
  }
  const intro:Block[]=[]
  const tail:{model:boolean;blocks:Block[]}[]=[]
  for(const b of blocks){
    const m=visibleModel(b)
    if(m) tail.push({model:true,blocks:[m]})
    else if(!tail.length) intro.push(b)
    else if(tail[tail.length-1].model) tail.push({model:false,blocks:[b]})
    else tail[tail.length-1].blocks.push(b)
  }
  return {...s,blocks:intro,tail,headingId:repeated ? first[1].id : undefined,repeatsIntro}
}
const mobileSections=computed(()=>outline.value.sections.map(mobileSection))
</script>
<template>
  <div id="article-content" ref="reader" class="prose wrap" @click="anchorClick">
    <button v-if="compact" class="reading-switch" type="button" :aria-pressed="folding" @click="chosen=!chosen">
      {{ nl?'In de marge':'In the margin' }} · {{ folding?(nl?'volledige tekst tonen':'show full text'):(nl?'lees als overzicht':'read as outline') }}
    </button>
    <ContentRenderer v-if="!folding" :value="compact ? plain : desktopArticle" />
    <div v-else class="reading-outline">
      <div v-for="(s,i) in mobileSections" :key="i" class="outline-section">
      <details class="reading-point" @toggle="markOpened($event,i)">
        <summary :id="s.headingId">
          <span class="point-label">{{ s.point.label }} <span v-if="visited.has(i)" class="visited" role="img" :aria-label="nl?'Eerder geopend':'Previously opened'">✓</span></span>
          <strong>{{ s.point.heading }}</strong>
          <span v-if="s.point.detail" class="point-detail" :class="{repeated:s.repeatsIntro}">{{ s.point.detail }}</span>
          <ArticleMarginVisual v-if="s.point.diagram" :diagram="s.point.diagram" :locale="locale" />
        </summary>
        <div v-if="s.blocks.length" class="point-passage"><ContentRenderer :value="part(s.blocks)" /></div>
        <a v-if="s.point.href" :href="s.point.href">{{ nl?'Terug naar het vertrekpunt':'Back to the starting point' }}</a>
      </details>
      <div v-for="(chunk,j) in s.tail" :key="j" :class="chunk.model ? 'outline-model' : 'outline-prose-tail point-passage'"><ContentRenderer :value="part(chunk.blocks)" /></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.reading-point:not([open]) ~ .outline-prose-tail{display:none}
.outline-model{min-width:0}
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
.visited{margin-inline-start:.35em;color:var(--muted)}
.point-passage{display:flow-root;padding-block-start:.55rem}
.reading-point[open]>summary>.point-detail.repeated{display:none}
.point-passage :deep(> div > :first-child){margin-block-start:0}
.point-passage :deep(> div > :last-child){margin-block-end:.65rem}
@media print{.reading-switch{display:none}}
</style>
