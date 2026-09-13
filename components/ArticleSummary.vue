<script setup lang="ts">
const props = defineProps<{
  article: { summary?: string; keyPoints?: string[]; modelComponent?: string; modelLimitations?: string[]; translationKey: string }
  locale: 'nl'|'en'
}>()
const emit = defineEmits<{ full: [] }>()
const nl = computed(()=>props.locale==='nl')
const openFull = () => {
  trackAnalytics('open_full_article', { article: props.article.translationKey, language: props.locale })
  emit('full')
}
</script>
<template>
  <div id="article-summary" class="summary-view">
    <section class="summary-copy wrap">
      <p class="summary-label">{{nl?'IN HET KORT':'AT A GLANCE'}}</p>
      <h2>{{nl?'De kern':'The core idea'}}</h2>
      <p class="summary-text">{{article.summary}}</p>
      <div v-if="article.keyPoints?.length" class="key-points">
        <h3>{{nl?'Belangrijkste inzichten':'Key insights'}}</h3>
        <ol><li v-for="point in article.keyPoints" :key="point">{{point}}</li></ol>
      </div>
    </section>

    <div v-if="article.modelComponent" class="summary-model prose wrap">
      <HousingPolicyExplorer v-if="article.modelComponent==='housing-policy'" />
      <ProperTimeExplorer v-else-if="article.modelComponent==='proper-time'" :locale="locale" />
      <ConsciousnessHypothesisExplorer v-else-if="article.modelComponent==='consciousness'" :locale="locale" />
      <TangoMovementExplorer v-else-if="article.modelComponent==='tango-movement'" :locale="locale" />
      <CoffeeCupModel v-else-if="article.modelComponent==='coffee-cups' && locale==='nl'" />
      <CoffeeCupModelEn v-else-if="article.modelComponent==='coffee-cups'" />
      <CarNeedsModel v-else-if="article.modelComponent==='car-needs'" />
      <SportDividendExplorer v-else-if="article.modelComponent==='sport-dividend'" :locale="locale" />
      <PathogenResponseExplorer v-else-if="article.modelComponent==='pathogen-response'" :locale="locale" />
    </div>
    <div v-if="article.modelComponent==='tango-movement'" class="summary-editor">
      <TangoPoseEditor :locale="locale" />
    </div>

    <section v-if="article.modelLimitations?.length" class="limits wrap">
      <h3>{{article.modelComponent==='tango-movement' ? (nl?'Model in ontwikkeling':'Model in progress') : article.modelComponent ? (nl?'Reikwijdte van het model':'Scope of the model') : (nl?'Reikwijdte en beperkingen':'Scope and qualifications')}}</h3>
      <ul><li v-for="item in article.modelLimitations" :key="item">{{item}}</li></ul>
    </section>
    <div class="continue wrap">
      <p>{{nl?'De volledige versie bevat de onderbouwing, nuances en bronnen achter deze samenvatting.':'The full version contains the reasoning, qualifications and sources behind this summary.'}}</p>
      <button @click="openFull">{{nl?'Lees het volledige artikel':'Read the full article'}} →</button>
    </div>
  </div>
</template>
<style scoped>
.summary-view{padding:64px 0 110px}.summary-copy{max-width:780px}.summary-label{font-size:.72rem;letter-spacing:.13em;font-weight:800;color:var(--accent)}.summary-copy h2{font-size:clamp(2rem,4vw,3.3rem);margin:.25rem 0 1rem}.summary-text{font-family:'Newsreader',serif;font-size:clamp(1.3rem,2.4vw,1.65rem);line-height:1.55}.key-points{margin-top:2.2rem;border-top:1px solid var(--line);padding-top:1.5rem}.key-points h3,.limits h3{font-size:1.3rem}.key-points ol{padding-left:1.35rem}.key-points li{padding:.45rem 0}.summary-model{max-width:780px;padding:0}.summary-editor{width:min(780px,calc(100% - 48px));margin-inline:auto}.limits{max-width:780px;margin-top:3rem;background:#ecefea;padding:1.5rem 1.7rem}.limits ul{margin-bottom:0;padding-left:1.2rem}.limits li{margin:.5rem 0}.continue{max-width:780px;margin-top:3rem;border-top:1px solid var(--line);padding-top:1.5rem}.continue button{border:0;background:transparent;color:var(--accent);padding:0;font:inherit;font-weight:700;cursor:pointer}@media(max-width:750px){.summary-view{padding-top:34px}.summary-editor{width:calc(100% - 32px)}.limits{width:calc(100% - 32px)}}
</style>
