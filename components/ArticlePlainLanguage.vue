<script setup lang="ts">
const props=defineProps<{article:{translationKey:string;plainLanguage?:{title:string;intro:string;sections:{heading:string;paragraphs:string[]}[];takeaway:string}};locale:'nl'|'en'}>()
const emit=defineEmits<{full:[]}>()
const nl=computed(()=>props.locale==='nl')
const openFull=()=>{trackAnalytics('open_full_article',{article:props.article.translationKey,language:props.locale,from:'plain-language'});emit('full')}
</script>

<template>
 <main v-if="article.plainLanguage" id="article-simple" class="plain-view wrap">
  <p class="plain-label">{{nl?'EENVOUDIG UITGELEGD':'PLAIN-LANGUAGE VERSION'}}</p>
  <h2>{{article.plainLanguage.title}}</h2>
  <p class="plain-intro">{{article.plainLanguage.intro}}</p>
  <section v-for="section in article.plainLanguage.sections" :key="section.heading">
   <h3>{{section.heading}}</h3>
   <p v-for="paragraph in section.paragraphs" :key="paragraph">{{paragraph}}</p>
  </section>
  <aside><strong>{{nl?'In één zin':'In one sentence'}}</strong><p>{{article.plainLanguage.takeaway}}</p></aside>
  <div class="continue"><p>{{nl?'In de volledige versie staan de technische uitleg, de interactieve modellen en alle referenties.':'The full version contains the technical explanation, interactive models and all references.'}}</p><button @click="openFull">{{nl?'Lees het volledige artikel':'Read the full article'}} →</button></div>
 </main>
</template>

<style scoped>
.plain-view{max-width:780px;padding:64px 0 110px}.plain-label{font-size:.72rem;letter-spacing:.13em;font-weight:800;color:var(--accent)}h2{font-size:clamp(2rem,4vw,3.3rem);margin:.25rem 0 1.2rem}.plain-intro{font-family:'Newsreader',serif;font-size:clamp(1.25rem,2.2vw,1.55rem);line-height:1.55;margin-bottom:2.8rem}.plain-view section{margin:2.4rem 0}.plain-view h3{font-size:1.35rem}.plain-view p{line-height:1.75}.plain-view aside{margin:3rem 0;padding:1.5rem 1.7rem;background:#e7efeb;border-left:4px solid var(--accent)}.plain-view aside p{margin:.45rem 0 0}.continue{border-top:1px solid var(--line);padding-top:1.5rem}.continue button{border:0;background:transparent;color:var(--accent);padding:0;font:inherit;font-weight:700;cursor:pointer}@media(max-width:750px){.plain-view{width:calc(100% - 32px);padding-top:34px}}
</style>
