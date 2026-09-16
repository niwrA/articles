<script setup lang="ts">
const route = useRoute()
const english = computed(() => route.path.startsWith('/en/'))
</script>

<template>
  <figure class="prose-table-frame">
    <div
      class="prose-table-scroll"
      role="region"
      tabindex="0"
      :aria-label="english ? 'Scrollable table' : 'Horizontaal verschuifbare tabel'"
    >
      <table><slot /></table>
    </div>
    <figcaption>{{ english ? 'Swipe horizontally to see all columns.' : 'Veeg horizontaal om alle kolommen te bekijken.' }}</figcaption>
  </figure>
</template>

<style scoped>
.prose-table-frame{margin:2rem 0;max-width:100%}.prose-table-scroll{max-width:100%;overflow-x:auto;overscroll-behavior-inline:contain;border:1px solid var(--line);border-radius:4px;background:var(--white);scrollbar-gutter:stable;outline:none;-webkit-overflow-scrolling:touch}.prose-table-scroll:focus-visible{box-shadow:0 0 0 3px color-mix(in srgb,var(--accent) 55%,transparent)}table{width:100%;border-collapse:collapse;font-family:'DM Sans',sans-serif;font-size:.8rem;line-height:1.5;text-align:left}:deep(th),:deep(td){padding:.75rem .85rem;border-bottom:1px solid var(--line);vertical-align:top}:deep(thead th){background:var(--ink);color:var(--white);font-size:.72rem;line-height:1.35}:deep(tbody tr:nth-child(even)){background:color-mix(in srgb,var(--ink) 3%,var(--white))}:deep(tbody tr:last-child th),:deep(tbody tr:last-child td){border-bottom:0}figcaption{display:none;margin:.45rem 0 0;color:var(--muted);font-size:.68rem;line-height:1.4}
@media(max-width:700px){.prose-table-frame{margin:1.7rem 0}.prose-table-scroll{margin-right:calc(50% - 50vw + 16px);max-width:calc(100vw - 16px);border-right:0;border-radius:4px 0 0 4px}table{width:max-content;min-width:680px;font-size:.76rem}:deep(th),:deep(td){min-width:9.5rem;max-width:17rem;padding:.65rem .72rem}:deep(th:first-child),:deep(td:first-child){min-width:8.5rem}:deep(thead th){font-size:.68rem}figcaption{display:block}}
</style>
