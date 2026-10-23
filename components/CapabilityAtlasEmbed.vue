<script setup lang="ts">
const props = withDefaults(defineProps<{
  locale?: 'nl' | 'en'
  compact?: boolean
}>(), { locale: 'nl', compact: false })

const modelUrl = computed(() => `/modellen/capability-atlas/index.html?lang=${props.locale}&embed=1`)
const fullUrl = computed(() => `/modellen/capability-atlas/index.html?lang=${props.locale}`)
</script>

<template>
  <section class="atlas-embed" :class="{ 'atlas-embed--compact': compact }">
    <div class="atlas-frame">
      <iframe
        :src="modelUrl"
        :title="locale === 'nl' ? 'Interactieve Capability Atlas' : 'Interactive Capability Atlas'"
        loading="lazy"
        sandbox="allow-scripts allow-downloads"
      />
    </div>
    <div class="atlas-actions">
      <p>
        {{ locale === 'nl'
          ? 'Onderzoeksdemonstratie v0.3. Alle profielen, bewijzen en routes zijn fictief en niet geaccrediteerd.'
          : 'Research demonstration v0.3. All profiles, evidence and pathways are fictional and unaccredited.' }}
      </p>
      <a :href="fullUrl" target="_blank" rel="noopener">
        {{ locale === 'nl' ? 'Open het model op volledig scherm' : 'Open the model full screen' }} ↗
      </a>
    </div>
  </section>
</template>

<style scoped>
.atlas-embed{margin:2rem 0}.atlas-frame{overflow:hidden;border:1px solid #cad4cf;border-radius:14px;background:#09111e;box-shadow:0 18px 45px rgba(26,47,43,.12)}.atlas-frame iframe{display:block;width:100%;height:min(78vh,880px);min-height:680px;border:0}.atlas-actions{display:flex;align-items:flex-start;justify-content:space-between;gap:1.25rem;padding:.8rem .15rem 0;color:#63716d;font:400 .78rem/1.45 system-ui,sans-serif}.atlas-actions p{margin:0;max-width:620px}.atlas-actions a{flex:none;color:var(--accent);font-weight:700;text-decoration:none}.atlas-embed--compact .atlas-frame iframe{height:720px}.atlas-embed--compact .atlas-actions{display:block}.atlas-embed--compact .atlas-actions a{display:inline-block;margin-top:.45rem}@media(max-width:750px){.atlas-frame{border-radius:10px}.atlas-frame iframe,.atlas-embed--compact .atlas-frame iframe{height:72vh;min-height:600px}.atlas-actions{display:block;padding:.7rem .1rem 0}.atlas-actions a{display:inline-block;margin-top:.45rem}}
</style>
