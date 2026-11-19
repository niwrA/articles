<template>
  <div class="article-margin-track"><slot /></div>
</template>

<style>
@media (min-width: 768px) {
  .article-page > .prose:has(.article-margin-track) {
    --reading-layout-width: min(1180px, calc(100vw - 64px));
    --margin-note-width: clamp(164px, 22vw, 300px);
    --margin-note-gap: clamp(22px, 3vw, 44px);
    width: min(780px, calc(var(--reading-layout-width) - var(--margin-note-width) - var(--margin-note-gap)));
    margin-inline-start: calc(max(24px, (100% - 1180px) / 2) + var(--margin-note-width) + var(--margin-note-gap));
    margin-inline-end: auto;
  }

  .article-margin-track {
    position: relative;
    isolation: isolate;
  }
  .article-margin-track::before {
    content: '';
    position: absolute;
    inset-block: .65rem 0;
    inset-inline-start: calc(0px - var(--margin-note-width) - var(--margin-note-gap));
    inline-size: 1px;
    background: var(--line);
    pointer-events: none;
    z-index: -1;
  }
  .prose .article-margin-track .experiment-matrix,
  .article-margin-track .model-disclosure[open]:has(.consciousness-model) {
    position: relative;
    width: var(--reading-layout-width);
    margin-inline-start: calc(0px - var(--margin-note-width) - var(--margin-note-gap));
    margin-inline-end: 0;
  }
  .prose .article-margin-track .reading-breakout {
    clear: both;
    width: var(--reading-layout-width);
    margin-inline-start: calc(0px - var(--margin-note-width) - var(--margin-note-gap));
    background: var(--paper);
  }
  .prose .reading-breakout > *, .prose .reading-breakout .model-content > * {
    width: 100%; max-width: 100%; margin-inline: 0;
  }
  .article-margin-track .experiment-matrix {
    background: var(--paper);
    padding-block: 1rem;
  }
  .article-margin-track .model-disclosure .consciousness-model {
    width: 100%;
    margin-inline: 0;
  }
}
@media (min-width: 768px) and (max-width: 879.99px) {
  .article-margin-track .consciousness-model .model-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
