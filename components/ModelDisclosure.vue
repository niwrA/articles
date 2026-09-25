<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string
  description?: string
  open?: boolean
  notes?: boolean
  locale?: 'nl' | 'en'
}>(), { description: '', open: false, notes: false, locale: 'nl' })
const opened = ref(props.open)
</script>

<template>
  <details class="model-disclosure" :class="{ 'model-disclosure--notes': notes }" :open="open" @toggle="opened=($event.currentTarget as HTMLDetailsElement).open">
    <summary>
      <span class="summary-copy">
        <strong>{{ title }}</strong>
        <small v-if="description">{{ description }}</small>
      </span>
      <span class="toggle-label" aria-hidden="true">{{ locale==='nl' ? (opened ? 'Sluiten' : 'Openen') : (opened ? 'Close' : 'Open') }}</span>
    </summary>
    <div class="model-content"><slot /></div>
  </details>
</template>

<style scoped>
.model-disclosure{margin:2.25rem 0;border:1px solid #d4dcd8;border-radius:14px;background:#f7f8f5;overflow:visible}.model-disclosure>summary{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1rem 1.15rem;cursor:pointer;list-style:none}.model-disclosure>summary::-webkit-details-marker{display:none}.summary-copy{display:grid;gap:.2rem}.summary-copy strong{color:#203a36;font:750 1rem/1.3 system-ui,sans-serif}.summary-copy small{color:#64716d;font:400 .78rem/1.45 system-ui,sans-serif}.toggle-label{display:block;border:1px solid #bec9c4;border-radius:999px;background:#fff;padding:.35rem .7rem;color:#38514c;font:650 .72rem/1.2 system-ui,sans-serif}.model-disclosure[open]>summary{border-bottom:1px solid #dbe1dd}.model-content{padding:.25rem 0}.model-disclosure--notes .model-content{padding:0 1.15rem 1rem}.model-disclosure--notes .model-content :deep(p){margin:1rem 0}.model-content :deep(>section),.model-content :deep(>div){margin-top:2rem;margin-bottom:2rem}@media(max-width:750px){.model-disclosure{margin:1.5rem 0}.model-disclosure>summary{align-items:flex-start;padding:.85rem}.model-disclosure--notes .model-content{padding:0 .85rem .85rem}.summary-copy strong{font-size:.92rem}.toggle-label{padding:.3rem .55rem}}
</style>
