<script setup lang="ts">
type SortMode='newest'|'oldest'|'title'|'topic'|'popular'
const props=withDefaults(defineProps<{articles:any[];locale?:'nl-NL'|'en-GB';pageSize?:number}>(),{locale:'nl-NL',pageSize:12})
const nl=computed(()=>props.locale==='nl-NL')
const query=ref(''),topic=ref('all'),sort=ref<SortMode>('newest'),page=ref(1)
const topics=computed(()=>Array.from(new Set<string>(props.articles.flatMap(article=>article.tags||[]))).sort((a,b)=>a.localeCompare(b,props.locale)))
const searchable=(article:any)=>[article.title,article.description,article.summary,(article.tags||[]).join(' '),JSON.stringify(article.body||'')].join(' ').toLocaleLowerCase(props.locale)
const filtered=computed(()=>{
  const needle=query.value.trim().toLocaleLowerCase(props.locale)
  const items=props.articles.filter(article=>(topic.value==='all'||article.tags?.includes(topic.value))&&(!needle||searchable(article).includes(needle)))
  return [...items].sort((a,b)=>sort.value==='oldest'?+new Date(a.date)-+new Date(b.date):sort.value==='title'?a.title.localeCompare(b.title,props.locale):sort.value==='topic'?(a.tags?.[0]||'').localeCompare(b.tags?.[0]||'',props.locale)||a.title.localeCompare(b.title,props.locale):+new Date(b.date)-+new Date(a.date))
})
const pages=computed(()=>Math.max(1,Math.ceil(filtered.value.length/props.pageSize)))
const visible=computed(()=>filtered.value.slice((page.value-1)*props.pageSize,page.value*props.pageSize))
watch([query,topic,sort],()=>page.value=1)
watch(pages,value=>{if(page.value>value)page.value=value})
const date=(value:string)=>new Intl.DateTimeFormat(props.locale,{day:'numeric',month:'short',year:'numeric'}).format(new Date(value))
</script>

<template>
  <section class="compact-index" aria-labelledby="article-index-title">
    <div class="index-heading"><div><p class="eyebrow">{{nl?'Verken':'Explore'}}</p><h2 id="article-index-title">{{nl?'Alle artikelen':'All articles'}}</h2></div><p>{{filtered.length}} {{filtered.length===1?(nl?'artikel':'article'):(nl?'artikelen':'articles')}}</p></div>
    <div class="index-tools">
      <label class="search"><span>{{nl?'Zoek in titels, onderwerpen en tekst':'Search titles, topics and text'}}</span><input v-model="query" type="search" :placeholder="nl?'Bijvoorbeeld: tijd, tango, zorg…':'For example: time, tango, health…'"></label>
      <label><span>{{nl?'Onderwerp':'Topic'}}</span><select v-model="topic"><option value="all">{{nl?'Alle onderwerpen':'All topics'}}</option><option v-for="item in topics" :key="item" :value="item">{{item}}</option></select></label>
      <label><span>{{nl?'Volgorde':'Order'}}</span><select v-model="sort"><option value="newest">{{nl?'Nieuwste eerst':'Newest first'}}</option><option value="oldest">{{nl?'Oudste eerst':'Oldest first'}}</option><option value="title">{{nl?'Titel A–Z':'Title A–Z'}}</option><option value="topic">{{nl?'Per onderwerp':'By topic'}}</option><option value="popular" disabled>{{nl?'Populariteit — later':'Popularity — later'}}</option></select></label>
    </div>
    <div v-if="visible.length" class="article-grid">
      <article v-for="article in visible" :key="article.path" class="compact-card">
        <NuxtLink class="card-image" :to="article.path" :aria-label="article.title">
          <img v-if="article.featuredImage" :src="article.featuredImage" :alt="article.featuredImageAlt||''" :style="{objectPosition:article.featuredImageFocalPoint||'50% 50%'}" loading="lazy">
          <span v-else aria-hidden="true">{{article.tags?.[0]||'Essay'}}</span>
        </NuxtLink>
        <div class="card-meta"><time :datetime="article.date">{{date(article.date)}}</time><span v-if="article.tags?.[0]">{{article.tags[0]}}</span><span>{{formatReadingTime(article.body,locale)}}</span></div>
        <h3><NuxtLink :to="article.path">{{article.title}}</NuxtLink></h3><p>{{article.description}}</p>
        <div class="card-footer"><div class="tags"><button v-for="tag in article.tags?.slice(0,3)" :key="tag" type="button" @click="topic=tag">{{tag}}</button></div><NuxtLink :to="article.path" :aria-label="`${nl?'Lees':'Read'} ${article.title}`">↗</NuxtLink></div>
      </article>
    </div>
    <p v-else class="empty">{{nl?'Geen artikelen gevonden. Probeer een andere zoekterm of verwijder het onderwerpfilter.':'No articles found. Try another search term or clear the topic filter.'}}</p>
    <nav v-if="pages>1" class="pagination" :aria-label="nl?'Pagina’s met artikelen':'Article pages'"><button type="button" :disabled="page===1" @click="page--">← {{nl?'Vorige':'Previous'}}</button><span>{{nl?'Pagina':'Page'}} {{page}} / {{pages}}</span><button type="button" :disabled="page===pages" @click="page++">{{nl?'Volgende':'Next'}} →</button></nav>
  </section>
</template>

<style scoped>
.compact-index{padding:48px 0 100px}.index-heading{display:flex;justify-content:space-between;align-items:end;border-bottom:1px solid var(--ink);padding-bottom:14px}.index-heading h2{font-size:clamp(2.2rem,4vw,3.5rem)}.index-heading p:last-child{margin:0;color:var(--muted);font-size:.8rem}.eyebrow{margin:0 0 4px}.index-tools{display:grid;grid-template-columns:minmax(280px,1fr) 210px 210px;gap:10px;padding:18px 0}.index-tools label{display:grid;gap:5px;color:var(--muted);font-size:.68rem}.index-tools input,.index-tools select{width:100%;min-height:42px;padding:8px 10px;border:1px solid var(--line);background:var(--white);color:var(--ink);font:inherit;font-size:.78rem}.article-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));border-top:1px solid var(--line);border-left:1px solid var(--line)}.compact-card{display:flex;flex-direction:column;min-width:0;min-height:350px;padding:14px;border-right:1px solid var(--line);border-bottom:1px solid var(--line);background:color-mix(in srgb,var(--white) 55%,transparent)}.card-image{display:grid;height:126px;margin-bottom:14px;overflow:hidden;background:#dfe6e1;place-items:center;text-decoration:none}.card-image img{width:100%;height:100%;object-fit:cover;transition:transform .25s ease}.card-image span{color:#607068;font-size:.66rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase}.compact-card:hover .card-image img{transform:scale(1.025)}.card-meta{display:flex;gap:8px;flex-wrap:wrap;color:var(--muted);font-size:.63rem}.card-meta>*+*:before{content:'·';margin-right:8px}.compact-card h3{margin:12px 0 0;font-size:clamp(1.35rem,2vw,1.75rem);line-height:1.08}.compact-card h3 a{text-decoration:none}.compact-card p{display:-webkit-box;overflow:hidden;margin:9px 0 14px;color:var(--muted);font-size:.75rem;line-height:1.48;-webkit-box-orient:vertical;-webkit-line-clamp:3}.card-footer{display:flex;justify-content:space-between;align-items:end;gap:12px;margin-top:auto}.tags{display:flex;gap:5px;flex-wrap:wrap}.tags button{padding:3px 6px;border:1px solid var(--line);background:transparent;color:var(--muted);font:inherit;font-size:.58rem;cursor:pointer}.tags button:hover{border-color:var(--accent);color:var(--accent)}.card-footer>a{text-decoration:none;font-size:1.2rem}.compact-card:hover h3 a{color:var(--accent)}.empty{padding:50px 0;color:var(--muted)}.pagination{display:flex;justify-content:center;align-items:center;gap:18px;margin-top:28px}.pagination button{padding:7px 10px;border:1px solid var(--line);background:var(--white);font:inherit;font-size:.7rem;cursor:pointer}.pagination button:disabled{opacity:.4;cursor:default}.pagination span{font-size:.7rem;color:var(--muted)}@media(max-width:850px){.article-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.index-tools{grid-template-columns:1fr 1fr}.index-tools .search{grid-column:1/-1}}@media(max-width:560px){.compact-index{padding-top:30px}.index-tools,.article-grid{grid-template-columns:1fr}.index-tools .search{grid-column:auto}.compact-card{min-height:0}.card-image{height:145px}.index-heading{align-items:start}.index-heading p:last-child{margin-top:8px}}@media(prefers-reduced-motion:reduce){.card-image img{transition:none}}
</style>
