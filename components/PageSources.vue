<template>
  <section class="sec page-sources" :aria-labelledby="headingId">
    <details class="ps" :open="openByDefault">
      <summary>
        <span class="ps-kicker">{{ L.kicker }}</span>
        <h2 :id="headingId" class="ps-title">{{ L.title }}</h2>
        <span class="ps-count">{{ total }} {{ L.refs }}</span>
        <span class="ps-toggle" aria-hidden="true" />
      </summary>
      <div class="ps-body">
        <div v-if="ancient.length" class="ps-col">
          <h3>{{ L.ancient }}</h3>
          <ol>
            <li v-for="(s, i) in ancient" :key="`a${i}`">
              <b>{{ s.author }}</b><template v-if="s.work">, <i>{{ s.work }}</i></template><template v-if="s.ref"> {{ s.ref }}</template><template v-if="s.note"> — <span class="ps-note">{{ s.note }}</span></template>
            </li>
          </ol>
        </div>
        <div v-if="modern.length" class="ps-col">
          <h3>{{ L.modern }}</h3>
          <ol>
            <li v-for="(s, i) in modern" :key="`m${i}`">
              <b>{{ s.author }}</b><template v-if="s.work">, <i>{{ s.work }}</i></template><template v-if="s.ref">, {{ s.ref }}</template><template v-if="s.note"> — <span class="ps-note">{{ s.note }}</span></template>
            </li>
          </ol>
        </div>
      </div>
      <p class="ps-foot">
        <NuxtLink :to="localePath('/bibliographie')">{{ L.biblio }}</NuxtLink>
        <span aria-hidden="true"> · </span>
        <NuxtLink :to="localePath('/glossaire')">{{ L.glossary }}</NuxtLink>
      </p>
    </details>
  </section>
</template>

<script setup>
// Bloc « Sources » en bas de page.
// items : [{ type: 'ancient' | 'modern', author, work?, ref?, note? }]
// Les titres d'œuvres et références restent dans leur langue ; `note` peut être traduite par la page.
const props = defineProps({
  items: { type: Array, required: true },
  openByDefault: { type: Boolean, default: false }
})

const { locale, localePath } = useI18n()

const LABELS = {
  fr: { kicker: 'Pour aller plus loin', title: 'Sources de cette page', refs: 'références', ancient: 'Sources antiques', modern: 'Travaux modernes', biblio: 'Toute la bibliographie →', glossary: 'Glossaire →' },
  en: { kicker: 'Further reading', title: 'Sources for this page', refs: 'references', ancient: 'Ancient sources', modern: 'Modern scholarship', biblio: 'Full bibliography →', glossary: 'Glossary →' },
  ar: { kicker: 'للاستزادة', title: 'مصادر هذه الصفحة', refs: 'مرجعاً', ancient: 'المصادر القديمة', modern: 'الدراسات الحديثة', biblio: 'قائمة المراجع كاملة ←', glossary: 'المعجم ←' }
}

const L = computed(() => LABELS[locale.value] || LABELS.fr)
const ancient = computed(() => props.items.filter(s => s.type === 'ancient'))
const modern = computed(() => props.items.filter(s => s.type !== 'ancient'))
const total = computed(() => props.items.length)
const headingId = 'sources-de-la-page'
</script>

<style scoped>
.ps {
  background: var(--white);
  border-radius: var(--r-xl);
  padding: clamp(18px, 2.4vw, 28px) clamp(20px, 3vw, 40px);
}

summary {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto 44px;
  grid-template-areas: 'kicker kicker kicker' 'title count toggle';
  align-items: center;
  column-gap: 16px;
  cursor: pointer;
  list-style: none;
}

summary::-webkit-details-marker { display: none; }

.ps-kicker {
  grid-area: kicker;
  font: 700 12px/1 var(--font-body);
  color: var(--purple);
  margin-bottom: 8px;
}

.ps-title {
  grid-area: title;
  font: 800 clamp(20px, 2vw, 26px)/1.1 var(--font-display);
  margin: 0;
}

.ps-count {
  grid-area: count;
  font: 500 13px/1 var(--font-body);
  color: var(--muted);
  white-space: nowrap;
}

.ps-toggle {
  grid-area: toggle;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--paper);
  position: relative;
}

.ps-toggle::before,
.ps-toggle::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 14px;
  height: 2px;
  background: var(--ink);
  transform: translate(-50%, -50%);
  transition: transform 0.2s;
}

.ps-toggle::after { transform: translate(-50%, -50%) rotate(90deg); }
.ps[open] .ps-toggle::after { transform: translate(-50%, -50%) rotate(0deg); }

.ps-body {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px 40px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid var(--sand);
}

.ps-col h3 {
  font: 700 12px/1 var(--font-body);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--muted);
  margin-bottom: 12px;
}

[dir="rtl"] .ps-col h3 { letter-spacing: 0; }

.ps-col ol {
  padding-inline-start: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ps-col li {
  font: 400 14px/1.5 var(--font-body);
  color: var(--ink);
}

.ps-col li::marker { color: var(--purple); font-weight: 700; }
.ps-note { color: var(--muted); }

.ps-foot {
  margin-top: 20px;
  font: 600 14px/1.4 var(--font-body);
}

@media (max-width: 760px) {
  .ps-body { grid-template-columns: minmax(0, 1fr); }
  summary { grid-template-columns: minmax(0, 1fr) 44px; grid-template-areas: 'kicker kicker' 'title toggle' 'count count'; row-gap: 6px; }
}
</style>
