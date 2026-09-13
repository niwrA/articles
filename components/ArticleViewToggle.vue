<script setup lang="ts">
const props = defineProps<{ modelValue: 'summary'|'full'; locale: 'nl'|'en'; articleKey: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: 'summary'|'full'] }>()
const choose = (value:'summary'|'full') => {
  emit('update:modelValue', value)
  trackAnalytics('article_view_mode', { article: props.articleKey, language: props.locale, mode: value })
}
</script>
<template>
  <nav class="view-toggle wrap" :aria-label="locale==='nl'?'Kies artikelweergave':'Choose article view'">
    <button :class="{active:modelValue==='summary'}" @click="choose('summary')">{{locale==='nl'?'In het kort':'At a glance'}}</button>
    <button :class="{active:modelValue==='full'}" @click="choose('full')">{{locale==='nl'?'Volledig artikel':'Full article'}}</button>
  </nav>
</template>
<style scoped>
.view-toggle{display:flex;gap:.35rem;margin-top:30px}.view-toggle button{appearance:none;border:1px solid var(--line);background:var(--white);color:var(--ink);padding:.72rem 1rem;font:inherit;font-size:.86rem;cursor:pointer}.view-toggle button.active{background:var(--ink);border-color:var(--ink);color:var(--paper)}
</style>
