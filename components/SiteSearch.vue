<template>
  <div class="ss">
    <button class="ss-trigger" :aria-label="L.open" :title="`${L.open} (Ctrl K)`" @click="openPanel">
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5 5" /></svg>
    </button>

    <Teleport to="body">
      <Transition name="ss-fade">
        <div v-if="open" class="ss-overlay" :dir="locale === 'ar' ? 'rtl' : 'ltr'" @click.self="close">
          <div class="ss-panel" role="dialog" aria-modal="true" :aria-label="L.open">
            <div class="ss-bar">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5 5" /></svg>
              <input
                ref="inputEl"
                v-model="q"
                type="search"
                :placeholder="L.placeholder"
                :aria-label="L.placeholder"
                role="combobox"
                aria-autocomplete="list"
                :aria-expanded="results.length > 0"
                aria-controls="ss-results"
                :aria-activedescendant="results.length ? `ss-r-${active}` : undefined"
                @keydown.down.prevent="move(1)"
                @keydown.up.prevent="move(-1)"
                @keydown.enter.prevent="go(results[active])"
                @keydown.esc="close"
              >
              <button class="ss-close" :aria-label="L.close" @click="close">Esc</button>
            </div>

            <p v-if="state === 'loading'" class="ss-state">{{ L.loading }}</p>
            <p v-else-if="state === 'error'" class="ss-state">{{ L.error }}</p>
            <template v-else>
              <p class="ss-state" aria-live="polite">
                {{ q.trim().length < 2 ? L.hint : results.length ? `${results.length} ${L.found}` : L.none }}
              </p>
              <ul v-if="results.length" id="ss-results" class="ss-results" role="listbox">
                <li
                  v-for="(r, i) in results"
                  :id="`ss-r-${i}`"
                  :key="r.path"
                  role="option"
                  :aria-selected="i === active"
                >
                  <NuxtLink :to="r.path" class="ss-item" :class="{ on: i === active }" @click="close" @mouseenter="active = i">
                    <span class="ss-group">{{ r.group }}</span>
                    <span class="ss-title" v-html="r.titleHtml" />
                    <span v-if="r.snippet" class="ss-snippet" v-html="r.snippet" />
                  </NuxtLink>
                </li>
              </ul>
              <div v-else-if="q.trim().length < 2" class="ss-suggest">
                <button v-for="s in L.suggestions" :key="s" class="chip" @click="q = s">{{ s }}</button>
              </div>
            </template>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
// Recherche plein texte côté client dans l'index généré au build (public/search/<lang>.json).
const { locale } = useI18n()
const router = useRouter()

const LABELS = {
  fr: { open: 'Rechercher', close: 'Fermer', placeholder: 'Rechercher une page, un nom, une date…', loading: "Chargement de l'index…", error: "L'index de recherche est indisponible.", hint: 'Tapez au moins deux lettres.', found: 'résultats', none: 'Aucun résultat.', suggestions: ['Hannibal', 'Tanit', 'suffète', 'Cannes', 'garum', 'Massinissa'] },
  en: { open: 'Search', close: 'Close', placeholder: 'Search a page, a name, a date…', loading: 'Loading the index…', error: 'The search index is unavailable.', hint: 'Type at least two letters.', found: 'results', none: 'No results.', suggestions: ['Hannibal', 'Tanit', 'suffete', 'Cannae', 'garum', 'Masinissa'] },
  ar: { open: 'بحث', close: 'إغلاق', placeholder: 'ابحث عن صفحة أو اسم أو تاريخ…', loading: 'جارٍ تحميل الفهرس…', error: 'فهرس البحث غير متاح.', hint: 'اكتب حرفين على الأقل.', found: 'نتيجة', none: 'لا نتائج.', suggestions: ['حنبعل', 'تانيت', 'زاما', 'كاناي', 'ماسينيسا'] }
}
const L = computed(() => LABELS[locale.value] || LABELS.fr)

const open = ref(false)
const q = ref('')
const active = ref(0)
const state = ref('idle')
const inputEl = ref(null)
const cache = {}
const docs = ref([])

// Minuscules, sans accents latins ni voyelles/tatweel arabes, alif unifié
const norm = s => (s || '')
  .toLowerCase()
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[ً-ٰٟـ]/g, '')
  .replace(/[إأآ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه')
  .replace(/[’'`ʿʾ]/g, '')

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Surligne les termes dans le texte d'origine en s'appuyant sur la version normalisée
function highlight (text, terms) {
  const n = norm(text)
  if (n.length !== text.length) return esc(text) // décalage d'index (rare) : pas de surlignage
  const marks = []
  for (const t of terms) {
    let i = n.indexOf(t)
    while (i !== -1) { marks.push([i, i + t.length]); i = n.indexOf(t, i + t.length) }
  }
  if (!marks.length) return esc(text)
  marks.sort((a, b) => a[0] - b[0])
  let out = ''
  let pos = 0
  for (const [a, b] of marks) {
    if (a < pos) continue
    out += esc(text.slice(pos, a)) + '<mark>' + esc(text.slice(a, b)) + '</mark>'
    pos = b
  }
  return out + esc(text.slice(pos))
}

function snippetOf (d, terms) {
  const src = d.body
  const n = norm(src)
  let at = -1
  for (const t of terms) { const i = n.indexOf(t); if (i !== -1 && (at === -1 || i < at)) at = i }
  if (at === -1) return highlight(d.desc || src.slice(0, 160), terms)
  const start = Math.max(0, at - 70)
  const cut = src.slice(start, start + 200)
  return (start > 0 ? '… ' : '') + highlight(cut, terms) + ' …'
}

const results = computed(() => {
  const terms = norm(q.value).split(/\s+/).filter(t => t.length >= 2)
  if (!terms.length || !docs.value.length) return []
  const scored = []
  for (const d of docs.value) {
    let score = 0
    let all = true
    for (const t of terms) {
      let s = 0
      if (d._label.includes(t)) s += 40
      if (d._title.includes(t)) s += 20
      if (d._head.includes(t)) s += 8
      if (d._desc.includes(t)) s += 6
      if (d._body.includes(t)) s += 2 + Math.min(6, d._body.split(t).length - 2)
      if (!s) { all = false; break }
      score += s
    }
    if (all) scored.push({ d, score })
  }
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 12)
    .map(({ d }) => ({
      path: d.path,
      group: d.group,
      titleHtml: highlight(d.label, terms),
      snippet: snippetOf(d, terms)
    }))
})

watch(q, () => { active.value = 0 })

async function load () {
  const lang = locale.value
  if (cache[lang]) { docs.value = cache[lang]; state.value = 'ready'; return }
  state.value = 'loading'
  try {
    const res = await fetch(`/search/${lang}.json`)
    if (!res.ok) throw new Error(res.status)
    const raw = await res.json()
    cache[lang] = raw.map(d => ({
      ...d,
      _label: norm(d.label),
      _title: norm(d.title),
      _head: norm(d.headings.join(' ')),
      _desc: norm(d.desc),
      _body: norm(d.body)
    }))
    docs.value = cache[lang]
    state.value = 'ready'
  } catch {
    state.value = 'error'
  }
}

async function openPanel () {
  open.value = true
  document.body.style.overflow = 'hidden'
  load()
  await nextTick()
  inputEl.value?.focus()
}

function close () {
  open.value = false
  document.body.style.overflow = ''
}

function move (step) {
  const n = results.value.length
  if (!n) return
  active.value = (active.value + step + n) % n
  nextTick(() => document.getElementById(`ss-r-${active.value}`)?.scrollIntoView({ block: 'nearest' }))
}

function go (r) {
  if (!r) return
  router.push(r.path)
  close()
}

watch(locale, () => { if (open.value) load() })

const onKey = (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    open.value ? close() : openPanel()
  }
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' })
</script>

<style scoped>
.ss-trigger {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 0;
  background: var(--paper);
  color: var(--ink);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: background 0.2s;
}

.ss-trigger:hover { background: var(--sand); }

svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; }

.ss-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(22, 19, 15, 0.45);
  padding: calc(env(safe-area-inset-top, 0px) + clamp(12px, 8vh, 96px)) var(--gutter) var(--gutter);
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.ss-panel {
  width: min(720px, 100%);
  max-height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--white);
  border-radius: 28px;
  box-shadow: 0 24px 60px rgba(22, 19, 15, 0.25);
  overflow: hidden;
}

.ss-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 14px 14px 22px;
  border-bottom: 1px solid var(--sand);
}

[dir="rtl"] .ss-bar { padding: 14px 22px 14px 14px; }

.ss-bar input {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: none;
  font: 500 18px/1.3 var(--font-body);
  color: var(--ink);
  background: transparent;
  min-height: 44px;
}

.ss-bar input::-webkit-search-cancel-button { display: none; }

.ss-close {
  flex: none;
  border: 0;
  background: var(--paper);
  border-radius: 999px;
  padding: 10px 12px;
  min-height: 40px;
  font: 600 12px/1 var(--font-body);
  color: var(--muted);
  cursor: pointer;
}

.ss-state {
  padding: 12px 22px;
  font: 500 13px/1.4 var(--font-body);
  color: var(--muted);
}

.ss-results {
  list-style: none;
  overflow-y: auto;
  padding: 0 10px 12px;
}

.ss-item {
  display: block;
  padding: 12px 14px;
  border-radius: 16px;
  color: var(--ink);
}

.ss-item.on, .ss-item:hover { background: var(--paper); color: var(--ink); }

.ss-group {
  display: block;
  font: 700 11px/1 var(--font-body);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--purple);
  margin-bottom: 6px;
}

[dir="rtl"] .ss-group { letter-spacing: 0; }

.ss-title {
  display: block;
  font: 800 18px/1.2 var(--font-display);
}

.ss-snippet {
  display: block;
  margin-top: 4px;
  font: 400 14px/1.45 var(--font-body);
  color: var(--muted);
}

.ss-results :deep(mark) {
  background: #F5E2B3;
  color: inherit;
  border-radius: 3px;
  padding: 0 1px;
}

.ss-suggest {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0 22px 20px;
}

.ss-suggest .chip {
  border: 0;
  cursor: pointer;
  min-height: 40px;
}

.ss-fade-enter-active, .ss-fade-leave-active { transition: opacity 0.18s; }
.ss-fade-enter-from, .ss-fade-leave-to { opacity: 0; }

@media (max-width: 640px) {
  .ss-overlay { padding-top: calc(env(safe-area-inset-top, 0px) + 12px); }
  .ss-panel { border-radius: 22px; }
  .ss-bar input { font-size: 16px; }
}
</style>
