<script setup lang="ts">
type RelationType='application-of'|'builds-on'|'complements'|'compare-with'|'response-to'
type Relation={type:RelationType;article:string}
const props=defineProps<{article:{translationKey:string;articleRelations?:Relation[]};locale:'nl'|'en'}>()
const nl=computed(()=>props.locale==='nl')
const collection=props.locale==='nl'?'articles':'articlesEn'
const {data:candidates}=await useAsyncData(`article-relations-${collection}`,async()=>{
  const entries=await queryCollection(collection).where('draft','=',false).all()
  return entries.map(({title,path,translationKey,articleRelations})=>({title,path,translationKey,articleRelations}))
})
const byKey=computed(()=>new Map((candidates.value||[]).map(item=>[item.translationKey,item])))
const outgoing=computed(()=>(props.article.articleRelations||[]).map(relation=>({relation,target:byKey.value.get(relation.article)})).filter(item=>item.target))
const incoming=computed(()=>(candidates.value||[]).flatMap(source=>(source.articleRelations||[]).filter((relation:Relation)=>relation.article===props.article.translationKey).map((relation:Relation)=>({relation,source}))))
const labels:Record<RelationType,{nl:string;en:string;reverseNl:string;reverseEn:string}>={
  'application-of':{nl:'Toepassing van',en:'Application of',reverseNl:'Toegepast in',reverseEn:'Applied in'},
  'builds-on':{nl:'Bouwt voort op',en:'Builds on',reverseNl:'Verder uitgewerkt in',reverseEn:'Developed further in'},
  complements:{nl:'Aanvulling op',en:'Complements',reverseNl:'Aangevuld door',reverseEn:'Complemented by'},
  'compare-with':{nl:'Vergelijk met',en:'Compare with',reverseNl:'Vergelijk met',reverseEn:'Compare with'},
  'response-to':{nl:'Reactie op',en:'Response to',reverseNl:'Reactie in',reverseEn:'Responded to in'}
}
const label=(type:RelationType,reverse=false)=>{const item=labels[type];return reverse?(nl.value?item.reverseNl:item.reverseEn):(nl.value?item.nl:item.en)}
</script>

<template>
  <aside v-if="outgoing.length||incoming.length" class="article-relations wrap" :aria-label="nl?'Relaties met andere artikelen':'Relations with other articles'">
    <p v-for="item in outgoing" :key="`out-${item.relation.type}-${item.target.path}`"><strong>{{label(item.relation.type)}}:</strong> <NuxtLink :to="item.target.path">{{item.target.title}}</NuxtLink></p>
    <p v-for="item in incoming" :key="`in-${item.relation.type}-${item.source.path}`"><strong>{{label(item.relation.type,true)}}:</strong> <NuxtLink :to="item.source.path">{{item.source.title}}</NuxtLink></p>
  </aside>
</template>

<style scoped>
.article-relations{display:flex;flex-wrap:wrap;gap:.4rem 1.5rem;padding-top:1rem;padding-bottom:1rem;border-bottom:1px solid var(--line);font-size:.78rem;color:var(--muted)}.article-relations p{margin:0}.article-relations strong{color:var(--ink)}.article-relations a{text-underline-offset:3px;text-decoration-color:var(--accent)}
</style>
